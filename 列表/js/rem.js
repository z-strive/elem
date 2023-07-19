var htmlEL = document.documentElement;
function fn() {
    // 初始参考屏幕iphone4---320
    // 初始参考字体大小100px；
    // 第一步：先获取当前手机屏幕大小（可视区宽度）
    var w = htmlEL.clientWidth;//获取
    // 第二步:计算当前屏幕在参考屏幕的基础上放大或缩小
    var r = w / 750;
    // 第三步：设置html元素字体大小也放大或缩小这莫多倍

    document.documentElement.style.fontSize = 100 * r + "px";
}
//页面加载的时候执行此函数
window.addEventListener("load", fn)
window.addEventListener("resize", fn)