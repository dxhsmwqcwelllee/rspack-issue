<template>
  <div>
    app2
  </div>
</template>

<script>
import utils from 'app1/utils';


export default {
  created() {
    console.log("app2 created", utils.add(1, 2));
  }
}
</script>

<style lang="scss" scoped>

</style>