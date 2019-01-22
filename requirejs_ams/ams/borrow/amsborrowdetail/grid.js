jQuery.AmsBorrowDetailGrid = {
    column:[[
        {field:'amsBorrowDetailId',checkbox:true,hidden:true},
        {field:'amsOuter',width:100,align:'center',halign:'center',title:'借阅发起人'},
        {field:'userName',width:100,align:'center',halign:'center',title:'用户名称',sortable: true},
        {field:'userType',width:100,align:'center',halign:'center',title:'用户类型',sortable: true},
        {field:'borrowType',width:100,align:'center',halign:'center',title:'借阅类型',sortable: false,formatter:function (value, row, index) {
            if (value){
                if (value.indexOf(",")<0){
                    return row.borrowTypeShowLabel;
                }else{
                    value+=",";
                    var json = $.totemUtils.getTypeCode("BORROW_TYPE");
                    for (var i=0;i<json.length;i++){
                        value = value.replace(json[i].codeValue+",",json[i].codeLabel+",");
                    }
                    return value.substring(0, value.lastIndexOf(','));
                }
            }
        }},
        {field:'linkName',width:100,align:'center',halign:'center',title:'环节名称',sortable: true},
        {field:'optionName',width:100,align:'center',halign:'center',title:'操作人',sortable: true},
        {field:'checkResult',width:100,align:'center',halign:'center',title:'审批结果',sortable: true},
        {field:'borrowState',width:100,align:'center',halign:'center',title:'清单状态',sortable: true},
        {field:'nopassReason',width:100,align:'center',halign:'center',title:'未通过原因',sortable: true},
        {field:'viewStarttime',width:100,align:'center',halign:'center',title:'在线浏览开始时间 ',sortable: true},
        {field:'viewEndtime',width:100,align:'center',halign:'center',title:'在线浏览结束时间 ',sortable: true},
        {field:'paperStarttime',width:100,align:'center',halign:'center',title:'纸质开始时间 ',sortable: true},
        {field:'paperEndtime',width:100,align:'center',halign:'center',title:'纸质结束时间 ',sortable: true},
        {field:'returnTime',width:100,align:'center',halign:'center',title:'纸质归还时间 ',sortable: true},
        {field:'pockNo',width:100,align:'center',halign:'center',title:'袋号',sortable: true},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true},
        {field:'rackNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'borrowType' : $.totemUtils.getQueryValue($(formName+ " [name='borrowType']")),
            'noBorrowType' : $.totemUtils.getQueryValue($(formName+ " [name='noBorrowType']")),

            'amsOuter' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowDetail_AmsOuter']")),
            'returnTime' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowDetail_ReturnTime']"))
        }
    }
}
