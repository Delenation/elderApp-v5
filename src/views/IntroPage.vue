<template>
  <ion-page>
    <ion-content>
      <swiper id="swiper">
        <swiper-slide class="swiper-slide">
          <img src="" alt="Intro 1">
          <ion-text>内容 1</ion-text>
          <swiper-next-button>下一步</swiper-next-button>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <img src="" alt="Intro 2">
          <ion-text>内容 2</ion-text>
          <swiper-next-button>下一步</swiper-next-button>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <img src="" alt="Intro 3">
          <ion-text>内容 3</ion-text>
          <ion-button @click="introFinished" router-link="/login">下一步</ion-button>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonText, IonButton } from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperNextButton from '@/components/SwiperNextButton.vue'
import 'swiper/css'

const INTRO_KEY = 'intro-seen'

const introFinished = async () => {
  await Preferences.set({
    key: INTRO_KEY,
    value: 'true'
  })
}
</script>

<style scoped>
#swiper {
  height: 100vh;
}

.swiper-slide {
  color: brown;
}
</style>
