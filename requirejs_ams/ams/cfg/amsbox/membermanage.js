$.AmsBox = {
    actionType : '',
    joined : undefined,
    currentGrid:undefined,
    uploader:undefined,
    authROOT:[],
    authRow : undefined,
    AmsPockAuth:undefined,
    AmsRecordAuth:undefined,
    init:function(){
        var autoQuery = false;
        if ($("#amsBox_master").length>0){
            if ($("#amsBox_master").panel("options").region=="north"){
                $("#amsBox_master").panel("resize",{height:document.body.clientHeight});
            }else{
                $("#amsBox_master").panel("resize",{width:document.body.clientWidth});
            }
        }
        if ($("#boxType").length>0&&$("#boxType").val()!=""){
            autoQuery = true;
            if ($("#amsBox_BoxType").length>0){
                $("#amsBox_BoxType").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBox_BoxType"),$("#boxType").val());
            }
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            autoQuery = true;
            if ($("#amsBox_BoxNo").length>0){
                $("#amsBox_BoxNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBox_BoxNo"),$("#boxNo").val());
            }
        }
        if ($("#boxState").length>0&&$("#boxState").val()!=""){
            autoQuery = true;
            if ($("#amsBox_BoxState").length>0){
                $("#amsBox_BoxState").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBox_BoxState"),$("#boxState").val());
            }
        }
        if ($("#libNo").length>0&&$("#libNo").val()!=""){
            autoQuery = true;
            if ($("#amsBox_LibNo").length>0){
                $("#amsBox_LibNo").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBox_LibNo"),$("#libNo").val());
            }
        }
        if ($("#boxMh").length>0&&$("#boxMh").val()!=""){
            autoQuery = true;
            if ($("#amsBox_BoxMh").length>0){
                $("#amsBox_BoxMh").parent().hide();
                $.totemUtils.setPropertyValue($("#amsBox_BoxMh"),$("#boxMh").val());
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_BoxState"))!=""){
            autoQuery = true;
            if ($("#amsBox_BoxState").length>0){
                $("#amsBox_BoxState").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","boxState")!=null){
                grid.datagrid("getColumnOption","boxState").hidden = true;
                if (grid.datagrid("getColumnOption","boxStateShowLabel")!=null){
                    grid.datagrid("getColumnOption","boxStateShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_BoxBar"))!=""){
            autoQuery = true;
            if ($("#amsBox_BoxBar").length>0){
                $("#amsBox_BoxBar").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","boxBar")!=null){
                grid.datagrid("getColumnOption","boxBar").hidden = true;
                if (grid.datagrid("getColumnOption","boxBarShowLabel")!=null){
                    grid.datagrid("getColumnOption","boxBarShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_Rfid"))!=""){
            autoQuery = true;
            if ($("#amsBox_Rfid").length>0){
                $("#amsBox_Rfid").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","rfid")!=null){
                grid.datagrid("getColumnOption","rfid").hidden = true;
                if (grid.datagrid("getColumnOption","rfidShowLabel")!=null){
                    grid.datagrid("getColumnOption","rfidShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_BoxNo"))!=""){
            autoQuery = true;
            if ($("#amsBox_BoxNo").length>0){
                $("#amsBox_BoxNo").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","boxNo")!=null){
                grid.datagrid("getColumnOption","boxNo").hidden = true;
                if (grid.datagrid("getColumnOption","boxNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","boxNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_UserNo"))!=""){
            autoQuery = true;
            if ($("#amsBox_UserNo").length>0){
                $("#amsBox_UserNo").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","userNo")!=null){
                grid.datagrid("getColumnOption","userNo").hidden = true;
                if (grid.datagrid("getColumnOption","userNoShowLabel")!=null){
                    grid.datagrid("getColumnOption","userNoShowLabel").hidden = true;
                }
            }
        }
        if ($.totemUtils.getPropertyValue($("#amsBox_BoxType"))!=""){
            autoQuery = true;
            if ($("#amsBox_BoxType").length>0){
                $("#amsBox_BoxType").parent().hide();
            }
            grid = $('#AmsBoxGrid');
            if (grid.datagrid("getColumnOption","boxType")!=null){
                grid.datagrid("getColumnOption","boxType").hidden = true;
                if (grid.datagrid("getColumnOption","boxTypeShowLabel")!=null){
                    grid.datagrid("getColumnOption","boxTypeShowLabel").hidden = true;
                }
            }
        }
        if ($('#AmsBoxGridPage').length>0){
            $.totemUtils.setHeight($('#AmsBoxGridPage'));
        }
        if (autoQuery){
            $.AmsBox.search($('#AmsBoxGrid'));
        }

        if ($('#AmsPockMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsPockMemberGridPage'));
        }

        if ($('#AmsPockMemberGrid').length>0){
            $('#AmsPockMemberGrid').datagrid({
                columns:$.AmsPockGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        if ($('#AmsRecordMemberGridPage').length>0){
            $.totemUtils.setHeight($('#AmsRecordMemberGridPage'));
        }

        if ($('#AmsRecordMemberGrid').length>0){
            $('#AmsRecordMemberGrid').datagrid({
                columns:$.AmsRecordGrid.column,
                remoteSort: true,
                multiSort:true
            });
        }
        $("#AmsBoxForm #boxState").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('BOX_STATE')
        });

        $("#AmsBoxForm #boxType").combobox({
            valueField :"codeValue",
            textField:"codeLabel",
            data:$.totemUtils.getTypeCode('BOX_TYPE')
        });

    },
    onChange:function(parent,data){
        if ($.t_cfg!=undefined&&$.t_cfg.onChange!=undefined){
            if (!$.t_cfg.onChange("AmsBox_"+parent,data)){
                return;
            }
        }
    },
    getPara : function(actionType){
        if ($("#boxType").length>0&&$("#boxType").val()!=""){
            actionType += "&amsBox_BoxType="+$("#boxType").val();
        }
        if ($("#boxNo").length>0&&$("#boxNo").val()!=""){
            actionType += "&amsBox_BoxNo="+$("#boxNo").val();
        }
        if ($("#boxState").length>0&&$("#boxState").val()!=""){
            actionType += "&amsBox_BoxState="+$("#boxState").val();
        }
        if ($("#libNo").length>0&&$("#libNo").val()!=""){
            actionType += "&amsBox_LibNo="+$("#libNo").val();
        }
        if ($("#boxMh").length>0&&$("#boxMh").val()!=""){
            actionType += "&amsBox_BoxMh="+$("#boxMh").val();
        }
        return actionType;
    },
    create : function(grid) {
        $.AmsBox.currentGrid = grid;
        $.AmsBox.actionType="create";
        parent.currentGrid=grid;
        var win = $('#AmsBoxWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBoxWindow').length>0){
            win = parent.$('#AmsBoxWindow');
            height = parent.innerHeight;
        }
        var actionType = $.AmsBox.getPara("?actionType=create");
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbox/edit/create'+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "新增档案盒信息"
        });
    },
    edit : function(grid) {
        $.AmsBox.actionType="edit";
        $.AmsBox.openEdit(grid,"更新档案盒信息","?actionType=edit");
    },
    pushRack : function(grid) {
        $.AmsBox.actionType="edit";
        $.AmsBox.openEdit(grid,"上架","?actionType=edit&&func=PushRack");
    },
    downRack : function(grid) {
        $.AmsBox.actionType="edit";
        $.AmsBox.openEdit(grid,"下架","?actionType=edit&&func=DownRack");
    },
    view : function(grid) {
        $.AmsBox.actionType="view";
        $.AmsBox.openEdit(grid,"查看档案盒信息","?actionType=view");
    },
    openEdit : function(grid,title,actionType){
        var id;
        if (grid.length>0){
            $.AmsBox.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个档案盒信息进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个档案盒信息进行'+title});
                return;
            }
            id = rows[0].amsHighrecordinId
        }else{
            id = "null";
        }
        var win = $('#AmsBoxWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBoxWindow').length>0){
            win = parent.$('#AmsBoxWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbox/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: title
        });

    },importExcel:function(grid){
        if (grid){
            $.AmsBox.currentGrid = grid;
        }
        var win = $('#AmsBoxWindow');
        var height = document.body.clientHeight;
        if (parent.$('#AmsBoxWindow').length>0){
            win = parent.$('#AmsBoxWindow');
            height = parent.document.body.clientHeight;
        }
        win.window({
            closed:false,
            modal: true,
            height:height * 0.9,
            content:'<iframe src="'+_appsite+'cfg/amsbox/importExcel'+$.AmsBox.getPara("?actionType=import")+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
            title: "档案盒信息导入"
        });
    },
    copy : function(grid) {
        $.AmsBox.currentGrid = grid;
        $.AmsBox.actionType="copy";
        $.AmsBox.openEdit(grid,"复制一个新的",$.AmsBox.getPara("?actionType=copy"));
    },
    remove : function(grid) {
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '选择的档案盒信息将从数据库删除，不可恢复！是否继续？', function(r) {
                if (r) {
                    var ids = new Array();
                    for (var i in rows){
                        ids.push(rows[i].amsHighrecordinId);
                    }
                    $.post(_appsite + 'cfg/amsbox/deletes', {
                        "amsHighrecordinIds" : ids
                    }, function(result) {
                        if (result.result) {
                            $.messager.confirm('信息提示', '是否继续删除所有成员档案袋信息？成员删除后不可恢复！', function(data) {
                                if (data) {
                                    $.post(_appsite+"cfg/amspock/deletes",{boxNos:ids},"json");
                                }});
                                $.messager.confirm('信息提示', '是否继续删除所有成员用户档案入库？成员删除后不可恢复！', function(data) {
                                    if (data) {
                                        $.post(_appsite+"manage/amsrecord/deletes",{boxNos:ids},"json");
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
        var paras = $.AmsBoxGrid.queryParams(grid);
        if (!grid){
            grid = $('#AmsBoxGrid');
        }
        if (grid.length>0){
            var gridName = grid.selector;
            var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm";

            if (grid.selector.indexOf("Tree")>0){
                var opts = grid.treegrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbox/query";
                }
                grid.treegrid({
                    type:"post",
                    url:opts.url,
                    queryParams : paras
                });
            }else{
                var opts = grid.datagrid('options');
                if (null==opts.url||opts.url==""){
                    opts.url=_appsite+"cfg/amsbox/query";
                }
                $.AmsBox.arrangeGrid(grid,paras);
                grid.datagrid({
                    type:"post",
                    url:opts.url,
                    queryParams :paras
                });
            }
        }
    },exportExcel:function(grid){
        if(grid){
            var AmsBoxIframeDom = $("#AmsBoxIframeDomIfile");
            if(AmsBoxIframeDom && AmsBoxIframeDom.length==0){
                $("body").append("<iframe id='AmsBoxIframeDomIfile' style='display:none'></iframe>");
                AmsBoxIframeDom = $("#AmsBoxIframeDomIfile");
            }
            AmsBoxIframeDom.attr("src","");
            var url= _appsite+"cfg/amsbox/exportAuthAll?"+$.param($.AmsBoxGrid.queryParams(grid));
            AmsBoxIframeDom.attr("src",url);
        }
    },
    arrangeGrid:function(grid,paras){},
    updateTab:function (tab) {
        var height = tab.outerHeight()-3;
        var content = tab.panel("options").content;
        if (null!=content&&content.indexOf("iframe")<0){
            var id = tab.panel("options").id+"Frame";
            content = '<iframe src="'+content+'" id="'+id+'" style="border: 0; width: 100%; height: '+height+'px;" frameBorder="0">';
            $('#AmsBoxMemberTabs').tabs('update',{
                tab:tab,
                options:{
                    content:content
                }
            });
        }
    }
}

$(function() {
    $("#AmsBoxMemberTabs").panel({
        onResize:function(width,height){
            if ($("#amsBox_master").panel("options").region!="north"){
                return;
            }
            height = height - 30;
            if ($("#AmsPockFrame").length>0){
                tab = $('#AmsBoxMemberTabs').tabs('getTab',"档案袋信息");
                $("#AmsPockFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsPockFrame").contentWindow.$("#AmsPockGridPage"));
            }
            if ($("#AmsRecordFrame").length>0){
                tab = $('#AmsBoxMemberTabs').tabs('getTab',"用户档案入库");
                $("#AmsRecordFrame").css("height",height);
                tab.css("height",height+4);
                $.totemUtils.setHeight(document.getElementById("AmsRecordFrame").contentWindow.$("#AmsRecordGridPage"));
            }
        }
    })
    if ($('#AmsBoxGrid').length>0){
        $('#AmsBoxGrid').datagrid({
            remoteSort: true,
            multiSort:true,
            onLoadSuccess:function(data){
                if($.AmsBox.selected){
                    $(this).datagrid("selectRow",$.AmsBox.selected);
                }
            },
            onClickRow:function(index,row){
                if (!$.t_cfg.onClickRow("AmsBox",row)){
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
                    if ($.AmsBox.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsBox.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsBox.selected = index;
                    }
                }
            },
            onSelect:function(index,row){
                if (!row||row.amsHighrecordinId == $.AmsBox.selectRow){
                    return;
                }
                if ($('#AmsBoxMemberTabs').length>0){
                    if ($('#AmsBoxMemberTabs').tabs("tabs").length>1){
                        $('#AmsBoxMemberTabs').tabs("showHeader");
                    }
                }
                var height = $('#AmsBoxMemberTabs').outerHeight() - 30;
                if ($('#AmsBoxMemberTabs').tabs('exists',"档案袋信息")){
                    var tab = $('#AmsBoxMemberTabs').tabs('getTab',"档案袋信息");
                    tab.css("height",height+3);
                    var para = "?boxNo="+row.amsHighrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsBoxMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"cfg/amspock"+para,
                            id:"AmsPock"
                        }
                    });
                }
                if ($('#AmsBoxMemberTabs').tabs('exists',"用户档案入库")){
                    var tab = $('#AmsBoxMemberTabs').tabs('getTab',"用户档案入库");
                    tab.css("height",height+3);
                    var para = "?boxNo="+row.amsHighrecordinId;
                    if ($("#actionType").val()=="view"){
                        para += "&_funcList=view"
                    }
                    $('#AmsBoxMemberTabs').tabs('update',{
                        tab:tab,
                        options:{
                            content:_appsite+"manage/amsrecord"+para,
                            id:"AmsRecord"
                        }
                    });
                }
                if ((!$.AmsBox.selectRow)&&$("#amsBox_master").length>0){
                    if ($("#amsBox_master").panel("options").region=="north"){
                        $("#amsBox_master").panel("resize",{height:300});
                    }else{
                        $("#amsBox_master").panel("resize",{width:400});
                    }
                }
                $.AmsBox.selectRow = row.amsHighrecordinId;

            },
            columns:$.AmsBoxGrid.column

        });

    }

    $("#amsBox_BoxState").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsBox.onChange("amsBox_boxState",record);
            }
        }
    });

    $("#amsBox_BoxType").combobox({
        onSelect : function(record) {
            if (record!=undefined){
                $.AmsBox.onChange("amsBox_boxType",record);
            }
        }
    });

    if ($("#AmsBoxMemberTabs").length>0){
        $("#AmsBoxMemberTabs").tabs({
            onSelect:function (title,index) {
                $.AmsBox.updateTab($('#AmsBoxMemberTabs').tabs('getTab',index));
            },
            onUpdate:function (title,index) {
                var tab = $('#AmsBoxMemberTabs').tabs('getTab',index);
                if (tab.is(":visible")){
                    $.AmsBox.updateTab(tab);
                }
            }
        })
    }
    $('#AmsPockWindow').window({
        closed:true,
        onClose:function () {
            if (document.getElementById("AmsPockFrame").contentWindow.$("#AmsPockGrid").length>0){
                document.getElementById("AmsPockFrame").contentWindow.$.AmsPock.search(document.getElementById("AmsPockFrame").contentWindow.$("#AmsPockGrid"))
            }else{
                document.getElementById("AmsPockFrame").contentWindow.$.AmsPock.search(document.getElementById("AmsPockFrame").contentWindow.$("#AmsPockTreeGrid"))
            }
        }
    })
    $('#AmsRecordWindow').window({
        closed:true,
        onClose:function () {
            if (document.getElementById("AmsRecordFrame").contentWindow.$("#AmsRecordGrid").length>0){
                document.getElementById("AmsRecordFrame").contentWindow.$.AmsRecord.search(document.getElementById("AmsRecordFrame").contentWindow.$("#AmsRecordGrid"))
            }else{
                document.getElementById("AmsRecordFrame").contentWindow.$.AmsRecord.search(document.getElementById("AmsRecordFrame").contentWindow.$("#AmsRecordTreeGrid"))
            }
        }
    })

    if ($('#AmsBoxWindow').length>0){
        $('#AmsBoxWindow').window({
            closed:true,
            onClose:function () {
                $.AmsBox.search($("#AmsBoxGrid"));
            }
        })
    }
    $.AmsBox.init();
    document.body.style.visibility = 'visible';
})