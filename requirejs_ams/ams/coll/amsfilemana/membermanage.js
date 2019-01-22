$.AmsFileMana = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsFileMana_master").length>0){
            if ($("#amsFileMana_master").panel("options").region=="north"){
                $("#amsFileMana_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsFileMana_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#busiClass").length>0&&$("#busiClass").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_BusiClass").length>0){
                $("#amsFileMana_BusiClass").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_BusiClass"),$("#busiClass").val());
            }
        }
        if ($("#busiType").length>0&&$("#busiType").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_BusiType").length>0){
                $("#amsFileMana_BusiType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_BusiType"),$("#busiType").val());
            }
        }
        if ($("#busiItem").length>0&&$("#busiItem").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_BusiItem").length>0){
                $("#amsFileMana_BusiItem").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_BusiItem"),$("#busiItem").val());
            }
        }
        if ($("#idType").length>0&&$("#idType").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_IdType").length>0){
                $("#amsFileMana_IdType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_IdType"),$("#idType").val());
            }
        }
        if ($("#secrecyLevel").length>0&&$("#secrecyLevel").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_SecrecyLevel").length>0){
                $("#amsFileMana_SecrecyLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_SecrecyLevel"),$("#secrecyLevel").val());
            }
        }
        if ($("#retention").length>0&&$("#retention").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_Retention").length>0){
                $("#amsFileMana_Retention").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_Retention"),$("#retention").val());
            }
        }
        if ($("#hasFile").length>0&&$("#hasFile").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_HasFile").length>0){
                $("#amsFileMana_HasFile").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_HasFile"),$("#hasFile").val());
            }
        }
        if ($("#isArc").length>0&&$("#isArc").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_IsArc").length>0){
                $("#amsFileMana_IsArc").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_IsArc"),$("#isArc").val());
            }
        }
        if ($("#storagePlace").length>0&&$("#storagePlace").val()!=""){
            autoQuery = true;
            if ($("#amsFileMana_StoragePlace").length>0){
                $("#amsFileMana_StoragePlace").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileMana_StoragePlace"),$("#storagePlace").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_OrgNo"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_OrgNo").length>0){
                $("#amsFileMana_OrgNo").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","orgNo")!=null){
                grid.datagrid("getColumnOption","orgNo").hidden = true;
                if (grid.datagrid("getColumnOption","orgNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","orgNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_ArcNo"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_ArcNo").length>0){
                $("#amsFileMana_ArcNo").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","arcNo")!=null){
                grid.datagrid("getColumnOption","arcNo").hidden = true;
                if (grid.datagrid("getColumnOption","arcNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","arcNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_ConsNo"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_ConsNo").length>0){
                $("#amsFileMana_ConsNo").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","consNo")!=null){
                grid.datagrid("getColumnOption","consNo").hidden = true;
                if (grid.datagrid("getColumnOption","consNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","consNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_AppNo"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_AppNo").length>0){
                $("#amsFileMana_AppNo").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","appNo")!=null){
                grid.datagrid("getColumnOption","appNo").hidden = true;
                if (grid.datagrid("getColumnOption","appNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","appNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_BusiClass"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_BusiClass").length>0){
                $("#amsFileMana_BusiClass").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","busiClass")!=null){
                grid.datagrid("getColumnOption","busiClass").hidden = true;
                if (grid.datagrid("getColumnOption","busiClassShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiClassShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_BusiType"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_BusiType").length>0){
                $("#amsFileMana_BusiType").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","busiType")!=null){
                grid.datagrid("getColumnOption","busiType").hidden = true;
                if (grid.datagrid("getColumnOption","busiTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_IdNo"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_IdNo").length>0){
                $("#amsFileMana_IdNo").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","idNo")!=null){
                grid.datagrid("getColumnOption","idNo").hidden = true;
                if (grid.datagrid("getColumnOption","idNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","idNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileMana_HasFile"))!=""){
            autoQuery = true;
            if ($("#amsFileMana_HasFile").length>0){
                $("#amsFileMana_HasFile").parent().hide();
            }
            grid = $('#AmsFileManaGrid');
            if (grid.datagrid("getColumnOption","hasFile")!=null){
                grid.datagrid("getColumnOption","hasFile").hidden = true;
                if (grid.datagrid("getColumnOption","hasFileShowLabel")!=null){
                    grid.datagrid("getColumnOption","hasFileShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsFileManaGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFileManaGridPage'));
        }
        if (autoQuery){
            $.AmsFileMana.search($('#AmsFileManaGrid'));
        }

        $("#AmsFileManaForm #busiClass").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_class')
        });

        $("#AmsFileManaForm #busiType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_type')
        });

        $("#AmsFileManaForm #busiItem").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_item')
        });

        $("#AmsFileManaForm #idType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('id_type')
        });

        $("#AmsFileManaForm #secrecyLevel").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('secrecy_level')
        });

        $("#AmsFileManaForm #retention").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('Retention')
        });

        $("#AmsFileManaForm #hasFile").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('has_file')
        });

        $("#AmsFileManaForm #isArc").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('is_arc')
        });

    },
    setAuth : function(id){},onChange:function(parent,data){
        if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
            if (!$.t_coll.onChange("AmsFileMana_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#busiClass").length>0&&$("#busiClass").val()!=""){
            actionType += "&amsFileMana_BusiClass="+$("#busiClass").val();
        }
        if ($("#busiType").length>0&&$("#busiType").val()!=""){
            actionType += "&amsFileMana_BusiType="+$("#busiType").val();
        }
        if ($("#busiItem").length>0&&$("#busiItem").val()!=""){
            actionType += "&amsFileMana_BusiItem="+$("#busiItem").val();
        }
        if ($("#idType").length>0&&$("#idType").val()!=""){
            actionType += "&amsFileMana_IdType="+$("#idType").val();
        }
        if ($("#secrecyLevel").length>0&&$("#secrecyLevel").val()!=""){
            actionType += "&amsFileMana_SecrecyLevel="+$("#secrecyLevel").val();
        }
        if ($("#retention").length>0&&$("#retention").val()!=""){
            actionType += "&amsFileMana_Retention="+$("#retention").val();
        }
        if ($("#hasFile").length>0&&$("#hasFile").val()!=""){
            actionType += "&amsFileMana_HasFile="+$("#hasFile").val();
        }
        if ($("#isArc").length>0&&$("#isArc").val()!=""){
            actionType += "&amsFileMana_IsArc="+$("#isArc").val();
        }
        if ($("#storagePlace").length>0&&$("#storagePlace").val()!=""){
            actionType += "&amsFileMana_StoragePlace="+$("#storagePlace").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsFileMana.currentGrid = grid;
        $.AmsFileMana.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsFileManaWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileManaWindow').length>0){
            win = parent.$('#AmsFileManaWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsFileMana.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsfilemana/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增文件管理"
        });
    },
    edit : function(grid) {
        $.AmsFileMana.actionType="edit";
        $.AmsFileMana.openEdit(grid,"更新文件管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsFileMana.actionType="view";
        $.AmsFileMana.openEdit(grid,"查看文件管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsFileMana.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个文件管理进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个文件管理进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsFileManaWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsFileManaWindow').length>0){
                win = parent.$('#AmsFileManaWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'coll/amsfilemana/edit/'+row.daglId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsFileMana.currentGrid = grid;
        $.AmsFileMana.actionType="copy";
        $.AmsFileMana.openEdit(grid,"复制一个新的",$.AmsFileMana.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的文件管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].daglId);
                    }
                    $.post(_appsite + 'coll/amsfilemana/deletes', {
                        "daglIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.show({title : '信息提示',msg : '删除成功'});
                            if (grid.selector.indexOf("Tree")>0){
                                grid.treegrid("reload");
                            }else{
                                grid.datagrid('reload');
                            }
                        } else {
                            $.messager.show({
                                title : 'Error',
                                msg : result.msg
                            });
                        }
                    }, 'json');
                }
            });
        }
    },search : function(grid){
        if (!grid){
            grid = $('#AmsFileManaGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsfilemana/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsFileManaGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsfilemana/query";
                }
                var paras = $.AmsFileManaGrid.queryParams(grid);
                $.AmsFileMana.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsFileManaWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileManaWindow').length>0){
            win = parent.$('#AmsFileManaWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsfilemana/importExcel'+$.AmsFileMana.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "文件管理导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsFileManaIframeDom = $("#AmsFileManaIframeDomIfile");
            if(AmsFileManaIframeDom && AmsFileManaIframeDom.length==0){
                $("body").append("<iframe id='AmsFileManaIframeDomIfile' style='display:none'></iframe>");
                AmsFileManaIframeDom = $("#AmsFileManaIframeDomIfile");
            }
            AmsFileManaIframeDom.attr("src","");
            var url= _appsite+"coll/amsfilemana/exportAuthAll?"+$.param($.AmsFileManaGrid.queryParams(grid));
            AmsFileManaIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsFileManaMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsFileManaMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsFileMana_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsFileManaGrid').length>0){
        $('#AmsFileManaGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_coll.onClickRow("AmsFileMana",row)){
                    return;
                }

                var beforeIndex = selectIndexs.firstSelectRowIndex;
                if(index!=selectIndexs.firstSelectRowIndex&&!inputFlags.isShiftDown){
                    selectIndexs.firstSelectRowIndex=index; //alert('firstSelectRowIndex, sfhit = ' + index);
                }
                if(inputFlags.isShiftDown||inputFlags.isCtrlDown){
                    $(this).datagrid('options').singleSelect = false;
                    if (inputFlags.isCtrlDown){
                        return;
                    }
                    selectIndexs.lastSelectRowIndex=index;
                    var tempIndex=0;
                    if(selectIndexs.firstSelectRowIndex>selectIndexs.lastSelectRowIndex){
                        tempIndex=selectIndexs.firstSelectRowIndex;
                        selectIndexs.firstSelectRowIndex=selectIndexs.lastSelectRowIndex;
                        selectIndexs.lastSelectRowIndex=tempIndex;
                    }
                    for(var i=selectIndexs.firstSelectRowIndex;i<=selectIndexs.lastSelectRowIndex;i++){
                        $(this).datagrid('selectRow',i);
                    }
                    return;
                }else{
                    if ($.AmsFileMana.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsFileMana.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsFileMana.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsFileMana.selected){
                    $(this).datagrid("selectRow",$.AmsFileMana.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.daglId == $.AmsFileMana.selectRow){
                    return;
                }
                if ($('#AmsFileManaMemberTabs').length>0){
                    if ($('#AmsFileManaMemberTabs').tabs("tabs").length>1){
                        $('#AmsFileManaMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsFileManaMemberTabs').outerHeight() - 30;
                if ((!$.AmsFileMana.selectRow)&&$("#amsFileMana_master").length>0){
                    if ($("#amsFileMana_master").panel("options").region=="north"){
                        $("#amsFileMana_master").panel("resize",{height:300});
                    }else{
                        $("#amsFileMana_master").panel("resize",{width:400});
                    }
                }
                $.AmsFileMana.selectRow = row.daglId;

            },
            columns:$.AmsFileManaGrid.column

        });

    }

    $("#amsFileMana_BusiClass").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsFileMana.onChange("busiClass",record);
            }
        }
    });

    $("#amsFileMana_BusiType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsFileMana.onChange("busiType",record);
            }
        }
    });

    $("#amsFileMana_HasFile").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsFileMana.onChange("hasFile",record);
            }
        }
    });

    if ($("#AmsFileManaMemberTabs").length>0){
        $("#AmsFileManaMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsFileMana.updateTab($('#AmsFileManaMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsFileManaMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsFileMana.updateTab(tab);
                }
            }
        })
    }
    $.AmsFileMana.init();
    document.body.style.visibility = 'visible';
})