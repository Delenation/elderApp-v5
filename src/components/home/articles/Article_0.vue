<template>
  <div class="news-container">
    <h2 class="news-title">总是口干或许跟这些药有关</h2>
    <div class="news-date">发布日期: 2024年10月22日8:42</div>
    <div class="news-content">
      <p>  药物是口干症最常见的原因。总是口干难耐，甚至出现口腔灼热、味觉减退等症状，那就快来自查一下，是不是正在服用以下药物。</p>
      <p>  口干症不仅仅是口干</p>
      <p>如果口腔中唾液分泌量减少或消耗量增加，则会出现口干的情况。因唾液分泌减少或成分变化引起的口腔干燥状态或感觉，是常见的口腔自觉症状。它是一种主观感觉的症状，并非一种独立性疾病。</p>
      <p>口干症通常会出现口腔干燥、口腔灼热或疼痛、味觉减退或改变等症状。与此同时，有些患者吞咽时常常需要喝水，且吞咽干硬食物困难。还有些患者会出现唾液变黏稠、对酸性或辛辣食物敏感、食欲不振和体重减轻等情况。</p>
      <p>超六成口干与药物有关</p>
      <!-- <div class="image-container">
          <img src="https://th.bing.com/th/id/OIP.zDr1W6dwanTz4BNfoIzQmgHaE7?w=297&h=198&c=7&r=0&o=5&pid=1.7" alt="图片1">
      </div> -->
      <p>口干症的病因复杂多样。其中，药物是口干症最常见的病因。据报道，药物引起的口干燥发病率为10%或更高，64%的口干症与药物有关。如果您出现口干的情况，快来自查是不是正在服用以下药物。</p>
      <p>抗抑郁和抗精神病药物 西酞普兰、氟哌啶醇、苯乙肼，它们会发生阿托品样作用，从而造成口干症状。</p>
      <p>镇静和抗焦虑药物 阿普唑仑、地西泮、三唑仑。</p>
      <p>抗高血压药 可乐定、甲基多巴、利血平、胍乙啶，还有卡托普利、赖诺普利、依那普利等抗高血压药都能造成明显口干症状。它们通过抑制唾液腺的交感神经传递，干扰唾液腺分泌。</p>
      <p>抗胆碱药 如阿托品、东莨菪碱、山莨菪碱等药物能使唾液分泌明显减少。</p>
      <p>α受体和β受体阻滞剂 酚妥拉明和普萘洛尔分别会选择性阻断α受体和β受体，干扰唾液腺分泌。</p>
      <p>肌松药 替扎尼定。</p>
      <!-- <div class="image-container">
          <img src="https://th.bing.com/th/id/OIP.zDr1W6dwanTz4BNfoIzQmgHaE7?w=297&h=198&c=7&r=0&o=5&pid=1.7" alt="图片1">
      </div> -->
      <p>镇痛药 阿片类药物和非甾体类抗炎药</p>
      <p>抗组胺药 阿司咪唑、氯雷他定、溴苯那敏。</p>
      <p>其他 大量应用烟碱、醛固酮受体拮抗剂——螺内酯、抗帕金森药——司来吉兰，以及伪麻黄碱等都能抑制唾液分泌，从而导致口干。</p>
      <!-- <div class="image-container">
          <img src="https://th.bing.com/th/id/OIP.zDr1W6dwanTz4BNfoIzQmgHaE7?w=297&h=198&c=7&r=0&o=5&pid=1.7" alt="图片1">
      </div> -->
      <p>试试这六招缓解口干 ：</p>
      <p>避免摄入咖啡因、烟草、酒精，以及干燥或难以咀嚼的食物。</p>
      <p>适当饮水，但应少量多次的啜饮，不应大量无节制地暴饮。</p>
      <p>确保口腔环境卫生，每3个月进行一次口腔清洁，对于佩戴义齿的患者应保持义齿清洁，不应佩戴过夜。</p>
      <p>适当增加环境湿度，可在室内应用空气加湿器。</p>
      <p>可以尝试通过咀嚼无糖口香糖、木糖醇，口服含片或酸味和苦味食物刺激味觉来刺激唾液腺分泌从而改善症状。</p>
      <p>此外，还可尝试使用人工唾液进行唾液替代治疗，但是其作用不可靠、作用持续时间有限、味道难闻且成本很高。</p>
      <p>若上述方法仍不能有效改善症状，应及时就医，采用相关药物治疗。</p>
    </div>
    <div class="news-footer">
      <p>—— 来源: 北京口腔医院</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Article_0'
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