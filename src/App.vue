<script setup>
import Modal from "@/components/Modal.vue";
import Cookies from "@/components/Cookies.vue";
import Alerts from "@/components/Alerts.vue";
import FullPageLoading from "@/components/FullPageLoading.vue";
import PrimaryPreRegLayout from "@/components/PrimaryPreRegLayout.vue";
import { onMounted, watch } from "vue";
import { useStorage } from "@vueuse/core";
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useFirebaseAuth } from "@/composables/firebase";
const { isAuthenticated, user } = useFirebaseAuth();
const route = useRoute();
watch(user, (newValue) => {
  if (isAuthenticated) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'user_id': newValue.uid
    })
  }
})
onMounted(() => {
  console.log("route: ", route.query);
  useStorage("tonto-ga", route.query);

});

</script>

<template>
  <div class="min-h-screen">
    <FullPageLoading></FullPageLoading>
    <Modal></Modal>
    <PrimaryPreRegLayout>
      <RouterView />
    </PrimaryPreRegLayout>

    <!-- <PrimaryFooter /> -->
    <Alerts></Alerts>
    <Cookies></Cookies>
  </div>
</template>
