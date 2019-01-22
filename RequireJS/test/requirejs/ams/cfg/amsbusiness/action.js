function saveAmsBusiness() {
    $("#amsBusinessSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsBussionessId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBusinessForm").serialize();
        $.post(_appsite + "cfg/amsbusiness/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsBusinessWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案业务授权完成！"
                    });
                    parent.$('#AmsBusinessWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案业务授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBusinessSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        if ($("#amsBusinessProperties").length>0&&$("#AmsBusinessForm #property").length>0){
            $("#AmsBusinessForm #property").propertygrid("acceptChanges");
            $("#amsBusinessProperties").val(JSON.stringify($("#AmsBusinessForm #property").propertygrid("getRows")));
        }

        $("#AmsBusinessForm").form("submit", {
            url : _appsite + "cfg/amsbusiness/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsBusinessWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案业务保存成功！"
                            });
                            parent.$('#AmsBusinessWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案业务保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBusinessSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBusinessWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBusinessSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsBusinessValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsBusiness_"+parent,data)){
            return;
        }
    }
}

function updateAmsBusinessTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsBusinessTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
$(function() {
    $("#AmsBusinessForm").form({
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

    $("#AmsBusinessForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($('#AmsBusinessTabs').tabs('exists',"属性信息")&&$("#actionType").val()!="auth"){
                tab_property = $('#AmsBusinessTabs').tabs('getTab',"属性信息").panel('options').tab;
                if (null!=data.amsBussionessId&&data.amsBussionessId!=""&&data.amsBussionessId!="ROOT"){
                    if ($("#amsBusinessProperties").val()!=null&&$("#amsBusinessProperties").val()!=""){
                        tab_property.show();
                        $("#AmsBusinessForm #property").propertygrid({
                            data:JSON.parse($("#amsBusinessProperties").val()),
                            columns:$.totemUtils.propertyColumns,
                            showGroup:true
                        });
                    }
                }else{
                    tab_property.hide();
                }
            }
            if ($("#AmsBusinessTabs").length>0){
                var height = $('#AmsBusinessTabs').outerHeight();
                if ($('#AmsBusinessTabs').tabs('exists',"档案原文")){
                    var tab = $('#AmsBusinessTabs').tabs('getTab',"档案原文");
                    tab.css("height",height+3);
                    var para = "?businessNo="+data.amsBussionessId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsBusinessTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsfilecontent"+para,
                            id:"AmsFileContent"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsBusinessForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBusinessTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBusinessTabs").tabs("tabs").length==1){
                $("#AmsBusinessTabs").tabs("hideHeader");
            }
            $("#AmsBusinessTabs").tabs("resize",{"height":height});
            $("#AmsBusinessTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsBusinessTab($('#AmsBusinessTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsBusinessTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsBusinessTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBusinessTabs").length>0){
                var tabs = $('#AmsBusinessTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBusinessTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBusinessTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBusinessTabs').tabs('select',index);
                        $('#AmsBusinessTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsBussionessId").length>0&&$("#amsBussionessId").val()!=""){
                ids = $("#amsBussionessId").val();
            }
            $("#AmsBusinessForm").form("load",_appsite + "cfg/amsbusiness/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($('#AmsBusinessTabs').tabs('exists',"属性信息")){
                    $("#AmsBusinessForm #property").propertygrid({
                        url:_appsite +'SysProperty/values/modelId/amsBusiness/groupBm/amsBusiness/id/newid',
                        columns:$.totemUtils.propertyColumns,
                        showGroup:true
                    });
                }
                if ($("#AmsBusinessTabs").length>0){
                    var tabs = $('#AmsBusinessTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBusinessTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBusinessTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBusinessTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBusinessTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBusinessTabs').tabs('select',0);
                }
                $("#amsBussionessId").val("");

                if ($("#amsBusiness_UserNo").length>0&&$("#amsBusiness_UserNo").val()!=""){
                    $("#userNo").val($("#amsBusiness_UserNo").val());
                }
                $("#AmsBusinessForm").form("load",  _appsite +"cfg/amsbusiness/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBusinessForm").form("load",  _appsite +"cfg/amsbusiness/query/"+$("#amsBussionessId").val());
            }
        }
        document.body.style.visibility = 'visible';
});