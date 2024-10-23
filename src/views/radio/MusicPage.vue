<template>
  <ion-page>
    <ion-content>
      <div class="back-button">
        <button @click="goBack">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
      </div>
      <div class="box"></div>
      <VinylPlayer :setPlay="setPlay"></VinylPlayer>
      <div class="title">以父之名</div>
      <div class="author">周杰伦</div>
      <div class="timebar">
        <ion-range 
          color="snow"
          :min="0"
          :max="duration"
          :step="1"
          v-model="currentTime"
          @ionChange="seekMusic"
          >
          <ion-label slot="start" color="snow">{{ formatTime(currentTime) }}</ion-label>
          <ion-label slot="end" color="snow">{{ formatTime(duration) }}</ion-label>
        </ion-range>
      </div>
      <ion-buttons class="player-buttons">
        <!-- <ion-button>
          <ion-icon name="shuffle" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon name="infinite" slot="icon-only"></ion-icon>
        </ion-button> -->
        <ion-button color="snow">
          <ion-icon name="repeat" slot="icon-only" @click="switch"></ion-icon>
        </ion-button>
        <ion-button color="snow">
          <ion-icon name="play-skip-back" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button v-if="setPlay" @click="onPause" color="snow">
          <ion-icon name="pause" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button v-else @click="onPlay" color="snow">
          <ion-icon name="play" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button color="snow">
          <ion-icon name="play-skip-forward" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button color="snow">
          <ion-icon name="list" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRange, IonLabel, IonContent, IonButton, IonButtons, IonIcon, useIonRouter } from '@ionic/vue'
import { shuffle, infinite, repeat, list, play, pause, playSkipBack, playSkipForward, chevronBackOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import { ref, onMounted, onUnmounted } from 'vue'
import VinylPlayer from '@/components/music/VinylPlayer.vue'
import test_musicSource from '@/assets/audios/test/Jay_Jou-name_of_the_father.mp3'

const router = useIonRouter()
const setPlay = ref(false)
const loopMethods = ['repeat', 'shuffle', 'infinite']

const testAudio = new Audio(test_musicSource)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
testAudio.volume = 0

let fadeInFrame = null
let fadeOutFrame = null

const fadeIn = (audio) => {
  cancelAnimationFrame(fadeOutFrame) // 取消淡出动画
  
  let volume = audio.volume;
  
  const step = () => {
    if (volume < 1 && !audio.paused) {
      volume = Math.min(volume + 0.01, 1)
      audio.volume = volume
      fadeInFrame = requestAnimationFrame(step)
    }
    else {
      cancelAnimationFrame(fadeInFrame)
    }
  }
  
  step()
}

const fadeOut = (audio) => {
  cancelAnimationFrame(fadeInFrame)
  
  let volume = audio.volume
  
  const step = () => {
    if (volume > 0) {
      volume = Math.max(volume - 0.01, 0)
      audio.volume = volume
      fadeOutFrame = requestAnimationFrame(step)
    }
    else {
      audio.pause()
      cancelAnimationFrame(fadeOutFrame)
    }
  }
  
  step()
}

const onPlay = () => {
  setPlay.value = true
  isPlaying.value = true
  testAudio.play()
  fadeIn(testAudio)
}

const onPause = () => {
  setPlay.value = false
  isPlaying.value = false
  fadeOut(testAudio)
}

//拖动进度条到指定时刻
const seekMusic = (event) => {
  const newTime = event.detail.value
  testAudio.currentTime = newTime
}

// 格式化时间(00:00)
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}


const switchLooping = () => {

}

const goBack = () => {
  if (router.canGoBack()) {
    router.back()
  }
}

addIcons({
  'shuffle': shuffle,
  'infinite': infinite,
  'repeat': repeat,
  'list': list,
  'play': play,
  'pause': pause,
  'play-skip-back': playSkipBack,
  'play-skip-forward': playSkipForward,
  'chevron-back-outline': chevronBackOutline
})

onMounted(() => {
  testAudio.addEventListener('loadedmetadata', () => {
    duration.value = testAudio.duration
  })

  testAudio.addEventListener('timeupdate', () => {
    currentTime.value = testAudio.currentTime
  })

  testAudio.addEventListener('ended', () => {
    isPlaying.value = false
    currentTime.value = 0
  })
})

onUnmounted(() => {
  testAudio.pause()
  testAudio.removeEventListener('loadedmetadata', () => {})
  testAudio.removeEventListener('timeupdate', () => {})
  testAudio.removeEventListener('ended', () => {})
})
</script>

<style scoped>
ion-content {
  --background: linear-gradient(135deg,#5EFCE8 15%,#736EFE 100%);
}

.back-button {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  position: fixed;
}

.back-button button {
  width: 100%;
  height: 100%;
  color: white;
  font-size: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}

.box {
  height: 60px;
}

.author {
  color: #eee;
  font-size: 20px;
  text-align: center;
}

.title {
  color: white;
  font-size: 28px;
  text-align: center;
}

.timebar {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 80px;
}

.player-buttons {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
</style>