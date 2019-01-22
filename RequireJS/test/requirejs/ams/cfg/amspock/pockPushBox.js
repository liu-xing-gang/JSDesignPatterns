$(function () {
    $('#searchButton').click(function(){
        $("#pockPushBox").datagrid('load');
    });
    $("#pockPushBox").datagrid({
        url:_appsite+'/cfg/amsbox/query',
        remoteSort: true,
        multiSort:true,
        rowStyler: function (index, row) {
            var amsuserType=$("#amsuserType").val();
            var jianshu;
            if (amsuserType=="2"){
                jianshu=5;
            }
            if (amsuserType=="3"){
                jianshu=10;
            }
            if (row.userNo != "" && parseInt(row.allJianshu)>=jianshu){//条件
                return 'display:none';
            }else{
                return true;
            }
        },
        onBeforeLoad:function(param){
            param.boxType=parent.$("#AmsPockGrid").datagrid('getSelected').amsuserType;
            param.boxBar=$('#boxBar').val();
            param.rfid=$('#rfid').val();
        },
        onSelect:function(rowIndex, rowData){
            debugger
            $("#pockpushbox").click(function () {
                var boxData=rowData;
                var pockData = parent.$("#AmsPockGrid").datagrid('getSelected');
                var boxNo = boxData.boxNo;
                var pockId = pockData.amsHighrecordinId;
                var pockNo = pockData.pockNo;
                var pockPage = pockData.havePage;
                var pockNo=pockData.pockNo;
                if (boxData.boxState == "1" || boxData.libNo != "") {//已经选位的盒子
                    $.messager.confirm('信息提示', '盒子已经上架，需要重新开柜才能装盒！', function (r) {
                        if (r) {
                            $.post(_appsite + "/cfg/amspock/update", {
                                amsHighrecordinId: pockId,
                                boxNo: boxNo,
                                boxState: "1",
                                pockNo:pockNo,
                                pockNo:pockNo,
                                havePage: pockPage
                            }, function (data) {
                                if (data.result) {
                                    parent.$('#AmsPockWindow').window('close');
                                    parent.$("#AmsPockGrid").datagrid('reload');
                                    parent.$.messager.show({title: '信息提示', msg: '装盒成功'});
                                } else {
                                    parent.$.messager.show({title: '信息提示', msg: '装盒失败'});
                                }
                            }, "json");
                        }
                    });
                } else {
                    $.post(_appsite + "/cfg/amspock/update", {
                        amsHighrecordinId: pockId,
                        boxNo: boxNo,
                        boxState: "1",
                        pockNo:pockNo,
                        pockNo:pockNo,
                        havePage: pockPage
                    }, function (data) {
                        if (data.result) {
                            parent.$('#AmsPockWindow').window('close');
                            parent.$("#AmsPockGrid").datagrid('reload');
                            parent.$.messager.show({title: '信息提示', msg: '装盒成功'});
                        } else {
                            parent.$.messager.show({title: '信息提示', msg: '装盒失败'});
                        }
                    }, "json");
                }
            });
        },
        columns:$.AmsBoxGrid.column

    });
});