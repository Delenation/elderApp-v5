<template>
  <div 
    ref="draggableBall" 
    class="draggable" 
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <ion-button class="ion-no-padding" shape="round" color="light" style="width: 60px; height: 60px">
      <img src="../assets/images/assistant.png" alt="" style="width: 60px; height: 60px">
    </ion-button>
  </div>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue'
import { defineComponent, onMounted, ref } from 'vue'

interface Position {
  x: number
  y: number
}

export default defineComponent({
  name: 'FloatBall',
  components: {
    IonButton
  },
  setup() {
    const draggableBall = ref<HTMLElement | null>(null)
    const pointerPosition = ref<Position | null>(null)
    const currentPosition = ref<Position | null>(null)

    const onTouchStart = (event) => {
      pointerPosition.value = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    }

    const onTouchMove = (event) => {
      event.preventDefault()

      const draggable = draggableBall.value
      const deltaX = event.touches[0].clientX - pointerPosition.value.x
      const deltaY = event.touches[0].clientY - pointerPosition.value.y
      
      let newLeft = currentPosition.value.x + deltaX
      let newTop = currentPosition.value.y + deltaY

      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const boxWidth = draggable.offsetWidth
      const boxHeight = draggable.offsetHeight

      if (newLeft < 0) {
        newLeft = 0
      } else if (newLeft > screenWidth - boxWidth) {
        newLeft = screenWidth - boxWidth
      }

      if (newTop < 0) {
        newTop = 0
      } else if (newTop > screenHeight - boxHeight) {
        newTop = screenHeight - boxHeight
      }

      draggable!.style.left = `${newLeft}px`
      draggable!.style.top = `${newTop}px`
      draggable!.style.bottom = 'auto'
      draggable!.style.right = 'auto'
    }

    const onTouchEnd = () => {
      const rect = draggableBall.value.getBoundingClientRect()
      currentPosition.value = {
        x: rect.left,
        y: rect.top
      }
    }

    onMounted(() => {
      setTimeout(() => {
        const draggable = draggableBall.value
        if (draggable) {
          const screenWidth = window.innerWidth
          const screenHeight = window.innerHeight
          const boxWidth = draggable.offsetWidth
          const boxHeight = draggable.offsetHeight

          const initialLeft = screenWidth - boxWidth - 20
          const initialTop = screenHeight - boxHeight - 70

          draggable.style.left = `${initialLeft}px`
          draggable.style.top = `${initialTop}px`

          currentPosition.value = {
            x: initialLeft,
            y: initialTop
          }
          
          draggable.style.opacity = '1'
        }
      }, 500)
    })

    return {
      draggableBall,
      pointerPosition,
      currentPosition,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  }
})
</script>

<style scoped>
.draggable {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
  opacity: 0;
  position: fixed;
  transition: opacity 0.5s ease-in-out;
}

ion-button {
  --width: 60px;
  --height: 60px;
  --border-radius: 50%;
}
</style>
