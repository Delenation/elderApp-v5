<template>
  <ion-card>
    <div class="music-player ion-padding">
      <div class="music-info">
        <img :src="testCover" alt="" class="music-cover">
        <div class="music-title">以父之名</div>
        <div class="music-subtitle">周杰伦</div>
      </div>
      <ion-range 
        color="skyblue"
        :min="0"
        :max="duration"
        :step="1"
        v-model="currentTime"
        @ionChange="seekMusic"
      >
        <ion-label slot="start">{{ formatTime(currentTime) }}</ion-label>
        <ion-label slot="end">{{ formatTime(duration) }}</ion-label>
      </ion-range>
      <ion-buttons class="player-buttons">
        <!-- <ion-button>
          <ion-icon name="shuffle" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon name="infinite" slot="icon-only"></ion-icon>
        </ion-button> -->
        <ion-button>
          <ion-icon name="repeat" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon name="play-skip-back" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button v-if="isPlaying" @click="pauseMusic">
          <ion-icon name="pause" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button v-else @click="playMusic">
          <ion-icon name="play" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon name="play-skip-forward" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button router-link="/music">
          <ion-icon name="list" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { 
  IonCard, 
  IonCardHeader, 
  IonCardContent, 
  IonButton, 
  IonButtons, 
  IonIcon,
  IonTitle,
  IonRange,
  IonLabel
} from '@ionic/vue'
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { shuffle, infinite, repeat, list, play, pause, playSkipBack, playSkipForward } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import test_musicCover from '@/assets/images/test/music_001.jpg'
import test_musicSource from '@/assets/audios/test/Jay_Jou-name_of_the_father.mp3'

export default defineComponent({
  name: 'MusicRecommendDaily',
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonTitle,
    IonRange,
    IonLabel
  },
  setup() {
    const testCover = test_musicCover
    const testAudio = new Audio(test_musicSource)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    testAudio.volume = 0

    const playList = ref([
      {
        name: '以父之名',
        author: '周杰伦',
        musicId: 1,
        source: test_musicSource
      },
      {
        name: '以父之名_2',
        author: '周杰伦',
        musicId: 2,
        source: test_musicSource
      },
      {
        name: '以父之名_3',
        author: '周杰伦',
        musicId: 3,
        source: test_musicSource
      }
    ])
    
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
    
    const playMusic = () => {
      isPlaying.value = true
      testAudio.play()
      fadeIn(testAudio)
    }

    const pauseMusic = () => {
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

    addIcons({
      'shuffle': shuffle,
      'infinite': infinite,
      'repeat': repeat,
      'list': list,
      'play': play,
      'pause': pause,
      'play-skip-back': playSkipBack,
      'play-skip-forward': playSkipForward
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

    return {
      testCover,
      testAudio,
      playList,
      isPlaying,
      duration,
      currentTime,
      playMusic,
      pauseMusic,
      seekMusic,
      formatTime
    }
  }
})
</script>

<style scoped>
.music-player {
  display: flex;
  flex-direction: column;
}

.music-info {
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.music-cover {
  width: 100px;
  height: 100px;
}

.music-title {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: black;
}

.music-subtitle {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}

.player-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>