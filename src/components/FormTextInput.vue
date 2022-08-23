<template>
    <input
        type="text"
        v-auto-focus
        class="w-full rounded-xl border-4 border-red-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
    />
</template>
<script setup>
import { vAutoAnimate } from "@/directives/directives";
</script>
