jQuery.AmsInventoryGrid = {
    column:[[
        {field:'id',checkbox:true,hidden:true},
        {field:'kh',width:100,align:'center',halign:'center',title:'库号',sortable: true},
        {field:'zh',width:100,align:'center',halign:'center',title:'组号',sortable: true},
        {field:'lh',width:100,align:'center',halign:'center',title:'列号',sortable: true},
        {field:'mh',width:100,align:'center',halign:'center',title:'面号',sortable: true},
        {field:'jh',width:100,align:'center',halign:'center',title:'节号',sortable: true},
        {field:'ch',width:100,align:'center',halign:'center',title:'层号',sortable: true},
        {field:'wh',width:100,align:'center',halign:'center',title:'位置号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'kh' : $.totemUtils.getQueryValue($(formName+ " [name='amsInventory_Kh']")),
            'zh' : $.totemUtils.getQueryValue($(formName+ " [name='amsInventory_Zh']"))
        }
    }
}
