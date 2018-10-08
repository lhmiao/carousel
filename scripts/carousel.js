function Carousel (option) {
  this.el = option.el;
  this.imgURLs = option.imgURLs;
  this.hasBtns = option.hasBtns || true;
  this.isMoveing = false;
  this.timeId = null;
  this.interval = option.interval || 5000;
  this.container = document.querySelector(this.el);
  this.init();
}

Carousel.prototype = {
  init: function () {
    var that = this;
    this.imgList = this.createImgList();
    // this.imgList.addEventListener('transitionend', function (e) {
    //   that.isMoveing = false;
    // }, false);
    if(this.hasBtns) {
      this.btnList = this.createBtnList();
    }
    this.container.appendChild(this.imgList);
    this.container.appendChild(this.btnList);
    window.addEventListener('load', function () {
      that.initImgInfo();
      that.initBtnList();
      that.initContainer();
      that.move(0);
    }, false);
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
      return pre + '<div ' + 'data-index="' + curIndex + '"></div>';
    }, '');
    return btnListDiv;
  },
  initImgInfo: function () {
    this.imgNumber = this.imgList.querySelectorAll('img').length;
    var img = this.imgList.querySelectorAll('img')[0];
    this.imgWidth = img.clientWidth;
    this.imgHeight= img.clientHeight;
  },
  initBtnList: function () {
    var btns = this.btnList.querySelectorAll('div');
    btns[0].className = 'active-btn';
    var that = this;
    this.btnList.addEventListener('click', function (e) {
      clearTimeout(that.timeId);
      that.move(e.target.dataset.index);
    })
  },
  initContainer: function () {
    this.container.style.overflow = 'hidden';
    this.container.style.width = this.imgWidth + 'px';
    this.container.style.height = this.imgHeight + 'px';
  },
  move: function (nextIndex) {
    // if (this.isMoveing) {
    //   return;
    // }
    this.imgList.style.marginLeft = - (this.imgWidth * nextIndex) + 'px';
    var that = this;
    this.timeId = setTimeout(this.move.bind(this, (++nextIndex) % this.imgNumber), this.interval);
  }
};