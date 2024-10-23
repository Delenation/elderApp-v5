<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>关系</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="presentAlert">
            <i class="iconfont icon">&#xe689;</i>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <ion-card v-for="contact of contacts" :key="contact.id" @click="openModal(contact)">
        <ion-card-content class="ion-no-padding">
          <ion-item>
            <ion-avatar>
              <img :src="contact.image" alt="">
            </ion-avatar>
            <ion-label class="contact-info">
              {{ contact.name }}（{{ contact.relationship }}）
              <p>1条未读消息</p>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-modal :is-open="isOpen" v-if="selectedContact">
        <ion-header>
          <ion-toolbar color="skyblue">
            <ion-title>{{ selectedContact.name }}</ion-title>
            <ion-buttons slot="start">
              <ion-button @click="closeModal">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-no-padding" color="light">
          <ion-grid class="ion-no-margin ion-no-padding" style="padding-top: 20px;">
            <div class="background-under"></div>
            <ion-row v-for="message in messageList[selectedContact.id]" :key="message.time">
            <div class="time">{{ formattedTime(message.time) }}</div>
            <div :class="[message.id === userInfo.id ? 'right' : 'left', 'message']">
              <div class="avatar">
                <ion-avatar>
                  <ion-img :src="message.id === userInfo.id ? userInfo.image : selectedContact.image"></ion-img>
                </ion-avatar>
              </div>
              <div class="content">
                <ion-card class="ion-no-margin text" :color="message.id === userInfo.id ? 'skyblue' : 'snow' ">
                  {{ message.content }}
                </ion-card>
              </div>
            </div>
            </ion-row>
          </ion-grid>
        </ion-content>
        <ion-item class="input">
          <input
            type="text"
            v-model="inputValue"
            @keyup.enter="sendMessage"
            placeholder="输入消息..."
          >
          <ion-button @click="sendMessage" color="skyblue">发送</ion-button>
        </ion-item>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonModal,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  alertController
} from '@ionic/vue'
import { chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import { Preferences } from '@capacitor/preferences'
import { onMounted, ref, computed } from 'vue'
import MotionDetector from '@/components/MotionDetector.vue'
import request from '@/utils/request'
import '@/assets/icons/iconfont/iconfont.css'

const USER_KEY = 'user-info'
const TOKEN_KEY = 'token'
const INFO_KEY = 'detail'

const contacts = ref([])

const messageList = ref({
  '001': [
    {
      id: '002',
      content: '吃了吗',
      time: 1727695205456,
      isSystem: false
    },
    {
      id: '001',
      content: '吃了',
      time: 1727695315162,
      isSystem: false
    },
    {
      id: '002',
      content: '你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',
      time: 1727695331867,
      isSystem: false
    }
  ],
  '002': [
    {
      id: '002',
      content: '吃了吗',
      time: 1727695205456,
      isSystem: false
    },
    {
      id: '001',
      content: '吃了',
      time: 1727695315162,
      isSystem: false
    },
    {
      id: '002',
      content: '你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',
      time: 1727695331867,
      isSystem: false
    }
  ]
})

interface UserInfo {
  name: string
  id: string
  image: string
  child: string
  father: string
  mother: string
}

interface DetailInfo {
  bloodOxygen: Array<Object>
  heartRate: Array<Object>
  schedule: Array<Object>
}

const userInfo = ref<UserInfo | null>(null)
const detailInfo = ref<DetailInfo | null>(null)
const token = ref('')

const getUserInfo = async () => {
  const { value } = await Preferences.get({ key: USER_KEY })
  if (value) {
    userInfo.value = JSON.parse(value) as UserInfo
    if (userInfo.value.child) {
      const response = await request.get(`/users?phone=${userInfo.value.child}`)
      if(response && response.data) {
        contacts.value.push({
          ...response.data[0],
          relationship: '孩子'
        })
      }
    }
    if (userInfo.value.mother) {
      const response = await request.get(`/users?phone=${userInfo.value.mother}`)
      if(response && response.data) {
        contacts.value.push({
          ...response.data[0],
          relationship: '母亲'
        })
      }
    }
    if (userInfo.value.father) {
      const response = await request.get(`/users?phone=${userInfo.value.mother}`)
      if(response && response.data) {
        contacts.value.push({
          ...response.data[0],
          relationship: '父亲'
        })
      }
    }
  }
}

const getDetailInfo = async () => {
  const { value } = await Preferences.get({ key: INFO_KEY })
  if (value) {
    detailInfo.value = JSON.parse(value) as DetailInfo
  }
}

const getToken = async () => {
  const { value } = await Preferences.get({ key: TOKEN_KEY })
  if (value) {
    token.value = value
  }
}

const ws = ref<WebSocket | null>(null)

const setupWebSocket = () => {
  ws.value = new WebSocket(`ws://121.199.174.47:8080/chat?token=${token.value}`)
  
  ws.value.onopen = () => {
    console.log('WebSocket connection established')
  }

  ws.value.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      const { fromName, message, system } = data

      if (selectedContact.value && messageList.value[selectedContact.value.id]) {
        messageList.value[selectedContact.value.id].push({
          id: fromName,
          content: message,
          time: Date.now(),
          isSystem: system
        })
      }
    }
    catch (error) {
      console.error("Failed to parse WebSocket message:", error)
    }
  }

  ws.value.onerror = (error) => {
    console.log('WebSocket error:', error)
  }

  ws.value.onclose = () => {
    console.log('WebSocket connection closed.')
  }
}

const inputValue = ref('')

const sendMessage = () => {
  if (inputValue.value.trim() !== '' && ws.value && ws.value.readyState === WebSocket.OPEN) {
    const message = {
      senderId: userInfo.value.id,
      receiverId: selectedContact.value.id,
      content: inputValue.value,
      isSystem: false
    }

    ws.value.send(JSON.stringify(message));

    messageList.value[selectedContact.value.id].push({
      id: userInfo.value.id,
      content: inputValue.value,
      time: Date.now(),
      isSystem: false
    })

    inputValue.value = ''
  }
  else {
    console.log('WebSocket is not connected or message is empty.')
  }
}

const isOpen = ref(false)
const selectedContact = ref(null)

const openModal = (contact = null) => {
  isOpen.value = true
  selectedContact.value = contact
}

const closeModal = () => {
  isOpen.value = false
}

const relation = ref('')
const telephone = ref('')

const presentAlert = async () => {
  const alert = await alertController.create({
    header: '添加联系人',
    inputs: [
      {
        placeholder: '请输入称呼',
        value: relation.value,
        name: 'relation'
      },
      {
        placeholder: '请输入手机号',
        value: telephone.value,
        name: 'telephone',
        attributes: {
          inputmode: 'numeric',
          pattern: '[0-9]*',
          maxlength: 11
        }
      }
    ],
    buttons: [
      {
        text: '添加',
        role: 'add',
        handler: (data) => {
          if (!data.relation || !data.telephone) {
            alertController.create({
              header: '错误',
              message: '请填写所有选项',
              buttons: ['确定']
            }).then(alert => alert.present())

            return false
          }

          relation.value = data.relation
          telephone.value = data.telephone

          const isExistingContact = contacts.value.some((contact) => {
            return telephone.value === contact.phone
          })

          if (isExistingContact) {
            alertController.create({
              header: '错误',
              message: '联系人已存在',
              buttons: ['确定']
            }).then(alert => alert.present())

            return false
          }

          return new Promise(async (resolve) => {
            const response = await request.get(`/users?phone=${telephone.value}`)

            if (response && response.data) {
              contacts.value.push({
                name: response.data[0].name,
                id: response.data[0].id,
                image: response.data[0].image,
                phone: telephone.value,
                relationship: relation.value
              })
              resolve(true)
            }
            else {
              alertController.create({
                header: '错误',
                message: '请填写所有选项',
                buttons: ['确定']
              }).then(alert => alert.present())

              resolve(false)
            }
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

const formattedTime = (time) => {
  const date = new Date(time)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  hours = hours % 12
  hours = hours ? hours : 12

  const hoursFormatted = hours < 10 ? '0' + hours : hours
  const minutesFormatted = minutes < 10 ? '0' + minutes : minutes

  return hoursFormatted + ':' + minutesFormatted + ' ' + ampm
}

addIcons({
  'chevron-back-outline': chevronBackOutline
})

onMounted(async () => {
  await getUserInfo()
  await getDetailInfo()
  await getToken()
  await setupWebSocket()
})
</script>

<style scoped>
.icon {
  font-size: 30px;
}

.contact-info {
  margin-left: 8px;
}

.time {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}

.message {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}

.left {
  justify-content: left;
  flex-direction: row;
  margin-left: 10px;
}

.left .text {
  border-radius: 1rem 1rem 1rem 0;
}

.left .avatar {
  margin-right: 10px;
}

.right {
  justify-content: right;
  flex-direction: row-reverse;
  margin-right: 10px;
}

.right .text {
  border-radius: 1rem 1rem 0 1rem;
}

.right .avatar {
  margin-left: 10px;
}

.avatar {
  width: 48px;
  display: flex;
  flex-direction: column-reverse
}

.avatar ion-avatar {
  width: 100%;
  height: 48px;
}

.content {
  display: flex;
  flex-direction: column-reverse;
  max-width: calc(100vw - 130px);
}

.content ion-card {
  font-size: 18px;
  padding: 8px;
  text-align: justify;
}

.input {
  width: 100%;
  height: 60px;
  position: sticky;
  bottom: 0;
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
