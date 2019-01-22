function saveAmsCheckRecord() {
    $("#amsCheckRecordSave").hide();
    var grid = undefined;
    if (parent.$.AmsCheckRecord){
        grid = parent.$.AmsCheckRecord.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsCheckRecordId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsCheckRecordForm").serialize();
        $.post(_appsite + "manage/amscheckrecord/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsCheckRecordWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsCheckRecordSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsCheckRecordForm").form("submit", {
            url : _appsite + "manage/amscheckrecord/update",
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
                            parent.$('#AmsCheckRecordWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "盘点记录表保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsCheckRecordSave").show();
                    }
                }catch (e){
                    parent.$('#AmsCheckRecordWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsCheckRecordSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsCheckRecordValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsCheckRecord_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsCheckRecordForm").form({
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

    $("#AmsCheckRecordForm #rackId").combobox({
        valueField :"rackNoId",
        textField:"rackNo",
        data:$.totemUtils.getJson('manage/amsrackno/queryAuthAll','get')
    });

    $("#rackId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsCheckRecordValue("rackId",record);
            }
        }
    });

    $("#AmsCheckRecordForm #archiveId").combogrid({
        onSelect : function(record) {
            changeAmsCheckRecordValue("archiveId",$("#AmsCheckRecordForm #archiveId").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#AmsCheckRecordForm #archiveId").combogrid('grid').datagrid('getSelected')){
                changeAmsCheckRecordValue("archiveId",$("#AmsCheckRecordForm #archiveId").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                changeAmsCheckRecordValue("archiveId",data.rows[0]);
            }
        }
    });

    $("#AmsCheckRecordForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsCheckRecordForm #rackId").length>0){
                var rackId = $("#AmsCheckRecordForm #rackId").combobox('getValue');
                if ((data.rackId||"")!=""){
                    rackId = data.rackId;
                }
                
                if ((rackId||"")!=""){
                    $("#AmsCheckRecordForm #rackId").combobox('select',rackId);
                }
            }
            if ($("#AmsCheckRecordForm #archiveId").length>0&&(data.archiveId)&&data.archiveId!=""){
                $("#AmsCheckRecordForm #archiveId").combogrid("grid").datagrid("options").queryParams.q=data.archiveId;
                $("#AmsCheckRecordForm #archiveId").combogrid("grid").datagrid("reload");
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsCheckRecordForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsCheckRecordTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsCheckRecordTabs").tabs("tabs").length==1){
                $("#AmsCheckRecordTabs").tabs("hideHeader");
            }
            $("#AmsCheckRecordTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsCheckRecordTabs").length>0){
                var tabs = $('#AmsCheckRecordTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsCheckRecordTabs').tabs('select',index);
                        $('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsCheckRecordId").length>0&&$("#amsCheckRecordId").val()!=""){
                ids = $("#amsCheckRecordId").val();
            }
            $("#AmsCheckRecordForm").form("load",_appsite + "manage/amscheckrecord/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsCheckRecordTabs").length>0){
                    var tabs = $('#AmsCheckRecordTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsCheckRecordTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsCheckRecordTabs').tabs('select',0);
                }
                $("#amsCheckRecordId").val("");

                var rackIdData;
                try{
                        rackIdData =  $.totemUtils.getJson('manage/amsrackno/queryAuthAll?='+'','get');
                    }catch (e){}
                if (rackIdData!=undefined&&null!=rackIdData){
                    $("#AmsCheckRecordForm #rackId").combobox({
                        data:rackIdData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsCheckRecord_RackId").length>0&&$("#amsCheckRecord_RackId").val()!=""){
                                $(this).combobox('select',$("#amsCheckRecord_RackId").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['rackNoId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsCheckRecord_RackId").length>0&&$("#amsCheckRecord_RackId").val()!=""){
                    $("#rackId").combobox('setValue',$("#amsCheckRecord_RackId").val());
                    $("#rackId").parent().hide();
                }
                $("#AmsCheckRecordForm").form("load",  _appsite +"manage/amscheckrecord/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsCheckRecordForm").form("load",  _appsite +"manage/amscheckrecord/query/"+$("#amsCheckRecordId").val());
            }
        }
        document.body.style.visibility = 'visible';
});