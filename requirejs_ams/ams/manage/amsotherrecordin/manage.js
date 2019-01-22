$.AmsOtherrecordin = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_BoxNo").length>0){
                $("#amsOtherrecordin_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsOtherrecordin_BoxNo"),$("#boxNo").val());
            }
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_BusinessNo").length>0){
                $("#amsOtherrecordin_BusinessNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsOtherrecordin_BusinessNo"),$("#businessNo").val());
            }
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_SecretLevel").length>0){
                $("#amsOtherrecordin_SecretLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsOtherrecordin_SecretLevel"),$("#secretLevel").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsOtherrecordin_ApplicationNo"))!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_ApplicationNo").length>0){
                $("#amsOtherrecordin_ApplicationNo").parent().hide();
            }
            grid = $('#AmsOtherrecordinGrid');
            if (grid.datagrid("getColumnOption","applicationNo")!=null){
                grid.datagrid("getColumnOption","applicationNo").hidden = true;
                if (grid.datagrid("getColumnOption","applicationNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","applicationNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsOtherrecordin_PowerUnit"))!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_PowerUnit").length>0){
                $("#amsOtherrecordin_PowerUnit").parent().hide();
            }
            grid = $('#AmsOtherrecordinGrid');
            if (grid.datagrid("getColumnOption","powerUnit")!=null){
                grid.datagrid("getColumnOption","powerUnit").hidden = true;
                if (grid.datagrid("getColumnOption","powerUnitShowLabel")!=null){
                    grid.datagrid("getColumnOption","powerUnitShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsOtherrecordin_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_UserNo").length>0){
                $("#amsOtherrecordin_UserNo").parent().hide();
            }
            grid = $('#AmsOtherrecordinGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsOtherrecordin_UserName"))!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_UserName").length>0){
                $("#amsOtherrecordin_UserName").parent().hide();
            }
            grid = $('#AmsOtherrecordinGrid');
            if (grid.datagrid("getColumnOption","userName")!=null){
                grid.datagrid("getColumnOption","userName").hidden = true;
                if (grid.datagrid("getColumnOption","userNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsOtherrecordin_FileBar"))!=""){
            autoQuery = true;
            if ($("#amsOtherrecordin_FileBar").length>0){
                $("#amsOtherrecordin_FileBar").parent().hide();
            }
            grid = $('#AmsOtherrecordinGrid');
            if (grid.datagrid("getColumnOption","fileBar")!=null){
                grid.datagrid("getColumnOption","fileBar").hidden = true;
                if (grid.datagrid("getColumnOption","fileBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","fileBarShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsOtherrecordinGridPage').length>0){
            $.totemUtils.setHeight($('#AmsOtherrecordinGridPage'));
        }
        if (autoQuery){
            $.AmsOtherrecordin.search($('#AmsOtherrecordinGrid'));
        }

        $("#AmsOtherrecordinForm #secretLevel").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('secrecy_level')
        });

    },

    getPara : function(actionType){
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsOtherrecordin_BoxNo="+$("#boxNo").val();
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            actionType += "&amsOtherrecordin_BusinessNo="+$("#businessNo").val();
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            actionType += "&amsOtherrecordin_SecretLevel="+$("#secretLevel").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsOtherrecordin.currentGrid = grid;
        $.AmsOtherrecordin.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsOtherrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsOtherrecordinWindow').length>0){
            win = parent.$('#AmsOtherrecordinWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsOtherrecordin.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsotherrecordin/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增其他档案入库"
        });
    },
    edit : function(grid) {
        $.AmsOtherrecordin.actionType="edit";
        $.AmsOtherrecordin.openEdit(grid,"更新其他档案入库","?actionType=edit");
    },
    pushBox : function(grid) {
        $.AmsOtherrecordin.actionType="edit";
        $.AmsOtherrecordin.openEdit(grid,"装盒","?actionType=edit&&func=PushBox");
    },
    doneBusiness : function(grid) {
        $.AmsOtherrecordin.actionType="view";
        $.AmsOtherrecordin.openEdit(grid,"已办业务","?actionType=view&&func=DoneBusiness");
    },
    view : function(grid) {
        $.AmsOtherrecordin.actionType="view";
        $.AmsOtherrecordin.openEdit(grid,"查看其他档案入库","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsOtherrecordin.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个其他档案入库进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个其他档案入库进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsOtherrecordinWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsOtherrecordinWindow').length>0){
                win = parent.$('#AmsOtherrecordinWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'manage/amsotherrecordin/edit/'+row.amsHighrecordinId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsOtherrecordin.currentGrid = grid;
        $.AmsOtherrecordin.actionType="copy";
        $.AmsOtherrecordin.openEdit(grid,"复制一个新的",$.AmsOtherrecordin.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的其他档案入库将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsHighrecordinId);
                    }
                    $.post(_appsite + 'manage/amsotherrecordin/deletes', {
                        "amsHighrecordinIds" : ids
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
            grid = $('#AmsOtherrecordinGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsotherrecordin/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsOtherrecordinGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsotherrecordin/query";
                }
                var paras = $.AmsOtherrecordinGrid.queryParams(grid);
                $.AmsOtherrecordin.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsOtherrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsOtherrecordinWindow').length>0){
            win = parent.$('#AmsOtherrecordinWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsotherrecordin/importExcel'+$.AmsOtherrecordin.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "其他档案入库导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsOtherrecordinIframeDom = $("#AmsOtherrecordinIframeDomIfile");
            if(AmsOtherrecordinIframeDom && AmsOtherrecordinIframeDom.length==0){
                $("body").append("<iframe id='AmsOtherrecordinIframeDomIfile' style='display:none'></iframe>");
                AmsOtherrecordinIframeDom = $("#AmsOtherrecordinIframeDomIfile");
            }
            AmsOtherrecordinIframeDom.attr("src","");
            var url= _appsite+"manage/amsotherrecordin/exportAuthAll?"+$.param($.AmsOtherrecordinGrid.queryParams(grid));
            AmsOtherrecordinIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsOtherrecordin_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsOtherrecordinGrid').length>0){
        $('#AmsOtherrecordinGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsOtherrecordin",row)){
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
                    if ($.AmsOtherrecordin.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsOtherrecordin.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsOtherrecordin.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsOtherrecordin.selected){
                    $(this).datagrid("selectRow",$.AmsOtherrecordin.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsHighrecordinId == $.AmsOtherrecordin.selectRow){
                    return;
                }
                if ((!$.AmsOtherrecordin.selectRow)&&$("#amsOtherrecordin_master").length>0){
                    if ($("#amsOtherrecordin_master").panel("options").region=="north"){
                        $("#amsOtherrecordin_master").panel("resize",{height:300});
                    }else{
                        $("#amsOtherrecordin_master").panel("resize",{width:400});
                    }
                }
                $.AmsOtherrecordin.selectRow = row.amsHighrecordinId;

            },
            columns:$.AmsOtherrecordinGrid.column

        });

    }

    $.AmsOtherrecordin.init();
    document.body.style.visibility = 'visible';
})