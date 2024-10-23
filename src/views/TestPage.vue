<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-title>TEST</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goBack" router-direction="back">返回</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false" class="ion-no-padding">
      <!-- <ion-card class="test">
        <blue-tooth></blue-tooth>
      </ion-card> -->
      <!-- <VinylPlayer></VinylPlayer> -->
      <!-- <div style="width: 100%; height: 600px; background-color: #89CFF0">天空蓝</div> -->
      <!-- <ion-item>
        <ion-label>选择提醒时间</ion-label>
        <ion-datetime v-model="selectedTime"></ion-datetime>
      </ion-item>

      <ion-button @click="setReminder">
        设置提醒
      </ion-button>

      <ion-button @click="vibratePhone">震动手机</ion-button>
      <ion-button @click="sendNotificationWithVibration">发送通知并震动</ion-button>
      <ion-button @click="sendNotification">发送通知</ion-button> -->
      <div id="live2d-container"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonBackButton, 
  IonLabel,
  IonDatetime,
  IonItem,
  IonCard, 
  useIonRouter } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import BlueTooth from '@/components/Bluetooth.vue'
import VinylPlayer from '@/components/VinylPlayer.vue'
import { LocalNotifications } from '@capacitor/local-notifications';

const router = useIonRouter()
const message = ref('')

const goBack = () => {
  if (router.canGoBack()) {
    router.back()
  }
}

// 定义选择的时间
const selectedTime = ref<string>('');

// 请求通知权限
const requestNotificationPermissions = async () => {
  const permission = await LocalNotifications.requestPermissions();
  if (permission.display !== 'granted') {
    alert('请允许通知权限');
  }
};

// 设置提醒
const setReminder = async () => {
  if (selectedTime.value) {
    const time = new Date(selectedTime.value);
    await LocalNotifications.schedule({
      notifications: [
        {
          title: '日程提醒',
          body: '这是你设置的提醒',
          id: 1,
          schedule: { at: time }, // 设置提醒时间
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
    alert('提醒已设置');
  } else {
    alert('请选择提醒时间');
  }
};

const vibratePhone = () => {
  if (navigator.vibrate) {
    // 让手机震动200毫秒
    navigator.vibrate(200);
  } else {
    message.value = '震动不了'
  }
}

const sendNotificationWithVibration = async () => {
  try {
    // 请求通知权限
    await LocalNotifications.requestPermissions();

    // 调度本地通知
    // await LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       title: '新提醒',
    //       body: '这是一个带震动的通知',
    //       id: 1, // 唯一 ID
    //       schedule: { at: new Date(Date.now() + 1000) }, // 延迟1秒发送通知
    //       sound: null, // 可以添加自定义声音
    //       attachments: null,
    //       actionTypeId: '',
    //       extra: null,
    //     },
    //   ],
    // });

    console.log('通知已发送');

    // 发送通知的同时震动手机
    if (navigator.vibrate) {
      navigator.vibrate([1000, 200, 1000, 200, 1000]); // 震动200毫秒
      console.log('设备震动');
    } else {
      console.log('设备不支持震动');
    }
  } catch (error) {
    console.error('发送通知或震动时出错:', error);
  }
}

const sendNotification = async () => {
  // 请求通知权限
  await LocalNotifications.requestPermissions();

  // 调度本地通知
  await LocalNotifications.schedule({
    notifications: [
      {
        title: '通知标题',
        body: '这是通知内容',
        id: 1,
        schedule: { at: new Date(Date.now() + 1000) }, // 延迟1秒发送通知
        sound: null,
        attachments: null,
        actionTypeId: '',
        extra: null,
      },
    ],
  });

  console.log('通知已发送');
}

// 监听通知事件并震动
const setupNotificationListener = () => {
  LocalNotifications.addListener('localNotificationReceived', (notification) => {
    console.log('收到通知:', notification);

    // 当收到通知时，震动设备
    if (navigator.vibrate) {
      navigator.vibrate(200); // 震动200毫秒
      console.log('设备震动');
    } else {
      console.log('设备不支持震动');
    }
  })
}
// 请求权限时调用
onMounted(() => {
  requestNotificationPermissions();
  setupNotificationListener();
});
</script>

<style scoped>
.test {
  width: 100%;
  height: 600px;
  background-color: white;
}

#live2d-container {
  width: 300px;
  height: 500px;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>