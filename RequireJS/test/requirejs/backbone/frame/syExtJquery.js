var sy = sy || {};
sy.data = sy.data || {};// 用于存放临时的数据或者对象

/**
 * 屏蔽右键
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 */
$(document).bind('contextmenu', function() {
	// return false;
});

/**
 * 禁止复制
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 */
$(document).bind('selectstart', function() {
	// return false;
});

/**
 * @author 孙宇
 * 
 * 增加命名空间功能
 * 
 * 使用方法：sy.ns('jQuery.bbb.ccc','jQuery.eee.fff');
 */
sy.ns = function() {
	var o = {}, d;
	for ( var i = 0; i < arguments.length; i++) {
		d = arguments[i].split(".");
		o = window[d[0]] = window[d[0]] || {};
		for ( var k = 0; k < d.slice(1).length; k++) {
			o = o[d[k + 1]] = o[d[k + 1]] || {};
		}
	}
	return o;
};

/**
 * 将form表单元素的值序列化成对象
 * 
 * @example sy.serializeObject($('#formId'))
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 * 
 * @returns object
 */
sy.serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
//		if (this['value'] != undefined && this['value'].length > 0) {// 如果表单项的值非空，才进行序列化操作
			// 空值也需要获得，否则会影响业务。
//		}
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	console.log('from post:' + o);
	return o;
};

/**
 * 增加formatString功能
 * 
 * @author 孙宇
 * 
 * @example sy.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串
 */
sy.formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};

/**
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 
 * @author 孙宇
 * 
 * @returns list
 */
sy.stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免他将ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 * JSON对象转换成String
 * 
 * @param o
 * @returns
 */
sy.jsonToString = function(o) {
	var r = [];
	if (typeof o == "string")
		return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	if (typeof o == "object") {
		if (!o.sort) {
			for ( var i in o)
				r.push(i + ":" + sy.jsonToString(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}";
		} else {
			for ( var i = 0; i < o.length; i++)
				r.push(sy.jsonToString(o[i]));
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString();
};

/**
 * Create a cookie with the given key and value and other optional parameters.
 * 
 * @example sy.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example sy.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example sy.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example sy.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain used when the cookie was set.
 * 
 * @param String
 *            key The key of the cookie.
 * @param String
 *            value The value of the cookie.
 * @param Object
 *            options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object. If a negative value is specified (e.g. a date in the past), the cookie will be deleted. If set to null or omitted, the cookie will be a session cookie and will not be retained when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will require a secure protocol (like HTTPS).
 * @type undefined
 * 
 * @name sy.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 * 
 * Get the value of a cookie with the given key.
 * 
 * @example sy.cookie('the_cookie');
 * @desc Get the value of a cookie.
 * 
 * @param String
 *            key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 * 
 * @name sy.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
sy.cookie = function(key, value, options) {
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = $.extend({}, options);
		if (value === null) {
			options.expires = -1;
		}
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		return (document.cookie = [ encodeURIComponent(key), '=', options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : '' ].join(''));
	}
	options = value || {};
	var result, decode = options.raw ? function(s) {
		return s;
	} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/**
 * 改变jQuery的AJAX默认属性和方法
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 * 
 */
$.ajaxSetup({
	type : 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		try {
			parent.$.messager.progress('close');
			parent.$.messager.alert('错误', XMLHttpRequest.responseText);
		} catch (e) {
			alert(XMLHttpRequest.responseText);
		}
	}
});

/**
 * 解决class="iconImg"的img标记，没有src的时候，会出现边框问题
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 */
$(function() {
	$('.iconImg').attr('src', sy.pixel_0);
    var ColorHex = new Array('00','33','66','99','CC','FF');
    var SpColorHex = new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF');
    $.fn.colorpicker = function(options) {
        var opts = jQuery.extend({}, jQuery.fn.colorpicker.defaults, options);
        initColor();
        return this.each(function() {
            var obj = $(this);
            obj.bind(opts.event, function() {
                var ttop = $(this).offset().top;
                var thei = $(this).height();
                var tleft = $(this).offset().left;
                $("#colorpanel").css({
                    top: ttop + thei + 5,
                    left: tleft
                }).show();
                var target = opts.target ? $(opts.target) : obj;
                if (target.data("color") == null) {
                    target.data("color", target.css("color"));
                }
                if (target.data("value") == null) {
                    target.data("value", target.val());
                }
                $("#_creset").bind("click", function() {
                    target.css("color", target.data("color")).val("");
                    $("#colorpanel").hide();
                    opts.reset(obj);
                });
                $("#_cclose").bind('click',function() {
                    $("#colorpanel").hide();
                    return false;
                }).css({
                    "font-size": "12px",
                    "padding-left": "20px"
                });
                if (target.val()){
                    $("#HexColor").val(target.val());
                    $("#DisColor").css("background", target.val());
                }
                $("#CT tr td").unbind("click").mouseover(function() {
                    var color = $(this).css("background-color");
                    $("#DisColor").css("background", color);
                    $("#HexColor").val($(this).attr("rel"));
                }).click(function() {
                    var color = $(this).attr("rel");
                    color = opts.ishex ? color : getRGBColor(color);
                    if (opts.fillcolor)
                        target.val(color);
                    target.css("color", color);
                    $("#colorpanel").hide();
                    $("#_creset").unbind("click");
                    opts.success(obj, color);
                });
            });
        });
        function initColor() {
            $("body").append('<div id="colorpanel" style="position: absolute; display: none;"></div>');
            var colorTable = '';
            var colorValue = '';
            for (i = 0; i < 2; i++) {
                for (j = 0; j < 6; j++) {
                    colorTable = colorTable + '<tr height=12>'
                    colorTable = colorTable + '<td width=11 rel="#000000" style="background-color:#000000">'
                    colorValue = i == 0 ? ColorHex[j] + ColorHex[j] + ColorHex[j] : SpColorHex[j];
                    colorTable = colorTable + '<td width=11 rel="#' + colorValue + '" style="background-color:#' + colorValue + '">'
                    colorTable = colorTable + '<td width=11 rel="#000000" style="background-color:#000000">'
                    for (k = 0; k < 3; k++) {
                        for (l = 0; l < 6; l++) {
                            colorValue = ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j];
                            colorTable = colorTable + '<td width=11 rel="#' + colorValue + '" style="background-color:#' + colorValue + '">'
                        }
                    }
                }
            }
            colorTable = '<table width=253 border="0" cellspacing="0" cellpadding="0" style="border:1px solid #000;">' + '<tr height=30><td colspan=21 bgcolor=#cccccc>' + '<table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse">' + '<tr><td width="3"><td><input type="text" id="DisColor" size="6" disabled style="border:solid 1px #000000;background-color:#ffff00"></td>' + '<td width="3"><td><input type="text" id="HexColor" size="7" style="border:inset 1px;font-family:Arial;" value="#000000"><a href="javascript:void(0);" id="_cclose">关闭</a> | <a href="javascript:void(0);" id="_creset">清除</a></td></tr></table></td></table>' + '<table id="CT" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse" bordercolor="000000"  style="cursor:pointer;">' + colorTable + '</table>';
            $("#colorpanel").html(colorTable);
        }
        function getRGBColor(color) {
            var result;
            if (color && color.constructor == Array && color.length == 3)
                color = color;
            if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
                color = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
            if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
                color = [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
            if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
                color = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
            if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
                color = [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
            return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        }
    }
    ;
    jQuery.fn.colorpicker.defaults = {
        ishex: true,
        fillcolor: false,
        target: null,
        event: 'click',
        success: function() {},
        reset: function() {}
    };

});