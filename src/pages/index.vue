<script setup lang="ts">
import PugHello from '../components/pugHello.vue';
let array = $ref(["aaa","bbb","ccc"])
</script>

<template lang="pug">
.root
  img(
    alt="Vue logo"
    src="../assets/logo.png"
  )
  PugHello(
    msg="pnpm+vue+vite+quasar+pug+scss Template"
    :array="array"
  )
</template>

<style scoped lang="scss">
.root {
  margin-top: 60px;
  text-align: center;
}

</style>
