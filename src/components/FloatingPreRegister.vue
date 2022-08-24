<template>
    <div class="w-full fixed bottom-0 z-50 left-0 px-0 py-2 flex justify-center items-center"
        :class="{ hidden: !isOnHomePage }">
        <div class="w-full md:w-2/3 lg:w-3/5 px-2 py-4 rounded-3xl bg-white">

            <div class="fixed top-0 right-0 bg-white z-[999999]"><code>{{ results }}</code></div>
            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800">
                <div v-if="!verificationChallenge" class="relative w-full">
                    <MazPhoneNumberInput list-position="top left" v-model="phoneNumber" show-code-on-list color="info"
                        @update="results = $event" :success="results?.isValid" />
                </div>
                <div v-if="verificationChallenge" class="relative w-full">
                    <input type="text" class="p-4 border-2 border-primary-500 rounded-2xl w-full" placeholder="12345" />
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
import PrimaryButton from "@/components/PrimaryButton.vue"
import { usePreReg } from "@/composables/prereg";
import { vAutoAnimate } from "@/directives/directives";
import { useRoute } from "vue-router";
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
const phoneNumber = ref()
const results = ref()
const route = useRoute();
const isOnHomePage = computed(
    () => route.fullPath === "/pre-registration-sndjoy" || route.fullPath === "/pre-registration-sndjoy/"
);

const { preregData } = usePreReg();

const formInputLoading = ref(true);

const formIsValid = computed(() => {
    return results.value?.isValid || false;
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

const preregWithPhone = async () => {
    try {
        const response = await signInWithPhoneNumber(auth, results.value?.e164, window.recaptchaVerifier)
        console.log("response from firebase: ", response);
        window.firebaseResponse = response;
        verificationChallenge.value = response.verificationId;
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
</style>
