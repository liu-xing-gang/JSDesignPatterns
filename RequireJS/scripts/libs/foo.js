// 加载规范的模块
define(['jquery'], function($){
    function foo(){alert($('h1').html())}
    return {foo : foo};
});