<template>
  <test-slot>
    <template #header>fuck</template>
    <template #default>fuck2</template>
    <template #footer>fuck3</template>
  </test-slot>
</template>

<script setup>
import { ref } from 'vue'
import TestSlot from '../components/testSlot.vue'
</script>
