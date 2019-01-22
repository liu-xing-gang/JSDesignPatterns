//重写袋管理的保存方法
function saveAmsPock(){
    $("#amsPockSave").hide();
    $("#AmsPockForm").form("submit", {
        url : _appsite + "cfg/updatePock",
        success : function(result) {
            $("#amsPockSave").show();
            result=JSON.parse(result);
            if (result.result==true){
                parent.$('#AmsPockWindow').window('close');
                parent.$('#AmsPockGrid').datagrid('reload');
            } else{
                $.messager.show({title : '信息提示',msg : result.message});
            }
        },
        onSubmit:function(){
            var result=true;
            //如果袋状态是已选位则验证库位号
            var pockState=$('#boxState').combobox('getValue') ;
            if (pockState=="1"){
                $("#libNo").validatebox({required: true});
            }
            if (pockState=="2"){
                $("#libNo").validatebox({required: false});
            }
            if (!$(this).form('validate')){
                $.messager.progress("close");
                $("#amsBoxSave").show();
                result=false;
            }
            return result;
        }
    });
}
//重写盒管理的保存方法
function saveAmsBox(){
    $("#amsBoxSave").hide();
    $("#AmsBoxForm").form("submit", {
        url : _appsite + "cfg/updateBox",
        success : function(result) {
            $("#amsBoxSave").show();
            result=JSON.parse(result);
            if (result.result==true){
                parent.$('#AmsBoxWindow').window('close');
                parent.$('#AmsBoxGrid').datagrid('reload');
            } else{
                $.messager.show({title : '信息提示',msg : result.message});
            }
        },
        onSubmit:function(){
            var result=true;
            //如果盒状态是已选位则验证库位号
            var boxState=$('#boxState').combobox('getValue') ;
            if (boxState=="1"){
                $("#libNo").validatebox({required: true});
            }
            if (boxState=="2"){
                $("#libNo").validatebox({required: false});
            }
            if (!$(this).form('validate')){
                $.messager.progress("close");
                $("#amsBoxSave").show();
                result=false;
            }
            return result;
        }
    });
}
// 自定义点击事件
function handleClick(data, title) {
    var cabinetId = data["rackNo"]
    var win = $('#AmsMovableRackWindow');
    var height = document.body.clientHeight;
    if (parent.$('#AmsMovableRackWindow').length > 0) {
        win = parent.$('#AmsMovableRackWindow');
        height = parent.document.body.clientHeight;
    }
    win.window({
        modal: true,
        height: height * 0.9,
        content: '<iframe src="' + _appsite + 'coll/amsarchive?storagePlace=' + cabinetId + '" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
        title: title
    });
}

$(function () {
    /**
     * 对档案袋页面的控制操作
     */
    if ($('#AmsPockGrid').length>0){
        $('#AmsPockGrid').datagrid({//控制装盒按钮显示隐藏
            onClickRow:function(index,row) {
                if (row.boxNo != '') {
                    $('#AmsPockPushBox').linkbutton('disable');
                    $('#AmsPockBreakUpBox').linkbutton('enable');
                    $('#AmsPockRemove').linkbutton('disable');//删除按钮
                } else {
                    $('#AmsPockPushBox').linkbutton('enable');
                    $('#AmsPockBreakUpBox').linkbutton('disable');
                    $('#AmsPockRemove').linkbutton('enable');
                }
            }
        });
        if ($("#AmsPockPushBox").length>0){//档案袋装盒
            $.AmsPock.pushBox=function(grid){
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
                var row = rows[0];
                if (row) {
                    var win = $('#AmsPockWindow');
                    var height = document.body.clientHeight;
                    if (parent.$('#AmsPockWindow').length>0){
                        win = parent.$('#AmsPockWindow');
                        height = parent.document.body.clientHeight;
                    }
                    win.window({
                        modal: true,
                        height:height * 0.9,
                        content:'<iframe src="'+_appsite+'cfg/pockpushbox/'+row.amsHighrecordinId+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                        title: "档案袋装盒"
                    });
                }
            }
        }
        if ($("#AmsPockBreakUpBox").length>0){//档案袋中打散盒
            $.AmsPock.breakUpBox = function(grid){
                if (grid.selector.indexOf("Tree")>0){
                    var rows = grid.treegrid("getSelections");
                }else{
                    var rows = grid.datagrid("getSelections");
                }
                if (rows.length>0) {
                    $.messager.confirm('信息提示', '确认打散该档案盒吗？', function(r) {
                        if (r) {
                            if (rows[0].libNo!=""){
                                $.messager.show({title : '信息提示',msg : '已经上架的盒不能进行打散'});
                            }else{
                                var pockId=rows[0].amsHighrecordinId;
                                var boxNo="";
                                var boxState="2";
                                var pockNo=rows[0].pockNo;
                                $.post(_appsite+'/cfg/amspock/update',{amsHighrecordinId:pockId,boxNo:boxNo,boxState:boxState,pockNo:pockNo},function(result){
                                    if(result.result){
                                        //获取盒的id
                                        var boxId=rows[0].boxNo;
                                        var pockNum=rows[0].havePage;
                                        $.post(_appsite+'/cfg/amsbox/query',{boxNo:boxId},function (data) {
                                            var boxData=data.rows[0];
                                            var boxId=boxData.amsHighrecordinId;
                                            var havePage=boxData.havePage;
                                            var pockPage=pockNum;
                                            var userNo="";
                                            $.post(_appsite+'/cfg/amsbox/update',{amsHighrecordinId:boxId,havePage:havePage-pockPage,userNo:userNo},function (data) {
                                                if (data.result){
                                                    $("#AmsPockGrid").datagrid('reload');
                                                    $.messager.show({title : '信息提示',msg : '打散成功'});
                                                }
                                            },"json");
                                        },"json");
                                    }
                                },"json")
                            }
                        }
                    });
                }
            }
        }

    }
    /**
     * 对档案盒页面的控制
     */
    if ($('#AmsBoxGrid').length>0) {

        $('#AmsBoxGrid').datagrid({//控制上架按钮的显示与隐藏
            onClickRow:function(index,row) {
                if (row.libNo != "") {
                    $("#AmsBoxPushRack").linkbutton('disable');
                    $("#AmsBoxDownRack").linkbutton('enable');
                    $('#AmsBoxRemove').linkbutton('disable');//删除按钮
                } else {
                    $("#AmsBoxPushRack").linkbutton('enable');
                    $("#AmsBoxDownRack").linkbutton('disable');
                    $('#AmsBoxRemove').linkbutton('enable');
                }
            },
            onLoadSuccess:function(data){
                //隐藏档案盒的用户列
                $('#AmsBoxGrid').datagrid('hideColumn','userNo');
                if($.AmsBox.selected){
                    $(this).datagrid("selectRow",$.AmsBox.selected);
                }
            },
        });
        if ($("#AmsBoxDownRack").length>0){//档案盒下架
            $.AmsBox.downRack = function(grid){
                var rows;
                if (grid.selector.indexOf("Tree")>0){
                    var rows = grid.treegrid("getSelections");
                }else{
                    var rows = grid.datagrid("getSelections");
                }
                if (rows.length>1){
                    $.messager.show({title : '信息提示',msg : '只能选择一个档案盒信息进行下架'});
                    return;
                }
                if (rows.length==0){
                    $.messager.show({title : '信息提示',msg : '请选择一个档案盒信息进行下架'});
                    return;
                }
                if (rows.length>0) {
                    $.messager.confirm('信息提示', '确认下架该档案盒吗？', function(r) {
                        if (r) {
                            let boxData=rows[0];
                            let command_data="";//命令信息
                            let command_result="";//命令返回结果
                            let ctrlTable=createObj(boxData,"ctrlTable","xj");
                            //发送下架请求
                            command_data=commandSend(ctrlTable);
                            if (command_data.result){
                                $.messager.confirm("操作提示", "档案柜已开，请确认档案是否已经取出", function (data) {
                                    if (data){
                                        command_result=commandResult(command_data);
                                        if (command_result.result){
                                            let box = createObj(boxData, "amsBox", "xj");
                                            $.post(_appsite + "/cfg/amsbox/update", box, function (data) {//修改盒信息
                                                if (data.result) {
                                                    $("#AmsBoxGrid").datagrid('reload');
                                                    parent.$.messager.show({title: '信息提示', msg: '下架成功'});
                                                }
                                            }, "json");
                                        }
                                    } else {
                                        commandCancel(command_data);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    }
    /**
     * 对条码管理页面的控制
     */
    if ($("#AmsBarmanageCreateBar").length>0){
        $.AmsBarmanage.createBar = function(grid) {//生成条码
            var win = $('#AmsBarmanageWindow');
            var height = document.body.clientHeight;
            if (parent.$('#AmsBarmanageWindow').length>0){
                win = parent.$('#AmsBarmanageWindow');
                height = parent.document.body.clientHeight;
            }
            win.window({
                modal: true,
                height:height * 0.9,
                content:'<iframe src="'+_appsite+'cfg/createBarView/'+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                title: '生成条码'
            });
        }
    }

    /**
     * 对上架视图页面的控制
     */
    if ($("#amsMovableRackCabinet").length > 0) {
        console.log(window.location.href, 'location:')
        $("#amsRackNo_Storage").combobox({
            onSelect: function (record) {
                $.when($.totemUtils.getJson("/ams/manage/amsrackno/queryby/movableRack/is/" + record.movableRackId)).then(function(res){
                    $.when($("#amsMovableRackCabinet").cabinet({
                        column: parseInt(record.groups),
                        section: parseInt(record.section),
                        layer: parseInt(record.layer),
                        capacity: parseInt(record.maxCapacity),
                        set: res.amsRackNoDataList
                    })).then(function () {
                        try{
                            //禁用确认放入
                            $('.btn-resave').disabled=true;
                            var select_data="";//选中的位置信息选中的大库位的信息
                            var select_address="";//选中的小库位的信息
                            var command_data="";//命令信息
                            var command_result="";//命令返回结果
                            var boxData = parent.$("#AmsBoxGrid").datagrid('getSelected');//盒信息
                            // step 1发送命令
                            $('.btn-save').on('click', function (e) {});
                            // step1 取消命令
                            $('.btn-cancel').on('click', function (e) {});
                            // 打开柜体
                                $('.btn-openrack').on('click', function () {
                                    let data = $(".c-foot .r").data("ori");
                                    let place = $('.c-line .r').text();
                                    data.place = place;
                                    data.rackKh = data.rackNo.substring(0, data.rackNo.length - 10);
                                    data.rfid = boxData.rfid;
                                    select_data = data;
                                    select_address = data.rackAddress[parseInt(place) - 1];
                                    select_data.select_address = select_address;
                                    var ctrlTable = createObj(select_data, "ctrlTable", "sj");
                                    command_data = commandSend(ctrlTable);
                                    if (command_data.result) {
                                        $(this).attr("class", "btn1 btn-disabled");
                                        $(this).attr("disabled",true);
                                        $(".btn-resave").attr("class", "btn1 btn-resave");
                                        $(".btn-resave").attr("disabled",false);
                                    }
                                });
                            // 确认放入
                                $('.btn-resave').on('click', function () {
                                    $(this).attr("class", "btn1 btn-disabled");
                                    $(this).attr("disabled",true);
                                    if (command_data.result) {
                                        command_result = commandResult(command_data);
                                        if (command_result.result) {
                                            boxData.command_data = command_data;
                                            boxData.select_address = select_address;
                                            let box = createObj(boxData, "amsBox", "sj");
                                            $.post(_appsite + "/cfg/amsbox/update", box, function (data) {//修改盒信息
                                                if (data.result) {
                                                    parent.$('#AmsBoxWindow').window('close');
                                                    parent.$("#AmsBoxGrid").datagrid('reload');
                                                    parent.$.messager.show({title: '信息提示', msg: '上架成功'});
                                                }
                                            }, "json");
                                        }
                                    }
                                });

                            // step2
                            $('.btn-recancel').on('click', function () {
                                commandCancel(command_data);
                            });
                        } catch (e) {
                            console.log(e.message)
                        }
                    })
                });
            }

        });
    }
});
function emit(){
    return($('.box.active').data('racknoid'));
}
function saveCreateBar(){
    var barType=$("#barType").combobox("getValue");
    $.post(_appsite+"cfg/createBarBatch",{barType:barType},function (data) {
        if (data.result){
            parent.$('#AmsBarmanageWindow').window('close');
            parent.$("#AmsBarmanageGrid").datagrid('reload');
            parent.$.messager.show({title : '信息提示',msg : '生成成功'});
        }
    },"json");
}



