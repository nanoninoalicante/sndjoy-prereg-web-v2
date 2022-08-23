<template>
    <div
        class="my-2 rounded-2xl border-2 p-6 shadow-2xl"
        :class="[
            { 'border-yellow-500 bg-yellow-400': alert.type === 'warning' },
            { 'border-red-500 bg-red-400': alert.type === 'error' },
            { 'border-teal-500 bg-teal-400': alert.type === 'success' },
            { 'border-blue-500 bg-blue-400': alert.type === 'info' },
        ]"
    >
        <div class="-m-2 flex flex-wrap items-center justify-between">
            <div class="flex-1 p-1">
                <div class="-m-1 flex flex-wrap items-center justify-center">
                    <div class="w-auto px-2 py-1">
                        <p class="text-2xl">{{ icon }}</p>
                    </div>
                    <div class="py1 flex-1 px-2">
                        <h3 class="text-md font-medium text-gray-900">
                            {{ alert.message }}
                        </h3>
                    </div>
                </div>
            </div>
            <div v-if="alert.close === 'manual'" class="w-auto p-2">
                <button @click="removeAlert(alert.id)">
                    <!-- <XCircleIcon
                        class="h-8 w-8 text-gray-900 hover:opacity-70"
                    ></XCircleIcon> -->
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { XCircleIcon } from "@heroicons/vue/solid";
import { useAlerts } from "@/composables/alerts";
import { onBeforeUnmount, onMounted } from "vue";
const props = defineProps(["alert"]);
const alert = props.alert;
const { removeAlert } = useAlerts();
const timeoutDuration = 3000;
const icons = {
    success: "👍",
    warning: "😬",
    error: "😯",
    info: "👉",
};
const icon = icons[alert.type || "warning"];
const timeoutCloseAlert = () => {
    setTimeout(() => {
        removeAlert(alert.id);
    }, timeoutDuration);
};
onMounted(() => {
    console.log("alert mounted: ", alert.id);
    if (alert.close === "auto") {
        timeoutCloseAlert();
    }
});
</script>
