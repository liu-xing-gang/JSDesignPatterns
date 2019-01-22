$.AmsInventory = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($.totemUtils.getPropertyValue($("#amsInventory_Kh"))!=""){
            autoQuery = true;
            if ($("#amsInventory_Kh").length>0){
                $("#amsInventory_Kh").parent().hide();
            }
            grid = $('#AmsInventoryGrid');
            if (grid.datagrid("getColumnOption","kh")!=null){
                grid.datagrid("getColumnOption","kh").hidden = true;
                if (grid.datagrid("getColumnOption","khShowLabel")!=null){
                    grid.datagrid("getColumnOption","khShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsInventory_Zh"))!=""){
            autoQuery = true;
            if ($("#amsInventory_Zh").length>0){
                $("#amsInventory_Zh").parent().hide();
            }
            grid = $('#AmsInventoryGrid');
            if (grid.datagrid("getColumnOption","zh")!=null){
                grid.datagrid("getColumnOption","zh").hidden = true;
                if (grid.datagrid("getColumnOption","zhShowLabel")!=null){
                    grid.datagrid("getColumnOption","zhShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsInventoryGridPage').length>0){
            $.totemUtils.setHeight($('#AmsInventoryGridPage'));
        }
        if (autoQuery){
            $.AmsInventory.search($('#AmsInventoryGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsInventory_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        return actionType;
    },
    create : function(grid) {
        $.AmsInventory.currentGrid = grid;
        $.AmsInventory.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsInventoryWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsInventoryWindow').length>0){
            win = parent.$('#AmsInventoryWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsInventory.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsinventory/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案盘点"
        });
    },
    edit : function(grid) {
        $.AmsInventory.actionType="edit";
        $.AmsInventory.openEdit(grid,"更新档案盘点","?actionType=edit");
    },
    view : function(grid) {
        $.AmsInventory.actionType="view";
        $.AmsInventory.openEdit(grid,"查看档案盘点","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsInventory.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案盘点进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案盘点进行'+title});
                return;
            }
            id = rows[0].id
        }else{
            id = "null";
        }
        var win = $('#AmsInventoryWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsInventoryWindow').length>0){
            win = parent.$('#AmsInventoryWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsinventory/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsInventory.currentGrid = grid;
        }
        var win = $('#AmsInventoryWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsInventoryWindow').length>0){
            win = parent.$('#AmsInventoryWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsinventory/importExcel'+$.AmsInventory.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案盘点导入"
        });
    },
    copy : function(grid) {
        $.AmsInventory.currentGrid = grid;
        $.AmsInventory.actionType="copy";
        $.AmsInventory.openEdit(grid,"复制一个新的",$.AmsInventory.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案盘点将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].id);
                    }
                    $.post(_appsite + 'manage/amsinventory/deletes', {
                        "ids" : ids
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
            if ($.AmsInventory.currentGrid){
                grid = $.AmsInventory.currentGrid;
            }else if($('#AmsInventoryGrid').length>0){
                grid = $('#AmsInventoryGrid');
                $.AmsInventory.currentGrid = grid;
            }
        }
        var paras = $.AmsInventoryGrid.queryParams(grid);
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsinventory/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsinventory/query";
                }
                $.AmsInventory.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsInventoryIframeDom = $("#AmsInventoryIframeDomIfile");
            if(AmsInventoryIframeDom && AmsInventoryIframeDom.length==0){
                $("body").append("<iframe id='AmsInventoryIframeDomIfile' style='display:none'></iframe>");
                AmsInventoryIframeDom = $("#AmsInventoryIframeDomIfile");
            }
            AmsInventoryIframeDom.attr("src","");
            var url= _appsite+"manage/amsinventory/exportAuthAll?"+$.param($.AmsInventoryGrid.queryParams(grid));
            AmsInventoryIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsInventoryGrid').length>0){
        $('#AmsInventoryGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsInventory.selected){
                    $(this).datagrid("selectRow",$.AmsInventory.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsInventory",row)){
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
                    if ($.AmsInventory.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsInventory.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsInventory.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.id == $.AmsInventory.selectRow){
                    return;
                }
                if ((!$.AmsInventory.selectRow)&&$("#amsInventory_master").length>0){
                    if ($("#amsInventory_master").panel("options").region=="north"){
                        $("#amsInventory_master").panel("resize",{height:300});
                    }else{
                        $("#amsInventory_master").panel("resize",{width:400});
                    }
                }
                $.AmsInventory.selectRow = row.id;

            },
            columns:$.AmsInventoryGrid.column

        });

    }

    if ($('#AmsInventoryWindow').length>0){
        $('#AmsInventoryWindow').window({
            closed:true,
            onClose:function () {
                $.AmsInventory.search($("#AmsInventoryGrid"));
            }
        })
    }
    $.AmsInventory.init();
    document.body.style.visibility = 'visible';
})