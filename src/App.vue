<template>
  <main class="main-view">
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
.main-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
