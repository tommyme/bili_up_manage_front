<script lang="ts" setup>
import { jsonFetch } from '../utils/fetch';
import { type polymer_dyn_data } from '../pages/types';
interface Props {
  item: polymer_dyn_data;
}
const {
  item
} = defineProps<Props>();


const lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et consectetur accusamus autem iste repellendus soluta eveniet hic! Nostrum voluptatem quae odio cupiditate mollitia sunt. Quas similique at mollitia ab commodi."
const title = "Title"
</script>
<template lang="pug">
.root 
  q-card.my-card(flat bordered)
    q-card-section(horizontal)
      q-img(class="col-5" :src="item.cover")
      q-card-section
        q-card-section {{item.title}} 
        q-card-section {{item.desc}}
</template>
<style lang="scss" scoped>
.root {
  .q-img {
    width: 40%;
  }
  max-width: 65%;
  margin: 0 auto;
}
</style>