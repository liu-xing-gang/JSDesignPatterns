$.AmsMovableRack = {
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
            if ($("#amsMovableRack_StorageId").length>0){
                $("#amsMovableRack_StorageId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMovableRack_StorageId"),$("#storageId").val());
            }
        }
        if ($("#rackType").length>0&&$("#rackType").val()!=""){
            autoQuery = true;
            if ($("#amsMovableRack_RackType").length>0){
                $("#amsMovableRack_RackType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMovableRack_RackType"),$("#rackType").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMovableRack_StorageId"))!=""){
            autoQuery = true;
            if ($("#amsMovableRack_StorageId").length>0){
                $("#amsMovableRack_StorageId").parent().hide();
            }
            grid = $('#AmsMovableRackGrid');
            if (grid.datagrid("getColumnOption","storageId")!=null){
                grid.datagrid("getColumnOption","storageId").hidden = true;
                if (grid.datagrid("getColumnOption","storageIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","storageIdShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMovableRack_RackName"))!=""){
            autoQuery = true;
            if ($("#amsMovableRack_RackName").length>0){
                $("#amsMovableRack_RackName").parent().hide();
            }
            grid = $('#AmsMovableRackGrid');
            if (grid.datagrid("getColumnOption","rackName")!=null){
                grid.datagrid("getColumnOption","rackName").hidden = true;
                if (grid.datagrid("getColumnOption","rackNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","rackNameShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsMovableRackGridPage').length>0){
            $.totemUtils.setHeight($('#AmsMovableRackGridPage'));
        }
        if (autoQuery){
            $.AmsMovableRack.search($('#AmsMovableRackGrid'));
        }

        $("#AmsMovableRackForm #storageId").combobox({
            valueField :"storageId",
            textField:"storageName",
            data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
        });

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsMovableRack_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#storageId").length>0&&$("#storageId").val()!=""){
            actionType += "&amsMovableRack_StorageId="+$("#storageId").val();
        }
        if ($("#rackType").length>0&&$("#rackType").val()!=""){
            actionType += "&amsMovableRack_RackType="+$("#rackType").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsMovableRack.currentGrid = grid;
        $.AmsMovableRack.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsMovableRackWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMovableRackWindow').length>0){
            win = parent.$('#AmsMovableRackWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsMovableRack.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsmovablerack/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增密集柜管理"
        });
    },
    edit : function(grid) {
        $.AmsMovableRack.actionType="edit";
        $.AmsMovableRack.openEdit(grid,"更新密集柜管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsMovableRack.actionType="view";
        $.AmsMovableRack.openEdit(grid,"查看密集柜管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsMovableRack.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个密集柜管理进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个密集柜管理进行'+title});
                return;
            }
            id = rows[0].movableRackId
        }else{
            id = "null";
        }
        var win = $('#AmsMovableRackWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMovableRackWindow').length>0){
            win = parent.$('#AmsMovableRackWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsmovablerack/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsMovableRackWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMovableRackWindow').length>0){
            win = parent.$('#AmsMovableRackWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsmovablerack/importExcel'+$.AmsMovableRack.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "密集柜管理导入"
        });
    },
    copy : function(grid) {
        $.AmsMovableRack.currentGrid = grid;
        $.AmsMovableRack.actionType="copy";
        $.AmsMovableRack.openEdit(grid,"复制一个新的",$.AmsMovableRack.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的密集柜管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].movableRackId);
                    }
                    $.post(_appsite + 'cfg/amsmovablerack/deletes', {
                        "movableRackIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员档案位管理？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"manage/amsrackno/deletes",{movableRacks:ids},"json");
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
        var paras = $.AmsMovableRackGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsMovableRackGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsmovablerack/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsmovablerack/query";
                }
                $.AmsMovableRack.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsMovableRackIframeDom = $("#AmsMovableRackIframeDomIfile");
            if(AmsMovableRackIframeDom && AmsMovableRackIframeDom.length==0){
                $("body").append("<iframe id='AmsMovableRackIframeDomIfile' style='display:none'></iframe>");
                AmsMovableRackIframeDom = $("#AmsMovableRackIframeDomIfile");
            }
            AmsMovableRackIframeDom.attr("src","");
            var url= _appsite+"cfg/amsmovablerack/exportAuthAll?"+$.param($.AmsMovableRackGrid.queryParams(grid));
            AmsMovableRackIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsMovableRackGrid').length>0){
        $('#AmsMovableRackGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsMovableRack.selected){
                    $(this).datagrid("selectRow",$.AmsMovableRack.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsMovableRack",row)){
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
                    if ($.AmsMovableRack.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsMovableRack.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsMovableRack.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.movableRackId == $.AmsMovableRack.selectRow){
                    return;
                }
                if ((!$.AmsMovableRack.selectRow)&&$("#amsMovableRack_master").length>0){
                    if ($("#amsMovableRack_master").panel("options").region=="north"){
                        $("#amsMovableRack_master").panel("resize",{height:300});
                    }else{
                        $("#amsMovableRack_master").panel("resize",{width:400});
                    }
                }
                $.AmsMovableRack.selectRow = row.movableRackId;

            },
            columns:$.AmsMovableRackGrid.column

        });

    }

    $("#amsMovableRack_StorageId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsMovableRack.onChange("amsMovableRack_storageId",record);
            }
        }
    });

    if ($('#AmsMovableRackWindow').length>0){
        $('#AmsMovableRackWindow').window({
            closed:true,
            onClose:function () {
                $.AmsMovableRack.search($("#AmsMovableRackGrid"));
            }
        })
    }
    $.AmsMovableRack.init();
    document.body.style.visibility = 'visible';
})