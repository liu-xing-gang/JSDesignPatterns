$.AmsApproval = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($('#AmsApprovalGridPage').length>0){
            $.totemUtils.setHeight($('#AmsApprovalGridPage'));
        }
        if (autoQuery){
            $.AmsApproval.search($('#AmsApprovalGrid'));
        }
    },

    getPara : function(actionType){
        return actionType;
    },
    create : function(grid) {
        $.AmsApproval.currentGrid = grid;
        $.AmsApproval.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsApprovalWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsApprovalWindow').length>0){
            win = parent.$('#AmsApprovalWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsApproval.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsapproval/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增待办审批"
        });
    },
    edit : function(grid) {
        $.AmsApproval.actionType="edit";
        $.AmsApproval.openEdit(grid,"更新待办审批","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsApproval.actionType="edit";
        $.AmsApproval.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsApproval.actionType="view";
        $.AmsApproval.openEdit(grid,"查看待办审批","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsApproval.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个待办审批进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个待办审批进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsApprovalWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsApprovalWindow').length>0){
                win = parent.$('#AmsApprovalWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'personal/amsapproval/edit/'+row.amsApprovalId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsApproval.currentGrid = grid;
        $.AmsApproval.actionType="copy";
        $.AmsApproval.openEdit(grid,"复制一个新的",$.AmsApproval.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的待办审批将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsApprovalId);
                    }
                    $.post(_appsite + 'personal/amsapproval/deletes', {
                        "amsApprovalIds" : ids
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
        if (!grid){
            grid = $('#AmsApprovalGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsapproval/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsApprovalGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsapproval/query";
                }
                var paras = $.AmsApprovalGrid.queryParams(grid);
                $.AmsApproval.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsApprovalWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsApprovalWindow').length>0){
            win = parent.$('#AmsApprovalWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsapproval/importExcel'+$.AmsApproval.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "待办审批导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsApprovalIframeDom = $("#AmsApprovalIframeDomIfile");
            if(AmsApprovalIframeDom && AmsApprovalIframeDom.length==0){
                $("body").append("<iframe id='AmsApprovalIframeDomIfile' style='display:none'></iframe>");
                AmsApprovalIframeDom = $("#AmsApprovalIframeDomIfile");
            }
            AmsApprovalIframeDom.attr("src","");
            var url= _appsite+"personal/amsapproval/exportAuthAll?"+$.param($.AmsApprovalGrid.queryParams(grid));
            AmsApprovalIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
            if (!$.t_personal.onChange("AmsApproval_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsApprovalGrid').length>0){
        $('#AmsApprovalGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_personal.onClickRow("AmsApproval",row)){
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
                    if ($.AmsApproval.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsApproval.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsApproval.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsApproval.selected){
                    $(this).datagrid("selectRow",$.AmsApproval.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsApprovalId == $.AmsApproval.selectRow){
                    return;
                }
                if ((!$.AmsApproval.selectRow)&&$("#amsApproval_master").length>0){
                    if ($("#amsApproval_master").panel("options").region=="north"){
                        $("#amsApproval_master").panel("resize",{height:300});
                    }else{
                        $("#amsApproval_master").panel("resize",{width:400});
                    }
                }
                $.AmsApproval.selectRow = row.amsApprovalId;

            },
            columns:$.AmsApprovalGrid.column

        });

    }

    $.AmsApproval.init();
    document.body.style.visibility = 'visible';
})