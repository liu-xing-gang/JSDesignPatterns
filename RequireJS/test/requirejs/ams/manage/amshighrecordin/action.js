function saveAmsHighrecordin() {
    $("#amsHighrecordinSave").hide();
    var grid = undefined;
    if (parent.$.AmsHighrecordin){
        grid = parent.$.AmsHighrecordin.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsHighrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsHighrecordinForm").serialize();
        $.post(_appsite + "manage/amshighrecordin/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsHighrecordinWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsHighrecordinSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsHighrecordinForm").form("submit", {
            url : _appsite + "manage/amshighrecordin/update",
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
                            parent.$('#AmsHighrecordinWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "高压档案入库保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsHighrecordinSave").show();
                    }
                }catch (e){
                    parent.$('#AmsHighrecordinWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsHighrecordinSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsHighrecordinTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsHighrecordinTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsHighrecordinValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsHighrecordin_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsHighrecordinForm").form({
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

    $("#AmsHighrecordinForm #boxNo").combogrid({
        onSelect : function(record) {
            changeAmsHighrecordinValue("boxNo",$("#AmsHighrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsHighrecordinForm #boxNo").combogrid('grid').datagrid('getSelected')){
                changeAmsHighrecordinValue("boxNo",$("#AmsHighrecordinForm #boxNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsHighrecordinValue("boxNo",data.rows[0]);
            }
        }
    });

    $("#AmsHighrecordinForm #businessNo").combogrid({
        onSelect : function(record) {
            changeAmsHighrecordinValue("businessNo",$("#AmsHighrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsHighrecordinForm #businessNo").combogrid('grid').datagrid('getSelected')){
                changeAmsHighrecordinValue("businessNo",$("#AmsHighrecordinForm #businessNo").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsHighrecordinValue("businessNo",data.rows[0]);
            }
        }
    });
    $("#AmsHighrecordinForm #secretLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secretLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsHighrecordinValue("secretLevel",record);
            }
        }
    });

    $("#AmsHighrecordinForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsHighrecordinForm #boxNo").length>0&&(data.boxNo)&&data.boxNo!=""){
                $("#AmsHighrecordinForm #boxNo").combogrid("grid").datagrid("options").queryParams.q=data.boxNo;
                $("#AmsHighrecordinForm #boxNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsHighrecordinForm #businessNo").length>0&&(data.businessNo)&&data.businessNo!=""){
                $("#AmsHighrecordinForm #businessNo").combogrid("grid").datagrid("options").queryParams.q=data.businessNo;
                $("#AmsHighrecordinForm #businessNo").combogrid("grid").datagrid("reload");
            }
            if ($("#AmsHighrecordinForm #secretLevel").length>0){
                var secretLevel = $("#AmsHighrecordinForm #secretLevel").combobox('getValue');
                if ((data.secretLevel||"")!=""){
                    secretLevel = data.secretLevel;
                }
                $("#AmsHighrecordinForm #secretLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secretLevel||"")!=""){
                    $("#AmsHighrecordinForm #secretLevel").combobox('select',secretLevel);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsHighrecordinTabs").length>0){
                var height = $('#AmsHighrecordinTabs').outerHeight() - 34;
            }

            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsHighrecordinForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsHighrecordinTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsHighrecordinTabs").tabs("tabs").length==1){
                $("#AmsHighrecordinTabs").tabs("hideHeader");
            }
            $("#AmsHighrecordinTabs").tabs("resize",{"height":height});
            $("#AmsHighrecordinTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsHighrecordinTab($('#AmsHighrecordinTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsHighrecordinTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsHighrecordinTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsHighrecordinTabs").length>0){
                var tabs = $('#AmsHighrecordinTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsHighrecordinTabs').tabs('select',index);
                        $('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsHighrecordinId").length>0&&$("#amsHighrecordinId").val()!=""){
                ids = $("#amsHighrecordinId").val();
            }
            $("#AmsHighrecordinForm").form("load",_appsite + "manage/amshighrecordin/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsHighrecordinTabs").length>0){
                    var tabs = $('#AmsHighrecordinTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsHighrecordinTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsHighrecordinTabs').tabs('select',0);
                }
                $("#amsHighrecordinId").val("");

                if ($("#amsHighrecordin_BoxNo").length>0&&$("#amsHighrecordin_BoxNo").val()!=""){
                    $("#boxNo").combogrid('setValue',$("#amsHighrecordin_BoxNo").val());
                    $("#boxNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsHighrecordin_BoxNo").val();
                    $("#boxNo").combogrid("grid").datagrid("reload");
                    $("#boxNo").parent().hide();
                }
                if ($("#amsHighrecordin_BusinessNo").length>0&&$("#amsHighrecordin_BusinessNo").val()!=""){
                    $("#businessNo").combogrid('setValue',$("#amsHighrecordin_BusinessNo").val());
                    $("#businessNo").combogrid("grid").datagrid("options").queryParams.q=$("#amsHighrecordin_BusinessNo").val();
                    $("#businessNo").combogrid("grid").datagrid("reload");
                    $("#businessNo").parent().hide();
                }
                var secretLevelData;
                secretLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secretLevelData!=undefined&&null!=secretLevelData){
                    $("#AmsHighrecordinForm #secretLevel").combobox({
                        data:secretLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsHighrecordin_SecretLevel").length>0&&$("#amsHighrecordin_SecretLevel").val()!=""){
                                $(this).combobox('select',$("#amsHighrecordin_SecretLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsHighrecordin_SecretLevel").length>0&&$("#amsHighrecordin_SecretLevel").val()!=""){
                    $("#secretLevel").combobox('setValue',$("#amsHighrecordin_SecretLevel").val());
                    $("#secretLevel").parent().hide();
                }
                $("#AmsHighrecordinForm").form("load",  _appsite +"manage/amshighrecordin/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsHighrecordinForm").form("load",  _appsite +"manage/amshighrecordin/query/"+$("#amsHighrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});