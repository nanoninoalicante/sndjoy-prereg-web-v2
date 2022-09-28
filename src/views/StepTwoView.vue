<script setup>
import { onMounted } from 'vue';
import { usePreReg } from "@/composables/prereg";

const { fullPageLoader } = usePreReg();

onMounted(() => {
  fullPageLoader.value = false;
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-left text-5xl font-bold tracking-tighter leading-[1.2em] text-grey-700 mb-12">
      That's great! Thank you for pre-registering.
    </h1>
  </div>
</template>