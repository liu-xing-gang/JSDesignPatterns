jQuery.AmsFlowLinkGrid = {
    column:[[
        {field:'amsFlowLinkId',checkbox:true,hidden:true},
        {field:'linkNo',width:100,align:'center',halign:'center',title:'环节编号',sortable: true},
        {field:'linkName',width:100,align:'center',halign:'center',title:'环节名称',sortable: true},
        {field:'doUser',align:'center',halign:'center',title:'处理人',sortable: true},
        {field:'linkDes',width:100,align:'left',halign:'center',title:'环节描述',formatter:$.totemUtils.columnTip}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'amsWorkflowId' : $.totemUtils.getQueryValue($(formName+ " [name='amsWorkflowId']")),
            'noAmsWorkflowId' : $.totemUtils.getQueryValue($(formName+ " [name='noAmsWorkflowId']")),
            'doUser' : $.totemUtils.getQueryValue($(formName+ " [name='doUser']")),
            'noDoUser' : $.totemUtils.getQueryValue($(formName+ " [name='noDoUser']")),
            'doFunction' : $.totemUtils.getQueryValue($(formName+ " [name='doFunction']")),
            'noDoFunction' : $.totemUtils.getQueryValue($(formName+ " [name='noDoFunction']")),

            'linkName' : $.totemUtils.getQueryValue($(formName+ " [name='amsFlowLink_LinkName']"))
        }
    }
}
