<template>
    <button
        class="font-heading px-4 md:px-8 inline-block cursor-pointer rounded-2xl md:rounded-full border-4 border-teal-500 bg-teal-800 p-4 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50"
        v-bind="$attrs"
    >
        <slot></slot>
    </button>
</template>
<script setup></script>
