function saveAmsCheckMain() {
    $("#amsCheckMainSave").hide();
    var grid = undefined;
    if (parent.$.AmsCheckMain){
        grid = parent.$.AmsCheckMain.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsCheckRecordId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsCheckMainForm").serialize();
        $.post(_appsite + "manage/amscheckmain/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsCheckMainWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsCheckMainSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsCheckMainForm").form("submit", {
            url : _appsite + "manage/amscheckmain/update",
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
                            parent.$('#AmsCheckMainWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "盘点主表保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsCheckMainSave").show();
                    }
                }catch (e){
                    parent.$('#AmsCheckMainWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsCheckMainSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsCheckMainValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsCheckMain_"+parent,data)){
            return;
        }
    }
    if (parent=="storageId"){
        var storageId = data.storageId;
        if ((storageId||"")==""){
            $("#AmsCheckMainForm #randId").combobox({data:[]});
            $("#AmsCheckMainForm #randId").combobox('setValue','');

            return;
        }
        if ($("#AmsCheckMainForm #randId").length>0){
            var randId = $("#AmsCheckMainForm #randId").combobox('getValue');
            if ((data.randId||"")!=""){
                randId = data.randId;
            }
            if ((data.storageId||"")!=""){
                $("#AmsCheckMainForm #randId").combobox({data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId='+data.storageId,'get')});
            }
            if ((randId||"")!=""){
                $("#AmsCheckMainForm #randId").combobox('select',randId);
            }
        }
    }
}
$(function() {
    $("#AmsCheckMainForm").form({
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

    $("#AmsCheckMainForm #storageId").combobox({
        valueField :"storageId",
        textField:"storageName",
        data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
    });

    $("#storageId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsCheckMainValue("storageId",record);
            }
        }
    });

    $("#AmsCheckMainForm #randId").combobox({
        valueField :"movableRackId",
        textField:"rackName",
        data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId=data.storageId','get')
    });

    $("#randId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsCheckMainValue("randId",record);
            }
        }
    });

    $("#AmsCheckMainForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsCheckMainForm #storageId").length>0){
                var storageId = $("#AmsCheckMainForm #storageId").combobox('getValue');
                if ((data.storageId||"")!=""){
                    storageId = data.storageId;
                }
                
                if ((storageId||"")!=""){
                    $("#AmsCheckMainForm #storageId").combobox('select',storageId);
                }
            }
            if ($("#AmsCheckMainForm #randId").length>0){
                var randId = $("#AmsCheckMainForm #randId").combobox('getValue');
                if ((data.randId||"")!=""){
                    randId = data.randId;
                }
                if ((data.storageId||"")!=""){
                    $("#AmsCheckMainForm #randId").combobox({data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId='+data.storageId,'get')});
                }
                if ((randId||"")!=""){
                    $("#AmsCheckMainForm #randId").combobox('select',randId);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsCheckMainForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsCheckMainTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsCheckMainTabs").tabs("tabs").length==1){
                $("#AmsCheckMainTabs").tabs("hideHeader");
            }
            $("#AmsCheckMainTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsCheckMainTabs").length>0){
                var tabs = $('#AmsCheckMainTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsCheckMainTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsCheckMainTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsCheckMainTabs').tabs('select',index);
                        $('#AmsCheckMainTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsCheckRecordId").length>0&&$("#amsCheckRecordId").val()!=""){
                ids = $("#amsCheckRecordId").val();
            }
            $("#AmsCheckMainForm").form("load",_appsite + "manage/amscheckmain/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsCheckMainTabs").length>0){
                    var tabs = $('#AmsCheckMainTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsCheckMainTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsCheckMainTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsCheckMainTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsCheckMainTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsCheckMainTabs').tabs('select',0);
                }
                $("#amsCheckRecordId").val("");

                var storageIdData;
                try{
                        storageIdData =  $.totemUtils.getJson('cfg/amsstorage/queryAuthAll?='+'','get');
                    }catch (e){}
                if (storageIdData!=undefined&&null!=storageIdData){
                    $("#AmsCheckMainForm #storageId").combobox({
                        data:storageIdData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsCheckMain_StorageId").length>0&&$("#amsCheckMain_StorageId").val()!=""){
                                $(this).combobox('select',$("#amsCheckMain_StorageId").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['storageId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsCheckMain_StorageId").length>0&&$("#amsCheckMain_StorageId").val()!=""){
                    $("#storageId").combobox('setValue',$("#amsCheckMain_StorageId").val());
                    $("#storageId").parent().hide();
                }
                var randIdData;
                try{
                        randIdData =  $.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId='+data.storageId,'get');
                    }catch (e){}
                if (randIdData!=undefined&&null!=randIdData){
                    $("#AmsCheckMainForm #randId").combobox({
                        data:randIdData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsCheckMain_RandId").length>0&&$("#amsCheckMain_RandId").val()!=""){
                                $(this).combobox('select',$("#amsCheckMain_RandId").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['movableRackId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsCheckMain_RandId").length>0&&$("#amsCheckMain_RandId").val()!=""){
                    $("#randId").combobox('setValue',$("#amsCheckMain_RandId").val());
                    $("#randId").parent().hide();
                }
                $("#AmsCheckMainForm").form("load",  _appsite +"manage/amscheckmain/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsCheckMainForm").form("load",  _appsite +"manage/amscheckmain/query/"+$("#amsCheckRecordId").val());
            }
        }
        document.body.style.visibility = 'visible';
});