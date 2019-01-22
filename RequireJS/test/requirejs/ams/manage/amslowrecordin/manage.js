$.AmsLowrecordin = {
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
            if ($("#amsLowrecordin_BoxNo").length>0){
                $("#amsLowrecordin_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLowrecordin_BoxNo"),$("#boxNo").val());
            }
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_BusinessNo").length>0){
                $("#amsLowrecordin_BusinessNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLowrecordin_BusinessNo"),$("#businessNo").val());
            }
        }
        if ($("#userType").length>0&&$("#userType").val()!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_UserType").length>0){
                $("#amsLowrecordin_UserType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLowrecordin_UserType"),$("#userType").val());
            }
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_SecretLevel").length>0){
                $("#amsLowrecordin_SecretLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsLowrecordin_SecretLevel"),$("#secretLevel").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLowrecordin_ApplicationNo"))!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_ApplicationNo").length>0){
                $("#amsLowrecordin_ApplicationNo").parent().hide();
            }
            grid = $('#AmsLowrecordinGrid');
            if (grid.datagrid("getColumnOption","applicationNo")!=null){
                grid.datagrid("getColumnOption","applicationNo").hidden = true;
                if (grid.datagrid("getColumnOption","applicationNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","applicationNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLowrecordin_PowerUnit"))!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_PowerUnit").length>0){
                $("#amsLowrecordin_PowerUnit").parent().hide();
            }
            grid = $('#AmsLowrecordinGrid');
            if (grid.datagrid("getColumnOption","powerUnit")!=null){
                grid.datagrid("getColumnOption","powerUnit").hidden = true;
                if (grid.datagrid("getColumnOption","powerUnitShowLabel")!=null){
                    grid.datagrid("getColumnOption","powerUnitShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLowrecordin_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_UserNo").length>0){
                $("#amsLowrecordin_UserNo").parent().hide();
            }
            grid = $('#AmsLowrecordinGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLowrecordin_UserName"))!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_UserName").length>0){
                $("#amsLowrecordin_UserName").parent().hide();
            }
            grid = $('#AmsLowrecordinGrid');
            if (grid.datagrid("getColumnOption","userName")!=null){
                grid.datagrid("getColumnOption","userName").hidden = true;
                if (grid.datagrid("getColumnOption","userNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsLowrecordin_FileBar"))!=""){
            autoQuery = true;
            if ($("#amsLowrecordin_FileBar").length>0){
                $("#amsLowrecordin_FileBar").parent().hide();
            }
            grid = $('#AmsLowrecordinGrid');
            if (grid.datagrid("getColumnOption","fileBar")!=null){
                grid.datagrid("getColumnOption","fileBar").hidden = true;
                if (grid.datagrid("getColumnOption","fileBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","fileBarShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsLowrecordinGridPage').length>0){
            $.totemUtils.setHeight($('#AmsLowrecordinGridPage'));
        }
        if (autoQuery){
            $.AmsLowrecordin.search($('#AmsLowrecordinGrid'));
        }

        $("#AmsLowrecordinForm #userType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('LOW_USER_TYPE')
        });

        $("#AmsLowrecordinForm #secretLevel").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('secrecy_level')
        });

    },

    getPara : function(actionType){
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsLowrecordin_BoxNo="+$("#boxNo").val();
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            actionType += "&amsLowrecordin_BusinessNo="+$("#businessNo").val();
        }
        if ($("#userType").length>0&&$("#userType").val()!=""){
            actionType += "&amsLowrecordin_UserType="+$("#userType").val();
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            actionType += "&amsLowrecordin_SecretLevel="+$("#secretLevel").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsLowrecordin.currentGrid = grid;
        $.AmsLowrecordin.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsLowrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsLowrecordinWindow').length>0){
            win = parent.$('#AmsLowrecordinWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsLowrecordin.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amslowrecordin/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增低压档案入库"
        });
    },
    edit : function(grid) {
        $.AmsLowrecordin.actionType="edit";
        $.AmsLowrecordin.openEdit(grid,"更新低压档案入库","?actionType=edit");
    },
    pushPock : function(grid) {
        $.AmsLowrecordin.actionType="edit";
        $.AmsLowrecordin.openEdit(grid,"装袋","?actionType=edit&&func=PushPock");
    },
    doneBusiness : function(grid) {
        $.AmsLowrecordin.actionType="view";
        $.AmsLowrecordin.openEdit(grid,"已办业务","?actionType=view&&func=DoneBusiness");
    },
    view : function(grid) {
        $.AmsLowrecordin.actionType="view";
        $.AmsLowrecordin.openEdit(grid,"查看低压档案入库","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsLowrecordin.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个低压档案入库进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个低压档案入库进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsLowrecordinWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsLowrecordinWindow').length>0){
                win = parent.$('#AmsLowrecordinWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'manage/amslowrecordin/edit/'+row.amsLowrecordinId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsLowrecordin.currentGrid = grid;
        $.AmsLowrecordin.actionType="copy";
        $.AmsLowrecordin.openEdit(grid,"复制一个新的",$.AmsLowrecordin.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的低压档案入库将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsLowrecordinId);
                    }
                    $.post(_appsite + 'manage/amslowrecordin/deletes', {
                        "amsLowrecordinIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员档案业务？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"cfg/amsbusioness/deletes",{amsBussionessIds:ids},"json");
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
            grid = $('#AmsLowrecordinGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amslowrecordin/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsLowrecordinGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amslowrecordin/query";
                }
                var paras = $.AmsLowrecordinGrid.queryParams(grid);
                $.AmsLowrecordin.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsLowrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsLowrecordinWindow').length>0){
            win = parent.$('#AmsLowrecordinWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amslowrecordin/importExcel'+$.AmsLowrecordin.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "低压档案入库导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsLowrecordinIframeDom = $("#AmsLowrecordinIframeDomIfile");
            if(AmsLowrecordinIframeDom && AmsLowrecordinIframeDom.length==0){
                $("body").append("<iframe id='AmsLowrecordinIframeDomIfile' style='display:none'></iframe>");
                AmsLowrecordinIframeDom = $("#AmsLowrecordinIframeDomIfile");
            }
            AmsLowrecordinIframeDom.attr("src","");
            var url= _appsite+"manage/amslowrecordin/exportAuthAll?"+$.param($.AmsLowrecordinGrid.queryParams(grid));
            AmsLowrecordinIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsLowrecordin_"+parent,data)){
                return;
            }
        }
    }
}

$(function() {
    if ($('#AmsLowrecordinGrid').length>0){
        $('#AmsLowrecordinGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsLowrecordin",row)){
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
                    if ($.AmsLowrecordin.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsLowrecordin.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsLowrecordin.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsLowrecordin.selected){
                    $(this).datagrid("selectRow",$.AmsLowrecordin.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsLowrecordinId == $.AmsLowrecordin.selectRow){
                    return;
                }
                if ((!$.AmsLowrecordin.selectRow)&&$("#amsLowrecordin_master").length>0){
                    if ($("#amsLowrecordin_master").panel("options").region=="north"){
                        $("#amsLowrecordin_master").panel("resize",{height:300});
                    }else{
                        $("#amsLowrecordin_master").panel("resize",{width:400});
                    }
                }
                $.AmsLowrecordin.selectRow = row.amsLowrecordinId;

            },
            columns:$.AmsLowrecordinGrid.column

        });

    }

    $.AmsLowrecordin.init();
    document.body.style.visibility = 'visible';
})