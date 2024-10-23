<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>注册</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="false">
      <ion-card>
        <ion-card-content>
          <form onsubmit="">
            <ion-input
              label="昵称"
              type="text"
              label-placement="floating"
              fill="outline"
              placeholder="请输入昵称"
              v-model="name"
            ></ion-input>
            <ion-input
              label="手机号 +86"
              type="text"
              label-placement="floating"
              fill="outline"
              placeholder="请输入手机号"
              v-model="phone"
            ></ion-input>
            <ion-input
              class="ion-margin-top"
              label="密码"
              type="password"
              label-placement="floating"
              fill="outline"
              placeholder="请输入密码"
              v-model="password"
            ></ion-input>
            <ion-button
              class="ion-margin-top"
              type="submit"
              expand="block"
              color="tertiary"
              shape="round"
              router-link="/login"
              @click="register"
            >
              创建账户<ion-icon
                :icon="checkmarkDoneOutline"
                slot="end"
              ></ion-icon>
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
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/vue";
import { ref } from "vue"
import { checkmarkDoneOutline } from "ionicons/icons"
import request from "@/utils/request"

const name = ref('')
const phone = ref('')
const password = ref('')

const register = () => {
  request.post('/users', {
    phone: phone.value,
    name: name.value,
    password: password.value
  })
}
</script>

<style scoped>
</style>