<template>
  <nav class="uk-navbar-container">
    <div class="uk-container">
      <div uk-navbar>
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li class="uk-active"><a class="logo">L2vista</a></li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
            <li><a href="#">Github</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">About Us</a></li>
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
