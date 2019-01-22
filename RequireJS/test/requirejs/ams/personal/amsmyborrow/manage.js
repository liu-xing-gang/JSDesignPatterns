$.AmsMyBorrow = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#borrowStatus").length>0&&$("#borrowStatus").val()!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_BorrowStatus").length>0){
                $("#amsMyBorrow_BorrowStatus").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMyBorrow_BorrowStatus"),$("#borrowStatus").val());
            }
        }
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_BorrowType").length>0){
                $("#amsMyBorrow_BorrowType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsMyBorrow_BorrowType"),$("#borrowType").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_BorrowType"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_BorrowType").length>0){
                $("#amsMyBorrow_BorrowType").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","borrowType")!=null){
                grid.datagrid("getColumnOption","borrowType").hidden = true;
                if (grid.datagrid("getColumnOption","borrowTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","borrowTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_ConsNo"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_ConsNo").length>0){
                $("#amsMyBorrow_ConsNo").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","consNo")!=null){
                grid.datagrid("getColumnOption","consNo").hidden = true;
                if (grid.datagrid("getColumnOption","consNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","consNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_AppNo"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_AppNo").length>0){
                $("#amsMyBorrow_AppNo").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","appNo")!=null){
                grid.datagrid("getColumnOption","appNo").hidden = true;
                if (grid.datagrid("getColumnOption","appNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","appNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_BusiClass"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_BusiClass").length>0){
                $("#amsMyBorrow_BusiClass").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","busiClass")!=null){
                grid.datagrid("getColumnOption","busiClass").hidden = true;
                if (grid.datagrid("getColumnOption","busiClassShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiClassShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_BusiType"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_BusiType").length>0){
                $("#amsMyBorrow_BusiType").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","busiType")!=null){
                grid.datagrid("getColumnOption","busiType").hidden = true;
                if (grid.datagrid("getColumnOption","busiTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","busiTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsMyBorrow_ArcNo"))!=""){
            autoQuery = true;
            if ($("#amsMyBorrow_ArcNo").length>0){
                $("#amsMyBorrow_ArcNo").parent().hide();
            }
            grid = $('#AmsMyBorrowGrid');
            if (grid.datagrid("getColumnOption","arcNo")!=null){
                grid.datagrid("getColumnOption","arcNo").hidden = true;
                if (grid.datagrid("getColumnOption","arcNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","arcNoShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsMyBorrowGridPage').length>0){
            $.totemUtils.setHeight($('#AmsMyBorrowGridPage'));
        }
        if (autoQuery){
            $.AmsMyBorrow.search($('#AmsMyBorrowGrid'));
        }
        $("#AmsMyBorrowForm #borrowStatus").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('BORROW_STATUS')
        });

        $.totemUtils.getMutliCheck("#amsMyBorrow_BorrowType_el",$.totemUtils.getTypeCode('BORROW_TYPE'),'amsMyBorrow_BorrowType','codeValue','codeLabel');
    },

    getPara : function(actionType){
        if ($("#borrowStatus").length>0&&$("#borrowStatus").val()!=""){
            actionType += "&amsMyBorrow_BorrowStatus="+$("#borrowStatus").val();
        }
        if ($("#borrowType").length>0&&$("#borrowType").val()!=""){
            actionType += "&amsMyBorrow_BorrowType="+$("#borrowType").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsMyBorrow.currentGrid = grid;
        $.AmsMyBorrow.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsMyBorrowWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMyBorrowWindow').length>0){
            win = parent.$('#AmsMyBorrowWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsMyBorrow.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsmyborrow/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增我的借阅"
        });
    },
    edit : function(grid) {
        $.AmsMyBorrow.actionType="edit";
        $.AmsMyBorrow.openEdit(grid,"更新我的借阅","?actionType=edit");
    },
    arcMove : function(grid) {
        $.AmsMyBorrow.actionType="edit";
        $.AmsMyBorrow.openEdit(grid,"档案移动","?actionType=edit&&func=ArcMove");
    },
    view : function(grid) {
        $.AmsMyBorrow.actionType="view";
        $.AmsMyBorrow.openEdit(grid,"查看我的借阅","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsMyBorrow.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个我的借阅进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个我的借阅进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsMyBorrowWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsMyBorrowWindow').length>0){
                win = parent.$('#AmsMyBorrowWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'personal/amsmyborrow/edit/'+row.amsMyborrowId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsMyBorrow.currentGrid = grid;
        $.AmsMyBorrow.actionType="copy";
        $.AmsMyBorrow.openEdit(grid,"复制一个新的",$.AmsMyBorrow.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的我的借阅将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsMyborrowId);
                    }
                    $.post(_appsite + 'personal/amsmyborrow/deletes', {
                        "amsMyborrowIds" : ids
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
            grid = $('#AmsMyBorrowGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsmyborrow/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsMyBorrowGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"personal/amsmyborrow/query";
                }
                var paras = $.AmsMyBorrowGrid.queryParams(grid);
                $.AmsMyBorrow.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsMyBorrowWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsMyBorrowWindow').length>0){
            win = parent.$('#AmsMyBorrowWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'personal/amsmyborrow/importExcel'+$.AmsMyBorrow.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "我的借阅导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsMyBorrowIframeDom = $("#AmsMyBorrowIframeDomIfile");
            if(AmsMyBorrowIframeDom && AmsMyBorrowIframeDom.length==0){
                $("body").append("<iframe id='AmsMyBorrowIframeDomIfile' style='display:none'></iframe>");
                AmsMyBorrowIframeDom = $("#AmsMyBorrowIframeDomIfile");
            }
            AmsMyBorrowIframeDom.attr("src","");
            var url= _appsite+"personal/amsmyborrow/exportAuthAll?"+$.param($.AmsMyBorrowGrid.queryParams(grid));
            AmsMyBorrowIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_personal!=undefined&&$.t_personal.onChange!=undefined){
            if (!$.t_personal.onChange("AmsMyBorrow_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsMyBorrowGrid').length>0){
        $('#AmsMyBorrowGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_personal.onClickRow("AmsMyBorrow",row)){
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
                    if ($.AmsMyBorrow.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsMyBorrow.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsMyBorrow.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsMyBorrow.selected){
                    $(this).datagrid("selectRow",$.AmsMyBorrow.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsMyborrowId == $.AmsMyBorrow.selectRow){
                    return;
                }
                if ((!$.AmsMyBorrow.selectRow)&&$("#amsMyBorrow_master").length>0){
                    if ($("#amsMyBorrow_master").panel("options").region=="north"){
                        $("#amsMyBorrow_master").panel("resize",{height:300});
                    }else{
                        $("#amsMyBorrow_master").panel("resize",{width:400});
                    }
                }
                $.AmsMyBorrow.selectRow = row.amsMyborrowId;

            },
            columns:$.AmsMyBorrowGrid.column

        });

    }

    $.AmsMyBorrow.init();
    document.body.style.visibility = 'visible';
})