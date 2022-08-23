import { ref } from "vue";
const showFloatingForm = ref(true);
export function useFloatingInput() {
    return { showFloatingForm };
}
