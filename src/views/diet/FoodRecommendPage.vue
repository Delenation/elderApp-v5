<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>饮食</ion-title>
        <left-top-back-button></left-top-back-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <div class="food-recommend-daily">
        <div class="title">猜你想吃</div>
        <food-recommend-daily></food-recommend-daily>
      </div>
      <div class="food-recommend-category">
        <div class="title-wraper">
          <div class="title">饮食分类</div>
          <ion-button class="entrance" fill="clear" router-link="/cuisines">进入饮食专区>>></ion-button>
        </div>
        <food-recommend-category></food-recommend-category>
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
import FoodRecommendDaily from '@/components/food/FoodRecommendDaily.vue'
import FoodRecommendCategory from '@/components/food/FoodRecommendCategory.vue'
import LeftTopBackButton from '@/components/common/LeftTopBackButton.vue'
</script>

<style scoped>
.food-recommend-daily {
  min-height: 120vw;
}

.food-recommend-category .title-wraper {
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