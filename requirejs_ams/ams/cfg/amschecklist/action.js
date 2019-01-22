function saveAmsChecklist() {
    $("#amsChecklistSave").hide();
    var grid = undefined;
    if (parent.$.AmsChecklist){
        grid = parent.$.AmsChecklist.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsChecklistId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsChecklistForm").serialize();
        $.post(_appsite + "cfg/amschecklist/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsChecklistWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsChecklistSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsChecklistForm").form("submit", {
            url : _appsite + "cfg/amschecklist/update",
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
                            parent.$('#AmsChecklistWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案借阅清单保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsChecklistSave").show();
                    }
                }catch (e){
                    parent.$('#AmsChecklistWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsChecklistSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsChecklistValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsChecklist_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsChecklistForm").form({
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

    $("#AmsChecklistForm #checkType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('checkType')
    });

    $("#checkType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsChecklistValue("checkType",record);
            }
        }
    });

    $("#AmsChecklistForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsChecklistForm #checkType").length>0){
                var checkType = $("#AmsChecklistForm #checkType").combobox('getValue');
                if ((data.checkType||"")!=""){
                    checkType = data.checkType;
                }
                $("#AmsChecklistForm #checkType").combobox({data:$.totemUtils.getTypeCode('checkType')});
                if ((checkType||"")!=""){
                    $("#AmsChecklistForm #checkType").combobox('select',checkType);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsChecklistForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsChecklistTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsChecklistTabs").tabs("tabs").length==1){
                $("#AmsChecklistTabs").tabs("hideHeader");
            }
            $("#AmsChecklistTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsChecklistTabs").length>0){
                var tabs = $('#AmsChecklistTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsChecklistTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsChecklistTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsChecklistTabs').tabs('select',index);
                        $('#AmsChecklistTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsChecklistId").length>0&&$("#amsChecklistId").val()!=""){
                ids = $("#amsChecklistId").val();
            }
            $("#AmsChecklistForm").form("load",_appsite + "cfg/amschecklist/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsChecklistTabs").length>0){
                    var tabs = $('#AmsChecklistTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsChecklistTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsChecklistTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsChecklistTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsChecklistTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsChecklistTabs').tabs('select',0);
                }
                $("#amsChecklistId").val("");

                var checkTypeData;
                checkTypeData =  $.totemUtils.getTypeCode('checkType');
                if (checkTypeData!=undefined&&null!=checkTypeData){
                    $("#AmsChecklistForm #checkType").combobox({
                        data:checkTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsChecklist_CheckType").length>0&&$("#amsChecklist_CheckType").val()!=""){
                                $(this).combobox('select',$("#amsChecklist_CheckType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsChecklist_CheckType").length>0&&$("#amsChecklist_CheckType").val()!=""){
                    $("#checkType").combobox('setValue',$("#amsChecklist_CheckType").val());
                    $("#checkType").parent().hide();
                }
                $("#AmsChecklistForm").form("load",  _appsite +"cfg/amschecklist/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsChecklistForm").form("load",  _appsite +"cfg/amschecklist/query/"+$("#amsChecklistId").val());
            }
        }
        document.body.style.visibility = 'visible';
});