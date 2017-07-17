var pageIndex = 1;
var checksum;//声明一个变量接收checksum
//判断安卓与ios 并传递参数
judge_token_page();
function getchecksum(checksum) {
  checksum = checksum//得到安卓和ios加密后的参数
}
function getmoney() {
  checksum = hex_md5(get_url_token() + pageIndex + "AIRBIKESALT");//测试时用的  后期删除
  $.ajax({
    type: "post",
    url: "https://airbike.wrteach.com/v1/users/rechargelist",
    data: {
      checksum: checksum,
      token: get_url_token(),
      page: pageIndex
    },
    dataType: "json",
    success: function (e) {
      console.log(e)
      if (e.status == -2) {
        $(".no-account").show().siblings().hide();
      }
      if(e.status ==1){
        $(".no-account").hide().siblings().show();

        var el = e.result.list;
        $.each(el, function (i, p) {
          p.type = p.type == 1 ? "押金" : "普通充值";
          p.payment_type = p.payment_type == "alipay" ? "支付宝支付" : "微信支付";
          var li = "<li><h1>" + p.type + "<span class='money'>" + p.amount + "元</span></h1><p>" + p.created + "<span>" + p.payment_type + "</span></p></li>";
          $(".score-list").append(li);
          if (parseInt(p.amount) < 0) {
            $(".money").addClass('c-EC6A30');
          } else {
            $(".money").addClass("c-1495F0");
          }
        });
      }
    }
  });
}
getmoney();
//滑动加载
function load() {
  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() + 10 >= $(document).height()) {
      pageIndex++;//加载其他的页面
      judge_token_page();//重新传递参数
      function getchecksum(checksum) {//重新得到checksum
        checksum = checksum
      }
      getmoney();
    }
  });
}
load();
