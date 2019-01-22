// 加载规范的模块
define(['jquery'], function ($) {
    function foo() {
        alert($('body').height())
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