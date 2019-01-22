jQuery.AmsBorrowManaGrid = {
    column:[[
        {field:'amsBorrowManaId',checkbox:true,hidden:true},
        {field:'formNo',width:100,align:'center',halign:'center',title:'申请单号',sortable: true},
        {field:'borrowDay',width:100,align:'center',halign:'center',title:'借阅天数',sortable: true},
        {field:'borrowStatus',align:'center',halign:'center',title:'审核状态',hidden:true},
        {field:'borrowStatusShowLabel',width:100,align:'left',halign:'center',title:'审核状态',sortable: true},
        {field:'elecStatus',align:'center',halign:'center',title:'电子借阅状态',hidden:true},
        {field:'elecStatusShowLabel',width:100,align:'left',halign:'center',title:'电子借阅状态',sortable: true},
        {field:'paperStatus',align:'center',halign:'center',title:'纸质借阅状态',hidden:true},
        {field:'paperStatusShowLabel',width:100,align:'left',halign:'center',title:'纸质借阅状态',sortable: true},
        {field:'proposer',width:100,align:'center',halign:'center',title:'申请人',sortable: true},
        {field:'subTime',width:100,align:'center',halign:'center',title:'申请时间 ',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'borrowStatus' : $.totemUtils.getQueryValue($(formName+ " [name='borrowStatus']")),
            'noBorrowStatus' : $.totemUtils.getQueryValue($(formName+ " [name='noBorrowStatus']")),
            'noElecStatus' : $.totemUtils.getQueryValue($(formName+ " [name='noElecStatus']")),
            'noPaperStatus' : $.totemUtils.getQueryValue($(formName+ " [name='noPaperStatus']")),

            'formNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowMana_FormNo']")),
            'elecStatus' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowMana_ElecStatus']")),
            'paperStatus' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowMana_PaperStatus']")),
            'proposer' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowMana_Proposer']")),
            'subTime' : $.totemUtils.getQueryValue($(formName+ " [name='amsBorrowMana_SubTime']"))
        }
    }
}
