jQuery.AmsCheckRecordGrid = {
    column:[[
        {field:'amsCheckRecordId',checkbox:true,hidden:true},
        {field:'rackId',align:'center',halign:'center',title:'档案位',hidden:true},
        {field:'rackIdShowLabel',width:100,align:'left',halign:'center',title:'档案位',sortable: true},
        {field:'archiveId',align:'center',halign:'center',title:'档案',hidden:true},
        {field:'archiveIdShowLabel',width:100,align:'left',halign:'left',title:'档案',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noRackId' : $.totemUtils.getQueryValue($(formName+ " [name='noRackId']")),

            'archiveId' : $.totemUtils.getQueryValue($(formName+ " [name='amsCheckRecord_ArchiveId']")),
            'rackId' : $.totemUtils.getQueryValue($(formName+ " [name='amsCheckRecord_RackId']"))
        }
    }
}
