<template>
    <div class="modals">
        <teleport to="body">
            <section
                v-if="showModal"
                ref="modalRef"
                class="fixed top-0 left-0 right-0 bottom-0 z-10 flex h-full w-full items-center overflow-y-auto bg-gray-800 bg-opacity-80 p-4 backdrop-blur-lg"
            >
                <div
                    class="m-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
                >
                    <component
                        :is="selectedModal"
                        @accepted="modalAccepted"
                        @close="modalClosed"
                    />
                </div>
            </section>
        </teleport>
    </div>
</template>
<script setup>
import { usePreReg } from "@/composables/prereg";
import FormSubmittedModal from "./FormSubmittedModal.vue";
import TwitterHandleModal from "./TwitterHandleModal.vue";
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

const selectedModal = computed(() => {
    if (!showModal.value?.type) return TwitterHandleModal;
    return showModal.value?.type === "twitter"
        ? TwitterHandleModal
        : FormSubmittedModal;
});

const prereg = usePreReg();
const showModal = prereg.modal;
const modalRef = ref(null);
onClickOutside(modalRef, (event) => console.log(event));
const modalAccepted = () => {
    showModal.value = null;
};
const modalClosed = () => {
    showModal.value = null;
};
</script>
