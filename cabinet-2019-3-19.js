try {
    if (typeof jQuery === undefined) throw new Error()

    // ie8 支持forEach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError("this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }
} catch (e) {
}
;(function ($) {
    $.layer = {
        msg: function (str) {
            var html = '<span class="l-msg">' + str + '</span>'
            $('body').append(html)
            setTimeout(function () {
                $('.l-msg').remove()
            }, 1000)
        }
    }

    $.fn.cabinet = function (options) {
        var defaults = {
            //各种参数、各种属性
            column: 6,
            section: 6,
            layer: 6,
            capacity: 6,
            oParent: new Object,
            oSidebar: new Object,
            oMain: new Object,
            oUl: new Object,
            layers: new Array,
            currentLayer: new Object,
            isMulti: false,
            isAB: new String,
        };

        // 属性继承
        var _options = $.extend(defaults, options);

        // 提示配置错误
        if (typeof(_options.column) != 'number' || typeof(_options.section) != 'number' || typeof(_options.layer) != 'number' || typeof(_options.layer) != 'number' || _options.column <= 0 || _options.section <= 0 || _options.layer <= 0 || _options.layer <= 0) {
            $('#amsMovableRackCabinet').empty().html('<span style="padding: 15px;">配置错误!!!</span>')
            return false
        }

        // 区分页面
        var getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
        }

        /**
         * 方法
         */
        // 初始化方法
        this.initialize = function () {
            this.create()
        }

        // 点击切换列
        this.initTab = function () {
            var _this = this
            this.find('#sidebar ul li').on('click', function (e) {
                _this.select($(this).index())
            })
        }

        // 切换A,B面
        this.switchAB = function () {
            var _this = this
            if (_options.isAB === '2') {
                this.find('.btn-side').on('click', function () {
                    _this.backTop()

                    $(this).addClass('active').siblings().removeClass('active')
                    _this.select(0)
                })
            }
        }

        // 弹出选位置的遮罩层
        this.showMask = function () {
            var _this = this
            if ($('.c-mask').length === 0 || $('.c-layer').length === 0) {

                if (JSON.stringify(_options) === "{}") return false

                var html = '<div class="c-mask"></div>    <div class="c-layer">        <div class="c-layer-title">            <span>选择位置</span>            <span class="c-btn-group">                    <a class="c-btn c-btn-close" href="javascript:;"></a>            </span>        </div>        <div class="c-content">           '

                // 遍历容量以生成所有位
                for (var i = 0; i < parseInt(_options.capacity); i++) {
                    html += '<div class="c-item">' + (i + 1) + '</div>'
                }

                html += '       </div>        ' +
                    '<div class="c-foot">' +
                    '            <div class="c-line txt-center">' +
                    '                <span class="pull-left">已选择:</span>' +
                    '                <span class="r"></span>' +
                    '            </div>            ' +
                    '<div class="btn-group1 btn-step1">' +
                    '                <button type="button" class="btn1 btn-save">确认</button>' +
                    '                <button type="button" class="btn1 btn-cancel">取消</button>' +
                    '            </div>        ' +
                    '</div> ' +
                    '<div class="btn-group1 btn-step2">' +
                    '                <button type="button" class="btn1 btn-openrack">打开柜体</button>' +
                    '                <button type="button" class="btn1 btn-resave btn-disabled">确认放入</button>' +
                    '                <button type="button" class="btn1 btn-recancel">取消</button>' +
                    '            </div>' +
                    '   </div>'
                $(this).append(html)
            }

            var parsePositions = function (id) {
                var _data = new Object
                for (var i = 0; i < _options.set.length; i++) {
                    if (id === _options.set[i].rackNoId) {
                        _data = _options.set[i]
                        break
                    }
                }
                return _data
            }

            // 点击选位
            $('.cabinet-item').on('click', function (e) {
                // 弹层
                $('body').addClass('active')

                var data = parsePositions($(this).find('.box').attr('data-racknoid')),
                    positions = new Array,
                    str = new String;

                if (data.rackAddress != undefined) {
                    // 获取已选位置信息
                    for (var i = 0; i < data.rackAddress.length; i++) {
                        var temp = data.rackAddress[i]
                        if (temp.amsRackstate === '1') {
                            positions.push(parseInt(temp.amsRackno.substring(temp.amsRackno.length - 2)))
                        }
                    }
                    $('.c-layer .c-item').each(function (a) {
                        var o = $(this)
                        positions.forEach(function (i) {
                            i === (a + 1) ? o.addClass('active tie') : null
                        })
                    })

                }

                if (getQueryString('flag') == 'view') {
                    // 密集柜视图页面
                    str = positions.toString() === '' ? '无' : positions.toString()
                    $('.c-line span:first').html('已选择：' + str);
                    $('.c-layer-title span:first').text('查看位置')
                    $('.btn-group1').remove();
                }

                if (getQueryString('flag') == 'rebox') {
                    //重新上架页面
                    $('.btn-group1').remove();
                }

                // 点击选择位置
                positionSelect()

                // 显示未选位之前的选位信息
                $('.c-line .r').removeAttr('data-ori')
                $('.c-line .r').attr('data-ori', JSON.stringify(data))
            })

            // 选位
            var positionSelect = function () {
                $('.c-line .r').text('')
                if ($('.c-item.active').not('.tie').index() != -1)
                    $('.c-line .r').append($('.c-item.active').not('.tie').index() + 1)
            }

            // 移除选位和选位控制
            var removeTie = function () {
                $('.c-item').removeClass('active tie')
            }

            // 查看密集柜时禁止选择位置
            $('.c-item').off('click')
            $('.c-item').on('click', function () {
                // 禁止点击
                if (getQueryString('flag') == 'view') {
                    return false;
                }

                if (_options.isMulti === true) {
                    // 多选 - 未启用
                    $(this).toggleClass('active')
                } else {
                    // 单选
                    $(this).hasClass('tie') != true ? $(this).toggleClass('active').siblings().not('.tie').removeClass('active') : null
                }
                positionSelect()
            })

            // 初始化选项
            positionSelect()

            // 复位按钮
            var reset = function () {
                $('.btn-openrack').removeClass('btn-disabled');
                $('.btn-openrack').removeAttr('disabled');
                $(".btn-resave").addClass('btn-disabled')
                $(".btn-resave").attr("disabled", true);
            }

            // 关闭遮罩
            $('.c-btn-close, .btn-recancel').on('click', function () {
                $('body').removeClass('active')
                setTimeout(function () {
                    reset()

                    removeTie()
                    _this.hideConfirm()
                }, 200)

            })

            // 保存选位
            $('.btn-save').on('click', function (e) {
                if ($('.c-item.active').not('.tie').index() != -1) {
                    _this.showConfirm()
                } else {
                    $.layer.msg('请选择1个位置!')
                }

            })

            // 取消选位
            $('.btn-cancel').on('click', function (e) {
                $('body').removeClass('active')
                removeTie()
                _this.hideConfirm()
            })
        }

        // 创建密集柜视图
        this.create = function () {
            var oSidebar = document.createElement('div'),
                oUl = document.createElement('ul'),
                oSide = document.createElement('div'),
                oMain = document.createElement('div'),
                c_aFrag2 = document.createDocumentFragment(),

                // 列，节，层，层文件数，
                c_aFrag = document.createDocumentFragment(),
                i_aFrag = document.createDocumentFragment(),
                j_aFrag = document.createDocumentFragment(),
                k_aFrag = document.createDocumentFragment(),
                m_aFrag = document.createDocumentFragment(),
                sideFrag = document.createDocumentFragment();

            // 生成左侧column列表
            for (var i = 0; i < _options.column; i++) {
                var oLi = document.createElement('li'),
                    oA = document.createElement('a');
                oA.innerHTML = '列' + (i + 1)
                oLi.appendChild(oA)
                c_aFrag.appendChild(oLi)
            }

            try {
                // 生成A,B面
                if (_options.isAB === '2') {
                    var span = document.createElement('span'),
                        span2 = document.createElement('span'),
                        btna = document.createElement('button'),
                        btnb = document.createElement('button');

                    oSide.className = 'oneside'
                    span.innerText = '当前所在面:'

                    btna.innerText = 'A'
                    btna.className = 'active btn-side'
                    btna.setAttribute('type', 'button')

                    btnb.innerText = 'B'
                    btnb.className = 'btn-side'
                    btnb.setAttribute('type', 'button')

                    span2.appendChild(btna)
                    span2.appendChild(btnb)
                    c_aFrag2.appendChild(span)
                    c_aFrag2.appendChild(span2)
                }
            } catch (e) {
            }

            try {
                // 生成主内容区
                var createColumn = function (abtype) {
                    if (abtype === '2') {
                        for (var i = 0; i < _options.column; i++) {
                            // 列
                            var oWrap = document.createElement('div')
                            oWrap.className = 'cabinet-flex-wrap'

                            // 循环A,b面
                            for (var index = 0; index < 2; index++) {
                                var oFlexItem = document.createElement('div')

                                // 默认选中A面
                                oFlexItem.className = 'cabinet-flex-item'

                                var oFlex = document.createElement('div')
                                oFlex.className = 'cabinet-flex'

                                for (var j = 0; j < _options.section; j++) {
                                    // 节
                                    var oList = document.createElement('div'),
                                        oTitle = document.createElement('div'),
                                        oLine = document.createElement('div');
                                    oList.className = 'cabinet-list'
                                    oTitle.className = 'cabinet-title'
                                    oLine.className = 'cabinet-line clearfloat'

                                    // 头部标题
                                    index === 0 ? oTitle.innerHTML = 'A' + '面 - ' + '列' + (i + 1) + '节' + (j + 1) : oTitle.innerHTML = 'B' + '面 - ' + '列' + (i + 1) + '节' + (j + 1)
                                    oList.appendChild(oTitle)
                                    oList.appendChild(oLine)

                                    // 层
                                    for (var k = 0; k < _options.layer; k++) {
                                        var oItem = document.createElement('div'),
                                            oBox = document.createElement('div');
                                        oItem.className = 'cabinet-item'
                                        oBox.className = 'box clearfloat'

                                        // 存储层用以绑定事件
                                        var position = {},
                                            oLayer = {},
                                            fileNum = 0;
                                        position.column = i + 1
                                        position.section = j + 1
                                        position.layer = k + 1
                                        oLayer.el = oBox
                                        oLayer.position = position

                                        _options.set.forEach(function (item) {
                                            // 通过所在列节层反查数据
                                            if (position.column === parseInt(item.rackGroup) && position.section === parseInt(item.rackSection) && position.layer === parseInt(item.rackLayer)) {

                                                // 判断是否在同一个面上
                                                if (index === parseInt(item.rackMh)) {
                                                    item.fileNum === null ? fileNum = 0 : fileNum = parseInt(item.fileNum)
                                                    oLayer.data = item

                                                    // oBox.innerText = '(' + oLayer.data.rackGroup + ', ' + oLayer.data.rackSection + ', ' + oLayer.data.rackLayer + ', ' + oLayer.data.rackMh + ')'
                                                    oBox.style.lineHeight = '80px'
                                                    oBox.style.textAlign = 'center'

                                                    try {
                                                        $(oBox).attr('data-racknoid', item.rackNoId)
                                                    } catch (e) {
                                                    }
                                                }
                                            }
                                        })

                                        _options.layers.push(oLayer)

                                        // 层中文件
                                        // 设置层文件最大数
                                        if (fileNum === _options.capacity) {
                                            // 层文件满
                                            oBox.className = 'box clearfloat full'
                                        }
                                        if (fileNum <= _options.capacity) {
                                            var percent = 1 / _options.capacity
                                            for (var m = 0; m < fileNum; m++) {
                                                var oGrid = document.createElement('div'),
                                                    oSpan = document.createElement('span');
                                                oGrid.className = 'grid'
                                                oGrid.style.width = percent * 0.8 * 100 + '%'
                                                oGrid.style.marginLeft = percent * 0.1 * 100 + '%'
                                                oGrid.style.marginRight = percent * 0.1 * 100 + '%'

                                                oGrid.appendChild(oSpan)
                                                m_aFrag.appendChild(oGrid)
                                            }
                                        }

                                        oBox.appendChild(m_aFrag)
                                        oItem.appendChild(oBox)
                                        k_aFrag.appendChild(oItem)
                                    }

                                    oList.appendChild(k_aFrag)
                                    j_aFrag.appendChild(oList)
                                }

                                oFlex.appendChild(j_aFrag)
                                oFlexItem.appendChild(oFlex)
                                oWrap.appendChild(oFlexItem)
                            }

                            i_aFrag.appendChild(oWrap)
                        }
                    } else {
                        for (var i = 0; i < _options.column; i++) {
                            // 列
                            var oWrap = document.createElement('div'),
                                oFlex = document.createElement('div');
                            oWrap.className = 'cabinet-flex-wrap'
                            oFlex.className = 'cabinet-flex'

                            for (var j = 0; j < _options.section; j++) {
                                // 节
                                var oList = document.createElement('div'),
                                    oTitle = document.createElement('div'),
                                    oLine = document.createElement('div');
                                oList.className = 'cabinet-list'
                                oTitle.className = 'cabinet-title'
                                oLine.className = 'cabinet-line clearfloat'
                                oTitle.innerHTML = '列' + (i + 1) + '节' + (j + 1)
                                oList.appendChild(oTitle)
                                oList.appendChild(oLine)

                                // 层
                                for (var k = 0; k < _options.layer; k++) {
                                    var oItem = document.createElement('div'),
                                        oBox = document.createElement('div'),

                                        // 存储层用以绑定事件
                                        position = {},
                                        oLayer = {},
                                        fileNum = 0;

                                    oItem.className = 'cabinet-item'
                                    oBox.className = 'box clearfloat'
                                    position.column = i + 1
                                    position.section = j + 1
                                    position.layer = k + 1
                                    oLayer.el = oBox
                                    oLayer.position = position

                                    _options.set.forEach(function (item) {
                                        // 通过所在列节层反查数据
                                        if (position.column === parseInt(item.rackGroup) && position.section === parseInt(item.rackSection) && position.layer === parseInt(item.rackLayer)) {
                                            item.fileNum === null ? fileNum = 0 : fileNum = parseInt(item.fileNum)
                                            oLayer.data = item
                                        }
                                    })

                                    _options.layers.push(oLayer)

                                    // 层中文件
                                    // 设置层文件最大数
                                    if (fileNum === _options.capacity) {
                                        // 层文件满
                                        oBox.className = 'box clearfloat full'
                                    }

                                    if (fileNum <= _options.capacity) {
                                        var percent = 1 / _options.capacity
                                        for (var m = 0; m < fileNum; m++) {
                                            var oGrid = document.createElement('div'),
                                                oSpan = document.createElement('span');
                                            oGrid.className = 'grid'
                                            oGrid.style.width = percent * 0.8 * 100 + '%'
                                            oGrid.style.marginLeft = percent * 0.1 * 100 + '%'
                                            oGrid.style.marginRight = percent * 0.1 * 100 + '%'

                                            oGrid.appendChild(oSpan)
                                            m_aFrag.appendChild(oGrid)
                                        }
                                    }

                                    oBox.appendChild(m_aFrag)
                                    oItem.appendChild(oBox)
                                    k_aFrag.appendChild(oItem)
                                }

                                oList.appendChild(k_aFrag)
                                j_aFrag.appendChild(oList)
                            }

                            oFlex.appendChild(j_aFrag)
                            oWrap.appendChild(oFlex)
                            i_aFrag.appendChild(oWrap)

                        }
                    }
                }

                createColumn(_options.isAB)
            } catch (e) {
            }

            oSidebar.id = 'sidebar'
            oMain.id = "main"

            oSide.appendChild(c_aFrag2)
            oUl.appendChild(c_aFrag)

            sideFrag.appendChild(oSide)
            sideFrag.appendChild(oUl)


            oSidebar.appendChild(sideFrag)
            oMain.appendChild(i_aFrag)

            this.append(oSidebar)
            this.append(oMain)
        }

        // 选择某列
        this.select = function (index) {
            this.backTop()

            this.find('#sidebar ul li').eq(index).addClass('active').siblings().removeClass('active')
            this.find('.cabinet-flex-wrap').eq(index).addClass('active').siblings().removeClass('active')
            try {
                // 切换列时，默认选中A面
                // 两种切换情况，有ab面和无ab面
                if (_options.isAB === '2') {
                    var i = $('.btn-side.active').index()
                    $('.cabinet-flex').css('margin-left', '-100%')
                    $('.cabinet-flex-wrap.active').find('.cabinet-flex-item').eq(i).addClass('show').siblings().removeClass('show')
                    $('.cabinet-flex-wrap.active').find('.cabinet-flex-item').eq(i).find('.cabinet-flex').animate({
                        marginLeft: 0,
                        scrollTop: 0
                    })
                } else {
                    $('.cabinet-flex').css('margin-left', '-100%')
                    $('.cabinet-flex-wrap.active').find('.cabinet-flex').animate({
                        marginLeft: 0,
                        scrollTop: 0
                    })
                }
            } catch (e) {
            }
        }

        // 当前层是否已满
        this.isLayerFull = function () {
        }

        // 当前层是否为空
        this.isLayerEmpty = function () {
        }

        // 当前层添加文件
        this.addFile = function () {
        }

        // 当前层删除文件
        this.removeFile = function () {
        }

        // 绑定事件
        this.addEvent = function (oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType,
                fnHandler, false) : oElement.attachEvent("on" + sEventType,
                fnHandler)
        }

        // 重载
        this.reload = function () {
        }

        // 销毁
        this.destory = function () {
        }

        // 显示确认层
        this.showConfirm = function () {
            $('.c-layer').css({
                width: '400px',
                height: '300px'
            })

            $('.c-content').css('display', 'none')
            $('.btn-step1').css('display', 'none')
            $('.btn-step2').fadeIn()

        }

        // 隐藏确认层
        this.hideConfirm = function () {
            $('.c-layer').css({
                width: '90%',
                height: '90%'
            })
            $('.c-content').css('display', 'block')
            $('.btn-step1').css('display', 'block')
            $('.btn-step2').fadeOut()
        }

        // 回到顶部
        this.backTop = function () {
            $(this).closest('.easyui-fluid').animate({scrollTop: 0})
        }

        // 调用插件
        try {
            this.empty()
            this.backTop()
            this.initialize()
            this.select(0)
            this.initTab()
            this.switchAB()
            this.showMask()
        } catch (e) {
        }
    };
})(jQuery);
