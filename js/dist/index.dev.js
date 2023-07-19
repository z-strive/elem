"use strict";

Zepto(function () {
  // 图片基础路径
  var imgUrl = "https://fuss10.elemecdn.com/"; // 根据定位获取城市

  window.navigator.geolocation.getCurrentPosition(function (pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude; // 请求商铺列表信息

    getData("shopping/restaurants", {
      latitude: latitude,
      longitude: longitude
    }, function (res) {
      console.log(res);
      res.forEach(function (item) {
        $("<li class=\"store_item\">\n                <img src=\"https://elm.cangdu.org/img/".concat(item.image_path, "\" alt=\"\">\n                <div class= \"info\" >\n                    <div class=\"store_name\">").concat(item.name, "</div>\n                    <div class=\"box\">\n                        <p>\n                            <span class=\"rating\">").concat(item.rating, "\u5206</span>\n                            <span class=\"sales\">\u6708\u552E+").concat(item.recent_order_num, "</span>\n                        </p>\n                        <p>\n                            <span class=\"time\">").concat(item.order_lead_time, "</span>\n                            <span class=\"distance\">").concat(item.distance, "</span>\n                        </p>\n                    </div>\n                    <div class=\"cost\">\n                        <span>\u8D77\u9001\uFFE5").concat(item.float_minimum_order_amount, "</span>\n                        <p>\u514D\u914D\u9001\u8D39<span>").concat(item.float_delivery_fee, "</span></p>\n                    </div>\n                    <div class=\"recommend\">").concat(item.description, "</div>\n                    <div class=\"full\">").concat(item.activities[0] ? item.activities[0].description : "", "</div>\n                </div>\n            </li > ")).appendTo(".store_list");
      });
    });
  }); // 请求分类数据

  getData("v2/index_entry", "", function (res) {
    console.log(res);
    res.forEach(function (item) {
      $("<li li class= \"cate_item\" >\n            <img src=\"".concat(imgUrl).concat(item.image_url, "\" alt=\"\">\n                <p class=\"name\">").concat(item.title, "</p>\n            </li>")).appendTo(".category");
    });
  });
});