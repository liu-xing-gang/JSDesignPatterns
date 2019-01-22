$.AmsChecklist = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsChecklist_master").length>0){
            if ($("#amsChecklist_master").panel("options").region=="north"){
                $("#amsChecklist_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsChecklist_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#checkType").length>0&&$("#checkType").val()!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckType").length>0){
                $("#amsChecklist_CheckType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsChecklist_CheckType"),$("#checkType").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_UserNo").length>0){
                $("#amsChecklist_UserNo").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_CheckType"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckType").length>0){
                $("#amsChecklist_CheckType").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","checkType")!=null){
                grid.datagrid("getColumnOption","checkType").hidden = true;
                if (grid.datagrid("getColumnOption","checkTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkTypeShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_CheckBegin"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckBegin").length>0){
                $("#amsChecklist_CheckBegin").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","checkBegin")!=null){
                grid.datagrid("getColumnOption","checkBegin").hidden = true;
                if (grid.datagrid("getColumnOption","checkBeginShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkBeginShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_CheckEnd"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckEnd").length>0){
                $("#amsChecklist_CheckEnd").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","checkEnd")!=null){
                grid.datagrid("getColumnOption","checkEnd").hidden = true;
                if (grid.datagrid("getColumnOption","checkEndShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkEndShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_CheckUse"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckUse").length>0){
                $("#amsChecklist_CheckUse").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","checkUse")!=null){
                grid.datagrid("getColumnOption","checkUse").hidden = true;
                if (grid.datagrid("getColumnOption","checkUseShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkUseShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsChecklist_CheckUser"))!=""){
            autoQuery = true;
            if ($("#amsChecklist_CheckUser").length>0){
                $("#amsChecklist_CheckUser").parent().hide();
            }
            grid = $('#AmsChecklistGrid');
            if (grid.datagrid("getColumnOption","checkUser")!=null){
                grid.datagrid("getColumnOption","checkUser").hidden = true;
                if (grid.datagrid("getColumnOption","checkUserShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkUserShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsChecklistGridPage').length>0){
            $.totemUtils.setHeight($('#AmsChecklistGridPage'));
        }
        if (autoQuery){
            $.AmsChecklist.search($('#AmsChecklistGrid'));
        }

        $("#AmsChecklistForm #checkType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('checkType')
        });

    },
    setAuth : function(id){},onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsChecklist_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#checkType").length>0&&$("#checkType").val()!=""){
            actionType += "&amsChecklist_CheckType="+$("#checkType").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsChecklist.currentGrid = grid;
        $.AmsChecklist.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsChecklistWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsChecklistWindow').length>0){
            win = parent.$('#AmsChecklistWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsChecklist.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amschecklist/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案借阅清单"
        });
    },
    edit : function(grid) {
        $.AmsChecklist.actionType="edit";
        $.AmsChecklist.openEdit(grid,"更新档案借阅清单","?actionType=edit");
    },
    view : function(grid) {
        $.AmsChecklist.actionType="view";
        $.AmsChecklist.openEdit(grid,"查看档案借阅清单","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsChecklist.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个档案借阅清单进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个档案借阅清单进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsChecklistWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsChecklistWindow').length>0){
                win = parent.$('#AmsChecklistWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'cfg/amschecklist/edit/'+row.amsChecklistId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsChecklist.currentGrid = grid;
        $.AmsChecklist.actionType="copy";
        $.AmsChecklist.openEdit(grid,"复制一个新的",$.AmsChecklist.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案借阅清单将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsChecklistId);
                    }
                    $.post(_appsite + 'cfg/amschecklist/deletes', {
                        "amsChecklistIds" : ids
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
            grid = $('#AmsChecklistGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amschecklist/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsChecklistGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amschecklist/query";
                }
                var paras = $.AmsChecklistGrid.queryParams(grid);
                $.AmsChecklist.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsChecklistWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsChecklistWindow').length>0){
            win = parent.$('#AmsChecklistWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amschecklist/importExcel'+$.AmsChecklist.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案借阅清单导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsChecklistIframeDom = $("#AmsChecklistIframeDomIfile");
            if(AmsChecklistIframeDom && AmsChecklistIframeDom.length==0){
                $("body").append("<iframe id='AmsChecklistIframeDomIfile' style='display:none'></iframe>");
                AmsChecklistIframeDom = $("#AmsChecklistIframeDomIfile");
            }
            AmsChecklistIframeDom.attr("src","");
            var url= _appsite+"cfg/amschecklist/exportAuthAll?"+$.param($.AmsChecklistGrid.queryParams(grid));
            AmsChecklistIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsChecklistMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsChecklist_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsChecklistGrid').length>0){
        $('#AmsChecklistGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsChecklist",row)){
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
                    if ($.AmsChecklist.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsChecklist.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsChecklist.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsChecklist.selected){
                    $(this).datagrid("selectRow",$.AmsChecklist.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsChecklistId == $.AmsChecklist.selectRow){
                    return;
                }
                if ((!$.AmsChecklist.selectRow)&&$("#amsChecklist_master").length>0){
                    if ($("#amsChecklist_master").panel("options").region=="north"){
                        $("#amsChecklist_master").panel("resize",{height:300});
                    }else{
                        $("#amsChecklist_master").panel("resize",{width:400});
                    }
                }
                $.AmsChecklist.selectRow = row.amsChecklistId;

            },
            columns:$.AmsChecklistGrid.column

        });

    }

    $("#amsChecklist_CheckType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsChecklist.onChange("checkType",record);
            }
        }
    });

    $.AmsChecklist.init();
    document.body.style.visibility = 'visible';
})