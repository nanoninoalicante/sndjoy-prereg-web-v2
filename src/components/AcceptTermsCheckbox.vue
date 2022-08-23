<template>
    <div class="mt-6 flex">
        <label class="flex justify-start">
            <input
                :checked="modelValue"
                @input="$emit('update:modelValue', $event.target.checked)"
                type="checkbox"
                class="form-checkbox h-6 w-6 rounded-md border-teal-600 text-teal-600 focus:border-teal-600 focus:ring-teal-600"
            />
            <span class="text-md ml-2 -mt-1 font-medium text-gray-800"
                ><slot></slot
            ></span>
        </label>
    </div>
</template>
<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
defineEmits(["update:modelValue"]);
</script>
