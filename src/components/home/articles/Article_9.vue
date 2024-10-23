<template>
  <div class="news-container">
    <h2 class="news-title">米酵菌酸 餐桌上的“隐形杀手”</h2>
    <div class="news-date">发布日期: 2024年07月35日08:50</div>
    <div class="news-content">
      <p>近日，官方通报两女子吃凉皮1人死亡引发公众关注。河粉、肠粉等食物在高温潮湿的天气下易产生米酵菌酸毒素，中毒病死率超50%。米酵菌酸听起来有些陌生，但每年因它导致的中毒甚至死亡的悲剧却接连在上演。今天，北京市疾病预防控制中心营养与食品卫生所的专家，就来为大家揭开这个餐桌“隐形杀手”的真面目。</p>
      <p>这个毒素病死率高 据介绍，米酵菌酸是一种名叫唐菖蒲伯克霍尔德菌椰毒致病变种的细菌代谢产生的外毒素。这种细菌的环境适应性强且耐受干燥，因此可在外环境下长期存留。其平均病死率也在68%～89%之间，个别中毒事件病亡率甚至高达100%，是我国病死率较高的一种微生物性食物中毒。</p>
      <p>中毒者初期均有恶心、呕吐（呕吐物为胃内容物，重者为咖啡色样物）、头晕、头痛、腹痛、腹胀、嗜睡等症状。重症者可能还会出现脑、肝和肾脏病变，甚至发生多器官混合病变。</p>
      <p>这几类食品最易污染 谷类制品，包括发酵玉米面、糯玉米汤圆粉、河粉、玉米淀粉、发酵糯小米等；薯类制品，包括马铃薯粉条、甘薯淀粉、山芋淀粉等；变质食用菌，包括银耳、黑木耳等。</p>
      <p>想“避雷”你得这样做 米酵菌酸的耐热性极强，即使经过100℃的高温煮沸和高压烹饪也无法将其破坏，只有通过良好的卫生和饮食习惯才能杜绝此类食物中毒事件的发生。疾控专家介绍，生活中做到以下几点，可以很好地“避雷”：</p>
      <p>消费者要从正规渠道选用此类食品，要认真阅读产品标签，留意产品感官性状、生产日期和保质期；</p>
      <p>家庭不要擅自进行酵米面的制作；</p>
      <p>不要食用变质的米面蔬菜等；</p>
      <p>食物泡发时间要控制好，泡发时间太长，各种病毒和细菌也会持续滋生。泡发用水要干净，时间不要超过两个小时，不过夜泡发。</p>
    </div>
    <div class="news-footer">
      <p>—— 来源: 北京青年报</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Article_9'
})
</script>

<style scoped>
.news-container {
    max-width: 800px;
    /* 最大宽度 */
    margin: 0 auto;
    /* 居中显示 */
    background-color: #fff;
    /* 背景颜色 */
    border-radius: 8px;
    /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    padding: 20px;
    /* 内边距 */
}

.news-title {
    font-size: 28px;
    /* 标题字体大小 */
    color: #333;
    /* 标题颜色 */
    margin: 0;
    /* 去掉默认外边距 */
    text-align: center; /* 标题居中 */
}

.news-date {
    font-size: 14px;
    /* 日期字体大小 */
    color: #999;
    /* 日期颜色 */
    margin: 10px 0;
    /* 上下间距 */
    text-align: center;
}

.news-content {
    font-size: 16px;
    /* 正文字体大小 */
    color: #666;
    /* 正文颜色 */
    line-height: 1.6;
    /* 行高 */
    margin: 20px 0;
    /* 上下间距 */
    text-indent: 2em; /* 首行缩进 2 个字符 */
}

.news-footer {
    font-size: 14px;
    /* 结尾字体大小 */
    color: #333;
    /* 结尾颜色 */
    text-align: right;
    /* 右对齐 */
    margin-top: 30px;
    /* 上边距 */
}

.image-container {
    display: flex; /* 使用 flexbox 布局 */
    justify-content: space-between; /* 图片之间的间距 */
    margin: 20px 0; /* 上下间距 */
}

.image-container img {
    width: 32%; /* 每张图片占容器的 32% */
    border-radius: 5px; /* 图片圆角 */
}
</style>