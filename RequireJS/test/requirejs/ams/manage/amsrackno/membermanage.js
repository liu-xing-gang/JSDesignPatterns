$.AmsRackNo = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    AmsFileManaAuth:undefined,
    AmsBoxAuth:undefined,
    AmsAddressAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsRackNo_master").length>0){
            if ($("#amsRackNo_master").panel("options").region=="north"){
                $("#amsRackNo_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsRackNo_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#movableRack").length>0&&$("#movableRack").val()!=""){
            autoQuery = true;
            if ($("#amsRackNo_MovableRack").length>0){
                $("#amsRackNo_MovableRack").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRackNo_MovableRack"),$("#movableRack").val());
            }
        }
        if ($("#rackMh").length>0&&$("#rackMh").val()!=""){
            autoQuery = true;
            if ($("#amsRackNo_RackMh").length>0){
                $("#amsRackNo_RackMh").parent().hide();
                $.totemUtils.setPropertyValue($("#amsRackNo_RackMh"),$("#rackMh").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRackNo_MovableRack"))!=""){
            autoQuery = true;
            if ($("#amsRackNo_MovableRack").length>0){
                $("#amsRackNo_MovableRack").parent().hide();
            }
            grid = $('#AmsRackNoGrid');
            if (grid.datagrid("getColumnOption","movableRack")!=null){
                grid.datagrid("getColumnOption","movableRack").hidden = true;
                if (grid.datagrid("getColumnOption","movableRackShowLabel")!=null){
                    grid.datagrid("getColumnOption","movableRackShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsRackNo_RackNo"))!=""){
            autoQuery = true;
            if ($("#amsRackNo_RackNo").length>0){
                $("#amsRackNo_RackNo").parent().hide();
            }
            grid = $('#AmsRackNoGrid');
            if (grid.datagrid("getColumnOption","rackNo")!=null){
                grid.datagrid("getColumnOption","rackNo").hidden = true;
                if (grid.datagrid("getColumnOption","rackNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","rackNoShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsRackNoGridPage').length>0){
            $.totemUtils.setHeight($('#AmsRackNoGridPage'));
        }
        if (autoQuery){
            $.AmsRackNo.search($('#AmsRackNoGrid'));
        }

        if ($('#AmsFileManaMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsFileManaMemberGridPage'));
        }

        if ($('#AmsFileManaMemberGrid').length>0){
            $('#AmsFileManaMemberGrid').datagrid({
                columns:$.AmsFileManaGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        if ($('#AmsBoxMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBoxMemberGridPage'));
        }

        if ($('#AmsBoxMemberGrid').length>0){
            $('#AmsBoxMemberGrid').datagrid({
                columns:$.AmsBoxGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        if ($('#AmsAddressMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsAddressMemberGridPage'));
        }

        if ($('#AmsAddressMemberGrid').length>0){
            $('#AmsAddressMemberGrid').datagrid({
                columns:$.AmsAddressGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        $("#AmsRackNoForm #movableRack").combobox({
            valueField :"movableRackId",
            textField:"rackName",
            data:$.totemUtils.getJson('cfg/amsmovablerack/queryAuthAll','get')
        });

    },
    onChange:function(parent,data){
        if ($.t_manage!=undefined&&$.t_manage.onChange!=undefined){
            if (!$.t_manage.onChange("AmsRackNo_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#movableRack").length>0&&$("#movableRack").val()!=""){
            actionType += "&amsRackNo_MovableRack="+$("#movableRack").val();
        }
        if ($("#rackMh").length>0&&$("#rackMh").val()!=""){
            actionType += "&amsRackNo_RackMh="+$("#rackMh").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsRackNo.currentGrid = grid;
        $.AmsRackNo.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsRackNoWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRackNoWindow').length>0){
            win = parent.$('#AmsRackNoWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsRackNo.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrackno/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案位管理"
        });
    },
    edit : function(grid) {
        $.AmsRackNo.actionType="edit";
        $.AmsRackNo.openEdit(grid,"更新档案位管理","?actionType=edit");
    },
    view : function(grid) {
        $.AmsRackNo.actionType="view";
        $.AmsRackNo.openEdit(grid,"查看档案位管理","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsRackNo.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案位管理进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案位管理进行'+title});
                return;
            }
            id = rows[0].rackNoId
        }else{
            id = "null";
        }
        var win = $('#AmsRackNoWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRackNoWindow').length>0){
            win = parent.$('#AmsRackNoWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrackno/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        var win = $('#AmsRackNoWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsRackNoWindow').length>0){
            win = parent.$('#AmsRackNoWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'manage/amsrackno/importExcel'+$.AmsRackNo.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案位管理导入"
        });
    },
    copy : function(grid) {
        $.AmsRackNo.currentGrid = grid;
        $.AmsRackNo.actionType="copy";
        $.AmsRackNo.openEdit(grid,"复制一个新的",$.AmsRackNo.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案位管理将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].rackNoId);
                    }
                    $.post(_appsite + 'manage/amsrackno/deletes', {
                        "rackNoIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员文件管理？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"coll/amsfilemana/deletes",{storagePlaces:ids},"json");
                                }});
                                $.messager.confirm('信息提示', '是否继续删除所有成员档案盒信息？成员删除后不可恢复！', function(data) {
                                    if (data) {
                                        $.post(_appsite+"cfg/amsbox/deletes",{libNos:ids},"json");
                                    }});
                                    $.messager.confirm('信息提示', '是否继续删除所有成员档案位置？成员删除后不可恢复！', function(data) {
                                        if (data) {
                                            $.post(_appsite+"manage/amsaddress/deletes",{rackNos:ids},"json");
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
        var paras = $.AmsRackNoGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsRackNoGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsrackno/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"manage/amsrackno/query";
                }
                $.AmsRackNo.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsRackNoIframeDom = $("#AmsRackNoIframeDomIfile");
            if(AmsRackNoIframeDom && AmsRackNoIframeDom.length==0){
                $("body").append("<iframe id='AmsRackNoIframeDomIfile' style='display:none'></iframe>");
                AmsRackNoIframeDom = $("#AmsRackNoIframeDomIfile");
            }
            AmsRackNoIframeDom.attr("src","");
            var url= _appsite+"manage/amsrackno/exportAuthAll?"+$.param($.AmsRackNoGrid.queryParams(grid));
            AmsRackNoIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsRackNoMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsRackNoMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsRackNo_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsFileManaFrame").length>0){
                tab = $('#AmsRackNoMemberTabs').tabs('getTab',"文件管理");
                $("#AmsFileManaFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsFileManaFrame").contentWindow.$("#AmsFileManaGridPage"));
            }
            if ($("#AmsBoxFrame").length>0){
                tab = $('#AmsRackNoMemberTabs').tabs('getTab',"档案盒信息");
                $("#AmsBoxFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsBoxFrame").contentWindow.$("#AmsBoxGridPage"));
            }
            if ($("#AmsAddressFrame").length>0){
                tab = $('#AmsRackNoMemberTabs').tabs('getTab',"档案位置");
                $("#AmsAddressFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsAddressFrame").contentWindow.$("#AmsAddressGridPage"));
            }
        }
    })
    if ($('#AmsRackNoGrid').length>0){
        $('#AmsRackNoGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsRackNo.selected){
                    $(this).datagrid("selectRow",$.AmsRackNo.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_manage.onClickRow("AmsRackNo",row)){
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
                    if ($.AmsRackNo.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsRackNo.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsRackNo.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.rackNoId == $.AmsRackNo.selectRow){
                    return;
                }
                if ($('#AmsRackNoMemberTabs').length>0){
                    if ($('#AmsRackNoMemberTabs').tabs("tabs").length>1){
                        $('#AmsRackNoMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsRackNoMemberTabs').outerHeight() - 30;
                if ($('#AmsRackNoMemberTabs').tabs('exists',"文件管理")){
                    var tab = $('#AmsRackNoMemberTabs').tabs('getTab',"文件管理");
                    tab.css("height",height+3);
                    var para = "?storagePlace="+row.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsRackNoMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"coll/amsfilemana"+para,
                            id:"AmsFileMana"
                        }
                    });
                }
                if ($('#AmsRackNoMemberTabs').tabs('exists',"档案盒信息")){
                    var tab = $('#AmsRackNoMemberTabs').tabs('getTab',"档案盒信息");
                    tab.css("height",height+3);
                    var para = "?libNo="+row.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsRackNoMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amsbox"+para,
                            id:"AmsBox"
                        }
                    });
                }
                if ($('#AmsRackNoMemberTabs').tabs('exists',"档案位置")){
                    var tab = $('#AmsRackNoMemberTabs').tabs('getTab',"档案位置");
                    tab.css("height",height+3);
                    var para = "?rackNo="+row.rackNoId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsRackNoMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amsaddress"+para,
                            id:"AmsAddress"
                        }
                    });
                }
                if ((!$.AmsRackNo.selectRow)&&$("#amsRackNo_master").length>0){
                    if ($("#amsRackNo_master").panel("options").region=="north"){
                        $("#amsRackNo_master").panel("resize",{height:300});
                    }else{
                        $("#amsRackNo_master").panel("resize",{width:400});
                    }
                }
                $.AmsRackNo.selectRow = row.rackNoId;

            },
            columns:$.AmsRackNoGrid.column

        });

    }

    $("#amsRackNo_MovableRack").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsRackNo.onChange("amsRackNo_movableRack",record);
            }
        }
    });

    if ($("#AmsRackNoMemberTabs").length>0){
        $("#AmsRackNoMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsRackNo.updateTab($('#AmsRackNoMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsRackNoMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsRackNo.updateTab(tab);
                }
            }
        })
    }
    if ($('#AmsRackNoWindow').length>0){
        $('#AmsRackNoWindow').window({
            closed:true,
            onClose:function () {
                $.AmsRackNo.search();
            }
        })
    }
    $.AmsRackNo.init();
    document.body.style.visibility = 'visible';
})