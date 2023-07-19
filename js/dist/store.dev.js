"use strict";

Zepto(function () {
  var baseUrl = "https://elm.cangdu.org/img/"; //声明变量保存起送价

  var minPrice = 0; //获取购物车数据

  var cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  if (cartData.length) {
    $('.logo').addClass('heightlign');
  }

  getTotalNum(); //获取商家数据

  getData("shopping/restaurant/1", "", function (res) {
    //console.log("餐馆详情",res)
    $(" <div class=\"img_wrap\">\n                <img src=\"".concat(baseUrl).concat(res.image_path, "\" alt=\"\">\n            </div>\n            <div class=\"content\">\n                <img class=\"head_img\" src=\"").concat(baseUrl).concat(res.image_path, "\" alt=\"\">\n                <div class=\"store_info\">\n                    <div class=\"store_name\">\n                        <p class=\"brand\"></p>\n                        <p>").concat(res.name, "</p>\n                    </div>\n                    <div class=\"time\">").concat(res.delivery_mode.text, "/15\u5206\u949F\u9001\u8FBE</div>\n                    <div class=\"decrease\">\n                        <span class=\"support-icon icon-1 decrease\"></span>\n                        <p>\u6EE130\u51CF5</p>\n                    </div>\n                </div>\n                <div class=\"support_num\">\n                    <span>").concat(res.supports.length, "\u4E2A</span>\n                    <span>&gt;</span>\n                </div>\n        </div>")).prependTo(".header");
    $("<p class=\"title\">".concat(res.name, "</p>\n        <div class=\"star_box\">\n            \n        </div>\n        <p class=\"special_xx\">\u4F18\u60E0\u4FE1\u606F</p>\n        <ul class=\"special_list\">\n            \n        </ul>\n        <p class=\"special_xx\">\u5546\u5BB6\u516C\u544A</p>\n        <p class=\"text\">\u7CA5\u54C1\u9999\u574A\u5176\u70F9\u996A\u7CA5\u6599\u7684\u79D8\u65B9\u6E90\u4E8E\u4E2D\u56FD\u5343\u5E74\u53E4\u6CD5\uFF0C\u5728\u878D\u548C\u73B0\u4EE3\u5236\u4F5C\u5DE5\u827A\uFF0C\u7531\u4E16\u754C\u70F9\u996A\u5927\u5E08\u5C48\u6D69\u5148\u751F\u9886\u8854\u7814\u53D1\u3002\u575A\u5B88\u7EAF\u5929\u7136\u30010\u6DFB\u52A0\u7684\u826F\u5FC3\u54C1\u8D28\u6DF1\u7684\u6D88\u8D39\u8005\u9752\u7750\uFF0C\u53D1\u5C55\u81F3\u4ECA\u6210\u4E3A\u7CA5\u7C7B\u5F15\u9886\u54C1\u724C\u3002\u662F2008\u5E74\u5965\u8FD0\u4F1A\u548C2013\u5E74\u56ED\u535A\u4F1A\u6307\u5B9A\u9910\u996E\u670D\u52A1\u5546\u3002</p>\n        \n        <div class=\"close\">X</div>")).appendTo(".header_detail");
    res.supports.forEach(function (item) {
      $("<li>".concat(item.description, "</li>")).appendTo(".special_list");
    }); //获取星星数组

    var starArr = getStarArr(res.rating); //console.log("星星评分",starArr)

    starArr.forEach(function (item) {
      $("<img src=\"../img/star48_".concat(item, "@3x.png\" alt=\"\">")).appendTo(".star_box");
    }); //头部详情的切换

    $(".header").tap(function () {
      $(".header_detail").show();
    });
    $(".close").tap(function () {
      $(".header_detail").hide();
    });
  }); //初始化选项卡

  $(".content_list div").eq(0).css({
    display: 'flex'
  });
  $(".btn_list .btn").eq(0).addClass("active"); //选项卡切换

  $(".btn_list .btn").tap(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".content_list>div").eq($(this).index()).css({
      display: 'flex'
    }).siblings().hide();
  }); //请求食品列表数据

  $.get("../json/data.json", "", function (res) {
    //商家数据
    var seller = res.seller; //评价数据

    var ratings = res.ratings;
    minPrice = res.seller.minPrice; //获取最少起送价

    $("<div class=\"pay\">\uFFE5<span>".concat(minPrice, "\n        </span>\u5143\u8D77\u9001</div>")).appendTo('.footer-right'); //获取配送费

    $("<div class=\"desc\">\u53E6\u9700<span>".concat(res.seller.deliveryPrice, "\n        </span>\u5143\u914D\u9001\u8D39</div>")).appendTo('.footer-left'); //console.log("食品数据",res);

    res = res.goods; //获取左侧菜单分类数据

    var leftData = res.map(function (item) {
      return item.name;
    });
    leftData.forEach(function (item) {
      $(" <li class=\"menu\">\n                <span></span>\n                <span>".concat(item, "</span>\n            </li>")).appendTo(".shopping_left");
    }); //加载右侧数据

    res.forEach(function (item, index) {
      $("<div class=\"food_wrap\">\n                <h1 class=\"title\">".concat(item.name, "</h1>\n                <ul class=\"foods\"></ul>\n            </div>")).appendTo(".foods_list");
      item.foods.forEach(function (subItem) {
        //判断当前循环到的商品在缓存中是否存在
        var pro = cartData.find(function (a) {
          return a.id == subItem.id;
        });
        $(".foods").eq(index).append("<li class=\"food\" data-id=\"".concat(subItem.id, "\">\n                            <img src=\"").concat(subItem.image, "\" alt=\"\" class=\"img\">\n                            <div class=\"food_info\">\n                                <p class=\"food_name\">").concat(subItem.name, "</p>\n                                <p class=\"food_desc\">").concat(subItem.description, "</p>\n                                <p class=\"food_sales\">\u6708\u552E").concat(subItem.sellCount, "</p>\n                                <p>\n                                    <span class=\"price\">").concat(subItem.price, "</span>\n                                    <span class=\"old_price\"\uFFE5").concat(subItem.oldPrice, "</span>\n                                </p>\n                                <div class=\"ctrl-wrapper\">\n                                    <div class=\"ctrl-cut\" style=\"display:").concat(pro ? 'block' : 'none', "\">\n                                        <div class=\"inner icon-remove_circle_outline\"></div>\n                                    </div>\n                                    <div class=\"ctrl-count\" style=\"display:").concat(pro ? 'block' : 'none', "\">").concat(pro ? pro.count : '', "</div>\n                                    <div class=\"ctrl-add icon-add_circle\"></div>\n                                </div>\n                            </div>\n                </li>"));
      });
    }); // 初始化盒子滚动

    var wrapper = document.querySelector(".shopping_right");
    var bs = new BScroll(wrapper, {
      probeType: 3 //一直派发scroll事件

    }); // 左侧控制右侧

    $(document).on("tap", ".menu", function () {
      $(this).addClass("active").siblings().removeClass("active");
      var index = $(this).index();
      var el = $(".food_wrap")[index];
      bs.scrollToElement(el, 300);
    }); //加按钮事件
    //定义开关变量用来记录当前是否有小球在飞

    var isFlying = false;
    $(document).on("tap", ".ctrl-add", function () {
      //判断如果当前有小球在飞则不执行该函数再等等
      if (isFlying) return; //添加飞入购物车效果

      flyToCart(this);
      var oP = $(this).parents(".food").length ? $(this).parents(".food") : $(this).parents('.food-item'); //找父级身上的id

      var id = $(oP).data("id"); //找购物车中是否有改id对应的商品

      var product = cartData.find(function (item) {
        return item.id == id;
      });

      if (product) {
        //有 跟新数量
        product.count++; //更新页面该商品对应的数量

        $(oP).find(".ctrl-count").show().html(product.count); //更新购物车弹层对应的数量

        $('.food').each(function (index, item) {
          if ($(item).data('id') == id) {
            $(item).find('.ctrl-count').html(product.count);
          }
        });
      } else {
        //让当前对应的减号显示并滚动到自己的位置
        $(oP).find(".ctrl-cut").show().addClass("animate"); //让当前对应的数量初始化为1

        $(oP).find(".ctrl-count").show().html(1); //没有 新增
        //装商品名字的盒子

        var box = $(oP).find(".food_name") || $(oP).find(".food-name");
        var obj = {
          name: $(box).html(),
          count: 1,
          price: $(oP).find(".price").text(),
          id: id
        };
        cartData.push(obj);
      } //同步更新缓存


      localStorage.setItem("cartData", JSON.stringify(cartData)); //更新购物车弹层数据

      loadCartData(); //判断购物车是否有数据,添加高亮

      if (cartData.length) {
        $('.logo').addClass('heightlign');
      }

      getTotalPrice();
      getTotalNum();
    }); //减按钮事件

    $(document).on("tap", ".ctrl-cut", function () {
      var oP = $(this).parents(".food").length ? $(this).parents(".food") : $(this).parents('.food-item');
      var id = $(oP).data("id");
      var index = cartData.findIndex(function (a) {
        return a.id == id;
      });
      var product = cartData[index];
      product.count--;

      if (product.count <= 0) {
        //减号消失数量元素消失
        $(this).hide();
        $(oP).find(".ctrl-count").hide();
        $('.food').each(function (index, item) {
          if ($(item).data('id') == id) {
            $(item).find('.ctrl-count').hide();
            $(item).find('.ctrl-cut').hide();
          }
        }); //并且从购物车删除改商品

        cartData.splice(index, 1);
      } //更新页面


      $(oP).find(".ctrl-count").html(product.count); //更新购物车弹层对应的数量

      $('.food').each(function (index, item) {
        if ($(item).data('id') == id) {
          $(item).find('.ctrl-count').html(product.count);
        }
      }); //更新缓存

      localStorage.setItem("cartData", JSON.stringify(cartData)); //更新购物车弹层数据

      loadCartData(); //判断购物车是否有数据,添加高亮
      //如果length为0,取反,为true，删除类名

      if (!cartData.length) {
        $('.logo').removeClass('heightlign');
      }

      getTotalPrice();
      getTotalNum();
    }); //小球飞函数

    function flyToCart(el) {
      isFlying = true; //第一步：获取当前加号所在的位置

      var posX = $(el).offset().left;
      var posY = $(el).offset().top; //第二步：计算小球从该加号到购物车的平移距离

      var x = posX - 64;
      var y = $(window).height() - posY - 44; //第三步：编写小球的平移动画

      var str = "\n                @keyframes flyX{\n                    0%{\n                        transform:translateX(".concat(x, "px);\n                    }\n                    100%{\n                        transform:translateX(0);\n                    }\n                }\n                @keyframes flyY{\n                    0%{\n                        transform:translateY(").concat(-y, "px);\n                    }\n                    100%{\n                        transform:translateY(0);\n                    }\n                }\n            "); //第四步：将编写好的动画添加进样式中

      $(".style").html(str); //第五步：小球执行动画

      $(".ball-wrapper").show().addClass("animate"); //第六步：当动画执行完毕，去除类名准备下一次飞

      setTimeout(function () {
        $(".ball-wrapper").hide().removeClass("animate");
        isFlying = false; //更新购物车总数

        getTotalNum();
      }, 500);
    }

    getTotalPrice(); //评价页面逻辑
    //获取商家数据

    $("<div class=\"score\">".concat(seller.score, "\u5206</div>\n        <h3>\u7EFC\u5408\u8BC4\u5206</h3>\n        <p>\u9AD8\u4E8E\u5468\u8FB9\u5546\u5BB6").concat(seller.rankRate, "%</p>")).appendTo('.rating_left'); //创建商家评分星星串

    var str1 = "";
    var star1 = getStarArr(seller.foodScore);
    star1.forEach(function (item) {
      str1 += "<img src=\"../img/star36_".concat(item, "@3x.png\" alt=\"\">");
    });
    $('.store_score .star_wrapper').html(str1); //创建服务评分星星串

    var str2 = "";
    var star2 = getStarArr(seller.serviceScore);
    star2.forEach(function (item) {
      str2 += "<img src=\"../img/star36_".concat(item, "@3x.png\" alt=\"\">");
    });
    $('.services_score .star_wrapper').html(str2); //送达时间

    $('.time p').html(seller.deliveryTime + '分钟');
  }); //渲染购物车数据

  $('.logo-wrapper').tap(function () {
    //让购物车弹层显示或隐藏
    $('.shopList-wrapper').toggle();
  }); //封装函数加载购物车弹层数据

  loadCartData();

  function loadCartData() {
    $('.list').empty(); //加载购物车弹层数据

    cartData.forEach(function (item) {
      $("<li data-id=\"".concat(item.id, "\" class=\"food-item border-bottom-1px\">\n                <div class=\"food-name\">").concat(item.name, "</div>\n                <div class=\"item-right\">\n                    <div class=\"newPrice\">").concat(item.price, "</div>\n                    <div class=\"ctrl-cut icon-remove_circle_outline\"></div>\n                    <div class=\"ctrl-count\">").concat(item.count, "</div>\n                    <div class=\"ctrl-add icon-add_circle\"></div>\n                </div>\n            </li>")).appendTo('.list');
    });
  } //清空购物车


  $(document).on('tap', '.clear', function () {
    //①购物车弹层数据清空
    $('.list').empty(); //②弹层隐藏

    $('.shopList-wrapper').hide(); //③页面更新

    $('.ctrl-cut').hide();
    $('.ctrl-count').hide(); //④清空数据

    cartData.length = 0; //快速清空数组,length为0

    localStorage.removeItem('cartData'); //移除高亮

    $('.logo').removeClass('heightlign');
    getTotalPrice();
    getTotalNum();
  }); //封装函数求商品总价

  function getTotalPrice() {
    //商品总价
    var sum = cartData.reduce(function (s, item) {
      //初始的数量加上当前的数量×单价
      return s + item.count * item.price;
    }, 0); //配送费

    var dPrice = parseInt($('.desc span').text()); //console.log('总价',sum);

    $('.totalPrice').html('￥' + (sum + dPrice));

    if (sum >= minPrice) {
      $('.pay').html('去结算').css({
        background: 'yellowgreen'
      });
    } else {
      $('.pay').html('￥<span>' + minPrice + '</span>元起送').css({
        background: '#2b333b'
      });
    }
  } //封装函数计算购物车总数


  function getTotalNum() {
    var total = cartData.reduce(function (s, item) {
      return s + item.count;
    }, 0);

    if (total) {
      $('.totalNum').show().text(total);
    } else {
      $('.totalNum').hide();
    }
  }
});