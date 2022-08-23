import { defineStore } from "pinia";

export const usePreregStore = defineStore("prereg", {
    state: () => {
        return {
            handle: "",
            email: "",
            showModal: false,
        };
    },
    actions: {
        toggleModal() {
            this.showModal = !this.showModal;
        },
    },
});
