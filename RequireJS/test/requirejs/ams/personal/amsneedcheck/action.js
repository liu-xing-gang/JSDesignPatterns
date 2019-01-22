function saveAmsNeedCheck() {
    $("#amsNeedCheckSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsNeekCheckId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsNeedCheckForm").serialize();
        $.post(_appsite + "personal/amsneedcheck/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsNeedCheckWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "待办审批档案授权完成！"
                    });
                    parent.$('#AmsNeedCheckWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "待办审批档案授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsNeedCheckSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsNeedCheckForm").form("submit", {
            url : _appsite + "personal/amsneedcheck/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsNeedCheckWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "待办审批档案保存成功！"
                            });
                            parent.$('#AmsNeedCheckWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "待办审批档案保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsNeedCheckSave").show();
                    }
                }catch (e){
                    parent.$('#AmsNeedCheckWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsNeedCheckSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsNeedCheckValue(parent,data){
    if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
        if (!$.t_personal.onChange("AmsNeedCheck_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#AmsNeedCheckForm").form({
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

    $.totemUtils.getMutliCheck("#borrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'borrowType','codeValue','codeLabel','new_null');
    $.totemUtils.getRadio("#checkResult_el",$.totemUtils.getTypeCode('checkResult'),'checkResult','codeValue','codeLabel','');

    $("#AmsNeedCheckForm").form(
        {onLoadSuccess:function(data){
            $.totemUtils.getMutliCheck("#borrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'borrowType','codeValue','codeLabel',data.borrowType);
            $.totemUtils.getRadio("#checkResult_el",$.totemUtils.getTypeCode('checkResult'),'checkResult','codeValue','codeLabel',data.checkResult);
            if ($("#actionType").val()=="create"){}
            if ($.t_personal!=undefined&&$.t_personal.onFormLoad!=undefined){
                $.t_personal.onFormLoad("AmsNeedCheckForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsNeedCheckTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsNeedCheckTabs").tabs("tabs").length==1){
                $("#AmsNeedCheckTabs").tabs("hideHeader");
            }
            $("#AmsNeedCheckTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsNeedCheckTabs").length>0){
                var tabs = $('#AmsNeedCheckTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsNeedCheckTabs').tabs('select',index);
                        $('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsNeekCheckId").length>0&&$("#amsNeekCheckId").val()!=""){
                ids = $("#amsNeekCheckId").val();
            }
            $("#AmsNeedCheckForm").form("load",_appsite + "personal/amsneedcheck/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsNeedCheckTabs").length>0){
                    var tabs = $('#AmsNeedCheckTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsNeedCheckTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsNeedCheckTabs').tabs('select',0);
                }
                $("#amsNeekCheckId").val("");

                if ($("#amsNeedCheck_UserType").length>0&&$("#amsNeedCheck_UserType").val()!=""){
                    $("#userType").val($("#amsNeedCheck_UserType").val());
                }
                if ($("#amsNeedCheck_IsCheck").length>0&&$("#amsNeedCheck_IsCheck").val()!=""){
                    $("#isCheck").val($("#amsNeedCheck_IsCheck").val());
                }
                $("#AmsNeedCheckForm").form("load",  _appsite +"personal/amsneedcheck/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsNeedCheckForm").form("load",  _appsite +"personal/amsneedcheck/query/"+$("#amsNeekCheckId").val());
            }
        }
        document.body.style.visibility = 'visible';
});