<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar color="skyblue">
        <ion-title>身体</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false" color="light">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <img src="../assets/icons/sleep.png" alt="" class="custom-icon"><b>实时睡眠</b>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <img src="../assets/images/timeline.png" alt="">
          <p>8时2分</p>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <img src="../assets/icons/heartRate.png" alt="" class="custom-icon"><b>实时心率</b>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="rate-content">
          <div class="wave">
            <wave></wave>
          </div>
          <div class="rate">
            <div class="number" v-for="(lines, index) of heartRate" :key="index">
              <div
                v-for="(line, index) of lines"
                :key="index"
                :class="[
                  `part-${index + 1}`,
                  line ? 'active' : ''
                ]"
              ></div>
            </div>
            <div class="rate-unit">次/分钟</div>
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <img src="../assets/icons/bloodOxygen.png" alt="" class="custom-icon"><b>实时血氧</b>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="oxygen">
            {{ oxygen }}
          </div>
          <div class="info-area">
            <div class="sphere">
              <sphere></sphere>
            </div>
            <div class="tips">
              小贴士：饮食中富含维生素C、维生素E、铁、叶酸等营养物质,可以促进血氧水平的恢复。
            </div>
          </div>
        </ion-card-content>
      </ion-card>
      <record-chart><b class="title">心率记录</b></record-chart>
      <record-chart><b class="title">血氧记录</b></record-chart>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue'
import { Preferences } from '@capacitor/preferences'
import { onBeforeMount, ref, onUnmounted } from 'vue'
import Wave from '@/components/body/Wave.vue'
import sphere from '@/components/body/Sphere.vue'
import RecordChart from '../components/RecordChart.vue'

const USER_KEY = 'user-info'
const INFO_KEY = 'detail'

interface UserInfo {
  name: string
  id: string
  image: string
}

interface DetailInfo {
  bloodOxygen: Array<Object>
  heartRate: Array<Object>
  schedule: Array<Object>
}

const userInfo = ref<UserInfo | null>(null)
const detailInfo = ref<DetailInfo | null>(null)

const getUserInfo = async () => {
  const { value } = await Preferences.get({ key: USER_KEY })
  if (value) {
    userInfo.value = JSON.parse(value) as UserInfo
  }
}

const getDetailInfo = async () => {
  const { value } = await Preferences.get({ key: INFO_KEY })
  if (value) {
    detailInfo.value = JSON.parse(value) as DetailInfo
  }
}

const LEDNumbers = [
  [true, true, true, false, true, true, true],
  [false, true, false, false, false, true, false],
  [true, true, false, true, true, false, true],
  [true, true, false, true, false, true, true],
  [false, true, true, true, false, true, false],
  [true, false, true, true, false, true, true],
  [true, false, true, true, true, true, true],
  [true, true, false, false, false, true, false],
  [true, true, true, true, true, true, true],
  [true, true, true, true, false, true, true]
]

const heartRate = ref([])
const interval_1 = ref(null)

const getHeartRate = () => {
  const rates = ['065', '070', '067', '064', '069']
  let currentRate = 0
  interval_1.value = setInterval(() => {
    const rate = rates[currentRate++ % rates.length]
    heartRate.value = [
      LEDNumbers[Number(rate[0])],
      LEDNumbers[Number(rate[1])],
      LEDNumbers[Number(rate[2])]
    ]
  }, 1000)
}

const oxygen = ref('90%')
const interval_2 = ref(null)

const getOxygen = () => {
  const tests = ['93%', '90%', '95%']
  let currentOxygen = 0
  interval_2.value = setInterval(() => {
    oxygen.value = tests[currentOxygen++ % tests.length]
  }, 5000)
}

onBeforeMount(async () => {
  await getUserInfo()
  await getDetailInfo()
  getHeartRate()
  getOxygen()
})

onUnmounted(() => {
  clearInterval(interval_1.value)
  clearInterval(interval_2.value)
})
</script>

<style scoped>
.title {
  font-size: 20px;
}

.custom-icon {
  height: 24px;
  margin-right: 4px;
  transform: translateY(4px);
}

.oxygen {
  font-size: 50px;
  color: white;
  text-shadow: #666 2px 2px 0;
  position: absolute;
  left: 40px;
  top: 20px;
}

.sphere {
  width: 120px;
  height: 120px;
}

.tips {
  font-size: 18px;
  text-align: justify;
  width: calc(100% - 160px);
  height: 140px;
  margin-left: 20px;
  background-color: #f5f5f5;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px;
}

.info-area {
  display: flex;
}

.rate-content {
  display: flex;
}

.wave {
  width: 50%;
}

.rate {
  display: flex;
  position: relative;
}

.rate-unit {
  width: 100%;
  z-index: -1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  bottom: 5px;
}

.number {
  width: 50px;
  position: relative;
  top: -20px;
  left: 20px;
}

.number div {
  width: 30px;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(252, 70, 38, 0.1);
}

.part-1 {
  position: absolute;
}

.part-2 {
  position: absolute;
  transform: 
    translateX(60%)
    translateY(300%)
    rotateZ(90deg);
}

.part-3 {
  position: absolute;
  transform: 
    translateX(-60%)
    translateY(300%)
    rotateZ(90deg);
}

.part-4 {
  position: absolute;
  transform: 
    translateY(600%);
}

.part-5 {
  position: absolute;
  transform: 
    translateX(-60%)
    translateY(900%)
    rotateZ(90deg);
}

.part-6 {
  position: absolute;
  transform: 
    translateX(60%)
    translateY(900%)
    rotateZ(90deg);
}

.part-7 {
  position: absolute;
  transform: 
    translateY(1200%);
}

.active {
  background-color: rgba(252, 70, 38, 0.9)!important;
}
</style>
