// 加载规范的模块
define(['jquery'], function ($) {
    function foo() {
        console.log($('h1').html())
    }
    return {
        foo: foo
    };
});

// define([
//     'require',
//     'dependency'
// ], function(require, factory) {
//     'use strict';
    
// });