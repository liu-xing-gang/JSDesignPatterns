function saveAmsStorage() {
    $("#amsStorageSave").hide();
    var grid = undefined;
    if (parent.$.AmsStorage){
        grid = parent.$.AmsStorage.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#storageId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsStorageForm").serialize();
        $.post(_appsite + "cfg/amsstorage/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsStorageWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsStorageSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsStorageForm").form("submit", {
            url : _appsite + "cfg/amsstorage/update",
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
                            parent.$('#AmsStorageWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "库房管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsStorageSave").show();
                    }
                }catch (e){
                    parent.$('#AmsStorageWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsStorageSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsStorageTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsStorageTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsStorageValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsStorage_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsStorageForm").form({
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

    $("#AmsStorageForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($("#AmsStorageTabs").length>0){
                var height = $('#AmsStorageTabs').outerHeight();
                if ($('#AmsStorageTabs').tabs('exists',"密集柜管理")){
                    var tab = $('#AmsStorageTabs').tabs('getTab',"密集柜管理");
                    tab.css("height",height+3);
                    var para = "?storageName="+data.storageId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsStorageTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsmovablerack"+para,
                            id:"AmsMovableRack"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsStorageForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsStorageTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsStorageTabs").tabs("tabs").length==1){
                $("#AmsStorageTabs").tabs("hideHeader");
            }
            $("#AmsStorageTabs").tabs("resize",{"height":height});
            $("#AmsStorageTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsStorageTab($('#AmsStorageTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsStorageTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsStorageTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsStorageTabs").length>0){
                var tabs = $('#AmsStorageTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsStorageTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsStorageTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsStorageTabs').tabs('select',index);
                        $('#AmsStorageTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#storageId").length>0&&$("#storageId").val()!=""){
                ids = $("#storageId").val();
            }
            $("#AmsStorageForm").form("load",_appsite + "cfg/amsstorage/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsStorageTabs").length>0){
                    var tabs = $('#AmsStorageTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsStorageTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsStorageTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsStorageTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsStorageTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsStorageTabs').tabs('select',0);
                }
                $("#storageId").val("");

                $("#AmsStorageForm").form("load",  _appsite +"cfg/amsstorage/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsStorageForm").form("load",  _appsite +"cfg/amsstorage/query/"+$("#storageId").val());
            }
        }
        document.body.style.visibility = 'visible';
});