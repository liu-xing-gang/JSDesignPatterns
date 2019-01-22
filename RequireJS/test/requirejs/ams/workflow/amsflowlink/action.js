function saveAmsFlowLink() {
    $("#amsFlowLinkSave").hide();
    var grid = undefined;
    if (parent.$.AmsFlowLink){
        grid = parent.$.AmsFlowLink.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsFlowLinkId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsFlowLinkForm").serialize();
        $.post(_appsite + "workflow/amsflowlink/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsFlowLinkWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsFlowLinkSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsFlowLinkForm").form("submit", {
            url : _appsite + "workflow/amsflowlink/update",
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
                            parent.$('#AmsFlowLinkWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "流程环节保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsFlowLinkSave").show();
                    }
                }catch (e){
                    parent.$('#AmsFlowLinkWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsFlowLinkSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsFlowLinkValue(parent,data){
    if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
        if (!$.t_workflow.onChange("AmsFlowLink_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsFlowLinkForm").form({
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

    $("#AmsFlowLinkForm #doUser").combobox({
        valueField :"userId",
        textField:"userLogin",
        data:$.totemUtils.getJson('common/sysuser/queryAuthAll','get')
    });

    $("#doUser").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFlowLinkValue("doUser",record);
            }
        }
    });

    $.totemUtils.getMutliCheck("#doFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'doFunction','codeValue','codeLabel');

    $("#AmsFlowLinkForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsFlowLinkForm #doUser").length>0){
                var doUser = $("#AmsFlowLinkForm #doUser").combobox('getValue');
                if ((data.doUser||"")!=""){
                    doUser = data.doUser;
                }
                
                if ((doUser||"")!=""){
                    $("#AmsFlowLinkForm #doUser").combobox('select',doUser);
                }
            }
            $.totemUtils.getMutliCheck("#doFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'doFunction','codeValue','codeLabel',data.doFunction);

            if ($("#actionType").val()=="create"){}
            if ($.t_workflow!=undefined&&$.t_workflow.onFormLoad!=undefined){
                $.t_workflow.onFormLoad("AmsFlowLinkForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsFlowLinkTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsFlowLinkTabs").tabs("tabs").length==1){
                $("#AmsFlowLinkTabs").tabs("hideHeader");
            }
            $("#AmsFlowLinkTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsFlowLinkTabs").length>0){
                var tabs = $('#AmsFlowLinkTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsFlowLinkTabs').tabs('select',index);
                        $('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsFlowLinkId").length>0&&$("#amsFlowLinkId").val()!=""){
                ids = $("#amsFlowLinkId").val();
            }
            $("#AmsFlowLinkForm").form("load",_appsite + "workflow/amsflowlink/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsFlowLinkTabs").length>0){
                    var tabs = $('#AmsFlowLinkTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsFlowLinkTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsFlowLinkTabs').tabs('select',0);
                }
                $("#amsFlowLinkId").val("");

                if ($("#amsFlowLink_AmsWorkflowId").length>0&&$("#amsFlowLink_AmsWorkflowId").val()!=""){
                    $("#amsWorkflowId").val($("#amsFlowLink_AmsWorkflowId").val());
                }
                var doUserData;
                try{
                        doUserData =  $.totemUtils.getJson('common/sysuser/queryAuthAll?='+'','get');
                    }catch (e){}
                if (doUserData!=undefined&&null!=doUserData){
                    $("#AmsFlowLinkForm #doUser").combobox({
                        data:doUserData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFlowLink_DoUser").length>0&&$("#amsFlowLink_DoUser").val()!=""){
                                $(this).combobox('select',$("#amsFlowLink_DoUser").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['userId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFlowLink_DoUser").length>0&&$("#amsFlowLink_DoUser").val()!=""){
                    $("#doUser").combobox('setValue',$("#amsFlowLink_DoUser").val());
                    $("#doUser").parent().hide();
                }
                $("#AmsFlowLinkForm").form("load",  _appsite +"workflow/amsflowlink/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsFlowLinkForm").form("load",  _appsite +"workflow/amsflowlink/query/"+$("#amsFlowLinkId").val());
            }
        }
        document.body.style.visibility = 'visible';
});