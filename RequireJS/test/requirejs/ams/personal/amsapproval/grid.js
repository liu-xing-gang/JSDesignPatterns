jQuery.AmsApprovalGrid = {
    column:[[
        {field:'amsApprovalId',checkbox:true,hidden:true}

    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {}
    }
}
