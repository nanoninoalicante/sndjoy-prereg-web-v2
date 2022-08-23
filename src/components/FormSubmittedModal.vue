<template>
    <h3 class="mb-2 text-3xl font-semibold text-gray-900">
        <ThumbsUp class="text-3xl" />Congratulations on securing your handle
    </h3>
    <p class="inline-block my-6 text-2xl p-4 bg-gray-100 rounded-full font-medium text-gray-500">
        {{ preregData.newHandles }}
    </p>
    <div class="flex flex-wrap justify-end">
        <div class="w-full p-2 md:w-1/2">
            <a
                class="font-heading mr-4 mb-2 inline-block w-full cursor-pointer rounded-xl bg-teal-500 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 lg:mb-0"
                @click="accept"
                >Got It</a
            >
        </div>
    </div>
</template>
<script setup>
import ThumbsUp from "./ThumbsUp.vue";
import { usePreReg } from "@/composables/prereg";
const emit = defineEmits(["accepted"]);
const { preregData } = usePreReg();
const accept = () => {
    navigateTo({
        path: "/step-3/",
    });
    emit("accepted");
};
</script>
