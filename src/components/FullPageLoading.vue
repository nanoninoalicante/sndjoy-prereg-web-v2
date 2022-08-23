<template>
    <section
        v-if="showFullPageLoader"
        class="fixed top-0 left-0 right-0 bottom-0 z-10 flex h-full w-full items-center overflow-y-auto bg-gray-100 bg-opacity-20 p-4 backdrop-blur-lg"
    >
        <div class="m-auto flex w-full max-w-lg items-center justify-center">
            <CircleLoader></CircleLoader>
        </div>
    </section>
</template>
<script setup>
import CircleLoader from "@/components/CircleLoader.vue";

import { usePreReg } from "@/composables/prereg";
const prereg = usePreReg();
const showFullPageLoader = prereg.fullPageLoader;
</script>
