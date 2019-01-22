$.AmsArchive = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#busiClass").length>0&&$("#busiClass").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_BusiClass").length>0){
                $("#amsArchive_BusiClass").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_BusiClass"),$("#busiClass").val());
            }
        }
        if ($("#busiType").length>0&&$("#busiType").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_BusiType").length>0){
                $("#amsArchive_BusiType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_BusiType"),$("#busiType").val());
            }
        }
        if ($("#busiItem").length>0&&$("#busiItem").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_BusiItem").length>0){
                $("#amsArchive_BusiItem").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_BusiItem"),$("#busiItem").val());
            }
        }
        if ($("#idType").length>0&&$("#idType").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_IdType").length>0){
                $("#amsArchive_IdType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_IdType"),$("#idType").val());
            }
        }
        if ($("#idName").length>0&&$("#idName").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_IdName").length>0){
                $("#amsArchive_IdName").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_IdName"),$("#idName").val());
            }
        }
        if ($("#secrecyLevel").length>0&&$("#secrecyLevel").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_SecrecyLevel").length>0){
                $("#amsArchive_SecrecyLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_SecrecyLevel"),$("#secrecyLevel").val());
            }
        }
        if ($("#retention").length>0&&$("#retention").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_Retention").length>0){
                $("#amsArchive_Retention").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_Retention"),$("#retention").val());
            }
        }
        if ($("#storagePlace").length>0&&$("#storagePlace").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_StoragePlace").length>0){
                $("#amsArchive_StoragePlace").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_StoragePlace"),$("#storagePlace").val());
            }
        }
        if ($("#hasFile").length>0&&$("#hasFile").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_HasFile").length>0){
                $("#amsArchive_HasFile").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_HasFile"),$("#hasFile").val());
            }
        }
        if ($("#isArc").length>0&&$("#isArc").val()!=""){
            autoQuery = true;
            if ($("#amsArchive_IsArc").length>0){
                $("#amsArchive_IsArc").parent().hide();
                $.totemUtils.setPropertyValue($("#amsArchive_IsArc"),$("#isArc").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_StoragePlace"))!=""){
            autoQuery = true;
            if ($("#amsArchive_StoragePlace").length>0){
                $("#amsArchive_StoragePlace").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","storagePlace")!=null){
                grid.datagrid("getColumnOption","storagePlace").hidden = true;
                if (grid.datagrid("getColumnOption","storagePlaceShowLabel")!=null){
                    grid.datagrid("getColumnOption","storagePlaceShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_OrgNo"))!=""){
            autoQuery = true;
            if ($("#amsArchive_OrgNo").length>0){
                $("#amsArchive_OrgNo").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","orgNo")!=null){
                grid.datagrid("getColumnOption","orgNo").hidden = true;
                if (grid.datagrid("getColumnOption","orgNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","orgNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_ArcNo"))!=""){
            autoQuery = true;
            if ($("#amsArchive_ArcNo").length>0){
                $("#amsArchive_ArcNo").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","arcNo")!=null){
                grid.datagrid("getColumnOption","arcNo").hidden = true;
                if (grid.datagrid("getColumnOption","arcNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","arcNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_ConsNo"))!=""){
            autoQuery = true;
            if ($("#amsArchive_ConsNo").length>0){
                $("#amsArchive_ConsNo").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","consNo")!=null){
                grid.datagrid("getColumnOption","consNo").hidden = true;
                if (grid.datagrid("getColumnOption","consNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","consNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_AppNo"))!=""){
            autoQuery = true;
            if ($("#amsArchive_AppNo").length>0){
                $("#amsArchive_AppNo").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","appNo")!=null){
                grid.datagrid("getColumnOption","appNo").hidden = true;
                if (grid.datagrid("getColumnOption","appNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","appNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_BusiClass"))!=""){
            autoQuery = true;
            if ($("#amsArchive_BusiClass").length>0){
                $("#amsArchive_BusiClass").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","busiClass")!=null){
                grid.datagrid("getColumnOption","busiClass").hidden = true;
                if (grid.datagrid("getColumnOption","busiClassShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiClassShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_BusiType"))!=""){
            autoQuery = true;
            if ($("#amsArchive_BusiType").length>0){
                $("#amsArchive_BusiType").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","busiType")!=null){
                grid.datagrid("getColumnOption","busiType").hidden = true;
                if (grid.datagrid("getColumnOption","busiTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_IdNo"))!=""){
            autoQuery = true;
            if ($("#amsArchive_IdNo").length>0){
                $("#amsArchive_IdNo").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","idNo")!=null){
                grid.datagrid("getColumnOption","idNo").hidden = true;
                if (grid.datagrid("getColumnOption","idNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","idNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsArchive_HasFile"))!=""){
            autoQuery = true;
            if ($("#amsArchive_HasFile").length>0){
                $("#amsArchive_HasFile").parent().hide();
            }
            grid = $('#AmsArchiveGrid');
            if (grid.datagrid("getColumnOption","hasFile")!=null){
                grid.datagrid("getColumnOption","hasFile").hidden = true;
                if (grid.datagrid("getColumnOption","hasFileShowLabel")!=null){
                    grid.datagrid("getColumnOption","hasFileShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsArchiveGridPage').length>0){
            $.totemUtils.setHeight($('#AmsArchiveGridPage'));
        }
        if (autoQuery){
            $.AmsArchive.search($('#AmsArchiveGrid'));
        }
        $("#AmsArchiveForm #busiClass").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_class')
        });

        $("#AmsArchiveForm #busiType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_type')
        });

        $("#AmsArchiveForm #busiItem").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('busi_item')
        });

        $("#AmsArchiveForm #idType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('id_type')
        });

        $("#AmsArchiveForm #idName").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('id_type')
        });

        $("#AmsArchiveForm #secrecyLevel").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('secrecy_level')
        });

        $("#AmsArchiveForm #retention").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('Retention')
        });

        $("#AmsArchiveForm #storagePlace").combobox({
            valueField :"rackNoId",
            textField:"rackNo",
            data:$.totemUtils.getJson('manage/amsrackno/queryAuthAll','get')
        });

        $("#AmsArchiveForm #hasFile").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('ISORNOT')
        });

        $("#AmsArchiveForm #isArc").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('ISORNOT')
        });

    },

    setAuth : function(id){
        var items = $("#AmsFileMemberActionItem").children();
        for (i=0;i<items.length;i++){
            $("#"+items[i].id).show();
        }

    },
    getPara : function(actionType){
        if ($("#busiClass").length>0&&$("#busiClass").val()!=""){
            actionType += "&amsArchive_BusiClass="+$("#busiClass").val();
        }
        if ($("#busiType").length>0&&$("#busiType").val()!=""){
            actionType += "&amsArchive_BusiType="+$("#busiType").val();
        }
        if ($("#busiItem").length>0&&$("#busiItem").val()!=""){
            actionType += "&amsArchive_BusiItem="+$("#busiItem").val();
        }
        if ($("#idType").length>0&&$("#idType").val()!=""){
            actionType += "&amsArchive_IdType="+$("#idType").val();
        }
        if ($("#idName").length>0&&$("#idName").val()!=""){
            actionType += "&amsArchive_IdName="+$("#idName").val();
        }
        if ($("#secrecyLevel").length>0&&$("#secrecyLevel").val()!=""){
            actionType += "&amsArchive_SecrecyLevel="+$("#secrecyLevel").val();
        }
        if ($("#retention").length>0&&$("#retention").val()!=""){
            actionType += "&amsArchive_Retention="+$("#retention").val();
        }
        if ($("#storagePlace").length>0&&$("#storagePlace").val()!=""){
            actionType += "&amsArchive_StoragePlace="+$("#storagePlace").val();
        }
        if ($("#hasFile").length>0&&$("#hasFile").val()!=""){
            actionType += "&amsArchive_HasFile="+$("#hasFile").val();
        }
        if ($("#isArc").length>0&&$("#isArc").val()!=""){
            actionType += "&amsArchive_IsArc="+$("#isArc").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsArchive.currentGrid = grid;
        $.AmsArchive.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsArchiveWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsArchiveWindow').length>0){
            win = parent.$('#AmsArchiveWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsArchive.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsarchive/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案归档"
        });
    },
    edit : function(grid) {
        $.AmsArchive.actionType="edit";
        $.AmsArchive.openEdit(grid,"更新档案归档","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsArchive.actionType="edit";
        $.AmsArchive.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsArchive.actionType="view";
        $.AmsArchive.openEdit(grid,"查看档案归档","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsArchive.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个档案归档进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个档案归档进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsArchiveWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsArchiveWindow').length>0){
                win = parent.$('#AmsArchiveWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'coll/amsarchive/edit/'+row.daglId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsArchive.currentGrid = grid;
        $.AmsArchive.actionType="copy";
        $.AmsArchive.openEdit(grid,"复制一个新的",$.AmsArchive.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '信息删除，不可恢复！', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].daglId);
                    }
                    $.post(_appsite + 'coll/amsarchive/deletes', {
                        "daglIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员原文管理？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"coll/amsfile/deletes",{mids:ids},"json");
                                }});
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
            grid = $('#AmsArchiveGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsarchive/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsArchiveGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsarchive/query";
                }
                var paras = $.AmsArchiveGrid.queryParams(grid);
                $.AmsArchive.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsArchiveWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsArchiveWindow').length>0){
            win = parent.$('#AmsArchiveWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsarchive/importExcel'+$.AmsArchive.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案归档导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsArchiveIframeDom = $("#AmsArchiveIframeDomIfile");
            if(AmsArchiveIframeDom && AmsArchiveIframeDom.length==0){
                $("body").append("<iframe id='AmsArchiveIframeDomIfile' style='display:none'></iframe>");
                AmsArchiveIframeDom = $("#AmsArchiveIframeDomIfile");
            }
            AmsArchiveIframeDom.attr("src","");
            var url= _appsite+"coll/amsarchive/exportAuthAll?"+$.param($.AmsArchiveGrid.queryParams(grid));
            AmsArchiveIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
            if (!$.t_coll.onChange("AmsArchive_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsArchiveGrid').length>0){
        $('#AmsArchiveGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
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
                    if ($.AmsArchive.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsArchive.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsArchive.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsArchive.selected){
                    $(this).datagrid("selectRow",$.AmsArchive.selected);
                }
            },
            onSelect:function(index,row){
                if (row.daglId == $.AmsArchive.selectRow){
                    return;
                }
                if ((!$.AmsArchive.selectRow)&&$("#amsArchive_master").length>0){
                    if ($("#amsArchive_master").panel("options").region=="north"){
                        $("#amsArchive_master").panel("resize",{height:300});
                    }else{
                        $("#amsArchive_master").panel("resize",{width:400});
                    }
                }
                $.AmsArchive.selectRow = row.daglId;

            },
            columns:$.AmsArchiveGrid.column

        });

    }

    $("#amsArchive_StoragePlace").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsArchive.onChange("storagePlace",record);
            }
        }
    });

    $("#amsArchive_BusiClass").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsArchive.onChange("busiClass",record);
            }
        }
    });

    $("#amsArchive_BusiType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsArchive.onChange("busiType",record);
            }
        }
    });

    $("#amsArchive_HasFile").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsArchive.onChange("hasFile",record);
            }
        }
    });

    $.AmsArchive.init();
})