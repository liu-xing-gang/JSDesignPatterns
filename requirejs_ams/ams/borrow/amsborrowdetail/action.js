function saveAmsBorrowDetail() {
    $("#amsBorrowDetailSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsBorrowDetailId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBorrowDetailForm").serialize();
        $.post(_appsite + "borrow/amsborrowdetail/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsBorrowDetailWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "借阅清单授权完成！"
                    });
                    parent.$('#AmsBorrowDetailWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "借阅清单授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBorrowDetailSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsBorrowDetailForm").form("submit", {
            url : _appsite + "borrow/amsborrowdetail/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsBorrowDetailWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "借阅清单保存成功！"
                            });
                            parent.$('#AmsBorrowDetailWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "借阅清单保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBorrowDetailSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBorrowDetailWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBorrowDetailSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsBorrowDetailValue(parent,data){
    if ($.t_borrow!=undefined&&$.t_borrow.onChange!=undefined){
        if (!$.t_borrow.onChange("AmsBorrowDetail_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#AmsBorrowDetailForm").form({
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

    $("#AmsBorrowDetailForm #pockNo").combogrid({
        onSelect : function(record) {
            changeAmsBorrowDetailValue("pockNo",$("#AmsBorrowDetailForm #pockNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsBorrowDetailForm #pockNo").combogrid('grid').datagrid('getSelected')){
                changeAmsBorrowDetailValue("pockNo",$("#AmsBorrowDetailForm #pockNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsBorrowDetailValue("pockNo",data.rows[0]);
            }
        }
    });

    $("#AmsBorrowDetailForm").form(
        {onLoadSuccess:function(data){
            $.totemUtils.getMutliCheck("#borrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'borrowType','codeValue','codeLabel',data.borrowType);
            if ($("#AmsBorrowDetailForm #pockNo").length>0&&(data.pockNo)&&data.pockNo!=""){
                $("#AmsBorrowDetailForm #pockNo").combogrid("grid").datagrid("options").queryParams.q=data.pockNo;
                $("#AmsBorrowDetailForm #pockNo").combogrid("grid").datagrid("reload");
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_borrow!=undefined&&$.t_borrow.onFormLoad!=undefined){
                $.t_borrow.onFormLoad("AmsBorrowDetailForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBorrowDetailTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBorrowDetailTabs").tabs("tabs").length==1){
                $("#AmsBorrowDetailTabs").tabs("hideHeader");
            }
            $("#AmsBorrowDetailTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBorrowDetailTabs").length>0){
                var tabs = $('#AmsBorrowDetailTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBorrowDetailTabs').tabs('select',index);
                        $('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsBorrowDetailId").length>0&&$("#amsBorrowDetailId").val()!=""){
                ids = $("#amsBorrowDetailId").val();
            }
            $("#AmsBorrowDetailForm").form("load",_appsite + "borrow/amsborrowdetail/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsBorrowDetailTabs").length>0){
                    var tabs = $('#AmsBorrowDetailTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBorrowDetailTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBorrowDetailTabs').tabs('select',0);
                }
                $("#amsBorrowDetailId").val("");

                $("#AmsBorrowDetailForm").form("load",  _appsite +"borrow/amsborrowdetail/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBorrowDetailForm").form("load",  _appsite +"borrow/amsborrowdetail/query/"+$("#amsBorrowDetailId").val());
            }
        }
        document.body.style.visibility = 'visible';
});