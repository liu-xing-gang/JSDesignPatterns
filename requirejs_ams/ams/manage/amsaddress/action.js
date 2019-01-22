function saveAmsAddress() {
    $("#amsAddressSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsAddressId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsAddressForm").serialize();
        $.post(_appsite + "manage/amsaddress/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsAddressWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案位置授权完成！"
                    });
                    parent.$('#AmsAddressWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案位置授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsAddressSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsAddressForm").form("submit", {
            url : _appsite + "manage/amsaddress/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsAddressWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案位置保存成功！"
                            });
                            parent.$('#AmsAddressWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案位置保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsAddressSave").show();
                    }
                }catch (e){
                    parent.$('#AmsAddressWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsAddressSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsAddressValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsAddress_"+parent,data)){
            return;
        }
    }
}

$(function() {
    $("#AmsAddressForm").form({
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

    $("#AmsAddressForm #amsRackstate").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('is_occ')
    });

    $("#amsRackstate").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsAddressValue("amsRackstate",record);
            }
        }
    });

    $("#AmsAddressForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsAddressForm #amsRackstate").length>0){
                var amsRackstate = $("#AmsAddressForm #amsRackstate").combobox('getValue');
                if ((data.amsRackstate||"")!=""){
                    amsRackstate = data.amsRackstate;
                }
                $("#AmsAddressForm #amsRackstate").combobox({data:$.totemUtils.getTypeCode('is_occ')});
                if ((amsRackstate||"")!=""){
                    $("#AmsAddressForm #amsRackstate").combobox('select',amsRackstate);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsAddressForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsAddressTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsAddressTabs").tabs("tabs").length==1){
                $("#AmsAddressTabs").tabs("hideHeader");
            }
            $("#AmsAddressTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsAddressTabs").length>0){
                var tabs = $('#AmsAddressTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsAddressTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsAddressTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsAddressTabs').tabs('select',index);
                        $('#AmsAddressTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsAddressId").length>0&&$("#amsAddressId").val()!=""){
                ids = $("#amsAddressId").val();
            }
            $("#AmsAddressForm").form("load",_appsite + "manage/amsaddress/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsAddressTabs").length>0){
                    var tabs = $('#AmsAddressTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsAddressTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsAddressTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsAddressTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsAddressTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsAddressTabs').tabs('select',0);
                }
                $("#amsAddressId").val("");

                if ($("#amsAddress_RackNo").length>0&&$("#amsAddress_RackNo").val()!=""){
                    $("#rackNo").val($("#amsAddress_RackNo").val());
                }
                var amsRackstateData;
                amsRackstateData =  $.totemUtils.getTypeCode('is_occ');
                if (amsRackstateData!=undefined&&null!=amsRackstateData){
                    $("#AmsAddressForm #amsRackstate").combobox({
                        data:amsRackstateData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsAddress_AmsRackstate").length>0&&$("#amsAddress_AmsRackstate").val()!=""){
                                $(this).combobox('select',$("#amsAddress_AmsRackstate").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsAddress_AmsRackstate").length>0&&$("#amsAddress_AmsRackstate").val()!=""){
                    $("#amsRackstate").combobox('setValue',$("#amsAddress_AmsRackstate").val());
                    $("#amsRackstate").parent().hide();
                }
                $("#AmsAddressForm").form("load",  _appsite +"manage/amsaddress/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsAddressForm").form("load",  _appsite +"manage/amsaddress/query/"+$("#amsAddressId").val());
            }
        }
        document.body.style.visibility = 'visible';
});