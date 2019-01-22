$.AmsLink = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsLink_master").length>0){
            if ($("#amsLink_master").panel("options").region=="north"){
                $("#amsLink_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsLink_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#doMode").length>0&&$("#doMode").val()!=""){
            autoQuery = true;
            if ($("#amsLink_DoMode").length>0){
                $("#amsLink_DoMode").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLink_DoMode"),$("#doMode").val());
            }
        }
        if ($("#doFunction").length>0&&$("#doFunction").val()!=""){
            autoQuery = true;
            if ($("#amsLink_DoFunction").length>0){
                $("#amsLink_DoFunction").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLink_DoFunction"),$("#doFunction").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLink_DoMode"))!=""){
            autoQuery = true;
            if ($("#amsLink_DoMode").length>0){
                $("#amsLink_DoMode").parent().hide();
            }
            grid = $('#AmsLinkGrid');
            if (grid.datagrid("getColumnOption","doMode")!=null){
                grid.datagrid("getColumnOption","doMode").hidden = true;
                if (grid.datagrid("getColumnOption","doModeShowLabel")!=null){
                    grid.datagrid("getColumnOption","doModeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLink_LinkName"))!=""){
            autoQuery = true;
            if ($("#amsLink_LinkName").length>0){
                $("#amsLink_LinkName").parent().hide();
            }
            grid = $('#AmsLinkGrid');
            if (grid.datagrid("getColumnOption","linkName")!=null){
                grid.datagrid("getColumnOption","linkName").hidden = true;
                if (grid.datagrid("getColumnOption","linkNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","linkNameShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsLinkGridPage').length>0){
            $.totemUtils.setHeight($('#AmsLinkGridPage'));
        }
        if (autoQuery){
            $.AmsLink.search($('#AmsLinkGrid'));
        }

        $("#AmsLinkForm #doMode").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('DO_MODE')
        });

        $.totemUtils.getMutliCheck("#amsLink_DoFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'amsLink_DoFunction','codeValue','codeLabel');
    },
    setAuth : function(id){},onChange:function(parent,data){
        if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
            if (!$.t_workflow.onChange("AmsLink_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#doMode").length>0&&$("#doMode").val()!=""){
            actionType += "&amsLink_DoMode="+$("#doMode").val();
        }
        if ($("#doFunction").length>0&&$("#doFunction").val()!=""){
            actionType += "&amsLink_DoFunction="+$("#doFunction").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsLink.currentGrid = grid;
        $.AmsLink.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsLinkWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsLinkWindow').length>0){
            win = parent.$('#AmsLinkWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsLink.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amslink/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增流程环节"
        });
    },
    edit : function(grid) {
        $.AmsLink.actionType="edit";
        $.AmsLink.openEdit(grid,"更新流程环节","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsLink.actionType="edit";
        $.AmsLink.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsLink.actionType="view";
        $.AmsLink.openEdit(grid,"查看流程环节","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsLink.currentGrid = grid;
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
        var row = rows[0];
        if (row) {
            var win = $('#AmsLinkWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsLinkWindow').length>0){
                win = parent.$('#AmsLinkWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'workflow/amslink/edit/'+row.amsWorkflowId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsLink.currentGrid = grid;
        $.AmsLink.actionType="copy";
        $.AmsLink.openEdit(grid,"复制一个新的",$.AmsLink.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '信息删除，不可恢复！', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsWorkflowId);
                    }
                    $.post(_appsite + 'workflow/amslink/deletes', {
                        "amsWorkflowIds" : ids
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
            grid = $('#AmsLinkGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amslink/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsLinkGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amslink/query";
                }
                var paras = $.AmsLinkGrid.queryParams(grid);
                $.AmsLink.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsLinkWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsLinkWindow').length>0){
            win = parent.$('#AmsLinkWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amslink/importExcel'+$.AmsLink.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "流程环节导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsLinkIframeDom = $("#AmsLinkIframeDomIfile");
            if(AmsLinkIframeDom && AmsLinkIframeDom.length==0){
                $("body").append("<iframe id='AmsLinkIframeDomIfile' style='display:none'></iframe>");
                AmsLinkIframeDom = $("#AmsLinkIframeDomIfile");
            }
            AmsLinkIframeDom.attr("src","");
            var url= _appsite+"workflow/amslink/exportAuthAll?"+$.param($.AmsLinkGrid.queryParams(grid));
            AmsLinkIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsLinkMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsLinkMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsLink_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsLinkGrid').length>0){
        $('#AmsLinkGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
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
                    if ($.AmsLink.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsLink.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsLink.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsLink.selected){
                    $(this).datagrid("selectRow",$.AmsLink.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsWorkflowId == $.AmsLink.selectRow){
                    return;
                }
                if ($('#AmsLinkMemberTabs').length>0){
                    if ($('#AmsLinkMemberTabs').tabs("tabs").length>1){
                        $('#AmsLinkMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsLinkMemberTabs').outerHeight() - 30;
                if ((!$.AmsLink.selectRow)&&$("#amsLink_master").length>0){
                    if ($("#amsLink_master").panel("options").region=="north"){
                        $("#amsLink_master").panel("resize",{height:300});
                    }else{
                        $("#amsLink_master").panel("resize",{width:400});
                    }
                }
                $.AmsLink.selectRow = row.amsWorkflowId;

            },
            columns:$.AmsLinkGrid.column

        });

    }

    $("#amsLink_DoMode").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsLink.onChange("doMode",record);
            }
        }
    });

    if ($("#AmsLinkMemberTabs").length>0){
        $("#AmsLinkMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsLink.updateTab($('#AmsLinkMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsLinkMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsLink.updateTab(tab);
                }
            }
        })
    }
    $.AmsLink.init();
})