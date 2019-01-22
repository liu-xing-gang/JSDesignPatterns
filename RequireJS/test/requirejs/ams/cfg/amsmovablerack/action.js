function saveAmsMovableRack() {
    $("#amsMovableRackSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#movableRackId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsMovableRackForm").serialize();
        $.post(_appsite + "cfg/amsmovablerack/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsMovableRackWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "密集柜管理授权完成！"
                    });
                    parent.$('#AmsMovableRackWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "密集柜管理授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsMovableRackSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsMovableRackForm").form("submit", {
            url : _appsite + "cfg/amsmovablerack/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsMovableRackWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "密集柜管理保存成功！"
                            });
                            parent.$('#AmsMovableRackWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "密集柜管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsMovableRackSave").show();
                    }
                }catch (e){
                    parent.$('#AmsMovableRackWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsMovableRackSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsMovableRackValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsMovableRack_"+parent,data)){
            return;
        }
    }
}

function updateAmsMovableRackTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsMovableRackTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
$(function() {
    $("#AmsMovableRackForm").form({
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

    $("#AmsMovableRackForm #storageId").combobox({
        valueField :"storageId",
        textField:"storageName",
        data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
    });

    $("#storageId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMovableRackValue("storageId",record);
            }
        }
    });

    $("#AmsMovableRackForm #rackType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('MOVABLE_TYPE')
    });

    $("#rackType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMovableRackValue("rackType",record);
            }
        }
    });

    $("#AmsMovableRackForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsMovableRackForm #storageId").length>0){
                var storageId = $("#AmsMovableRackForm #storageId").combobox('getValue');
                if ((data.storageId||"")!=""){
                    storageId = data.storageId;
                }
                
                if ((storageId||"")!=""){
                    $("#AmsMovableRackForm #storageId").combobox('select',storageId);
                }
            }
            if ($("#AmsMovableRackForm #rackType").length>0){
                var rackType = $("#AmsMovableRackForm #rackType").combobox('getValue');
                if ((data.rackType||"")!=""){
                    rackType = data.rackType;
                }
                $("#AmsMovableRackForm #rackType").combobox({data:$.totemUtils.getTypeCode('MOVABLE_TYPE')});
                if ((rackType||"")!=""){
                    $("#AmsMovableRackForm #rackType").combobox('select',rackType);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsMovableRackTabs").length>0){
                var height = $('#AmsMovableRackTabs').outerHeight();
                if ($('#AmsMovableRackTabs').tabs('exists',"档案位管理")){
                    var tab = $('#AmsMovableRackTabs').tabs('getTab',"档案位管理");
                    tab.css("height",height+3);
                    var para = "?movableRack="+data.movableRackId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsMovableRackTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amsrackno"+para,
                            id:"AmsRackNo"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsMovableRackForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsMovableRackTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsMovableRackTabs").tabs("tabs").length==1){
                $("#AmsMovableRackTabs").tabs("hideHeader");
            }
            $("#AmsMovableRackTabs").tabs("resize",{"height":height});
            $("#AmsMovableRackTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsMovableRackTab($('#AmsMovableRackTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsMovableRackTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsMovableRackTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsMovableRackTabs").length>0){
                var tabs = $('#AmsMovableRackTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsMovableRackTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsMovableRackTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsMovableRackTabs').tabs('select',index);
                        $('#AmsMovableRackTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#movableRackId").length>0&&$("#movableRackId").val()!=""){
                ids = $("#movableRackId").val();
            }
            $("#AmsMovableRackForm").form("load",_appsite + "cfg/amsmovablerack/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsMovableRackTabs").length>0){
                    var tabs = $('#AmsMovableRackTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsMovableRackTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsMovableRackTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsMovableRackTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsMovableRackTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsMovableRackTabs').tabs('select',0);
                }
                $("#movableRackId").val("");

                var storageIdData;
                try{
                        storageIdData =  $.totemUtils.getJson('cfg/amsstorage/queryAuthAll?='+'','get');
                    }catch (e){}
                if (storageIdData!=undefined&&null!=storageIdData){
                    $("#AmsMovableRackForm #storageId").combobox({
                        data:storageIdData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMovableRack_StorageId").length>0&&$("#amsMovableRack_StorageId").val()!=""){
                                $(this).combobox('select',$("#amsMovableRack_StorageId").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['storageId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMovableRack_StorageId").length>0&&$("#amsMovableRack_StorageId").val()!=""){
                    $("#storageId").combobox('setValue',$("#amsMovableRack_StorageId").val());
                    $("#storageId").parent().hide();
                }
                var rackTypeData;
                rackTypeData =  $.totemUtils.getTypeCode('MOVABLE_TYPE');
                if (rackTypeData!=undefined&&null!=rackTypeData){
                    $("#AmsMovableRackForm #rackType").combobox({
                        data:rackTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMovableRack_RackType").length>0&&$("#amsMovableRack_RackType").val()!=""){
                                $(this).combobox('select',$("#amsMovableRack_RackType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMovableRack_RackType").length>0&&$("#amsMovableRack_RackType").val()!=""){
                    $("#rackType").combobox('setValue',$("#amsMovableRack_RackType").val());
                    $("#rackType").parent().hide();
                }
                $("#AmsMovableRackForm").form("load",  _appsite +"cfg/amsmovablerack/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsMovableRackForm").form("load",  _appsite +"cfg/amsmovablerack/query/"+$("#movableRackId").val());
            }
        }
        document.body.style.visibility = 'visible';
});