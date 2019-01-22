function saveAmsInventory() {
    $("#amsInventorySave").hide();
    if ($("#actionType").val()=="copy"){
        $("#id").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsInventoryForm").serialize();
        $.post(_appsite + "manage/amsinventory/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsInventoryWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案盘点授权完成！"
                    });
                    parent.$('#AmsInventoryWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案盘点授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsInventorySave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsInventoryForm").form("submit", {
            url : _appsite + "manage/amsinventory/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsInventoryWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案盘点保存成功！"
                            });
                            parent.$('#AmsInventoryWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案盘点保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsInventorySave").show();
                    }
                }catch (e){
                    parent.$('#AmsInventoryWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsInventorySave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsInventoryValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsInventory_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#AmsInventoryForm").form({
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

    $("#AmsInventoryForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsInventoryForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsInventoryTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsInventoryTabs").tabs("tabs").length==1){
                $("#AmsInventoryTabs").tabs("hideHeader");
            }
            $("#AmsInventoryTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsInventoryTabs").length>0){
                var tabs = $('#AmsInventoryTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsInventoryTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsInventoryTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsInventoryTabs').tabs('select',index);
                        $('#AmsInventoryTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#id").length>0&&$("#id").val()!=""){
                ids = $("#id").val();
            }
            $("#AmsInventoryForm").form("load",_appsite + "manage/amsinventory/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsInventoryTabs").length>0){
                    var tabs = $('#AmsInventoryTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsInventoryTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsInventoryTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsInventoryTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsInventoryTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsInventoryTabs').tabs('select',0);
                }
                $("#id").val("");

                $("#AmsInventoryForm").form("load",  _appsite +"manage/amsinventory/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsInventoryForm").form("load",  _appsite +"manage/amsinventory/query/"+$("#id").val());
            }
        }
        document.body.style.visibility = 'visible';
});