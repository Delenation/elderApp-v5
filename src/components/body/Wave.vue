<template>
  <canvas id="wave" ref="waveCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'Wave',
  setup() {
    const waveCanvas = ref<HTMLCanvasElement | null>(null)
    let animationFrameId: number
    let intervalId: number

    const startDrawing = () => {
      const canvas = waveCanvas.value
      const ctx = canvas.getContext('2d')
      const width = canvas.width
      const height = canvas.height
      const speed = 0.32
      let points = [
        { x: 0, y: height * 0.5 },
        { x: 0, y: height * 0.5 },
        { x: 0, y: height * 0.65 },
        { x: 0, y: height * 0.3 },
        { x: 0, y: height * 0.85 },
        { x: 0, y: height * 0.1 },
        { x: 0, y: height * 0.5 },
        { x: 0, y: height * 0.5 },
      ]

      for (let i = 0; i < points.length; i++) {
        points[i].x += i * width / (points.length - 1)
      }

      let currentIndex = 0
      let t = 0
      let alpha = 1

      let lastTime = 0
      const fps = 30
      const interval = 1000 / fps

      const drawLine = (timestamp) => {
        const deltaTime = timestamp - lastTime

        if (deltaTime >= interval) {
          lastTime = timestamp
          
          ctx.clearRect(0, 0, width, height)
          
          ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`
          ctx.lineWidth = 2
          
          ctx.beginPath()
          ctx.moveTo(points[0].x, points[0].y)
          
          for (let i = 1; i <= currentIndex; i++) {
            ctx.lineTo(points[i].x, points[i].y)
          }
          
          if (currentIndex < points.length - 1) {
            const p0 = points[currentIndex]
            const p1 = points[currentIndex + 1]
            
            const x = p0.x + t * (p1.x - p0.x)
            const y = p0.y + t * (p1.y - p0.y)
            
            ctx.lineTo(x, y)
          }
          
          ctx.stroke()
          
          t += speed
          if (t >= 1) {
            t = 0
            currentIndex++
          }
          
          if (currentIndex >= points.length - 1) {
            currentIndex = points.length - 1
            alpha -= 0.04
            if (alpha <= 0) {
              t = 0
              alpha = 1
              currentIndex = 0
            }
          }
        }

        animationFrameId = requestAnimationFrame(drawLine)
      }

      requestAnimationFrame(drawLine)
    }

    onMounted(() => {
      startDrawing()

      // 每隔五秒重新开始绘制
      intervalId = window.setInterval(() => {
        cancelAnimationFrame(animationFrameId)
        const canvas = waveCanvas.value
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除画布
        startDrawing() // 重新开始绘制
      }, 1800)
    })

    onBeforeUnmount(() => {
      // 清理动画帧和定时器
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervalId)
    })

    return {
      waveCanvas
    }
  }
})
</script>

<style scoped>
#wave {
  width: 100%;
  height: 100px;
}
</style>
