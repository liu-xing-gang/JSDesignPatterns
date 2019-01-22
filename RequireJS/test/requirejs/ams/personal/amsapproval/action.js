function saveAmsApproval() {
    $("#amsApprovalSave").hide();
    var grid = undefined;
    if (parent.$.AmsApproval){
        grid = parent.$.AmsApproval.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsApprovalId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsApprovalForm").serialize();
        $.post(_appsite + "personal/amsapproval/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsApprovalWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsApprovalSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsApprovalForm").form("submit", {
            url : _appsite + "personal/amsapproval/update",
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
                            parent.$('#AmsApprovalWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "待办审批保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsApprovalSave").show();
                    }
                }catch (e){
                    parent.$('#AmsApprovalWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsApprovalSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsApprovalValue(parent,data){
    if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
        if (!$.t_personal.onChange("AmsApproval_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsApprovalForm").form({
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

    $("#AmsApprovalForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($.t_personal!=undefined&&$.t_personal.onFormLoad!=undefined){
                $.t_personal.onFormLoad("AmsApprovalForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsApprovalTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsApprovalTabs").tabs("tabs").length==1){
                $("#AmsApprovalTabs").tabs("hideHeader");
            }
            $("#AmsApprovalTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsApprovalTabs").length>0){
                var tabs = $('#AmsApprovalTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsApprovalTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsApprovalTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsApprovalTabs').tabs('select',index);
                        $('#AmsApprovalTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsApprovalId").length>0&&$("#amsApprovalId").val()!=""){
                ids = $("#amsApprovalId").val();
            }
            $("#AmsApprovalForm").form("load",_appsite + "personal/amsapproval/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsApprovalTabs").length>0){
                    var tabs = $('#AmsApprovalTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsApprovalTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsApprovalTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsApprovalTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsApprovalTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsApprovalTabs').tabs('select',0);
                }
                $("#amsApprovalId").val("");

                $("#AmsApprovalForm").form("load",  _appsite +"personal/amsapproval/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsApprovalForm").form("load",  _appsite +"personal/amsapproval/query/"+$("#amsApprovalId").val());
            }
        }
        document.body.style.visibility = 'visible';
});