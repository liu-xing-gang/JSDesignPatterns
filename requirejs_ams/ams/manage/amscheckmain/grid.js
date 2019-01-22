jQuery.AmsCheckMainGrid = {
    column:[[
        {field:'amsCheckRecordId',checkbox:true,hidden:true},
        {field:'randId',align:'center',halign:'center',title:'密集柜',hidden:true},
        {field:'randIdShowLabel',width:100,align:'left',halign:'center',title:'密集柜',sortable: true},
        {field:'planTime',width:100,align:'center',halign:'center',title:'计划时间',sortable: true},
        {field:'startTime',width:100,align:'center',halign:'center',title:'开始时间',sortable: true},
        {field:'endTime',width:100,align:'center',halign:'center',title:'结束时间',sortable: true},
        {field:'checkUser',width:100,align:'center',halign:'center',title:'盘点人',sortable: true},
        {field:'storageId',align:'center',halign:'center',title:'库房',hidden:true},
        {field:'storageIdShowLabel',width:100,align:'left',halign:'center',title:'库房',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noStorageId' : $.totemUtils.getQueryValue($(formName+ " [name='noStorageId']")),
            'noRandId' : $.totemUtils.getQueryValue($(formName+ " [name='noRandId']")),

            'randId' : $.totemUtils.getQueryValue($(formName+ " [name='amsCheckMain_RandId']")),
            'storageId' : $.totemUtils.getQueryValue($(formName+ " [name='amsCheckMain_StorageId']"))
        }
    }
}
