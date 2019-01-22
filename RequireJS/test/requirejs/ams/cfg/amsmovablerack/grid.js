jQuery.AmsMovableRackGrid = {
    column:[[
        {field:'movableRackId',checkbox:true,hidden:true},
        {field:'rackType',width:100,align:'center',halign:'center',title:'密级柜类型',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.rackTypeShowLabel;
            }else{
                return value;
            }
        }},
        {field:'storageId',width:100,align:'center',halign:'center',title:'库房名称',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.storageIdShowLabel;
            }else{
                return value;
            }
        }},
        {field:'rackName',width:100,align:'center',halign:'center',title:'密集柜名称',sortable: true},
        {field:'groups',width:100,align:'center',halign:'center',title:'列数',sortable: true},
        {field:'section',width:100,align:'center',halign:'center',title:'节数',sortable: true},
        {field:'layer',width:100,align:'center',halign:'center',title:'层数',sortable: true},
        {field:'maxCapacity',width:100,align:'center',halign:'center',title:'单元格最大容量',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noStorageId' : $.totemUtils.getQueryValue($(formName+ " [name='noStorageId']")),
            'rackType' : $.totemUtils.getQueryValue($(formName+ " [name='rackType']")),
            'noRackType' : $.totemUtils.getQueryValue($(formName+ " [name='noRackType']")),

            'storageId' : $.totemUtils.getQueryValue($(formName+ " [name='amsMovableRack_StorageId']")),
            'rackName' : $.totemUtils.getQueryValue($(formName+ " [name='amsMovableRack_RackName']"))
        }
    }
}
