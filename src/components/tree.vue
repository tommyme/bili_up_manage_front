<script setup lang="ts">
import {type TreeNode} from './types'
import router from '../route/routes';
import { onMounted, ref } from 'vue';
import {jsonFetch} from '../utils/fetch'; 
import { useTreeStore } from '../stores/tree';

const emit = defineEmits(['dragging', 'drag-over'])
// import {useRoute, onBeforeRouteUpdate} from 'vue-router'
// const route = useRoute()
let Nodes = $ref([])
const treeStore = useTreeStore()
const qtree = $ref(null)

onMounted(()=>{
  console.log("fetching Tree data...");
  jsonFetch('/groups',(data)=>{
    console.log("fetching Tree data success");
    Nodes = data
    treeStore.groups = data
    // console.log(data)
  })
})
function goto(id: number | null) {
  console.log("[Tree] goto", id);
  if (id == null || id == 0) {
    console.log("[Tree] goto homepage")
    router.replace(
      {name:'home'}
    )
  } else if (String(id).startsWith("t:")){
    router.replace({
      name:'group',
      params: { gid: id }
    })
  } else {
    const tag = qtree.getNodeByKey(id).tag
    let gid = !tag ? 0 : tag[0]
    console.log("gid", gid)
    router.replace({
      name: 'space',
      params: { mid: id, gid: gid }
    })
  }
}
function OnLazyLoad({key, done}: {key: string, done: Function}) {
  jsonFetch(`/followings?key=${key}`,(data)=>{
    treeStore.groupedUps[key.slice(2)] = data
    done(data)
    console.log(treeStore.groupedUps)
  })
}

const selected = $ref("")
const logit = (x) => {
  console.log(x)
}
const isDragging = ref(false)

function onDragStart(e: DragEvent) {

  isDragging.value = true
  console.log("start", e.target, e.target.attributes.upid.value)
  e.dataTransfer.setData('text/plain', e.target.attributes.upid.value)
  emit('dragging')
}
function onDragEnd(e) {
  isDragging.value = false
  emit('drag-over')
}
function onDragEnter(e) {
  if (e.target.draggable !== true) {
    e.target.classList.add('drag-enter')
  }
}
function onDragLeave(e) {
  e.target.classList.remove('drag-enter')
}
function onDragOver(e) {
  e.preventDefault();
  console.log("over")
}
function onDrop(e) {
  e.preventDefault()
  console.log("drop", e)
  console.log(e.dataTransfer.getData('text'), 'to', e.target.attributes.gid.value)
}

function moveSubscriber(mid, gid) {

}
</script>
<template >

<div>
  <q-tree
    class="q-pa-md q-gutter-sm"
    ref="qtree"
    node-key="mid" 
    :nodes="Nodes"
    selected-color="primary"
    default-expand-all
    v-model:selected="selected"
    @update:selected="(id) => goto(id)"
    @lazy-load="OnLazyLoad"
  >
    <template #default-header="treeNode">
      <q-item :draggable="true ? treeNode.node.face !== undefined : false" :style="{'padding': 0, 'min-height': 0}" 
      @dragstart="onDragStart" 
      @dragend="onDragEnd"
      :upId="treeNode.node.mid">
        <q-item-section avatar v-if="treeNode.node.face" :style="{'padding': 0, 'min-width':'40px'}">
          <q-avatar :style="{'padding': 0}">
            <img draggable="false" :src="treeNode.node.face" >
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-overline">{{ treeNode.node.label }}</div>
        </q-item-section>
      </q-item>
    </template>
  </q-tree>
  <q-card class="dropCard" v-show="isDragging">
    <div v-for="group in treeStore.groups" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop" color="primary" @dragover="onDragOver">
      <div class="q-pa-sm" :gid="group.tagid" @click="logit(group)">
        {{ group.label }}
      </div>
    </div>
  </q-card>
</div>

<!-- //- @update:selected="$emit('updateSelected', selected)" -->
</template>

<style scoped>
.dropCard {
  position: fixed;
  top: 50%;
  left: 150%;
  transform: translate(-50%, -50%);
  z-index:99;
  width: max-content;
  max-height: 100%;
}
.drag-enter {
  outline-style: dashed
}
</style>
