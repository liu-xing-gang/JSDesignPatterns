function saveAmsRecord() {
    $("#amsRecordSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsLowrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsRecordForm").serialize();
        $.post(_appsite + "manage/amsrecord/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsRecordWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "用户档案入库授权完成！"
                    });
                    parent.$('#AmsRecordWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "用户档案入库授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsRecordSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        if ($("#amsRecordProperties").length>0&&$("#AmsRecordForm #property").length>0){
            $("#AmsRecordForm #property").propertygrid("acceptChanges");
            $("#amsRecordProperties").val(JSON.stringify($("#AmsRecordForm #property").propertygrid("getRows")));
        }

        $("#AmsRecordForm").form("submit", {
            url : _appsite + "manage/amsrecord/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsRecordWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "用户档案入库保存成功！"
                            });
                            parent.$('#AmsRecordWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "用户档案入库保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsRecordSave").show();
                    }
                }catch (e){
                    parent.$('#AmsRecordWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsRecordSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsRecordValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsRecord_"+parent,data)){
            return;
        }
    }
}

function updateAmsRecordTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsRecordTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
$(function() {
    $("#AmsRecordForm").form({
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

    $("#AmsRecordForm #amsuserType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('AMSUSER_TYPE')
    });

    $("#amsuserType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsRecordValue("amsuserType",record);
            }
        }
    });

    $("#AmsRecordForm #secretLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secretLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsRecordValue("secretLevel",record);
            }
        }
    });

    $("#AmsRecordForm #fileState").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('FILE_STATE')
    });

    $("#fileState").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsRecordValue("fileState",record);
            }
        }
    });

    $("#AmsRecordForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsRecordForm #amsuserType").length>0){
                var amsuserType = $("#AmsRecordForm #amsuserType").combobox('getValue');
                if ((data.amsuserType||"")!=""){
                    amsuserType = data.amsuserType;
                }
                $("#AmsRecordForm #amsuserType").combobox({data:$.totemUtils.getTypeCode('AMSUSER_TYPE')});
                if ((amsuserType||"")!=""){
                    $("#AmsRecordForm #amsuserType").combobox('select',amsuserType);
                }
            }
            if ($("#AmsRecordForm #secretLevel").length>0){
                var secretLevel = $("#AmsRecordForm #secretLevel").combobox('getValue');
                if ((data.secretLevel||"")!=""){
                    secretLevel = data.secretLevel;
                }
                $("#AmsRecordForm #secretLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secretLevel||"")!=""){
                    $("#AmsRecordForm #secretLevel").combobox('select',secretLevel);
                }
            }
            if ($("#AmsRecordForm #fileState").length>0){
                var fileState = $("#AmsRecordForm #fileState").combobox('getValue');
                if ((data.fileState||"")!=""){
                    fileState = data.fileState;
                }
                $("#AmsRecordForm #fileState").combobox({data:$.totemUtils.getTypeCode('FILE_STATE')});
                if ((fileState||"")!=""){
                    $("#AmsRecordForm #fileState").combobox('select',fileState);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($('#AmsRecordTabs').tabs('exists',"属性信息")&&$("#actionType").val()!="auth"){
                tab_property = $('#AmsRecordTabs').tabs('getTab',"属性信息").panel('options').tab;
                if (null!=data.amsLowrecordinId&&data.amsLowrecordinId!=""&&data.amsLowrecordinId!="ROOT"){
                    if ($("#amsRecordProperties").val()!=null&&$("#amsRecordProperties").val()!=""){
                        tab_property.show();
                        $("#AmsRecordForm #property").propertygrid({
                            data:JSON.parse($("#amsRecordProperties").val()),
                            columns:$.totemUtils.propertyColumns,
                            showGroup:true
                        });
                    }
                }else{
                    tab_property.hide();
                }
            }
            if ($("#AmsRecordTabs").length>0){
                var height = $('#AmsRecordTabs').outerHeight();
                if ($('#AmsRecordTabs').tabs('exists',"档案业务")){
                    var tab = $('#AmsRecordTabs').tabs('getTab',"档案业务");
                    tab.css("height",height+3);
                    var para = "?userNo="+data.amsLowrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsRecordTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsbusiness"+para,
                            id:"AmsBusiness"
                        }
                    });
                }
            }

            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsRecordForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsRecordTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsRecordTabs").tabs("tabs").length==1){
                $("#AmsRecordTabs").tabs("hideHeader");
            }
            $("#AmsRecordTabs").tabs("resize",{"height":height});
            $("#AmsRecordTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsRecordTab($('#AmsRecordTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsRecordTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsRecordTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsRecordTabs").length>0){
                var tabs = $('#AmsRecordTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsRecordTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsRecordTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsRecordTabs').tabs('select',index);
                        $('#AmsRecordTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsLowrecordinId").length>0&&$("#amsLowrecordinId").val()!=""){
                ids = $("#amsLowrecordinId").val();
            }
            $("#AmsRecordForm").form("load",_appsite + "manage/amsrecord/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($('#AmsRecordTabs').tabs('exists',"属性信息")){
                    $("#AmsRecordForm #property").propertygrid({
                        url:_appsite +'SysProperty/values/modelId/amsRecord/groupBm/amsRecord/id/newid',
                        columns:$.totemUtils.propertyColumns,
                        showGroup:true
                    });
                }
                if ($("#AmsRecordTabs").length>0){
                    var tabs = $('#AmsRecordTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsRecordTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsRecordTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsRecordTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsRecordTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsRecordTabs').tabs('select',0);
                }
                $("#amsLowrecordinId").val("");

                var amsuserTypeData;
                amsuserTypeData =  $.totemUtils.getTypeCode('AMSUSER_TYPE');
                if (amsuserTypeData!=undefined&&null!=amsuserTypeData){
                    $("#AmsRecordForm #amsuserType").combobox({
                        data:amsuserTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsRecord_AmsuserType").length>0&&$("#amsRecord_AmsuserType").val()!=""){
                                $(this).combobox('select',$("#amsRecord_AmsuserType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsRecord_AmsuserType").length>0&&$("#amsRecord_AmsuserType").val()!=""){
                    $("#amsuserType").combobox('setValue',$("#amsRecord_AmsuserType").val());
                    $("#amsuserType").parent().hide();
                }
                var secretLevelData;
                secretLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secretLevelData!=undefined&&null!=secretLevelData){
                    $("#AmsRecordForm #secretLevel").combobox({
                        data:secretLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsRecord_SecretLevel").length>0&&$("#amsRecord_SecretLevel").val()!=""){
                                $(this).combobox('select',$("#amsRecord_SecretLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsRecord_SecretLevel").length>0&&$("#amsRecord_SecretLevel").val()!=""){
                    $("#secretLevel").combobox('setValue',$("#amsRecord_SecretLevel").val());
                    $("#secretLevel").parent().hide();
                }
                if ($("#amsRecord_BoxNo").length>0&&$("#amsRecord_BoxNo").val()!=""){
                    $("#boxNo").val($("#amsRecord_BoxNo").val());
                }
                var fileStateData;
                fileStateData =  $.totemUtils.getTypeCode('FILE_STATE');
                if (fileStateData!=undefined&&null!=fileStateData){
                    $("#AmsRecordForm #fileState").combobox({
                        data:fileStateData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsRecord_FileState").length>0&&$("#amsRecord_FileState").val()!=""){
                                $(this).combobox('select',$("#amsRecord_FileState").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsRecord_FileState").length>0&&$("#amsRecord_FileState").val()!=""){
                    $("#fileState").combobox('setValue',$("#amsRecord_FileState").val());
                    $("#fileState").parent().hide();
                }
                $("#AmsRecordForm").form("load",  _appsite +"manage/amsrecord/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsRecordForm").form("load",  _appsite +"manage/amsrecord/query/"+$("#amsLowrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});