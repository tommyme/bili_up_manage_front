
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Tree from '../components/tree.vue'
import { useTreeStore } from '../stores/tree';
import { useQuasar } from 'quasar'
const $q = useQuasar()
let leftDrawerOpen = $ref(false)
const treeStore = useTreeStore()
function toggleLeftDrawer () {
  leftDrawerOpen = !leftDrawerOpen
}
// const sidebarNodes = [
//   {
//     label: '前端 (you can add avatar)',
//     mid: 0,
//     avatar: 'http://localhost:8000/pic?url=http://i1.hdslb.com/bfs/face/aae96b1999210a708dc1a44279f8c69105d987ed.jpg',
//     children: [
//       {
//         label: 'vue (with icon)',
//         icon: 'restaurant_menu',
//         mid: 0,
//         children: [
//           { label: 'vue讲师ybw', mid: 980977 },
//           { label: 'vue3萌新', mid: 192873 }
//         ]
//       },
//     ]
//   }
// ]
let masker = ref('')
</script>
<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-pink-3 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        
        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/bili.png">
          </q-avatar>
          pilipili
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer class="bg-cyan-1" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <Tree @dragging="masker = 'mask'" @drag-over="masker = ''"/>
    </q-drawer>

    <q-page-container :class="masker">
      <q-scroll-area :style="{
        height:$q.screen.height-50+'px', 
        'max-width': '100wh'
      }">
        <router-view />
      </q-scroll-area>
    </q-page-container>

  </q-layout>
</template>
<style lang="scss" scoped>
.mask::after {
  position:absolute;
  left: 0;
  top:0;
  display: block;
  width:100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  content: attr(data-text);
  color: #FFF;
}
</style>