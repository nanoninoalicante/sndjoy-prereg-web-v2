<script setup>

import TwitterIcon from "./icons/TwitterIcon.vue";
import InstagramIcon from "./icons/InstagramIcon.vue";
import PintrestIcon from "./icons/PintrestIcon.vue";
import LaptopIcon from "./icons/LaptopIcon.vue";
</script>
<template>
    <div class="fixed top-0 right-0 p-8 z-[140] flex flex-row space-x-2">
        <a href="https://www.sndjoy.com" target="_self" alt="SndJoy Website Link"
            class="p-2 rounded-full bg-primary-500 hover:bg-primary-700">
            <LaptopIcon class="w-8 h-8 fill-white"></LaptopIcon>
        </a>
        <a href="https://www.twitter.com/sndjoynow" alt="SndJoy Twitter Page Link" target="_blank"
            class="p-2 rounded-full bg-blue-500 hover:bg-blue-400">
            <TwitterIcon class="w-8 h-8 fill-white"></TwitterIcon>
        </a>
        <a href="https://www.instagram.com/sndjoy" alt="SndJoy Instagram Link" target="_blank"
            class="p-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500">
            <InstagramIcon class="w-8 h-8 fill-white"></InstagramIcon>
        </a>
        <a href="https://www.pinterest.com/sndjoy" alt="SndJoy Pinterest Link" target="_blank" class="p-2 rounded-full bg-red-600 hover:bg-red-500">
            <PintrestIcon class="w-8 h-8 fill-white"></PintrestIcon>
        </a>
    </div>
</template>
