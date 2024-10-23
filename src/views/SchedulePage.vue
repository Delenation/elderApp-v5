<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>助手</ion-title>
        <ion-buttons slot="start">
          <left-top-back-button></left-top-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="title">添加日程</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-datetime color="skyblue" v-model="selectedTime"></ion-datetime>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <!-- <routine></routine> -->
        <ion-card-header>
          <ion-card-title class="title">日程提醒</ion-card-title>
          <button class="adder" @click="setReminder">
            <ion-icon slot="icon-only" name="add-circle-outline"></ion-icon>
          </button>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <div class="schedule-item" v-for="item of scheduleList" :key="item.id">
            <div class="activity-time">
              {{ getActivityTime(item.time) }}
            </div>
            <div class="activity-theme">{{ item.theme }}</div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonDatetime,
  alertController
} from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'
import { onMounted, ref } from 'vue'
import { LocalNotifications } from '@capacitor/local-notifications'
import { addCircleOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import LeftTopBackButton from '@/components/common/LeftTopBackButton.vue'
import Routine from '@/components/Routine.vue'

const USER_KEY = 'user-info'
const INFO_KEY = 'detail'

const userInfo = ref(null)
const detailInfo = ref(null)

const id = ref(0)
const selectedTime = ref<string>('')
const scheduleList = ref([
  {
    id: 1,
    theme: '做项目',
    time: new Date(Date.now())
  }
])

const getUserInfo = async () => {
  const { value } = await Preferences.get({ key: USER_KEY })
  if (value) {
    userInfo.value = JSON.parse(value)
  }
}

const getDetailInfo = async () => {
  const { value } = await Preferences.get({ key: INFO_KEY })
  if (value) {
    detailInfo.value = JSON.parse(value)
  }
}

const theme = ref('')

const setReminder = async () => {
  if (selectedTime.value) {
    const time = new Date(selectedTime.value)

    const alert = await alertController.create({
      header: '添加日程',
      inputs: [
        {
          placeholder: '请输入日程主题',
          value: theme.value,
          name: 'theme'
        }
      ],
      buttons: [
        {
          text: '添加',
          role: 'add',
          handler: async (data) => {
            if (!data.theme) {
              alertController.create({
                header: '主题不能为空',
                buttons: ['确定']
              }).then(alert => alert.present())

              return false
            }

            theme.value = data.theme
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: '日程提醒',
                  body: data.theme,
                  id: 1,
                  schedule: { at: time }, // 设置提醒时间
                  sound: null,
                  attachments: null,
                  actionTypeId: '',
                  extra: null
                }
              ]
            })

            scheduleList.value.push({
              id: id.value++,
              theme: data.theme,
              time: time
            })
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    })
    
    await alert.present()
  }
  else {
    alertController.create({
      header: '请先选择时间',
      buttons: ['确定']
    }).then(alert => alert.present())
  }
}

const setupNotificationListener = () => {
  LocalNotifications.addListener('localNotificationReceived', (notification) => {
    if (navigator.vibrate) {
      navigator.vibrate([1000, 200, 1000, 200, 1000])
    }
  })
}

const getActivityTime = (time: Date) => {
  const month = time.getMonth()
  const day = time.getDay()
  const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  return `${month}月${day}日  ${hours}:${minutes}`
}

addIcons({
  'add-circle-outline': addCircleOutline
})

onMounted(() => {
  getUserInfo()
  getDetailInfo()
  setupNotificationListener()
})
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}

.adder {
  width: 30px;
  height: 30px;
  color: #ffd342;
  font-size: 30px;
  background-color: white;
  position: absolute;
  right: 10px;
}

.schedule-item {
  margin: 10px;
  margin-top: 0;
}

.activity-time {
  font-size: 24px;
  color: black;
}

.activity-theme {
  padding: 10px;
  font-size: 20px;
  background-color: #eee;
  border-left: 8px solid #ffd342;
}

.complete {
  border-left: #42ff81;
}
</style>