<template>
  <div class="container">
    <div id="swiper">
      <div
        v-for="(item, index) of renderList" 
        :key="foodList[item.food].id" 
        :style="[
          {'--i': item.tag},
          index > 0 ? { 'pointer-events': 'none' } : {}
        ]"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd($event, index)"
        @click="openModal(item)"
        class="swiper-item"
      >
        <img :src="foodList[item.food].pic" alt="">
        <div class="food-text">
          <div class="food-name">
            {{ foodList[item.food].name }}
          </div>
          <div class="food-score">
            推荐指数:  <b class="food-score-number">{{ foodList[item.food].score }}</b>
          </div>
        </div>
      </div>
    </div>
    <ion-modal :is-open="isOpen">
      <ion-content color="light">
        <div class="back-button">
          <button @click="closeModal">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        </div>
        <div class="modal-pic">
          <img :src="foodList[currentFood].pic" alt="">
        </div>
        <ion-card class="round-border">
          <ion-card-header>
            <ion-toolbar>
              <ion-card-title>{{ foodList[currentFood].name }}</ion-card-title>
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
              <label-appender :labels="foodList[currentFood].label"></label-appender>
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ foodList[currentFood].description }}
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts">
import { 
  IonHeader,
  IonContent,
  IonTitle, 
  IonModal, 
  IonButtons, 
  IonButton, 
  IonToolbar, 
  IonIcon, 
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip
} from '@ionic/vue'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { chevronBackOutline, starOutline } from 'ionicons/icons'
import { Preferences } from '@capacitor/preferences'
import { addIcons } from 'ionicons'
import LabelAppender from './LabelAppender.vue'
import request from '@/utils/request'

interface UserInfo {
  name: string
  id: string
  image: string
}

export default defineComponent({
  name: 'FoodRecommendDaily',
  components: {
    IonModal,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonToolbar,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    LabelAppender
  },
  setup() {
    const USER_KEY = 'user-info'
    const userInfo = ref<UserInfo | null>(null)

    const getUserInfo = async () => {
      const { value } = await Preferences.get({ key: USER_KEY })
      if(value) {
        userInfo.value = JSON.parse(value) as UserInfo
      }
    }

    const dataGet = ref(false)

    const foodList = ref([
      {
        name: '',
        pic: '',
        id: 111,
        index: 0,
        score: 95,
        label: [],
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius excepturi distinctio eligendi laborum expedita, ut harum fuga et ipsam nobis nihil rerum non maiores natus nesciunt dolores eaque fugiat.'
      },
      {
        name: '',
        pic: '',
        id: 222,
        index: 1,
        score: 92,
        label: [],
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius excepturi distinctio eligendi laborum expedita, ut harum fuga et ipsam nobis nihil rerum non maiores natus nesciunt dolores eaque fugiat.'
      },
      {
        name: '',
        pic: '',
        id: 333,
        index: 2,
        score: 95,
        label: [],
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius excepturi distinctio eligendi laborum expedita, ut harum fuga et ipsam nobis nihil rerum non maiores natus nesciunt dolores eaque fugiat.'
      },
      {
        name: '',
        pic: '',
        id: 444,
        index: 3,
        score: 97,
        label: [],
        description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius excepturi distinctio eligendi laborum expedita, ut harum fuga et ipsam nobis nihil rerum non maiores natus nesciunt dolores eaque fugiat.'
      }
    ])
    const renderList = ref([
      { tag: 0, food: 0 },
      { tag: 1, food: 1 },
      { tag: 2, food: 2 },
      { tag: 3, food: 3 }
    ])
    const startPosition = ref({ x: 0, y: 0 })
    const currentFood = ref(0)
    const isRemoving = ref(false)
    const isOpen = ref(false)

    const favList = ref([]) // 临时写法
    const inFavList = ref(false)

    // const list = [
    //   {
    //     name: 'name',
    //     pic: 'url',
    //     score: 90,
    //     description: 'text',
    //     recommendReason: {
    //       relaventIndex: [
    //         {
    //           item: '血氧',
    //           index: 99
    //         }
    //       ],
    //       reason: 'reason'
    //     },
    //     foodId: 'number or string',
    //   }
    // ]

    const defaultStyle = {
      transform: 'translateX(calc(2px * var(--i))) translateY(calc(-10px * var(--i))) translateZ(calc(-30px * var(--i))) rotate(calc(-4deg * var(--i)))',
      transition: 'transform 0.3s ease 0s'
    }

    const onTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0]
      startPosition.value = { x: clientX, y: clientY }
      const swiperItem = event.currentTarget as HTMLElement
      swiperItem.style.transition = ''
    }

    const onTouchMove = (event: TouchEvent) => {
      if (isRemoving.value) return

      const { clientX, clientY } = event.touches[0]
      const deltaX = clientX - startPosition.value.x
      const deltaY = clientY - startPosition.value.y
      const rotate = deltaX * 0.1
      const swiperItem = event.currentTarget as HTMLElement
      swiperItem.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`

      if (Math.abs(deltaX) > swiperItem.clientWidth * 0.6) {
        isRemoving.value = true
        
        const direction = deltaX > 0 ? 1 : -1
        startPosition.value = { x: 0, y: 0 }
        swiperItem.style.transition = 'transform 0.6s'
        swiperItem.style.transform = `translate(${direction * window.innerWidth * 2}px, ${deltaY}px) rotate(${45 * direction}deg)`

        renderList.value.forEach((item, index) => {
          if (index > 0) {
            renderList.value[index].tag = index - 1
          }
        })
        
        setTimeout(() => {
          renderList.value.push(renderList.value.shift()!)
          renderList.value[3].tag = 3
            
          swiperItem.style.transition = 'none'
          swiperItem.style.opacity = '0'
          swiperItem.style.transform = defaultStyle.transform

          setTimeout(() => {
            swiperItem.style.opacity = '1'
            swiperItem.style.transition = 'opacity 0.3s'

            setTimeout(() => {
              swiperItem.style.transition = defaultStyle.transition
            }, 300)
          }, 100)

          isRemoving.value = false
        }, 600)
      }
    }

    const onTouchEnd = (event: TouchEvent, index) => {
      const swiperItem = event.currentTarget as HTMLElement
      if (!isRemoving.value && index === 0) {
        swiperItem.style.transition = 'transform 0.5s'
        swiperItem.style.transform = ''
      }
    }

    const openModal = (item) => {
      isOpen.value = true
      currentFood.value = item.food
      getFavourite(item.food)
    }

    const closeModal = () => {
      isOpen.value = false
      inFavList.value = false
    }

    const getFoodList = async () => {
      const response = await request.get(`/food/refer?userId=${userInfo.value.id}`)
      if (response && response.data) {
        foodList.value.forEach((food, index) => {
          food.name = response.data[index].name
          food.pic = response.data[index].url
          food.id = response.data[index].id
          food.label = response.data[index].label.split(',')
          food.description = response.data[index].materials
        })
      }
    }

    const getFavourite = (food) => {
      const index = favList.value.indexOf(foodList.value[food].id)
      if (index !== -1) {
        inFavList.value = true
      }
      else {
        inFavList.value = false
      }
    }

    // 有时间可以把这个函数拆成两个
    const addFavourite = () => {
      const index = favList.value.indexOf(foodList.value[currentFood.value].id)
      if (index !== -1) {
        const index = favList.value.indexOf(currentFood.value)
        favList.value.splice(index, 1)
        inFavList.value = false
      }
      else {
        favList.value.push(foodList.value[currentFood.value].id)
        inFavList.value = true
      }
      console.log(favList.value)
      console.log(inFavList.value)
    }
    
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'star-outline': starOutline
    })

    onBeforeMount(async () => {
      await getUserInfo()
      await getFoodList()
    })

    return {
      foodList,
      renderList,
      startPosition,
      currentFood,
      isRemoving,
      isOpen,
      inFavList,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      openModal,
      closeModal,
      addFavourite
    }
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 20px; */
}

#swiper {
  width: 70vw;
  aspect-ratio: 2 / 3;
  perspective: 1000px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
  position: relative;
  z-index: 100; /* 防止被swiper挡住 */
}

.swiper-item {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  transform: 
    translateX(calc(2px * var(--i)))
    translateY(calc(-10px * var(--i))) 
    translateZ(calc(-30px * var(--i))) 
    rotate(calc(-4deg * var(--i)));
  transition: transform 0.3s ease 0s;
  user-select: none;

  /* 这个阴影更厚一点，上面的阴影是和IonCard样式统一的 */
  /* filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.5)); */
}

.swiper-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-text {
  width: 100%;
  min-height: 100px;
  padding-right: 16px;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 1rem 1rem;
  background: linear-gradient(to left, rgba(255, 211, 66, 0.911) 30%, rgba(255, 211, 66, 0.3) 100%);

  /* 蓝色底，感觉效果不是很好 */
  /* background: linear-gradient(to left, rgba(82, 183, 245, 0.9) 30%, rgba(82, 183, 245, 0.3) 100%); */
  
  color: white;
  text-align: end;
  text-shadow: 2px 2px 2px #5e5e5e;
  /* font-style: italic; */
}

.food-name {
  font-size: 40px;
}

.food-score {
  font-size: 22px;
}

.food-score-number {
  font-size: 30px;
  color: greenyellow;
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

.favour {
  width: 100px;
  /* 分散对齐 */
}

.modal-pic {
  width: 100%;
  height: 40vh;
}

.modal-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>