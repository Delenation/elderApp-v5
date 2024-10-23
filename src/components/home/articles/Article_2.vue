<template>
  <div class="news-container">
    <h2 class="news-title">吃素会使人缺乏能量吗</h2>
    <div class="news-date">发布日期: 2024年10月22日8:42</div>
    <div class="news-content">
      <p>2024年巴黎奥运会组织者推出多项举措，践行绿色低碳理念，如奥运村采用可回收床、太阳能供电等。此外，提升素食供应比例也是一大亮点。巴黎奥运村主餐厅包含6个就餐区，每天提供约50道菜品，其中一半是素食。</p>
      <p>有网友提出，吃素会不会让人缺乏能量？科技日报记者就此采访了相关专家。</p>
      <p>“素食指不包含畜、禽、鱼、虾等动物性食物的膳食模式，分为全素、蛋素、奶素、蛋奶素等。”北京安贞医院临床营养科副主任营养师陈桐介绍，素食者的饮食以精白米面、杂粮、大豆及其制品、蔬菜等食物为主。</p>
      <p>不同的素食者各具特点。比如，全素食者不吃所有动物性食品，只吃五谷、蔬菜、水果、坚果和豆类等植物性食品。蛋素者或奶素者不吃肉类食物，不限制摄入鸡蛋、鹌鹑蛋等蛋类食物或奶及其制品。蛋类食物的氨基酸模式与人体氨基酸模式接近，被认为是营养价值高的优质蛋白。蛋奶素者不吃肉类，不限制摄入蛋类和奶类食物。</p>
      <p>在陈桐看来，如果科学饮食，只吃素食也能够满足大部分人体活动所需的能量。碳水化合物、脂肪、蛋白质是为人体提供能量的三大营养素。碳水化合物基本存在于谷物、水果、淀粉类蔬菜中；脂肪大都存在于肉类食物中，但坚果、牛奶、鸡蛋、谷物、豆类等也含有脂肪；蛋白质的来源比较广泛，可以来自动物，也可以取自植物。除此之外，鸡蛋、奶及其制品中蛋白质含量也很丰富，且属于优质蛋白。</p>
      <p>上海交通大学医学院公共卫生学院等单位曾联合调查分析了上海市282名素食者的蛋白质营养状况及其食物来源。调查结果显示，素食者每日总能量摄入虽略低于非素食者，但蛋白质供能比两者无明显差异。</p>
      <p>“不过，我们更提倡平衡膳食，既摄入适量的优质蛋白，如肉类、蛋类、奶类食物，又摄入蔬菜、水果、坚果等食物。”陈桐说。</p>
    </div>
    <div class="news-footer">
      <p>—— 来源: 科技日报</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Article_2'
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