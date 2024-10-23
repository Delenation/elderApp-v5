<template>
  <div class="news-container">
    <h2 class="news-title">四类慢性病营养和运动指导原则</h2>
    <div class="news-date">发布日期: 2024年07月05日08:53</div>
    <div class="news-content">
      <p>为提高慢性病患者维护和促进自身健康的能力，国家卫健委近日发布4类慢性病营养和运动指导原则（2024年版），4类慢性病包括成人高血压、高血糖症、高脂血症、高尿酸血症，主要内容包括营养指导原则、运动指导原则、常见食物交换表和相关慢性病患者运动训练禁忌证等。</p>
      <p>指导原则指出，目前我国成年人高血压患病率约为27.5%，成人糖尿病患病率约为11.9%，成人高脂血症的患病率约为35.6%，高尿酸血症的总体患病率约为13.3%。不健康饮食、身体活动不足、超重和肥胖等是这4种慢性病共同的危险因素，生活方式干预，特别是营养和运动干预对这4种慢性病防治具有重要作用。</p>
      <p>在营养方面，指导原则建议这4种慢性病患者健康膳食。坚持以植物性食物为主、动物性食物适量的膳食模式。做到食物多样、三大营养素供能比例适当。其中，成人高脂血症患者建议保证碳水化合物供能占比不低于50%，不建议生酮饮食。</p>
      <p>在运动方面，指导原则建议这4种慢性病患者坚持有规律的运动。保持充足身体活动，减少久坐时间。适度量力，循序渐进。避免突然大幅度增加运动强度、时间、频率、类型。急性痛风发作后循序渐进地恢复正常活动，可采用游泳、瑜伽等运动形式。对于高尿酸血症合并多种疾病的患者，在确保所有病情都稳定的前提下，根据病情选择最低强度的运动方案。</p>
      <p>国家卫健委医疗应急司有关负责人说，各地要充分发挥各级医疗卫生机构引领带动作用，加强对相关慢性病患者营养和运动等非药物措施干预和指导，引导公众提高慢性病自我管理的健康意识，通过合理膳食和科学运动有效控制慢性病相关危险因素，不断提升群众健康水平。</p>
    </div>
    <div class="news-footer">
      <p>—— 来源: 人民网－人民日报海外版</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Article_3'
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