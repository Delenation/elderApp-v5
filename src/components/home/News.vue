<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title class="home-title">健康资讯</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div v-for="(item, index) of news" :key="index" class="home-news ion-activatable" @click="openModal(index)">
        <div class="home-news-pic">
          <img :src="item.pic" alt="">
        </div>
        <div class="home-news-title">
          {{ item.title }}
          <div class="home-news-time">{{ item.time }}</div>
        </div>
        <ion-ripple-effect></ion-ripple-effect>
      </div>
      <ion-modal :is-open="isOpen">
        <ion-page>
          <ion-header>
            <ion-toolbar color="skyblue">
              <ion-title>资讯详情</ion-title>
              <ion-buttons slot="start">
                <ion-button @click="closeModal">
                  <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <Article_0 v-if="selectedIndex === 0"/>
            <Article_1 v-if="selectedIndex === 1"/>
            <Article_2 v-if="selectedIndex === 2"/>
            <Article_3 v-if="selectedIndex === 3"/>
            <Article_4 v-if="selectedIndex === 4"/>
            <Article_5 v-if="selectedIndex === 5"/>
            <Article_6 v-if="selectedIndex === 6"/>
            <Article_7 v-if="selectedIndex === 7"/>
            <Article_8 v-if="selectedIndex === 8"/>
            <Article_9 v-if="selectedIndex === 9"/>
          </ion-content>
        </ion-page>
      </ion-modal>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { 
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import Article_0 from '@/components/home/articles/Article_0.vue'
import Article_1 from '@/components/home/articles/Article_1.vue'
import Article_2 from '@/components/home/articles/Article_2.vue'
import Article_3 from '@/components/home/articles/Article_3.vue'
import Article_4 from '@/components/home/articles/Article_4.vue'
import Article_5 from '@/components/home/articles/Article_5.vue'
import Article_6 from '@/components/home/articles/Article_6.vue'
import Article_7 from '@/components/home/articles/Article_7.vue'
import Article_8 from '@/components/home/articles/Article_8.vue'
import Article_9 from '@/components/home/articles/Article_9.vue'

export default defineComponent({
  name: 'Options',
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonModal,
    IonPage,
    IonRippleEffect,
    IonTitle,
    IonToolbar,
    Article_0,
    Article_1,
    Article_2,
    Article_3,
    Article_4,
    Article_5,
    Article_6,
    Article_7,
    Article_8,
    Article_9
  },
  setup() {
    const news = [
      {
        pic: 'https://th.bing.com/th/id/OIP.zDr1W6dwanTz4BNfoIzQmgHaE7?w=297&h=198&c=7&r=0&o=5&pid=1.7',
        title: '总是口干或许跟这些药有关',
        time: '2024年10月22日8:42'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.Q6WrdAV0Ybu0jhv3Auy5LgHaE8?w=299&h=199&c=7&r=0&o=5&pid=1.7',
        title: '秋季时令水果纷纷上市，怎么吃更养生？',
        time: '2024年10月22日8:42'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.903bDamto0neYlnNbRdemgHaFJ?w=203&h=141&c=7&r=0&o=5&pid=1.7',
        title: '吃素会使人缺乏能量吗',
        time: '2024年10月22日8:42'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.S7nQ_6ayesIynuIRwMxbmQHaGm?w=204&h=182&c=7&r=0&o=5&pid=1.7',
        title: '四类慢性病营养和运动指导原则',
        time: '2024年07月05日08:53'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.df89oF3ygaM7sslGShegTQHaE8?w=224&h=180&c=7&r=0&o=5&pid=1.7',
        title: '白露：露从今夜白 肺宜自此养',
        time: '2024年09月06日08:45'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.1tOq5wBmEfaHhqR-N3w56gAAAA?rs=1&pid=ImgDetMain',
        title: '秋季苹果正当时 听说熟着吃好处更多？',
        time: '2024年09月19日08:44'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.KVq0PiSolunxkYJ30KPGyAHaEc?w=305&h=183&c=7&r=0&o=5&pid=1.7',
        title: '“贴秋膘”不能过度进补',
        time: '2024年10月22日8:42'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.PzbCMN5FYVvdLmpbVJzPnQHaEh?w=251&h=180&c=7&r=0&o=5&pid=1.7',
        title: '心血管越健康 大脑越年轻',
        time: '2024年08月20日08:45'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.7Bsqti1PA5tQe7DxEEU_pwHaEH?w=278&h=180&c=7&r=0&o=5&pid=1.7',
        title: '12个很火的健康误区 你被套路了吗？',
        time: '2024年10月22日08:35'
      },
      {
        pic: 'https://th.bing.com/th/id/OIP.ukfGLZ5PhvoUhVKe85dsbAHaFL?w=254&h=180&c=7&r=0&o=5&pid=1.7',
        title: '米酵菌酸 餐桌上的“隐形杀手”',
        time: '2024年07月35日08:50'
      }
    ]

    const isOpen = ref(false)
    const selectedIndex = ref(0)

    const openModal = (index) => {
      isOpen.value = true
      selectedIndex.value = index
    }

    const closeModal = () => {
      isOpen.value = false
    }
    
    addIcons({
      'chevron-back-outline': chevronBackOutline
    })

    return {
      news,
      isOpen,
      selectedIndex,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped>
.home-title {
  font-size: 20px;
  font-weight: bold;
  text-indent: 5px;
  border-left: 5px solid #52b7f5;
}

.home-news {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
}

.home-news-pic {
  width: 130px;
  height: 90px;
}

.home-news-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-news-title {
  width: calc(100% - 130px);
  font-size: 20px;
  padding: 0 10px;
  text-align: justify;
  color: #333;
}

.home-news-time {
  font-size: 18px;
  text-align: left;
  color: #888;
}
</style>