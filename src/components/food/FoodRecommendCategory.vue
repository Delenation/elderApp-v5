<template>
  <div>
    <ion-segment
      :scrollable="true"
      :value="0"
      color="skyblue"
      @ionChange="onSegmentChange"
    >
      <ion-segment-button
        v-for="(item, index) of categories" 
        :key="item.id"
        :value="index"
        @click="changeSection(index)"
      >
        <ion-label>{{ item.name }}</ion-label>
      </ion-segment-button>
    </ion-segment>
    <swiper
      id="swiper-foods"
      :slides-per-view="slides"
      :space-between="12"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="food of selectedCategory" :key="food.id" class="food-list-item">
        <ion-card
          class="food-list-item-card ion-no-margin"
          @click="openModal(food)"
          button
        >
          <div class="food-pic">
            <img :src="food.url" alt="">
          </div>
          <ion-card-header>
            <ion-card-title>{{ food.name }}</ion-card-title>
            <ion-card-subtitle>
              <label-appender :labels="food.label"></label-appender>
            </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </swiper-slide>
    </swiper>
    <ion-modal :is-open="isOpen">
      <ion-content color="light">
        <div class="back-button">
          <button @click="closeModal">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        </div>
        <div class="modal-pic">
          <img :src="cuisines[currentIndex].url" alt="">
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
  </div>
</template>

<script lang="ts">
import { 
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonIcon,
  IonModal,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { Preferences } from '@capacitor/preferences'
import { chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import LabelAppender from '@/components/food/LabelAppender.vue'
import request from '@/utils/request'
import fail_pic from '@/assets/images/test/failed_to_load_picture.jpg'
import 'swiper/css'

export default defineComponent({
  name: 'FoodRecommendCategory',
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonIcon,
    IonModal,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonToolbar,
    LabelAppender,
    Swiper,
    SwiperSlide
  },
  setup() {
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
    const slides = ref(2)
    const testpic = fail_pic
    const swiperRef = ref(null)

    const favList = ref([]) // 临时写法
    const inFavList = ref(false)

    const isOpen = ref(false)
    const cuisines = ref(null)
    const selectedIndex = ref(0)
    const selectedCategory = ref([])
    const currentFood = ref(0)
    const currentIndex = ref(0)
    
    const getSlides = () => {
      slides.value = window.innerWidth / 192
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

    const onSegmentChange = (event) => {
      swiperRef.value.slideTo(0, 0)
    }

    const onSwiper = (swiper) => {
      swiperRef.value = swiper
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

    addIcons ({
      'chevron-back-outline': chevronBackOutline
    })

    onBeforeMount(() => {
      getSlides()
      getCuisines()
    })

    return {
      testpic,
      slides,
      selectedCategory,
      categories,
      cuisines,
      currentIndex,
      isOpen,
      inFavList,
      onSwiper,
      openModal,
      closeModal,
      addFavourite,
      changeSection,
      onSegmentChange
    }
  }
})
</script>

<style scoped>
ion-segment-button {
  width: auto;
}

#swiper-foods {
  height: 230px;
  padding: 10px;
  z-index: 0;
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

.foot-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.food-list-item-card {
  width: 180px;
  height: 210px;
}

.food-pic {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.food-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>