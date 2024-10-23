<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="skyblue">
          <ion-title>选项</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
        <ion-card color="skyblue">
          <ion-card-header class="profile">
            <img class="profile-portrait" v-if="userInfo" :src="userInfo.image" alt="">
            <div class="profile-text">
              <ion-card-title >{{ userInfo ? userInfo.name : '' }}</ion-card-title>
              <ion-card-subtitle>id：{{ userInfo ? userInfo.id : '' }}</ion-card-subtitle>
            </div>
            <button class="edit-info ion-activatable" @click="editProfile" router-link="/profile">
              <ion-icon slot="icon-only" name="create-outline"></ion-icon>
              <ion-ripple-effect></ion-ripple-effect>
            </button>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title class="item">
              <ion-text>实名认证</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title class="item">
              <ion-text>主题文字</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title class="item">
              <ion-text>问题反馈</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title class="item">
              <ion-text>关于我们</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
        <ion-card :button="true">
          <ion-card-header>
            <ion-card-title class="item" id="present-alert">
              <ion-text>退出登录</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
            <ion-alert
              trigger="present-alert"
              header="您确定要退出登录吗？"
              :buttons="alertButtons"
            ></ion-alert>
          </ion-card-header>
        </ion-card>
        <ion-card :button="true" color="warning" @click="gototest">
          <ion-card-header>
            <ion-card-title class="item">
              <ion-text>测试页面</ion-text>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </ion-card-title>
          </ion-card-header>
        </ion-card>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-tabs>    
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/app/home">
            <ion-icon name="home-outline"></ion-icon>
            <ion-label>首页</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="body" href="/app/body">
            <ion-icon name="person-outline"></ion-icon>
            <ion-label>身体</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="contacts" href="/app/contacts">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
            <ion-label>关系</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
      <float-ball @click="presentModal"></float-ball>
      <ion-modal :isOpen="modalOpen" :breakpoints="[0, 0.95]" :initialBreakpoint="0.95" @didDismiss="onModalDismiss">
        <ion-header>
          <ion-toolbar color="skyblue">
            <ion-title>智能助手</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss">关闭</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content color="light">
          <ion-grid class="ion-padding">
            <ion-row 
              v-for="message in messageList"
              :class="[message.type, 'message']"
              :key="message.time"
            >
              <div class="avatar">
                <ion-avatar>
                  <img src="../assets/images/assistant.png" v-if="message.type === 'left'">
                  <img :src="userInfo.image" alt="" v-else>
                </ion-avatar>
              </div>
              <div class="content">
                <ion-card class="ion-no-margin" v-show="message.type === 'left'">
                  <type-writer :message="message.content" :shown="message.shown"></type-writer>
                </ion-card>
                <ion-card class="ion-no-margin" v-show="message.type === 'right'">
                  {{ message.content }}
                </ion-card>
              </div>
            </ion-row>
          </ion-grid>
        </ion-content>
        <div class="bottom">
          <ion-item class="input">
            <input
            type="text"
            v-model="inputValue"
            @keyup.enter="sendMessage"
              placeholder="输入消息..."
            >
            <ion-button @click="sendMessage">发送</ion-button>
          </ion-item>
        </div>
      </ion-modal>
    </ion-page>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonRouterOutlet,
  IonRow,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter
 } from '@ionic/vue'
import { onBeforeMount, ref } from 'vue'
import { Preferences } from '@capacitor/preferences'
import { addIcons } from 'ionicons'
import { homeOutline, chatboxEllipsesOutline, personOutline, chevronForwardOutline, createOutline } from 'ionicons/icons'
import request from '@/utils/request'
import FloatBall from '@/components/FloatBall.vue'
import TypeWriter from '@/components/TypeWriter.vue'
import MotionDetector from '@/components/MotionDetector.vue'
import router from '@/router'

interface UserInfo {
  name: string
  id: string
  image: string
}

const USER_KEY = 'user-info'
const INFO_KEY = 'detail'
const TOKEN_KEY = 'token'

const userInfo = ref<UserInfo | null>(null)
const modalOpen = ref(false)
const inputValue = ref('')
const messageList = ref<any>([])
const ionRouter = useIonRouter()

const alertButtons = [
  {
    text: '确认',
    role: 'confirm',
    handler: async () => {
      await Preferences.remove({ key: USER_KEY })
      await Preferences.remove({ key: INFO_KEY })
      await Preferences.remove({ key: TOKEN_KEY })
      ionRouter.replace('/login')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  },
  {
    text: '取消',
    role: 'cancel'
  }
]

const getUserInfo = async () => {
  const { value } = await Preferences.get({ key: USER_KEY })
  if(value) {
    userInfo.value = JSON.parse(value) as UserInfo
  }
}

const presentModal = () => {
  modalOpen.value = true
}

const onModalDismiss = () => {
  modalOpen.value = false
}

const dismiss = async () => {
  modalOpen.value = false
}

const sendMessage = async () => {
  if (inputValue.value.trim() !== '') {
    const text = inputValue.value
    inputValue.value = ''
    
    messageList.value.push({
      type: 'right',
      content: text,
      time: Date.now()
    })
    
    const message = {
      type: 'left',
      content: '思考中...',
      shown: false,
      time: Date.now()
    }
    
    messageList.value.push(message)
    
    const response = await request.get(`/ai/chat?message=${text}`)
    
    messageList.value[messageList.value.length - 1].content = response.data
    
    setTimeout(() => {
      messageList.value[messageList.value.length - 1].shown = true
    }, 100) // 防止后面接收到的内容来不及显示
  }
}

const editProfile = () => {

}

const gototest = () => {
  router.push('/testpage')
}

addIcons({
  'chevron-forward-outline': chevronForwardOutline,
  'chatbox-ellipses-outline': chatboxEllipsesOutline,
  'home-outline': homeOutline,
  'person-outline': personOutline,
  'create-outline': createOutline
})

onBeforeMount(async () => {
  await getUserInfo()
})
</script>

<style scoped>
/* 侧边菜单栏 */
.profile {
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.profile-portrait {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.profile-text {
  width: 120px;
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.edit-info {
  font-size: 20px;
  position: absolute;
  right: 10px;
  background: rgba(255, 255, 255, 0);
}

/* 底部菜单栏 */
ion-tab-button {
  --color-selected: #52b7f5;
}

/* 智能助手 */
.message {
  margin-bottom: 10px!important;
}

.left {
  justify-content: left;
  flex-direction: row;
}

.left .avatar {
  margin-right: 10px;
}

.right {
  justify-content: right;
  flex-direction: row-reverse;
}

.right .avatar {
  margin-left: 10px;
}

.avatar {
  width: 48px;
  display: flex;
}

.avatar ion-avatar {
  width: 100%;
  height: 48px;
}

.content {
  max-width: 240px;
}

.content ion-card {
  font-size: 18px;
  padding: 8px;
  text-align: justify;
}

.bottom {
  height: 100px;
  position: relative;
  top: 100px;
  background-color: white;
}

.input {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 40px;
  background-color: white;
}

input {
  width: calc(100% - 80px);
  padding: 0.5rem;
  border: .0625rem solid #ccc;
  background-color: white;
  border-radius: 0.5rem;
  margin-left: 4px;
  margin-right: 0.5rem;
}

.input ion-button {
  width: 80px;
  height: 40px;
  font-size: 16px;
}
</style>