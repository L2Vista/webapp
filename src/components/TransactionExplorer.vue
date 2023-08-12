<script>
import { getLogArray, getExplorerUrl, NUM_OF_LOGS } from "../assets/explorer.js";
import { RPC_ENDPOINT } from "../assets/env.js";
import axios from "axios";

export default {
  data() {
    return {
      logArray: getLogArray(),
      count: 0,
      page_current: 1,
      page_max: 0,
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
    async loadLogs(amount, skip, tochain = null, fromchain = null, hash = null) {
      let request = RPC_ENDPOINT + "tx?amount=" + amount + "&skip=" + skip;
      if (tochain !== null) request += "&tochain=" + tochain;
      if (fromchain !== null) request += "&fromchain=" + fromchain;
      if (hash !== null) request += "&hash=" + hash;
      await axios
        .get(request)
        .then((res) => {
          if (!res.status) console.error("load history 실패 ", res);
          // 성공했을 경우
          console.log("load history 성공", res);
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
              timestamp: timestamp,
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
    async getCount(tochain = null, fromchain = null, hash = null) {
      let request = RPC_ENDPOINT + "txcount?";
      if (tochain !== null) request += "&tochain=" + tochain;
      if (fromchain !== null) request += "&fromchain=" + fromchain;
      if (hash !== null) request += "&hash=" + hash;
      return await axios
        .get(request)
        .then((res) => {
          // 성공했을 경우
          console.log("getCount 성공", res);
          return res.data.data;
        })
        .catch((res) => {
          // 실패했을 경우
          console.error("load history 실패 ", res);
          return 0;
        });
    },
    async moveTo(page) {
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
  },
};
</script>

<template>
  <div class="explorer-container">
    <div class="searchbar-container">
      <div class="searchbar">
        <input type="text" placeholder="Search by address" aria-label="Input" />
        <img class="search-icon" src="/search-icon.svg" />
      </div>
    </div>
    <div class="table uk-overflow-auto">
      <table class="uk-table uk-table-hover uk-table-divider">
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
            <td>{{ log.state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-container">
      <span
        class="page"
        v-for="index in page_max"
        :key="index"
        :class="{ activepage: index === page_current }"
        @click="moveTo(index)"
      >
        {{ index }}
      </span>
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
  border: 0px solid rgba(217, 217, 217, 0.537);
  height: 50px;
  border-radius: 30px 30px 30px 30px;
}

.page-container {
  padding: 0px 20px 0px 20px;
  height: 50px;
  padding: 15px;
  text-align: center;
}

.page {
  cursor: pointer;
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
</style>
