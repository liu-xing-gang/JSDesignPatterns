jQuery.AmsLinkGrid = {
    column:[[
        {field:'amsWorkflowId',checkbox:true,hidden:true},
        {field:'linkNo',width:100,align:'center',halign:'center',title:'环节编号',sortable: true},
        {field:'linkName',width:100,align:'center',halign:'center',title:'环节名称',sortable: true},
        {field:'doMode',align:'center',halign:'center',title:'处理方式',hidden:true},
        {field:'doModeShowLabel',width:100,align:'left',halign:'center',title:'处理方式',sortable: true},
        {field:'doUser',width:100,align:'center',halign:'center',title:'处理人',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noDoMode' : $.totemUtils.getQueryValue($(formName+ " [name='noDoMode']")),
            'doFunction' : $.totemUtils.getQueryValue($(formName+ " [name='doFunction']")),
            'noDoFunction' : $.totemUtils.getQueryValue($(formName+ " [name='noDoFunction']")),

            'doMode' : $.totemUtils.getQueryValue($(formName+ " [name='amsLink_DoMode']")),
            'linkName' : $.totemUtils.getQueryValue($(formName+ " [name='amsLink_LinkName']"))
        }
    }
}
