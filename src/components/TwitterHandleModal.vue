<template>
    <h3 class="mb-8 text-3xl font-semibold text-gray-900">
        <TwitterIcon height="32" width="32" class="mr-2 inline-block fill-twitter"></TwitterIcon>It
        looks like your handle is verified on twitter.
    </h3>
    <h3 class="my-4 text-xl font-semibold text-gray-700">
        But don't worry we can still reserve your handle - just send us a PM on twitter from your
        account and we'll get you verified on Tonto
    </h3>
    <p class="my-8 inline-block rounded-full bg-gray-100 p-4 text-2xl font-medium text-gray-500">
        <TwitterVerifiedIcon class="mr-1 inline-block h-6 w-6"></TwitterVerifiedIcon
        >{{ preregData.newHandles || "@elonmusk" }}
    </p>
    <div class="flex flex-wrap justify-center space-y-2">
        <div class="w-full">
            <a
                class="font-heading mr-4 inline-block w-full cursor-pointer rounded-xl bg-teal-500 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 lg:mb-0"
                @click="handleAcceptTwitterHandle"
                >Message us on Twitter to reserve
                <span class="ml-1 underline">{{ preregData.newHandles }}</span></a
            >
        </div>
        <p class="text-xl font-medium font-bold text-gray-500">or</p>
        <div class="w-full">
            <a
                class="font-heading mr-4 mb-2 inline-block w-full cursor-pointer rounded-xl bg-gray-300 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-gray-500 hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 lg:mb-0"
                @click="handleClose"
                >Edit this handle instead</a
            >
        </div>
    </div>
</template>
<script setup>
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import TwitterVerifiedIcon from "@/components/icons/TwitterVerifiedIcon.vue";
import { usePreReg } from "@/composables/prereg";
const emit = defineEmits(["close"]);
const { preregData } = usePreReg();
const handleClose = () => {
    navigateTo({
        path: "/pre-registration-tonto/",
        query: {
            twitter: true,
        },
    });
    emit("close");
};
const handleAcceptTwitterHandle = () => {
    navigateTo({
        path: "/pre-registration-tonto/step-3",
        query: {
            twitter: true,
        },
    });
    const twitterPopup = window.open(
        "https://www.twitter.com/@gettonto",
        "twitterPopup",
        "status=1, height=800, width=500, toolbar=0,resizable=0"
    );
    twitterPopup.window.focus();
    emit("close");
};
</script>
