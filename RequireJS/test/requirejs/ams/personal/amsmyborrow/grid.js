jQuery.AmsMyBorrowGrid = {
    column:[[
        {field:'amsMyborrowId',checkbox:true,hidden:true},
        {field:'borrowType',align:'center',halign:'center',title:'借阅类型',hidden:true},
        {field:'borrowTypeShowLabel',width:100,align:'left',halign:'center',title:'借阅类型',sortable: true},
        {field:'borrowStatus',align:'center',halign:'center',title:'借阅状态',hidden:true},
        {field:'borrowStatusShowLabel',width:100,align:'left',halign:'center',title:'借阅状态',sortable: true},
        {field:'arcNo',width:100,align:'center',halign:'center',title:'档案号',sortable: true},
        {field:'consNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'appNo',width:100,align:'center',halign:'center',title:'业务申请编号',sortable: true},
        {field:'busiClass',width:100,align:'center',halign:'center',title:'业务类',sortable: true},
        {field:'busiType',width:100,align:'center',halign:'center',title:'业务项编码',sortable: true},
        {field:'busiItem',width:100,align:'center',halign:'center',title:'业务环节编号',sortable: true},
        {field:'arcPer',width:100,align:'center',halign:'center',title:'归档人',sortable: true},
        {field:'arcTime',width:100,align:'center',halign:'center',title:'归档时间',sortable: true},
        {field:'borrowTime',width:100,align:'center',halign:'center',title:'借阅时间',sortable: true},
        {field:'borrowDay',width:100,align:'center',halign:'center',title:'借阅时长',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'borrowStatus' : $.totemUtils.getQueryValue($(formName+ " [name='borrowStatus']")),
            'noBorrowStatus' : $.totemUtils.getQueryValue($(formName+ " [name='noBorrowStatus']")),
            'noBorrowType' : $.totemUtils.getQueryValue($(formName+ " [name='noBorrowType']")),

            'borrowTypes' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_BorrowTypes[]']")),
            'consNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_ConsNo']")),
            'appNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_AppNo']")),
            'busiClass' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_BusiClass']")),
            'busiType' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_BusiType']")),
            'arcNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsMyBorrow_ArcNo']"))
        }
    }
}
