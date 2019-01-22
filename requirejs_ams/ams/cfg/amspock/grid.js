jQuery.AmsPockGrid = {
    column:[[
        {field:'amsHighrecordinId',checkbox:true,hidden:true},
        {field:'pockNo',width:100,align:'center',halign:'center',title:'袋号',sortable: true},
        {field:'boxBar',width:100,align:'center',halign:'center',title:'袋条码',sortable: true},
        {field:'boxState',width:100,align:'center',halign:'center',title:'袋状态',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.boxStateShowLabel;
            }else{
                return value;
            }
        }},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'档案盒号',sortable: true},
        {field:'rfid',width:100,align:'center',halign:'center',title:'RFID',sortable: true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'havePage',width:100,align:'center',halign:'center',title:'已装页数',sortable: true},
        {field:'allPage',width:100,align:'center',halign:'center',title:'可装页数',sortable: true},
        {field:'libNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'boxState' : $.totemUtils.getQueryValue($(formName+ " [name='boxState']")),
            'noBoxState' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxState']")),
            'libNo' : $.totemUtils.getQueryValue($(formName+ " [name='libNo']")),
            'noLibNo' : $.totemUtils.getQueryValue($(formName+ " [name='noLibNo']")),
            'boxNo' : $.totemUtils.getQueryValue($(formName+ " [name='boxNo']")),
            'noBoxNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxNo']")),

            'rfidLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsPock_Rfid']")),
            'userNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsPock_UserNo']")),
            'boxBarLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsPock_BoxBar']")),
            'pockNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsPock_PockNo']"))
        }
    }
}
