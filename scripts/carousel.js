function Carousel (option) {
  this.el = option.el;
  this.imgURLs = option.imgURLs;
  this.hasBtns = option.hasBtns || true;
  this.isMoveing = false;
  this.container = document.querySelector(this.el);
  this.init();
}

Carousel.prototype = {
  init: function () {
    this.imgList = this.createImgList();
    if(this.hasBtns) {
      this.btnList = this.createBtnList();
    }
    this.container.appendChild(this,imgList);
    this.container.appendChild(this.btnList);
    var that = this;
    setTimeout(function () {
      that.initImgInfo();
      that.timeId = that.move(); 
    }, 0);
  },
  createImgList: function () {
    var imgListDiv = document.createElement('div');
    imgListDiv.classList.add('carousel-img-list');
    imgListDiv.classList.add('add-transition');
    imgListDiv.innerHTML = this.imgURLs.reduce(function (pre, cur) {
      return pre + '<img src="' + cur + '">';
    }, '');
    return imgListDiv;
  },
  createBtnList: function () {
    var btnListDiv = document.createElement('div');
    btnListDiv.className = 'carousel-btn-list';
    btnListDiv.innerHTML = this.imgURLs.reduce(function (pre, cur, curIndex) {
      if (curIndex === 0) {
        return pre + '<div class="active-btn"></div>';
      } else {
        return pre + '<div></div>';
      }
    }, '');
    return btnListDiv;
  }
};