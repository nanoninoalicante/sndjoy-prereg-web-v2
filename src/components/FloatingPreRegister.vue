<template>
    <div class="w-full fixed bottom-0 z-50 left-0 px-0 py-2 flex justify-center items-center"
        :class="{ hidden: !isOnHomePage }">

        <Teleport to="body">
            <div v-if="verificationChallenge"
                class="fixed w-full h-full top-0 left-0 backdrop-blur-xl flex justify-center items-center z-[9999]">
                <div class="flex flex-row space-x-2 p-8 rounded-2xl bg-white shadow-xl">
                    <MazInput v-model="verificationChallengeCode" type="number" auto-focus id="required"
                        label="Verification Code" size="lg" required />

                    <PrimaryButton id="sign-in-button" class="shadow-xl px-3 py-2"
                        :disabled="!verificationChallengeCode" @click="submitVerificationChallenge">
                        <!-- <ArrowRightIcon class="w-6 h-6 fill-white"></ArrowRightIcon> -->
                        >
                    </PrimaryButton>
                </div>
            </div>
        </Teleport>
        <div class="w-full md:w-2/3 lg:w-3/5 px-2 py-4 rounded-3xl bg-white">
            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800">
                <div class="relative w-full">
                    <MazPhoneNumberInput list-position="top left" v-model="phoneNumber" show-code-on-list color="info"
                        @update="phoneNumberResults = $event" :success="phoneNumberResults?.isValid" />
                </div>
                <div v-auto-animate class="buttons flex items-stretch">
                    <PrimaryButton id="sign-in-button" class="shadow-xl px-3 py-2" :disabled="!formIsValid"
                        @click="preregWithPhone">
                        <!-- <ArrowRightIcon class="w-6 h-6 fill-white"></ArrowRightIcon> -->
                        >
                    </PrimaryButton>
                </div>
            </div>

            <!-- <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage v-for="error in v$.phone.$silentErrors" :key="error.$uid" :error="error"
                    class="shadow-xl" />
                <SuccessInputMessage v-if="!v$.phone.$invalid && v$.phone.$dirty"
                    :message="'That\'s a good lookin handle!'" class="shadow-xl"></SuccessInputMessage>
            </div> -->
        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref, watch } from "vue";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazInput from 'maz-ui/components/MazInput'
import PrimaryButton from "@/components/PrimaryButton.vue"
import { usePreReg } from "@/composables/prereg";
import { vAutoAnimate } from "@/directives/directives";
import { useRoute } from "vue-router";
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
const verificationChallengeCode = ref()
const phoneNumber = ref()
const phoneNumberResults = ref()
const route = useRoute();
const isOnHomePage = computed(
    () => route.fullPath === "/pre-registration-sndjoy" || route.fullPath === "/pre-registration-sndjoy/"
);

const { preregData, fullPageLoader } = usePreReg();

const formIsValid = computed(() => {
    return phoneNumberResults.value?.isValid || false;
});


/*
AUTH
*/
const verificationChallenge = ref(false);
const app = initializeApp({
    apiKey: "AIzaSyCk6gp4cxuhDaOFVWMq58dIaDalwbJGOSQ",
    authDomain: "sndjoy-development.firebaseapp.com"
})
const auth = getAuth(app);
const { isAuthenticated, user } = useAuth(auth)

const submitVerificationChallenge = async () => {
    try {
        fullPageLoader.value = true;
        const response = await window.firebaseResponse.confirm(verificationChallengeCode.value);
        console.log('response from challenge: ', response);
        fullPageLoader.value = false;
        return response;

    } catch (error) {
        console.log("error from verification challenge: ", error);


    }
}

const preregWithPhone = async () => {
    try {
        fullPageLoader.value = true;
        const response = await signInWithPhoneNumber(auth, phoneNumberResults.value?.e164, window.recaptchaVerifier)
        console.log("response from firebase: ", response);
        window.firebaseResponse = response;
        verificationChallenge.value = response.verificationId;
        fullPageLoader.value = false;
    } catch (error) {
        console.log('error; ', error);
    }
}
onMounted(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            console.log("recaptcha res: ", response);
        }
    }, auth);
})



/*
WATCH
 */

watch(phoneNumber,
    (newVal) => {
        console.log("formatting phone: ", phoneNumberResults.value?.nationalNumber);
        console.log("formatting phone: ", phoneNumberResults.value?.countryCallingCode);
        console.log("formatting phone: ", phoneNumberResults.value);
        preregData.value.phone = phoneNumberResults.value?.nationalNumber?.trim();
        preregData.value.countryCallingCode = phoneNumberResults.value?.countryCallingCode?.trim();
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
</style>
