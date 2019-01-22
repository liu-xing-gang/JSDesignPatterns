$.AmsCheckMain = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#storageId").length>0&&$("#storageId").val()!=""){
            autoQuery = true;
            if ($("#amsCheckMain_StorageId").length>0){
                $("#amsCheckMain_StorageId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsCheckMain_StorageId"),$("#storageId").val());
            }
        }
        if ($("#randId").length>0&&$("#randId").val()!=""){
            autoQuery = true;
            if ($("#amsCheckMain_RandId").length>0){
                $("#amsCheckMain_RandId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsCheckMain_RandId"),$("#randId").val());
                $("#amsCheckMain_StorageId").parent().hide();
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsCheckMain_RandId"))!=""){
            autoQuery = true;
            if ($("#amsCheckMain_RandId").length>0){
                $("#amsCheckMain_RandId").parent().hide();
                $("#amsCheckMain_StorageId").parent().hide();
            }
            grid = $('#AmsCheckMainGrid');
            if (grid.datagrid("getColumnOption","randId")!=null){
                grid.datagrid("getColumnOption","randId").hidden = true;
                if (grid.datagrid("getColumnOption","randIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","randIdShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsCheckMain_StorageId"))!=""){
            autoQuery = true;
            if ($("#amsCheckMain_StorageId").length>0){
                $("#amsCheckMain_StorageId").parent().hide();
            }
            grid = $('#AmsCheckMainGrid');
            if (grid.datagrid("getColumnOption","storageId")!=null){
                grid.datagrid("getColumnOption","storageId").hidden = true;
                if (grid.datagrid("getColumnOption","storageIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","storageIdShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsCheckMainGridPage').length>0){
            $.totemUtils.setHeight($('#AmsCheckMainGridPage'));
        }
        if (autoQuery){
            $.AmsCheckMain.search($('#AmsCheckMainGrid'));
        }
        $("#AmsCheckMainForm #storageId").combobox({
            valueField :"storageId",
            textField:"storageName",
            data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
        });

        $("#AmsCheckMainForm #randId").combobox({
            valueField :"movableRackId",
            textField:"rackName",
            data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId=data.storageId','get')
        });

    },

    getPara : function(actionType){
        if ($("#storageId").length>0&&$("#storageId").val()!=""){
            actionType += "&amsCheckMain_StorageId="+$("#storageId").val();
        }
        if ($("#randId").length>0&&$("#randId").val()!=""){
            actionType += "&amsCheckMain_RandId="+$("#randId").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsCheckMain.currentGrid = grid;
        $.AmsCheckMain.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsCheckMainWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsCheckMainWindow').length>0){
            win = parent.$('#AmsCheckMainWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsCheckMain.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amscheckmain/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增盘点主表"
        });
    },
    edit : function(grid) {
        $.AmsCheckMain.actionType="edit";
        $.AmsCheckMain.openEdit(grid,"更新盘点主表","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsCheckMain.actionType="edit";
        $.AmsCheckMain.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsCheckMain.actionType="view";
        $.AmsCheckMain.openEdit(grid,"查看盘点主表","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsCheckMain.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个盘点主表进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个盘点主表进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsCheckMainWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsCheckMainWindow').length>0){
                win = parent.$('#AmsCheckMainWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'manage/amscheckmain/edit/'+row.amsCheckRecordId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsCheckMain.currentGrid = grid;
        $.AmsCheckMain.actionType="copy";
        $.AmsCheckMain.openEdit(grid,"复制一个新的",$.AmsCheckMain.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的盘点主表将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsCheckRecordId);
                    }
                    $.post(_appsite + 'manage/amscheckmain/deletes', {
                        "amsCheckRecordIds" : ids
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
            grid = $('#AmsCheckMainGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amscheckmain/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsCheckMainGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amscheckmain/query";
                }
                var paras = $.AmsCheckMainGrid.queryParams(grid);
                $.AmsCheckMain.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsCheckMainWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsCheckMainWindow').length>0){
            win = parent.$('#AmsCheckMainWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amscheckmain/importExcel'+$.AmsCheckMain.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "盘点主表导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsCheckMainIframeDom = $("#AmsCheckMainIframeDomIfile");
            if(AmsCheckMainIframeDom && AmsCheckMainIframeDom.length==0){
                $("body").append("<iframe id='AmsCheckMainIframeDomIfile' style='display:none'></iframe>");
                AmsCheckMainIframeDom = $("#AmsCheckMainIframeDomIfile");
            }
            AmsCheckMainIframeDom.attr("src","");
            var url= _appsite+"manage/amscheckmain/exportAuthAll?"+$.param($.AmsCheckMainGrid.queryParams(grid));
            AmsCheckMainIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsCheckMain_"+parent,data)){
                return;
            }
        }
        if (parent=="storageId"){
            var storageId = data.storageId;
            if ((storageId||"")==""){
                $("#AmsCheckMainForm #randId").combobox({data:[]});
                $("#AmsCheckMainForm #randId").combobox('setValue','');

                return;
            }
            $("#amsCheckMain_RandId").combobox({data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll?storageId='+data.storageId,'get')});
            if ((data.randId||"")!=""){
                $("#amsCheckMain_RandId").combobox('select',data.randId);
            }
        }
    }
}

$(function() {
    if ($('#AmsCheckMainGrid').length>0){
        $('#AmsCheckMainGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            sortName:"endTime",
            sortOrder:"desc",
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsCheckMain",row)){
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
                    if ($.AmsCheckMain.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsCheckMain.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsCheckMain.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsCheckMain.selected){
                    $(this).datagrid("selectRow",$.AmsCheckMain.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsCheckRecordId == $.AmsCheckMain.selectRow){
                    return;
                }
                if ((!$.AmsCheckMain.selectRow)&&$("#amsCheckMain_master").length>0){
                    if ($("#amsCheckMain_master").panel("options").region=="north"){
                        $("#amsCheckMain_master").panel("resize",{height:300});
                    }else{
                        $("#amsCheckMain_master").panel("resize",{width:400});
                    }
                }
                $.AmsCheckMain.selectRow = row.amsCheckRecordId;

            },
            columns:$.AmsCheckMainGrid.column

        });

    }

    $("#amsCheckMain_RandId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsCheckMain.onChange("randId",record);
            }
        }
    });

    $("#amsCheckMain_StorageId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsCheckMain.onChange("storageId",record);
            }
        }
    });

    $.AmsCheckMain.init();
    document.body.style.visibility = 'visible';
})