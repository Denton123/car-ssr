export default function(){
    if(process.client){
        var _hmt = _hmt || [];
        (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?57d01ba6f81e054306a576e22504fb4e";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
        })();
    }
}