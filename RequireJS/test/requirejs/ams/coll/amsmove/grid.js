jQuery.AmsMoveGrid = {
    column:[[
        {field:'amsMoveId',checkbox:true,hidden:true},
        {field:'hallName',align:'center',halign:'center',title:'档案馆名称',hidden:true},
        {field:'hallNameShowLabel',width:100,align:'left',halign:'center',title:'档案馆名称',sortable: true},
        {field:'storageName',align:'center',halign:'center',title:'档案库房名称',hidden:true},
        {field:'storageNameShowLabel',width:100,align:'left',halign:'center',title:'档案库房名称',sortable: true},
        {field:'storage',align:'center',halign:'center',title:'密集架名称',hidden:true},
        {field:'storageShowLabel',width:100,align:'left',halign:'center',title:'密集架名称',sortable: true},
        {field:'column',width:100,align:'center',halign:'center',title:'列',sortable: true},
        {field:'section',width:100,align:'center',halign:'center',title:'节',sortable: true},
        {field:'layer',width:100,align:'center',halign:'center',title:'层',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noHallName' : $.totemUtils.getQueryValue($(formName+ " [name='noHallName']")),
            'noStorageName' : $.totemUtils.getQueryValue($(formName+ " [name='noStorageName']")),
            'noStorage' : $.totemUtils.getQueryValue($(formName+ " [name='noStorage']")),

            'hallName' : $.totemUtils.getQueryValue($(formName+ " [name='amsMove_HallName']")),
            'storageName' : $.totemUtils.getQueryValue($(formName+ " [name='amsMove_StorageName']")),
            'storage' : $.totemUtils.getQueryValue($(formName+ " [name='amsMove_Storage']"))
        }
    }
}
