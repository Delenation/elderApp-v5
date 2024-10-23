<template>
  <canvas id="sphere" ref="sphereCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'Sphere',
  setup() {
    const sphereCanvas = ref<HTMLCanvasElement | null>(null);
    let animationFrameId: number;
    let intervalId: number; // 定时器ID

    const startDrawing = () => {
      const canvas = sphereCanvas.value;
      const ctx = canvas.getContext('2d');
      const width = canvas.width = 120;
      const height = canvas.height = 120;
      const radius = width / 2; // 半径
      const centerX = width / 2; // 圆心X
      const centerY = height / 2; // 圆心Y
      const waveHeight = height / 4; // 波浪的高度 (从圆心往下)
      const waveLength = 60; // 波长
      const waveAmplitude = 15; // 波浪的振幅
      const waveSpeed = 1.6; // 波浪移动的速度
      let waveOffset = 0; // 波浪偏移量

      let lastTime = 0;
      const fps = 30; // 目标帧率
      const interval = 1000 / fps;

      const drawWave = (timestamp) => {
        const deltaTime = timestamp - lastTime;

        if (deltaTime >= interval) {
          lastTime = timestamp;
          ctx.clearRect(0, 0, width, height);
          
          // 绘制球形轮廓
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip(); // 使用clip确保内容在圆形区域内
          ctx.closePath();
          
          // 绘制水面以下的渐变色
          const gradient = ctx.createLinearGradient(0, centerY, 0, centerY + waveHeight);
          gradient.addColorStop(0, 'rgba(0, 200, 255, 0.7)');
          gradient.addColorStop(1, 'rgba(0, 150, 255, 0.9)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, centerY, width, height); // 在水面以下填充渐变
          
          // 绘制波浪线
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          
          for (let x = 0; x < width; x++) {
            const y = waveAmplitude * Math.sin((x + waveOffset) / waveLength) + centerY;
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(width, height); // 连接到右下角
          ctx.lineTo(0, height); // 连接到左下角
          ctx.closePath();
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          waveOffset += waveSpeed; // 使波浪产生动态移动
        }
          
        animationFrameId = requestAnimationFrame(drawWave); // 循环动画
      };
        
      requestAnimationFrame(drawWave);
    };

    onMounted(() => {
      startDrawing();

      // 每隔五秒重新开始绘制
      intervalId = window.setInterval(() => {
        cancelAnimationFrame(animationFrameId);
        const canvas = sphereCanvas.value;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
        startDrawing(); // 重新开始绘制
      }, 8000);
    });

    onBeforeUnmount(() => {
      // 取消动画帧和定时器，防止内存泄漏
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    });

    return {
      sphereCanvas
    };
  }
});
</script>

<style scoped>
#sphere {
  width: 100%;
  height: auto;
  display: block;
  background-color: rgba(135, 206, 235, 0.3); /* 设置背景色模拟水面 */
  border-radius: 50%; /* 让 canvas 本身也圆形 */
}
</style>
