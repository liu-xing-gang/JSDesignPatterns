function saveAmsLink() {
    $("#amsLinkSave").hide();
    var grid = undefined;
    if (parent.$.AmsLink){
        grid = parent.$.AmsLink.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsWorkflowId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsLinkForm").serialize();
        $.post(_appsite + "workflow/amslink/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsLinkWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsLinkSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsLinkForm").form("submit", {
            url : _appsite + "workflow/amslink/update",
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
                            parent.$('#AmsLinkWindow').window('close');
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
                        $("#amsLinkSave").show();
                    }
                }catch (e){
                    parent.$('#AmsLinkWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsLinkSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsLinkTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsLinkTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsLinkValue(parent,data){
    if ($.t_workflow!=undefined&&$.t_workflow.onChange!=undefined){
        if (!$.t_workflow.onChange("AmsLink_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsLinkForm").form({
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

    $("#AmsLinkForm #doMode").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('DO_MODE')
    });

    $("#doMode").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsLinkValue("doMode",record);
            }
        }
    });

    $.totemUtils.getCheck("#doFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'doFunction','codeValue','codeLabel');

    $("#AmsLinkForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsLinkForm #doMode").length>0){
                var doMode = $("#AmsLinkForm #doMode").combobox('getValue');
                if ((data.doMode||"")!=""){
                    doMode = data.doMode;
                }
                $("#AmsLinkForm #doMode").combobox({data:$.totemUtils.getTypeCode('DO_MODE')});
                if ((doMode||"")!=""){
                    $("#AmsLinkForm #doMode").combobox('select',doMode);
                }
            }
            $.totemUtils.getRadio("#doFunction_el",$.totemUtils.getTypeCode('DO_FUNCTION'),'doFunction','codeValue','codeLabel',data.doFunction);

            if ($("#actionType").val()=="create"){}
            if ($("#AmsLinkTabs").length>0){
                var height = $('#AmsLinkTabs').outerHeight() - 34;
            }

            if ($.t_workflow!=undefined&&$.t_workflow.onFormLoad!=undefined){
                $.t_workflow.onFormLoad("AmsLinkForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsLinkTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsLinkTabs").tabs("tabs").length==1){
                $("#AmsLinkTabs").tabs("hideHeader");
            }
            $("#AmsLinkTabs").tabs("resize",{"height":height});
            $("#AmsLinkTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsLinkTab($('#AmsLinkTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsLinkTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsLinkTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsLinkTabs").length>0){
                var tabs = $('#AmsLinkTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsLinkTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsLinkTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsLinkTabs').tabs('select',index);
                        $('#AmsLinkTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsWorkflowId").length>0&&$("#amsWorkflowId").val()!=""){
                ids = $("#amsWorkflowId").val();
            }
            $("#AmsLinkForm").form("load",_appsite + "workflow/amslink/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsLinkTabs").length>0){
                    var tabs = $('#AmsLinkTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsLinkTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsLinkTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsLinkTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsLinkTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsLinkTabs').tabs('select',0);
                }
                $("#amsWorkflowId").val("");

                var doModeData;
                doModeData =  $.totemUtils.getTypeCode('DO_MODE');
                if (doModeData!=undefined&&null!=doModeData){
                    $("#AmsLinkForm #doMode").combobox({
                        data:doModeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsLink_DoMode").length>0&&$("#amsLink_DoMode").val()!=""){
                                $(this).combobox('select',$("#amsLink_DoMode").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsLink_DoMode").length>0&&$("#amsLink_DoMode").val()!=""){
                    $("#doMode").combobox('setValue',$("#amsLink_DoMode").val());
                    $("#doMode").parent().hide();
                }
                $("#AmsLinkForm").form("load",  _appsite +"workflow/amslink/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsLinkForm").form("load",  _appsite +"workflow/amslink/query/"+$("#amsWorkflowId").val());
            }
        }
});