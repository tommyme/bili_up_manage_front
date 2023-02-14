<script setup lang="ts">
import { jsonFetch } from '../utils/fetch';
import { type GroupInfo } from './types'
interface Props {
  mid: string | string[]
  otherGroups: GroupInfo[]
}
function changeGroup(tagid: number) {
  console.log("changeGroup", tagid)
}

const { mid, otherGroups } = defineProps<Props>()
</script>
<template lang="pug">
.q-pa-md.root
  q-btn-dropdown(color="primary" label="operation")
    q-list 
      q-item(clickable v-close-popup)
        q-item-section
          q-item-label 主页
      q-item(clickable v-close-popup)
        q-item-section 
          q-item-label 取关
      q-item
        q-item-section  
          q-item-label {{mid}}

  q-btn-dropdown(color="primary" label="更改分组")
    q-list(v-for="item in otherGroups")
      q-item(clickable v-close-popup @click="changeGroup(item.tagid)")
        q-item-section
          q-item-label {{item.name}} {{item.tagid}}
</template>
<style lang="scss" scoped>
.root {
  text-align: center;
}
</style>
