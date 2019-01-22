jQuery.AmsRecordGrid = {
    column:[[
        {field:'amsLowrecordinId',checkbox:true,hidden:true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'userName',width:100,align:'center',halign:'center',title:'用户名称',sortable: true},
        {field:'amsuserType',width:100,align:'center',halign:'center',title:'用户类型',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.amsuserTypeShowLabel;
            }else{
                return value;
            }
        }},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true},
        {field:'pockNo',width:100,align:'center',halign:'center',title:'袋号',sortable: true},
        {field:'applicationNo',width:100,align:'center',halign:'center',title:'营销申请编号',sortable: true},
        {field:'fileBar',width:100,align:'center',halign:'center',title:'文件条码',sortable: true},
        {field:'fileName',width:100,align:'center',halign:'center',title:'文件名称',sortable: true},
        {field:'fileState',width:100,align:'center',halign:'center',title:'档案状态',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.fileStateShowLabel;
            }else{
                return value;
            }
        }},
        {field:'libNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'amsuserType' : $.totemUtils.getQueryValue($(formName+ " [name='amsuserType']")),
            'noAmsuserType' : $.totemUtils.getQueryValue($(formName+ " [name='noAmsuserType']")),
            'secretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='secretLevel']")),
            'noSecretLevel' : $.totemUtils.getQueryValue($(formName+ " [name='noSecretLevel']")),
            'boxNo' : $.totemUtils.getQueryValue($(formName+ " [name='boxNo']")),
            'noBoxNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxNo']")),
            'fileState' : $.totemUtils.getQueryValue($(formName+ " [name='fileState']")),
            'noFileState' : $.totemUtils.getQueryValue($(formName+ " [name='noFileState']")),

            'applicationNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsRecord_ApplicationNo']")),
            'powerUnit' : $.totemUtils.getQueryValue($(formName+ " [name='amsRecord_PowerUnit']")),
            'userNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsRecord_UserNo']")),
            'userName' : $.totemUtils.getQueryValue($(formName+ " [name='amsRecord_UserName']")),
            'fileBar' : $.totemUtils.getQueryValue($(formName+ " [name='amsRecord_FileBar']"))
        }
    }
}
