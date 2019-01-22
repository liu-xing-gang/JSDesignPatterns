$.AmsCheckRecord = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsCheckRecord_master").length>0){
            if ($("#amsCheckRecord_master").panel("options").region=="north"){
                $("#amsCheckRecord_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsCheckRecord_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#rackId").length>0&&$("#rackId").val()!=""){
            autoQuery = true;
            if ($("#amsCheckRecord_RackId").length>0){
                $("#amsCheckRecord_RackId").parent().hide();
                $.totemUtils.setPropertyValue($("#amsCheckRecord_RackId"),$("#rackId").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsCheckRecord_ArchiveId"))!=""){
            autoQuery = true;
            if ($("#amsCheckRecord_ArchiveId").length>0){
                $("#amsCheckRecord_ArchiveId").parent().hide();
            }
            grid = $('#AmsCheckRecordGrid');
            if (grid.datagrid("getColumnOption","archiveId")!=null){
                grid.datagrid("getColumnOption","archiveId").hidden = true;
                if (grid.datagrid("getColumnOption","archiveIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","archiveIdShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsCheckRecord_CheckMainId"))!=""){
            autoQuery = true;
            if ($("#amsCheckRecord_CheckMainId").length>0){
                $("#amsCheckRecord_CheckMainId").parent().hide();
            }
            grid = $('#AmsCheckRecordGrid');
            if (grid.datagrid("getColumnOption","checkMainId")!=null){
                grid.datagrid("getColumnOption","checkMainId").hidden = true;
                if (grid.datagrid("getColumnOption","checkMainIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","checkMainIdShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsCheckRecord_RackId"))!=""){
            autoQuery = true;
            if ($("#amsCheckRecord_RackId").length>0){
                $("#amsCheckRecord_RackId").parent().hide();
            }
            grid = $('#AmsCheckRecordGrid');
            if (grid.datagrid("getColumnOption","rackId")!=null){
                grid.datagrid("getColumnOption","rackId").hidden = true;
                if (grid.datagrid("getColumnOption","rackIdShowLabel")!=null){
                    grid.datagrid("getColumnOption","rackIdShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsCheckRecordGridPage').length>0){
            $.totemUtils.setHeight($('#AmsCheckRecordGridPage'));
        }
        if (autoQuery){
            $.AmsCheckRecord.search($('#AmsCheckRecordGrid'));
        }

        $("#AmsCheckRecordForm #rackId").combobox({
            valueField :"rackNoId",
            textField:"rackNo",
            data:$.totemUtils.getJson('manage/amsrackno/queryAuthAll','get')
        });

    },
    setAuth : function(id){},onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsCheckRecord_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#rackId").length>0&&$("#rackId").val()!=""){
            actionType += "&amsCheckRecord_RackId="+$("#rackId").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsCheckRecord.currentGrid = grid;
        $.AmsCheckRecord.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsCheckRecordWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsCheckRecordWindow').length>0){
            win = parent.$('#AmsCheckRecordWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsCheckRecord.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amscheckrecord/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增盘点记录表"
        });
    },
    edit : function(grid) {
        $.AmsCheckRecord.actionType="edit";
        $.AmsCheckRecord.openEdit(grid,"更新盘点记录表","?actionType=edit");
    },
    view : function(grid) {
        $.AmsCheckRecord.actionType="view";
        $.AmsCheckRecord.openEdit(grid,"查看盘点记录表","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsCheckRecord.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个盘点记录表进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个盘点记录表进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsCheckRecordWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsCheckRecordWindow').length>0){
                win = parent.$('#AmsCheckRecordWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'manage/amscheckrecord/edit/'+row.amsCheckRecordId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsCheckRecord.currentGrid = grid;
        $.AmsCheckRecord.actionType="copy";
        $.AmsCheckRecord.openEdit(grid,"复制一个新的",$.AmsCheckRecord.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的盘点记录表将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsCheckRecordId);
                    }
                    $.post(_appsite + 'manage/amscheckrecord/deletes', {
                        "amsCheckRecordIds" : ids
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
            grid = $('#AmsCheckRecordGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amscheckrecord/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsCheckRecordGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amscheckrecord/query";
                }
                var paras = $.AmsCheckRecordGrid.queryParams(grid);
                $.AmsCheckRecord.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsCheckRecordWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsCheckRecordWindow').length>0){
            win = parent.$('#AmsCheckRecordWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amscheckrecord/importExcel'+$.AmsCheckRecord.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "盘点记录表导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsCheckRecordIframeDom = $("#AmsCheckRecordIframeDomIfile");
            if(AmsCheckRecordIframeDom && AmsCheckRecordIframeDom.length==0){
                $("body").append("<iframe id='AmsCheckRecordIframeDomIfile' style='display:none'></iframe>");
                AmsCheckRecordIframeDom = $("#AmsCheckRecordIframeDomIfile");
            }
            AmsCheckRecordIframeDom.attr("src","");
            var url= _appsite+"manage/amscheckrecord/exportAuthAll?"+$.param($.AmsCheckRecordGrid.queryParams(grid));
            AmsCheckRecordIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    $("#AmsCheckRecordMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsCheckRecord_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsCheckRecordGrid').length>0){
        $('#AmsCheckRecordGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsCheckRecord",row)){
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
                    if ($.AmsCheckRecord.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsCheckRecord.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsCheckRecord.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsCheckRecord.selected){
                    $(this).datagrid("selectRow",$.AmsCheckRecord.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsCheckRecordId == $.AmsCheckRecord.selectRow){
                    return;
                }
                if ((!$.AmsCheckRecord.selectRow)&&$("#amsCheckRecord_master").length>0){
                    if ($("#amsCheckRecord_master").panel("options").region=="north"){
                        $("#amsCheckRecord_master").panel("resize",{height:300});
                    }else{
                        $("#amsCheckRecord_master").panel("resize",{width:400});
                    }
                }
                $.AmsCheckRecord.selectRow = row.amsCheckRecordId;

            },
            columns:$.AmsCheckRecordGrid.column

        });

    }

    $("#amsCheckRecord_ArchiveId").combogrid({
        onSelect : function(record) {
            $.AmsCheckRecord.onChange("archiveId",$("#amsCheckRecord_ArchiveId").combogrid('grid').datagrid('getSelected'));
        },
        onChange : function(newValue,oldValue) {
            if (null!=$("#amsCheckRecord_ArchiveId").combogrid('grid').datagrid('getSelected')){
                $.AmsCheckRecord.onChange("archiveId",$("#amsCheckRecord_ArchiveId").combogrid('grid').datagrid('getSelected'));
            }
        },
        onLoadSuccess : function(data){
            if (data.rows.length==1){
                $.AmsCheckRecord.onChange("archiveId",data.rows[0]);
            }
        }
    });
    $("#amsCheckRecord_RackId").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsCheckRecord.onChange("rackId",record);
            }
        }
    });

    $.AmsCheckRecord.init();
    document.body.style.visibility = 'visible';
})