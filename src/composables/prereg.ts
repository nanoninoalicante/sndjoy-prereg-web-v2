import { ref } from "vue";
import { useStorage } from "@vueuse/core";

/*
STATE
 */
const preregData: any = useStorage("prereg", {
    emailAddress: "",
    phone: "",
    countryCallingCode: "",
    newHandles: "",
    termsAccepted: false,
});
const submittingLoading = ref(false);
const modal = ref(null);
const fullPageLoader = ref(false);

/*
METHODS
 */
const setModal = (val) => (modal.value = val);
const resetForm = async () => {
    preregData.value.newHandles = "";
    preregData.value.emailAddress = "";
    preregData.value.phone = "";
    preregData.value.countryCallingCode = "";
    preregData.value.termsAccepted = false;
    window.location.reload();
};

const savePrereg = async () => {
    const body = {
        testing: "hello"
    }
    return await fetch("https://sndjoy-prereg-api-dev-v1-us-h23jvfs7iq-ue.a.run.app/prereg", {
        method: "POST",
        body: JSON.stringify(body)
    })
}

export function usePreReg() {
    return {
        submittingLoading,
        modal,
        setModal,
        resetForm,
        preregData,
        fullPageLoader,
        savePrereg
    };
}
