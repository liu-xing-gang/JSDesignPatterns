function saveAmsArchive() {
    $("#amsArchiveSave").hide();
    var grid = undefined;
    if (parent.$.AmsArchive){
        grid = parent.$.AmsArchive.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#daglId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsArchiveForm").serialize();
        $.post(_appsite + "coll/amsarchive/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsArchiveWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsArchiveSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsArchiveForm").form("submit", {
            url : _appsite + "coll/amsarchive/update",
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
                            parent.$('#AmsArchiveWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "档案归档保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsArchiveSave").show();
                    }
                }catch (e){
                    parent.$('#AmsArchiveWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsArchiveSave").show();
                    return false;
                }
            }
        });
    }
}

function updateAmsArchiveTab(tab) {
    var height = tab.outerHeight()-3;
    var content = tab.panel("options").content;
    if (null!=content&&content.indexOf("iframe")<0){
        var id = tab.panel("options").id+"Frame";
        content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
        $('#AmsArchiveTabs').tabs('update',{
            tab:tab,
            options:{
                content:content
            }
        });
    }
}
function changeAmsArchiveValue(parent,data){
    if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
        if (!$.t_coll.onChange("AmsArchive_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsArchiveForm").form({
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

    $("#AmsArchiveForm #busiClass").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_class')
    });

    $("#busiClass").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("busiClass",record);
            }
        }
    });

    $("#AmsArchiveForm #busiType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_type')
    });

    $("#busiType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("busiType",record);
            }
        }
    });

    $("#AmsArchiveForm #busiItem").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('busi_item')
    });

    $("#busiItem").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("busiItem",record);
            }
        }
    });

    $("#AmsArchiveForm #idType").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('id_type')
    });

    $("#idType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("idType",record);
            }
        }
    });

    $("#AmsArchiveForm #idName").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('id_type')
    });

    $("#idName").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("idName",record);
            }
        }
    });

    $("#AmsArchiveForm #secrecyLevel").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('secrecy_level')
    });

    $("#secrecyLevel").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("secrecyLevel",record);
            }
        }
    });

    $("#AmsArchiveForm #retention").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('Retention')
    });

    $("#retention").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("retention",record);
            }
        }
    });

    $("#AmsArchiveForm #storagePlace").combobox({
        valueField :"rackNoId",
        textField:"rackNo",
        data:$.totemUtils.getJson('manage/amsrackno/queryAuthAll','get')
    });

    $("#storagePlace").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("storagePlace",record);
            }
        }
    });

    $("#AmsArchiveForm #hasFile").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('ISORNOT')
    });

    $("#hasFile").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("hasFile",record);
            }
        }
    });

    $("#AmsArchiveForm #isArc").combobox({
        valueField :"codeValue",
        textField:"codeLabel",
        data:$.totemUtils.getTypeCode('ISORNOT')
    });

    $("#isArc").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                changeAmsArchiveValue("isArc",record);
            }
        }
    });

    $("#AmsArchiveForm").form(
        {onLoadSuccess:function(data){
            if ($("#AmsArchiveForm #busiClass").length>0){
                var busiClass = $("#AmsArchiveForm #busiClass").combobox('getValue');
                if ((data.busiClass||"")!=""){
                    busiClass = data.busiClass;
                }
                $("#AmsArchiveForm #busiClass").combobox({data:$.totemUtils.getTypeCode('busi_class')});
                if ((busiClass||"")!=""){
                    $("#AmsArchiveForm #busiClass").combobox('select',busiClass);
                }
            }
            if ($("#AmsArchiveForm #busiType").length>0){
                var busiType = $("#AmsArchiveForm #busiType").combobox('getValue');
                if ((data.busiType||"")!=""){
                    busiType = data.busiType;
                }
                $("#AmsArchiveForm #busiType").combobox({data:$.totemUtils.getTypeCode('busi_type')});
                if ((busiType||"")!=""){
                    $("#AmsArchiveForm #busiType").combobox('select',busiType);
                }
            }
            if ($("#AmsArchiveForm #busiItem").length>0){
                var busiItem = $("#AmsArchiveForm #busiItem").combobox('getValue');
                if ((data.busiItem||"")!=""){
                    busiItem = data.busiItem;
                }
                $("#AmsArchiveForm #busiItem").combobox({data:$.totemUtils.getTypeCode('busi_item')});
                if ((busiItem||"")!=""){
                    $("#AmsArchiveForm #busiItem").combobox('select',busiItem);
                }
            }
            if ($("#AmsArchiveForm #idType").length>0){
                var idType = $("#AmsArchiveForm #idType").combobox('getValue');
                if ((data.idType||"")!=""){
                    idType = data.idType;
                }
                $("#AmsArchiveForm #idType").combobox({data:$.totemUtils.getTypeCode('id_type')});
                if ((idType||"")!=""){
                    $("#AmsArchiveForm #idType").combobox('select',idType);
                }
            }
            if ($("#AmsArchiveForm #idName").length>0){
                var idName = $("#AmsArchiveForm #idName").combobox('getValue');
                if ((data.idName||"")!=""){
                    idName = data.idName;
                }
                $("#AmsArchiveForm #idName").combobox({data:$.totemUtils.getTypeCode('id_type')});
                if ((idName||"")!=""){
                    $("#AmsArchiveForm #idName").combobox('select',idName);
                }
            }
            if ($("#AmsArchiveForm #secrecyLevel").length>0){
                var secrecyLevel = $("#AmsArchiveForm #secrecyLevel").combobox('getValue');
                if ((data.secrecyLevel||"")!=""){
                    secrecyLevel = data.secrecyLevel;
                }
                $("#AmsArchiveForm #secrecyLevel").combobox({data:$.totemUtils.getTypeCode('secrecy_level')});
                if ((secrecyLevel||"")!=""){
                    $("#AmsArchiveForm #secrecyLevel").combobox('select',secrecyLevel);
                }
            }
            if ($("#AmsArchiveForm #retention").length>0){
                var retention = $("#AmsArchiveForm #retention").combobox('getValue');
                if ((data.retention||"")!=""){
                    retention = data.retention;
                }
                $("#AmsArchiveForm #retention").combobox({data:$.totemUtils.getTypeCode('Retention')});
                if ((retention||"")!=""){
                    $("#AmsArchiveForm #retention").combobox('select',retention);
                }
            }
            if ($("#AmsArchiveForm #storagePlace").length>0){
                var storagePlace = $("#AmsArchiveForm #storagePlace").combobox('getValue');
                if ((data.storagePlace||"")!=""){
                    storagePlace = data.storagePlace;
                }
                
                if ((storagePlace||"")!=""){
                    $("#AmsArchiveForm #storagePlace").combobox('select',storagePlace);
                }
            }
            if ($("#AmsArchiveForm #hasFile").length>0){
                var hasFile = $("#AmsArchiveForm #hasFile").combobox('getValue');
                if ((data.hasFile||"")!=""){
                    hasFile = data.hasFile;
                }
                $("#AmsArchiveForm #hasFile").combobox({data:$.totemUtils.getTypeCode('ISORNOT')});
                if ((hasFile||"")!=""){
                    $("#AmsArchiveForm #hasFile").combobox('select',hasFile);
                }
            }
            if ($("#AmsArchiveForm #isArc").length>0){
                var isArc = $("#AmsArchiveForm #isArc").combobox('getValue');
                if ((data.isArc||"")!=""){
                    isArc = data.isArc;
                }
                $("#AmsArchiveForm #isArc").combobox({data:$.totemUtils.getTypeCode('ISORNOT')});
                if ((isArc||"")!=""){
                    $("#AmsArchiveForm #isArc").combobox('select',isArc);
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($("#AmsArchiveTabs").length>0){
                var height = $('#AmsArchiveTabs').outerHeight();
                if ($('#AmsArchiveTabs').tabs('exists',"原文管理")){
                    var tab = $('#AmsArchiveTabs').tabs('getTab',"原文管理");
                    tab.css("height",height+3);
                    var para = "?mid="+data.daglId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }

                    $('#AmsArchiveTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"coll/amsfile"+para,
                            id:"AmsFile"
                        }
                    });
                }
            }

            if ($.t_coll!=undefined&&$.t_coll.onFormLoad!=undefined){
                $.t_coll.onFormLoad("AmsArchiveForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsArchiveTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsArchiveTabs").tabs("tabs").length==1){
                $("#AmsArchiveTabs").tabs("hideHeader");
            }
            $("#AmsArchiveTabs").tabs("resize",{"height":height});
            $("#AmsArchiveTabs").tabs({
                onSelect : function(title, index) {
                    updateAmsArchiveTab($('#AmsArchiveTabs').tabs('getTab',index));
                },
                onUpdate:function (title,index) {
                    var tab = $('#AmsArchiveTabs').tabs('getTab',index);
                    if (tab.is(":visible")){
                        updateAmsArchiveTab(tab);
                    }
                }
            });
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsArchiveTabs").length>0){
                var tabs = $('#AmsArchiveTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsArchiveTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsArchiveTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsArchiveTabs').tabs('select',index);
                        $('#AmsArchiveTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#daglId").length>0&&$("#daglId").val()!=""){
                ids = $("#daglId").val();
            }
            $("#AmsArchiveForm").form("load",_appsite + "coll/amsarchive/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsArchiveTabs").length>0){
                    var tabs = $('#AmsArchiveTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsArchiveTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsArchiveTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsArchiveTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsArchiveTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsArchiveTabs').tabs('select',0);
                }
                $("#daglId").val("");

                var busiClassData;
                busiClassData =  $.totemUtils.getTypeCode('busi_class');
                if (busiClassData!=undefined&&null!=busiClassData){
                    $("#AmsArchiveForm #busiClass").combobox({
                        data:busiClassData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_BusiClass").length>0&&$("#amsArchive_BusiClass").val()!=""){
                                $(this).combobox('select',$("#amsArchive_BusiClass").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_BusiClass").length>0&&$("#amsArchive_BusiClass").val()!=""){
                    $("#busiClass").combobox('setValue',$("#amsArchive_BusiClass").val());
                    $("#busiClass").parent().hide();
                }
                var busiTypeData;
                busiTypeData =  $.totemUtils.getTypeCode('busi_type');
                if (busiTypeData!=undefined&&null!=busiTypeData){
                    $("#AmsArchiveForm #busiType").combobox({
                        data:busiTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_BusiType").length>0&&$("#amsArchive_BusiType").val()!=""){
                                $(this).combobox('select',$("#amsArchive_BusiType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_BusiType").length>0&&$("#amsArchive_BusiType").val()!=""){
                    $("#busiType").combobox('setValue',$("#amsArchive_BusiType").val());
                    $("#busiType").parent().hide();
                }
                var busiItemData;
                busiItemData =  $.totemUtils.getTypeCode('busi_item');
                if (busiItemData!=undefined&&null!=busiItemData){
                    $("#AmsArchiveForm #busiItem").combobox({
                        data:busiItemData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_BusiItem").length>0&&$("#amsArchive_BusiItem").val()!=""){
                                $(this).combobox('select',$("#amsArchive_BusiItem").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_BusiItem").length>0&&$("#amsArchive_BusiItem").val()!=""){
                    $("#busiItem").combobox('setValue',$("#amsArchive_BusiItem").val());
                    $("#busiItem").parent().hide();
                }
                var idTypeData;
                idTypeData =  $.totemUtils.getTypeCode('id_type');
                if (idTypeData!=undefined&&null!=idTypeData){
                    $("#AmsArchiveForm #idType").combobox({
                        data:idTypeData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_IdType").length>0&&$("#amsArchive_IdType").val()!=""){
                                $(this).combobox('select',$("#amsArchive_IdType").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_IdType").length>0&&$("#amsArchive_IdType").val()!=""){
                    $("#idType").combobox('setValue',$("#amsArchive_IdType").val());
                    $("#idType").parent().hide();
                }
                var idNameData;
                idNameData =  $.totemUtils.getTypeCode('id_type');
                if (idNameData!=undefined&&null!=idNameData){
                    $("#AmsArchiveForm #idName").combobox({
                        data:idNameData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_IdName").length>0&&$("#amsArchive_IdName").val()!=""){
                                $(this).combobox('select',$("#amsArchive_IdName").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_IdName").length>0&&$("#amsArchive_IdName").val()!=""){
                    $("#idName").combobox('setValue',$("#amsArchive_IdName").val());
                    $("#idName").parent().hide();
                }
                var secrecyLevelData;
                secrecyLevelData =  $.totemUtils.getTypeCode('secrecy_level');
                if (secrecyLevelData!=undefined&&null!=secrecyLevelData){
                    $("#AmsArchiveForm #secrecyLevel").combobox({
                        data:secrecyLevelData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_SecrecyLevel").length>0&&$("#amsArchive_SecrecyLevel").val()!=""){
                                $(this).combobox('select',$("#amsArchive_SecrecyLevel").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_SecrecyLevel").length>0&&$("#amsArchive_SecrecyLevel").val()!=""){
                    $("#secrecyLevel").combobox('setValue',$("#amsArchive_SecrecyLevel").val());
                    $("#secrecyLevel").parent().hide();
                }
                var retentionData;
                retentionData =  $.totemUtils.getTypeCode('Retention');
                if (retentionData!=undefined&&null!=retentionData){
                    $("#AmsArchiveForm #retention").combobox({
                        data:retentionData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_Retention").length>0&&$("#amsArchive_Retention").val()!=""){
                                $(this).combobox('select',$("#amsArchive_Retention").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_Retention").length>0&&$("#amsArchive_Retention").val()!=""){
                    $("#retention").combobox('setValue',$("#amsArchive_Retention").val());
                    $("#retention").parent().hide();
                }
                var storagePlaceData;
                try{
                        storagePlaceData =  $.totemUtils.getJson('manage/amsrackno/queryAuthAll?='+'','get');
                    }catch (e){}
                if (storagePlaceData!=undefined&&null!=storagePlaceData){
                    $("#AmsArchiveForm #storagePlace").combobox({
                        data:storagePlaceData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_StoragePlace").length>0&&$("#amsArchive_StoragePlace").val()!=""){
                                $(this).combobox('select',$("#amsArchive_StoragePlace").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['rackNoId']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_StoragePlace").length>0&&$("#amsArchive_StoragePlace").val()!=""){
                    $("#storagePlace").combobox('setValue',$("#amsArchive_StoragePlace").val());
                    $("#storagePlace").parent().hide();
                }
                var hasFileData;
                hasFileData =  $.totemUtils.getTypeCode('ISORNOT');
                if (hasFileData!=undefined&&null!=hasFileData){
                    $("#AmsArchiveForm #hasFile").combobox({
                        data:hasFileData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_HasFile").length>0&&$("#amsArchive_HasFile").val()!=""){
                                $(this).combobox('select',$("#amsArchive_HasFile").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_HasFile").length>0&&$("#amsArchive_HasFile").val()!=""){
                    $("#hasFile").combobox('setValue',$("#amsArchive_HasFile").val());
                    $("#hasFile").parent().hide();
                }
                var isArcData;
                isArcData =  $.totemUtils.getTypeCode('ISORNOT');
                if (isArcData!=undefined&&null!=isArcData){
                    $("#AmsArchiveForm #isArc").combobox({
                        data:isArcData,
                        onLoadSuccess: function () {
                            //加载完成后,设置选中第一项
                            if ($("#amsArchive_IsArc").length>0&&$("#amsArchive_IsArc").val()!=""){
                                $(this).combobox('select',$("#amsArchive_IsArc").val());
                            }else{
                                var val = $(this).combobox('getData');
                                if (val.length>0){
                                    $(this).combobox('select', val[0]['codeValue']);
                                }
                            }
                        }
                    });
                }
                if ($("#amsArchive_IsArc").length>0&&$("#amsArchive_IsArc").val()!=""){
                    $("#isArc").combobox('setValue',$("#amsArchive_IsArc").val());
                    $("#isArc").parent().hide();
                }
                $("#AmsArchiveForm").form("load",  _appsite +"coll/amsarchive/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsArchiveForm").form("load",  _appsite +"coll/amsarchive/query/"+$("#daglId").val());
            }
        }
});