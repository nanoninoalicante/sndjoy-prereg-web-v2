<template>
    <teleport to="body">
        <section
            v-if="filteredAlerts.length > 0"
            class="fixed bottom-0 left-0 z-[200] w-full py-4"
        >
            <div v-auto-animate class="container mx-auto px-8">
                <Alert
                    v-for="alert in filteredAlerts"
                    :key="alert.id"
                    :alert="alert"
                />
            </div>
        </section>
    </teleport>
</template>
<script setup>
import { useAlerts } from "@/composables/alerts";
import Alert from "@/components/Alert.vue";
import { computed } from "vue";
import autoAnimate from "@formkit/auto-animate";

const { alerts } = useAlerts();
const filteredAlerts = computed(() => {
  return alerts.value;
    // return useUniqBy(alerts.value, (a) => a.id);
});

/*
ANIMATE
 */
const vAutoAnimate = {
    mounted: (el) => autoAnimate(el),
};
</script>
