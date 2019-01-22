function saveAmsRackNo() {
    $("#amsRackNoSave").hide();
    if ($("#actionType").val()=="copy"){
        $("#rackNoId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsRackNoForm").serialize();
        $.post(_appsite + "manage/amsrackno/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                if (parent&&parent.$('#AmsRackNoWindow')){
                    parent.$.messager.show({
                        title : '提示信息',
                        msg : "档案位管理授权完成！"
                    });
                    parent.$('#AmsRackNoWindow').window('close');
                }else{
                    $.messager.show({
                        title : '提示信息',
                        msg : "档案位管理授权完成！"
                    });
                }
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsRackNoSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsRackNoForm").form("submit", {
            url : _appsite + "manage/amsrackno/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (parent&&parent.$('#AmsRackNoWindow')){
                            parent.$.messager.show({
                                title : '提示信息',
                                msg : "档案位管理保存成功！"
                            });
                            parent.$('#AmsRackNoWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案位管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsRackNoSave").show();
                    }
                }catch (e){
                    parent.$('#AmsRackNoWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsRackNoSave").show();
                    return false;
                }
            }
        });
    }
}

function changeAmsRackNoValue(parent,data){
    if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
        if (!$.t_manage.onChange("AmsRackNo_"+parent,data)){
            return;
        }
    }
}

function updateAmsRackNoTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsRackNoTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
$(function() {
    $("#AmsRackNoForm").form({
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

    $("#AmsRackNoForm #movableRack").combobox({
        valueField :"movableRackId",
        textField:"rackName",
        data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll','get')
    });

    $("#movableRack").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsRackNoValue("movableRack",record);
            }
        }
    });

    $("#AmsRackNoForm #rackMh").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('RACK_MH')
    });

    $("#rackMh").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsRackNoValue("rackMh",record);
            }
        }
    });

    $("#AmsRackNoForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsRackNoForm #movableRack").length>0){
                var movableRack = $("#AmsRackNoForm #movableRack").combobox('getValue');
                if ((data.movableRack||"")!=""){
                    movableRack = data.movableRack;
                }
                
                if ((movableRack||"")!=""){
                    $("#AmsRackNoForm #movableRack").combobox('select',movableRack);
                }
            }
            if ($("#AmsRackNoForm #rackMh").length>0){
                var rackMh = $("#AmsRackNoForm #rackMh").combobox('getValue');
                if ((data.rackMh||"")!=""){
                    rackMh = data.rackMh;
                }
                $("#AmsRackNoForm #rackMh").combobox({data:$.totemUtils.getTypeCode('RACK_MH')});
                if ((rackMh||"")!=""){
                    $("#AmsRackNoForm #rackMh").combobox('select',rackMh);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsRackNoTabs").length>0){
                var height = $('#AmsRackNoTabs').outerHeight() - 34;
                if ($('#AmsRackNoTabs').tabs('exists',"文件管理")){
                    var tab = $('#AmsRackNoTabs').tabs('getTab',"文件管理");
                    tab.css("height",height+3);
                    var para = "?storagePlace="+data.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsRackNoTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"coll/amsfilemana"+para,
                            id:"AmsFileMana"
                        }
                    });
                }
                if ($('#AmsRackNoTabs').tabs('exists',"档案盒信息")){
                    var tab = $('#AmsRackNoTabs').tabs('getTab',"档案盒信息");
                    tab.css("height",height+3);
                    var para = "?libNo="+data.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsRackNoTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsbox"+para,
                            id:"AmsBox"
                        }
                    });
                }
                if ($('#AmsRackNoTabs').tabs('exists',"档案位置")){
                    var tab = $('#AmsRackNoTabs').tabs('getTab',"档案位置");
                    tab.css("height",height+3);
                    var para = "?rackNo="+data.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsRackNoTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amsaddress"+para,
                            id:"AmsAddress"
                        }
                    });
                }
            }

            if ($.t_manage!=undefined&&$.t_manage.onFormLoad!=undefined){
                $.t_manage.onFormLoad("AmsRackNoForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsRackNoTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsRackNoTabs").tabs("tabs").length==1){
                $("#AmsRackNoTabs").tabs("hideHeader");
            }
            $("#AmsRackNoTabs").tabs("resize",{"height":height});
            $("#AmsRackNoTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsRackNoTab($('#AmsRackNoTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsRackNoTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsRackNoTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsRackNoTabs").length>0){
                var tabs = $('#AmsRackNoTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsRackNoTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsRackNoTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsRackNoTabs').tabs('select',index);
                        $('#AmsRackNoTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#rackNoId").length>0&&$("#rackNoId").val()!=""){
                ids = $("#rackNoId").val();
            }
            $("#AmsRackNoForm").form("load",_appsite + "manage/amsrackno/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsRackNoTabs").length>0){
                    var tabs = $('#AmsRackNoTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsRackNoTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsRackNoTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsRackNoTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsRackNoTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsRackNoTabs').tabs('select',0);
                }
                $("#rackNoId").val("");

                var movableRackData;
                try{
                        movableRackData =  $.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?='+'','get');
                    }catch (e){}
                if (movableRackData!=undefined&&null!=movableRackData){
                    $("#AmsRackNoForm #movableRack").combobox({
                        data:movableRackData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsRackNo_MovableRack").length>0&&$("#amsRackNo_MovableRack").val()!=""){
                                $(this).combobox('select',$("#amsRackNo_MovableRack").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['movableRackId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsRackNo_MovableRack").length>0&&$("#amsRackNo_MovableRack").val()!=""){
                    $("#movableRack").combobox('setValue',$("#amsRackNo_MovableRack").val());
                    $("#movableRack").parent().hide();
                }
                var rackMhData;
                rackMhData =  $.totemUtils.getTypeCode('RACK_MH');
                if (rackMhData!=undefined&&null!=rackMhData){
                    $("#AmsRackNoForm #rackMh").combobox({
                        data:rackMhData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsRackNo_RackMh").length>0&&$("#amsRackNo_RackMh").val()!=""){
                                $(this).combobox('select',$("#amsRackNo_RackMh").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsRackNo_RackMh").length>0&&$("#amsRackNo_RackMh").val()!=""){
                    $("#rackMh").combobox('setValue',$("#amsRackNo_RackMh").val());
                    $("#rackMh").parent().hide();
                }
                $("#AmsRackNoForm").form("load",  _appsite +"manage/amsrackno/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsRackNoForm").form("load",  _appsite +"manage/amsrackno/query/"+$("#rackNoId").val());
            }
        }
        document.body.style.visibility = 'visible';
});