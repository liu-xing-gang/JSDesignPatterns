jQuery.AmsBusinessGrid = {
    column:[[
        {field:'amsBussionessId',checkbox:true,hidden:true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'businessType',width:100,align:'center',halign:'center',title:'业务类',sortable: true},
        {field:'businessLineno',width:100,align:'center',halign:'center',title:'业务环节编号',sortable: true},
        {field:'businessItemno',width:100,align:'center',halign:'center',title:'业务项编码',sortable: true},
        {field:'businessNo',width:100,align:'center',halign:'center',title:'业务申请编号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'userNo' : $.totemUtils.getQueryValue($(formName+ " [name='userNo']")),
            'noUserNo' : $.totemUtils.getQueryValue($(formName+ " [name='noUserNo']")),

            'businessData' : $.totemUtils.getQueryValue($(formName+ " [name='amsBusiness_BusinessData']")),
            'businessType' : $.totemUtils.getQueryValue($(formName+ " [name='amsBusiness_BusinessType']"))
        }
    }
}
