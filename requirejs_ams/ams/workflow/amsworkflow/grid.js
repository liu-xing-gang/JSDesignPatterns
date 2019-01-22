jQuery.AmsWorkflowGrid = {
    column:[[
        {field:'amsWorkflowId',checkbox:true,hidden:true},
        {field:'flowType',align:'center',halign:'center',title:'流程类型',hidden:true},
        {field:'flowTypeShowLabel',width:100,align:'left',halign:'center',title:'流程类型',sortable: true},
        {field:'flowName',width:100,align:'center',halign:'center',title:'流程名称',sortable: true},
        {field:'flowScope',align:'center',halign:'center',title:'适用范围',hidden:true},
        {field:'flowScopeShowLabel',width:100,align:'left',halign:'center',title:'适用范围',sortable: true},
        {field:'isUsed',align:'center',halign:'center',title:'启用',hidden:true},
        {field:'isUsedShowLabel',width:100,align:'left',halign:'center',title:'启用',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noFlowType' : $.totemUtils.getQueryValue($(formName+ " [name='noFlowType']")),
            'noFlowScope' : $.totemUtils.getQueryValue($(formName+ " [name='noFlowScope']")),
            'isUsed' : $.totemUtils.getQueryValue($(formName+ " [name='isUsed']")),
            'noIsUsed' : $.totemUtils.getQueryValue($(formName+ " [name='noIsUsed']")),

            'flowType' : $.totemUtils.getQueryValue($(formName+ " [name='amsWorkflow_FlowType']")),
            'flowName' : $.totemUtils.getQueryValue($(formName+ " [name='amsWorkflow_FlowName']")),
            'flowScope' : $.totemUtils.getQueryValue($(formName+ " [name='amsWorkflow_FlowScope']"))
        }
    }
}
