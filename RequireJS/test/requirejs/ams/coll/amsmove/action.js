function saveAmsMove() {
    $("#amsMoveSave").hide();
    var grid = undefined;
    if (parent.$.AmsMove){
        grid = parent.$.AmsMove.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsMoveId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsMoveForm").serialize();
        $.post(_appsite + "coll/amsmove/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsMoveWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsMoveSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsMoveForm").form("submit", {
            url : _appsite + "coll/amsmove/update",
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
                            parent.$('#AmsMoveWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案移动保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsMoveSave").show();
                    }
                }catch (e){
                    parent.$('#AmsMoveWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsMoveSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsMoveValue(parent,data){
    if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
        if (!$.t_coll.onChange("AmsMove_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsMoveForm").form({
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

    $("#AmsMoveForm #hallName").combobox({
        valueField :"hallName",
        textField:"hallName",
        data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
    });

    $("#hallName").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMoveValue("hallName",record);
            }
        }
    });

    $("#AmsMoveForm #storageName").combobox({
        valueField :"storageName",
        textField:"storageName",
        data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
    });

    $("#storageName").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMoveValue("storageName",record);
            }
        }
    });

    $("#AmsMoveForm #storage").combobox({
        valueField :"",
        textField:"",
        data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
    });

    $("#storage").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsMoveValue("storage",record);
            }
        }
    });

    $("#AmsMoveForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsMoveForm #hallName").length>0){
                var hallName = $("#AmsMoveForm #hallName").combobox('getValue');
                if ((data.hallName||"")!=""){
                    hallName = data.hallName;
                }
                
                if ((hallName||"")!=""){
                    $("#AmsMoveForm #hallName").combobox('select',hallName);
                }
            }
            if ($("#AmsMoveForm #storageName").length>0){
                var storageName = $("#AmsMoveForm #storageName").combobox('getValue');
                if ((data.storageName||"")!=""){
                    storageName = data.storageName;
                }
                
                if ((storageName||"")!=""){
                    $("#AmsMoveForm #storageName").combobox('select',storageName);
                }
            }
            if ($("#AmsMoveForm #storage").length>0){
                var storage = $("#AmsMoveForm #storage").combobox('getValue');
                if ((data.storage||"")!=""){
                    storage = data.storage;
                }
                
                if ((storage||"")!=""){
                    $("#AmsMoveForm #storage").combobox('select',storage);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_coll!=undefined&&$.t_coll.onFormLoad!=undefined){
                $.t_coll.onFormLoad("AmsMoveForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsMoveTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsMoveTabs").tabs("tabs").length==1){
                $("#AmsMoveTabs").tabs("hideHeader");
            }
            $("#AmsMoveTabs").tabs("resize",{"height":height});
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsMoveTabs").length>0){
                var tabs = $('#AmsMoveTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsMoveTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsMoveTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsMoveTabs').tabs('select',index);
                        $('#AmsMoveTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsMoveId").length>0&&$("#amsMoveId").val()!=""){
                ids = $("#amsMoveId").val();
            }
            $("#AmsMoveForm").form("load",_appsite + "coll/amsmove/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsMoveTabs").length>0){
                    var tabs = $('#AmsMoveTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsMoveTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsMoveTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsMoveTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsMoveTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsMoveTabs').tabs('select',0);
                }
                $("#amsMoveId").val("");

                var hallNameData;
                try{
                        hallNameData =  $.totemUtils.getJson('cfg/amsstorage/queryAuthAll?='+'','get');
                    }catch (e){}
                if (hallNameData!=undefined&&null!=hallNameData){
                    $("#AmsMoveForm #hallName").combobox({
                        data:hallNameData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMove_HallName").length>0&&$("#amsMove_HallName").val()!=""){
                                $(this).combobox('select',$("#amsMove_HallName").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['hallName']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMove_HallName").length>0&&$("#amsMove_HallName").val()!=""){
                    $("#hallName").combobox('setValue',$("#amsMove_HallName").val());
                    $("#hallName").parent().hide();
                }
                var storageNameData;
                try{
                        storageNameData =  $.totemUtils.getJson('cfg/amsstorage/queryAuthAll?='+'','get');
                    }catch (e){}
                if (storageNameData!=undefined&&null!=storageNameData){
                    $("#AmsMoveForm #storageName").combobox({
                        data:storageNameData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMove_StorageName").length>0&&$("#amsMove_StorageName").val()!=""){
                                $(this).combobox('select',$("#amsMove_StorageName").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['storageName']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMove_StorageName").length>0&&$("#amsMove_StorageName").val()!=""){
                    $("#storageName").combobox('setValue',$("#amsMove_StorageName").val());
                    $("#storageName").parent().hide();
                }
                var storageData;
                try{
                        storageData =  $.totemUtils.getJson('cfg/amsstorage/queryAuthAll?='+'','get');
                    }catch (e){}
                if (storageData!=undefined&&null!=storageData){
                    $("#AmsMoveForm #storage").combobox({
                        data:storageData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsMove_Storage").length>0&&$("#amsMove_Storage").val()!=""){
                                $(this).combobox('select',$("#amsMove_Storage").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsMove_Storage").length>0&&$("#amsMove_Storage").val()!=""){
                    $("#storage").combobox('setValue',$("#amsMove_Storage").val());
                    $("#storage").parent().hide();
                }
                $("#AmsMoveForm").form("load",  _appsite +"coll/amsmove/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsMoveForm").form("load",  _appsite +"coll/amsmove/query/"+$("#amsMoveId").val());
            }
        }
        document.body.style.visibility = 'visible';
});