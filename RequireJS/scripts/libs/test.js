define(['jquery'], function ($) {
    function foo() {
        console.log($('h1').html())
    }
    return {
        foo: foo
    };
});