<template>
  <div>
    <!-- <div>{{ vector.x }}</div>
    <div>{{ vector.y }}</div>
    <div>{{ vector.z }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import request from '@/utils/request'

export default defineComponent({
  name: 'MotionDetector',
  setup() {
    const maxlength = 151
    const vector = ref({
      x: 0,
      y: 0,
      z: 0
    })
    const accelerationData = ref({
      x: [],
      y: [],
      z: [],
      l: 0
    })

    const result = ref(null)

    const motionDetect = () => {
      window.addEventListener("devicemotion", async (event) => {
        // if (event.acceleration) {
        //   vector.value.x = event.acceleration.x
        //   vector.value.y = event.acceleration.y
        //   vector.value.z = event.acceleration.z

        //   accelerationData.value.x.push(event.acceleration.x)
        //   accelerationData.value.y.push(event.acceleration.y)
        //   accelerationData.value.z.push(event.acceleration.z)
        //   accelerationData.value.l++
        // }

        // if (accelerationData.value.l === maxlength) {
        //   alert('发送请求了')
          
        //   const response = await request.post('/predict', [
        //     ...accelerationData.value.x,
        //     ...accelerationData.value.y,
        //     ...accelerationData.value.z
        //   ])

        //   result.value = JSON.stringify(response)
        //   alert(result.value)

        //   accelerationData.value = {
        //     x: [],
        //     y: [],
        //     z: [],
        //     l: 0
        //   }
        // }
      })
    }
    
    onMounted(() => {
      motionDetect()
    })

    onUnmounted(() => {
      window.removeEventListener("devicemotion", motionDetect)
    })

    return {
      result,
      vector
    }
  }
})
</script>

<style scoped>
</style>