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
            <th>Which</th>
            <th>To</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 10" :key="index">
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-container">
      <div class="page">1 2 3 4 5</div>
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

.page {
  padding: 0px 20px 0px 20px;
  height: 50px;
  padding: 15px;
  text-align: center;
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
</style>
