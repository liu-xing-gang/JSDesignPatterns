// require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){});
require( ['jquery', 'math'], function($, math) {
    $(function () {
        $('h1').css('color', 'red')
    })

    alert(math.add(1,1))
});

require(['foo'], function (foo){
    foo.foo()
})

