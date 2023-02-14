<script setup lang="ts">

interface Props {
  msg: string
  array?: string[]
}

const {
  msg = "default msg",
  array = ["default array"]
} = defineProps<Props>()

let count = $ref(0)

</script>

<template lang="pug">
.root
  h1 {{ msg }}
  .array
    p(v-for="item in array") {{ item }}
  p.
    IDE:
    #[a(href="https://code.visualstudio.com/" target="_blank") Visual Studio Code]
    +
    #[a(href="https://github.com/johnsoncodehk/volar" target="_blank") Volar]

  p
    | See 
    code README.md
    |  for more info

  p {{ count }} times
  q-btn(label="quasar button" @click="count++") 

  .test-scss
    p support for scss
</template>

<style scoped lang="scss">

a {
  color: #42b983;
}

h1 {
  font-size: 1.5em;
  margin: 0;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.test-scss {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
  margin-top: 40px;

  p {
    font-size: 2em;
    color: $secondary;
  }
}
</style>
