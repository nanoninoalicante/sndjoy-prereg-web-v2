<template>
    <div class="space-x-2 rounded-full bg-teal-500 py-2 px-4 text-white">
        <ThumbsUp />
        <span
            class="text-md font-medium leading-7 tracking-tighter"
            >{{ message || "Almost there" }}</span
        >
    </div>
</template>
<script setup>
import ThumbsUp from "./ThumbsUp";
const props = defineProps(["message"]);
const message = props.message;
</script>
