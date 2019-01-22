$.AmsBorrowMana = {
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
            if ($("#amsBorrowMana_BorrowStatus").length>0){
                $("#amsBorrowMana_BorrowStatus").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBorrowMana_BorrowStatus"),$("#borrowStatus").val());
            }
        }
        if ($("#elecStatus").length>0&&$("#elecStatus").val()!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_ElecStatus").length>0){
                $("#amsBorrowMana_ElecStatus").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBorrowMana_ElecStatus"),$("#elecStatus").val());
            }
        }
        if ($("#paperStatus").length>0&&$("#paperStatus").val()!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_PaperStatus").length>0){
                $("#amsBorrowMana_PaperStatus").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBorrowMana_PaperStatus"),$("#paperStatus").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowMana_FormNo"))!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_FormNo").length>0){
                $("#amsBorrowMana_FormNo").parent().hide();
            }
            grid = $('#AmsBorrowManaGrid');
            if (grid.datagrid("getColumnOption","formNo")!=null){
                grid.datagrid("getColumnOption","formNo").hidden = true;
                if (grid.datagrid("getColumnOption","formNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","formNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowMana_ElecStatus"))!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_ElecStatus").length>0){
                $("#amsBorrowMana_ElecStatus").parent().hide();
            }
            grid = $('#AmsBorrowManaGrid');
            if (grid.datagrid("getColumnOption","elecStatus")!=null){
                grid.datagrid("getColumnOption","elecStatus").hidden = true;
                if (grid.datagrid("getColumnOption","elecStatusShowLabel")!=null){
                    grid.datagrid("getColumnOption","elecStatusShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowMana_PaperStatus"))!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_PaperStatus").length>0){
                $("#amsBorrowMana_PaperStatus").parent().hide();
            }
            grid = $('#AmsBorrowManaGrid');
            if (grid.datagrid("getColumnOption","paperStatus")!=null){
                grid.datagrid("getColumnOption","paperStatus").hidden = true;
                if (grid.datagrid("getColumnOption","paperStatusShowLabel")!=null){
                    grid.datagrid("getColumnOption","paperStatusShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowMana_Proposer"))!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_Proposer").length>0){
                $("#amsBorrowMana_Proposer").parent().hide();
            }
            grid = $('#AmsBorrowManaGrid');
            if (grid.datagrid("getColumnOption","proposer")!=null){
                grid.datagrid("getColumnOption","proposer").hidden = true;
                if (grid.datagrid("getColumnOption","proposerShowLabel")!=null){
                    grid.datagrid("getColumnOption","proposerShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBorrowMana_SubTime"))!=""){
            autoQuery = true;
            if ($("#amsBorrowMana_SubTime").length>0){
                $("#amsBorrowMana_SubTime").parent().hide();
            }
            grid = $('#AmsBorrowManaGrid');
            if (grid.datagrid("getColumnOption","subTime")!=null){
                grid.datagrid("getColumnOption","subTime").hidden = true;
                if (grid.datagrid("getColumnOption","subTimeShowLabel")!=null){
                    grid.datagrid("getColumnOption","subTimeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBorrowManaGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBorrowManaGridPage'));
        }
        if (autoQuery){
            $.AmsBorrowMana.search($('#AmsBorrowManaGrid'));
        }
        $("#AmsBorrowManaForm #borrowStatus").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('APPROVAL_STATUS')
        });

        $("#AmsBorrowManaForm #elecStatus").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('ELEC_STATUS')
        });

        $("#AmsBorrowManaForm #paperStatus").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('PAPER_STATUS')
        });

    },

    getPara : function(actionType){
        if ($("#borrowStatus").length>0&&$("#borrowStatus").val()!=""){
            actionType += "&amsBorrowMana_BorrowStatus="+$("#borrowStatus").val();
        }
        if ($("#elecStatus").length>0&&$("#elecStatus").val()!=""){
            actionType += "&amsBorrowMana_ElecStatus="+$("#elecStatus").val();
        }
        if ($("#paperStatus").length>0&&$("#paperStatus").val()!=""){
            actionType += "&amsBorrowMana_PaperStatus="+$("#paperStatus").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBorrowMana.currentGrid = grid;
        $.AmsBorrowMana.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBorrowManaWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBorrowManaWindow').length>0){
            win = parent.$('#AmsBorrowManaWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBorrowMana.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'borrow/amsborrowmana/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增借阅管理"
        });
    },
    edit : function(grid) {
        $.AmsBorrowMana.actionType="edit";
        $.AmsBorrowMana.openEdit(grid,"更新借阅管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsBorrowMana.actionType="view";
        $.AmsBorrowMana.openEdit(grid,"查看借阅管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsBorrowMana.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个借阅管理进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个借阅管理进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsBorrowManaWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsBorrowManaWindow').length>0){
                win = parent.$('#AmsBorrowManaWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'borrow/amsborrowmana/edit/'+row.amsBorrowManaId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsBorrowMana.currentGrid = grid;
        $.AmsBorrowMana.actionType="copy";
        $.AmsBorrowMana.openEdit(grid,"复制一个新的",$.AmsBorrowMana.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的借阅管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsBorrowManaId);
                    }
                    $.post(_appsite + 'borrow/amsborrowmana/deletes', {
                        "amsBorrowManaIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员借阅清单？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"borrow/amsborrowdetail/deletes",{s:ids},"json");
                                }});
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
            grid = $('#AmsBorrowManaGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"borrow/amsborrowmana/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsBorrowManaGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"borrow/amsborrowmana/query";
                }
                var paras = $.AmsBorrowManaGrid.queryParams(grid);
                $.AmsBorrowMana.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsBorrowManaWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBorrowManaWindow').length>0){
            win = parent.$('#AmsBorrowManaWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'borrow/amsborrowmana/importExcel'+$.AmsBorrowMana.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "借阅管理导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsBorrowManaIframeDom = $("#AmsBorrowManaIframeDomIfile");
            if(AmsBorrowManaIframeDom && AmsBorrowManaIframeDom.length==0){
                $("body").append("<iframe id='AmsBorrowManaIframeDomIfile' style='display:none'></iframe>");
                AmsBorrowManaIframeDom = $("#AmsBorrowManaIframeDomIfile");
            }
            AmsBorrowManaIframeDom.attr("src","");
            var url= _appsite+"borrow/amsborrowmana/exportAuthAll?"+$.param($.AmsBorrowManaGrid.queryParams(grid));
            AmsBorrowManaIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_borrow!=undefined&&$.t_borrow.onChange!=undefined){
            if (!$.t_borrow.onChange("AmsBorrowMana_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsBorrowManaGrid').length>0){
        $('#AmsBorrowManaGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_borrow.onClickRow("AmsBorrowMana",row)){
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
                    if ($.AmsBorrowMana.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBorrowMana.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBorrowMana.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsBorrowMana.selected){
                    $(this).datagrid("selectRow",$.AmsBorrowMana.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsBorrowManaId == $.AmsBorrowMana.selectRow){
                    return;
                }
                if ((!$.AmsBorrowMana.selectRow)&&$("#amsBorrowMana_master").length>0){
                    if ($("#amsBorrowMana_master").panel("options").region=="north"){
                        $("#amsBorrowMana_master").panel("resize",{height:300});
                    }else{
                        $("#amsBorrowMana_master").panel("resize",{width:400});
                    }
                }
                $.AmsBorrowMana.selectRow = row.amsBorrowManaId;

            },
            columns:$.AmsBorrowManaGrid.column

        });

    }

    $("#amsBorrowMana_ElecStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsBorrowMana.onChange("elecStatus",record);
            }
        }
    });

    $("#amsBorrowMana_PaperStatus").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsBorrowMana.onChange("paperStatus",record);
            }
        }
    });

    $.AmsBorrowMana.init();
    document.body.style.visibility = 'visible';
})