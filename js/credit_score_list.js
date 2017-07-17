var pageIndex = 1, checksum;
//先传递参数
judge_token_page();

function getchecksum(checksum) {
  checksum = checksum  //安卓和ios加密后调用函数返回参数
}
checksum = hex_md5(get_url_token() + pageIndex + "AIRBIKESALT");//测试时用的 后期删除
function getCredit() {
  $.ajax({
    url: "https://airbike.wrteach.com/v1/users/creditlist",
    type: "post",
    data: {
      checksum: checksum,
      page: pageIndex,
      token: get_url_token()
    },
    dataType: "json",
    success: function (e) {
      var el = e.result.list;
      for (var i = 0; i < el.length; i++) {
        var li = "<li><h1>" + el[i].relative_model_class + "<span>" + el[i].relative_amount + "</span></h1><p>" + el[i].created + "<span>信用分</span></p></li>"
        console.log($(".score-list"))
        $(".score-list").append(li);
      }
    }
  })
}

getCredit();
//滑动加载更多
$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() + 10 >= $(document).height()) {
    $(".load").css("display", "block");
    pageIndex++;
    judge_token_page();
    function getchecksum(checksum) {
      checksum = checksum
    };
    checksum = hex_md5(get_url_token() + pageIndex + "AIRBIKESALT");
    getCredit();

  }
});
