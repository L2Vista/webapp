<template>
  <nav class="uk-navbar-container">
    <div class="uk-container">
      <div uk-navbar>
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li class="uk-active"><a class="logo" href="/">L2vista</a></li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
            <li><a href="https://github.com/L2Vista" target="_blank">Github</a></li>
            <li><a href="https://sharp-saw-d58.notion.site/D3LAB-10c829858e4c42eda1ce140f3e7e77bf" target="_blank">About Us</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.uk-navbar-container {
  height: 60px;
}
.logo {
  text-transform: none;
  font-family: "Borel", cursive;
  font-size: 1.5rem;
  color: var(--vt-c-black-soft);
  position: relative;
  top: 6px;
}
</style>
