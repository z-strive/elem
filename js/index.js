Zepto(function () {
    // 图片基础路径
    var imgUrl = "https://fuss10.elemecdn.com/";
    // 根据定位获取城市
    window.navigator.geolocation.getCurrentPosition(function (pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        // 请求商铺列表信息
        getData("shopping/restaurants", {
            latitude,
            longitude
        }, function (res) {
            console.log(res);
            res.forEach(function (item) {
                $(`<li class="store_item">
                <img src="https://elm.cangdu.org/img/${item.image_path}" alt="">
                <div class= "info" >
                    <div class="store_name">${item.name}</div>
                    <div class="box">
                        <p>
                            <span class="rating">${item.rating}分</span>
                            <span class="sales">月售+${item.recent_order_num}</span>
                        </p>
                        <p>
                            <span class="time">${item.order_lead_time}</span>
                            <span class="distance">${item.distance}</span>
                        </p>
                    </div>
                    <div class="cost">
                        <span>起送￥${item.float_minimum_order_amount}</span>
                        <p>免配送费<span>${item.float_delivery_fee}</span></p>
                    </div>
                    <div class="recommend">${item.description}</div>
                    <div class="full">${item.activities[0] ? item.activities[0].description : ""}</div>
                </div>
            </li > `).appendTo(".store_list");
            })
        })
    });
    // 请求分类数据
    getData("v2/index_entry", "", function (res) {
        console.log(res);
        res.forEach(function (item) {
            $(`<li li class= "cate_item" >
            <img src="${imgUrl}${item.image_url}" alt="">
                <p class="name">${item.title}</p>
            </li>`).appendTo(".category")
        })
    })



})