jQuery.AmsAddressGrid = {
    column:[[
        {field:'amsAddressId',checkbox:true,hidden:true},
        {field:'rackNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.rackNoShowLabel;
            }else{
                return value;
            }
        }},
        {field:'amsRackno',width:100,align:'center',halign:'center',title:'档案位编号',sortable: true},
        {field:'amsRackstate',width:100,align:'center',halign:'center',title:'档案位状态',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.amsRackstateShowLabel;
            }else{
                return value;
            }
        }}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'rackNo' : $.totemUtils.getQueryValue($(formName+ " [name='rackNo']")),
            'noRackNo' : $.totemUtils.getQueryValue($(formName+ " [name='noRackNo']")),
            'amsRackstate' : $.totemUtils.getQueryValue($(formName+ " [name='amsRackstate']")),
            'noAmsRackstate' : $.totemUtils.getQueryValue($(formName+ " [name='noAmsRackstate']")),
        }
    }
}
