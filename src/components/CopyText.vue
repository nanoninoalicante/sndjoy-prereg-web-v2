<script setup>
import { vAutoAnimate } from "../directives/directives";
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";
const shareLinkUrl = ref("https://start.gettonto.com");
const { text, copy, copied, isSupported } = useClipboard();
/*
METHODS
 */

const handleCopyLink = () => {
    copy(shareLinkUrl.value);
};
</script>
<template>
    <div
        @click="handleCopyLink"
        v-auto-animate
        class="relative cursor-pointer text-left text-xl font-medium tracking-tighter text-gray-700 underline hover:text-teal-500 active:text-teal-400"
    >
        <slot></slot>
        <div
            v-if="copied"
            class="absolute -top-10 -mt-4 block rounded-full bg-white p-3 text-gray-700 shadow-xl"
        >
            Copied!
        </div>
    </div>
</template>
