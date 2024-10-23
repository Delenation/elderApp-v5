<template>
    <ion-button @click="swiper.slideNext()">
        <slot></slot>
    </ion-button>
</template>

<script>
import { IonButton } from '@ionic/vue'
import { useSwiper } from 'swiper/vue'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'SwiperNextButton',
  components: {
    IonButton
  },
  setup() {
    const swiper = useSwiper()

    return {
        swiper
    }
  }
})
</script>