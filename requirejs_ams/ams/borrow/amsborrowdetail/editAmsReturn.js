$(function() {
    $('#amsPushBox').linkbutton("disable");
    $('#amsPushPock').linkbutton("disable");
    $('#amsPushRack').linkbutton("disable");
    $('#amsBorrowDetailSave').show();//回归原位
    $('#selectPlace-buttons').show();//重新选位
    var borrowData = parent.$('#AmsBorrowDetailGrid').datagrid('getSelected');
    var userType = borrowData.userType;
    var amsuserType;
    var commanddata="";
    var commandresult="";
    var selectedData="";
    var clickNo=0;
    if (userType.indexOf("高压") != -1) {
        amsuserType = "1";
    } else if (userType.indexOf("其他") != -1) {
        amsuserType = "4";
    } else if (userType.indexOf("低压非") != -1) {
        amsuserType = "3";
    } else {
        amsuserType = "2";
    }
    $('#selectPlace').click(function () {
        $('#amsBorrowDetailSave').hide();
        $('#selectPlace-buttons').show();
        //判断用户类型开放按钮
        if (userType.indexOf("低压") != -1) {
            // $('#amsPushPock').show();
            $('#amsPushBox').show();
            $('#amsPushRack').show();
            $('#amsPushBox').linkbutton("enable");
        } else {
            // $('#amsPushBox').show();
            $('#amsPushRack').show();
            $('#amsPushRack').linkbutton("enable");
        }
        //装袋，装盒，上架对话框
        $('#amsPushPock').click(function () {
            if ($(this).linkbutton('options').disabled == false) {
                $('#pushPockDialog').show();
                $('#pushPockDialog').dialog({
                    title: '重新装袋',
                    width: 900,
                    height: 400,
                    closed: false,
                    modal: true,
                    toolbar:"#toolbar1",
                    buttons: [{
                        text: '装袋',
                        iconCls: 'icon-save',
                        handler: function () {
                            var chosePock = $('#rePushPockTable').datagrid('getSelected');
                            if (chosePock == null) {
                                $.messager.show({title: '信息提示', msg: '请选择要装的袋子后再保存'});
                            } else {
                                $('#pockNo').val(chosePock.pockNo);
                                $('#amsPushBox').linkbutton("enable");
                                $('#pushPockDialog').dialog('close');
                            }
                        }
                    }, {
                        text: '返回',
                        iconCls: 'icon-back',
                        handler: function () {
                            $('#pushPockDialog').dialog('close');
                        }
                    }],
                    onBeforeOpen: function () {
                        $('#rePushPockTable').datagrid({
                            url: _appsite + 'cfg/amspock/queryAll',
                            remoteSort: true,
                            multiSort: true,
                            fitColumns: true,
                            singleSelect: true,
                            rowStyler: function (index, row) {
                                if (row.userNo != "" || row.havePage == row.allPage) {//条件
                                    return 'display:none';
                                } else {
                                    return true;
                                }
                            },
                            onBeforeLoad:function(param){
                                param.boxBar=$('#sousuodai').val();
                                param.rfid=$('#rfid').val();
                            },
                            columns: $.AmsPockGrid.column
                        });
                    }
                });
            }
        });
        $('#amsPushBox').click(function () {
            if ($(this).linkbutton('options').disabled == false) {
                $('#confirmOk').hide();
                $('#pushBoxDialog').show();
                $('#pushBoxDialog').dialog({
                    title: '重新装盒',
                    width: 800,
                    height: 400,
                    closed: false,
                    modal: true,
                    toolbar:"#toolbar",
                    buttons: [{
                        text: '装盒',
                        iconCls: 'icon-save',
                        handler: function () {
                            var chosePock = $('#rePushBoxTable').datagrid('getSelected');
                            if (chosePock == null) {
                                $.messager.show({title: '信息提示', msg: '请选择要装的盒子后再保存'});
                            } else {
                                $('#boxNo').val(chosePock.boxNo);
                                $('#amsPushRack').linkbutton("enable");
                                $('#pushBoxDialog').dialog('close');
                            }
                        }
                    }, {
                        text: '返回',
                        iconCls: 'icon-back',
                        handler: function () {
                            $('#pushBoxDialog').dialog('close');
                        }
                    }],
                    onBeforeOpen: function () {
                        $('#rePushBoxTable').datagrid({
                            url: _appsite + 'cfg/amsbox/queryAll',
                            remoteSort: true,
                            multiSort: true,
                            fitColumns: true,
                            singleSelect: true,
                            rowStyler: function (index, row) {
                                if (row.userNo != "" || row.havePage == row.allPage || row.boxType != amsuserType) {//条件
                                    return 'display:none';
                                } else {
                                    return true;
                                }
                            },
                            onBeforeLoad:function(param){
                                param.boxBar=$('#sousuohe').val();
                                param.rfid=$('#rfidbox').val();
                            },
                            columns: $.AmsBoxGrid.column
                        });
                    }

                });
            }
        });
        $('#sbox').click(function(){
            $("#rePushBoxTable").datagrid('load');
        });
        $('#spock').click(function(){
            $("#rePushPockTable").datagrid('load');
        });
        $('#amsPushRack').click(function () {
            if ($(this).linkbutton('options').disabled == false) {
                $('#pushRackDialog').show();
                var test = function(){console.log($("#standardIframe").contents().find("#AmsMovableRackBtnConfirm"))}
                    $('#pushRackDialog').dialog({
                    title: '重新上架',
                    width: 900,
                    height: 500,
                    closed: false,
                    modal: true,
                    content: "<iframe id='standardIframe'  frameborder='0'  onload='load()' src='" + _appsite + "cfg/amsmovablerack?pageName=archive&flag=rebox' style='width:100%;height:100%;' ></iframe>",
                    buttons: [{
                        text: '确认',
                        iconCls: 'icon-down',
                        handler: function () {
                            selectedData=$("#standardIframe").contents().find(".c-foot .r").data("ori");
                            var rackAddress=selectedData.rackAddress;
                            var selected=$("#standardIframe").contents().find(".c-line .r").text();
                            selected=rackAddress[selected-1];
                            selectedData.rackAddress=selected;
                            selectedData.select_address=selected;
                            $("#rackNo").val(selected.amsRackno);
                            $("#address").attr("data-address",JSON.stringify(selectedData));
                            $("#confirmOk").show();
                            $('#pushRackDialog').dialog('close');
                                // $('#standardIframe').contents().find(".btn-step2 .btn-resave").click();
                                // commandresult=commandResult(commanddata);
                                // if (commandresult.result){
                                //     //获取数据
                                //     $("#rackNo").val(data);
                                //     $('#pushRackDialog').dialog('close');
                                //     $('#confirmOk').show();
                                // }


                                // //发送命令
                                // var boxNo=borrowData.boxNo;
                                // $.post(_appsite+"/cfg/amsbox/queryAll",{boxNo:boxNo},function (data) {
                                //     if (date.result){
                                //         var ctrlTable=createObj(data,"ctrlTable","gh");
                                //         commanddata=commandSend(ctrlTable);
                                //     }
                                // },"json");



                        }
                    }, {
                        text: '返回',
                        iconCls: 'icon-back',
                        handler: function () {
                            $('#pushRackDialog').dialog('close');
                        }
                    }]
                });
                // $('#pushRackDialog').dialog("open");
            }
        });
        var iframe = $("#standardIframe");
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function() {
                //iframe加载完成后你需要进行的操作
                alert("if")
            });
        } else {
            iframe.onload = function() {
                alert("else")
                //iframe加载完成后你需要进行的操作
            };
        }

    });
});
function AmsFileReturn() {
    if (!$("#AmsBorrowDetailForm").form('validate')){
        $.messager.progress("close");
        $("#amsBorrowDetailSave").hide();
        return;
    }
    //获取位置信息
    var  selectData=$("#address").data("address");
    if (selectData){
        var command_data="";//命令信息
        var command_result="";//命令返回结果
        var content="已选择："+selectData.rackAddress.amsRackno;
        $("#confirmDialog").dialog({
            title: '信息确认',
            width: 450,
            height: 250,
            closed: false,
            modal: true,
            content: content,
            buttons: [{
                text: '打开柜体',
                iconCls: 'icon-ok',
                handler: function () {
                    var ctrlTable = createObj(selectData, "ctrlTable", "sj");
                    command_data = commandSend(ctrlTable);
                }
            }, {
                text: '确认放入',
                iconCls: 'icon-down',
                left:-100,
                handler: function () {
                    if (command_data.result) {
                        command_result = commandResult(command_data);
                        if (command_result.result) {
                            $("#AmsBorrowDetailForm").form("submit",submit_data);
                        }
                    }
                }
            },{
                text: '返回',
                iconCls: 'icon-back',
                handler: function () {
                    commandCancel(command_data);
                    $("#confirmDialog").dialog('close');
                }
            }]
        });
    }
     var submit_data={
        url : _appsite + "borrow/amsborrowdetail/update",
        success : function(data) {
            var result=JSON.parse(data);
            if (result.result){
                parent.$("#AmsBorrowDetailWindow").window('close');
                parent.$("#AmsBorrowDetailGrid").datagrid('reload');
                parent.$.messager.show({title : '信息提示',msg : '归还成功'});
            }
        },
        onSubmit:function(){
            $("#checkResult").val("已归还");
            $("#borrowState").val("已归还");
            var linkNo=$("#linkNo").val();
            if(""!=linkNo){
                $("input[name=linkNo]").val((parseInt(linkNo)+1));
            }else{
                $("input[name=linkNo]").val("1");
            }

        }
    };
}
var load=function(){
     $("#standardIframe").contents().find("#AmsMovableRackBtnConfirm").hide();
}