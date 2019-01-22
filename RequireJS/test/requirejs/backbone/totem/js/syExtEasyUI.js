var sy = sy || {};

/**
 * 更改easyui加载panel时的提示文字
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.panel.defaults, {
	loadingMessage : '加载中....'
});

/**
 * 更改easyui加载grid时的提示文字
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.datagrid.defaults, {
	loadMsg : '数据加载中....',
    pageSize:15,
    pageList:[10,15,20,30,45,60,75]
});

/**
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.panel.defaults, {
	onBeforeDestroy : function() {
		var frame = $('iframe', this);
		try {
			if (frame.length > 0) {
				for (var i = 0; i < frame.length; i++) {
					frame[i].src = '';
					frame[i].contentWindow.document.write('');
					frame[i].contentWindow.close();
				}
				frame.remove();
				if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
					try {
						CollectGarbage();
					} catch (e) {
					}
				}
			}
		} catch (e) {
		}
	}
});

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
sy.onMove = {
	onMove : function(left, top) {
		var l = left;
		var t = top;
		if (l < 1) {
			l = 1;
		}
		if (t < 1) {
			t = 1;
		}
		var width = parseInt($(this).parent().css('width')) + 14;
		var height = parseInt($(this).parent().css('height')) + 14;
		var right = l + width;
		var buttom = t + height;
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();
		if (right > browserWidth) {
			l = browserWidth - width;
		}
		if (buttom > browserHeight) {
			t = browserHeight - height;
		}
		$(this).parent().css({/* 修正面板位置 */
			left : l,
			top : t
		});
	}
};
$.extend($.fn.dialog.defaults, sy.onMove);
$.extend($.fn.window.defaults, sy.onMove);
$.extend($.fn.panel.defaults, sy.onMove);

/**
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
sy.onLoadError = {
	onLoadError : function(XMLHttpRequest) {
		if (XMLHttpRequest!=undefined&&XMLHttpRequest.responseText!=""){
			if(XMLHttpRequest.responseText.indexOf("login/in")>=0){
				top.location.href=_appsite;
			}
			if (parent.$ && parent.$.messager) {
				parent.$.messager.progress('close');
				parent.$.messager.alert('错误', XMLHttpRequest.responseText);
			} else {
				$.messager.progress('close');
				$.messager.alert('错误', XMLHttpRequest.responseText);
			}
		}
	}
};
$.extend($.fn.datagrid.defaults, sy.onLoadError);
$.extend($.fn.treegrid.defaults, sy.onLoadError);
$.extend($.fn.tree.defaults, sy.onLoadError);
$.extend($.fn.combogrid.defaults, sy.onLoadError);
$.extend($.fn.combobox.defaults, sy.onLoadError);
$.extend($.fn.form.defaults, sy.onLoadError);

/**
 * 扩展combobox在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combobox.defaults, {
	onHidePanel : function() {
		var _options = $(this).combobox('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combobox('getData');/* 下拉框所有选项 */
			var _value = $(this).combobox('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.valueField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combobox('setValue', '');
			}
		}
	}
});

$.extend($.fn.tree.defaults,{
	onDblClick:function(node){
		$(this).tree("toggle",node.target);
	}
})

/**
 * 扩展combogrid在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combogrid.defaults, {
	onHidePanel : function() {
		var _options = $(this).combogrid('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combogrid('grid').datagrid('getData').rows;/* 下拉框所有选项 */
			var _value = $(this).combogrid('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.idField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combogrid('setValue', '');
			}
		}
	}
});

/**
 * 扩展validatebox，添加新的验证功能
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {/* 验证两次密码是否一致功能 */
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});

/**
 * 扩展tree和combotree，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
sy.loadFilter = {
	loadFilter : function(data, parent) {
		data = $.type(data) === "array" ? data:data.rows;
		var opt = $(this).data().tree.options;
		var idField, textField, parentField;
		if (opt.textField) {
			idField = opt.idField || 'id';
			textField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			sy.replaceText(data,textField,idField,parentField);
		}
		return data;
	}
};

sy.replaceText = function(treedata,textField,idField,parentField){
	for (var i=0;i<treedata.length;i++){
		treedata[i]['text'] = treedata[i][textField];
		treedata[i]['id'] = treedata[i][idField];
		treedata[i]['pid'] = treedata[i][parentField];
		if (treedata[i]['children']){
			sy.replaceText(treedata[i]['children'],textField,idField,parentField);
		}
	}
}
$.extend($.fn.combotree.defaults, sy.loadFilter);
$.extend($.fn.tree.defaults, sy.loadFilter);

/**
 * 扩展treegrid，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.treegrid.defaults, {
    pageSize:15,
    pageList:[10,15,20,30,45,60,75],
	loadFilter : function(data, parentId) {
    	var rows = data.rows;
		var opt = $(this).data().treegrid.options;
		var idField, treeField, parentField;
		if (opt.parentField) {
			idField = opt.idField || 'id';
			treeField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			var i, l, treeData = [], tmpMap = [];
			for (i = 0, l = rows.length; i < l; i++) {
				tmpMap[rows[i][idField]] = rows[i];
			}
			for (i = 0, l = rows.length; i < l; i++) {
				if (tmpMap[rows[i][parentField]] && rows[i][idField] != rows[i][parentField]) {
					if (!tmpMap[rows[i][parentField]]['children'])
						tmpMap[rows[i][parentField]]['children'] = [];
					rows[i]['text'] = rows[i][treeField];
					tmpMap[rows[i][parentField]]['children'].push(rows[i]);
				} else {
					rows[i]['text'] = rows[i][treeField];
					treeData.push(rows[i]);
				}
			}
			data.rows = treeData;
		}
		return data;
	}
});

/**
 * 创建一个模式化的dialog
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
sy.modalDialog = function(options, width, height) {
	// 默认大小设置
	if(width == undefined){
		width = 640;
	}
	if(height == undefined){
		height = 600;
	}
	var opts = $.extend({
		title : '&nbsp;',
		width : width,
		height : height,
		modal : true,
		resizable : true,
		collapsible : true,
		maximizable : true,
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
	if (options.url) {
		opts.content = '<iframe id="" src="' + options.url + '" allowTransparency="true" scrolling="auto" width="100%" height="98%" frameBorder="0" name=""></iframe>';
	}
	return $('<div/>').dialog(opts);
};

/**
 * 等同于原form的load方法，但是这个方法支持{data:{name:''}}形式的对象赋值
 */
$.extend($.fn.form.methods, {
	loadData : function(jq, data) {
		return jq.each(function() {
			load(this, data);
		});

		function load(target, data) {
			if (!$.data(target, 'form')) {
				$.data(target, 'form', {
					options : $.extend({}, $.fn.form.defaults)
				});
			}
			var opts = $.data(target, 'form').options;

			if (typeof data == 'string') {
				var param = {};
				if (opts.onBeforeLoad.call(target, param) == false)
					return;

				$.ajax({
					url : data,
					data : param,
					dataType : 'json',
					success : function(data) {
						_load(data);
					},
					error : function() {
						opts.onLoadError.apply(target, arguments);
					}
				});
			} else {
				_load(data);
			}
			function _load(data) {
				var form = $(target);
				var formFields = form.find("input[name],select[name],textarea[name]");
				formFields.each(function() {
					var name = this.name;
					var value = jQuery.proxy(function() {
						try {
							return eval('this.' + name);
						} catch (e) {
							return "";
						}
					}, data)();
					var rr = _checkField(name, value);
					if (!rr.length) {
						var f = form.find("input[numberboxName=\"" + name + "\"]");
						if (f.length) {
							f.numberbox("setValue", value);
						} else {
							$("input[name=\"" + name + "\"]", form).val(value);
							$("textarea[name=\"" + name + "\"]", form).val(value);
							$("select[name=\"" + name + "\"]", form).val(value);
						}
					}
					_loadCombo(name, value);
				});
				opts.onLoadSuccess.call(target, data);
				$(target).form("validate");
			}

			function _checkField(name, val) {
				var rr = $(target).find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
				rr._propAttr('checked', false);
				rr.each(function() {
					var f = $(this);
					if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
						f._propAttr('checked', true);
					}
				});
				return rr;
			}

			function _loadCombo(name, val) {
				var form = $(target);
				var cc = [ 'combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox', 'combo' ];
				var c = form.find('[comboName="' + name + '"]');
				if (c.length) {
					for (var i = 0; i < cc.length; i++) {
						var type = cc[i];
						if (c.hasClass(type + '-f')) {
							if (c[type]('options').multiple) {
								c[type]('setValues', val);
							} else {
								c[type]('setValue', val);
							}
							return;
						}
					}
				}
			}
		}
	}
});

/**
 * 更换主题
 * 
 * @author 孙宇
 * @requires jQuery,EasyUI
 * @param themeName
 */
sy.changeTheme = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for (var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			try {
				$(ifr).contents().find('#easyuiTheme').attr('href', href);
			} catch (e) {
				try {
					ifr.contentWindow.document.getElementById('easyuiTheme').href = href;
				} catch (e) {
				}
			}
		}
	}

	sy.cookie('easyuiTheme', themeName, {
		expires : 7
	});
};

/**
 * 滚动条
 * 
 * @author 孙宇
 * @requires jQuery,EasyUI
 */
sy.progressBar = function(options) {
	if (typeof options == 'string') {
		if (options == 'close') {
			$('#syProgressBarDiv').dialog('destroy');
		}
	} else {
		if ($('#syProgressBarDiv').length < 1) {
			var opts = $.extend({
				title : '&nbsp;',
				closable : false,
				width : 300,
				height : 60,
				modal : true,
				content : '<div id="syProgressBar" class="easyui-progressbar" data-options="value:0"></div>'
			}, options);
			$('<div id="syProgressBarDiv"/>').dialog(opts);
			$.parser.parse('#syProgressBarDiv');
		} else {
			$('#syProgressBarDiv').dialog('open');
		}
		if (options.value) {
			$('#syProgressBar').progressbar('setValue', options.value);
		}
	}
};

var groupView = $.extend({}, $.fn.datagrid.defaults.view, {
    render: function (target, container, frozen) {
        var table = [];
        var groups = this.groups;
        for (var i = 0; i < groups.length; i++) {
            table.push(this.renderGroup.call(this, target, i, groups[i], frozen));
        }
        $(container).html(table.join(''));
    },

    renderGroup: function (target, groupIndex, group, frozen) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var fields = $(target).datagrid('getColumnFields', frozen);

        var table = [];
        table.push('<div class="datagrid-group" group-index=' + groupIndex + '>');
        table.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>');
        table.push('<tr>');
        if ((frozen && (opts.rownumbers || opts.frozenColumns.length)) ||
				(!frozen && !(opts.rownumbers || opts.frozenColumns.length))) {
            table.push('<td style="border:0;text-align:center;width:25px"><span class="datagrid-row-expander datagrid-row-collapse" style="display:inline-block;width:16px;height:16px;cursor:pointer">&nbsp;</span></td>');
        }
        table.push('<td style="border:0;">');
        if (!frozen) {
            //group row 添加按组选中按钮
            if (opts.groupChecked)
            {
                table.push('<span class="datagrid-group-checked"><input type="checkbox"/>&nbsp;&nbsp;</span>');
               
            }
            //group row 添加按组选中按钮
            table.push('<span class="datagrid-group-title">');
            table.push(opts.groupFormatter.call(target, group.value, group.rows));
            table.push('</span>');
           
        }
        table.push('</td>');
        table.push('</tr>');
        table.push('</tbody></table>');
        table.push('</div>');

        table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
        var index = group.startIndex;
        for (var j = 0; j < group.rows.length; j++) {
            var css = opts.rowStyler ? opts.rowStyler.call(target, index, group.rows[j]) : '';
            var classValue = '';
            var styleValue = '';
            if (typeof css == 'string') {
                styleValue = css;
            } else if (css) {
                classValue = css['class'] || '';
                styleValue = css['style'] || '';
            }

            var cls = 'class="datagrid-row ' + (index % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + classValue + '"';
            var style = styleValue ? 'style="' + styleValue + '"' : '';
            var rowId = state.rowIdPrefix + '-' + (frozen ? 1 : 2) + '-' + index;
            table.push('<tr id="' + rowId + '" datagrid-row-index="' + index + '" ' + cls + ' ' + style + '>');
            table.push(this.renderRow.call(this, target, fields, frozen, index, group.rows[j]));
            table.push('</tr>');
            index++;
        }
        table.push('</tbody></table>');
        return table.join('');
    },

    bindEvents: function (target) {
        var state = $.data(target, 'datagrid');
        var dc = state.dc;
        var body = dc.body1.add(dc.body2);
        var clickHandler = ($.data(body[0], 'events') || $._data(body[0], 'events')).click[0].handler;
        body.unbind('click').bind('click', function (e) {
            var tt = $(e.target);
            var expander = tt.closest('span.datagrid-row-expander');
            if (expander.length) {
                var gindex = expander.closest('div.datagrid-group').attr('group-index');
                if (expander.hasClass('datagrid-row-collapse')) {
                    $(target).datagrid('collapseGroup', gindex);
                } else {
                    $(target).datagrid('expandGroup', gindex);
                }
            } else {
                clickHandler(e);
            }
            e.stopPropagation();
        });

        //group row 添加按组选中按钮
        $("span.datagrid-group-checked input:checkbox").bind("click", function () {
            var  checkboxList=$(this).parents(".datagrid-group").next(".datagrid-btable").find("input:checkbox");
            if ($(this).attr('checked'))
            {
                checkboxList.each(
                    function (i) {
                        $(checkboxList[i]).attr("checked", true);
                    });
                
            }
          
            else {
                checkboxList.each(
                   function (i) {
                       $(checkboxList[i]).attr("checked", false);
                   });
            }
        });
        //group row 添加按组选中按钮
    },

    onBeforeRender: function (target, rows) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;

        initCss();

        var groups = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var group = getGroup(row[opts.groupField]);
            if (!group) {
                group = {
                    value: row[opts.groupField],
                    rows: [row]
                };
                groups.push(group);
            } else {
                group.rows.push(row);
            }
        }

        var index = 0;
        var newRows = [];
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            group.startIndex = index;
            index += group.rows.length;
            newRows = newRows.concat(group.rows);
        }

        state.data.rows = newRows;
        this.groups = groups;

        var that = this;
        setTimeout(function () {
            that.bindEvents(target);
        }, 0);

        function getGroup(value) {
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                if (group.value == value) {
                    return group;
                }
            }
            return null;
        }
        function initCss() {
            if (!$('#datagrid-group-style').length) {
                $('head').append(
					'<style id="datagrid-group-style">' +
					'.datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}' +
					'</style>'
				);
            }
        }
    }
});

$.extend($.fn.datagrid.methods, {
    expandGroup: function (jq, groupIndex) {
        return jq.each(function () {
            var view = $.data(this, 'datagrid').dc.view;
            var group = view.find(groupIndex != undefined ? 'div.datagrid-group[group-index="' + groupIndex + '"]' : 'div.datagrid-group');
            var expander = group.find('span.datagrid-row-expander');
            if (expander.hasClass('datagrid-row-expand')) {
                expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
                group.next('table').show();
            }
            $(this).datagrid('fixRowHeight');
        });
    },
    collapseGroup: function (jq, groupIndex) {
        return jq.each(function () {
            var view = $.data(this, 'datagrid').dc.view;
            var group = view.find(groupIndex != undefined ? 'div.datagrid-group[group-index="' + groupIndex + '"]' : 'div.datagrid-group');
            var expander = group.find('span.datagrid-row-expander');
            if (expander.hasClass('datagrid-row-collapse')) {
                expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
                group.next('table').hide();
            }
            $(this).datagrid('fixRowHeight');
        });
    }
});

$.extend(groupView, {
    refreshGroupTitle: function (target, groupIndex) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var group = this.groups[groupIndex];
        var span = dc.body2.children('div.datagrid-group[group-index=' + groupIndex + ']').find('span.datagrid-group-title');
        span.html(opts.groupFormatter.call(target, group.value, group.rows));
    },

    insertRow: function (target, index, row) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var group = null;
        var groupIndex;

        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].value == row[opts.groupField]) {
                group = this.groups[i];
                groupIndex = i;
                break;
            }
        }
        if (group) {
            if (index == undefined || index == null) {
                index = state.data.rows.length;
            }
            if (index < group.startIndex) {
                index = group.startIndex;
            } else if (index > group.startIndex + group.rows.length) {
                index = group.startIndex + group.rows.length;
            }
            $.fn.datagrid.defaults.view.insertRow.call(this, target, index, row);

            if (index >= group.startIndex + group.rows.length) {
                _moveTr(index, true);
                _moveTr(index, false);
            }
            group.rows.splice(index - group.startIndex, 0, row);
        } else {
            group = {
                value: row[opts.groupField],
                rows: [row],
                startIndex: state.data.rows.length
            }
            groupIndex = this.groups.length;
            dc.body1.append(this.renderGroup.call(this, target, groupIndex, group, true));
            dc.body2.append(this.renderGroup.call(this, target, groupIndex, group, false));
            this.groups.push(group);
            state.data.rows.push(row);
        }

        this.refreshGroupTitle(target, groupIndex);

        function _moveTr(index, frozen) {
            var serno = frozen ? 1 : 2;
            var prevTr = opts.finder.getTr(target, index - 1, 'body', serno);
            var tr = opts.finder.getTr(target, index, 'body', serno);
            tr.insertAfter(prevTr);
        }
    },

    updateRow: function (target, index, row) {
        var opts = $.data(target, 'datagrid').options;
        $.fn.datagrid.defaults.view.updateRow.call(this, target, index, row);
        var tb = opts.finder.getTr(target, index, 'body', 2).closest('table.datagrid-btable');
        var groupIndex = parseInt(tb.prev().attr('group-index'));
        this.refreshGroupTitle(target, groupIndex);
    },

    deleteRow: function (target, index) {
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var dc = state.dc;
        var body = dc.body1.add(dc.body2);

        var tb = opts.finder.getTr(target, index, 'body', 2).closest('table.datagrid-btable');
        var groupIndex = parseInt(tb.prev().attr('group-index'));

        $.fn.datagrid.defaults.view.deleteRow.call(this, target, index);

        var group = this.groups[groupIndex];
        if (group.rows.length > 1) {
            group.rows.splice(index - group.startIndex, 1);
            this.refreshGroupTitle(target, groupIndex);
        } else {
            body.children('div.datagrid-group[group-index=' + groupIndex + ']').remove();
            for (var i = groupIndex + 1; i < this.groups.length; i++) {
                body.children('div.datagrid-group[group-index=' + i + ']').attr('group-index', i - 1);
            }
            this.groups.splice(groupIndex, 1);
        }

        var index = 0;
        for (var i = 0; i < this.groups.length; i++) {
            var group = this.groups[i];
            group.startIndex = index;
            index += group.rows.length;
        }
    }
});

/**
 * 输入验证方法
 */
$.extend($.fn.validatebox.defaults.rules, {     
    socialNo : {     
        validator: function(value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },     
        message: '不是有效的身份证号码'    
    },
    minLength : { // 判断最小长度
        validator : function(value, param) {
            return value.length >= param[0];
        },
        message : '最少输入 {0} 个字符。'
    },
    length : {
        validator : function(value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
        message : "输入内容长度必须介于{0}和{1}之间."
    },
    phone : {// 验证电话号码
        validator : function(value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
                    .test(value);
        },
        message : '格式不正确,请使用下面格式:020-88888888'
    },
    cellphone : {// 验证手机号码
        validator : function(value) {
            return /^(13|15|17|18)\d{9}$/i.test(value);
        },
        message : '手机号码格式不正确'
    },
    idcard : {// 验证身份证
        validator : function(value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message : '身份证号码格式不正确'
    },
    intOrFloat : {// 验证整数或小数
        validator : function(value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message : '请输入数字，并确保格式正确'
    },
    currency : {// 验证货币
        validator : function(value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message : '货币格式不正确'
    },
    qq : {// 验证QQ,从10000开始
        validator : function(value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message : 'QQ号码格式不正确'
    },
    integer : {// 验证整数
        validator : function(value) {
            return /^[+]?[1-9]+\d*$/i.test(value);
        },
        message : '请输入整数'
    },
    chinese : {// 验证中文
        validator : function(value) {
            return /^[\u0391-\uFFE5]+$/i.test(value);
        },
        message : '请输入中文'
    },
    english : {// 验证英语
        validator : function(value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message : '只能输入英文字母'
    },
    tableName : {// 验证英语
        validator : function(value) {
        	return /^[a-zA-Z][a-zA-Z0-9_]{3,35}$/i.test(value);
        },
        message : '表名不合法（字母开头，允许4-36字节，允许字母数字下划线）'
    },
    packageName : {// 验证英语
        validator : function(value) {
        	return /^[a-zA-Z][a-zA-Z0-9.]{3,55}$/i.test(value);
        },
        message : '包名不合法（字母开头，允许4-56字节，允许字母和点）'
    },
    className : {// 验证英语
        validator : function(value) {
        	return /^[a-zA-Z][a-zA-Z0-9]{3,50}$/i.test(value);
        },
        message : '包名不合法（字母开头，允许4-50字节，允许字母和数字）'
    },
    unnormal : {// 验证是否包含空格和非法字符
        validator : function(value) {
            return /.+/i.test(value);
        },
        message : '输入值不能为空和包含其他非法字符'
    },
    username : {// 验证用户名
        validator : function(value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno : {// 验证传真
        validator : function(value) {
            // return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[
            // ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
                    .test(value);
        },
        message : '传真号码不正确'
    },
    zip : {// 验证邮政编码
        validator : function(value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message : '邮政编码格式不正确'
    },
    ip : {// 验证IP地址
        validator : function(value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message : 'IP地址格式不正确'
    },
    name : {// 验证姓名，可以是中文或英文
        validator : function(value) {
            return /^[\u0391-\uFFE5]+$/i.test(value)
                    | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message : '请输入姓名'
    },
    carNo : {
        validator : function(value) {
            return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value);
        },
        message : '车牌号码无效（例：粤J12350）'
    },
    carenergin : {
        validator : function(value) {
            return /^[a-zA-Z0-9]{16}$/.test(value);
        },
        message : '发动机型号无效(例：FG6H012345654584)'
    },
    email : {
        validator : function(value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                    .test(value);
        },
        message : '请输入有效的电子邮件账号(例：abc@126.com)'
    },
    msn : {
        validator : function(value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                    .test(value);
        },
        message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    password:
    {
        validator: function(value, param)
        {
            var other = $(param[0]).val();
            return value == other;
        },
        message: "两次密码不一致"
    },
    password_rule:
    {
        validator: function(value, param)
        {
            return /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,50}$/
                    .test(value);
        },
        message: "密码不合法（至少6位，必须有字母和数字）"
    },
    img_upload:
    {
        validator: function(value, param)
        {
            var ext = value.substring(value.lastIndexOf(".")+1);
            return /(jpg|jpeg|gif|bmp|png)/i
                    .test(ext);
        },
        message: "只允许上传jpg、gif、png、bmp格式的图片"
    }
}); 
