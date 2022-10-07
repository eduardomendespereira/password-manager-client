<template>
  <Sidebar />
</template>

<style lang="scss">
@import "~bulma/bulma.sass";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script>
import Sidebar from "@/components/Sidebar";
import LoginView from "@/views/login/LoginView";
export default {
  components: {Sidebar}
}
</script>