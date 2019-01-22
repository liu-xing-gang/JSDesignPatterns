function saveAmsFileContent() {
    $("#amsFileContentSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsFileId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsFileContentForm").serialize();
        $.post(_appsite + "cfg/amsfilecontent/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsFileContentWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案原文授权完成！"
                    });
                    parent.$('#AmsFileContentWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案原文授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsFileContentSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        if ($("#amsFileContentProperties").length>0&&$("#AmsFileContentForm #property").length>0){
            $("#AmsFileContentForm #property").propertygrid("acceptChanges");
            $("#amsFileContentProperties").val(JSON.stringify($("#AmsFileContentForm #property").propertygrid("getRows")));
        }

        $("#AmsFileContentForm").form("submit", {
            url : _appsite + "cfg/amsfilecontent/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsFileContentWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案原文保存成功！"
                            });
                            parent.$('#AmsFileContentWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案原文保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsFileContentSave").show();
                    }
                }catch (e){
                    parent.$('#AmsFileContentWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsFileContentSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsFileContentValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsFileContent_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#AmsFileContentForm").form({
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

    $("#AmsFileContentForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($('#AmsFileContentTabs').tabs('exists',"属性信息")&&$("#actionType").val()!="auth"){
                tab_property = $('#AmsFileContentTabs').tabs('getTab',"属性信息").panel('options').tab;
                if (null!=data.amsFileId&&data.amsFileId!=""&&data.amsFileId!="ROOT"){
                    if ($("#amsFileContentProperties").val()!=null&&$("#amsFileContentProperties").val()!=""){
                        tab_property.show();
                        $("#AmsFileContentForm #property").propertygrid({
                            data:JSON.parse($("#amsFileContentProperties").val()),
                            columns:$.totemUtils.propertyColumns,
                            showGroup:true
                        });
                    }
                }else{
                    tab_property.hide();
                }
            }
            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsFileContentForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsFileContentTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsFileContentTabs").tabs("tabs").length==1){
                $("#AmsFileContentTabs").tabs("hideHeader");
            }
            $("#AmsFileContentTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsFileContentTabs").length>0){
                var tabs = $('#AmsFileContentTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsFileContentTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsFileContentTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsFileContentTabs').tabs('select',index);
                        $('#AmsFileContentTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
                ids = $("#amsFileId").val();
            }
            $("#AmsFileContentForm").form("load",_appsite + "cfg/amsfilecontent/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($('#AmsFileContentTabs').tabs('exists',"属性信息")){
                    $("#AmsFileContentForm #property").propertygrid({
                        url:_appsite +'SysProperty/values/modelId/amsFileContent/groupBm/amsFileContent/id/newid',
                        columns:$.totemUtils.propertyColumns,
                        showGroup:true
                    });
                }
                if ($("#AmsFileContentTabs").length>0){
                    var tabs = $('#AmsFileContentTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsFileContentTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsFileContentTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsFileContentTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsFileContentTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsFileContentTabs').tabs('select',0);
                }
                $("#amsFileId").val("");

                if ($("#amsFileContent_BusinessNo").length>0&&$("#amsFileContent_BusinessNo").val()!=""){
                    $("#businessNo").val($("#amsFileContent_BusinessNo").val());
                }
                $("#AmsFileContentForm").form("load",  _appsite +"cfg/amsfilecontent/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsFileContentForm").form("load",  _appsite +"cfg/amsfilecontent/query/"+$("#amsFileId").val());
            }
        }
        document.body.style.visibility = 'visible';
});