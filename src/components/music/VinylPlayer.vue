<template>
  <div class="vinyl">
    <div class="vinyl-container">
      <div class="vinyl-record" ref="record">
        <div class="vinyl-record-cover" ref="cover">
          <!-- 唱片中间的洞，可加可不加 -->
          <!-- <div class="vinyl-record-hole"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick } from 'vue'
import test_musicCover from '@/assets/images/test/music_001.jpg'

export default defineComponent({
  name: 'VinylPlayer',
  props: {
    setPlay: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const record = ref<HTMLElement | null>(null)
    const cover = ref<HTMLElement | null>(null)
    let recordRotation = 0
    let coverRotation = 0

    const applyAnimation = (element: HTMLElement, add: boolean) => {
      if (add) {
        element.style.animationPlayState = 'running'
      }
      else {
        setTimeout(() => {
          element.style.animationPlayState = 'paused'
        }, 300)
      }
    }

    const saveCurrentRotation = (recordEl: HTMLElement, coverEl: HTMLElement) => {
      const recordStyle = window.getComputedStyle(recordEl)
      const coverStyle = window.getComputedStyle(coverEl)

      recordRotation = getRotationAngle(recordStyle.transform)
      coverRotation = getRotationAngle(coverStyle.transform)

      recordEl.style.transform = `rotate(${recordRotation}deg)`
      coverEl.style.transform = `rotate(${coverRotation}deg)`
    }

    const getRotationAngle = (transform: string): number => {
      const values = transform.match(/matrix\((.+)\)/)
      if (values) {
        const matrix = values[1].split(',').map(parseFloat)
        const a = matrix[0]
        const b = matrix[1]
        const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
        return angle >= 0 ? angle : angle + 360 // 确保角度为正数
      }
      return 0
    }

    watch(
      () => props.setPlay,
      async (newVal) => {
        await nextTick()
        if (record.value && cover.value) {
          applyAnimation(record.value, newVal)
          applyAnimation(cover.value, newVal)
        }
        else {
          saveCurrentRotation(record.value, cover.value)
          applyAnimation(record.value, false)
          applyAnimation(cover.value, false)
        }
      }
    )

    return {
      record,
      cover
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vinyl {
  @include flex;
  width: 100vw;
  height: 50vh;
}

.vinyl-container {
  padding: 16px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 
    inset 0 1px 2px rgba(0, 0, 0, 0.4),
    0 -1px 1px white,
    0 1px 0 white;
  border-bottom: 1px solid #ddd;
}

.vinyl-record {
  @include flex;
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  background: 
    linear-gradient(30deg, transparent 40%, rgba($color: #333, $alpha: 0.8) 40%) no-repeat 100% 0,
    linear-gradient(60deg, rgba($color: #333, $alpha: 0.8) 60%, transparent 40%) no-repeat 0 100%,
    repeating-radial-gradient(#333, #333 8px, #ccc 9px, #333 10px);
  background-size: 50% 100%, 100% 50%, 100%;
  animation: vinyl-moving 5s ease-in-out infinite;
  animation-play-state: paused;
}

.vinyl-record-cover {
  @include flex;
  width: calc(80vw - 60%);
  height: calc(80vw - 60%);
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid black;
  background: url('@/assets/images/test/music_001.jpg') no-repeat center;
  animation: cover-rotate 30s linear infinite;
  animation-play-state: paused;
}

.vinyl-record-hole {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
}

@keyframes cover-rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}

@keyframes vinyl-moving {
  0% {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(5deg)
  }
  100% {
    transform: rotate(0deg)
  }
}
</style>