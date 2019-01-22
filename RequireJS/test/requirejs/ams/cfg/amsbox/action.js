function saveAmsBox() {
    $("#amsBoxSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#amsHighrecordinId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBoxForm").serialize();
        $.post(_appsite + "cfg/amsbox/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsBoxWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案盒信息授权完成！"
                    });
                    parent.$('#AmsBoxWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案盒信息授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBoxSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsBoxForm").form("submit", {
            url : _appsite + "cfg/amsbox/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsBoxWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案盒信息保存成功！"
                            });
                            parent.$('#AmsBoxWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案盒信息保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBoxSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBoxWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBoxSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsBoxValue(parent,data){
    if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
        if (!$.t_cfg.onChange("AmsBox_"+parent,data)){
            return;
        }
    }
}

function updateAmsBoxTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsBoxTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
$(function() {
    $("#AmsBoxForm").form({
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

    $("#AmsBoxForm #boxType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('BOX_TYPE')
    });

    $("#boxType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBoxValue("boxType",record);
            }
        }
    });

    $("#AmsBoxForm #boxState").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('BOX_STATE')
    });

    $("#boxState").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBoxValue("boxState",record);
            }
        }
    });

    $("#AmsBoxForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsBoxForm #boxType").length>0){
                var boxType = $("#AmsBoxForm #boxType").combobox('getValue');
                if ((data.boxType||"")!=""){
                    boxType = data.boxType;
                }
                $("#AmsBoxForm #boxType").combobox({data:$.totemUtils.getTypeCode('BOX_TYPE')});
                if ((boxType||"")!=""){
                    $("#AmsBoxForm #boxType").combobox('select',boxType);
                }
            }
            if ($("#AmsBoxForm #boxState").length>0){
                var boxState = $("#AmsBoxForm #boxState").combobox('getValue');
                if ((data.boxState||"")!=""){
                    boxState = data.boxState;
                }
                $("#AmsBoxForm #boxState").combobox({data:$.totemUtils.getTypeCode('BOX_STATE')});
                if ((boxState||"")!=""){
                    $("#AmsBoxForm #boxState").combobox('select',boxState);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsBoxTabs").length>0){
                var height = $('#AmsBoxTabs').outerHeight() - 34;
                if ($('#AmsBoxTabs').tabs('exists',"档案袋信息")){
                    var tab = $('#AmsBoxTabs').tabs('getTab',"档案袋信息");
                    tab.css("height",height+3);
                    var para = "?boxNo="+data.amsHighrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsBoxTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amspock"+para,
                            id:"AmsPock"
                        }
                    });
                }
                if ($('#AmsBoxTabs').tabs('exists',"用户档案入库")){
                    var tab = $('#AmsBoxTabs').tabs('getTab',"用户档案入库");
                    tab.css("height",height+3);
                    var para = "?boxNo="+data.amsHighrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsBoxTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amsrecord"+para,
                            id:"AmsRecord"
                        }
                    });
                }
            }

            if ($.t_cfg!=undefined&&$.t_cfg.onFormLoad!=undefined){
                $.t_cfg.onFormLoad("AmsBoxForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBoxTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBoxTabs").tabs("tabs").length==1){
                $("#AmsBoxTabs").tabs("hideHeader");
            }
            $("#AmsBoxTabs").tabs("resize",{"height":height});
            $("#AmsBoxTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsBoxTab($('#AmsBoxTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsBoxTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsBoxTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBoxTabs").length>0){
                var tabs = $('#AmsBoxTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBoxTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBoxTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBoxTabs').tabs('select',index);
                        $('#AmsBoxTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsHighrecordinId").length>0&&$("#amsHighrecordinId").val()!=""){
                ids = $("#amsHighrecordinId").val();
            }
            $("#AmsBoxForm").form("load",_appsite + "cfg/amsbox/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsBoxTabs").length>0){
                    var tabs = $('#AmsBoxTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBoxTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBoxTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBoxTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBoxTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBoxTabs').tabs('select',0);
                }
                $("#amsHighrecordinId").val("");

                var boxTypeData;
                boxTypeData =  $.totemUtils.getTypeCode('BOX_TYPE');
                if (boxTypeData!=undefined&&null!=boxTypeData){
                    $("#AmsBoxForm #boxType").combobox({
                        data:boxTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBox_BoxType").length>0&&$("#amsBox_BoxType").val()!=""){
                                $(this).combobox('select',$("#amsBox_BoxType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBox_BoxType").length>0&&$("#amsBox_BoxType").val()!=""){
                    $("#boxType").combobox('setValue',$("#amsBox_BoxType").val());
                    $("#boxType").parent().hide();
                }
                if ($("#amsBox_BoxNo").length>0&&$("#amsBox_BoxNo").val()!=""){
                    $("#boxNo").val($("#amsBox_BoxNo").val());
                }
                var boxStateData;
                boxStateData =  $.totemUtils.getTypeCode('BOX_STATE');
                if (boxStateData!=undefined&&null!=boxStateData){
                    $("#AmsBoxForm #boxState").combobox({
                        data:boxStateData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBox_BoxState").length>0&&$("#amsBox_BoxState").val()!=""){
                                $(this).combobox('select',$("#amsBox_BoxState").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBox_BoxState").length>0&&$("#amsBox_BoxState").val()!=""){
                    $("#boxState").combobox('setValue',$("#amsBox_BoxState").val());
                    $("#boxState").parent().hide();
                }
                if ($("#amsBox_LibNo").length>0&&$("#amsBox_LibNo").val()!=""){
                    $("#libNo").val($("#amsBox_LibNo").val());
                }
                if ($("#amsBox_BoxMh").length>0&&$("#amsBox_BoxMh").val()!=""){
                    $("#boxMh").val($("#amsBox_BoxMh").val());
                }
                $("#AmsBoxForm").form("load",  _appsite +"cfg/amsbox/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBoxForm").form("load",  _appsite +"cfg/amsbox/query/"+$("#amsHighrecordinId").val());
            }
        }
        document.body.style.visibility = 'visible';
});