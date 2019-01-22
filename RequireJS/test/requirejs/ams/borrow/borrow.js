//开柜借出
function confirmBorrow(){
    if ($("#AmsBorrowDetailForm").length>0){
        var borrow_data=$(this).serializeJson();
        var address_data={};
        var command_data="";//命令信息
        var command_result="";//命令返回结果
        //发送开柜请求
        //查找开柜的位置
        $.ajaxSettings.async = false;
        $.getJSON(_appsite+"/cfg/amsbox/queryAll",{boxNo:borrow_data.boxNo},function (data) {
            address_data=data.rows[0];
        });
        var ctrlTable=createObj(address_data,"ctrlTable","xj");
        command_data=commandSend(ctrlTable);
        if (command_data.result){
            $.messager.confirm('操作提示', '档案柜已开，请确认档案是否已经取出', function(r) {
                if (r){
                    command_result=commandResult(command_data);
                    if (command_result.result) {
                        $("#AmsBorrowDetailForm").form("submit", fromSubmit);
                    }
                } else {
                    commandCancel(command_data);
                }
            });
        }
        var fromSubmit={
            url : _appsite + "borrow/amsborrowdetail/update",
            success : function(result) {
                var result = eval('(' + result + ')');
                if (result.result){
                    parent.$('#AmsBorrowDetailWindow').window('close');
                    parent.$('#AmsBorrowDetailGrid').datagrid('reload');
                    parent.$.messager.show({title : '信息提示',msg : '借阅成功'});
                }
            },
            onSubmit:function(){
                //表单验证
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsBorrowDetailSave").show();
                    return false;
                }
            }
        };

    }
}
$(function(){
    if ($('#AmsBorrowDetailGrid').length>0) {
        $('#AmsBorrowDetailGrid').datagrid({
            onSelect:function(index,row){
                var OpenRack=$("#AmsBorrowDetailOpenRack");
                var AmsReturn=$("#AmsBorrowDetailAmsReturn");
                var borrowState=row.borrowState;
                var borrowType=row.borrowType;
                if (borrowState=="已归还" || borrowState=="待审核" || borrowType=="zx"){
                    OpenRack.linkbutton('disable');
                    AmsReturn.linkbutton('disable');
                }else if (borrowState=="已审核"){
                    OpenRack.linkbutton('enable');
                    AmsReturn.linkbutton('disable');
                }else if (borrowState=="已取档"){
                    OpenRack.linkbutton('disable');
                    AmsReturn.linkbutton('enable');
                }else{
                    OpenRack.linkbutton('enable');
                    AmsReturn.linkbutton('enable');
                }

                if (!row||row.amsBorrowDetailId == $.AmsBorrowDetail.selectRow){
                    return;
                }
                if ((!$.AmsBorrowDetail.selectRow)&&$("#amsBorrowDetail_master").length>0){
                    if ($("#amsBorrowDetail_master").panel("options").region=="north"){
                        $("#amsBorrowDetail_master").panel("resize",{height:300});
                    }else{
                        $("#amsBorrowDetail_master").panel("resize",{width:400});
                    }
                }
                $.AmsBorrowDetail.selectRow = row.amsBorrowDetailId;

            }
        });
    }
});