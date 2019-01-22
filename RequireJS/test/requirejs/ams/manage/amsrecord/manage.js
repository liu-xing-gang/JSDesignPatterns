$.AmsRecord = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsuserType").length>0&&$("#amsuserType").val()!=""){
            autoQuery = true;
            if ($("#amsRecord_AmsuserType").length>0){
                $("#amsRecord_AmsuserType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRecord_AmsuserType"),$("#amsuserType").val());
            }
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            autoQuery = true;
            if ($("#amsRecord_SecretLevel").length>0){
                $("#amsRecord_SecretLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRecord_SecretLevel"),$("#secretLevel").val());
            }
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            autoQuery = true;
            if ($("#amsRecord_BoxNo").length>0){
                $("#amsRecord_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRecord_BoxNo"),$("#boxNo").val());
            }
        }
        if ($("#fileState").length>0&&$("#fileState").val()!=""){
            autoQuery = true;
            if ($("#amsRecord_FileState").length>0){
                $("#amsRecord_FileState").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRecord_FileState"),$("#fileState").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRecord_ApplicationNo"))!=""){
            autoQuery = true;
            if ($("#amsRecord_ApplicationNo").length>0){
                $("#amsRecord_ApplicationNo").parent().hide();
            }
            grid = $('#AmsRecordGrid');
            if (grid.datagrid("getColumnOption","applicationNo")!=null){
                grid.datagrid("getColumnOption","applicationNo").hidden = true;
                if (grid.datagrid("getColumnOption","applicationNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","applicationNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRecord_PowerUnit"))!=""){
            autoQuery = true;
            if ($("#amsRecord_PowerUnit").length>0){
                $("#amsRecord_PowerUnit").parent().hide();
            }
            grid = $('#AmsRecordGrid');
            if (grid.datagrid("getColumnOption","powerUnit")!=null){
                grid.datagrid("getColumnOption","powerUnit").hidden = true;
                if (grid.datagrid("getColumnOption","powerUnitShowLabel")!=null){
                    grid.datagrid("getColumnOption","powerUnitShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRecord_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsRecord_UserNo").length>0){
                $("#amsRecord_UserNo").parent().hide();
            }
            grid = $('#AmsRecordGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRecord_UserName"))!=""){
            autoQuery = true;
            if ($("#amsRecord_UserName").length>0){
                $("#amsRecord_UserName").parent().hide();
            }
            grid = $('#AmsRecordGrid');
            if (grid.datagrid("getColumnOption","userName")!=null){
                grid.datagrid("getColumnOption","userName").hidden = true;
                if (grid.datagrid("getColumnOption","userNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRecord_FileBar"))!=""){
            autoQuery = true;
            if ($("#amsRecord_FileBar").length>0){
                $("#amsRecord_FileBar").parent().hide();
            }
            grid = $('#AmsRecordGrid');
            if (grid.datagrid("getColumnOption","fileBar")!=null){
                grid.datagrid("getColumnOption","fileBar").hidden = true;
                if (grid.datagrid("getColumnOption","fileBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","fileBarShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsRecordGridPage').length>0){
            $.totemUtils.setHeight($('#AmsRecordGridPage'));
        }
        if (autoQuery){
            $.AmsRecord.search($('#AmsRecordGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsRecord_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#amsuserType").length>0&&$("#amsuserType").val()!=""){
            actionType += "&amsRecord_AmsuserType="+$("#amsuserType").val();
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            actionType += "&amsRecord_SecretLevel="+$("#secretLevel").val();
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsRecord_BoxNo="+$("#boxNo").val();
        }
        if ($("#fileState").length>0&&$("#fileState").val()!=""){
            actionType += "&amsRecord_FileState="+$("#fileState").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsRecord.currentGrid = grid;
        $.AmsRecord.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsRecordWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRecordWindow').length>0){
            win = parent.$('#AmsRecordWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsRecord.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrecord/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增用户档案入库"
        });
    },
    edit : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"更新用户档案入库","?actionType=edit");
    },
    archiveBorrow : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"借阅","?actionType=edit&&func=ArchiveBorrow");
    },
    pushPock : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"装袋","?actionType=edit&&func=PushPock");
    },
    pushBox : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"装盒","?actionType=edit&&func=PushBox");
    },
    breakUpPock : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"打散袋","?actionType=edit&&func=BreakUpPock");
    },
    breakUpBox : function(grid) {
        $.AmsRecord.actionType="edit";
        $.AmsRecord.openEdit(grid,"打散盒","?actionType=edit&&func=BreakUpBox");
    },
    view : function(grid) {
        $.AmsRecord.actionType="view";
        $.AmsRecord.openEdit(grid,"查看用户档案入库","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsRecord.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个用户档案入库进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个用户档案入库进行'+title});
                return;
            }
            id = rows[0].amsLowrecordinId
        }else{
            id = "null";
        }
        var win = $('#AmsRecordWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRecordWindow').length>0){
            win = parent.$('#AmsRecordWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrecord/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsRecord.currentGrid = grid;
        }
        var win = $('#AmsRecordWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRecordWindow').length>0){
            win = parent.$('#AmsRecordWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrecord/importExcel'+$.AmsRecord.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "用户档案入库导入"
        });
    },
    copy : function(grid) {
        $.AmsRecord.currentGrid = grid;
        $.AmsRecord.actionType="copy";
        $.AmsRecord.openEdit(grid,"复制一个新的",$.AmsRecord.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的用户档案入库将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsLowrecordinId);
                    }
                    $.post(_appsite + 'manage/amsrecord/deletes', {
                        "amsLowrecordinIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员档案业务？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"cfg/amsbusiness/deletes",{userNos:ids},"json");
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
        var paras = $.AmsRecordGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsRecordGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsrecord/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsrecord/query";
                }
                $.AmsRecord.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsRecordIframeDom = $("#AmsRecordIframeDomIfile");
            if(AmsRecordIframeDom && AmsRecordIframeDom.length==0){
                $("body").append("<iframe id='AmsRecordIframeDomIfile' style='display:none'></iframe>");
                AmsRecordIframeDom = $("#AmsRecordIframeDomIfile");
            }
            AmsRecordIframeDom.attr("src","");
            var url= _appsite+"manage/amsrecord/exportAuthAll?"+$.param($.AmsRecordGrid.queryParams(grid));
            AmsRecordIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsRecordGrid').length>0){
        $('#AmsRecordGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsRecord.selected){
                    $(this).datagrid("selectRow",$.AmsRecord.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsRecord",row)){
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
                    if ($.AmsRecord.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsRecord.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsRecord.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsLowrecordinId == $.AmsRecord.selectRow){
                    return;
                }
                if ((!$.AmsRecord.selectRow)&&$("#amsRecord_master").length>0){
                    if ($("#amsRecord_master").panel("options").region=="north"){
                        $("#amsRecord_master").panel("resize",{height:300});
                    }else{
                        $("#amsRecord_master").panel("resize",{width:400});
                    }
                }
                $.AmsRecord.selectRow = row.amsLowrecordinId;

            },
            columns:$.AmsRecordGrid.column

        });

    }

    if ($('#AmsRecordWindow').length>0){
        $('#AmsRecordWindow').window({
            closed:true,
            onClose:function () {
                $.AmsRecord.search($("#AmsRecordGrid"));
            }
        })
    }
    $.AmsRecord.init();
    document.body.style.visibility = 'visible';
})