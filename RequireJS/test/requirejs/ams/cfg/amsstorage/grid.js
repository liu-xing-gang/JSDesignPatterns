jQuery.AmsStorageGrid = {
    column:[[
        {field:'storageId',checkbox:true,hidden:true},
        {field:'hallName',width:100,align:'center',halign:'center',title:'档案馆名称',sortable: true},
        {field:'storageName',width:100,align:'center',halign:'center',title:'库房名称',sortable: true},
        {field:'address',width:100,align:'center',halign:'center',title:'地址',sortable: true},
        {field:'phone',width:100,align:'center',halign:'center',title:'电话',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'hallName' : $.totemUtils.getQueryValue($(formName+ " [name='amsStorage_HallName']")),
            'storageName' : $.totemUtils.getQueryValue($(formName+ " [name='amsStorage_StorageName']"))
        }
    }
}
