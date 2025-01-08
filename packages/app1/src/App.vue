<script>
import Button from 'app3/Button'
export default {
  components: {
    HelloWorld: () => import("./components/HelloWorld.vue"),
    Button,
  },

  created() {
    console.log("Rspack + Vue");
  },
};
</script>

<template>
  <div class="container">
    <div>
      rspack cache
    </div>
    <HelloWorld msg="Rspack + Vue" />
    <Button text="Click me"></Button>
  </div>
</template>

<style scoped lang="less">
.container {
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #eeea8caa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>