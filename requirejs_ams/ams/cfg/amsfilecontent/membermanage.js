$.AmsFileContent = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
            autoQuery = true;
            if ($("#amsFileContent_AmsFileId").length>0){
                $("#amsFileContent_AmsFileId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileContent_AmsFileId"),$("#amsFileId").val());
            }
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            autoQuery = true;
            if ($("#amsFileContent_BusinessNo").length>0){
                $("#amsFileContent_BusinessNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFileContent_BusinessNo"),$("#businessNo").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileContent_TextData"))!=""){
            autoQuery = true;
            if ($("#amsFileContent_TextData").length>0){
                $("#amsFileContent_TextData").parent().hide();
            }
            grid = $('#AmsFileContentGrid');
            if (grid.datagrid("getColumnOption","textData")!=null){
                grid.datagrid("getColumnOption","textData").hidden = true;
                if (grid.datagrid("getColumnOption","textDataShowLabel")!=null){
                    grid.datagrid("getColumnOption","textDataShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFileContent_BusinessName"))!=""){
            autoQuery = true;
            if ($("#amsFileContent_BusinessName").length>0){
                $("#amsFileContent_BusinessName").parent().hide();
            }
            grid = $('#AmsFileContentGrid');
            if (grid.datagrid("getColumnOption","businessName")!=null){
                grid.datagrid("getColumnOption","businessName").hidden = true;
                if (grid.datagrid("getColumnOption","businessNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","businessNameShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsFileContentGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFileContentGridPage'));
        }
        if (autoQuery){
            $.AmsFileContent.search($('#AmsFileContentGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsFileContent_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
            actionType += "&amsFileContent_AmsFileId="+$("#amsFileId").val();
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            actionType += "&amsFileContent_BusinessNo="+$("#businessNo").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsFileContent.currentGrid = grid;
        $.AmsFileContent.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsFileContentWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileContentWindow').length>0){
            win = parent.$('#AmsFileContentWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsFileContent.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsfilecontent/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案原文"
        });
    },
    edit : function(grid) {
        $.AmsFileContent.actionType="edit";
        $.AmsFileContent.openEdit(grid,"更新档案原文","?actionType=edit");
    },
    view : function(grid) {
        $.AmsFileContent.actionType="view";
        $.AmsFileContent.openEdit(grid,"查看档案原文","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsFileContent.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案原文进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案原文进行'+title});
                return;
            }
            id = rows[0].amsFileId
        }else{
            id = "null";
        }
        var win = $('#AmsFileContentWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileContentWindow').length>0){
            win = parent.$('#AmsFileContentWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsfilecontent/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsFileContent.currentGrid = grid;
        }
        var win = $('#AmsFileContentWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileContentWindow').length>0){
            win = parent.$('#AmsFileContentWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsfilecontent/importExcel'+$.AmsFileContent.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案原文导入"
        });
    },
    copy : function(grid) {
        $.AmsFileContent.currentGrid = grid;
        $.AmsFileContent.actionType="copy";
        $.AmsFileContent.openEdit(grid,"复制一个新的",$.AmsFileContent.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案原文将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsFileId);
                    }
                    $.post(_appsite + 'cfg/amsfilecontent/deletes', {
                        "amsFileIds" : ids
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
            if ($.AmsFileContent.currentGrid){
                grid = $.AmsFileContent.currentGrid;
            }else if($('#AmsFileContentGrid').length>0){
                grid = $('#AmsFileContentGrid');
                $.AmsFileContent.currentGrid = grid;
            }
        }
        var paras = $.AmsFileContentGrid.queryParams(grid);
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsfilecontent/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsfilecontent/query";
                }
                $.AmsFileContent.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsFileContentIframeDom = $("#AmsFileContentIframeDomIfile");
            if(AmsFileContentIframeDom && AmsFileContentIframeDom.length==0){
                $("body").append("<iframe id='AmsFileContentIframeDomIfile' style='display:none'></iframe>");
                AmsFileContentIframeDom = $("#AmsFileContentIframeDomIfile");
            }
            AmsFileContentIframeDom.attr("src","");
            var url= _appsite+"cfg/amsfilecontent/exportAuthAll?"+$.param($.AmsFileContentGrid.queryParams(grid));
            AmsFileContentIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsFileContentMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsFileContent_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsFileContentGrid').length>0){
        $('#AmsFileContentGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsFileContent.selected){
                    $(this).datagrid("selectRow",$.AmsFileContent.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsFileContent",row)){
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
                    if ($.AmsFileContent.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsFileContent.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsFileContent.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsFileId == $.AmsFileContent.selectRow){
                    return;
                }
                if ((!$.AmsFileContent.selectRow)&&$("#amsFileContent_master").length>0){
                    if ($("#amsFileContent_master").panel("options").region=="north"){
                        $("#amsFileContent_master").panel("resize",{height:300});
                    }else{
                        $("#amsFileContent_master").panel("resize",{width:400});
                    }
                }
                $.AmsFileContent.selectRow = row.amsFileId;

            },
            columns:$.AmsFileContentGrid.column

        });

    }

    if ($('#AmsFileContentWindow').length>0){
        $('#AmsFileContentWindow').window({
            closed:true,
            onClose:function () {
                $.AmsFileContent.search($("#AmsFileContentGrid"));
            }
        })
    }
    $.AmsFileContent.init();
    document.body.style.visibility = 'visible';
})