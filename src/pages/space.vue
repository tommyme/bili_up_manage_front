<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, onUpdated, watch } from 'vue';
import videoCard from '../components/videoCard.vue';
import upOperation from '../components/upOperation.vue';
import router from '../route/routes';
import { jsonFetch } from '../utils/fetch';
import { useTreeStore } from '../stores/tree';

const route = useRoute();
let items = $ref([])
let sign = $ref('')
const mid = $computed(()=>route.params.mid)
const gid = $computed(()=>route.params.gid as string)
const treeStore = useTreeStore()
let otherGroups = $ref([])
const qtree = $ref(null)
function loadUpVideos() {
  if (mid == null) return
  console.log("[space] fetching video data...");
  jsonFetch(
    `/videos?mid=${mid}`,
    data => {
      console.log("[space] video data fetched");
      items = data;
    }
  )
}
function loadUpSign() {
  if (mid == null) return
  treeStore.groupedUps[gid].map(
    (item) => {
      if (item.mid == mid) { sign = item.sign }
    }
  )
}
function loadOtherGroups() {
  if (mid == null) return
  otherGroups = treeStore.groups.filter(
    (item) => item.tagid != gid
  )
}
function loadAll(){
  loadUpVideos()
  loadUpSign()
  loadOtherGroups()
}
onMounted(() => {
  if (!treeStore.groupedUps[gid]) {
    router.replace({ name: 'home' })
    return
  }
  loadAll()
})
watch(
  () => mid,
  () => {
    console.log("[space] [update]", mid);
    loadAll();
  }
);
</script>
<template lang="pug">
.root
  upOperation(:mid="mid" :otherGroups="otherGroups")
  q-card.sign(style="background: radial-gradient(circle, bisque 0%, cornsilk 100%)")
    q-card-section {{sign}}
  //- p {{ mid ? mid : "no id" }}
  .row.cards
    .col.card(v-for="item in items")
      videoCard(:data="item")
</template>
<style scoped lang="scss">
.card {
  min-width: 25%;
}
.sign {
  max-width: 50%;
  text-align: center;
  margin: 0 auto;
}

.cards {
  height: 100%;
  overflow: hidden;
}
</style>
