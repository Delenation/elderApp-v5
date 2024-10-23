<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="skyblue">
        <ion-title>饮食专区</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBack" router-direction="back">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="top-area">
      <ion-searchbar></ion-searchbar>
      <swiper v-bind="swiperOptions" class="swiper">
        <swiper-slide
          v-for="(item, index) of bannerList"
          :key="item.id"
          :virtual-index="index"
          @click="openModal(item)"
          class="swiper-slide"
        >
          <img :src="item.url" :alt="fail_pic" class="image-cover">
        </swiper-slide>
      </swiper>
    </div>
    <ion-content>
      <ion-split-pane when="xs" content-id="main">
        <ion-menu content-id="main">
          <ion-content>
            <ion-item 
              v-for="(item, index) of categories" 
              :key="item.id" 
              :color="getColor(index)" 
              @click="changeSection(index)" 
              button 
            >
              {{ item.name }}
            </ion-item>
          </ion-content>
        </ion-menu>
        <div class="ion-page" id="main">
          <ion-content class="ion-no-padding" color="light">
            <div class="food-content">
              <ion-card 
                v-for="food of selectedCategory" 
                :key="food.id" 
                class="food-card ion-no-margin"
                button
                @click="openModal(food)"
              >
                <div class="food-info">
                  <div class="food-pic">
                    <img :src="food.url" :alt="fail_pic" class="image-cover">
                  </div>
                  <div class="food-text">
                    <div class="food-name">
                      {{ food.name }}
                    </div>
                    <label-appender :labels="food.label"></label-appender>
                  </div>
                </div>
              </ion-card>
            </div>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-content>
    <ion-modal :is-open="isOpen">
      <ion-content color="light">
        <div class="back-button">
          <button @click="closeModal">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        </div>
        <div class="modal-pic">
          <img :src="cuisines[currentIndex].url" :alt="fail_pic">
        </div>
        <ion-card class="round-border">
          <ion-card-header>
            <ion-toolbar>
              <ion-card-title>{{ cuisines[currentIndex].name }}</ion-card-title>
              <ion-buttons slot="end">
                <ion-button 
                  class="favour"
                  fill="outline" 
                  color="warning" 
                  shape="round" 
                  @click="addFavourite" 
                  v-if="!inFavList"
                >
                  加入收藏<ion-icon name="star-outline"></ion-icon>
                </ion-button>
                <ion-button 
                  class="favour"
                  fill="solid" 
                  color="warning" 
                  shape="round" 
                  @click="addFavourite" 
                  v-else
                >
                  已收藏<ion-icon name="star-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-card-subtitle>
              <label-appender :labels="cuisines[currentIndex].label"></label-appender>
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ cuisines[currentIndex].materials }}
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonChip,
  IonPage,
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonContent, 
  IonImg,
  IonItem,
  IonList,
  IonLabel,
  IonMenu,
  IonModal,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSearchbar,
  IonInput,
  IonSplitPane,
  useIonRouter
} from '@ionic/vue'
import { chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import { ref, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Virtual, Autoplay } from 'swiper/modules'
import { Preferences } from '@capacitor/preferences'
import LabelAppender from '@/components/food/LabelAppender.vue'
import request from '@/utils/request'
import 'swiper/css'

import fail_pic from '@/assets/images/test/failed_to_load_picture.jpg'

addIcons ({
  'chevron-back-outline': chevronBackOutline
})

const categories = ref([
  {
    name: 'category_1',
    id: 0
  },
  {
    name: 'category_2',
    id: 1
  },
  {
    name: 'category_3',
    id: 2
  },
  {
    name: 'category_4',
    id: 3
  },
  {
    name: 'category_5',
    id: 4
  }
])

const router = useIonRouter()
const isOpen = ref(false)
const cuisines = ref(null)
const bannerList = ref([])
const selectedIndex = ref(0)
const selectedCategory = ref([])
const currentFood = ref(0)
const currentIndex = ref(0)
const swiperOptions: any = {
  modules: [Virtual, Autoplay],
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 10
}

const favList = ref([]) // 临时写法
const inFavList = ref(false)

const goBack = () => {
  if (router.canGoBack()) {
    router.back()
  }
}

const getColor = (index: number) => {
  if (selectedIndex.value === index) {
    return 'skyblue'
  }
  return ''
}

const changeSection = (index: number) => {
  selectedIndex.value = index
  let result = []
  const preIndex = cuisines.value.findIndex(item => item.id === selectedIndex.value * 100)

  for (var i = preIndex; cuisines.value[i] && cuisines.value[i].id < selectedIndex.value * 100 + 100; i++) {
    result.push(cuisines.value[i])
  }

  selectedCategory.value = result
}

const getCuisines = async () => {
  const { value } = await Preferences.get({ key: 'cuisines' })
  if (value) {
    cuisines.value = JSON.parse(value)
  }
  else {
    const response = await request.get('/food/read')
    if (response && response.data) {
      cuisines.value = response.data
      cuisines.value.forEach((item) => {
        item.label = item.label.split(',')
      })
      await Preferences.set({
        key: 'cuisines',
        value: JSON.stringify(cuisines.value)
      })
    }
  }

  let result = []
  const preIndex = cuisines.value.findIndex(item => item.id === selectedIndex.value * 100)

  for (var i = preIndex; cuisines.value[i].id < preIndex + 100; i++) {
    result.push(cuisines.value[i])
  }

  selectedCategory.value = result
}

const setBannerList = (n: number) => {
  const usedIndices = new Set()
  while (bannerList.value.length < n) {
    const randomIndex = Math.floor(Math.random() * cuisines.value.length)
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex)
      bannerList.value.push(cuisines.value[randomIndex])
    }
  }
}

const openModal = (food) => {
  isOpen.value = true
  currentFood.value = food.id
  currentIndex.value = cuisines.value.findIndex(item => item.id === food.id)
  getFavourite(food.id)
}

const closeModal = () => {
  isOpen.value = false
  inFavList.value = false
}

const getFavourite = (id) => {
  const index = favList.value.indexOf(id)
  if (index !== -1) {
    inFavList.value = true
  }
  else {
    inFavList.value = false
  }
}

const addFavourite = () => {
  const index = favList.value.indexOf(currentFood.value)
  if (index !== -1) {
    favList.value.splice(index, 1)
    inFavList.value = false
  }
  else {
    favList.value.push(currentFood.value)
    inFavList.value = true
  }
}

onBeforeMount(async () => {
  await getCuisines()
  setBannerList(5)
})
</script>

<style scoped>
ion-split-pane {
  --side-width: 120px;
  --side-min-width: 20vw;
  --side-max-width: 40vw;
}

.top-area {
  width: 100%;
  background-color: #f4f5f8;
}

.swiper {
  width: 100%;
  height: 200px;
}

.food-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.food-card {
  width: 98%;
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;
}

.food-info {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.food-pic {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.food-text {
  width: calc(100% - 120px);
  display: flex;
  flex-direction: column;
}

.food-name {
  color: black;
  margin-top: 4px;
  font-size: large;
}

.back-button {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  position: fixed;
}

.back-button button {
  width: 100%;
  height: 100%;
  color: white;
  font-size: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}

</style>