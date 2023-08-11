<script setup>
import Header from "./components/Header.vue";
import TransactionExplorer from "./components/TransactionExplorer.vue";
</script>

<template>
  <Header id="header" />
  <div class="main-container">
    <TransactionExplorer id="explorer" />
  </div>
</template>

<style scoped>
.main-container {
  padding: 10px;
}

#explorer {
  max-width: 1000px;
  margin: auto;
}

@media (min-width: 640px) {
  .main-container {
    padding: 20px;
  }
}

@media (min-width: 960px) {
  .main-container {
    padding: 30px;
  }
}
</style>
