$.AmsBusiness = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    AmsFileContentAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsBusiness_master").length>0){
            if ($("#amsBusiness_master").panel("options").region=="north"){
                $("#amsBusiness_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsBusiness_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#userNo").length>0&&$("#userNo").val()!=""){
            autoQuery = true;
            if ($("#amsBusiness_UserNo").length>0){
                $("#amsBusiness_UserNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBusiness_UserNo"),$("#userNo").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBusiness_BusinessData"))!=""){
            autoQuery = true;
            if ($("#amsBusiness_BusinessData").length>0){
                $("#amsBusiness_BusinessData").parent().hide();
            }
            grid = $('#AmsBusinessGrid');
            if (grid.datagrid("getColumnOption","businessData")!=null){
                grid.datagrid("getColumnOption","businessData").hidden = true;
                if (grid.datagrid("getColumnOption","businessDataShowLabel")!=null){
                    grid.datagrid("getColumnOption","businessDataShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBusiness_BusinessType"))!=""){
            autoQuery = true;
            if ($("#amsBusiness_BusinessType").length>0){
                $("#amsBusiness_BusinessType").parent().hide();
            }
            grid = $('#AmsBusinessGrid');
            if (grid.datagrid("getColumnOption","businessType")!=null){
                grid.datagrid("getColumnOption","businessType").hidden = true;
                if (grid.datagrid("getColumnOption","businessTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","businessTypeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBusinessGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBusinessGridPage'));
        }
        if (autoQuery){
            $.AmsBusiness.search($('#AmsBusinessGrid'));
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
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsBusiness_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#userNo").length>0&&$("#userNo").val()!=""){
            actionType += "&amsBusiness_UserNo="+$("#userNo").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBusiness.currentGrid = grid;
        $.AmsBusiness.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBusinessWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBusinessWindow').length>0){
            win = parent.$('#AmsBusinessWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBusiness.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbusiness/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案业务"
        });
    },
    edit : function(grid) {
        $.AmsBusiness.actionType="edit";
        $.AmsBusiness.openEdit(grid,"更新档案业务","?actionType=edit");
    },
    fileContent : function(grid) {
        $.AmsBusiness.actionType="edit";
        $.AmsBusiness.openEdit(grid,"查看原文","?actionType=edit&&func=FileContent");
    },
    view : function(grid) {
        $.AmsBusiness.actionType="view";
        $.AmsBusiness.openEdit(grid,"查看档案业务","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsBusiness.currentGrid = grid;
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
            id = rows[0].amsBussionessId
        }else{
            id = "null";
        }
        var win = $('#AmsBusinessWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBusinessWindow').length>0){
            win = parent.$('#AmsBusinessWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbusiness/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsBusiness.currentGrid = grid;
        }
        var win = $('#AmsBusinessWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBusinessWindow').length>0){
            win = parent.$('#AmsBusinessWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbusiness/importExcel'+$.AmsBusiness.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案业务导入"
        });
    },
    copy : function(grid) {
        $.AmsBusiness.currentGrid = grid;
        $.AmsBusiness.actionType="copy";
        $.AmsBusiness.openEdit(grid,"复制一个新的",$.AmsBusiness.getPara("?actionType=copy"));
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
                    $.post(_appsite + 'cfg/amsbusiness/deletes', {
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
            if ($.AmsBusiness.currentGrid){
                grid = $.AmsBusiness.currentGrid;
            }else if($('#AmsBusinessGrid').length>0){
                grid = $('#AmsBusinessGrid');
                $.AmsBusiness.currentGrid = grid;
            }
        }
        var paras = $.AmsBusinessGrid.queryParams(grid);
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbusiness/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbusiness/query";
                }
                $.AmsBusiness.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsBusinessIframeDom = $("#AmsBusinessIframeDomIfile");
            if(AmsBusinessIframeDom && AmsBusinessIframeDom.length==0){
                $("body").append("<iframe id='AmsBusinessIframeDomIfile' style='display:none'></iframe>");
                AmsBusinessIframeDom = $("#AmsBusinessIframeDomIfile");
            }
            AmsBusinessIframeDom.attr("src","");
            var url= _appsite+"cfg/amsbusiness/exportAuthAll?"+$.param($.AmsBusinessGrid.queryParams(grid));
            AmsBusinessIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsBusinessMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsBusinessMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsBusiness_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsFileContentFrame").length>0){
                tab = $('#AmsBusinessMemberTabs').tabs('getTab',"档案原文");
                $("#AmsFileContentFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsFileContentFrame").contentWindow.$("#AmsFileContentGridPage"));
            }
        }
    })
    if ($('#AmsBusinessGrid').length>0){
        $('#AmsBusinessGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsBusiness.selected){
                    $(this).datagrid("selectRow",$.AmsBusiness.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsBusiness",row)){
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
                    if ($.AmsBusiness.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBusiness.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBusiness.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsBussionessId == $.AmsBusiness.selectRow){
                    return;
                }
                if ($('#AmsBusinessMemberTabs').length>0){
                    if ($('#AmsBusinessMemberTabs').tabs("tabs").length>1){
                        $('#AmsBusinessMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsBusinessMemberTabs').outerHeight();
                if ($('#AmsBusinessMemberTabs').tabs('exists',"档案原文")){
                    var tab = $('#AmsBusinessMemberTabs').tabs('getTab',"档案原文");
                    tab.css("height",height+3);
                    var para = "?businessNo="+row.amsBussionessId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsBusinessMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsfilecontent"+para,
                            id:"AmsFileContent"
                        }
                    });
                }
                if ((!$.AmsBusiness.selectRow)&&$("#amsBusiness_master").length>0){
                    if ($("#amsBusiness_master").panel("options").region=="north"){
                        $("#amsBusiness_master").panel("resize",{height:300});
                    }else{
                        $("#amsBusiness_master").panel("resize",{width:400});
                    }
                }
                $.AmsBusiness.selectRow = row.amsBussionessId;

            },
            columns:$.AmsBusinessGrid.column

        });

    }

    if ($("#AmsBusinessMemberTabs").length>0){
        $("#AmsBusinessMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsBusiness.updateTab($('#AmsBusinessMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsBusinessMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsBusiness.updateTab(tab);
                }
            }
        })
    }
    $('#AmsFileContentWindow').window({
        closed:true,
        onClose:function () {
            if (document.getElementById("AmsFileContentFrame").contentWindow.$("#AmsFileContentGrid").length>0){
                document.getElementById("AmsFileContentFrame").contentWindow.$.AmsFileContent.search(document.getElementById("AmsFileContentFrame").contentWindow.$("#AmsFileContentGrid"))
            }else{
                document.getElementById("AmsFileContentFrame").contentWindow.$.AmsFileContent.search(document.getElementById("AmsFileContentFrame").contentWindow.$("#AmsFileContentTreeGrid"))
            }
        }
    })

    if ($('#AmsBusinessWindow').length>0){
        $('#AmsBusinessWindow').window({
            closed:true,
            onClose:function () {
                $.AmsBusiness.search($("#AmsBusinessGrid"));
            }
        })
    }
    $.AmsBusiness.init();
    document.body.style.visibility = 'visible';
})