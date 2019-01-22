$(function(){
    var data;
    var recordData=parent.$("#AmsRecordGrid").datagrid('getSelected');
    var recordNo=recordData.amsLowrecordinId;
    var amsuserType=recordData.amsuserType;
    var userNo=recordData.userNo;
    var recordPage=recordData.pageNum;
    $.messager.defaults = {ok:"确认开柜",cancel:"取消"};
    //档案装盒
    $('#searchButton').click(function(){
        $("#boxTable").datagrid('load');
    });
    $("#boxTable").datagrid({
        url:_appsite+'/cfg/amsbox/query',
        remoteSort: true,
        multiSort:true,
        rowStyler: function (index, row) {
            if (row.userNo != "") {//条件
                return 'display:none';
            }else{
                return true;
            }
        },
        onBeforeLoad:function(param){
            param.boxType=parent.$("#AmsRecordGrid").datagrid('getSelected').amsuserType;
            param.boxBar=$('#boxBar').val();
            param.rfid=$('#rfid').val();
        },
        onSelect:function(rowIndex, rowData){
            if(rowData.havePage==rowData.allPage){
                $("#amsRecordPushSave").linkbutton('disable');
            }else{
                $("#amsRecordPushSave").linkbutton('enable');
            }
            data=rowData;
        },
        columns:$.AmsBoxGrid.column
    });

    //档案装袋
    $('#searchButton2').click(function(){
        $("#pockTable").datagrid('load');
    });
    $("#pockTable").datagrid({
        url:_appsite+'cfg/amspock/queryAll',
        remoteSort: true,
        multiSort:true,
        rowStyler: function (index, row) {
            if (row.userNo != "") {//条件
                return 'display:none';
            }else{
                return true;
            }
        },
        onBeforeLoad:function(param){
            param.boxBar=$('#boxBar2').val();
            param.rfid=$('#rfid2').val();
        },
        onSelect:function(rowIndex, rowData){
            if(rowData.havePage==rowData.allPage){
                $("#amsRecordPushSave").linkbutton('disable');
            }else{
                $("#amsRecordPushSave").linkbutton('enable');
            }
            data=rowData;
        },
        columns:$.AmsPockGrid.column
    });
    //装盒装袋
    $("#amsRecordPushSave").click(function () {
      if ($(this).linkbutton('options').disabled == false){
        var libNo=data.libNo;
        var fileState;
        if (data.boxType){
            fileState="yzh";
        } else{
            fileState="yzd";
        }
        if (libNo){
            $.messager.confirm('信息提示', '盒子已经选位，需要重新开柜才能装盒！', function(r) {
                if (r){
                    /**
                     * 1.调用开柜
                     * 2.返回一个成功
                     * 3.进行post
                     */
                    updateRecord(fileState);
                }
            })
        }else {
            updateRecord(fileState);
        }
      }
    })
    function updateRecord(type){
        var boxNo=data.boxNo;
        var pockNo=data.pockNo;
        if (type){
            $.post(_appsite+"/manage/amsrecord/update",{
                amsLowrecordinId:recordNo,
                boxNo:boxNo,
                fileState:type,
                amsuserType:amsuserType,
                pageNum:recordPage,
                libNo:data.libNo,
                userNo:userNo,
                pockNo:pockNo
            },function(data){
                if(data.result){
                    if (type=="yzh") {
                        parent.$('#AmsRecordWindow').window('close');
                        parent.$("#AmsRecordGrid").datagrid('reload');
                        parent.$.messager.show({title: '信息提示', msg: '装盒成功'});
                    }
                    if (type=="yzd"){
                        parent.$('#AmsRecordWindow').window('close');
                        parent.$("#AmsRecordGrid").datagrid('reload');
                        parent.$.messager.show({title : '信息提示',msg : '装袋成功'});
                    }
                }else{
                    if (type=="yzh") {
                        parent.$.messager.show({title: '信息提示', msg: '装盒失败'});
                    }
                    if (type=="yzd"){
                        parent.$.messager.show({title : '信息提示',msg : '装袋失败'});
                    }
                }
            },"json");
        }
    }
    document.body.style.visibility = 'visible';

})



