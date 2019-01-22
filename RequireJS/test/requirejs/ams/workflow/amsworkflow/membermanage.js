$.AmsWorkflow = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    AmsFlowLinkAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsWorkflow_master").length>0){
            if ($("#amsWorkflow_master").panel("options").region=="north"){
                $("#amsWorkflow_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsWorkflow_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#flowType").length>0&&$("#flowType").val()!=""){
            autoQuery = true;
            if ($("#amsWorkflow_FlowType").length>0){
                $("#amsWorkflow_FlowType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsWorkflow_FlowType"),$("#flowType").val());
            }
        }
        if ($("#flowScope").length>0&&$("#flowScope").val()!=""){
            autoQuery = true;
            if ($("#amsWorkflow_FlowScope").length>0){
                $("#amsWorkflow_FlowScope").parent().hide();
                $.totemUtils.setPropertyValue($("#amsWorkflow_FlowScope"),$("#flowScope").val());
            }
        }
        if ($("#isUsed").length>0&&$("#isUsed").val()!=""){
            autoQuery = true;
            if ($("#amsWorkflow_IsUsed").length>0){
                $("#amsWorkflow_IsUsed").parent().hide();
                $.totemUtils.setPropertyValue($("#amsWorkflow_IsUsed"),$("#isUsed").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsWorkflow_FlowType"))!=""){
            autoQuery = true;
            if ($("#amsWorkflow_FlowType").length>0){
                $("#amsWorkflow_FlowType").parent().hide();
            }
            grid = $('#AmsWorkflowGrid');
            if (grid.datagrid("getColumnOption","flowType")!=null){
                grid.datagrid("getColumnOption","flowType").hidden = true;
                if (grid.datagrid("getColumnOption","flowTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","flowTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsWorkflow_FlowName"))!=""){
            autoQuery = true;
            if ($("#amsWorkflow_FlowName").length>0){
                $("#amsWorkflow_FlowName").parent().hide();
            }
            grid = $('#AmsWorkflowGrid');
            if (grid.datagrid("getColumnOption","flowName")!=null){
                grid.datagrid("getColumnOption","flowName").hidden = true;
                if (grid.datagrid("getColumnOption","flowNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","flowNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsWorkflow_FlowScope"))!=""){
            autoQuery = true;
            if ($("#amsWorkflow_FlowScope").length>0){
                $("#amsWorkflow_FlowScope").parent().hide();
            }
            grid = $('#AmsWorkflowGrid');
            if (grid.datagrid("getColumnOption","flowScope")!=null){
                grid.datagrid("getColumnOption","flowScope").hidden = true;
                if (grid.datagrid("getColumnOption","flowScopeShowLabel")!=null){
                    grid.datagrid("getColumnOption","flowScopeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsWorkflowGridPage').length>0){
            $.totemUtils.setHeight($('#AmsWorkflowGridPage'));
        }
        if (autoQuery){
            $.AmsWorkflow.search($('#AmsWorkflowGrid'));
        }

        if ($('#AmsFlowLinkMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFlowLinkMemberGridPage'));
        }

        if ($('#AmsFlowLinkMemberGrid').length>0){
            $('#AmsFlowLinkMemberGrid').datagrid({
                columns:$.AmsFlowLinkGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        $("#AmsWorkflowForm #flowType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('FLOW_TYPE')
        });

        $("#AmsWorkflowForm #flowScope").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('PROCESS_RANGE')
        });

        $("#AmsWorkflowForm #isUsed").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('IS_USE')
        });

    },
    setAuth : function(id){
        var items = $("#AmsFlowLinkMemberActionItem").children();
        for (i=0;i<items.length;i++){
            $("#"+items[i].id).show();
        }
    },onChange:function(parent,data){
        if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
            if (!$.t_workflow.onChange("AmsWorkflow_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#flowType").length>0&&$("#flowType").val()!=""){
            actionType += "&amsWorkflow_FlowType="+$("#flowType").val();
        }
        if ($("#flowScope").length>0&&$("#flowScope").val()!=""){
            actionType += "&amsWorkflow_FlowScope="+$("#flowScope").val();
        }
        if ($("#isUsed").length>0&&$("#isUsed").val()!=""){
            actionType += "&amsWorkflow_IsUsed="+$("#isUsed").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsWorkflow.currentGrid = grid;
        $.AmsWorkflow.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsWorkflowWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsWorkflowWindow').length>0){
            win = parent.$('#AmsWorkflowWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsWorkflow.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsworkflow/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增流程设置"
        });
    },
    edit : function(grid) {
        $.AmsWorkflow.actionType="edit";
        $.AmsWorkflow.openEdit(grid,"更新流程设置","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsWorkflow.actionType="edit";
        $.AmsWorkflow.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsWorkflow.actionType="view";
        $.AmsWorkflow.openEdit(grid,"查看流程设置","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsWorkflow.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个流程设置进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个流程设置进行'+title});
                return;
            }
            id = rows[0].amsWorkflowId
        }else{
            id = "null";
        }
        var win = $('#AmsWorkflowWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsWorkflowWindow').length>0){
            win = parent.$('#AmsWorkflowWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsworkflow/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },
    copy : function(grid) {
        $.AmsWorkflow.currentGrid = grid;
        $.AmsWorkflow.actionType="copy";
        $.AmsWorkflow.openEdit(grid,"复制一个新的",$.AmsWorkflow.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的流程设置将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsWorkflowId);
                    }
                    $.post(_appsite + 'workflow/amsworkflow/deletes', {
                        "amsWorkflowIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员流程环节？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"workflow/amsflowlink/deletes",{amsWorkflowIds:ids},"json");
                                }});
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
            grid = $('#AmsWorkflowGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amsworkflow/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsWorkflowGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"workflow/amsworkflow/query";
                }
                var paras = $.AmsWorkflowGrid.queryParams(grid);
                $.AmsWorkflow.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsWorkflowWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsWorkflowWindow').length>0){
            win = parent.$('#AmsWorkflowWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'workflow/amsworkflow/importExcel'+$.AmsWorkflow.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "流程设置导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsWorkflowIframeDom = $("#AmsWorkflowIframeDomIfile");
            if(AmsWorkflowIframeDom && AmsWorkflowIframeDom.length==0){
                $("body").append("<iframe id='AmsWorkflowIframeDomIfile' style='display:none'></iframe>");
                AmsWorkflowIframeDom = $("#AmsWorkflowIframeDomIfile");
            }
            AmsWorkflowIframeDom.attr("src","");
            var url= _appsite+"workflow/amsworkflow/exportAuthAll?"+$.param($.AmsWorkflowGrid.queryParams(grid));
            AmsWorkflowIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsWorkflowMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsWorkflowMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsWorkflow_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsFlowLinkFrame").length>0){
                tab = $('#AmsWorkflowMemberTabs').tabs('getTab',"流程环节");
                $("#AmsFlowLinkFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsFlowLinkFrame").contentWindow.$("#AmsFlowLinkGridPage"));
            }
        }
    })
    if ($('#AmsWorkflowGrid').length>0){
        $('#AmsWorkflowGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_workflow.onClickRow("AmsWorkflow",row)){
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
                    if ($.AmsWorkflow.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsWorkflow.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsWorkflow.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsWorkflow.selected){
                    $(this).datagrid("selectRow",$.AmsWorkflow.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsWorkflowId == $.AmsWorkflow.selectRow){
                    return;
                }
                if ($('#AmsWorkflowMemberTabs').length>0){
                    if ($('#AmsWorkflowMemberTabs').tabs("tabs").length>1){
                        $('#AmsWorkflowMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsWorkflowMemberTabs').outerHeight();
                if ($('#AmsWorkflowMemberTabs').tabs('exists',"流程环节")){
                    var tab = $('#AmsWorkflowMemberTabs').tabs('getTab',"流程环节");
                    tab.css("height",height+3);
                    var para = "?amsWorkflowId="+row.amsWorkflowId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsWorkflowMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"workflow/amsflowlink"+para,
                            id:"AmsFlowLink"
                        }
                    });
                }
                if ((!$.AmsWorkflow.selectRow)&&$("#amsWorkflow_master").length>0){
                    if ($("#amsWorkflow_master").panel("options").region=="north"){
                        $("#amsWorkflow_master").panel("resize",{height:300});
                    }else{
                        $("#amsWorkflow_master").panel("resize",{width:400});
                    }
                }
                $.AmsWorkflow.selectRow = row.amsWorkflowId;

            },
            columns:$.AmsWorkflowGrid.column

        });

    }

    $("#amsWorkflow_FlowType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsWorkflow.onChange("flowType",record);
            }
        }
    });

    $("#amsWorkflow_FlowScope").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsWorkflow.onChange("flowScope",record);
            }
        }
    });

    if ($("#AmsWorkflowMemberTabs").length>0){
        $("#AmsWorkflowMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsWorkflow.updateTab($('#AmsWorkflowMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsWorkflowMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsWorkflow.updateTab(tab);
                }
            }
        })
    }
    $.AmsWorkflow.init();
    document.body.style.visibility = 'visible';
})