// // require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){});
require(['jquery', 'math'], function ($, math) {
    $(function () {
        $('h1').css('color', 'red').append('<div>' + math.add(1, 1) + '</div>')
    })
});

require(['foo'], function (foo) {
    foo.foo()
})