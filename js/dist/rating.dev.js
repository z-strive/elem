"use strict";

Zepto(function () {
  //声明变量用来保存当前需要渲染哪种类型的数据
  var currentData = []; //评价

  $.get("../json/data.json", function (res) {
    //console.log(res);
    var ratings = res.ratings; //初始化默认渲染全部数据

    currentData = ratings; //获取评价数据总数

    var all = ratings.length;
    $('.all span').text(all); //获取满意数据

    var agree = ratings.filter(function (item) {
      return item.rateType == 0; //0满意 1不满意
    });
    $('.agree span').text(agree.length); //获取不满意数据

    var disagree = ratings.filter(function (item) {
      return item.rateType == 1; //1不满意
    });
    $('.disagree span').text(disagree.length); //选项卡切换

    $('.tab_list li').tap(function () {
      $(this).addClass('active').siblings().removeClass('active');
      var index = $(this).index();

      if (index == 0) {
        loadData(ratings);
        currentData = ratings;
      } else if (index == 1) {
        loadData(agree);
        currentData = agree;
      } else {
        loadData(disagree);
        currentData = disagree;
      }
    }); //只看有内容的评价

    $('.select input').click(function () {
      loadData(currentData);
    }); //默认加载全部数据

    loadData(ratings);

    function loadData(data) {
      //先清空原有数据
      $('.ratings_list').empty(); //是否选中了只看有内容的评价

      var isSelect = $('.select input').prop('checked');

      if (isSelect) {
        data = data.filter(function (item) {
          return item.text;
        });
      } //加载评价数据


      data.forEach(function (item) {
        //处理评分数据
        var str = '';
        var starArr = getStarArr(item.score);

        for (var i = 0; i < starArr.length; i++) {
          str += "<img src=\"../img/star24_".concat(starArr[i], "@3x.png\" alt=\"\">");
        } //处理点赞菜品数据


        var str1 = '';
        item.recommend.forEach(function (aItem) {
          str1 += "<span>".concat(aItem, "</span>");
        });
        $("<li class=\"ratings_item\">\n                    <img class=\"avatar\" src=\"".concat(item.avatar, "\" alt=\"\">\n                    <div class=\"box\">\n                        <div class=\"top\">\n                            <p class=\"name\">").concat(item.username, "</p>\n                            <p class=\"time\">").concat(dayjs(item.rateTime).format("YYYY-MM-DD HH:mm"), "</p>\n                        </div>\n                        <div class=\"stars\">").concat(str, "</div>\n                        <div class=\"content\">").concat(item.text, "</div>\n                        <div class=\"recommend_box\">\n                            <i class=\"iconfont ").concat(item.rateType == 0 ? 'icon-dianzan' : 'icon-cai', "\"></i>\n                            <div class=\"recommend\">").concat(str1, "</div>\n                        </div>\n                    </div>\n                </li>")).appendTo('.ratings_list');
      });
    }
  });
});