jQuery.AmsFileContentGrid = {
    column:[[
        {field:'amsFileId',checkbox:true,hidden:true},
        {field:'businessNo',width:100,align:'center',halign:'center',title:'业务id',sortable: true,formatter:function (value, row, index) {
            if (value){
                return row.businessNoShowLabel;
            }else{
                return value;
            }
        }},
        {field:'fileUpload',width:100,align:'center',halign:'center',title:'原文名称',sortable: true},
        {field:'textPlace',width:100,align:'center',halign:'center',title:'原文地址',sortable: true},
        {field:'businessName',width:100,align:'center',halign:'center',title:'业务名称',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'amsFileId' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileId']")),
            'noAmsFileId' : $.totemUtils.getQueryValue($(formName+ " [name='noAmsFileId']")),
            'businessNo' : $.totemUtils.getQueryValue($(formName+ " [name='businessNo']")),
            'noBusinessNo' : $.totemUtils.getQueryValue($(formName+ " [name='noBusinessNo']")),

            'textData' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileContent_TextData']")),
            'businessName' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileContent_BusinessName']"))
        }
    }
}
