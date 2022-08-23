<template>
    <div
        class="flex items-center space-x-2 rounded-full bg-warning-500 py-2 px-4 text-white"
    >
        <ExclamationCircleIcon
            class="h-6 w-6 text-white"
        ></ExclamationCircleIcon>
        <span
            class="text-md font-bold leading-7 tracking-tighter"
            >{{ error.$message }}</span
        >
    </div>
</template>
<script setup>
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
const props = defineProps(["error"]);
const error = props.error;
</script>
