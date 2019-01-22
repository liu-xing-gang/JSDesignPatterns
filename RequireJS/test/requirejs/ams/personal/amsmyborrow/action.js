function saveAmsMyBorrow() {
    $("#amsMyBorrowSave").hide();
    var grid = undefined;
    if (parent.$.AmsMyBorrow){
        grid = parent.$.AmsMyBorrow.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsMyborrowId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsMyBorrowForm").serialize();
        $.post(_appsite + "personal/amsmyborrow/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsMyBorrowWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsMyBorrowSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsMyBorrowForm").form("submit", {
            url : _appsite + "personal/amsmyborrow/update",
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
                            parent.$('#AmsMyBorrowWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "我的借阅保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsMyBorrowSave").show();
                    }
                }catch (e){
                    parent.$('#AmsMyBorrowWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsMyBorrowSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsMyBorrowValue(parent,data){
    if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
        if (!$.t_personal.onChange("AmsMyBorrow_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsMyBorrowForm").form({
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

    $("#AmsMyBorrowForm #borrowStatus").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('BORROW_STATUS')
    });

    $("#borrowStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMyBorrowValue("borrowStatus",record);
            }
        }
    });

    $.totemUtils.getCheck("#borrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'borrowType','codeValue','codeLabel');

    $("#AmsMyBorrowForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsMyBorrowForm #borrowStatus").length>0){
                var borrowStatus = $("#AmsMyBorrowForm #borrowStatus").combobox('getValue');
                if ((data.borrowStatus||"")!=""){
                    borrowStatus = data.borrowStatus;
                }
                $("#AmsMyBorrowForm #borrowStatus").combobox({data:$.totemUtils.getTypeCode('BORROW_STATUS')});
                if ((borrowStatus||"")!=""){
                    $("#AmsMyBorrowForm #borrowStatus").combobox('select',borrowStatus);
                }
            }
            $.totemUtils.getRadio("#borrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'borrowType','codeValue','codeLabel',data.borrowType);

            if ($("#actionType").val()=="create"){}
            if ($.t_personal!=undefined&&$.t_personal.onFormLoad!=undefined){
                $.t_personal.onFormLoad("AmsMyBorrowForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsMyBorrowTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsMyBorrowTabs").tabs("tabs").length==1){
                $("#AmsMyBorrowTabs").tabs("hideHeader");
            }
            $("#AmsMyBorrowTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsMyBorrowTabs").length>0){
                var tabs = $('#AmsMyBorrowTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsMyBorrowTabs').tabs('select',index);
                        $('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsMyborrowId").length>0&&$("#amsMyborrowId").val()!=""){
                ids = $("#amsMyborrowId").val();
            }
            $("#AmsMyBorrowForm").form("load",_appsite + "personal/amsmyborrow/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsMyBorrowTabs").length>0){
                    var tabs = $('#AmsMyBorrowTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsMyBorrowTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsMyBorrowTabs').tabs('select',0);
                }
                $("#amsMyborrowId").val("");

                var borrowStatusData;
                borrowStatusData =  $.totemUtils.getTypeCode('BORROW_STATUS');
                if (borrowStatusData!=undefined&&null!=borrowStatusData){
                    $("#AmsMyBorrowForm #borrowStatus").combobox({
                        data:borrowStatusData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMyBorrow_BorrowStatus").length>0&&$("#amsMyBorrow_BorrowStatus").val()!=""){
                                $(this).combobox('select',$("#amsMyBorrow_BorrowStatus").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMyBorrow_BorrowStatus").length>0&&$("#amsMyBorrow_BorrowStatus").val()!=""){
                    $("#borrowStatus").combobox('setValue',$("#amsMyBorrow_BorrowStatus").val());
                    $("#borrowStatus").parent().hide();
                }
                $("#AmsMyBorrowForm").form("load",  _appsite +"personal/amsmyborrow/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsMyBorrowForm").form("load",  _appsite +"personal/amsmyborrow/query/"+$("#amsMyborrowId").val());
            }
        }
        document.body.style.visibility = 'visible';
});