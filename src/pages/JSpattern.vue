<template>
    <div class="jspattern">
        <fieldset>
            
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: 'jspattern',
        data: function() {
            return {
                test: 'test'
            }
        },
        mounted () {
            // var Book = (function () {

            //     // 静态私有变量
            //     var bookNum = 0;

            //     // 静态私有方法
            //     function checkBook (name) {

            //     }

            //     // 返回构造函数
            //     return function (newId, newName, newPrice) {
            //         // 私有变量
            //         var name, price;

            //         // 私有方法
            //         function checkID (id) {

            //         }

            //         // 特权方法
            //         this.getName = function () {}
            //         this.getPrice = function () {}
            //         this.setPrice = function () {}

            //         // 公有属性
            //         this.id = newId;

            //         // 公有方法
            //         this.copy = function () {}

            //         bookNum ++;
            //         if(bookNum > 1) {
            //             throw new Error('我们仅出版2本教科书');
            //         }
            //         this.setName(name);
            //         this.setPrice(price);
            //     }

            // })()

            // Book.prototype = {
            //     // 静态公有属性
            //     isJSBook: false,
            //     // 静态公有方法
            //     display: function () {}
            // }

            // /**
            //  * 洁净的继承者 ———— 原型式继承
            //  */
            // function inheritObject(o) {
            //     function F() {}
            //     F.prototype = o;
            //     return new F();
            // }

            // var book = {
            //     name: 'js book',
            //     alikeBook: ['css book', 'html book']
            // }

            // var newBook = inheritObject(book)
            // newBook.name = 'ajax book'
            // newBook.alikeBook.push("xml book")

            // var otherBook = inheritObject(book)
            // otherBook.name = 'flash book'
            // otherBook.alikeBook.push('as book')

            // console.log(newBook.name, 'newBook')
            // console.log(newBook.alikeBook)

            // console.log(otherBook.name, 'otherBook')
            // console.log(otherBook.alikeBook)

            // console.log(book.name, 'book')
            // console.log(book.alikeBook)

            // // 寄生组合式继承
            // function inheritPrototype(subClass, superClass) {
            //     var F = function () {}
            //     F.prototype = superClass.prototype
            //     subClass.prototype = new F()
            //     subClass.prototype.constructor = subClass
            // }

            // // 定义父类
            // function SuperClass (name) {
            //     this.name = name
            //     this.colors = ['red', 'green', 'blue']
            // }
            // // 定义父类原型方法
            // SuperClass.prototype.getName = function () {
            //     console.log(this.name)
            // }

            // //定义子类
            // function SubClass(name, time) {
            //     // 构造函数式继承
            //     SuperClass.call(this, name)
            //     // 子类新增属性
            //     this.time = time
            // }

            // inheritPrototype(SubClass, SuperClass)
            // SubClass.prototype.getTime = function () {
            //     console.log(this.time)
            // }

            // // 开始测试
            // var instance1 = new SubClass('js book', 2014)
            // var instance2 = new SubClass('css book', 2013)
            // instance1.colors.push('black')

            // console.log('instance1.colors: ', instance1.colors)
            // console.log('instance2.colors: ', instance2.colors)
            // instance2.getName()
            // instance2.getTime()

            // // 单继承 属性复制
            // var extend = function (target, source) {
            //     for(var property in source) {
            //         target[property] = source[property]
            //     }
            //     return target
            // }

            // var abook = {
            //     color: 'blue'
            // }
            // extend(abook, book)
            // console.log('abook', abook)

            // //所继承 属性复制
            // var mix = function () {
            //     var i = 1,
            //         len = arguments.length,
            //         target = arguments[0],
            //         arg;
            //     for(; i < len; i ++) {
            //         arg = arguments[i]
            //         for(var property in arg) {
            //             target[property] = arg[peroperty];
            //         }
            //     }
            //     return target
            // }

            // 安全的工厂方法
            // var Factory = function (type, content) {
            //     if (this instanceof Factory) {
            //         var s = new this[type](content)
            //         return s
            //     } else {
            //         return new Factory(type, content)
            //     }
            // }

            // Factory.prototype = {
            //     Java: function () {},
            //     JavaScript: function () {},
            //     UI: function () {},
            //     php: function () {}
            // }

            // var data = [
            //     {type: 'JavaScript', content: 'JavaScript 哪家强'}
            // ]
            // =========================================================================
            // 幽灵工厂 ———— 抽象工厂模式
            // =========================================================================
            var VehicleFactory = function (subType, superType) {
                if(typeof VehicleFactory[superType] === 'function') {
                    function F() {}
                    F.prototype = new VehicleFactory[superType]()
                    subType.constructor = subType
                    subType.prototype = new F()
                } else {
                    throw new Error()
                }
            }

            VehicleFactory.Lottery = function () {
                this.type = '彩票'
            }

            VehicleFactory.Lottery.prototype = {
                f1: function(){return new Error('抽象方法不能调用')}
            }

            var TwoColorBall = function (type) {
                this.type = type
            }
        }
    }
</script>
