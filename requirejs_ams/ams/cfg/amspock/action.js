function saveAmsPock() {
    $("#amsPockSave").hide();
    var grid = undefined;
    if (parent.$.AmsPock){
        grid = parent.$.AmsPock.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsHighrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsPockForm").serialize();
        $.post(_appsite + "cfg/amspock/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsPockWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsPockSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsPockForm").form("submit", {
            url : _appsite + "cfg/amspock/update",
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
                            parent.$('#AmsPockWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案袋信息保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsPockSave").show();
                    }
                }catch (e){
                    parent.$('#AmsPockWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsPockSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsPockTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsPockTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsPockValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsPock_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsPockForm").form({
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

    $("#AmsPockForm #boxState").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('POCK_STATE')
    });

    $("#boxState").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsPockValue("boxState",record);
            }
        }
    });

    $("#AmsPockForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsPockForm #boxState").length>0){
                var boxState = $("#AmsPockForm #boxState").combobox('getValue');
                if ((data.boxState||"")!=""){
                    boxState = data.boxState;
                }
                $("#AmsPockForm #boxState").combobox({data:$.totemUtils.getTypeCode('POCK_STATE')});
                if ((boxState||"")!=""){
                    $("#AmsPockForm #boxState").combobox('select',boxState);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsPockTabs").length>0){
                var height = $('#AmsPockTabs').outerHeight();
                if ($('#AmsPockTabs').tabs('exists',"低压档案入库")){
                    var tab = $('#AmsPockTabs').tabs('getTab',"低压档案入库");
                    tab.css("height",height+3);
                    var para = "?boxNo="+data.amsHighrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsPockTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amslowrecordin"+para,
                            id:"AmsLowrecordin"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsPockForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsPockTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsPockTabs").tabs("tabs").length==1){
                $("#AmsPockTabs").tabs("hideHeader");
            }
            $("#AmsPockTabs").tabs("resize",{"height":height});
            $("#AmsPockTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsPockTab($('#AmsPockTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsPockTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsPockTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsPockTabs").length>0){
                var tabs = $('#AmsPockTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsPockTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsPockTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsPockTabs').tabs('select',index);
                        $('#AmsPockTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsHighrecordinId").length>0&&$("#amsHighrecordinId").val()!=""){
                ids = $("#amsHighrecordinId").val();
            }
            $("#AmsPockForm").form("load",_appsite + "cfg/amspock/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsPockTabs").length>0){
                    var tabs = $('#AmsPockTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsPockTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsPockTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsPockTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsPockTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsPockTabs').tabs('select',0);
                }
                $("#amsHighrecordinId").val("");

                var boxStateData;
                boxStateData =  $.totemUtils.getTypeCode('POCK_STATE');
                if (boxStateData!=undefined&&null!=boxStateData){
                    $("#AmsPockForm #boxState").combobox({
                        data:boxStateData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsPock_BoxState").length>0&&$("#amsPock_BoxState").val()!=""){
                                $(this).combobox('select',$("#amsPock_BoxState").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsPock_BoxState").length>0&&$("#amsPock_BoxState").val()!=""){
                    $("#boxState").combobox('setValue',$("#amsPock_BoxState").val());
                    $("#boxState").parent().hide();
                }
                if ($("#amsPock_LibNo").length>0&&$("#amsPock_LibNo").val()!=""){
                    $("#libNo").val($("#amsPock_LibNo").val());
                }
                if ($("#amsPock_BoxNo").length>0&&$("#amsPock_BoxNo").val()!=""){
                    $("#boxNo").val($("#amsPock_BoxNo").val());
                }
                $("#AmsPockForm").form("load",  _appsite +"cfg/amspock/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsPockForm").form("load",  _appsite +"cfg/amspock/query/"+$("#amsHighrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});