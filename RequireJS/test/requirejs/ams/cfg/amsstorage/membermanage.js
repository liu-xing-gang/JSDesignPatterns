$.AmsStorage = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    AmsMovableRackAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsStorage_master").length>0){
            if ($("#amsStorage_master").panel("options").region=="north"){
                $("#amsStorage_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsStorage_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsStorage_HallName"))!=""){
            autoQuery = true;
            if ($("#amsStorage_HallName").length>0){
                $("#amsStorage_HallName").parent().hide();
            }
            grid = $('#AmsStorageGrid');
            if (grid.datagrid("getColumnOption","hallName")!=null){
                grid.datagrid("getColumnOption","hallName").hidden = true;
                if (grid.datagrid("getColumnOption","hallNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","hallNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsStorage_StorageName"))!=""){
            autoQuery = true;
            if ($("#amsStorage_StorageName").length>0){
                $("#amsStorage_StorageName").parent().hide();
            }
            grid = $('#AmsStorageGrid');
            if (grid.datagrid("getColumnOption","storageName")!=null){
                grid.datagrid("getColumnOption","storageName").hidden = true;
                if (grid.datagrid("getColumnOption","storageNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","storageNameShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsStorageGridPage').length>0){
            $.totemUtils.setHeight($('#AmsStorageGridPage'));
        }
        if (autoQuery){
            $.AmsStorage.search($('#AmsStorageGrid'));
        }

        if ($('#AmsMovableRackMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsMovableRackMemberGridPage'));
        }

        if ($('#AmsMovableRackMemberGrid').length>0){
            $('#AmsMovableRackMemberGrid').datagrid({
                columns:$.AmsMovableRackGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
    },
    setAuth : function(id){
        var items = $("#AmsMovableRackMemberActionItem").children();
        for (i=0;i<items.length;i++){
            $("#"+items[i].id).show();
        }
    },onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsStorage_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        return actionType;
    },
    create : function(grid) {
        $.AmsStorage.currentGrid = grid;
        $.AmsStorage.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsStorageWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsStorageWindow').length>0){
            win = parent.$('#AmsStorageWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsStorage.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsstorage/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增库房管理"
        });
    },
    edit : function(grid) {
        $.AmsStorage.actionType="edit";
        $.AmsStorage.openEdit(grid,"更新库房管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsStorage.actionType="view";
        $.AmsStorage.openEdit(grid,"查看库房管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsStorage.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个库房管理进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个库房管理进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsStorageWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsStorageWindow').length>0){
                win = parent.$('#AmsStorageWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'cfg/amsstorage/edit/'+row.storageId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsStorage.currentGrid = grid;
        $.AmsStorage.actionType="copy";
        $.AmsStorage.openEdit(grid,"复制一个新的",$.AmsStorage.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的库房管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].storageId);
                    }
                    $.post(_appsite + 'cfg/amsstorage/deletes', {
                        "storageIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员密集柜管理？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"cfg/amsmovablerack/deletes",{storageNames:ids},"json");
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
            grid = $('#AmsStorageGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsstorage/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsStorageGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsstorage/query";
                }
                var paras = $.AmsStorageGrid.queryParams(grid);
                $.AmsStorage.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsStorageWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsStorageWindow').length>0){
            win = parent.$('#AmsStorageWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsstorage/importExcel'+$.AmsStorage.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "库房管理导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsStorageIframeDom = $("#AmsStorageIframeDomIfile");
            if(AmsStorageIframeDom && AmsStorageIframeDom.length==0){
                $("body").append("<iframe id='AmsStorageIframeDomIfile' style='display:none'></iframe>");
                AmsStorageIframeDom = $("#AmsStorageIframeDomIfile");
            }
            AmsStorageIframeDom.attr("src","");
            var url= _appsite+"cfg/amsstorage/exportAuthAll?"+$.param($.AmsStorageGrid.queryParams(grid));
            AmsStorageIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsStorageMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsStorageMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsStorage_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsMovableRackFrame").length>0){
                tab = $('#AmsStorageMemberTabs').tabs('getTab',"密集柜管理");
                $("#AmsMovableRackFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsMovableRackFrame").contentWindow.$("#AmsMovableRackGridPage"));
            }
        }
    })
    if ($('#AmsStorageGrid').length>0){
        $('#AmsStorageGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsStorage",row)){
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
                    if ($.AmsStorage.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsStorage.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsStorage.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsStorage.selected){
                    $(this).datagrid("selectRow",$.AmsStorage.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.storageId == $.AmsStorage.selectRow){
                    return;
                }
                if ($('#AmsStorageMemberTabs').length>0){
                    if ($('#AmsStorageMemberTabs').tabs("tabs").length>1){
                        $('#AmsStorageMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsStorageMemberTabs').outerHeight();
                if ($('#AmsStorageMemberTabs').tabs('exists',"密集柜管理")){
                    var tab = $('#AmsStorageMemberTabs').tabs('getTab',"密集柜管理");
                    tab.css("height",height+3);
                    var para = "?storageName="+row.storageId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsStorageMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsmovablerack"+para,
                            id:"AmsMovableRack"
                        }
                    });
                }
                if ((!$.AmsStorage.selectRow)&&$("#amsStorage_master").length>0){
                    if ($("#amsStorage_master").panel("options").region=="north"){
                        $("#amsStorage_master").panel("resize",{height:300});
                    }else{
                        $("#amsStorage_master").panel("resize",{width:400});
                    }
                }
                $.AmsStorage.selectRow = row.storageId;

            },
            columns:$.AmsStorageGrid.column

        });

    }

    if ($("#AmsStorageMemberTabs").length>0){
        $("#AmsStorageMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsStorage.updateTab($('#AmsStorageMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsStorageMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsStorage.updateTab(tab);
                }
            }
        })
    }
    $.AmsStorage.init();
    document.body.style.visibility = 'visible';
})