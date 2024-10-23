<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>登录</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="false">
      <ion-card>
        <ion-card-content>
          <form @submit.prevent="confirmLogin">
            <ion-input
              label="手机号 +86"
              type="text"
              label-placement="floating"
              fill="outline"
              placeholder="请输入手机号"
              v-model="phoneNumber"
            >
            </ion-input>
            <ion-input
              class="ion-margin-top"
              label="密码"
              type="password"
              label-placement="floating"
              fill="outline"
              placeholder="请输入密码"
              v-model="password"
            >
            </ion-input>
            <ion-button
              class="ion-margin-top"
              type="submit"
              expand="block"
              shape="round"
            >
              登录<ion-icon :icon="logInOutline" slot="end"></ion-icon>
            </ion-button>
            <ion-button
              class="ion-margin-top"
              type="button"
              expand="block"
              color="secondary"
              shape="round"
              router-link="/register"
            >
              注册<ion-icon :icon="personCircleOutline" slot="end"></ion-icon>
            </ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  loadingController,
  useIonRouter
} from '@ionic/vue'
import {
  logInOutline,
  personCircleOutline
} from 'ionicons/icons'
import { Preferences } from '@capacitor/preferences'
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

const INTRO_KEY = 'intro-seen'
const USER_KEY = 'user-info'
const TOKEN_KEY = 'token'
const INFO_KEY = 'detail'

const introSeen = ref(false)
const phoneNumber = ref('')
const password = ref('')
const ionRouter = useIonRouter()

const checkIntro = async () => {
  const { value } = await Preferences.get({ key: INTRO_KEY })
  if (value) {
    introSeen.value = value === 'true'
  }
  else {
    await Preferences.set({
      key: INTRO_KEY,
      value: 'false'
    })
  }

  if (!introSeen.value) {
    ionRouter.push('/intro')
  }
}

const getUserData = async () => {
  const res_user = await request.get(`/users?phone=${phoneNumber.value}`)
  const userInfo = res_user.data[0]

  // 查看用户信息
  console.log(res_user, userInfo)

  await Preferences.set({
    key: USER_KEY,
    value: JSON.stringify(userInfo)
  })

  const res_heartRate = await request.get(`/heartrate/read?id=${userInfo.id}`)
  const res_bloodOxygen = await request.get(`/bloodoxygen/read?id=${userInfo.id}`)
  const res_schedule = await request.get(`/schedule/read?id=${userInfo.id}`)

  const detailInfo = {
    heartRate: res_heartRate.data,
    bloodOxygen: res_bloodOxygen.data,
    schedule: res_schedule.data
  }

  await Preferences.set({
    key: INFO_KEY,
    value: JSON.stringify(detailInfo)
  })
}

const confirmLogin = async () => {
  const loading = await loadingController.create({ message: '请稍后...' })

  try {
    await loading.present()

    const res_token = await request.post('/login', {
      phone: phoneNumber.value,
      password: password.value
    })

    if (res_token && res_token.data) {
      await Preferences.set({
        key: TOKEN_KEY,
        value: res_token.data
      })
      
      await getUserData()

      ionRouter.push('/app/home')
    }
    else {
      alert("用户名或密码错误")
    }
  }
  catch (error) {
    // 有时间可以把IonToast加上
    const errorMessage = error || '发生未知错误'

    if (error.response) {
      alert(`服务器错误`);
      console.log(`服务器返回错误响应: ${JSON.stringify(error.response, null, 2)}`)
    }
    else if (error.request) {
      alert('网络错误，请检查你的网络连接')
       console.log(`请求发送成功，但未收到响应: ${JSON.stringify(error.request, null, 2)}`)
    }
    else {
      alert(`程序错误`)
      console.log(`其他错误: ${errorMessage}`)
    }
  }
  finally {
    loading.dismiss()
  }
}

onMounted(async () => {
  await checkIntro()
})
</script>

<style scoped>
</style>