$.AmsBusioness = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:undefined,
    authRow : undefined,
    AmsFileContentAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsBusioness_master").length>0){
            if ($("#amsBusioness_master").panel("options").region=="north"){
                $("#amsBusioness_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsBusioness_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#userNo").length>0&&$("#userNo").val()!=""){
            autoQuery = true;
            if ($("#amsBusioness_UserNo").length>0){
                $("#amsBusioness_UserNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBusioness_UserNo"),$("#userNo").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBusioness_BusinessType"))!=""){
            autoQuery = true;
            if ($("#amsBusioness_BusinessType").length>0){
                $("#amsBusioness_BusinessType").parent().hide();
            }
            grid = $('#AmsBusionessGrid');
            if (grid.datagrid("getColumnOption","businessType")!=null){
                grid.datagrid("getColumnOption","businessType").hidden = true;
                if (grid.datagrid("getColumnOption","businessTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","businessTypeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBusionessGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBusionessGridPage'));
        }
        if (autoQuery){
            $.AmsBusioness.search($('#AmsBusionessGrid'));
        }

        if ($('#AmsFileContentMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFileContentMemberGridPage'));
        }

        if ($('#AmsFileContentMemberGrid').length>0){
            $('#AmsFileContentMemberGrid').datagrid({
                columns:$.AmsFileContentGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
    },
    setAuth : function(id){
        var items = $("#AmsFileContentMemberActionItem").children();
        for (i=0;i<items.length;i++){
            $("#"+items[i].id).show();
        }
    },onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsBusioness_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#userNo").length>0&&$("#userNo").val()!=""){
            actionType += "&amsBusioness_UserNo="+$("#userNo").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBusioness.currentGrid = grid;
        $.AmsBusioness.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBusionessWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBusionessWindow').length>0){
            win = parent.$('#AmsBusionessWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBusioness.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbusioness/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案业务"
        });
    },
    edit : function(grid) {
        $.AmsBusioness.actionType="edit";
        $.AmsBusioness.openEdit(grid,"更新档案业务","?actionType=edit");
    },
    fileContent : function(grid) {
        $.AmsBusioness.actionType="edit";
        $.AmsBusioness.openEdit(grid,"查看原文","?actionType=edit&&func=FileContent");
    },
    view : function(grid) {
        $.AmsBusioness.actionType="view";
        $.AmsBusioness.openEdit(grid,"查看档案业务","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        $.AmsBusioness.currentGrid = grid;
        parent.currentGrid=grid;
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>1){
            $.messager.show({title : '信息提示',msg : '只能选择一个档案业务进行'+title});
            return;
        }
        if (rows.length==0){
            $.messager.show({title : '信息提示',msg : '请选择一个档案业务进行'+title});
            return;
        }
        var row = rows[0];
        if (row) {
            var win = $('#AmsBusionessWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsBusionessWindow').length>0){
                win = parent.$('#AmsBusionessWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'cfg/amsbusioness/edit/'+row.amsBussionessId+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: title
            });
        }

    },
    copy : function(grid) {
        $.AmsBusioness.currentGrid = grid;
        $.AmsBusioness.actionType="copy";
        $.AmsBusioness.openEdit(grid,"复制一个新的",$.AmsBusioness.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案业务将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsBussionessId);
                    }
                    $.post(_appsite + 'cfg/amsbusioness/deletes', {
                        "amsBussionessIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员档案原文？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"cfg/amsfilecontent/deletes",{businessNos:ids},"json");
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
            grid = $('#AmsBusionessGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbusioness/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : $.AmsBusionessGrid.queryParams(grid)
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbusioness/query";
                }
                var paras = $.AmsBusionessGrid.queryParams(grid);
                $.AmsBusioness.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }

    },importExcel:function(grid){
        var win = $('#AmsBusionessWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBusionessWindow').length>0){
            win = parent.$('#AmsBusionessWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbusioness/importExcel'+$.AmsBusioness.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案业务导入"
        });
    },exportExcel:function(grid){
        if(grid){
            var AmsBusionessIframeDom = $("#AmsBusionessIframeDomIfile");
            if(AmsBusionessIframeDom && AmsBusionessIframeDom.length==0){
                $("body").append("<iframe id='AmsBusionessIframeDomIfile' style='display:none'></iframe>");
                AmsBusionessIframeDom = $("#AmsBusionessIframeDomIfile");
            }
            AmsBusionessIframeDom.attr("src","");
            var url= _appsite+"cfg/amsbusioness/exportAuthAll?"+$.param($.AmsBusionessGrid.queryParams(grid));
            AmsBusionessIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsBusionessMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsBusionessMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsBusioness_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsFileContentFrame").length>0){
                tab = $('#AmsBusionessMemberTabs').tabs('getTab',"档案原文");
                $("#AmsFileContentFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsFileContentFrame").contentWindow.$("#AmsFileContentGridPage"));
            }
        }
    })
    if ($('#AmsBusionessGrid').length>0){
        $('#AmsBusionessGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsBusioness",row)){
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
                    if ($.AmsBusioness.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBusioness.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBusioness.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                if($.AmsBusioness.selected){
                    $(this).datagrid("selectRow",$.AmsBusioness.selected);
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsBussionessId == $.AmsBusioness.selectRow){
                    return;
                }
                if ($('#AmsBusionessMemberTabs').length>0){
                    if ($('#AmsBusionessMemberTabs').tabs("tabs").length>1){
                        $('#AmsBusionessMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsBusionessMemberTabs').outerHeight();
                if ($('#AmsBusionessMemberTabs').tabs('exists',"档案原文")){
                    var tab = $('#AmsBusionessMemberTabs').tabs('getTab',"档案原文");
                    tab.css("height",height+3);
                    var para = "?businessNo="+row.amsBussionessId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsBusionessMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsfilecontent"+para,
                            id:"AmsFileContent"
                        }
                    });
                }
                if ((!$.AmsBusioness.selectRow)&&$("#amsBusioness_master").length>0){
                    if ($("#amsBusioness_master").panel("options").region=="north"){
                        $("#amsBusioness_master").panel("resize",{height:300});
                    }else{
                        $("#amsBusioness_master").panel("resize",{width:400});
                    }
                }
                $.AmsBusioness.selectRow = row.amsBussionessId;

            },
            columns:$.AmsBusionessGrid.column

        });

    }

    if ($("#AmsBusionessMemberTabs").length>0){
        $("#AmsBusionessMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsBusioness.updateTab($('#AmsBusionessMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsBusionessMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsBusioness.updateTab(tab);
                }
            }
        })
    }
    $.AmsBusioness.init();
    document.body.style.visibility = 'visible';
})