$.AmsBorrowDetail = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            autoQuery = true;
            if ($("#amsBorrowDetail_BorrowType").length>0){
                $("#amsBorrowDetail_BorrowType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBorrowDetail_BorrowType"),$("#borrowType").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowDetail_AmsOuter"))!=""){
            autoQuery = true;
            if ($("#amsBorrowDetail_AmsOuter").length>0){
                $("#amsBorrowDetail_AmsOuter").parent().hide();
            }
            grid = $('#AmsBorrowDetailGrid');
            if (grid.datagrid("getColumnOption","amsOuter")!=null){
                grid.datagrid("getColumnOption","amsOuter").hidden = true;
                if (grid.datagrid("getColumnOption","amsOuterShowLabel")!=null){
                    grid.datagrid("getColumnOption","amsOuterShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowDetail_ReturnTime"))!=""){
            autoQuery = true;
            if ($("#amsBorrowDetail_ReturnTime").length>0){
                $("#amsBorrowDetail_ReturnTime").parent().hide();
            }
            grid = $('#AmsBorrowDetailGrid');
            if (grid.datagrid("getColumnOption","returnTime")!=null){
                grid.datagrid("getColumnOption","returnTime").hidden = true;
                if (grid.datagrid("getColumnOption","returnTimeShowLabel")!=null){
                    grid.datagrid("getColumnOption","returnTimeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBorrowDetailGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBorrowDetailGridPage'));
        }
        if (autoQuery){
            $.AmsBorrowDetail.search($('#AmsBorrowDetailGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_borrow!=undefined&&$.t_borrow.onChange!=undefined){
            if (!$.t_borrow.onChange("AmsBorrowDetail_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            actionType += "&amsBorrowDetail_BorrowType="+$("#borrowType").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBorrowDetail.currentGrid = grid;
        $.AmsBorrowDetail.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBorrowDetailWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBorrowDetailWindow').length>0){
            win = parent.$('#AmsBorrowDetailWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBorrowDetail.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'borrow/amsborrowdetail/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增借阅清单"
        });
    },
    edit : function(grid) {
        $.AmsBorrowDetail.actionType="edit";
        $.AmsBorrowDetail.openEdit(grid,"更新借阅清单","?actionType=edit");
    },
    openRack : function(grid) {
        $.AmsBorrowDetail.actionType="edit";
        $.AmsBorrowDetail.openEdit(grid,"开柜借出","?actionType=edit&&func=OpenRack");
    },
    amsReturn : function(grid) {
        $.AmsBorrowDetail.actionType="edit";
        $.AmsBorrowDetail.openEdit(grid,"档案归还","?actionType=edit&&func=AmsReturn");
    },
    view : function(grid) {
        $.AmsBorrowDetail.actionType="view";
        $.AmsBorrowDetail.openEdit(grid,"查看借阅清单","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsBorrowDetail.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个借阅清单进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个借阅清单进行'+title});
                return;
            }
            id = rows[0].amsBorrowDetailId
        }else{
            id = "null";
        }
        var win = $('#AmsBorrowDetailWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBorrowDetailWindow').length>0){
            win = parent.$('#AmsBorrowDetailWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'borrow/amsborrowdetail/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsBorrowDetail.currentGrid = grid;
        }
        var win = $('#AmsBorrowDetailWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBorrowDetailWindow').length>0){
            win = parent.$('#AmsBorrowDetailWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'borrow/amsborrowdetail/importExcel'+$.AmsBorrowDetail.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "借阅清单导入"
        });
    },
    copy : function(grid) {
        $.AmsBorrowDetail.currentGrid = grid;
        $.AmsBorrowDetail.actionType="copy";
        $.AmsBorrowDetail.openEdit(grid,"复制一个新的",$.AmsBorrowDetail.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的借阅清单将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsBorrowDetailId);
                    }
                    $.post(_appsite + 'borrow/amsborrowdetail/deletes', {
                        "amsBorrowDetailIds" : ids
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
        var paras = $.AmsBorrowDetailGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsBorrowDetailGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"borrow/amsborrowdetail/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"borrow/amsborrowdetail/query";
                }
                $.AmsBorrowDetail.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsBorrowDetailIframeDom = $("#AmsBorrowDetailIframeDomIfile");
            if(AmsBorrowDetailIframeDom && AmsBorrowDetailIframeDom.length==0){
                $("body").append("<iframe id='AmsBorrowDetailIframeDomIfile' style='display:none'></iframe>");
                AmsBorrowDetailIframeDom = $("#AmsBorrowDetailIframeDomIfile");
            }
            AmsBorrowDetailIframeDom.attr("src","");
            var url= _appsite+"borrow/amsborrowdetail/exportAuthAll?"+$.param($.AmsBorrowDetailGrid.queryParams(grid));
            AmsBorrowDetailIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsBorrowDetailGrid').length>0){
        $('#AmsBorrowDetailGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsBorrowDetail.selected){
                    $(this).datagrid("selectRow",$.AmsBorrowDetail.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_borrow.onClickRow("AmsBorrowDetail",row)){
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
                    if ($.AmsBorrowDetail.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBorrowDetail.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBorrowDetail.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsBorrowDetailId == $.AmsBorrowDetail.selectRow){
                    return;
                }
                if ((!$.AmsBorrowDetail.selectRow)&&$("#amsBorrowDetail_master").length>0){
                    if ($("#amsBorrowDetail_master").panel("options").region=="north"){
                        $("#amsBorrowDetail_master").panel("resize",{height:300});
                    }else{
                        $("#amsBorrowDetail_master").panel("resize",{width:400});
                    }
                }
                $.AmsBorrowDetail.selectRow = row.amsBorrowDetailId;

            },
            columns:$.AmsBorrowDetailGrid.column

        });

    }

    if ($('#AmsBorrowDetailWindow').length>0){
        $('#AmsBorrowDetailWindow').window({
            closed:true,
            onClose:function () {
                $.AmsBorrowDetail.search($("#AmsBorrowDetailGrid"));
            }
        })
    }
    $.AmsBorrowDetail.init();
    document.body.style.visibility = 'visible';
})