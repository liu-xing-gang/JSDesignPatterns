$.AmsAddress = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = true;
        if ($("#rackNo").length>0&&$("#rackNo").val()!=""){
            autoQuery = true;
            if ($("#amsAddress_RackNo").length>0){
                $("#amsAddress_RackNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsAddress_RackNo"),$("#rackNo").val());
            }
        }
        if ($("#amsRackstate").length>0&&$("#amsRackstate").val()!=""){
            autoQuery = true;
            if ($("#amsAddress_AmsRackstate").length>0){
                $("#amsAddress_AmsRackstate").parent().hide();
                $.totemUtils.setPropertyValue($("#amsAddress_AmsRackstate"),$("#amsRackstate").val());
            }
        }
        if ($('#AmsAddressGridPage').length>0){
            $.totemUtils.setHeight($('#AmsAddressGridPage'));
        }
        if (autoQuery){
            $.AmsAddress.search($('#AmsAddressGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsAddress_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#rackNo").length>0&&$("#rackNo").val()!=""){
            actionType += "&amsAddress_RackNo="+$("#rackNo").val();
        }
        if ($("#amsRackstate").length>0&&$("#amsRackstate").val()!=""){
            actionType += "&amsAddress_AmsRackstate="+$("#amsRackstate").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsAddress.currentGrid = grid;
        $.AmsAddress.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsAddressWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsAddressWindow').length>0){
            win = parent.$('#AmsAddressWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsAddress.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsaddress/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案位置"
        });
    },
    edit : function(grid) {
        $.AmsAddress.actionType="edit";
        $.AmsAddress.openEdit(grid,"更新档案位置","?actionType=edit");
    },
    view : function(grid) {
        $.AmsAddress.actionType="view";
        $.AmsAddress.openEdit(grid,"查看档案位置","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsAddress.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案位置进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案位置进行'+title});
                return;
            }
            id = rows[0].amsAddressId
        }else{
            id = "null";
        }
        var win = $('#AmsAddressWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsAddressWindow').length>0){
            win = parent.$('#AmsAddressWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsaddress/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsAddressWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsAddressWindow').length>0){
            win = parent.$('#AmsAddressWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsaddress/importExcel'+$.AmsAddress.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案位置导入"
        });
    },
    copy : function(grid) {
        $.AmsAddress.currentGrid = grid;
        $.AmsAddress.actionType="copy";
        $.AmsAddress.openEdit(grid,"复制一个新的",$.AmsAddress.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案位置将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsAddressId);
                    }
                    $.post(_appsite + 'manage/amsaddress/deletes', {
                        "amsAddressIds" : ids
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
        var paras = $.AmsAddressGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsAddressGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsaddress/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsaddress/query";
                }
                $.AmsAddress.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsAddressIframeDom = $("#AmsAddressIframeDomIfile");
            if(AmsAddressIframeDom && AmsAddressIframeDom.length==0){
                $("body").append("<iframe id='AmsAddressIframeDomIfile' style='display:none'></iframe>");
                AmsAddressIframeDom = $("#AmsAddressIframeDomIfile");
            }
            AmsAddressIframeDom.attr("src","");
            var url= _appsite+"manage/amsaddress/exportAuthAll?"+$.param($.AmsAddressGrid.queryParams(grid));
            AmsAddressIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsAddressMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsAddress_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsAddressGrid').length>0){
        $('#AmsAddressGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsAddress.selected){
                    $(this).datagrid("selectRow",$.AmsAddress.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsAddress",row)){
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
                    if ($.AmsAddress.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsAddress.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsAddress.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsAddressId == $.AmsAddress.selectRow){
                    return;
                }
                if ((!$.AmsAddress.selectRow)&&$("#amsAddress_master").length>0){
                    if ($("#amsAddress_master").panel("options").region=="north"){
                        $("#amsAddress_master").panel("resize",{height:300});
                    }else{
                        $("#amsAddress_master").panel("resize",{width:400});
                    }
                }
                $.AmsAddress.selectRow = row.amsAddressId;

            },
            columns:$.AmsAddressGrid.column

        });

    }

    if ($('#AmsAddressWindow').length>0){
        $('#AmsAddressWindow').window({
            closed:true,
            onClose:function () {
                $.AmsAddress.search();
            }
        })
    }
    $.AmsAddress.init();
    document.body.style.visibility = 'visible';
})