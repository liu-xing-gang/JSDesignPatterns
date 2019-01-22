$.AmsMove = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#hallName").length>0&&$("#hallName").val()!=""){
            autoQuery = true;
            if ($("#amsMove_HallName").length>0){
                $("#amsMove_HallName").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMove_HallName"),$("#hallName").val());
            }
        }
        if ($("#storageName").length>0&&$("#storageName").val()!=""){
            autoQuery = true;
            if ($("#amsMove_StorageName").length>0){
                $("#amsMove_StorageName").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMove_StorageName"),$("#storageName").val());
            }
        }
        if ($("#storage").length>0&&$("#storage").val()!=""){
            autoQuery = true;
            if ($("#amsMove_Storage").length>0){
                $("#amsMove_Storage").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMove_Storage"),$("#storage").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMove_HallName"))!=""){
            autoQuery = true;
            if ($("#amsMove_HallName").length>0){
                $("#amsMove_HallName").parent().hide();
            }
            grid = $('#AmsMoveGrid');
            if (grid.datagrid("getColumnOption","hallName")!=null){
                grid.datagrid("getColumnOption","hallName").hidden = true;
                if (grid.datagrid("getColumnOption","hallNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","hallNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMove_StorageName"))!=""){
            autoQuery = true;
            if ($("#amsMove_StorageName").length>0){
                $("#amsMove_StorageName").parent().hide();
            }
            grid = $('#AmsMoveGrid');
            if (grid.datagrid("getColumnOption","storageName")!=null){
                grid.datagrid("getColumnOption","storageName").hidden = true;
                if (grid.datagrid("getColumnOption","storageNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","storageNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMove_Storage"))!=""){
            autoQuery = true;
            if ($("#amsMove_Storage").length>0){
                $("#amsMove_Storage").parent().hide();
            }
            grid = $('#AmsMoveGrid');
            if (grid.datagrid("getColumnOption","storage")!=null){
                grid.datagrid("getColumnOption","storage").hidden = true;
                if (grid.datagrid("getColumnOption","storageShowLabel")!=null){
                    grid.datagrid("getColumnOption","storageShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsMoveGridPage').length>0){
            $.totemUtils.setHeight($('#AmsMoveGridPage'));
        }
        if (autoQuery){
            $.AmsMove.search($('#AmsMoveGrid'));
        }
        $("#AmsMoveForm #hallName").combobox({
            valueField :"hallName",
            textField:"hallName",
            data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
        });

        $("#AmsMoveForm #storageName").combobox({
            valueField :"storageName",
            textField:"storageName",
            data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
        });

        $("#AmsMoveForm #storage").combobox({
            valueField :"",
            textField:"",
            data:$.totemUtils.getJson('cfg/amsstorage/queryAuthAll','get')
        });

    },

    getPara : function(actionType){
        if ($("#hallName").length>0&&$("#hallName").val()!=""){
            actionType += "&amsMove_HallName="+$("#hallName").val();
        }
        if ($("#storageName").length>0&&$("#storageName").val()!=""){
            actionType += "&amsMove_StorageName="+$("#storageName").val();
        }
        if ($("#storage").length>0&&$("#storage").val()!=""){
            actionType += "&amsMove_Storage="+$("#storage").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsMove.currentGrid = grid;
        $.AmsMove.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsMoveWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMoveWindow').length>0){
            win = parent.$('#AmsMoveWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsMove.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsmove/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案移动"
        });
    },
    edit : function(grid) {
        $.AmsMove.actionType="edit";
        $.AmsMove.openEdit(grid,"更新档案移动","?actionType=edit");
    },
    view : function(grid) {
        $.AmsMove.actionType="view";
        $.AmsMove.openEdit(grid,"查看档案移动","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsMove.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个档案移动进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个档案移动进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsMoveWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsMoveWindow').length>0){
                win = parent.$('#AmsMoveWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'coll/amsmove/edit/'+row.amsMoveId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsMove.currentGrid = grid;
        $.AmsMove.actionType="copy";
        $.AmsMove.openEdit(grid,"复制一个新的",$.AmsMove.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案移动将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsMoveId);
                    }
                    $.post(_appsite + 'coll/amsmove/deletes', {
                        "amsMoveIds" : ids
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
            grid = $('#AmsMoveGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsmove/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsMoveGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsmove/query";
                }
                var paras = $.AmsMoveGrid.queryParams(grid);
                $.AmsMove.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsMoveWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMoveWindow').length>0){
            win = parent.$('#AmsMoveWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsmove/importExcel'+$.AmsMove.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案移动导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsMoveIframeDom = $("#AmsMoveIframeDomIfile");
            if(AmsMoveIframeDom && AmsMoveIframeDom.length==0){
                $("body").append("<iframe id='AmsMoveIframeDomIfile' style='display:none'></iframe>");
                AmsMoveIframeDom = $("#AmsMoveIframeDomIfile");
            }
            AmsMoveIframeDom.attr("src","");
            var url= _appsite+"coll/amsmove/exportAuthAll?"+$.param($.AmsMoveGrid.queryParams(grid));
            AmsMoveIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
            if (!$.t_coll.onChange("AmsMove_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsMoveGrid').length>0){
        $('#AmsMoveGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_coll.onClickRow("AmsMove",row)){
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
                    if ($.AmsMove.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsMove.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsMove.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsMove.selected){
                    $(this).datagrid("selectRow",$.AmsMove.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsMoveId == $.AmsMove.selectRow){
                    return;
                }
                if ((!$.AmsMove.selectRow)&&$("#amsMove_master").length>0){
                    if ($("#amsMove_master").panel("options").region=="north"){
                        $("#amsMove_master").panel("resize",{height:300});
                    }else{
                        $("#amsMove_master").panel("resize",{width:400});
                    }
                }
                $.AmsMove.selectRow = row.amsMoveId;

            },
            columns:$.AmsMoveGrid.column

        });

    }

    $("#amsMove_HallName").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsMove.onChange("hallName",record);
            }
        }
    });

    $("#amsMove_StorageName").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsMove.onChange("storageName",record);
            }
        }
    });

    $("#amsMove_Storage").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsMove.onChange("storage",record);
            }
        }
    });

    $.AmsMove.init();
    document.body.style.visibility = 'visible';
})