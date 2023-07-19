Zepto(function () {
    var baseUrl = "https://elm.cangdu.org/img/";
    //声明变量保存起送价
    var minPrice = 0;
    //获取购物车数据
    var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    if (cartData.length) {
        $('.logo').addClass('heightlign');
    }
    getTotalNum();
    //获取商家数据
    getData("shopping/restaurant/1", "", function (res) {
        //console.log("餐馆详情",res)
        $(` <div class="img_wrap">
                <img src="${baseUrl}${res.image_path}" alt="">
            </div>
            <div class="content">
                <img class="head_img" src="${baseUrl}${res.image_path}" alt="">
                <div class="store_info">
                    <div class="store_name">
                        <p class="brand"></p>
                        <p>${res.name}</p>
                    </div>
                    <div class="time">${res.delivery_mode.text}/15分钟送达</div>
                    <div class="decrease">
                        <span class="support-icon icon-1 decrease"></span>
                        <p>满30减5</p>
                    </div>
                </div>
                <div class="support_num">
                    <span>${res.supports.length}个</span>
                    <span>&gt;</span>
                </div>
        </div>`).prependTo(".header");
        $(`<p class="title">${res.name}</p>
        <div class="star_box">
            
        </div>
        <p class="special_xx">优惠信息</p>
        <ul class="special_list">
            
        </ul>
        <p class="special_xx">商家公告</p>
        <p class="text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深的消费者青睐，发展至今成为粥类引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
        
        <div class="close">X</div>`).appendTo(".header_detail");
        res.supports.forEach(function (item) {
            $(`<li>${item.description}</li>`).appendTo(".special_list")
        })
        //获取星星数组
        var starArr = getStarArr(res.rating);
        //console.log("星星评分",starArr)
        starArr.forEach(function (item) {
            $(`<img src="../img/star48_${item}@3x.png" alt="">`).appendTo(".star_box")
        })
        //头部详情的切换
        $(".header").tap(function () {
            $(".header_detail").show();
        })
        $(".close").tap(function () {
            $(".header_detail").hide()
        })
    })

    //初始化选项卡
    $(".content_list div").eq(0).css({
        display: 'flex'
    });
    $(".btn_list .btn").eq(0).addClass("active");
    //选项卡切换
    $(".btn_list .btn").tap(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".content_list>div").eq($(this).index()).css({
            display: 'flex'
        }).siblings().hide()
    })

    //请求食品列表数据
    $.get("../json/data.json", "", function (res) {
        //商家数据
        var seller = res.seller;
        //评价数据
        var ratings = res.ratings;

        minPrice = res.seller.minPrice;
        //获取最少起送价
        $(`<div class="pay">￥<span>${minPrice}
        </span>元起送</div>`).appendTo('.footer-right');
        //获取配送费
        $(`<div class="desc">另需<span>${res.seller.deliveryPrice}
        </span>元配送费</div>`).appendTo('.footer-left');
        //console.log("食品数据",res);
        res = res.goods;
        //获取左侧菜单分类数据
        var leftData = res.map(function (item) {
            return item.name
        })
        leftData.forEach(function (item) {
            $(` <li class="menu">
                <span></span>
                <span>${item}</span>
            </li>`).appendTo(".shopping_left");
        })
        //加载右侧数据
        res.forEach(function (item, index) {
            $(`<div class="food_wrap">
                <h1 class="title">${item.name}</h1>
                <ul class="foods"></ul>
            </div>`).appendTo(".foods_list")
            item.foods.forEach(function (subItem) {
                //判断当前循环到的商品在缓存中是否存在
                var pro = cartData.find(function (a) {
                    return a.id == subItem.id
                })
                $(".foods").eq(index).append(`<li class="food" data-id="${subItem.id}">
                            <img src="${subItem.image}" alt="" class="img">
                            <div class="food_info">
                                <p class="food_name">${subItem.name}</p>
                                <p class="food_desc">${subItem.description}</p>
                                <p class="food_sales">月售${subItem.sellCount}</p>
                                <p>
                                    <span class="price">${subItem.price}</span>
                                    <span class="old_price"￥${subItem.oldPrice}</span>
                                </p>
                                <div class="ctrl-wrapper">
                                    <div class="ctrl-cut" style="display:${pro ? 'block' : 'none'}">
                                        <div class="inner icon-remove_circle_outline"></div>
                                    </div>
                                    <div class="ctrl-count" style="display:${pro ? 'block' : 'none'}">${pro?pro.count:''}</div>
                                    <div class="ctrl-add icon-add_circle"></div>
                                </div>
                            </div>
                </li>`)
            })
        })
        // 初始化盒子滚动
        var wrapper = document.querySelector(".shopping_right");
        var bs = new BScroll(wrapper, {
            probeType: 3 //一直派发scroll事件
        });
        // 左侧控制右侧
        $(document).on("tap", ".menu", function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            var el = $(".food_wrap")[index];
            bs.scrollToElement(el, 300);
        })
        //加按钮事件

        //定义开关变量用来记录当前是否有小球在飞
        var isFlying = false;
        $(document).on("tap", ".ctrl-add", function () {
            //判断如果当前有小球在飞则不执行该函数再等等
            if (isFlying) return;
            //添加飞入购物车效果
            flyToCart(this);
            var oP = $(this).parents(".food").length ?
                $(this).parents(".food") : $(this).parents('.food-item');
            //找父级身上的id
            var id = $(oP).data("id");
            //找购物车中是否有改id对应的商品
            var product = cartData.find(function (item) {
                return item.id == id;
            })
            if (product) {
                //有 跟新数量
                product.count++;
                //更新页面该商品对应的数量
                $(oP).find(".ctrl-count").show().html(product.count);
                //更新购物车弹层对应的数量
                $('.food').each(function (index, item) {
                    if ($(item).data('id') == id) {
                        $(item).find('.ctrl-count').html(product.count);
                    }
                })
            } else {
                //让当前对应的减号显示并滚动到自己的位置
                $(oP).find(".ctrl-cut").show().addClass("animate");
                //让当前对应的数量初始化为1
                $(oP).find(".ctrl-count").show().html(1);
                //没有 新增
                //装商品名字的盒子
                var box = $(oP).find(".food_name") || $(oP).find(".food-name");
                var obj = {
                    name: $(box).html(),
                    count: 1,
                    price: $(oP).find(".price").text(),
                    id: id
                }
                cartData.push(obj)
            }
            //同步更新缓存
            localStorage.setItem("cartData", JSON.stringify(cartData));
            //更新购物车弹层数据
            loadCartData();
            //判断购物车是否有数据,添加高亮
            if (cartData.length) {
                $('.logo').addClass('heightlign');
            }
            getTotalPrice();
            getTotalNum();

        })
        //减按钮事件
        $(document).on("tap", ".ctrl-cut", function () {
            var oP = $(this).parents(".food").length ?
                $(this).parents(".food") : $(this).parents('.food-item');
            var id = $(oP).data("id");
            var index = cartData.findIndex(function (a) {
                return a.id == id;
            })
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
                })
                //并且从购物车删除改商品
                cartData.splice(index, 1);
            }
            //更新页面
            $(oP).find(".ctrl-count").html(product.count);
            //更新购物车弹层对应的数量
            $('.food').each(function (index, item) {
                if ($(item).data('id') == id) {
                    $(item).find('.ctrl-count').html(product.count);
                }
            })
            //更新缓存
            localStorage.setItem("cartData", JSON.stringify(cartData));
            //更新购物车弹层数据
            loadCartData();
            //判断购物车是否有数据,添加高亮
            //如果length为0,取反,为true，删除类名
            if (!cartData.length) {
                $('.logo').removeClass('heightlign');
            }
            getTotalPrice();
            getTotalNum();
        })
        //小球飞函数
        function flyToCart(el) {
            isFlying = true;
            //第一步：获取当前加号所在的位置
            var posX = $(el).offset().left;
            var posY = $(el).offset().top;
            //第二步：计算小球从该加号到购物车的平移距离
            var x = posX - 64;
            var y = $(window).height() - posY - 44;
            //第三步：编写小球的平移动画
            var str = `
                @keyframes flyX{
                    0%{
                        transform:translateX(${x}px);
                    }
                    100%{
                        transform:translateX(0);
                    }
                }
                @keyframes flyY{
                    0%{
                        transform:translateY(${-y}px);
                    }
                    100%{
                        transform:translateY(0);
                    }
                }
            `
            //第四步：将编写好的动画添加进样式中
            $(".style").html(str);
            //第五步：小球执行动画
            $(".ball-wrapper").show().addClass("animate");
            //第六步：当动画执行完毕，去除类名准备下一次飞
            setTimeout(function () {
                $(".ball-wrapper").hide().removeClass("animate");
                isFlying = false;
                //更新购物车总数
                getTotalNum();
            }, 500)
        }
        getTotalPrice();

        //评价页面逻辑
        //获取商家数据
        $(`<div class="score">${seller.score}分</div>
        <h3>综合评分</h3>
        <p>高于周边商家${seller.rankRate}%</p>`).appendTo('.rating_left');
        //创建商家评分星星串
        var str1 = "";
        var star1 = getStarArr(seller.foodScore);
        star1.forEach(function (item) {
            str1 += `<img src="../img/star36_${item}@3x.png" alt="">`
        })
        $('.store_score .star_wrapper').html(str1);

        //创建服务评分星星串
        var str2 = "";
        var star2 = getStarArr(seller.serviceScore);
        star2.forEach(function (item) {
            str2 += `<img src="../img/star36_${item}@3x.png" alt="">`
        })
        $('.services_score .star_wrapper').html(str2);

        //送达时间
        $('.time p').html(seller.deliveryTime + '分钟');

    })

    //渲染购物车数据
    $('.logo-wrapper').tap(function () {
        //让购物车弹层显示或隐藏
        $('.shopList-wrapper').toggle();
    })

    //封装函数加载购物车弹层数据
    loadCartData();

    function loadCartData() {
        $('.list').empty();
        //加载购物车弹层数据
        cartData.forEach(function (item) {
            $(`<li data-id="${item.id}" class="food-item border-bottom-1px">
                <div class="food-name">${item.name}</div>
                <div class="item-right">
                    <div class="newPrice">${item.price}</div>
                    <div class="ctrl-cut icon-remove_circle_outline"></div>
                    <div class="ctrl-count">${item.count}</div>
                    <div class="ctrl-add icon-add_circle"></div>
                </div>
            </li>`).appendTo('.list')
        })
    }

    //清空购物车
    $(document).on('tap', '.clear', function () {
        //①购物车弹层数据清空
        $('.list').empty();
        //②弹层隐藏
        $('.shopList-wrapper').hide();
        //③页面更新
        $('.ctrl-cut').hide();
        $('.ctrl-count').hide();
        //④清空数据
        cartData.length = 0; //快速清空数组,length为0
        localStorage.removeItem('cartData');
        //移除高亮
        $('.logo').removeClass('heightlign');

        getTotalPrice();
        getTotalNum();
    })

    //封装函数求商品总价
    function getTotalPrice() {
        //商品总价
        var sum = cartData.reduce(function (s, item) {
            //初始的数量加上当前的数量×单价
            return s + item.count * item.price;
        }, 0);
        //配送费
        var dPrice = parseInt($('.desc span').text());
        //console.log('总价',sum);
        $('.totalPrice').html('￥' + (sum + dPrice));

        if (sum >= minPrice) {
            $('.pay').html('去结算').css({
                background: 'yellowgreen',
            });
        } else {
            $('.pay').html('￥<span>' + minPrice + '</span>元起送').css({
                background: '#2b333b',
            });
        }
    }

    //封装函数计算购物车总数
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
})