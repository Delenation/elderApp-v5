<template>
  <ion-buttons slot="start">
    <ion-button @click="goBack">
      <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
    </ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonIcon, useIonRouter } from '@ionic/vue'
import { defineComponent } from 'vue'
import { chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'

export default defineComponent({
  name: 'LeftTopBackButton',
  components: {
    IonButton,
    IonButtons,
    IonIcon
  },
  setup() {
    const router = useIonRouter()

    const goBack = () => {
      if (router.canGoBack()) {
        router.back()
      }
    }

    addIcons({
      'chevron-back-outline': chevronBackOutline
    })

    return {
      goBack
    }
  }
})
</script>

<style scoped>
</style>