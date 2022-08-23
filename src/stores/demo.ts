import { defineStore, acceptHMRUpdate } from "pinia";

export const useDemoStore = defineStore("demo", {
    state: () => {
        return {
            hello: "world",
        };
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDemoStore, import.meta.hot));
}
