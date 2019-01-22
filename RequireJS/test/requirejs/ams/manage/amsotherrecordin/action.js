function saveAmsOtherrecordin() {
    $("#amsOtherrecordinSave").hide();
    var grid = undefined;
    if (parent.$.AmsOtherrecordin){
        grid = parent.$.AmsOtherrecordin.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsHighrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsOtherrecordinForm").serialize();
        $.post(_appsite + "manage/amsotherrecordin/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsOtherrecordinWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsOtherrecordinSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsOtherrecordinForm").form("submit", {
            url : _appsite + "manage/amsotherrecordin/update",
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
                            parent.$('#AmsOtherrecordinWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "其他档案入库保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsOtherrecordinSave").show();
                    }
                }catch (e){
                    parent.$('#AmsOtherrecordinWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsOtherrecordinSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsOtherrecordinTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsOtherrecordinTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsOtherrecordinValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsOtherrecordin_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsOtherrecordinForm").form({
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

    $("#AmsOtherrecordinForm #boxNo").combogrid({
        onSelect : function(record) {
            changeAmsOtherrecordinValue("boxNo",$("#AmsOtherrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsOtherrecordinForm #boxNo").combogrid('grid').datagrid('getSelected')){
                changeAmsOtherrecordinValue("boxNo",$("#AmsOtherrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsOtherrecordinValue("boxNo",data.rows[0]);
            }
        }
    });

    $("#AmsOtherrecordinForm #businessNo").combogrid({
        onSelect : function(record) {
            changeAmsOtherrecordinValue("businessNo",$("#AmsOtherrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsOtherrecordinForm #businessNo").combogrid('grid').datagrid('getSelected')){
                changeAmsOtherrecordinValue("businessNo",$("#AmsOtherrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsOtherrecordinValue("businessNo",data.rows[0]);
            }
        }
    });
    $("#AmsOtherrecordinForm #secretLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secretLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsOtherrecordinValue("secretLevel",record);
            }
        }
    });

    $("#AmsOtherrecordinForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsOtherrecordinForm #boxNo").length>0&&(data.boxNo)&&data.boxNo!=""){
                $("#AmsOtherrecordinForm #boxNo").combogrid("grid").datagrid("options").queryParams.q=data.boxNo;
                $("#AmsOtherrecordinForm #boxNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsOtherrecordinForm #businessNo").length>0&&(data.businessNo)&&data.businessNo!=""){
                $("#AmsOtherrecordinForm #businessNo").combogrid("grid").datagrid("options").queryParams.q=data.businessNo;
                $("#AmsOtherrecordinForm #businessNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsOtherrecordinForm #secretLevel").length>0){
                var secretLevel = $("#AmsOtherrecordinForm #secretLevel").combobox('getValue');
                if ((data.secretLevel||"")!=""){
                    secretLevel = data.secretLevel;
                }
                $("#AmsOtherrecordinForm #secretLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secretLevel||"")!=""){
                    $("#AmsOtherrecordinForm #secretLevel").combobox('select',secretLevel);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsOtherrecordinTabs").length>0){
                var height = $('#AmsOtherrecordinTabs').outerHeight() - 34;
            }

            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsOtherrecordinForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsOtherrecordinTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsOtherrecordinTabs").tabs("tabs").length==1){
                $("#AmsOtherrecordinTabs").tabs("hideHeader");
            }
            $("#AmsOtherrecordinTabs").tabs("resize",{"height":height});
            $("#AmsOtherrecordinTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsOtherrecordinTab($('#AmsOtherrecordinTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsOtherrecordinTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsOtherrecordinTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsOtherrecordinTabs").length>0){
                var tabs = $('#AmsOtherrecordinTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsOtherrecordinTabs').tabs('select',index);
                        $('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsHighrecordinId").length>0&&$("#amsHighrecordinId").val()!=""){
                ids = $("#amsHighrecordinId").val();
            }
            $("#AmsOtherrecordinForm").form("load",_appsite + "manage/amsotherrecordin/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsOtherrecordinTabs").length>0){
                    var tabs = $('#AmsOtherrecordinTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsOtherrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsOtherrecordinTabs').tabs('select',0);
                }
                $("#amsHighrecordinId").val("");

                if ($("#amsOtherrecordin_BoxNo").length>0&&$("#amsOtherrecordin_BoxNo").val()!=""){
                    $("#boxNo").combogrid('setValue',$("#amsOtherrecordin_BoxNo").val());
                    $("#boxNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsOtherrecordin_BoxNo").val();
                    $("#boxNo").combogrid("grid").datagrid("reload");
                    $("#boxNo").parent().hide();
                }
                if ($("#amsOtherrecordin_BusinessNo").length>0&&$("#amsOtherrecordin_BusinessNo").val()!=""){
                    $("#businessNo").combogrid('setValue',$("#amsOtherrecordin_BusinessNo").val());
                    $("#businessNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsOtherrecordin_BusinessNo").val();
                    $("#businessNo").combogrid("grid").datagrid("reload");
                    $("#businessNo").parent().hide();
                }
                var secretLevelData;
                secretLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secretLevelData!=undefined&&null!=secretLevelData){
                    $("#AmsOtherrecordinForm #secretLevel").combobox({
                        data:secretLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsOtherrecordin_SecretLevel").length>0&&$("#amsOtherrecordin_SecretLevel").val()!=""){
                                $(this).combobox('select',$("#amsOtherrecordin_SecretLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsOtherrecordin_SecretLevel").length>0&&$("#amsOtherrecordin_SecretLevel").val()!=""){
                    $("#secretLevel").combobox('setValue',$("#amsOtherrecordin_SecretLevel").val());
                    $("#secretLevel").parent().hide();
                }
                $("#AmsOtherrecordinForm").form("load",  _appsite +"manage/amsotherrecordin/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsOtherrecordinForm").form("load",  _appsite +"manage/amsotherrecordin/query/"+$("#amsHighrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});