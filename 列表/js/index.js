Zepto(function () {
    $.ajax({
        url: "https://elm.cangdu.org/v1/cities",
        type: "GET",
        data: {
            type: "hot",
        },
        success: function (res) {
            data(res)
        }
    })
    $.ajax({
        url: "https://elm.cangdu.org/v1/cities",
        type: "GET",
        data: {
            type: "group",
        },
        success: function (res) {
            data1(res)
        }
    })
    function data(res) {
        $.each(res, function (index, item) {
            $(`<li>${item.name}</li>`).appendTo(".list_t");
        })
    }
    function data1(res) {
        console.log(res);
        var arr = [];
        $.each(res, function (index, item) {
            arr.push([index, item]);

        })
        arr.sort();
        console.log(arr);
        $.each(arr, function (index, item) {
            $(`<div class="zm">
            <div class="title_b">${item[0]}</div>
            <ul class="list_b">
            </ul></div>`).appendTo(".wrap");
            // $(`<div class="title_b">${item[0]}</div>`).appendTo(".zm");
            // $(`<ul class="list_b"></ul>`).appendTo(".zm");
            $(`<li class="item">${item[0]}</li>`).appendTo(".nav ul");
            $.each(item[1], function (Iindex, Iitem) {
                $(".list_b").eq(index).append(`<li>${Iitem.name}</li>`);
            })
        })
        var wrapper = document.querySelector(".content");
        var bs = new BScroll(wrapper, {
            probeType: 3//一直派发scroll事件
        });
        $(document).on("touchstart", ".item", function () {
            console.log($(".active::before"));

            $(this).addClass("active").siblings().removeClass("active");
            // console.log($(".active::after"));
            $(".active::after").text("11111111")
            var index = $(this).index();
            var el = $(".zm")[index];
            bs.scrollToElement(el, 300);
        })

        /*   $(document).on("touchend", ".item", function () {
              $(this).removeClass("active")
          }) */
        $(document).on("tap", ".btn", function () {
            var index = $(this).index();
            var el = $(".wrap")[index];
            bs.scrollToElement(el, 300);
        })
    }

})

