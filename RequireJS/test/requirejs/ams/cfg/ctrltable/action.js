function saveCtrlTable() {
    $("#ctrlTableSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#id").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#CtrlTableForm").serialize();
        $.post(_appsite + "cfg/ctrltable/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#CtrlTableWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "中间通信表授权完成！"
                    });
                    parent.$('#CtrlTableWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "中间通信表授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#ctrlTableSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#CtrlTableForm").form("submit", {
            url : _appsite + "cfg/ctrltable/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#CtrlTableWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "中间通信表保存成功！"
                            });
                            parent.$('#CtrlTableWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "中间通信表保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#ctrlTableSave").show();
                    }
                }catch (e){
                    parent.$('#CtrlTableWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#ctrlTableSave").show();
                    return false;
                }
            }
        });
    }
}

function changeCtrlTableValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("CtrlTable_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#CtrlTableForm").form({
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

    $("#CtrlTableForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("CtrlTableForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#CtrlTableTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#CtrlTableTabs").tabs("tabs").length==1){
                $("#CtrlTableTabs").tabs("hideHeader");
            }
            $("#CtrlTableTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#CtrlTableTabs").length>0){
                var tabs = $('#CtrlTableTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#CtrlTableTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#CtrlTableTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#CtrlTableTabs').tabs('select',index);
                        $('#CtrlTableTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#id").length>0&&$("#id").val()!=""){
                ids = $("#id").val();
            }
            $("#CtrlTableForm").form("load",_appsite + "cfg/ctrltable/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#CtrlTableTabs").length>0){
                    var tabs = $('#CtrlTableTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#CtrlTableTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#CtrlTableTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#CtrlTableTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#CtrlTableTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#CtrlTableTabs').tabs('select',0);
                }
                $("#id").val("");

                $("#CtrlTableForm").form("load",  _appsite +"cfg/ctrltable/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#CtrlTableForm").form("load",  _appsite +"cfg/ctrltable/query/"+$("#id").val());
            }
        }
        document.body.style.visibility = 'visible';
});