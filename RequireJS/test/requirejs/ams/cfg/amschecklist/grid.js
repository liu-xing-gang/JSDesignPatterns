jQuery.AmsChecklistGrid = {
    column:[[
        {field:'amsChecklistId',checkbox:true,hidden:true},
        {field:'checkType',align:'center',halign:'center',title:'借阅类型',hidden:true},
        {field:'checkTypeShowLabel',width:100,align:'left',halign:'center',title:'借阅类型',sortable: true},
        {field:'checkBegin',width:100,align:'center',halign:'center',title:'借阅起始时间',sortable: true},
        {field:'checkEnd',width:100,align:'center',halign:'center',title:'借阅结束时间',sortable: true},
        {field:'checkUse',width:100,align:'left',halign:'center',title:'借阅用途',formatter:$.totemUtils.columnTip},
        {field:'checkUser',width:100,align:'center',halign:'center',title:'借阅人',sortable: true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'档案用户',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noCheckType' : $.totemUtils.getQueryValue($(formName+ " [name='noCheckType']")),

            'userNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_UserNo']")),
            'checkType' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_CheckType']")),
            'checkBegin' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_CheckBegin']")),
            'checkEnd' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_CheckEnd']")),
            'checkUse' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_CheckUse']")),
            'checkUser' : $.totemUtils.getQueryValue($(formName+ " [name='amsChecklist_CheckUser']"))
        }
    }
}
