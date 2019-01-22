function saveAmsFileMana() {
    $("#amsFileManaSave").hide();
    var grid = undefined;
    if (parent.$.AmsFileMana){
        grid = parent.$.AmsFileMana.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#daglId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsFileManaForm").serialize();
        $.post(_appsite + "coll/amsfilemana/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsFileManaWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsFileManaSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsFileManaForm").form("submit", {
            url : _appsite + "coll/amsfilemana/update",
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
                            parent.$('#AmsFileManaWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "文件管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsFileManaSave").show();
                    }
                }catch (e){
                    parent.$('#AmsFileManaWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsFileManaSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsFileManaTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsFileManaTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsFileManaValue(parent,data){
    if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
        if (!$.t_coll.onChange("AmsFileMana_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsFileManaForm").form({
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

    $("#AmsFileManaForm #busiClass").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_class')
    });

    $("#busiClass").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("busiClass",record);
            }
        }
    });

    $("#AmsFileManaForm #busiType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_type')
    });

    $("#busiType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("busiType",record);
            }
        }
    });

    $("#AmsFileManaForm #busiItem").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_item')
    });

    $("#busiItem").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("busiItem",record);
            }
        }
    });

    $("#AmsFileManaForm #idType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('id_type')
    });

    $("#idType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("idType",record);
            }
        }
    });

    $("#AmsFileManaForm #secrecyLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secrecyLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("secrecyLevel",record);
            }
        }
    });

    $("#AmsFileManaForm #retention").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('Retention')
    });

    $("#retention").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("retention",record);
            }
        }
    });

    $("#AmsFileManaForm #hasFile").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('has_file')
    });

    $("#hasFile").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("hasFile",record);
            }
        }
    });

    $("#AmsFileManaForm #isArc").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('is_arc')
    });

    $("#isArc").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsFileManaValue("isArc",record);
            }
        }
    });

    $("#AmsFileManaForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsFileManaForm #busiClass").length>0){
                var busiClass = $("#AmsFileManaForm #busiClass").combobox('getValue');
                if ((data.busiClass||"")!=""){
                    busiClass = data.busiClass;
                }
                $("#AmsFileManaForm #busiClass").combobox({data:$.totemUtils.getTypeCode('busi_class')});
                if ((busiClass||"")!=""){
                    $("#AmsFileManaForm #busiClass").combobox('select',busiClass);
                }
            }
            if ($("#AmsFileManaForm #busiType").length>0){
                var busiType = $("#AmsFileManaForm #busiType").combobox('getValue');
                if ((data.busiType||"")!=""){
                    busiType = data.busiType;
                }
                $("#AmsFileManaForm #busiType").combobox({data:$.totemUtils.getTypeCode('busi_type')});
                if ((busiType||"")!=""){
                    $("#AmsFileManaForm #busiType").combobox('select',busiType);
                }
            }
            if ($("#AmsFileManaForm #busiItem").length>0){
                var busiItem = $("#AmsFileManaForm #busiItem").combobox('getValue');
                if ((data.busiItem||"")!=""){
                    busiItem = data.busiItem;
                }
                $("#AmsFileManaForm #busiItem").combobox({data:$.totemUtils.getTypeCode('busi_item')});
                if ((busiItem||"")!=""){
                    $("#AmsFileManaForm #busiItem").combobox('select',busiItem);
                }
            }
            if ($("#AmsFileManaForm #idType").length>0){
                var idType = $("#AmsFileManaForm #idType").combobox('getValue');
                if ((data.idType||"")!=""){
                    idType = data.idType;
                }
                $("#AmsFileManaForm #idType").combobox({data:$.totemUtils.getTypeCode('id_type')});
                if ((idType||"")!=""){
                    $("#AmsFileManaForm #idType").combobox('select',idType);
                }
            }
            if ($("#AmsFileManaForm #secrecyLevel").length>0){
                var secrecyLevel = $("#AmsFileManaForm #secrecyLevel").combobox('getValue');
                if ((data.secrecyLevel||"")!=""){
                    secrecyLevel = data.secrecyLevel;
                }
                $("#AmsFileManaForm #secrecyLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secrecyLevel||"")!=""){
                    $("#AmsFileManaForm #secrecyLevel").combobox('select',secrecyLevel);
                }
            }
            if ($("#AmsFileManaForm #retention").length>0){
                var retention = $("#AmsFileManaForm #retention").combobox('getValue');
                if ((data.retention||"")!=""){
                    retention = data.retention;
                }
                $("#AmsFileManaForm #retention").combobox({data:$.totemUtils.getTypeCode('Retention')});
                if ((retention||"")!=""){
                    $("#AmsFileManaForm #retention").combobox('select',retention);
                }
            }
            if ($("#AmsFileManaForm #hasFile").length>0){
                var hasFile = $("#AmsFileManaForm #hasFile").combobox('getValue');
                if ((data.hasFile||"")!=""){
                    hasFile = data.hasFile;
                }
                $("#AmsFileManaForm #hasFile").combobox({data:$.totemUtils.getTypeCode('has_file')});
                if ((hasFile||"")!=""){
                    $("#AmsFileManaForm #hasFile").combobox('select',hasFile);
                }
            }
            if ($("#AmsFileManaForm #isArc").length>0){
                var isArc = $("#AmsFileManaForm #isArc").combobox('getValue');
                if ((data.isArc||"")!=""){
                    isArc = data.isArc;
                }
                $("#AmsFileManaForm #isArc").combobox({data:$.totemUtils.getTypeCode('is_arc')});
                if ((isArc||"")!=""){
                    $("#AmsFileManaForm #isArc").combobox('select',isArc);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsFileManaTabs").length>0){
                var height = $('#AmsFileManaTabs').outerHeight() - 34;
            }

            if ($.t_coll!=undefined&&$.t_coll.onFormLoad!=undefined){
                $.t_coll.onFormLoad("AmsFileManaForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsFileManaTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsFileManaTabs").tabs("tabs").length==1){
                $("#AmsFileManaTabs").tabs("hideHeader");
            }
            $("#AmsFileManaTabs").tabs("resize",{"height":height});
            $("#AmsFileManaTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsFileManaTab($('#AmsFileManaTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsFileManaTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsFileManaTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsFileManaTabs").length>0){
                var tabs = $('#AmsFileManaTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsFileManaTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsFileManaTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsFileManaTabs').tabs('select',index);
                        $('#AmsFileManaTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#daglId").length>0&&$("#daglId").val()!=""){
                ids = $("#daglId").val();
            }
            $("#AmsFileManaForm").form("load",_appsite + "coll/amsfilemana/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsFileManaTabs").length>0){
                    var tabs = $('#AmsFileManaTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsFileManaTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsFileManaTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsFileManaTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsFileManaTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsFileManaTabs').tabs('select',0);
                }
                $("#daglId").val("");

                var busiClassData;
                busiClassData =  $.totemUtils.getTypeCode('busi_class');
                if (busiClassData!=undefined&&null!=busiClassData){
                    $("#AmsFileManaForm #busiClass").combobox({
                        data:busiClassData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_BusiClass").length>0&&$("#amsFileMana_BusiClass").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_BusiClass").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_BusiClass").length>0&&$("#amsFileMana_BusiClass").val()!=""){
                    $("#busiClass").combobox('setValue',$("#amsFileMana_BusiClass").val());
                    $("#busiClass").parent().hide();
                }
                var busiTypeData;
                busiTypeData =  $.totemUtils.getTypeCode('busi_type');
                if (busiTypeData!=undefined&&null!=busiTypeData){
                    $("#AmsFileManaForm #busiType").combobox({
                        data:busiTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_BusiType").length>0&&$("#amsFileMana_BusiType").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_BusiType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_BusiType").length>0&&$("#amsFileMana_BusiType").val()!=""){
                    $("#busiType").combobox('setValue',$("#amsFileMana_BusiType").val());
                    $("#busiType").parent().hide();
                }
                var busiItemData;
                busiItemData =  $.totemUtils.getTypeCode('busi_item');
                if (busiItemData!=undefined&&null!=busiItemData){
                    $("#AmsFileManaForm #busiItem").combobox({
                        data:busiItemData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_BusiItem").length>0&&$("#amsFileMana_BusiItem").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_BusiItem").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_BusiItem").length>0&&$("#amsFileMana_BusiItem").val()!=""){
                    $("#busiItem").combobox('setValue',$("#amsFileMana_BusiItem").val());
                    $("#busiItem").parent().hide();
                }
                var idTypeData;
                idTypeData =  $.totemUtils.getTypeCode('id_type');
                if (idTypeData!=undefined&&null!=idTypeData){
                    $("#AmsFileManaForm #idType").combobox({
                        data:idTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_IdType").length>0&&$("#amsFileMana_IdType").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_IdType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_IdType").length>0&&$("#amsFileMana_IdType").val()!=""){
                    $("#idType").combobox('setValue',$("#amsFileMana_IdType").val());
                    $("#idType").parent().hide();
                }
                var secrecyLevelData;
                secrecyLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secrecyLevelData!=undefined&&null!=secrecyLevelData){
                    $("#AmsFileManaForm #secrecyLevel").combobox({
                        data:secrecyLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_SecrecyLevel").length>0&&$("#amsFileMana_SecrecyLevel").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_SecrecyLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_SecrecyLevel").length>0&&$("#amsFileMana_SecrecyLevel").val()!=""){
                    $("#secrecyLevel").combobox('setValue',$("#amsFileMana_SecrecyLevel").val());
                    $("#secrecyLevel").parent().hide();
                }
                var retentionData;
                retentionData =  $.totemUtils.getTypeCode('Retention');
                if (retentionData!=undefined&&null!=retentionData){
                    $("#AmsFileManaForm #retention").combobox({
                        data:retentionData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_Retention").length>0&&$("#amsFileMana_Retention").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_Retention").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_Retention").length>0&&$("#amsFileMana_Retention").val()!=""){
                    $("#retention").combobox('setValue',$("#amsFileMana_Retention").val());
                    $("#retention").parent().hide();
                }
                var hasFileData;
                hasFileData =  $.totemUtils.getTypeCode('has_file');
                if (hasFileData!=undefined&&null!=hasFileData){
                    $("#AmsFileManaForm #hasFile").combobox({
                        data:hasFileData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_HasFile").length>0&&$("#amsFileMana_HasFile").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_HasFile").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_HasFile").length>0&&$("#amsFileMana_HasFile").val()!=""){
                    $("#hasFile").combobox('setValue',$("#amsFileMana_HasFile").val());
                    $("#hasFile").parent().hide();
                }
                var isArcData;
                isArcData =  $.totemUtils.getTypeCode('is_arc');
                if (isArcData!=undefined&&null!=isArcData){
                    $("#AmsFileManaForm #isArc").combobox({
                        data:isArcData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsFileMana_IsArc").length>0&&$("#amsFileMana_IsArc").val()!=""){
                                $(this).combobox('select',$("#amsFileMana_IsArc").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsFileMana_IsArc").length>0&&$("#amsFileMana_IsArc").val()!=""){
                    $("#isArc").combobox('setValue',$("#amsFileMana_IsArc").val());
                    $("#isArc").parent().hide();
                }
                $("#AmsFileManaForm").form("load",  _appsite +"coll/amsfilemana/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsFileManaForm").form("load",  _appsite +"coll/amsfilemana/query/"+$("#daglId").val());
            }
        }
        document.body.style.visibility = 'visible';
});