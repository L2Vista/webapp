<script>
import {
  getLogArray,
  getExplorerUrl,
  getDateTime,
  getChainID,
  NUM_OF_LOGS,
  CHAINS,
  PROTOCOLS,
} from "../assets/explorer.js";
import { RPC_ENDPOINT, AI_RPC_ENDPOINT } from "../assets/env.js";
import axios from "axios";

export default {
  data() {
    return {
      CHAINS: CHAINS,
      PROTOCOLS: PROTOCOLS,

      logArray: getLogArray(),
      count: 0,
      page_current: 1,
      page_max: 0,

      filter_from: "null",
      filter_protocol: "null",
      filter_to: "null",
      filter_address: "null",
      filter_hash: "null",

      search_text: "",
      loading: false,
    };
  },
  mounted() {
    this.loadOnMounted();
  },
  methods: {
    async loadOnMounted() {
      await this.loadLogs(NUM_OF_LOGS, (this.page_current - 1) * NUM_OF_LOGS);
      this.count = await this.getCount();
      this.page_max = Math.ceil(this.count / NUM_OF_LOGS);
    },
    async loadLogs(
      amount,
      skip,
      tochain = "null",
      fromchain = "null",
      hash = "null",
      protocol = "null",
      address = "null"
    ) {
      let request = RPC_ENDPOINT + "tx?amount=" + amount + "&skip=" + skip;
      if (tochain !== "null") request += "&tochain=" + tochain;
      if (fromchain !== "null") request += "&fromchain=" + fromchain;
      if (hash !== "null") request += "&hash=" + hash;
      if (protocol !== "null") request += "&category=" + protocol;
      if (address !== "null") request += "&address=" + address;
      await axios
        .get(request)
        .then((res) => {
          if (!res.status) console.error("load history 실패 ", res);
          // 성공했을 경우
          //console.log("load history 성공", res);
          this.logArray = []; // Clear
          for (let i = 0; i < res.data.data.txRequested.length; i++) {
            let log = res.data.data.txRequested[i];
            let timestamp = log.from ? log.from.timestamp : 0;
            let from = log.from ? log.from.hash : 0;
            let fromchain = log.from ? log.from.chain : 0;
            let to = log.to ? log.to.hash : null;
            let tochain = log.to ? log.to.chain : 0;
            let protocol = log.category ? log.category : "";
            let state = log.to.hash ? "success" : "pending";

            this.logArray.push({
              timestamp: getDateTime(timestamp),
              from: from,
              fromchain: fromchain,
              to: to,
              tochain: tochain,
              protocol: protocol,
              state: state,
            });
          }
        })
        .catch((res) => {
          // 실패했을 경우
          console.error("load history 실패 ", res);
        });
    },
    async getCount(
      tochain = "null",
      fromchain = "null",
      hash = "null",
      protocol = "null",
      address = "null"
    ) {
      let request = RPC_ENDPOINT + "txcount?";
      if (tochain !== "null") request += "&tochain=" + tochain;
      if (fromchain !== "null") request += "&fromchain=" + fromchain;
      if (hash !== "null") request += "&hash=" + hash;
      if (protocol !== "null") request += "&category=" + protocol;
      if (address !== "null") request += "&address=" + address;
      return await axios
        .get(request)
        .then((res) => {
          // 성공했을 경우
          //console.log("getCount 성공", res);
          return res.data.data;
        })
        .catch((res) => {
          // 실패했을 경우
          console.error("load history 실패 ", res);
          return 0;
        });
    },
    async moveTo(page) {
      this.page_current = page;
      await this.loadLogs(NUM_OF_LOGS, (page - 1) * NUM_OF_LOGS);
    },
    getShortAddr(addr) {
      if (addr === null) return "";
      return addr.substr(0, 6) + "..." + addr.substr(addr.length - 4);
    },
    getExplorerUrl(chainid) {
      let url = getExplorerUrl(chainid);
      return url;
    },
    async applyFilter() {
      this.page_current = 1;
      await this.loadLogs(
        NUM_OF_LOGS,
        (this.page_current - 1) * NUM_OF_LOGS,
        this.filter_to,
        this.filter_from,
        this.filter_hash,
        this.filter_protocol,
        this.filter_address
      );
      this.count = await this.getCount(
        this.filter_to,
        this.filter_from,
        this.filter_hash,
        this.filter_protocol,
        this.filter_address
      );
      this.page_max = Math.ceil(this.count / NUM_OF_LOGS);
    },
    async clearAddrFilter() {
      this.filter_address = "null";
      await this.applyFilter();
    },
    async clearHashFilter() {
      this.filter_hash = "null";
      await this.applyFilter();
    },
    async postMsg(msg) {
      console.log("postMsg", msg);
      this.loading = true;
      await axios
        .post(
          AI_RPC_ENDPOINT + "chat",
          { human_input: msg },
          {
            header: {
              "Context-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          // 성공했을 경우
          console.log("postMsg 성공", res);
          let answer = res.data.ai_output;
          let parsed = res.data.parsed;
          this.filter_from = getChainID(parsed[0]);
          this.filter_to = getChainID(parsed[1]);
          this.filter_protocol = parsed[2];
          this.filter_address = parsed[3];
          this.filter_hash = parsed[4];
          this.loading = false;
          await this.applyFilter();
          UIkit.notification("🙂 " + answer, { pos: "top-right" });
        })
        .catch((res) => {
          // 실패했을 경우
          this.typing = false;
          console.error("실패 ", res);
          UIkit.notification("Error!", { pos: "top-right" });
          this.loading = false;
        });
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="explorer-container">
    <div class="searchbar-container">
      <div class="searchbar">
        <input
          type="text"
          v-model="search_text"
          placeholder="🙂 Hi, how can I assist you today?"
          aria-label="Input"
          @keyup.enter="postMsg(search_text)"
        />
        <img
          v-if="!loading"
          class="search-icon"
          src="/search-icon.svg"
          @click="postMsg(search_text)"
        />
        <div v-if="loading" class="search-spinner" uk-spinner></div>
      </div>
    </div>
    <div class="filter-container">
      <div class="filter uk-width-small@s">
        <div class="filter-title"><span>From</span></div>
        <select v-model="filter_from" class="uk-select" @change="applyFilter">
          <option value="null">All</option>
          <option v-for="chain in CHAINS" :key="chain.id" :value="chain.id">
            {{ chain.name }}
          </option>
        </select>
      </div>
      <div class="filter uk-width-small@s">
        <div class="filter-title"><span>Protocol</span></div>
        <select v-model="filter_protocol" class="uk-select" @change="applyFilter">
          <option value="null">All</option>
          <option v-for="protocol in PROTOCOLS" :key="protocol.id" :value="protocol.id">
            {{ protocol.name }}
          </option>
        </select>
      </div>
      <div class="filter uk-width-small@s">
        <div class="filter-title"><span>To</span></div>
        <select v-model="filter_to" class="uk-select" @change="applyFilter">
          <option value="null">All</option>
          <option v-for="chain in CHAINS" :key="chain.id" :value="chain.id">
            {{ chain.name }}
          </option>
        </select>
      </div>
      <div v-if="filter_address !== 'null'" class="filter filter-hover uk-width-small@s">
        <div class="filter-title filter-title-small"><span>Addr</span></div>
        <button
          class="uk-button filter-button filter-button-small"
          @click="clearAddrFilter"
        >
          <span class="filter-span">{{ getShortAddr(filter_address) }}</span
          ><span class="filter-close">x</span>
        </button>
      </div>
      <div v-if="filter_hash !== 'null'" class="filter filter-hover uk-width-small@s">
        <div class="filter-title filter-title-small"><span>Hash</span></div>
        <button
          class="uk-button filter-button filter-button-small"
          @click="clearHashFilter"
        >
          <span class="filter-span">{{ getShortAddr(filter_hash) }}</span
          ><span class="filter-close">x</span>
        </button>
      </div>
    </div>
    <div class="table uk-overflow-auto">
      <div v-if="loading" class="main-spinner">
        <div uk-spinner="ratio: 3"></div>
      </div>
      <table v-if="!loading" class="uk-table uk-table-hover uk-table-divider">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>From</th>
            <th>Protocol</th>
            <th>To</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logArray" :key="log">
            <td>{{ log.timestamp }}</td>
            <td>
              <a :href="` ${getExplorerUrl(log.fromchain) + log.from} `" target="_blank">
                <img class="icon" :src="`/chain/${log.fromchain}.png`" />{{
                  getShortAddr(log.from)
                }}
              </a>
            </td>
            <td>
              <img class="icon" :src="`/protocol/${log.protocol}.png`" />{{
                log.protocol
              }}
            </td>
            <td>
              <a
                v-if="log.to"
                :href="` ${getExplorerUrl(log.tochain) + log.to} `"
                target="_blank"
              >
                <img class="icon" :src="`/chain/${log.tochain}.png`" />{{
                  getShortAddr(log.to)
                }}
              </a>
              <span v-else>-</span>
            </td>
            <td>
              <span
                class="uk-label"
                :class="{
                  success: log.state === 'success',
                  pending: log.state === 'pending',
                }"
                >{{ log.state }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!loading" class="page-container">
      <div class="page" v-for="index in page_max" :key="index">
        <span
          class="page-span"
          :class="{ activepage: index === page_current }"
          @click="moveTo(index)"
        >
          {{ index }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.searchbar-container {
  position: relative;
}
.searchbar {
  padding: 0px 20px 0px 20px;
  background-color: rgba(217, 217, 217, 0.537);
  outline: 2px solid rgb(236, 114, 232);
  height: 50px;
  border-radius: 30px 30px 30px 30px;
}

.filter {
  display: inline-block;
  margin-top: 10px;
}

@media (min-width: 640px) {
  .filter {
    padding-right: 10px;
  }
}

.filter-title {
  padding: 7px 0px 0px 20px;
  background-color: rgba(217, 217, 217, 0.537);
  border-radius: 20px 0px 0px 20px;
  height: 35px;
  font-size: 0.75rem;
  width: 70px;
  display: inline-block;
}

.filter-title-small {
  width: 50px;
}
.filter-title > span {
  position: relative;
  top: 1px;
  font-weight: 500;
}
.filter > .uk-select,
.uk-button {
  padding: 0px 10px 0px 10px;
  background-color: rgba(217, 217, 217, 0.537);
  border: 0px solid rgba(217, 217, 217, 0.537);
  border-radius: 0px 20px 20px 0px;
  height: 35px;
  font-size: 0.75rem;
  display: inline-block;
  width: calc(100% - 70px);
  cursor: pointer;
  text-align: left;
}

.filter-button {
  position: relative;
  text-transform: none;
}

.filter-hover:hover {
  opacity: 0.7;
  transition: opacity 0.1s linear;
}
.filter-button-small {
  width: calc(100% - 50px);
}
.filter-span {
  position: relative;
  top: -2px;
}
.filter-close {
  position: absolute;
  top: -2px;
  right: 20px;
  color: rgb(223, 103, 103);
  font-weight: 500;
}
.page-container {
  padding: 0px 20px 0px 20px;
  height: 50px;
  padding: 15px;
  text-align: center;
}

.page {
  padding: 5px;
  display: inline;
}
.page-span:hover {
  cursor: pointer;
  text-decoration: underline;
}
.activepage {
  font-weight: 600;
}

input {
  width: calc(100% - 25px);
  height: 50px;
  background-color: transparent;
  border: none;
  caret-color: var(--vt-c-black-soft);
  font-size: 0.8rem;
  font-family: "Poppins", sans-serif;
}

input::placeholder {
  color: var(--vt-c-black-soft);
  font-family: "Poppins", sans-serif;
}

textarea:focus,
input:focus {
  outline: none;
}

.search-spinner {
  position: absolute;
  width: 18px;
  right: 20px;
  top: 15px;
  opacity: 0.7;
}

.main-spinner {
  text-align: center;
  padding-top: 150px;
}
.search-icon {
  position: absolute;
  width: 18px;
  right: 20px;
  top: 15px;
  opacity: 0.7;
}
.search-icon:hover {
  cursor: pointer;
  opacity: 0.9;
}
.table {
  border: 0px solid var(--color-highlight);
  border-radius: 0px 0px 0px 0px;
  padding: 20px 10px 10px 10px;
  /*box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);*/
  color: var(--vt-c-black-soft);
}

th {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vt-c-black-soft);
}
.icon {
  width: 15px;
  margin-right: 5px;
}

.uk-label {
  border-radius: 10px;
  font-size: 0.6rem;
}

.success {
  background-color: #32d296;
  color: #fff;
}
.pending {
  background-color: #faa05a;
  color: #fff;
}
</style>
