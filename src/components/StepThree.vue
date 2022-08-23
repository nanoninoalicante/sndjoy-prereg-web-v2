<template>
    <div class="flex flex-col items-center">
        <div class="mb-4 w-full flex flex-col space-y-3">
            <p
                class="text-left text-2xl font-medium tracking-tighter text-gray-700"
            >
                The pre-registration has been successful
            </p>
            <p
                class="text-left text-xl font-medium tracking-tighter text-greay700"
            >
                We will send you an email to confirm that you are part of the
                Tonto community.
            </p>
          <CopyText>Copy this link and share it with your friends to grow your influence!</CopyText>
        </div>
        <div class="flex flex-col items-center space-y-2">
            <button
                v-if="preregData.newHandles"
                class="box-shadow-xl pointer-events-none m-4 flex items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl"
            >
                <span
                    class="text-xl font-bold leading-7 tracking-tighter text-white"
                    >{{ preregData.newHandles }}</span
                >
                <CheckCircleIcon
                    class="pointer-events-none inline h-8 w-8 text-teal-400"
                ></CheckCircleIcon>
            </button>
            <button
                v-if="preregData.emailAddress"
                class="box-shadow-xl pointer-events-none m-4 flex items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl"
            >
                <span
                    class="text-xl font-bold leading-7 tracking-tighter text-white"
                    >{{ preregData.emailAddress }}</span
                >
                <CheckCircleIcon
                    class="pointer-events-none inline h-8 w-8 text-teal-400"
                ></CheckCircleIcon>
            </button>
        </div>
        <div class="mt-12 flex flex-col space-y-2">
            <PrimaryButton @click.once="resetForm">
                <div class="flex items-center">
                    <RefreshIcon class="mr-1 h-8 w-8"></RefreshIcon>
                    Register another handle
                </div>
            </PrimaryButton>

            <a
                class="font-heading inline-block cursor-pointer rounded-3xl border-2 border-teal-500 bg-white p-4 text-center text-xl font-medium leading-7 tracking-tighter text-teal-900 hover:bg-teal-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50"
                href="https://www.gettonto.com"
            >
                Go to website
            </a>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon } from "@heroicons/vue/solid";
import { onMounted } from "vue";
import { usePreReg } from "@/composables/prereg";
import { RefreshIcon } from "@heroicons/vue/outline";
import CopyText from "./CopyText";

const { preregData, resetForm } = usePreReg();

onMounted(() => {
    if (
        !preregData.value?.newHandles ||
        preregData.value?.newHandles.length === 0 ||
        !preregData.value?.emailAddress ||
        preregData.value?.emailAddress.length === 0
    ) {
        window.location.href = "/pre-registration-tonto/";
    }
});
</script>
