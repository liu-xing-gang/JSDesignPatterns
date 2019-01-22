$.AmsBarmanage = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#barType").length>0&&$("#barType").val()!=""){
            autoQuery = true;
            if ($("#amsBarmanage_BarType").length>0){
                $("#amsBarmanage_BarType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBarmanage_BarType"),$("#barType").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBarmanage_BarType"))!=""){
            autoQuery = true;
            if ($("#amsBarmanage_BarType").length>0){
                $("#amsBarmanage_BarType").parent().hide();
            }
            grid = $('#AmsBarmanageGrid');
            if (grid.datagrid("getColumnOption","barType")!=null){
                grid.datagrid("getColumnOption","barType").hidden = true;
                if (grid.datagrid("getColumnOption","barTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","barTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBarmanage_BarCreater"))!=""){
            autoQuery = true;
            if ($("#amsBarmanage_BarCreater").length>0){
                $("#amsBarmanage_BarCreater").parent().hide();
            }
            grid = $('#AmsBarmanageGrid');
            if (grid.datagrid("getColumnOption","barCreater")!=null){
                grid.datagrid("getColumnOption","barCreater").hidden = true;
                if (grid.datagrid("getColumnOption","barCreaterShowLabel")!=null){
                    grid.datagrid("getColumnOption","barCreaterShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBarmanage_CreateData"))!=""){
            autoQuery = true;
            if ($("#amsBarmanage_CreateData").length>0){
                $("#amsBarmanage_CreateData").parent().hide();
            }
            grid = $('#AmsBarmanageGrid');
            if (grid.datagrid("getColumnOption","createData")!=null){
                grid.datagrid("getColumnOption","createData").hidden = true;
                if (grid.datagrid("getColumnOption","createDataShowLabel")!=null){
                    grid.datagrid("getColumnOption","createDataShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBarmanage_BarBegin"))!=""){
            autoQuery = true;
            if ($("#amsBarmanage_BarBegin").length>0){
                $("#amsBarmanage_BarBegin").parent().hide();
            }
            grid = $('#AmsBarmanageGrid');
            if (grid.datagrid("getColumnOption","barBegin")!=null){
                grid.datagrid("getColumnOption","barBegin").hidden = true;
                if (grid.datagrid("getColumnOption","barBeginShowLabel")!=null){
                    grid.datagrid("getColumnOption","barBeginShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBarmanage_BarEnd"))!=""){
            autoQuery = true;
            if ($("#amsBarmanage_BarEnd").length>0){
                $("#amsBarmanage_BarEnd").parent().hide();
            }
            grid = $('#AmsBarmanageGrid');
            if (grid.datagrid("getColumnOption","barEnd")!=null){
                grid.datagrid("getColumnOption","barEnd").hidden = true;
                if (grid.datagrid("getColumnOption","barEndShowLabel")!=null){
                    grid.datagrid("getColumnOption","barEndShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBarmanageGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBarmanageGridPage'));
        }
        if (autoQuery){
            $.AmsBarmanage.search($('#AmsBarmanageGrid'));
        }

        $("#AmsBarmanageForm #barType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('BAR_TYPE')
        });

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsBarmanage_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#barType").length>0&&$("#barType").val()!=""){
            actionType += "&amsBarmanage_BarType="+$("#barType").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBarmanage.currentGrid = grid;
        $.AmsBarmanage.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBarmanageWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBarmanageWindow').length>0){
            win = parent.$('#AmsBarmanageWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBarmanage.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbarmanage/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增条码管理"
        });
    },
    edit : function(grid) {
        $.AmsBarmanage.actionType="edit";
        $.AmsBarmanage.openEdit(grid,"更新条码管理","?actionType=edit");
    },
    createBar : function(grid) {
        $.AmsBarmanage.actionType="edit";
        $.AmsBarmanage.openEdit(grid,"生成条码","?actionType=edit&&func=CreateBar");
    },
    view : function(grid) {
        $.AmsBarmanage.actionType="view";
        $.AmsBarmanage.openEdit(grid,"查看条码管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsBarmanage.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个条码管理进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个条码管理进行'+title});
                return;
            }
            id = rows[0].amsBarmanageId
        }else{
            id = "null";
        }
        var win = $('#AmsBarmanageWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBarmanageWindow').length>0){
            win = parent.$('#AmsBarmanageWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbarmanage/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsBarmanageWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBarmanageWindow').length>0){
            win = parent.$('#AmsBarmanageWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbarmanage/importExcel'+$.AmsBarmanage.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "条码管理导入"
        });
    },
    copy : function(grid) {
        $.AmsBarmanage.currentGrid = grid;
        $.AmsBarmanage.actionType="copy";
        $.AmsBarmanage.openEdit(grid,"复制一个新的",$.AmsBarmanage.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的条码管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsBarmanageId);
                    }
                    $.post(_appsite + 'cfg/amsbarmanage/deletes', {
                        "amsBarmanageIds" : ids
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
            grid = $('#AmsBarmanageGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbarmanage/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsBarmanageGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbarmanage/query";
                }
                var paras = $.AmsBarmanageGrid.queryParams(grid);
                $.AmsBarmanage.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },exportExcel:function(grid){
        if(grid){
            var AmsBarmanageIframeDom = $("#AmsBarmanageIframeDomIfile");
            if(AmsBarmanageIframeDom && AmsBarmanageIframeDom.length==0){
                $("body").append("<iframe id='AmsBarmanageIframeDomIfile' style='display:none'></iframe>");
                AmsBarmanageIframeDom = $("#AmsBarmanageIframeDomIfile");
            }
            AmsBarmanageIframeDom.attr("src","");
            var url= _appsite+"cfg/amsbarmanage/exportAuthAll?"+$.param($.AmsBarmanageGrid.queryParams(grid));
            AmsBarmanageIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsBarmanageMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsBarmanage_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsBarmanageGrid').length>0){
        $('#AmsBarmanageGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsBarmanage.selected){
                    $(this).datagrid("selectRow",$.AmsBarmanage.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsBarmanage",row)){
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
                    if ($.AmsBarmanage.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBarmanage.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBarmanage.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsBarmanageId == $.AmsBarmanage.selectRow){
                    return;
                }
                if ((!$.AmsBarmanage.selectRow)&&$("#amsBarmanage_master").length>0){
                    if ($("#amsBarmanage_master").panel("options").region=="north"){
                        $("#amsBarmanage_master").panel("resize",{height:300});
                    }else{
                        $("#amsBarmanage_master").panel("resize",{width:400});
                    }
                }
                $.AmsBarmanage.selectRow = row.amsBarmanageId;

            },
            columns:$.AmsBarmanageGrid.column

        });

    }

    $("#amsBarmanage_BarType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsBarmanage.onChange("barType",record);
            }
        }
    });

    $.AmsBarmanage.init();
    document.body.style.visibility = 'visible';
})