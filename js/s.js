Zepto(function () {
	$.get("../json/data.json", '', function (res) {
		console.log("商家", res);
		var seller = res.seller;
		$(`<p class="name">${seller.name}</p>`).appendTo('.kop1')
		// 获取星星数组
		var str = '';
		var starArr = getStarArr(seller.score)
		starArr.forEach(function (item) {
			str += `<img src="../img/star24_${item}@3x.png" alt="">`
		})
		// for (var i = 0; i < starArr.length; i++) {
		// 	str += `<img src="../img/star24_${item}@3x.png" alt="">`
		// }
		$(`<p class="p1"><span class="buy">${str}</span><span>(661)</span><span>月售690单</span></p>`).appendTo('.kop1')
		console.log("商家2", seller);
		$(`<p class="mko"><span>${seller.ratingCount}</span>元</p>`).appendTo('.vbh1')
		$(`<p class="mko"><span>${seller.deliveryPrice}</span>元</p>`).appendTo('.vbh2')
		$(`<p class="mko"><span>${seller.deliveryTime}</span>分钟</p>`).appendTo('.vbh3')
		$(`<p>${seller.bulletin}</p>`).appendTo('.bit')
		var supports = seller.supports;
		supports.forEach(function (item) {
			$(`<li class="supports_item">
				<img src="img/decrease_2@2x.png" alt="">
				<span>${item.description}</span>
			</li>`).appendTo('.supports_list')
		})
		var infos = seller.infos;
		infos.forEach(function (item) {
			$(`<li class="tyuo_item">${item}</li>`).appendTo('.tyuo_list')
		})
		var pics = seller.pics;
		pics.forEach(function (item) {
			$(`<img src="${item}" alt="">`).appendTo('.kosd')
		})
	})
})