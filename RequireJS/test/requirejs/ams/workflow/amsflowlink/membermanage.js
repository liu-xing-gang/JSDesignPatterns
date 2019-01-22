$.AmsFlowLink = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsFlowLink_master").length>0){
            if ($("#amsFlowLink_master").panel("options").region=="north"){
                $("#amsFlowLink_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsFlowLink_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#amsWorkflowId").length>0&&$("#amsWorkflowId").val()!=""){
            autoQuery = true;
            if ($("#amsFlowLink_AmsWorkflowId").length>0){
                $("#amsFlowLink_AmsWorkflowId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFlowLink_AmsWorkflowId"),$("#amsWorkflowId").val());
            }
        }
        if ($("#doUser").length>0&&$("#doUser").val()!=""){
            autoQuery = true;
            if ($("#amsFlowLink_DoUser").length>0){
                $("#amsFlowLink_DoUser").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFlowLink_DoUser"),$("#doUser").val());
            }
        }
        if ($("#doFunction").length>0&&$("#doFunction").val()!=""){
            autoQuery = true;
            if ($("#amsFlowLink_DoFunction").length>0){
                $("#amsFlowLink_DoFunction").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFlowLink_DoFunction"),$("#doFunction").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFlowLink_LinkName"))!=""){
            autoQuery = true;
            if ($("#amsFlowLink_LinkName").length>0){
                $("#amsFlowLink_LinkName").parent().hide();
            }
            grid = $('#AmsFlowLinkGrid');
            if (grid.datagrid("getColumnOption","linkName")!=null){
                grid.datagrid("getColumnOption","linkName").hidden = true;
                if (grid.datagrid("getColumnOption","linkNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","linkNameShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsFlowLinkGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFlowLinkGridPage'));
        }
        if (autoQuery){
            $.AmsFlowLink.search($('#AmsFlowLinkGrid'));
        }

        $("#AmsFlowLinkForm #doUser").combobox({
            valueField :"userId",
            textField:"userLogin",
            data:$.totemUtils.getJson('common/sysuser/queryAuthAll','get')
        });

        $.totemUtils.getMutliCheck("#amsFlowLink_DoFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'amsFlowLink_DoFunction','codeValue','codeLabel');
    },
    setAuth : function(id){},onChange:function(parent,data){
        if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
            if (!$.t_workflow.onChange("AmsFlowLink_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#amsWorkflowId").length>0&&$("#amsWorkflowId").val()!=""){
            actionType += "&amsFlowLink_AmsWorkflowId="+$("#amsWorkflowId").val();
        }
        if ($("#doUser").length>0&&$("#doUser").val()!=""){
            actionType += "&amsFlowLink_DoUser="+$("#doUser").val();
        }
        if ($("#doFunction").length>0&&$("#doFunction").val()!=""){
            actionType += "&amsFlowLink_DoFunction="+$("#doFunction").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsFlowLink.currentGrid = grid;
        $.AmsFlowLink.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsFlowLinkWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFlowLinkWindow').length>0){
            win = parent.$('#AmsFlowLinkWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsFlowLink.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsflowlink/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增流程环节"
        });
    },
    edit : function(grid) {
        $.AmsFlowLink.actionType="edit";
        $.AmsFlowLink.openEdit(grid,"更新流程环节","?actionType=edit");
    },
    addLink : function(grid) {
        $.AmsFlowLink.actionType="edit";
        $.AmsFlowLink.openEdit(grid,"添加流程","?actionType=edit&&func=AddLink");
    },
    view : function(grid) {
        $.AmsFlowLink.actionType="view";
        $.AmsFlowLink.openEdit(grid,"查看流程环节","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsFlowLink.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个流程环节进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个流程环节进行'+title});
                return;
            }
            id = rows[0].amsFlowLinkId
        }else{
            id = "null";
        }
        var win = $('#AmsFlowLinkWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFlowLinkWindow').length>0){
            win = parent.$('#AmsFlowLinkWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsflowlink/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },
    copy : function(grid) {
        $.AmsFlowLink.currentGrid = grid;
        $.AmsFlowLink.actionType="copy";
        $.AmsFlowLink.openEdit(grid,"复制一个新的",$.AmsFlowLink.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的流程环节将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsFlowLinkId);
                    }
                    $.post(_appsite + 'workflow/amsflowlink/deletes', {
                        "amsFlowLinkIds" : ids
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
            grid = $('#AmsFlowLinkGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amsflowlink/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsFlowLinkGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amsflowlink/query";
                }
                var paras = $.AmsFlowLinkGrid.queryParams(grid);
                $.AmsFlowLink.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsFlowLinkWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFlowLinkWindow').length>0){
            win = parent.$('#AmsFlowLinkWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsflowlink/importExcel'+$.AmsFlowLink.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "流程环节导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsFlowLinkIframeDom = $("#AmsFlowLinkIframeDomIfile");
            if(AmsFlowLinkIframeDom && AmsFlowLinkIframeDom.length==0){
                $("body").append("<iframe id='AmsFlowLinkIframeDomIfile' style='display:none'></iframe>");
                AmsFlowLinkIframeDom = $("#AmsFlowLinkIframeDomIfile");
            }
            AmsFlowLinkIframeDom.attr("src","");
            var url= _appsite+"workflow/amsflowlink/exportAuthAll?"+$.param($.AmsFlowLinkGrid.queryParams(grid));
            AmsFlowLinkIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsFlowLinkMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsFlowLink_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsFlowLinkGrid').length>0){
        $('#AmsFlowLinkGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_workflow.onClickRow("AmsFlowLink",row)){
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
                    if ($.AmsFlowLink.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsFlowLink.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsFlowLink.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsFlowLink.selected){
                    $(this).datagrid("selectRow",$.AmsFlowLink.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsFlowLinkId == $.AmsFlowLink.selectRow){
                    return;
                }
                if ((!$.AmsFlowLink.selectRow)&&$("#amsFlowLink_master").length>0){
                    if ($("#amsFlowLink_master").panel("options").region=="north"){
                        $("#amsFlowLink_master").panel("resize",{height:300});
                    }else{
                        $("#amsFlowLink_master").panel("resize",{width:400});
                    }
                }
                $.AmsFlowLink.selectRow = row.amsFlowLinkId;

            },
            columns:$.AmsFlowLinkGrid.column

        });

    }

    $.AmsFlowLink.init();
    document.body.style.visibility = 'visible';
})