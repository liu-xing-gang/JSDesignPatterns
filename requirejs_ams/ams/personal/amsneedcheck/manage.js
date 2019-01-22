$.AmsNeedCheck = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_BorrowType").length>0){
                $("#amsNeedCheck_BorrowType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsNeedCheck_BorrowType"),$("#borrowType").val());
            }
        }
        if ($("#userType").length>0&&$("#userType").val()!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_UserType").length>0){
                $("#amsNeedCheck_UserType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsNeedCheck_UserType"),$("#userType").val());
            }
        }
        if ($("#checkResult").length>0&&$("#checkResult").val()!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_CheckResult").length>0){
                $("#amsNeedCheck_CheckResult").parent().hide();
                $.totemUtils.setPropertyValue($("#amsNeedCheck_CheckResult"),$("#checkResult").val());
            }
        }
        if ($("#isCheck").length>0&&$("#isCheck").val()!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_IsCheck").length>0){
                $("#amsNeedCheck_IsCheck").parent().hide();
                $.totemUtils.setPropertyValue($("#amsNeedCheck_IsCheck"),$("#isCheck").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsNeedCheck_ReturnTime"))!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_ReturnTime").length>0){
                $("#amsNeedCheck_ReturnTime").parent().hide();
            }
            grid = $('#AmsNeedCheckGrid');
            if (grid.datagrid("getColumnOption","returnTime")!=null){
                grid.datagrid("getColumnOption","returnTime").hidden = true;
                if (grid.datagrid("getColumnOption","returnTimeShowLabel")!=null){
                    grid.datagrid("getColumnOption","returnTimeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsNeedCheck_AmsOuter"))!=""){
            autoQuery = true;
            if ($("#amsNeedCheck_AmsOuter").length>0){
                $("#amsNeedCheck_AmsOuter").parent().hide();
            }
            grid = $('#AmsNeedCheckGrid');
            if (grid.datagrid("getColumnOption","amsOuter")!=null){
                grid.datagrid("getColumnOption","amsOuter").hidden = true;
                if (grid.datagrid("getColumnOption","amsOuterShowLabel")!=null){
                    grid.datagrid("getColumnOption","amsOuterShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsNeedCheckGridPage').length>0){
            $.totemUtils.setHeight($('#AmsNeedCheckGridPage'));
        }
        if (autoQuery){
            $.AmsNeedCheck.search($('#AmsNeedCheckGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
            if (!$.t_personal.onChange("AmsNeedCheck_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            actionType += "&amsNeedCheck_BorrowType="+$("#borrowType").val();
        }
        if ($("#userType").length>0&&$("#userType").val()!=""){
            actionType += "&amsNeedCheck_UserType="+$("#userType").val();
        }
        if ($("#checkResult").length>0&&$("#checkResult").val()!=""){
            actionType += "&amsNeedCheck_CheckResult="+$("#checkResult").val();
        }
        if ($("#isCheck").length>0&&$("#isCheck").val()!=""){
            actionType += "&amsNeedCheck_IsCheck="+$("#isCheck").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsNeedCheck.currentGrid = grid;
        $.AmsNeedCheck.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsNeedCheckWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsNeedCheckWindow').length>0){
            win = parent.$('#AmsNeedCheckWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsNeedCheck.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsneedcheck/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增待办审批档案"
        });
    },
    edit : function(grid) {
        $.AmsNeedCheck.actionType="edit";
        $.AmsNeedCheck.openEdit(grid,"更新待办审批档案","?actionType=edit");
    },
    amsShenpi : function(grid) {
        $.AmsNeedCheck.actionType="audit";
        $.AmsNeedCheck.openEdit(grid,"审批","?actionType=audit&&func=AmsShenpi");
    },
    view : function(grid) {
        $.AmsNeedCheck.actionType="view";
        $.AmsNeedCheck.openEdit(grid,"查看待办审批档案","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsNeedCheck.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个待办审批档案进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个待办审批档案进行'+title});
                return;
            }
            id = rows[0].amsNeekCheckId
        }else{
            id = "null";
        }
        var win = $('#AmsNeedCheckWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsNeedCheckWindow').length>0){
            win = parent.$('#AmsNeedCheckWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsneedcheck/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsNeedCheck.currentGrid = grid;
        }
        var win = $('#AmsNeedCheckWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsNeedCheckWindow').length>0){
            win = parent.$('#AmsNeedCheckWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsneedcheck/importExcel'+$.AmsNeedCheck.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "待办审批档案导入"
        });
    },
    copy : function(grid) {
        $.AmsNeedCheck.currentGrid = grid;
        $.AmsNeedCheck.actionType="copy";
        $.AmsNeedCheck.openEdit(grid,"复制一个新的",$.AmsNeedCheck.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的待办审批档案将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsNeekCheckId);
                    }
                    $.post(_appsite + 'personal/amsneedcheck/deletes', {
                        "amsNeekCheckIds" : ids
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
        var paras = $.AmsNeedCheckGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsNeedCheckGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsneedcheck/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsneedcheck/query";
                }
                $.AmsNeedCheck.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsNeedCheckIframeDom = $("#AmsNeedCheckIframeDomIfile");
            if(AmsNeedCheckIframeDom && AmsNeedCheckIframeDom.length==0){
                $("body").append("<iframe id='AmsNeedCheckIframeDomIfile' style='display:none'></iframe>");
                AmsNeedCheckIframeDom = $("#AmsNeedCheckIframeDomIfile");
            }
            AmsNeedCheckIframeDom.attr("src","");
            var url= _appsite+"personal/amsneedcheck/exportAuthAll?"+$.param($.AmsNeedCheckGrid.queryParams(grid));
            AmsNeedCheckIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsNeedCheckGrid').length>0){
        $('#AmsNeedCheckGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsNeedCheck.selected){
                    $(this).datagrid("selectRow",$.AmsNeedCheck.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_personal.onClickRow("AmsNeedCheck",row)){
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
                    if ($.AmsNeedCheck.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsNeedCheck.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsNeedCheck.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsNeekCheckId == $.AmsNeedCheck.selectRow){
                    return;
                }
                if ((!$.AmsNeedCheck.selectRow)&&$("#amsNeedCheck_master").length>0){
                    if ($("#amsNeedCheck_master").panel("options").region=="north"){
                        $("#amsNeedCheck_master").panel("resize",{height:300});
                    }else{
                        $("#amsNeedCheck_master").panel("resize",{width:400});
                    }
                }
                $.AmsNeedCheck.selectRow = row.amsNeekCheckId;

            },
            columns:$.AmsNeedCheckGrid.column

        });

    }

    if ($('#AmsNeedCheckWindow').length>0){
        $('#AmsNeedCheckWindow').window({
            closed:true,
            onClose:function () {
                $.AmsNeedCheck.search($("#AmsNeedCheckGrid"));
            }
        })
    }
    $.AmsNeedCheck.init();
    document.body.style.visibility = 'visible';
})