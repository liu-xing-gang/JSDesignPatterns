jQuery.AmsFileGrid = {
    column:[[
        {field:'amsFileId',checkbox:true,hidden:true},
        { field:'fileUpload',width:100,align:'center',halign:'center',title:'原文',
        formatter: function(value,row,index){
            if (row.fileUpload){
                if ($.totemUtils.getFileType(row.fileUpload)=="img"){
                    return '<img src="' + _imagesite + row.fileUpload.replace("."+$.totemUtils.getFileSuffix(row.fileUpload),"") +'_100x100.jpg"/>';

                }else{
                    return '<a  href="' + _imagesite + row.fileUpload +'">点击下载</a>';
                }
            } else {
                return value;
            }
        }
        }
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'amsFileId' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileId']")),
            'noAmsFileId' : $.totemUtils.getQueryValue($(formName+ " [name='noAmsFileId']")),
        }
    }
}
