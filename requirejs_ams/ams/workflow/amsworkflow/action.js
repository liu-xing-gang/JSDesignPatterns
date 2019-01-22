function saveAmsWorkflow() {
    $("#amsWorkflowSave").hide();
    var grid = undefined;
    if (parent.$.AmsWorkflow){
        grid = parent.$.AmsWorkflow.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsWorkflowId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsWorkflowForm").serialize();
        $.post(_appsite + "workflow/amsworkflow/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsWorkflowWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsWorkflowSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsWorkflowForm").form("submit", {
            url : _appsite + "workflow/amsworkflow/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (grid){
                            if (grid.selector.indexOf("Tree")>0){
                                grid.treegrid("reload");
                            }else{
                                grid.datagrid('reload');
                            }
                            parent.$('#AmsWorkflowWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "流程设置保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsWorkflowSave").show();
                    }
                }catch (e){
                    parent.$('#AmsWorkflowWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsWorkflowSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsWorkflowTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsWorkflowTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsWorkflowValue(parent,data){
    if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
        if (!$.t_workflow.onChange("AmsWorkflow_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsWorkflowForm").form({
        onSubmit : function() {
            if ($("#actionType").val()!="auth"){
                return $(this).form("validate");
            }
            if(uploader&& uploader.isInProgress()){
                $.messager.show({
                    title : 'Error',
                    msg : "文件正在上传中..."
                });
                return false;
            }
            $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        }
    });

    $("#AmsWorkflowForm #flowType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('FLOW_TYPE')
    });

    $("#flowType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsWorkflowValue("flowType",record);
            }
        }
    });

    $("#AmsWorkflowForm #flowScope").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('PROCESS_RANGE')
    });

    $("#flowScope").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsWorkflowValue("flowScope",record);
            }
        }
    });

    $("#AmsWorkflowForm #isUsed").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('IS_USE')
    });

    $("#isUsed").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsWorkflowValue("isUsed",record);
            }
        }
    });

    $("#AmsWorkflowForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsWorkflowForm #flowType").length>0){
                var flowType = $("#AmsWorkflowForm #flowType").combobox('getValue');
                if ((data.flowType||"")!=""){
                    flowType = data.flowType;
                }
                $("#AmsWorkflowForm #flowType").combobox({data:$.totemUtils.getTypeCode('FLOW_TYPE')});
                if ((flowType||"")!=""){
                    $("#AmsWorkflowForm #flowType").combobox('select',flowType);
                }
            }
            if ($("#AmsWorkflowForm #flowScope").length>0){
                var flowScope = $("#AmsWorkflowForm #flowScope").combobox('getValue');
                if ((data.flowScope||"")!=""){
                    flowScope = data.flowScope;
                }
                $("#AmsWorkflowForm #flowScope").combobox({data:$.totemUtils.getTypeCode('PROCESS_RANGE')});
                if ((flowScope||"")!=""){
                    $("#AmsWorkflowForm #flowScope").combobox('select',flowScope);
                }
            }
            if ($("#AmsWorkflowForm #isUsed").length>0){
                var isUsed = $("#AmsWorkflowForm #isUsed").combobox('getValue');
                if ((data.isUsed||"")!=""){
                    isUsed = data.isUsed;
                }
                $("#AmsWorkflowForm #isUsed").combobox({data:$.totemUtils.getTypeCode('IS_USE')});
                if ((isUsed||"")!=""){
                    $("#AmsWorkflowForm #isUsed").combobox('select',isUsed);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsWorkflowTabs").length>0){
                var height = $('#AmsWorkflowTabs').outerHeight();
                if ($('#AmsWorkflowTabs').tabs('exists',"流程环节")){
                    var tab = $('#AmsWorkflowTabs').tabs('getTab',"流程环节");
                    tab.css("height",height+3);
                    var para = "?amsWorkflowId="+data.amsWorkflowId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsWorkflowTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"workflow/amsflowlink"+para,
                            id:"AmsFlowLink"
                        }
                    });
                }
            }

            if ($.t_workflow!=undefined&&$.t_workflow.onFormLoad!=undefined){
                $.t_workflow.onFormLoad("AmsWorkflowForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsWorkflowTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsWorkflowTabs").tabs("tabs").length==1){
                $("#AmsWorkflowTabs").tabs("hideHeader");
            }
            $("#AmsWorkflowTabs").tabs("resize",{"height":height});
            $("#AmsWorkflowTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsWorkflowTab($('#AmsWorkflowTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsWorkflowTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsWorkflowTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsWorkflowTabs").length>0){
                var tabs = $('#AmsWorkflowTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsWorkflowTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsWorkflowTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsWorkflowTabs').tabs('select',index);
                        $('#AmsWorkflowTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsWorkflowId").length>0&&$("#amsWorkflowId").val()!=""){
                ids = $("#amsWorkflowId").val();
            }
            $("#AmsWorkflowForm").form("load",_appsite + "workflow/amsworkflow/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsWorkflowTabs").length>0){
                    var tabs = $('#AmsWorkflowTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsWorkflowTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsWorkflowTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsWorkflowTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsWorkflowTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsWorkflowTabs').tabs('select',0);
                }
                $("#amsWorkflowId").val("");

                var flowTypeData;
                flowTypeData =  $.totemUtils.getTypeCode('FLOW_TYPE');
                if (flowTypeData!=undefined&&null!=flowTypeData){
                    $("#AmsWorkflowForm #flowType").combobox({
                        data:flowTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsWorkflow_FlowType").length>0&&$("#amsWorkflow_FlowType").val()!=""){
                                $(this).combobox('select',$("#amsWorkflow_FlowType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsWorkflow_FlowType").length>0&&$("#amsWorkflow_FlowType").val()!=""){
                    $("#flowType").combobox('setValue',$("#amsWorkflow_FlowType").val());
                    $("#flowType").parent().hide();
                }
                var flowScopeData;
                flowScopeData =  $.totemUtils.getTypeCode('PROCESS_RANGE');
                if (flowScopeData!=undefined&&null!=flowScopeData){
                    $("#AmsWorkflowForm #flowScope").combobox({
                        data:flowScopeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsWorkflow_FlowScope").length>0&&$("#amsWorkflow_FlowScope").val()!=""){
                                $(this).combobox('select',$("#amsWorkflow_FlowScope").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsWorkflow_FlowScope").length>0&&$("#amsWorkflow_FlowScope").val()!=""){
                    $("#flowScope").combobox('setValue',$("#amsWorkflow_FlowScope").val());
                    $("#flowScope").parent().hide();
                }
                var isUsedData;
                isUsedData =  $.totemUtils.getTypeCode('IS_USE');
                if (isUsedData!=undefined&&null!=isUsedData){
                    $("#AmsWorkflowForm #isUsed").combobox({
                        data:isUsedData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsWorkflow_IsUsed").length>0&&$("#amsWorkflow_IsUsed").val()!=""){
                                $(this).combobox('select',$("#amsWorkflow_IsUsed").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsWorkflow_IsUsed").length>0&&$("#amsWorkflow_IsUsed").val()!=""){
                    $("#isUsed").combobox('setValue',$("#amsWorkflow_IsUsed").val());
                    $("#isUsed").parent().hide();
                }
                $("#AmsWorkflowForm").form("load",  _appsite +"workflow/amsworkflow/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsWorkflowForm").form("load",  _appsite +"workflow/amsworkflow/query/"+$("#amsWorkflowId").val());
            }
        }
        document.body.style.visibility = 'visible';
});