function saveAmsBorrowMana() {
    $("#amsBorrowManaSave").hide();
    var grid = undefined;
    if (parent.$.AmsBorrowMana){
        grid = parent.$.AmsBorrowMana.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsBorrowManaId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsBorrowManaForm").serialize();
        $.post(_appsite + "borrow/amsborrowmana/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsBorrowManaWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsBorrowManaSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsBorrowManaForm").form("submit", {
            url : _appsite + "borrow/amsborrowmana/update",
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
                            parent.$('#AmsBorrowManaWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "借阅管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsBorrowManaSave").show();
                    }
                }catch (e){
                    parent.$('#AmsBorrowManaWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBorrowManaSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsBorrowManaTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsBorrowManaTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsBorrowManaValue(parent,data){
    if ($.t_borrow!=undefined&&$.t_borrow.onChange!=undefined){
        if (!$.t_borrow.onChange("AmsBorrowMana_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsBorrowManaForm").form({
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

    $("#AmsBorrowManaForm #borrowStatus").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('APPROVAL_STATUS')
    });

    $("#borrowStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBorrowManaValue("borrowStatus",record);
            }
        }
    });

    $("#AmsBorrowManaForm #elecStatus").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('ELEC_STATUS')
    });

    $("#elecStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBorrowManaValue("elecStatus",record);
            }
        }
    });

    $("#AmsBorrowManaForm #paperStatus").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('PAPER_STATUS')
    });

    $("#paperStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsBorrowManaValue("paperStatus",record);
            }
        }
    });

    $("#AmsBorrowManaForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsBorrowManaForm #borrowStatus").length>0){
                var borrowStatus = $("#AmsBorrowManaForm #borrowStatus").combobox('getValue');
                if ((data.borrowStatus||"")!=""){
                    borrowStatus = data.borrowStatus;
                }
                $("#AmsBorrowManaForm #borrowStatus").combobox({data:$.totemUtils.getTypeCode('APPROVAL_STATUS')});
                if ((borrowStatus||"")!=""){
                    $("#AmsBorrowManaForm #borrowStatus").combobox('select',borrowStatus);
                }
            }
            if ($("#AmsBorrowManaForm #elecStatus").length>0){
                var elecStatus = $("#AmsBorrowManaForm #elecStatus").combobox('getValue');
                if ((data.elecStatus||"")!=""){
                    elecStatus = data.elecStatus;
                }
                $("#AmsBorrowManaForm #elecStatus").combobox({data:$.totemUtils.getTypeCode('ELEC_STATUS')});
                if ((elecStatus||"")!=""){
                    $("#AmsBorrowManaForm #elecStatus").combobox('select',elecStatus);
                }
            }
            if ($("#AmsBorrowManaForm #paperStatus").length>0){
                var paperStatus = $("#AmsBorrowManaForm #paperStatus").combobox('getValue');
                if ((data.paperStatus||"")!=""){
                    paperStatus = data.paperStatus;
                }
                $("#AmsBorrowManaForm #paperStatus").combobox({data:$.totemUtils.getTypeCode('PAPER_STATUS')});
                if ((paperStatus||"")!=""){
                    $("#AmsBorrowManaForm #paperStatus").combobox('select',paperStatus);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsBorrowManaTabs").length>0){
                var height = $('#AmsBorrowManaTabs').outerHeight();
                if ($('#AmsBorrowManaTabs').tabs('exists',"借阅清单")){
                    var tab = $('#AmsBorrowManaTabs').tabs('getTab',"借阅清单");
                    tab.css("height",height+3);
                    var para = "?="+data.amsBorrowManaId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsBorrowManaTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"borrow/amsborrowdetail"+para,
                            id:"AmsBorrowDetail"
                        }
                    });
                }
            }

            if ($.t_borrow!=undefined&&$.t_borrow.onFormLoad!=undefined){
                $.t_borrow.onFormLoad("AmsBorrowManaForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsBorrowManaTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsBorrowManaTabs").tabs("tabs").length==1){
                $("#AmsBorrowManaTabs").tabs("hideHeader");
            }
            $("#AmsBorrowManaTabs").tabs("resize",{"height":height});
            $("#AmsBorrowManaTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsBorrowManaTab($('#AmsBorrowManaTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsBorrowManaTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsBorrowManaTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsBorrowManaTabs").length>0){
                var tabs = $('#AmsBorrowManaTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsBorrowManaTabs').tabs('select',index);
                        $('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsBorrowManaId").length>0&&$("#amsBorrowManaId").val()!=""){
                ids = $("#amsBorrowManaId").val();
            }
            $("#AmsBorrowManaForm").form("load",_appsite + "borrow/amsborrowmana/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsBorrowManaTabs").length>0){
                    var tabs = $('#AmsBorrowManaTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsBorrowManaTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsBorrowManaTabs').tabs('select',0);
                }
                $("#amsBorrowManaId").val("");

                var borrowStatusData;
                borrowStatusData =  $.totemUtils.getTypeCode('APPROVAL_STATUS');
                if (borrowStatusData!=undefined&&null!=borrowStatusData){
                    $("#AmsBorrowManaForm #borrowStatus").combobox({
                        data:borrowStatusData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBorrowMana_BorrowStatus").length>0&&$("#amsBorrowMana_BorrowStatus").val()!=""){
                                $(this).combobox('select',$("#amsBorrowMana_BorrowStatus").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBorrowMana_BorrowStatus").length>0&&$("#amsBorrowMana_BorrowStatus").val()!=""){
                    $("#borrowStatus").combobox('setValue',$("#amsBorrowMana_BorrowStatus").val());
                    $("#borrowStatus").parent().hide();
                }
                var elecStatusData;
                elecStatusData =  $.totemUtils.getTypeCode('ELEC_STATUS');
                if (elecStatusData!=undefined&&null!=elecStatusData){
                    $("#AmsBorrowManaForm #elecStatus").combobox({
                        data:elecStatusData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBorrowMana_ElecStatus").length>0&&$("#amsBorrowMana_ElecStatus").val()!=""){
                                $(this).combobox('select',$("#amsBorrowMana_ElecStatus").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBorrowMana_ElecStatus").length>0&&$("#amsBorrowMana_ElecStatus").val()!=""){
                    $("#elecStatus").combobox('setValue',$("#amsBorrowMana_ElecStatus").val());
                    $("#elecStatus").parent().hide();
                }
                var paperStatusData;
                paperStatusData =  $.totemUtils.getTypeCode('PAPER_STATUS');
                if (paperStatusData!=undefined&&null!=paperStatusData){
                    $("#AmsBorrowManaForm #paperStatus").combobox({
                        data:paperStatusData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsBorrowMana_PaperStatus").length>0&&$("#amsBorrowMana_PaperStatus").val()!=""){
                                $(this).combobox('select',$("#amsBorrowMana_PaperStatus").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsBorrowMana_PaperStatus").length>0&&$("#amsBorrowMana_PaperStatus").val()!=""){
                    $("#paperStatus").combobox('setValue',$("#amsBorrowMana_PaperStatus").val());
                    $("#paperStatus").parent().hide();
                }
                $("#AmsBorrowManaForm").form("load",  _appsite +"borrow/amsborrowmana/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsBorrowManaForm").form("load",  _appsite +"borrow/amsborrowmana/query/"+$("#amsBorrowManaId").val());
            }
        }
        document.body.style.visibility = 'visible';
});