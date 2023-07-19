"use strict";

Zepto(function () {
  $.get("../json/data.json", '', function (res) {
    console.log("商家", res);
    var seller = res.seller;
    $("<p class=\"name\">".concat(seller.name, "</p>")).appendTo('.kop1'); // 获取星星数组

    var str = '';
    var starArr = getStarArr(seller.score);
    starArr.forEach(function (item) {
      str += "<img src=\"../img/star24_".concat(item, "@3x.png\" alt=\"\">");
    }); // for (var i = 0; i < starArr.length; i++) {
    // 	str += `<img src="../img/star24_${item}@3x.png" alt="">`
    // }

    $("<p class=\"p1\"><span class=\"buy\">".concat(str, "</span><span>(661)</span><span>\u6708\u552E690\u5355</span></p>")).appendTo('.kop1');
    console.log("商家2", seller);
    $("<p class=\"mko\"><span>".concat(seller.ratingCount, "</span>\u5143</p>")).appendTo('.vbh1');
    $("<p class=\"mko\"><span>".concat(seller.deliveryPrice, "</span>\u5143</p>")).appendTo('.vbh2');
    $("<p class=\"mko\"><span>".concat(seller.deliveryTime, "</span>\u5206\u949F</p>")).appendTo('.vbh3');
    $("<p>".concat(seller.bulletin, "</p>")).appendTo('.bit');
    var supports = seller.supports;
    supports.forEach(function (item) {
      $("<li class=\"supports_item\">\n\t\t\t\t<img src=\"img/decrease_2@2x.png\" alt=\"\">\n\t\t\t\t<span>".concat(item.description, "</span>\n\t\t\t</li>")).appendTo('.supports_list');
    });
    var infos = seller.infos;
    infos.forEach(function (item) {
      $("<li class=\"tyuo_item\">".concat(item, "</li>")).appendTo('.tyuo_list');
    });
    var pics = seller.pics;
    pics.forEach(function (item) {
      $("<img src=\"".concat(item, "\" alt=\"\">")).appendTo('.kosd');
    });
  });
});