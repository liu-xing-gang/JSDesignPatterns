function saveAmsLowrecordin() {
    $("#amsLowrecordinSave").hide();
    var grid = undefined;
    if (parent.$.AmsLowrecordin){
        grid = parent.$.AmsLowrecordin.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsLowrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsLowrecordinForm").serialize();
        $.post(_appsite + "manage/amslowrecordin/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsLowrecordinWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsLowrecordinSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsLowrecordinForm").form("submit", {
            url : _appsite + "manage/amslowrecordin/update",
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
                            parent.$('#AmsLowrecordinWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "低压档案入库保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsLowrecordinSave").show();
                    }
                }catch (e){
                    parent.$('#AmsLowrecordinWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsLowrecordinSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsLowrecordinTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsLowrecordinTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsLowrecordinValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsLowrecordin_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsLowrecordinForm").form({
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

    $("#AmsLowrecordinForm #boxNo").combogrid({
        onSelect : function(record) {
            changeAmsLowrecordinValue("boxNo",$("#AmsLowrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsLowrecordinForm #boxNo").combogrid('grid').datagrid('getSelected')){
                changeAmsLowrecordinValue("boxNo",$("#AmsLowrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsLowrecordinValue("boxNo",data.rows[0]);
            }
        }
    });

    $("#AmsLowrecordinForm #businessNo").combogrid({
        onSelect : function(record) {
            changeAmsLowrecordinValue("businessNo",$("#AmsLowrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsLowrecordinForm #businessNo").combogrid('grid').datagrid('getSelected')){
                changeAmsLowrecordinValue("businessNo",$("#AmsLowrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsLowrecordinValue("businessNo",data.rows[0]);
            }
        }
    });
    $("#AmsLowrecordinForm #userType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('LOW_USER_TYPE')
    });

    $("#userType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsLowrecordinValue("userType",record);
            }
        }
    });

    $("#AmsLowrecordinForm #secretLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secretLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsLowrecordinValue("secretLevel",record);
            }
        }
    });

    $("#AmsLowrecordinForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsLowrecordinForm #boxNo").length>0&&(data.boxNo)&&data.boxNo!=""){
                $("#AmsLowrecordinForm #boxNo").combogrid("grid").datagrid("options").queryParams.q=data.boxNo;
                $("#AmsLowrecordinForm #boxNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsLowrecordinForm #businessNo").length>0&&(data.businessNo)&&data.businessNo!=""){
                $("#AmsLowrecordinForm #businessNo").combogrid("grid").datagrid("options").queryParams.q=data.businessNo;
                $("#AmsLowrecordinForm #businessNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsLowrecordinForm #userType").length>0){
                var userType = $("#AmsLowrecordinForm #userType").combobox('getValue');
                if ((data.userType||"")!=""){
                    userType = data.userType;
                }
                $("#AmsLowrecordinForm #userType").combobox({data:$.totemUtils.getTypeCode('LOW_USER_TYPE')});
                if ((userType||"")!=""){
                    $("#AmsLowrecordinForm #userType").combobox('select',userType);
                }
            }
            if ($("#AmsLowrecordinForm #secretLevel").length>0){
                var secretLevel = $("#AmsLowrecordinForm #secretLevel").combobox('getValue');
                if ((data.secretLevel||"")!=""){
                    secretLevel = data.secretLevel;
                }
                $("#AmsLowrecordinForm #secretLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secretLevel||"")!=""){
                    $("#AmsLowrecordinForm #secretLevel").combobox('select',secretLevel);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsLowrecordinTabs").length>0){
                var height = $('#AmsLowrecordinTabs').outerHeight();
                if ($('#AmsLowrecordinTabs').tabs('exists',"档案业务")){
                    var tab = $('#AmsLowrecordinTabs').tabs('getTab',"档案业务");
                    tab.css("height",height+3);
                    var para = "?amsBussionessId="+data.amsLowrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsLowrecordinTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsbusioness"+para,
                            id:"AmsBusioness"
                        }
                    });
                }
            }

            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsLowrecordinForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsLowrecordinTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsLowrecordinTabs").tabs("tabs").length==1){
                $("#AmsLowrecordinTabs").tabs("hideHeader");
            }
            $("#AmsLowrecordinTabs").tabs("resize",{"height":height});
            $("#AmsLowrecordinTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsLowrecordinTab($('#AmsLowrecordinTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsLowrecordinTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsLowrecordinTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsLowrecordinTabs").length>0){
                var tabs = $('#AmsLowrecordinTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsLowrecordinTabs').tabs('select',index);
                        $('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsLowrecordinId").length>0&&$("#amsLowrecordinId").val()!=""){
                ids = $("#amsLowrecordinId").val();
            }
            $("#AmsLowrecordinForm").form("load",_appsite + "manage/amslowrecordin/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsLowrecordinTabs").length>0){
                    var tabs = $('#AmsLowrecordinTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsLowrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsLowrecordinTabs').tabs('select',0);
                }
                $("#amsLowrecordinId").val("");

                if ($("#amsLowrecordin_BoxNo").length>0&&$("#amsLowrecordin_BoxNo").val()!=""){
                    $("#boxNo").combogrid('setValue',$("#amsLowrecordin_BoxNo").val());
                    $("#boxNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsLowrecordin_BoxNo").val();
                    $("#boxNo").combogrid("grid").datagrid("reload");
                    $("#boxNo").parent().hide();
                }
                if ($("#amsLowrecordin_BusinessNo").length>0&&$("#amsLowrecordin_BusinessNo").val()!=""){
                    $("#businessNo").combogrid('setValue',$("#amsLowrecordin_BusinessNo").val());
                    $("#businessNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsLowrecordin_BusinessNo").val();
                    $("#businessNo").combogrid("grid").datagrid("reload");
                    $("#businessNo").parent().hide();
                }
                var userTypeData;
                userTypeData =  $.totemUtils.getTypeCode('LOW_USER_TYPE');
                if (userTypeData!=undefined&&null!=userTypeData){
                    $("#AmsLowrecordinForm #userType").combobox({
                        data:userTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsLowrecordin_UserType").length>0&&$("#amsLowrecordin_UserType").val()!=""){
                                $(this).combobox('select',$("#amsLowrecordin_UserType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsLowrecordin_UserType").length>0&&$("#amsLowrecordin_UserType").val()!=""){
                    $("#userType").combobox('setValue',$("#amsLowrecordin_UserType").val());
                    $("#userType").parent().hide();
                }
                var secretLevelData;
                secretLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secretLevelData!=undefined&&null!=secretLevelData){
                    $("#AmsLowrecordinForm #secretLevel").combobox({
                        data:secretLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsLowrecordin_SecretLevel").length>0&&$("#amsLowrecordin_SecretLevel").val()!=""){
                                $(this).combobox('select',$("#amsLowrecordin_SecretLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsLowrecordin_SecretLevel").length>0&&$("#amsLowrecordin_SecretLevel").val()!=""){
                    $("#secretLevel").combobox('setValue',$("#amsLowrecordin_SecretLevel").val());
                    $("#secretLevel").parent().hide();
                }
                $("#AmsLowrecordinForm").form("load",  _appsite +"manage/amslowrecordin/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsLowrecordinForm").form("load",  _appsite +"manage/amslowrecordin/query/"+$("#amsLowrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});