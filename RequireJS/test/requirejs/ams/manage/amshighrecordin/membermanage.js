$.AmsHighrecordin = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsHighrecordin_master").length>0){
            if ($("#amsHighrecordin_master").panel("options").region=="north"){
                $("#amsHighrecordin_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsHighrecordin_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_BoxNo").length>0){
                $("#amsHighrecordin_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsHighrecordin_BoxNo"),$("#boxNo").val());
            }
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_BusinessNo").length>0){
                $("#amsHighrecordin_BusinessNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsHighrecordin_BusinessNo"),$("#businessNo").val());
            }
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_SecretLevel").length>0){
                $("#amsHighrecordin_SecretLevel").parent().hide();
                $.totemUtils.setPropertyValue($("#amsHighrecordin_SecretLevel"),$("#secretLevel").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsHighrecordin_ApplicationNo"))!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_ApplicationNo").length>0){
                $("#amsHighrecordin_ApplicationNo").parent().hide();
            }
            grid = $('#AmsHighrecordinGrid');
            if (grid.datagrid("getColumnOption","applicationNo")!=null){
                grid.datagrid("getColumnOption","applicationNo").hidden = true;
                if (grid.datagrid("getColumnOption","applicationNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","applicationNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsHighrecordin_PowerUnit"))!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_PowerUnit").length>0){
                $("#amsHighrecordin_PowerUnit").parent().hide();
            }
            grid = $('#AmsHighrecordinGrid');
            if (grid.datagrid("getColumnOption","powerUnit")!=null){
                grid.datagrid("getColumnOption","powerUnit").hidden = true;
                if (grid.datagrid("getColumnOption","powerUnitShowLabel")!=null){
                    grid.datagrid("getColumnOption","powerUnitShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsHighrecordin_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_UserNo").length>0){
                $("#amsHighrecordin_UserNo").parent().hide();
            }
            grid = $('#AmsHighrecordinGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsHighrecordin_UserName"))!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_UserName").length>0){
                $("#amsHighrecordin_UserName").parent().hide();
            }
            grid = $('#AmsHighrecordinGrid');
            if (grid.datagrid("getColumnOption","userName")!=null){
                grid.datagrid("getColumnOption","userName").hidden = true;
                if (grid.datagrid("getColumnOption","userNameShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNameShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsHighrecordin_FileBar"))!=""){
            autoQuery = true;
            if ($("#amsHighrecordin_FileBar").length>0){
                $("#amsHighrecordin_FileBar").parent().hide();
            }
            grid = $('#AmsHighrecordinGrid');
            if (grid.datagrid("getColumnOption","fileBar")!=null){
                grid.datagrid("getColumnOption","fileBar").hidden = true;
                if (grid.datagrid("getColumnOption","fileBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","fileBarShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsHighrecordinGridPage').length>0){
            $.totemUtils.setHeight($('#AmsHighrecordinGridPage'));
        }
        if (autoQuery){
            $.AmsHighrecordin.search($('#AmsHighrecordinGrid'));
        }

    },
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsHighrecordin_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsHighrecordin_BoxNo="+$("#boxNo").val();
        }
        if ($("#businessNo").length>0&&$("#businessNo").val()!=""){
            actionType += "&amsHighrecordin_BusinessNo="+$("#businessNo").val();
        }
        if ($("#secretLevel").length>0&&$("#secretLevel").val()!=""){
            actionType += "&amsHighrecordin_SecretLevel="+$("#secretLevel").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsHighrecordin.currentGrid = grid;
        $.AmsHighrecordin.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsHighrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsHighrecordinWindow').length>0){
            win = parent.$('#AmsHighrecordinWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsHighrecordin.getPara("?actionType=create");
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amshighrecordin/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增高压档案入库"
        });
    },
    edit : function(grid) {
        $.AmsHighrecordin.actionType="edit";
        $.AmsHighrecordin.openEdit(grid,"更新高压档案入库","?actionType=edit");
    },
    pushBox : function(grid) {
        $.AmsHighrecordin.actionType="edit";
        $.AmsHighrecordin.openEdit(grid,"装盒","?actionType=edit&&func=PushBox");
    },
    doneBusiness : function(grid) {
        $.AmsHighrecordin.actionType="view";
        $.AmsHighrecordin.openEdit(grid,"已办业务","?actionType=view&&func=DoneBusiness");
    },
    view : function(grid) {
        $.AmsHighrecordin.actionType="view";
        $.AmsHighrecordin.openEdit(grid,"查看高压档案入库","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsHighrecordin.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个高压档案入库进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个高压档案入库进行'+title});
                return;
            }
            id = rows[0].amsHighrecordinId
        }else{
            id = "null";
        }
        var win = $('#AmsHighrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsHighrecordinWindow').length>0){
            win = parent.$('#AmsHighrecordinWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amshighrecordin/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsHighrecordinWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsHighrecordinWindow').length>0){
            win = parent.$('#AmsHighrecordinWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amshighrecordin/importExcel'+$.AmsHighrecordin.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "高压档案入库导入"
        });
    },
    copy : function(grid) {
        $.AmsHighrecordin.currentGrid = grid;
        $.AmsHighrecordin.actionType="copy";
        $.AmsHighrecordin.openEdit(grid,"复制一个新的",$.AmsHighrecordin.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的高压档案入库将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsHighrecordinId);
                    }
                    $.post(_appsite + 'manage/amshighrecordin/deletes', {
                        "amsHighrecordinIds" : ids
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
        var paras = $.AmsHighrecordinGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsHighrecordinGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amshighrecordin/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amshighrecordin/query";
                }
                $.AmsHighrecordin.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsHighrecordinIframeDom = $("#AmsHighrecordinIframeDomIfile");
            if(AmsHighrecordinIframeDom && AmsHighrecordinIframeDom.length==0){
                $("body").append("<iframe id='AmsHighrecordinIframeDomIfile' style='display:none'></iframe>");
                AmsHighrecordinIframeDom = $("#AmsHighrecordinIframeDomIfile");
            }
            AmsHighrecordinIframeDom.attr("src","");
            var url= _appsite+"manage/amshighrecordin/exportAuthAll?"+$.param($.AmsHighrecordinGrid.queryParams(grid));
            AmsHighrecordinIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsHighrecordinMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsHighrecordinMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsHighrecordin_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
        }
    })
    if ($('#AmsHighrecordinGrid').length>0){
        $('#AmsHighrecordinGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsHighrecordin.selected){
                    $(this).datagrid("selectRow",$.AmsHighrecordin.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsHighrecordin",row)){
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
                    if ($.AmsHighrecordin.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsHighrecordin.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsHighrecordin.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsHighrecordinId == $.AmsHighrecordin.selectRow){
                    return;
                }
                if ($('#AmsHighrecordinMemberTabs').length>0){
                    if ($('#AmsHighrecordinMemberTabs').tabs("tabs").length>1){
                        $('#AmsHighrecordinMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsHighrecordinMemberTabs').outerHeight() - 30;
                if ((!$.AmsHighrecordin.selectRow)&&$("#amsHighrecordin_master").length>0){
                    if ($("#amsHighrecordin_master").panel("options").region=="north"){
                        $("#amsHighrecordin_master").panel("resize",{height:300});
                    }else{
                        $("#amsHighrecordin_master").panel("resize",{width:400});
                    }
                }
                $.AmsHighrecordin.selectRow = row.amsHighrecordinId;

            },
            columns:$.AmsHighrecordinGrid.column

        });

    }

    if ($("#AmsHighrecordinMemberTabs").length>0){
        $("#AmsHighrecordinMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsHighrecordin.updateTab($('#AmsHighrecordinMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsHighrecordinMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsHighrecordin.updateTab(tab);
                }
            }
        })
    }
    $.AmsHighrecordin.init();
    document.body.style.visibility = 'visible';
})