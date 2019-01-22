jQuery.AmsRackNoGrid = {
    column:[[
        {field:'rackNoId',checkbox:true,hidden:true},
        {field:'rackMh',width:100,align:'center',halign:'center',title:'面号',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.rackMhShowLabel;
            }else{
                return value;
            }
        }},
        {field:'movableRack',width:100,align:'center',halign:'center',title:'密集架名称',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.movableRackShowLabel;
            }else{
                return value;
            }
        }},
        {field:'rackNo',width:100,align:'center',halign:'center',title:'档案位编号',sortable: true},
        {field:'fileNum',width:100,align:'center',halign:'center',title:'档案数量',sortable: true},
        {field:'rackGroup',width:100,align:'center',halign:'center',title:'列',sortable: true},
        {field:'rackSection',width:100,align:'center',halign:'center',title:'节',sortable: true},
        {field:'rackLayer',width:100,align:'center',halign:'center',title:'层',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noMovableRack' : $.totemUtils.getQueryValue($(formName+ " [name='noMovableRack']")),
            'rackMh' : $.totemUtils.getQueryValue($(formName+ " [name='rackMh']")),
            'noRackMh' : $.totemUtils.getQueryValue($(formName+ " [name='noRackMh']")),

            'movableRack' : $.totemUtils.getQueryValue($(formName+ " [name='amsRackNo_MovableRack']")),
            'rackNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsRackNo_RackNo']"))
        }
    }
}
