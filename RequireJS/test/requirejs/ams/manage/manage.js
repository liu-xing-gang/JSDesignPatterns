$(function(){
    //add module's function here!
    //重写借阅打开页面的功能
    if ($("#AmsRecordArchiveBorrow").length>0){
        $.AmsRecord.archiveBorrow=function (grid) {
            var title="借阅";
            $.AmsRecord.currentGrid = grid;
            parent.currentGrid=grid;
            if (grid.selector.indexOf("Tree")>0){
                var rows = grid.treegrid("getSelections");
            }else{
                var rows = grid.datagrid("getSelections");
            }
            if (rows.length>1){
                $.messager.show({title : '信息提示',msg : '只能选择一个用户档案入库进行'+title});
                return;
            }
            if (rows.length==0){
                $.messager.show({title : '信息提示',msg : '请选择一个用户档案入库进行'+title});
                return;
            }
            var row = rows[0];
            if (row) {
                var win = $('#AmsRecordWindow');
                var height = document.body.clientHeight;
                if (parent.$('#AmsRecordWindow').length>0){
                    win = parent.$('#AmsRecordWindow');
                    height = parent.document.body.clientHeight;
                }
                win.window({
                    modal: true,
                    height:height * 0.9,
                    content:'<iframe src="'+_appsite+'/borrow/borrowIndex/'+row.amsLowrecordinId+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
                    title: title
                });
            }
        }
    }
    //打散盒打散袋
   if (undefined !=$.AmsRecord){
    $.AmsRecord.breakUpBox = function(grid){
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
                        var recordId=rows[0].amsLowrecordinId;
                        var boxNo="";
                        var fileState="dzl";
                        $.post(_appsite+'manage/amsrecord/update',{amsLowrecordinId:recordId,boxNo:boxNo,fileState:fileState},function(result){
                            if(result.result){
                                //获取盒的id
                                var boxId=rows[0].boxNo;
                                var recordNum=rows[0].pageNum;
                                $.post(_appsite+'/cfg/amsbox/query',{boxNo:boxId},function (data) {
                                    var boxData=data.rows[0];
                                    var boxId=boxData.amsHighrecordinId;
                                    var havePage=boxData.havePage;
                                    var recordPage=recordNum;
                                    var userNo="";
                                    $.post(_appsite+'/cfg/amsbox/update',{amsHighrecordinId:boxId,havePage:havePage-recordPage,userNo:userNo},function (data) {
                                        if (data.result){
                                            $("#AmsRecordGrid").datagrid('reload');
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
    $.AmsRecord.breakUpPock = function(grid){
        if (grid.selector.indexOf("Tree")>0){
            var rows = grid.treegrid("getSelections");
        }else{
            var rows = grid.datagrid("getSelections");
        }
        if (rows.length>0) {
            $.messager.confirm('信息提示', '确认打散该档案袋吗？', function(r) {
                if (r) {
                    if (rows[0].boxNo!=""){
                        $.messager.show({title : '信息提示',msg : '已经装盒的档案袋不能进行打散'});
                    }else {
                        var recordId=rows[0].amsLowrecordinId;
                        var pockNo="";
                        var fileState="dzl";
                        $.post(_appsite+'manage/amsrecord/update',{amsLowrecordinId:recordId,pockNo:pockNo,fileState:fileState},function(result){
                            if(result.result){
                                $("#AmsRecordGrid").datagrid('reload');
                                var pockNo=rows[0].pockNo;
                                var recordNum=rows[0].pageNum;
                                $.post(_appsite+'/cfg/amspock/query',{pockNo:pockNo},function (data) {
                                    var pockData=data.rows[0];
                                    var pockId=pockData.amsHighrecordinId;
                                    var havePage=pockData.havePage;
                                    var recordPage=recordNum;
                                    var userNo="";
                                    $.post(_appsite+'/cfg/amspock/update',{amsHighrecordinId:pockId,havePage:havePage-recordPage,userNo:userNo},function (data) {
                                        if (data.result){
                                            $("#AmsRecordGrid").datagrid('reload');
                                            $.messager.show({title : '信息提示',msg : '打散成功'});
                                        }
                                    },"json");
                                },"json");
                            }},"json")
                    }
                }
            });
        }
    }
   }
   if ($("#AmsRecordBorrowForm").length>0) {
       var rowdata=parent.$("#AmsRecordGrid").datagrid('getSelected');
       if (rowdata.fileState=='yjc'){
           $("#zz").attr('checked',false);
           $("#zz").parent("label").hide();
           $("#zz_data").hide();
           $("#dz_data input").validatebox({required: true});
       }else {
           $("#zz_data input").validatebox({required: true});
           $("#dz_data input").validatebox({required: true});
       }
       //借阅时候根据选择的档案类型来改变
       $("#zz").click(function () {
           var isCheck = $(this).prop("checked");
           if (isCheck) {
               $("#zz_data").css({"display": "block"});
               $("#zz_data input").validatebox({required: true});
           } else {
               $("#zz_data").css({"display": "none"});
               $("#zz_data input").validatebox({required: false});
               $("#zz_data #paperStarttime").datetimebox('setValue', '');
               $("#zz_data #paperEndtime").datetimebox('setValue', '');
           }
       });
       $("#zx").click(function () {
           var isCheck = $(this).prop("checked");
           if (isCheck) {
               $("#dz_data").css('display', 'block');
               $("#dz_data input").validatebox({required: true});
           } else {
               $("#dz_data").css('display', 'none');
               $("#dz_data input").validatebox({required: false});
               $("#dz_data #viewStarttime").datetimebox('setValue', '');
               $("#dz_data #viewEndtime").datetimebox('setValue', '');
           }
       });
   }
    //控制档案上的按钮显示
    if ($('#AmsRecordGrid').length>0){
        $('#AmsRecordGrid').datagrid({
            onClickRow:function(index,row){
                //根据盒号,袋号,库位号进行装袋，装盒，借阅的隐藏
                var boxNo=row.boxNo;
                var pockNo=row.pockNo;
                var amsuserType=row.amsuserType;
                var rackNo=row.libNo;
                var fileState=row.fileState;
                //所有按钮全部不可用
                $('#AmsRecordPushPock').linkbutton('disable');
                $('#AmsRecordPushBox').linkbutton('disable');
                $("#AmsRecordBreakUpBox").linkbutton("disable");
                $("#AmsRecordBreakUpPock").linkbutton("disable");
                $('#AmsRecordArchiveBorrow').linkbutton('disable');
                switch (fileState) {
                    case "dzl":
                        $('#AmsRecordPushPock').linkbutton('enable');
                        $('#AmsRecordPushBox').linkbutton('enable');
                        break;
                    case "yzd":
                        if (pockNo!=""){
                            $("#AmsRecordBreakUpPock").linkbutton("enable");
                            if (rackNo!=""){
                                $('#AmsRecordArchiveBorrow').linkbutton('enable');
                            }
                        }
                        break;
                    case "yzh":
                        if (boxNo!=""){
                            $("#AmsRecordBreakUpBox").linkbutton("enable");
                        }
                        break;
                    case "ysj":
                        if (rackNo!=""){
                            $('#AmsRecordArchiveBorrow').linkbutton('enable');
                        }
                        break;
                    case "yjc":
                            $('#AmsRecordArchiveBorrow').linkbutton('enable');
                        break;
                    default :
                        $('#AmsRecordPushPock').linkbutton('disable');
                        $('#AmsRecordPushBox').linkbutton('disable');
                        $("#AmsRecordBreakUpBox").linkbutton("disable");
                        $("#AmsRecordBreakUpPock").linkbutton("disable");
                        $('#AmsRecordArchiveBorrow').linkbutton('disable');
                        break;
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
                    if ($.AmsRecord.selected!=undefined&&beforeIndex==index){
                        $(this).datagrid('unselectRow',index);
                        $.AmsRecord.selected = undefined;
                    }else{
                        $(this).datagrid('clearSelections');
                        $(this).datagrid('options').singleSelect = true;
                        $(this).datagrid('selectRow',index);
                        $.AmsRecord.selected = index;
                    }
                }
            },
            onLoadSuccess:function(data){
                var amsuserType=$("#amsuserType").val();
                if (amsuserType=="1"||amsuserType=="4"){//高压+其他
                    $("#AmsRecordPushPock").hide();
                    $("#AmsRecordBreakUpPock").hide();
                    $('#AmsRecordGrid').datagrid('hideColumn','pockNo');
                }
                if (amsuserType=="2"||amsuserType=="3"){//低压
                    $("#AmsRecordBreakUpBox").hide();
                    $("#AmsRecordPushBox").hide();
                }
                if($.AmsRecord.selected){
                    $(this).datagrid("selectRow",$.AmsRecord.selected);
                }
            },
        });
    }
});

/**
 * 档案借阅
 */
function saveAmsRecordArchiveBorrow() {
        $("#AmsRecordBorrowForm").form("submit", {
            url : _appsite + "/borrow/amsborrowdetail/update",
            success : function(data) {
                if(data!=null){
                    $("#amsRecordArchiveBorrowSave").show();
                    parent.$('#AmsRecordWindow').window('close');
                    parent.$("#AmsRecordGrid").datagrid('reload');
                    parent.$.messager.show({title : '信息提示',msg : '借阅申请已发出'});
                }
            },
            onSubmit:function(){
                var result=true;
                var viewStarttime=$("#viewStarttime").datetimebox('getValue');
                var viewEndtime=$("#viewEndtime").datetimebox('getValue');
                var paperStarttime=$("#paperStarttime").datetimebox('getValue');
                var paperEndtime=$("#paperEndtime").datetimebox('getValue');
                if (moment(viewStarttime)>moment(viewEndtime)) {
                    result=false;
                    $.messager.show({title : '信息提示',msg : '在线浏览的起始时间必须小于结束时间'});
                }
                if (moment(paperStarttime)>moment(paperEndtime)) {
                    result=false;
                    $.messager.show({title : '信息提示',msg : '纸质借阅的起始时间必须小于结束时间'});
                }
                var zz=$("#zz").prop("checked");
                var zx=$("#zx").prop("checked");
                if (zz) {
                    if (!(paperStarttime&&paperEndtime)) {
                        result=false;
                        $.messager.show({title : '信息提示',msg : '纸质借阅的时间不能为空'});
                    }
                }
                if (zx) {
                    if (!(viewStarttime&&viewEndtime)) {
                        result=false;
                        $.messager.show({title : '信息提示',msg : '在线浏览的时间不能为空'});
                    }
                }
                return result;
            }
        });
}
