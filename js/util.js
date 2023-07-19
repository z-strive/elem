//util.js : 该文件用来封装工具方法
//工具函数一:路径参数序列化
function url(key) {
    //①先获取地址栏带过来的参数44
    var str = location.search.split('?')[1]; //str =id=1001&a=100&b=200
    // ②参数键值对两两分组
    var arr = str.split('&'); //arr = ["id=1001","a=100","b=200"]
    // ③将每组匹配成键值对的格式{id:1001,a:100,b:200}
    var obj = {};
    // 数组.forEach(function(item,index){}) 数组的循环
    arr.forEach(function (item) {
        //对数组的每一项进行切割
        var arr1 = item.split('='); //["id","1001"]
        obj[arr1[0]] = arr1[1];
    })
    //obj = {id:"1001",a:100,b:200} 
    return obj[key];
}
//工具函数二:封装ajax
// 解决异步问题的方式一：回调函数
function getData(url, data, fn) {
    var baseUrl = "https://elm.cangdu.org/";
    $.ajax({
        url: baseUrl + url,
        data: data || {},
        success: function (res) {
            fn(res);
        }
    })
}
//工具函数三:封装函数实现评分转星星
/* 
    3.1分 ---- 3星  ['on','on','on','off'.'off']
    3.6分 ---- 3颗半星 ['on','on','on','half','off']
*/
function getStarArr(score) {
    var arr = [];
    //第一步:取分数的整数部分来决定放几颗满星
    var num = parseInt(score);
    for (var i = 0; i < num; i++) {
        arr.push('on');
    }
    //第二步:取分数的小数部分确定是否有半星的情况
    var num2 = score - num;
    if (num2 * 2 >= 1) {
        arr.push('half');
    }
    //第三步:总共要5颗星,剩余位用off补齐
    while (arr.length < 5) {
        arr.push('off');
    }
    return arr;
}

//工具函数四:将时间戳转换成具体日期
function formatTime(time) {
    var t = new Date(time);
    //获取年
    var year = t.getFullYear();
    //获取月份
    var month = t.getMonth() + 1;
    //获取日
    var day = t.getDate();
    //获取时
    var hour = t.getHours();
    //获取分
    var min = t.getMinutes();
    //获取秒
    var sec = t.getSeconds();
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
}
//封装函数实现数据之前补零操作
function addZero(num) {
    return num > 9 ? num : "0" + num;
}