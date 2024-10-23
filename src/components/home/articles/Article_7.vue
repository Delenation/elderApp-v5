<template>
  <div class="news-container">
    <h2 class="news-title">心血管越健康 大脑越年轻</h2>
    <div class="news-date">发布日期: 2024年08月20日08:45 </div>
    <div class="news-content">
      <p>既往研究表明，心血管健康状况与认知能力下降和痴呆症有关。日前，天津医科大学公共卫生学院徐卫历等发表的一项研究发现，心血管健康指标（生命八要素）评分较低的人，大脑年龄（脑龄）较大，脑龄差（预测脑龄与实际年龄的差值）也更大，即便中年人也如此。</p>
      <p>该研究请所有受试者在加入该项目大约9年后接受大脑磁共振检查，并评估他们的大脑结构和功能，采用6种神经成像模式的1079项指标来模拟脑龄。接着，研究者在4355名健康参与者中建模，用于计算整个人群的脑龄和脑龄差。</p>
      <p>分析显示，评分较高的人，脑龄较小，且脑龄差负值更大（即脑龄比实际年龄更小）。</p>
      <p>与心血管健康评分高的人相比，心血管健康评分低、中等的人脑龄较大，脑龄差增加。</p>
      <p>无论在中年人还是老年人中，心血管健康评分低和脑龄、脑龄差较大之间的关联均显著且相似。该研究结果说明，优化心血管健康状况，可以促进大脑健康。</p>
      <p>生命八要素包括：不吸烟，不超重或肥胖，规律运动，健康饮食，血压、血脂和血糖正常，睡眠健康。</p>
    </div>
    <div class="news-footer">
      <p>—— 来源: 北京青年报</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Article_7'
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