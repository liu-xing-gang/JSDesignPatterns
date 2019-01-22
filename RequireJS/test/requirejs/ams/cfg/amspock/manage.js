$.AmsPock = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#boxState").length>0&&$("#boxState").val()!=""){
            autoQuery = true;
            if ($("#amsPock_BoxState").length>0){
                $("#amsPock_BoxState").parent().hide();
                $.totemUtils.setPropertyValue($("#amsPock_BoxState"),$("#boxState").val());
            }
        }
        if ($("#libNo").length>0&&$("#libNo").val()!=""){
            autoQuery = true;
            if ($("#amsPock_LibNo").length>0){
                $("#amsPock_LibNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsPock_LibNo"),$("#libNo").val());
            }
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            autoQuery = true;
            if ($("#amsPock_BoxNo").length>0){
                $("#amsPock_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsPock_BoxNo"),$("#boxNo").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsPock_Rfid"))!=""){
            autoQuery = true;
            if ($("#amsPock_Rfid").length>0){
                $("#amsPock_Rfid").parent().hide();
            }
            grid = $('#AmsPockGrid');
            if (grid.datagrid("getColumnOption","rfid")!=null){
                grid.datagrid("getColumnOption","rfid").hidden = true;
                if (grid.datagrid("getColumnOption","rfidShowLabel")!=null){
                    grid.datagrid("getColumnOption","rfidShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsPock_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsPock_UserNo").length>0){
                $("#amsPock_UserNo").parent().hide();
            }
            grid = $('#AmsPockGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsPock_BoxBar"))!=""){
            autoQuery = true;
            if ($("#amsPock_BoxBar").length>0){
                $("#amsPock_BoxBar").parent().hide();
            }
            grid = $('#AmsPockGrid');
            if (grid.datagrid("getColumnOption","boxBar")!=null){
                grid.datagrid("getColumnOption","boxBar").hidden = true;
                if (grid.datagrid("getColumnOption","boxBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","boxBarShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsPock_PockNo"))!=""){
            autoQuery = true;
            if ($("#amsPock_PockNo").length>0){
                $("#amsPock_PockNo").parent().hide();
            }
            grid = $('#AmsPockGrid');
            if (grid.datagrid("getColumnOption","pockNo")!=null){
                grid.datagrid("getColumnOption","pockNo").hidden = true;
                if (grid.datagrid("getColumnOption","pockNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","pockNoShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsPockGridPage').length>0){
            $.totemUtils.setHeight($('#AmsPockGridPage'));
        }
        if (autoQuery){
            $.AmsPock.search($('#AmsPockGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsPock_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#boxState").length>0&&$("#boxState").val()!=""){
            actionType += "&amsPock_BoxState="+$("#boxState").val();
        }
        if ($("#libNo").length>0&&$("#libNo").val()!=""){
            actionType += "&amsPock_LibNo="+$("#libNo").val();
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsPock_BoxNo="+$("#boxNo").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsPock.currentGrid = grid;
        $.AmsPock.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsPockWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsPockWindow').length>0){
            win = parent.$('#AmsPockWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsPock.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amspock/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案袋信息"
        });
    },
    edit : function(grid) {
        $.AmsPock.actionType="edit";
        $.AmsPock.openEdit(grid,"更新档案袋信息","?actionType=edit");
    },
    pushBox : function(grid) {
        $.AmsPock.actionType="edit";
        $.AmsPock.openEdit(grid,"装盒","?actionType=edit&&func=PushBox");
    },
    breakUpBox : function(grid) {
        $.AmsPock.actionType="edit";
        $.AmsPock.openEdit(grid,"打散盒","?actionType=edit&&func=BreakUpBox");
    },
    view : function(grid) {
        $.AmsPock.actionType="view";
        $.AmsPock.openEdit(grid,"查看档案袋信息","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsPock.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案袋信息进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案袋信息进行'+title});
                return;
            }
            id = rows[0].amsHighrecordinId
        }else{
            id = "null";
        }
        var win = $('#AmsPockWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsPockWindow').length>0){
            win = parent.$('#AmsPockWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amspock/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsPockWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsPockWindow').length>0){
            win = parent.$('#AmsPockWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amspock/importExcel'+$.AmsPock.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案袋信息导入"
        });
    },
    copy : function(grid) {
        $.AmsPock.currentGrid = grid;
        $.AmsPock.actionType="copy";
        $.AmsPock.openEdit(grid,"复制一个新的",$.AmsPock.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案袋信息将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsHighrecordinId);
                    }
                    $.post(_appsite + 'cfg/amspock/deletes', {
                        "amsHighrecordinIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员低压档案入库？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"manage/amslowrecordin/deletes",{boxNos:ids},"json");
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
        var paras = $.AmsPockGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsPockGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amspock/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amspock/query";
                }
                $.AmsPock.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsPockIframeDom = $("#AmsPockIframeDomIfile");
            if(AmsPockIframeDom && AmsPockIframeDom.length==0){
                $("body").append("<iframe id='AmsPockIframeDomIfile' style='display:none'></iframe>");
                AmsPockIframeDom = $("#AmsPockIframeDomIfile");
            }
            AmsPockIframeDom.attr("src","");
            var url= _appsite+"cfg/amspock/exportAuthAll?"+$.param($.AmsPockGrid.queryParams(grid));
            AmsPockIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){}

}

$(function() {
    if ($('#AmsPockGrid').length>0){
        $('#AmsPockGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsPock.selected){
                    $(this).datagrid("selectRow",$.AmsPock.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsPock",row)){
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
                    if ($.AmsPock.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsPock.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsPock.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsHighrecordinId == $.AmsPock.selectRow){
                    return;
                }
                if ((!$.AmsPock.selectRow)&&$("#amsPock_master").length>0){
                    if ($("#amsPock_master").panel("options").region=="north"){
                        $("#amsPock_master").panel("resize",{height:300});
                    }else{
                        $("#amsPock_master").panel("resize",{width:400});
                    }
                }
                $.AmsPock.selectRow = row.amsHighrecordinId;

            },
            columns:$.AmsPockGrid.column

        });

    }

    $.AmsPock.init();
    document.body.style.visibility = 'visible';
})