<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>个人</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <ion-grid>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card color="skyblue">
              <ion-card-header class="profile">
                <img class="profile-portrait" v-if="userInfo" :src="userInfo.image" alt="">
                <ion-card-title>昵称：{{ userInfo ? userInfo.name : '' }}</ion-card-title>
                <ion-card-subtitle>id：{{ userInfo ? userInfo.id : '' }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card>
              <ion-card-header>
                <ion-card-title class="item">
                  <ion-text>实名认证</ion-text>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card>
              <ion-card-header>
                <ion-card-title class="item">
                  <ion-text>主题文字</ion-text>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card>
              <ion-card-header>
                <ion-card-title class="item">
                  <ion-text>问题反馈</ion-text>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card>
              <ion-card-header>
                <ion-card-title class="item">
                  <ion-text>关于我们</ion-text>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-card>
              <ion-card-header class="ion-no-padding">
                <ion-button class="ion-no-margin button" color="snow" expand="block" id="present-alert">
                  <ion-text class="button-text">退出登录</ion-text>
                  <ion-icon class="button-icon" name="chevron-forward-outline"></ion-icon>
                </ion-button>
                <ion-alert
                  trigger="present-alert"
                  header="您确定要退出登录吗？"
                  :buttons="alertButtons"
                ></ion-alert>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle, 
  IonButtons,
  IonMenuButton, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonText,
  IonIcon,
  IonButton,
  IonAlert,
  useIonRouter
} from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import { Preferences } from '@capacitor/preferences'
import { onBeforeMount, ref } from 'vue'

const USER_KEY = 'user-info'
const INFO_KEY = 'detail'
const TOKEN_KEY = 'token'

const ionRouter = useIonRouter()

interface UserInfo {
  name: string
  id: string
  image: string
}

const userInfo = ref<UserInfo | null>(null)

const getUserInfo = async () => {
  const { value } = await Preferences.get({ key: USER_KEY })
  if (value) {
    userInfo.value = JSON.parse(value) as UserInfo
  }
}

const alertButtons = [
  {
    text: '确认',
    role: 'confirm',
    handler: async () => {
      await Preferences.remove({ key: USER_KEY })
      await Preferences.remove({ key: INFO_KEY })
      await Preferences.remove({ key: TOKEN_KEY })
      ionRouter.push('/login')
    }
  },
  {
    text: '取消',
    role: 'cancel'
  }
]

addIcons({
  'chevron-forward-outline': chevronForwardOutline
})

onBeforeMount(async () => {
  await getUserInfo()
})
</script>

<style scoped>
.background-under {
  height: 100%;
  background: linear-gradient(#def1f5 0%, #b6e1f3 20%, #a8daf4 100%);
}

.profile {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 20px;
}

.profile-portrait {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  border-radius: 50px;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  height: 56px;
}

.button-text {
  height: 24px;
  font-size: 20px;
  position: absolute;
  left: 0;
}

.button-icon {
  height: 20px;
  position: absolute;
  right: 0;
}
</style>
