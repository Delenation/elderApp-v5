<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>首页</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <swiper id="home-swiper" v-bind="swiperOptions">
        <swiper-slide v-for="(slide, index) of banner" :key="index" :virtual-index="index">
          <img :src="slide.pic" alt="" class="home-swiper-pic">
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
      <options></options>
      <news></news>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Virtual, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import home_swiper_1 from '@/assets/images/home/home_swiper_1.png'
import home_swiper_2 from '@/assets/images/home/home_swiper_2.png'
import home_swiper_3 from '@/assets/images/home/home_swiper_3.png'
import Options from '@/components/home/Options.vue'
import News from '@/components/home/News.vue'

const swiperOptions: any = {
  modules: [Virtual, Autoplay, Pagination],
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
}

const banner = [
  {
    pic: home_swiper_1,
    title: '这是第一段标语'
  },
  {
    pic: home_swiper_2,
    title: '这是第二段标语'
  },
  {
    pic: home_swiper_3,
    title: '这是第三段标语'
  }
]
</script>

<style scoped>
#home-swiper {
  width: 100%;
  height: 200px;
}

.home-swiper-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>