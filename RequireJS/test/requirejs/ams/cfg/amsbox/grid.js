jQuery.AmsBoxGrid = {
    column:[[
        {field:'amsHighrecordinId',checkbox:true,hidden:true},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'档案盒号',sortable: true},
        {field:'boxBar',width:100,align:'center',halign:'center',title:'盒条码',sortable: true},
        {field:'rfid',width:100,align:'center',halign:'center',title:'RFID',sortable: true},
        {field:'boxType',width:100,align:'center',halign:'center',title:'档案盒类型',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.boxTypeShowLabel;
            }else{
                return value;
            }
        }},
        {field:'boxState',width:100,align:'center',halign:'center',title:'盒状态',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.boxStateShowLabel;
            }else{
                return value;
            }
        }},
        {field:'havePage',width:100,align:'center',halign:'center',title:'已装页数',sortable: true},
        {field:'allPage',width:100,align:'center',halign:'center',title:'可装页数',sortable: true},
        {field:'allJianshu',width:100,align:'center',halign:'center',title:'总件数',sortable: true},
        {field:'userNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'libNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noBoxType' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxType']")),
            'noBoxNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxNo']")),
            'noBoxState' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxState']")),
            'libNo' : $.totemUtils.getQueryValue($(formName+ " [name='libNo']")),
            'noLibNo' : $.totemUtils.getQueryValue($(formName+ " [name='noLibNo']")),
            'boxMh' : $.totemUtils.getQueryValue($(formName+ " [name='boxMh']")),
            'noBoxMh' : $.totemUtils.getQueryValue($(formName+ " [name='noBoxMh']")),

            'boxState' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_BoxState']")),
            'boxBarLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_BoxBar']")),
            'rfidLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_Rfid']")),
            'boxNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_BoxNo']")),
            'userNoLIK' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_UserNo']")),
            'boxType' : $.totemUtils.getQueryValue($(formName+ " [name='amsBox_BoxType']"))
        }
    }
}
