function saveAmsBusioness() {
    $("#amsBusionessSave").hide();
    var grid = undefined;
    if (parent.$.AmsBusioness){
        grid = parent.$.AmsBusioness.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsBussionessId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBusionessForm").serialize();
        $.post(_appsite + "cfg/amsbusioness/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsBusionessWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBusionessSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsBusionessForm").form("submit", {
            url : _appsite + "cfg/amsbusioness/update",
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
                            parent.$('#AmsBusionessWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案业务保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBusionessSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBusionessWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBusionessSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsBusionessTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsBusionessTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsBusionessValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsBusioness_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsBusionessForm").form({
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

    $("#AmsBusionessForm").form(
        {onLoadSuccess:function(data){
            if ($("#actionType").val()=="create"){}
            if ($("#AmsBusionessTabs").length>0){
                var height = $('#AmsBusionessTabs').outerHeight();
                if ($('#AmsBusionessTabs').tabs('exists',"档案原文")){
                    var tab = $('#AmsBusionessTabs').tabs('getTab',"档案原文");
                    tab.css("height",height+3);
                    var para = "?businessNo="+data.amsBussionessId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsBusionessTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsfilecontent"+para,
                            id:"AmsFileContent"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsBusionessForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBusionessTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBusionessTabs").tabs("tabs").length==1){
                $("#AmsBusionessTabs").tabs("hideHeader");
            }
            $("#AmsBusionessTabs").tabs("resize",{"height":height});
            $("#AmsBusionessTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsBusionessTab($('#AmsBusionessTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsBusionessTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsBusionessTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBusionessTabs").length>0){
                var tabs = $('#AmsBusionessTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBusionessTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBusionessTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBusionessTabs').tabs('select',index);
                        $('#AmsBusionessTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsBussionessId").length>0&&$("#amsBussionessId").val()!=""){
                ids = $("#amsBussionessId").val();
            }
            $("#AmsBusionessForm").form("load",_appsite + "cfg/amsbusioness/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsBusionessTabs").length>0){
                    var tabs = $('#AmsBusionessTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBusionessTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBusionessTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBusionessTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBusionessTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBusionessTabs').tabs('select',0);
                }
                $("#amsBussionessId").val("");

                if ($("#amsBusioness_UserNo").length>0&&$("#amsBusioness_UserNo").val()!=""){
                    $("#userNo").val($("#amsBusioness_UserNo").val());
                }
                $("#AmsBusionessForm").form("load",  _appsite +"cfg/amsbusioness/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBusionessForm").form("load",  _appsite +"cfg/amsbusioness/query/"+$("#amsBussionessId").val());
            }
        }
        document.body.style.visibility = 'visible';
});