# carousel
轮播图
### 使用方法
 - 引入carousel.css和carousel.js文件
 - 用构造函数Carousel(option)创建一个Carousel实例，参数为一个配置对象，其属性如下
   - el: String，要生成轮播图的容器元素（**必要**）
   - imgURLs: Array，图片路径数组，路径为String（**必要**）
   - hasBtns: Boolean，是否显示圆形按钮，默认为true
   - hasArrows: Boolean，是否显示左右移动箭头，默认为true
   - interval: Number，移动间隔，单位为毫秒，默认为5000
