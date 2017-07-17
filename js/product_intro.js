/**
 * Created by admin on 2017/3/22.
 */
var productIntro = {
  binds: function () {
    //顶部菜单切换功能
    $('.h-tab').on('click', 'li', function () {
      var index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      $('.main').children().eq(index).show().siblings().hide();
      $(window).scrollTop(0);
    });
    //点击回到顶部事件
    this.scroll2top($('.return-top'));
  },
  scroll2top: function (ele) {
    //1.首先将ele隐藏
    ele.hide();
    //2.获得当前位置距离滚动条顶部的偏移量,大于则隐入，小于则隐出。
    $(window).on("scroll", function () {
      var scrollTop = $(this).scrollTop();
      scrollTop > 800 ? ele.fadeIn() : ele.fadeOut();
    });
    //3.单击的时候回到顶部
    ele.on("click", function (e) {
      e.preventDefault();
      return $("body, html").animate({scrollTop: 0}, 800);
    });
  }
};

productIntro.binds();
