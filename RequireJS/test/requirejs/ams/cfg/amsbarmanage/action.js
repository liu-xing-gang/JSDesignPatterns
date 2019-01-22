function saveAmsBarmanage() {
    $("#amsBarmanageSave").hide();
    var grid = undefined;
    if (parent.$.AmsBarmanage){
        grid = parent.$.AmsBarmanage.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsBarmanageId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBarmanageForm").serialize();
        $.post(_appsite + "cfg/amsbarmanage/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsBarmanageWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBarmanageSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsBarmanageForm").form("submit", {
            url : _appsite + "cfg/amsbarmanage/update",
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
                            parent.$('#AmsBarmanageWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "条码管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBarmanageSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBarmanageWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBarmanageSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsBarmanageValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsBarmanage_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsBarmanageForm").form({
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

    $("#AmsBarmanageForm #barType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('BAR_TYPE')
    });

    $("#barType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBarmanageValue("barType",record);
            }
        }
    });

    $("#AmsBarmanageForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsBarmanageForm #barType").length>0){
                var barType = $("#AmsBarmanageForm #barType").combobox('getValue');
                if ((data.barType||"")!=""){
                    barType = data.barType;
                }
                $("#AmsBarmanageForm #barType").combobox({data:$.totemUtils.getTypeCode('BAR_TYPE')});
                if ((barType||"")!=""){
                    $("#AmsBarmanageForm #barType").combobox('select',barType);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsBarmanageForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBarmanageTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBarmanageTabs").tabs("tabs").length==1){
                $("#AmsBarmanageTabs").tabs("hideHeader");
            }
            $("#AmsBarmanageTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBarmanageTabs").length>0){
                var tabs = $('#AmsBarmanageTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBarmanageTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBarmanageTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBarmanageTabs').tabs('select',index);
                        $('#AmsBarmanageTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsBarmanageId").length>0&&$("#amsBarmanageId").val()!=""){
                ids = $("#amsBarmanageId").val();
            }
            $("#AmsBarmanageForm").form("load",_appsite + "cfg/amsbarmanage/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsBarmanageTabs").length>0){
                    var tabs = $('#AmsBarmanageTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBarmanageTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBarmanageTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBarmanageTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBarmanageTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBarmanageTabs').tabs('select',0);
                }
                $("#amsBarmanageId").val("");

                var barTypeData;
                barTypeData =  $.totemUtils.getTypeCode('BAR_TYPE');
                if (barTypeData!=undefined&&null!=barTypeData){
                    $("#AmsBarmanageForm #barType").combobox({
                        data:barTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBarmanage_BarType").length>0&&$("#amsBarmanage_BarType").val()!=""){
                                $(this).combobox('select',$("#amsBarmanage_BarType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBarmanage_BarType").length>0&&$("#amsBarmanage_BarType").val()!=""){
                    $("#barType").combobox('setValue',$("#amsBarmanage_BarType").val());
                    $("#barType").parent().hide();
                }
                $("#AmsBarmanageForm").form("load",  _appsite +"cfg/amsbarmanage/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBarmanageForm").form("load",  _appsite +"cfg/amsbarmanage/query/"+$("#amsBarmanageId").val());
            }
        }
        document.body.style.visibility = 'visible';
});