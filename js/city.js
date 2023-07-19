Zepto(function () {
    // 请求热门城市列表
    getData("v1/cities", { type: "hot" }, function (res) {
        console.log(res);
        res.forEach(function (item) {
            $(`<li>${item.name}</li>`).appendTo(".hot_list");
        })
    })
    // 请求全部城市列表
    getData("v1/cities", { type: "group" }, function (res) {
        console.log(res);
        var arr = [];
        for (var key in res) {
            arr.push(key);
        }
        arr.sort();
        arr.forEach(function (item, index) {
            // 左侧数据
            $(`<div class="city_cate">
            <h3 class="letter">${item}</h3>
            <ul class="city_list"></ul></div>`).appendTo(".cities");
            res[item].forEach(function (subItem) {
                $(".city_list").eq(index).append(`<li>${subItem.name}</li>`);
            })
            // 右侧数据
            $(`<li>${item}</li>`).appendTo(".fixed_box");
        })

        // 滚动
        var wrapper = document.querySelector(".wrap");
        var bs = new BScroll(wrapper, {})
        // 点击右侧按钮让左侧滚动到对应的位置
        $(".fixed_box li").tap(function () {
            var el = $(".city_cate")[$(this).index()]
            bs.scrollToElement(el, 300)
        })
    })
})