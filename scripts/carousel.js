function Carousel (option) {
  this.el = option.el;
  this.imgURLs = option.imgURLs;
  this.hasBtns = option.hasBtns || true;
  this.hasArrows = option.hasArrows || true;
  this.interval = option.interval || 5000;
  this.timeId = null;
  this.currentIndex = 0;
  this.container = document.querySelector(this.el);
  this.init();
}

Carousel.prototype = {
  init: function () {
    var that = this;
    this.imgList = this.createImgList();
    this.container.appendChild(this.imgList);
    if (this.hasArrows) {
      this.arrowList = this.createArrowList();
      this.container.appendChild(this.arrowList);
    }
    if (this.hasBtns) {
      this.btnList = this.createBtnList();
      this.container.appendChild(this.btnList);
    }
    window.addEventListener('load', function () {
      that.initImgInfo();
      that.initArrowList();
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
  createArrowList: function () {
    var arrowListDiv = document.createElement('div');
    arrowListDiv.className = 'carousel-arrow-list';
    arrowListDiv.innerHTML = '<div class="carousel-arrow-left"><</div>'
                            + '<div class="carousel-arrow-right">></div>';
    return arrowListDiv;
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
  initArrowList: function () {
    var that = this;
    this.arrowList.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        return;
      }
      clearTimeout(that.timeId);
      var nextIndex = 0;
      if (e.target.className === 'carousel-arrow-left') {
        nextIndex = (that.currentIndex - 1) % that.imgNumber;
        if (nextIndex < 0) {
          nextIndex += that.imgNumber;
        }
      } else {
        nextIndex = (that.currentIndex + 1) % that.imgNumber;
      }
      that.move(nextIndex);
    }, false);
  },
  initBtnList: function () {
    this.btns = this.btnList.querySelectorAll('div');
    this.btns[0].className = 'active-btn';
    var that = this;
    this.btnList.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        return;
      }
      clearTimeout(that.timeId);
      that.move(e.target.dataset.index);
    }, false);
  },
  initContainer: function () {
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.width = this.imgWidth + 'px';
    this.container.style.height = this.imgHeight + 'px';
  },
  move: function (currentIndex) {
    this.btns.forEach(function (btn, btnIndex) {
      if (btnIndex === Number(currentIndex)) {
        btn.classList.add('active-btn');
      } else {
        btn.classList.remove('active-btn');
      }
    });
    this.imgList.style.marginLeft = - (this.imgWidth * currentIndex) + 'px';
    this.currentIndex = currentIndex;
    var nextIndex = (currentIndex + 1) % this.imgNumber;
    this.timeId = setTimeout(this.move.bind(this, nextIndex), this.interval);
  }
};