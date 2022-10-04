import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { getAuth } from "firebase/auth";



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
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken(true);
    console.log("idtoken: ", idToken);
    const body = {
        phonePrefix: "+34",
        phoneNumber: "644632342",
        fullPhoneNumber: "644632342",
        firebaseId: "jWlxaviJkVaGdpBGc3P02OGpvNC3",
        analyticsDetails: "instagram-post",
        preregDetails: "joygiver"
    }
    return await fetch("https://webhook.site/d8bd39e6-c931-41d5-9b42-4bb02eb160be/prereg", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${idToken}`
        }
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
