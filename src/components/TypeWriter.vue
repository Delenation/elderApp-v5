<template>
  <div>
    {{ displayedText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, watch } from 'vue'

export default defineComponent({
  name: 'TypeWriter',
  props: {
    message: {
      type: String,
      default: ''
    },
    shown: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const currIndex = ref(0)
    const displayedText = ref('') // 正在显示的文字
    let timer: NodeJS.Timeout | null = null

    const getStream = () => {
      if (timer) {
        clearInterval(timer) // 防止上一个未完成的定时器影响
        timer = null
      }
      displayedText.value = '' // 每次启动前重置显示文本
      currIndex.value = 0
      timer = setInterval(displayText, 50) // 每50毫秒展示一个字
    }

    const displayText = () => {
      const text = props.message
      displayedText.value += text[currIndex.value]
      currIndex.value++
      if (currIndex.value == text.length) {
        clearInterval(timer!)
        timer = null
      }
    }

    watch(
      () => props.message,
      (newVal, oldVal) => {
        if (!props.shown) {
          getStream()
        }
        else {
          displayedText.value = props.message // 由于immediate的设置，重新加载组件的时候内容会被设置为空
        }
      },
      { immediate: true }
    )

    return {
      displayedText,
      getStream
    }
  }
})


</script>

<style scoped>
</style>
