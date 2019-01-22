$('#AmsNeedCheckDlg-buttons a:last').click(function (){
    parent.$('#AmsMyBorrowWindow').window('close');
});
$(function(){
    $(document).ready(function () {
        var parameter=$("#parameter",parent.document).val();
        if($("#AmsNeedCheckForm").length>0){
            var row;
            $("#amsNeedCheckAmsShenpiRefuse").linkbutton({
                text:'驳回'
            });
            $("#amsNeedCheckAmsShenpiRefuse").hide();
            $("#amsNeedCheckAmsShenpiPass").hide();
            var doFunction;
            var linkNo;
            if (parameter==undefined) {
                row = parent.$("#AmsNeedCheckGrid").datagrid('getSelected');
            }
            if (parameter==1) {
                row=parent.$("#myneedcheck").datagrid('getSelected');
            }
                linkNo = row.linkNo;
                if (linkNo != undefined) {
                    $.post(_appsite + "/personal/getDoFunction", {linkNo: linkNo}, function (data) {
                        if (data.result) {
                            doFunction = data.doFunction;
                            if (doFunction != undefined) {
                                switch (doFunction) {
                                    case "1":
                                        $("#amsNeedCheckAmsShenpiPass").show();
                                        break;
                                    case "2":
                                        $("#amsNeedCheckAmsShenpiRefuse").show();
                                        break;
                                    case "1,2":
                                        $("#amsNeedCheckAmsShenpiRefuse").show();
                                        $("#amsNeedCheckAmsShenpiPass").show();
                                        break;
                                    default :
                                        $("#amsNeedCheckAmsShenpiRefuse").hide();
                                        $("#amsNeedCheckAmsShenpiPass").hide();
                                }
                            }
                        }
                    }, "json");
                }

        }
    })
    if (!$.AmsNeedCheck&&$("#amsNeedCheckAmsShenpiPass").length>0&&$("#amsNeedCheckAmsShenpiRefuse").length>0){
        $.AmsNeedCheck={
            checkResult:function (result) {
                $("#AmsNeedCheckForm").form("submit", {
                    url : _appsite + "personal/amsneedcheck/update",
                    success : function(result) {
                            parent.$('#AmsNeedCheckWindow').window('close');
                            parent.$('#AmsMyBorrowWindow').window('close');
                            parent.$('#myborrow').datagrid('reload');
                            parent.$('#myneedcheck').datagrid('reload');
                            parent.$('#AmsNeedCheckGrid').datagrid('reload');
                            parent.$.messager.show({title : '信息提示',msg : '审核成功'});
                    },
                    onSubmit:function(){
                        var user="${sysuser.userName!}";
                        $("input[name=isCheck]").val("1");
                        if (result=="pass"){
                            $("#checkResult").val("pass");
                        }
                        if (result=="refuse"){
                            $("input[name=checkResult]").val("refuse");
                            var nopassReason=$("#nopassReason").val();
                            if (nopassReason){
                                return true;
                            }else {
                                $.messager.show({title : '信息提示',msg : '审核原因必须填写'});
                                return false;
                            }
                        }
                        if (!$(this).form('validate')){
                            $.messager.progress("close");
                            $("#amsNeedCheckSave").show();
                            return false;
                        }
                    }
                });
            }
        }
    }
});