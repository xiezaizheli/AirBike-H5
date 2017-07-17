//1. 从url中得到参数只有一个的时候
function get_url_token() {
  var str = window.location.href;
  var num = str.indexOf("?")
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  var token = str.substr(str.indexOf("=") + 1);
  return token
}
//2. 从url中得到参数有两个的时候
function get_url_token_id() {
  var token, id;
  var arr_more = [];
  var str = location.href; //取得整个地址栏
  var num = str.indexOf("?");
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  var arr = str.split("&"); //各个参数放到数组里
  num = arr[0].indexOf("=");
  token = arr[0].substr(num + 1);
  num = arr[1].indexOf("=");
  id = arr[1].substr(num + 1);
  arr_more.push(token);
  arr_more.push(id);
  return arr_more;
}
//3. 判断安卓与ios 并传递参数 token page
function judge_token_page() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    window.airbike.postData(get_url_token() + pageIndex)
  } else if (isIOS) {
    window.location = "bridge://airbike?token=" + get_url_token() + pageIndex
  }
}
//4. 判断安卓与ios 并传递参数 token
function judge_token() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    window.airbike.postData(get_url_token())
  } else if (isIOS) {
    window.location = "bridge://airbike?token=" + get_url_token()
  }
}
//5. 判断安卓与ios 并传递参数 token id
function judge_token_id() {
  //判断安卓与ios
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //传递参数给安卓
    window.airbike.postData(get_url_token_id()[0] + get_url_token_id()[1])
  } else if (isIOS) {
    //传递参数给ios
    window.location = "bridge://airbike?token=" + get_url_token_id()[0] + get_url_token_id()[1]
  }
}
           