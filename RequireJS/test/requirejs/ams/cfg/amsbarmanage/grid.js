jQuery.AmsBarmanageGrid = {
    column:[[
        {field:'amsBarmanageId',checkbox:true,hidden:true},
        {field:'amsBar',width:100,align:'center',halign:'center',title:'条码',sortable: true},
        {field:'barEnd',width:100,align:'center',halign:'center',title:'止条码号',sortable: true},
        {field:'barType',width:100,align:'center',halign:'center',title:'条码类型',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.barTypeShowLabel;
            }else{
                return value;
            }
        }},
        {field:'barCreater',width:100,align:'center',halign:'center',title:'生成人',sortable: true},
        {field:'createData',width:100,align:'center',halign:'center',title:'生成日期',sortable: true,
        formatter:function(value,row,index){
            if (value!=undefined&&value.length>10){
                return value.substr(0,10)
            }else{
                return value;
            }
        }
        },
        {field:'barNum',width:100,align:'center',halign:'center',title:'条码数量',sortable: true},
        {field:'barBegin',width:100,align:'center',halign:'center',title:'始条码号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noBarType' : $.totemUtils.getQueryValue($(formName+ " [name='noBarType']")),

            'barType' : $.totemUtils.getQueryValue($(formName+ " [name='amsBarmanage_BarType']")),
            'barCreater' : $.totemUtils.getQueryValue($(formName+ " [name='amsBarmanage_BarCreater']")),
            'createData' : $.totemUtils.getQueryValue($(formName+ " [name='amsBarmanage_CreateData']")),
            'barBegin' : $.totemUtils.getQueryValue($(formName+ " [name='amsBarmanage_BarBegin']")),
            'barEnd' : $.totemUtils.getQueryValue($(formName+ " [name='amsBarmanage_BarEnd']"))
        }
    }
}
