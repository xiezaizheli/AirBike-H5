/**
 * Created by admin on 2017/3/15.
 */
var refundOption = {
  num:1,
  binds: function () {//所有事件的绑定
    //1. canvas绘图
    this.buildCanvas();
    //2. 底部的时间结算和金额结算的切换
    $('.toggle').on('click','p',function(){
      var index = $(this).index();
      console.log(index);
      $(this).addClass('active').siblings().removeClass('active');
      $('.box>ul').eq(index).show().siblings('ul').hide();
      if(index ==0){
        $('.triangle-up').css('left','1.725rem');
      }else{
        $('.triangle-up').css('left','5.475rem');
      }

    })
  },
  buildCanvas: function () {
    //获得屏幕的大小
    var clientWidth = document.documentElement.clientWidth;
    //获得画布
    var canvas = document.getElementById('refund');
    var cw = Math.floor(clientWidth * 260 / 750);
    canvas.setAttribute('width', cw);//画布的宽
    canvas.setAttribute('height', cw);//画布的高
    //外部的元素和画布的高宽一致
    $('.canvas-container').css({
      'width': cw,
      'height': cw
    });
    //外部相对定位的元素
    var right = $('.tip').width();
    $('.tip').css('right', -right);
    //配置参数

    //内圆的半径
    var innerRadius = Math.floor(clientWidth * 110 / 750);
    //内圆的颜色
    var innerColor = '#D8E3ED';
    //内圆的线宽
    var innerLineW = Math.floor(clientWidth * 25 / 750);
    //外圆的半径
    var outerRadius = Math.floor(clientWidth * 110 / 750);
    //外圆的颜色
    var outerColor = '#1495F0';
    var zheColor = '#9BD511';
    //外圆的线宽
    var outerLineW = Math.floor(clientWidth * 35 / 750);
    //价格文本字体
    var priceFs = Math.floor((clientWidth * 110 / 750) * 0.45) + 'px';
    var p = parseInt(priceFs);

    //剩余文本字体
    var sheng = Math.floor((clientWidth * 110 / 750) * 0.28) + 'px';
    var s = parseInt(sheng);

    var ctx = canvas.getContext("2d");

    //防止手机端模糊，产生锯齿
    var width = canvas.width, height = canvas.height;
    if (window.devicePixelRatio) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * window.devicePixelRatio;
      canvas.width = width * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    var deg = 0;

    //绘制路径
    var timer = setInterval(function () {
      //绘制之前要清除所有内容
      ctx.clearRect(0, 0, cw, cw);
      if(this.num ==0){
        zero();
        $('.tip').html('全额折旧');
        var txt = "0元";
      }else if(this.num==33){
        residue();
        depre();
        if(deg >=80){
          clearInterval(timer);
        }
        var txt = "180元";
        $('.tip').html('试用期');
      }else{
        zero();
        residue();
        if (deg >= 360) {
          clearInterval(timer);
        }
        var txt = Math.floor(deg / 360 * 100) + "元";
        $('.tip').html('折旧'+Math.floor(deg / 360 * 100));
      }
        ctx.textBaseline = "top";
        ctx.font = priceFs + " Microsoft Yahei";
        ctx.fillStyle = '#3F3F3F';
        var w = ctx.measureText(txt).width;
        ctx.fillText(txt, cw / 2 - w / 2, cw / 2 - p);
      otherSize();
    }.bind(this), 40);

    //1.绘制外边的背景椭圆
    function zero(){
      ctx.beginPath();
      ctx.arc(cw / 2, cw / 2, innerRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = innerColor;
      ctx.lineWidth = innerLineW;
      ctx.stroke();
    }

    //2.绘制剩余的金额
    function residue(){
      ctx.beginPath();
      deg += 2;
      ctx.arc(cw / 2, cw / 2, outerRadius, -Math.PI / 2, deg * Math.PI / 180 - Math.PI / 2, true);
      ctx.strokeStyle = outerColor;
      ctx.lineWidth = outerLineW;
      ctx.stroke();
      if (deg >= 120) {
        clearInterval(timer);
      }
    }

    //3.绘制已折旧的部分
    function depre(){
      ctx.beginPath();
      deg += 2;
      ctx.arc(cw / 2, cw / 2, outerRadius, -Math.PI / 2, deg * Math.PI / 180 - Math.PI / 2, false);
      ctx.strokeStyle = zheColor;
      ctx.lineWidth = outerLineW;
      ctx.stroke();
    }

    //5.绘制剩余字体
    function otherSize() {
      var txt1 = '剩余';
      ctx.font = sheng + " Microsoft Yahei";
      ctx.fillStyle = '#666';
      var w1 = ctx.measureText(txt1).width;
      ctx.fillText(txt1, cw / 2 - w1 / 2, cw / 2 + s / 2);
    }
  }
};

refundOption.binds();
