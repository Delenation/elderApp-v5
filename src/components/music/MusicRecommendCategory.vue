<template>
  <div class="music-range">
    <ion-card 
      class="music-card ion-no-margin"
      v-for="musics of musicRanges"
      :key="musics.id"
      @click="openModal"
      button
    >
      <img :src="musics.cover" alt="" class="music-pic">
      <ion-card-header>
        <ion-card-title>{{ musics.range }}</ion-card-title>
      </ion-card-header>
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar color="skyblue">
            <ion-title>音乐</ion-title>
            <ion-buttons slot="start">
              <ion-button @click="closeModal">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-card>
            <div class="music-player ion-padding">
              <div class="music-info">
                <img :src="testCover" alt="" class="music-cover">
                <div class="music-title">以父之名</div>
                <div class="music-subtitle">周杰伦</div>
              </div>
            </div>
          </ion-card>
        </ion-content>
      </ion-modal>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonContent
 } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { addIcons } from 'ionicons'
import { chevronBackOutline } from 'ionicons/icons'
import test_musicCover from '@/assets/images/test/music_001.jpg'
import opera_Pic from '@/assets/images/test/opera.jpg'
import fail_pic from '@/assets/images/test/failed_to_load_picture.jpg'

export default defineComponent ({
  name: 'MusicRecommendCategory',
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent
  },
  setup(props, ctx) {
    const failPic = fail_pic
    const operaPic = opera_Pic
    const testCover = test_musicCover
    const musicRanges = [
      {
        range: '京剧',
        id: 0,
        cover: operaPic,
        musicList: {

        }
      },
      {
        range: '评书',
        id: 1,
        cover: operaPic,
        musicList: {

        }
      },
      {
        range: '华语',
        id: 2,
        cover: operaPic,
        musicList: {

        }
      }
    ]
    const isOpen = ref(false)

    const openModal = () => {
      isOpen.value = true
    }

    const closeModal = () => {
      isOpen.value = false
    }

    addIcons({
      'chevron-back-outline': chevronBackOutline
    })

    return {
      failPic,
      isOpen,
      testCover,
      musicRanges,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped>
.music-range {
  min-width: 100vw;
  min-height: 160px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

.music-card {
  min-width: 160px; /* 直接设置宽度不管用，原因未知 */
  height: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
}

.music-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.music-player {
  display: flex;
  flex-direction: column;
}

.music-info {
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.music-cover {
  width: 100px;
  height: 100px;
}

.music-title {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: black;
}

.music-subtitle {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
</style>