<script lang="ts" setup>
import { useRoute } from 'vue-router';
import DynamicCard from '../components/dynamicCard.vue';
import { jsonFetch } from '../utils/fetch';
const route = useRoute();
let items: any[] = $ref([])
const gid = $computed(()=>route.params.gid)
let pg = 1
let maxTries = 5

function loadItems() {
  while (items.length == 0 && maxTries > 0) {
    jsonFetch(
      `/polymer_dynamic?page=${pg}&groupId=${gid}`,
      (jsonData: any[])=>{
        if (jsonData.length > 0) {
          items.push(...jsonData)
        }
      },
    )
    maxTries--
    pg++
  }
  maxTries = 5
}
function onLoad(_index: number, done: Function) {
  loadItems()
  done()
}
// loadItems()
</script>
<template lang="pug">
.root
  p Group-component: {{gid}}
  //- q-infinite-scroll(@load="onLoad" :offset="250")
  //-   .cards(v-for="item in items")
  //-     DynamicCard(:item="item")
  //-   template(v-slot:loading)
  //-     .row.justify-center.q-my-md
  //-       q-spinner-dots(color="primary" size="40px")
</template>