$.AmsFile = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
            autoQuery = true;
            if ($("#amsFile_AmsFileId").length>0){
                $("#amsFile_AmsFileId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsFile_AmsFileId"),$("#amsFileId").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsFile_FileUpload"))!=""){
            autoQuery = true;
            if ($("#amsFile_FileUpload").length>0){
                $("#amsFile_FileUpload").parent().hide();
            }
            grid = $('#AmsFileGrid');
            if (grid.datagrid("getColumnOption","fileUpload")!=null){
                grid.datagrid("getColumnOption","fileUpload").hidden = true;
                if (grid.datagrid("getColumnOption","fileUploadShowLabel")!=null){
                    grid.datagrid("getColumnOption","fileUploadShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsFileGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFileGridPage'));
        }
        if (autoQuery){
            $.AmsFile.search($('#AmsFileGrid'));
        }
    },

    setAuth : function(id){},
    getPara : function(actionType){
        if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
            actionType += "&amsFile_AmsFileId="+$("#amsFileId").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsFile.currentGrid = grid;
        $.AmsFile.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsFileWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileWindow').length>0){
            win = parent.$('#AmsFileWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsFile.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsfile/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增原文管理"
        });
    },
    edit : function(grid) {
        $.AmsFile.actionType="edit";
        $.AmsFile.openEdit(grid,"更新原文管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsFile.actionType="view";
        $.AmsFile.openEdit(grid,"查看原文管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsFile.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个原文管理进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个原文管理进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsFileWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsFileWindow').length>0){
                win = parent.$('#AmsFileWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'coll/amsfile/edit/'+row.amsFileId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsFile.currentGrid = grid;
        $.AmsFile.actionType="copy";
        $.AmsFile.openEdit(grid,"复制一个新的",$.AmsFile.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '信息删除，不可恢复！', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsFileId);
                    }
                    $.post(_appsite + 'coll/amsfile/deletes', {
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
            grid = $('#AmsFileGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsfile/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsFileGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"coll/amsfile/query";
                }
                var paras = $.AmsFileGrid.queryParams(grid);
                $.AmsFile.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsFileWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsFileWindow').length>0){
            win = parent.$('#AmsFileWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'coll/amsfile/importExcel'+$.AmsFile.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "原文管理导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsFileIframeDom = $("#AmsFileIframeDomIfile");
            if(AmsFileIframeDom && AmsFileIframeDom.length==0){
                $("body").append("<iframe id='AmsFileIframeDomIfile' style='display:none'></iframe>");
                AmsFileIframeDom = $("#AmsFileIframeDomIfile");
            }
            AmsFileIframeDom.attr("src","");
            var url= _appsite+"coll/amsfile/exportAuthAll?"+$.param($.AmsFileGrid.queryParams(grid));
            AmsFileIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
            if (!$.t_coll.onChange("AmsFile_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsFileGrid').length>0){
        $('#AmsFileGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
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
                    if ($.AmsFile.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsFile.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsFile.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsFile.selected){
                    $(this).datagrid("selectRow",$.AmsFile.selected);
                }
            },
            onSelect:function(index,row){
                if (row.amsFileId == $.AmsFile.selectRow){
                    return;
                }
                if ((!$.AmsFile.selectRow)&&$("#amsFile_master").length>0){
                    if ($("#amsFile_master").panel("options").region=="north"){
                        $("#amsFile_master").panel("resize",{height:300});
                    }else{
                        $("#amsFile_master").panel("resize",{width:400});
                    }
                }
                $.AmsFile.selectRow = row.amsFileId;

            },
            columns:$.AmsFileGrid.column

        });

    }

    $.AmsFile.init();
})