jQuery.AmsHighrecordinGrid = {
    column:[[
        {field:'amsHighrecordinId',checkbox:true,hidden:true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'userName',width:100,align:'center',halign:'center',title:'用户名称',sortable: true},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.boxNoShowLabel;
            }else{
                return value;
            }
        }},
        {field:'applicationNo',width:100,align:'center',halign:'center',title:'营销申请编号',sortable: true},
        {field:'fileBar',width:100,align:'center',halign:'center',title:'文件条码',sortable: true},
        {field:'fileName',width:100,align:'center',halign:'center',title:'文件名称',sortable: true},
        {field:'libNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'boxNo' : $.totemUtils.getQueryValue($(formName+ " [name='boxNo']")),
            'noBoxNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxNo']")),
            'businessNo' : $.totemUtils.getQueryValue($(formName+ " [name='businessNo']")),
            'noBusinessNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBusinessNo']")),
            'secretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='secretLevel']")),
            'noSecretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='noSecretLevel']")),

            'applicationNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsHighrecordin_ApplicationNo']")),
            'powerUnit' : $.totemUtils.getQueryValue($(formName+ " [name='amsHighrecordin_PowerUnit']")),
            'userNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsHighrecordin_UserNo']")),
            'userName' : $.totemUtils.getQueryValue($(formName+ " [name='amsHighrecordin_UserName']")),
            'fileBar' : $.totemUtils.getQueryValue($(formName+ " [name='amsHighrecordin_FileBar']"))
        }
    }
}
