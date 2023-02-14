<script setup lang="ts">
import { type videoInfo } from './types';
interface Props {
  data: videoInfo;
}
const {
  data
} = defineProps<Props>()

function jump2bili(){
  window.open(`https://www.bilibili.com/video/${data.bvid}`);
}
function parseTimeStamp(time: number) {
  var d = new Date(time*1000)
  return d.toDateString()
}
function parsePlayTimes(play: number) {
  if (play < 10000) {
    return play
  }
  if (play < 100000) {
    return (play / 1000).toFixed(1) + 'k'
  }
  return (play / 10000).toFixed(1) + 'w'
}
</script>
<template lang="pug">
.card-holder
  .q-pa-md.my-card
    q-card
      img(:src="data.pic" @click="jump2bili")
      q-card-section.q-pa-sm
        .text-caption {{data.title}}
        .text-body2 L:{{data.length}} C:{{data.comment}} T:{{parseTimeStamp(data.created)}} P:{{parsePlayTimes(data.play)}}
</template>
<style scoped lang="scss">
.card-holder {
  .my-card {
    display: inline-block;
    .text-body2 {
      font-size: 0.75rem;
    }
  }
}

</style>
