<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title class="home-title">健康管理</ion-card-title>
    </ion-card-header>
    <ion-card-content class="home-options">
      <ion-button
        class="home-option ion-no-padding"
        v-for="(option, index) of options" 
        :key="index" 
        fill="clear"
        color="dark"
        @click="goTo(option.path)"
      >
        <div>
          <ion-icon :src="option.icon" class="home-option-icon"></ion-icon>
          <ion-label class="home-option-label">{{ option.label }}</ion-label>
        </div>
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { 
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonLabel,
  IonCardTitle,
  useIonRouter
} from '@ionic/vue'
import { defineComponent } from 'vue'
import report from '@/assets/icons/home/file-focus.svg'
import schedule from '@/assets/icons/home/schedule.svg'
import music from '@/assets/icons/home/performance.svg'
import health from '@/assets/icons/home/heart-rate.svg'
import diet from '@/assets/icons/home/noodles.svg'
import drink from '@/assets/icons/home/cup.svg'

export default defineComponent({
  name: 'Options',
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonLabel,
    IonCardTitle,
    useIonRouter
  },
  setup() {
    const options = [
      {
        icon: health,
        label: '身体数据',
        path: '/app/body'
      },
      {
        icon: diet,
        label: '饮食',
        path: '/diet'
      },
      {
        icon: drink,
        label: '饮水',
        path: ''
      },
      {
        icon: music,
        label: '音乐',
        path: '/radio'
      },
      {
        icon: report,
        label: '检查报告',
        path: ''
      },
      {
        icon: schedule,
        label: '日程表',
        path: '/schedule'
      }
    ]

    const router = useIonRouter()

    const goTo = (path) => {
      router.push(path)
    }
    
    return {
      options,
      goTo
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

.home-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr)
}

.home-option {
  width: 80px;
  height: 80px;
}

.home-option div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.home-option-icon {
  font-size: 50px;
}

.home-option-label {
  font-size: 18px;
}
</style>