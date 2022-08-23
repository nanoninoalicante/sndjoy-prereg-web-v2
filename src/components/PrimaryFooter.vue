<template>
    <div>
        <teleport to="body" :disabled="true">
            <footer
                class="footer fixed bottom-0 right-0 z-10 w-full rounded-t-xl bg-teal-600 bg-opacity-40 p-1 backdrop-blur-md"
            >
                <div class="w-full px-2 text-right text-teal-800 text-sm font-medium">
                    <span class=" "
                        ><a href="https://www.gettonto.com" class="underline hover:no-underline"
                            >Tonto</a
                        >
                        © {{ year }} All Rights Reserved | </span
                    ><a
                        href="https://www.gettonto.com/terms-of-use/"
                        target="_blank"
                        class="text-sm underline hover:no-underline"
                        >Terms</a
                    >
                    and
                    <a
                        href="https://www.gettonto.com/privacy-policy/"
                        target="_blank"
                        class="text-sm underline hover:no-underline"
                        >Privacy Policy</a
                    >
                </div>
            </footer>
        </teleport>
    </div>
</template>
<script setup>
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>
