<template>
    <div class="w-full fixed bottom-0 z-50 left-0 px-0 py-8 flex flex-col justify-center items-center"
        :class="{ hidden: !isOnHomePage }">
        <div v-if="!preregUserType" class="w-full mx-6 px-6 space-x-4 mb-3 flex flex-row justify-center items-center">
            <button @click="preregUserType = 'joygiver'"
                class="p-4 bg-primary-500 shadow-lg text-xl rounded-3xl font-bold text-white hover:bg-primary-700 hover:text-white">I
                want to be a JoyGiver 🎁</button>
            <button @click="preregUserType = 'customer'"
                class="p-4 bg-primary-500 shadow-lg text-xl rounded-3xl font-bold text-white hover:bg-primary-700 hover:text-white">I
                need to get a gift for someone 🎈</button>
        </div>
        <div v-else class="w-full mx-6 px-6 space-x-4 mb-1 flex flex-row justify-center items-center">
            <button @click="preregUserType = 'joygiver'"
                :class="preregUserType === 'joygiver' ? 'bg-primary-500 border-primary-700' : 'bg-gray-200'"
                class="px-4 py-1 text-md rounded-3xl border-2 font-medium text-white hover:bg-primary-500 hover:text-white">
                I want to be a JoyGiver 🎁</button>
            <button @click="preregUserType = 'customer'"
                :class="preregUserType === 'customer' ? 'bg-primary-500 border-primary-700' : 'bg-gray-200'"
                class="px-4 py-1 text-md rounded-3xl border-2 font-medium text-white hover:bg-primary-500 hover:text-white">
                I need to get a gift for someone 🎈</button>
        </div>
        <div v-show="preregUserType" class="w-full md:w-2/3 lg:w-3/5 px-2 py-4 rounded-3xl bg-white">

            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800">
                <div v-if="!verificationChallenge" class="relative w-full">
                    <MazPhoneNumberInput list-position="bottom left" v-model="phoneNumber" show-code-on-list
                        color="info" @update="results = $event" :success="results?.isValid" />
                </div>
                <teleport to="#popups">
                    <div v-if="verificationChallenge"
                        class="fixed z-[150] top-0 left-0 flex flex-col space-y-4 justify-center items-center px-6 h-full w-full bg-white bg-opacity-70 backdrop-blur-lg">
                        <h1 class="font-medium text-xl text-center">Please verify your phone below 👇</h1>
                        <input v-model="verificationCode" type="number" :disabled="verificationChallengeIsLoading"
                            class="p-4 border-2 text-2xl font-medium border-primary-500 rounded-2xl text-center w-[150px] md:w-[200px]"
                            placeholder="123456" />
                        <a href="/pre-registration-sndjoy"
                            class="underline hover:text-gray-400 hover:no-underline text-sm text-gray-500">Didn't
                            receive a code? <br>Please check your phone number again</a>
                    </div>
                </teleport>
                <div v-auto-animate class="buttons flex items-stretch">
                    <PrimaryButton v-if="!verificationChallenge" id="sign-in-button" class="shadow-xl px-3 py-2"
                        :disabled="!formIsValid" @click="preregWithPhone">
                        <!-- <ArrowRightIcon class="w-6 h-6 fill-white"></ArrowRightIcon> -->
                        >
                    </PrimaryButton>

                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref, watch } from "vue";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import PrimaryButton from "@/components/PrimaryButton.vue"
import { usePreReg } from "@/composables/prereg";
import { useAlerts } from "@/composables/alerts";
import { useFirebaseAuth } from "@/composables/firebase";
import { vAutoAnimate } from "@/directives/directives";
import { useRoute } from "vue-router";
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth'
const { addAlert } = useAlerts();
const phoneNumber = ref()
const preregUserType = ref()
const verificationCode = ref()
const verificationChallengeIsLoading = ref(false)
const firebaseResponse = ref()
const results = ref()
const route = useRoute();
const isOnHomePage = computed(
    () => route.fullPath === "/pre-registration-sndjoy" || route.fullPath === "/pre-registration-sndjoy/"
);

const { preregData, fullPageLoader, savePrereg } = usePreReg();

const formIsValid = computed(() => {
    return results.value?.isValid || false;
});


/*
AUTH
*/
const verificationChallenge = ref(false);
const { auth } = useFirebaseAuth();


const preregWithPhone = async () => {
    try {
        fullPageLoader.value = true;
        const response = await signInWithPhoneNumber(auth, results.value?.e164, window.recaptchaVerifier)
        console.log("response from firebase: ", response);
        window.firebaseResponse = response;
        firebaseResponse.value = response;
        verificationChallenge.value = response.verificationId;
    } catch (error) {
        console.log('error; ', error);
        addAlert({ message: error.message })
    } finally {
        fullPageLoader.value = false;
    }
}
const confirmVerificationCode = async () => {
    fullPageLoader.value = true;
    verificationChallengeIsLoading.value = true;
    const code = verificationCode.value;
    await firebaseResponse.value.confirm(code).then(async (result) => {
        const user = result.user;
        console.log("user: ", user);
        await updateProfile(auth.currentUser, {
            displayName: `prereg-web:${preregUserType.value}`
        })
        await savePrereg();
        window.location.href = "/pre-registration-sndjoy/step-2"
    }).catch((error) => {
        addAlert({ message: "Your verification code seems to not be quite right. Please try again" })
        fullPageLoader.value = false;
    });

    verificationChallengeIsLoading.value = false;
}
watch(verificationCode, (newValue) => {
    if (!newValue) return null;
    console.log("code: ", newValue.toString().length)
    if (newValue.toString().length >= 6) {
        confirmVerificationCode();
    }
})
onMounted(() => {
    const recaptcha = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            console.log("recaptcha res: ", response);
        }
    }, auth);
    window.recaptchaVerifier = recaptcha;
})



/*
WATCH
 */

watch(phoneNumber,
    (newVal) => {
        console.log("formatting phone: ", results.value?.nationalNumber);
        console.log("formatting phone: ", results.value?.countryCallingCode);
        console.log("formatting phone: ", results.value);
        preregData.value.phone = results.value?.nationalNumber?.trim();
        preregData.value.countryCallingCode = results.value?.countryCallingCode?.trim();
    }
);

/*
ON MOUNTED
 */

onMounted(async () => {
    if (preregData.value?.phone) {
        phoneNumber.value = preregData.value?.phone;
    }
});
</script>
<style>
.m-phone-number-input .m-input {
    height: 4rem !important;
}

.ma-input .ma-input-wrapper.maz-rounded-lg {
    border-radius: 1.8rem !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
