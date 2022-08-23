<template>
    <div class="w-full">
        <div class="w-full">
            <p
                class="text-left text-2xl font-medium tracking-tighter text-gray-700 mb-4"
            >
                That's a great handle!
            </p>
            <p
                class="text-left text-xl font-medium tracking-tighter text-gray-700"
            >
                We just need your email to secure that handle before someone
                else gets it
            </p>
        </div>
        <div class="flex flex-col items-center space-y-2">
            <div v-if="isMounted" class="handle">
                <button
                    v-show="preregData.newHandles"
                    @click="goToPrevious"
                    class="box-shadow-xl m-4 flex animate-pulse items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
                >
                    <span
                        class="text-xl font-bold leading-7 tracking-tighter text-white"
                        >{{ preregData.newHandles }}</span
                    >
                    <CheckCircleIcon
                        class="pointer-events-none inline h-8 w-8 text-teal-400"
                    ></CheckCircleIcon>
                </button>
            </div>
            <label
                class="mb-2 block w-full text-left text-lg font-medium tracking-tighter text-white"
                for="handle"
                >One more thing, we just need your email</label
            >
            <div
                class="relative flex w-full items-center text-gray-600 focus-within:text-gray-800"
            >
                <CircleLoader
                    v-if="formInputLoading"
                    width="20"
                    height="20"
                    fill="#ccc"
                    class="absolute left-0 ml-4"
                ></CircleLoader>
                <CheckCircleIcon
                    v-if="v$.emailAddress.$dirty && !emailAddressIsInvalid"
                    class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-teal-800"
                ></CheckCircleIcon>
                <ExclamationCircleIcon
                    v-if="emailAddressIsInvalid"
                    class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-warning-500"
                ></ExclamationCircleIcon>
                <input
                    class="w-full rounded-full border-2 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    :class="{ 'border-warning-500': emailAddressIsInvalid }"
                    type="email"
                    id="email"
                    name="emailInput"
                    ref="emailInputRef"
                    v-auto-focus
                    v-model="v$.emailAddress.$model"
                    v-on:keydown.enter="submitPrereg"
                    placeholder="elon@musk.com"
                />
            </div>

            <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage
                    v-for="error in v$.emailAddress.$silentErrors"
                    :key="error.$uid"
                    :error="error"
                />
                <SuccessInputMessage
                    v-if="!emailAddressIsInvalid && v$.emailAddress.$dirty"
                />
            </div>
        </div>
        <div v-auto-animate class="buttons mt-6 mb-6 ml-1 space-x-2">
            <AcceptTermsCheckbox v-model="v$.termsAccepted.$model"
                >Please accept our
                <a
                    href="https://www.gettonto.com/terms-of-use/"
                    target="_blank"
                    class="underline hover:no-underline"
                    >Terms and Conditions</a
                >
                and
                <a
                    href="https://www.gettonto.com/privacy-policy/"
                    target="_blank"
                    class="underline hover:no-underline"
                    >Privacy Policy</a
                ></AcceptTermsCheckbox
            >
        </div>
        <div v-auto-animate class="buttons mt-4 space-x-2">
            <PrimaryButton class="bg-white" @click.once="goToPrevious"
                >Go Back</PrimaryButton
            >
            <PrimaryButton
                :disabled="formIsInvalid || !v$.emailAddress.$dirty"
                @click.prevent="submitPrereg"
                >Pre Register</PrimaryButton
            >
        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref } from "vue";
import { email, helpers, required, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { usePreReg } from "@/composables/prereg";
import { useAlerts } from "@/composables/alerts";
import { usePrimaryApi } from "@/composables/api";
import { vAutoAnimate, vAutoFocus } from "@/directives/directives";
import AcceptTermsCheckbox from "./AcceptTermsCheckbox";
import { useStorage } from "@vueuse/core";
const runtimeConfig = useRuntimeConfig();

const tontoTrackingParams = useStorage("tonto-ga");
onMounted(() => {
    console.log("tracking prams: ", tontoTrackingParams.value);
});
/*
META DATA
 */

definePageMeta({
    layout: "prereg",
});

/*
COMPOSABLE
 */
const { addAlert } = useAlerts();
const primaryApi = usePrimaryApi();

const isMounted = useMounted();
const formInputLoading = ref(true);
const router = useRouter();
const { setModal, fullPageLoader, preregData } = usePreReg();

/*
FORM VALIDATION
 */
const rules = computed(() => ({
    emailAddress: {
        $lazy: true,
        email: helpers.withMessage(
            "Sorry, we just need a valid email address",
            email
        ),
        required: helpers.withMessage(
            "We just need your email so we can secure your handle",
            required
        ),
    },
    termsAccepted: {
        $lazy: false,
        required: helpers.withMessage(
            "We just need you to accept our terms of service first",
            required
        ),
        accepted: helpers.withMessage(
            "We just need you to accept our terms of service first",
            sameAs(true)
        ),
    },
}));
const v$ = useVuelidate(rules, preregData);

const emailAddressIsInvalid = computed(() => {
    return v$.value.emailAddress.$invalid;
});
const formIsInvalid = computed(() => {
    return v$.value.$invalid || v$.value.termsAccepted.$invalid;
});

// PREVIOUS STEP
const goToPrevious = () => {
    return navigateTo({
        path: "/pre-registration-tonto/",
    });
};

const proceedToStepThree = () => {
    return navigateTo({
        path: "/pre-registration-tonto/step-3",
    });
};

// SUBMIT FORM

const submitPrereg = async () => {
    await v$.value.$validate();
    if (v$.value.$invalid) {
        v$.value.$errors.map((e) => {
            addAlert({
                message: e.$message,
                type: "warning",
            });
        });
        return;
    }
    fullPageLoader.value = true;
    const requestData = {
        email: preregData.value.emailAddress,
        handle: preregData.value.newHandles,
        handleType: primaryApi.sanitizeTrackingParams(
            primaryApi.parse(tontoTrackingParams.value)
        ),
    };
    console.log("track data: ", primaryApi.parse(tontoTrackingParams.value));
    console.log("request datas: ", requestData);
    const r = await primaryApi
        .preRegisterUser(requestData, runtimeConfig)
        .catch((e) => {
            fullPageLoader.value = false;
            console.log("error from api: ", e.data);
            if (e.data?.error_msg === "Request already taken by twitter.") {
                setModal({ type: "twitter" });
                return;
            }
            if (
                e.data?.error_msg === "Request already taken by another account"
            ) {
                addAlert({
                    message:
                        "This email address is already associated with one account. If you are an Urlo user, you will have direct access to the Tonto app.",
                    type: "info",
                    close: "manual",
                });
                return;
            }
            addAlert({
                message:
                    "Oops, sorry there was an error: " + e.data?.error_msg ||
                    e.message,
                type: "error",
            });
        });
    if (r) {
        fullPageLoader.value = false;
        proceedToStepThree();
    }
    return null;
};

const emailInputRef = ref();

onMounted(() => {
    if (
        !preregData.value?.newHandles ||
        preregData.value?.newHandles.length === 0
    ) {
        window.location.href = "/pre-registration-tonto/";
    }
});
onMounted(async () => {
    emailInputRef.value.focus();
    if (
        preregData.value.emailAddress &&
        preregData.value.emailAddress.length > 1
    ) {
        await v$.value.emailAddress.$validate();
        formInputLoading.value = false;
    }
    formInputLoading.value = false;
});
</script>
