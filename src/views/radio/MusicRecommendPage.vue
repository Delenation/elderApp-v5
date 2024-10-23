<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>音乐</ion-title>
        <left-top-back-button></left-top-back-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <div class="music-recommend-daily">
        <div class="title">今日音乐</div>
        <music-recommend-daily></music-recommend-daily>
      </div>
      <div class="music-recommend-category">
        <div class="title-wraper">
          <div class="title">音乐分类</div>
          <ion-button class="entrance" fill="clear" router-link="/musics">进入音乐专区>>></ion-button>
        </div>
        <music-recommend-category></music-recommend-category>
      </div>
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
  IonToolbar,
  IonButton
} from '@ionic/vue'
import MusicRecommendDaily from '@/components/music/MusicRecommendDaily.vue'
import MusicRecommendCategory from '@/components/music/MusicRecommendCategory.vue'
import LeftTopBackButton from '@/components/common/LeftTopBackButton.vue'
</script>

<style scoped>
.music-recommend-category .title-wraper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 26px;
  font-weight: bold;
  text-indent: 10px;
  margin-top: 15px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-left: 8px solid #52b7f5;
  /* 黄色边框 */
  /* border-left: 8px solid #ffd342; */
}

.entrance {
  margin-right: 16px;
  color: #52b7f5;
}
</style>