$.CtrlTable = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = true;
        if ($('#CtrlTableGridPage').length>0){
            $.totemUtils.setHeight($('#CtrlTableGridPage'));
        }
        if (autoQuery){
            $.CtrlTable.search($('#CtrlTableGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("CtrlTable_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        return actionType;
    },
    create : function(grid) {
        $.CtrlTable.currentGrid = grid;
        $.CtrlTable.actionType="create";
        parent.currentGrid=grid;
        var win = $('#CtrlTableWindow');
        var height = document.body.clientHeight;
        if (parent.$('#CtrlTableWindow').length>0){
            win = parent.$('#CtrlTableWindow');
            height = parent.innerHeight;
        }
        var actionType = $.CtrlTable.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/ctrltable/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增中间通信表"
        });
    },
    edit : function(grid) {
        $.CtrlTable.actionType="edit";
        $.CtrlTable.openEdit(grid,"更新中间通信表","?actionType=edit");
    },
    view : function(grid) {
        $.CtrlTable.actionType="view";
        $.CtrlTable.openEdit(grid,"查看中间通信表","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.CtrlTable.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个中间通信表进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个中间通信表进行'+title});
                return;
            }
            id = rows[0].id
        }else{
            id = "null";
        }
        var win = $('#CtrlTableWindow');
        var height = document.body.clientHeight;
        if (parent.$('#CtrlTableWindow').length>0){
            win = parent.$('#CtrlTableWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/ctrltable/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#CtrlTableWindow');
        var height = document.body.clientHeight;
        if (parent.$('#CtrlTableWindow').length>0){
            win = parent.$('#CtrlTableWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/ctrltable/importExcel'+$.CtrlTable.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "中间通信表导入"
        });
    },
    copy : function(grid) {
        $.CtrlTable.currentGrid = grid;
        $.CtrlTable.actionType="copy";
        $.CtrlTable.openEdit(grid,"复制一个新的",$.CtrlTable.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的中间通信表将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].id);
                    }
                    $.post(_appsite + 'cfg/ctrltable/deletes', {
                        "ids" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.show({title : '信息提示',msg : '删除成功'});
                            if (grid.selector.indexOf("Tree")>0){
                                grid.treegrid("reload");
                            }else{
                                grid.datagrid('reload');
                            }
                        } else {
                            $.messager.show({
                                title : 'Error',
                                msg : result.msg
                            });
                        }
                    }, 'json');
                }
            });
        }
    },search : function(grid){
        var paras = $.CtrlTableGrid.queryParams(grid);
        if (!grid){
            grid = $('#CtrlTableGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/ctrltable/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/ctrltable/query";
                }
                $.CtrlTable.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var CtrlTableIframeDom = $("#CtrlTableIframeDomIfile");
            if(CtrlTableIframeDom && CtrlTableIframeDom.length==0){
                $("body").append("<iframe id='CtrlTableIframeDomIfile' style='display:none'></iframe>");
                CtrlTableIframeDom = $("#CtrlTableIframeDomIfile");
            }
            CtrlTableIframeDom.attr("src","");
            var url= _appsite+"cfg/ctrltable/exportAuthAll?"+$.param($.CtrlTableGrid.queryParams(grid));
            CtrlTableIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#CtrlTableGrid').length>0){
        $('#CtrlTableGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.CtrlTable.selected){
                    $(this).datagrid("selectRow",$.CtrlTable.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("CtrlTable",row)){
                    return;
                }

                var beforeIndex = selectIndexs.firstSelectRowIndex;
                if(index!=selectIndexs.firstSelectRowIndex&&!inputFlags.isShiftDown){
                    selectIndexs.firstSelectRowIndex=index; //alert('firstSelectRowIndex, sfhit = ' + index);
                }
                if(inputFlags.isShiftDown||inputFlags.isCtrlDown){
                    $(this).datagrid('options').singleSelect = false;
                    if (inputFlags.isCtrlDown){
                        return;
                    }
                    selectIndexs.lastSelectRowIndex=index;
                    var tempIndex=0;
                    if(selectIndexs.firstSelectRowIndex>selectIndexs.lastSelectRowIndex){
                        tempIndex=selectIndexs.firstSelectRowIndex;
                        selectIndexs.firstSelectRowIndex=selectIndexs.lastSelectRowIndex;
                        selectIndexs.lastSelectRowIndex=tempIndex;
                    }
                    for(var i=selectIndexs.firstSelectRowIndex;i<=selectIndexs.lastSelectRowIndex;i++){
                        $(this).datagrid('selectRow',i);
                    }
                    return;
                }else{
                    if ($.CtrlTable.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.CtrlTable.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.CtrlTable.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.id == $.CtrlTable.selectRow){
                    return;
                }
                if ((!$.CtrlTable.selectRow)&&$("#ctrlTable_master").length>0){
                    if ($("#ctrlTable_master").panel("options").region=="north"){
                        $("#ctrlTable_master").panel("resize",{height:300});
                    }else{
                        $("#ctrlTable_master").panel("resize",{width:400});
                    }
                }
                $.CtrlTable.selectRow = row.id;

            },
            columns:$.CtrlTableGrid.column

        });

    }

    if ($('#CtrlTableWindow').length>0){
        $('#CtrlTableWindow').window({
            closed:true,
            onClose:function () {
                $.CtrlTable.search($("#CtrlTableGrid"));
            }
        })
    }
    $.CtrlTable.init();
    document.body.style.visibility = 'visible';
})