jQuery.AmsLowrecordinGrid = {
    column:[[
        {field:'amsLowrecordinId',checkbox:true,hidden:true},
        {field:'fileBar',width:100,align:'center',halign:'center',title:'文件条码',sortable: true},
        {field:'fileName',width:100,align:'center',halign:'center',title:'文件名称',sortable: true},
        {field:'applicationNo',width:100,align:'center',halign:'center',title:'营销申请编号',sortable: true},
        {field:'userName',width:100,align:'center',halign:'center',title:'用户名称',sortable: true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'userType',align:'center',halign:'center',title:'低压用户类型',hidden:true},
        {field:'userTypeShowLabel',width:100,align:'left',halign:'center',title:'低压用户类型',sortable: true},
        {field:'boxNo',align:'center',halign:'center',title:'袋号',hidden:true},
        {field:'boxNoShowLabel',width:100,align:'left',halign:'left',title:'袋号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'boxNo' : $.totemUtils.getQueryValue($(formName+ " [name='boxNo']")),
            'noBoxNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxNo']")),
            'businessNo' : $.totemUtils.getQueryValue($(formName+ " [name='businessNo']")),
            'noBusinessNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBusinessNo']")),
            'userType' : $.totemUtils.getQueryValue($(formName+ " [name='userType']")),
            'noUserType' : $.totemUtils.getQueryValue($(formName+ " [name='noUserType']")),
            'secretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='secretLevel']")),
            'noSecretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='noSecretLevel']")),

            'applicationNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsLowrecordin_ApplicationNo']")),
            'powerUnit' : $.totemUtils.getQueryValue($(formName+ " [name='amsLowrecordin_PowerUnit']")),
            'userNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsLowrecordin_UserNo']")),
            'userName' : $.totemUtils.getQueryValue($(formName+ " [name='amsLowrecordin_UserName']")),
            'fileBar' : $.totemUtils.getQueryValue($(formName+ " [name='amsLowrecordin_FileBar']"))
        }
    }
}
