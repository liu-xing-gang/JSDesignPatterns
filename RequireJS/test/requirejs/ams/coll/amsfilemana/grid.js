jQuery.AmsFileManaGrid = {
    column:[[
        {field:'daglId',checkbox:true,hidden:true},
        {field:'orgNo',width:100,align:'center',halign:'center',title:'所属供电单位',sortable: true},
        {field:'arcNo',width:100,align:'center',halign:'center',title:'档案号',sortable: true},
        {field:'cabinetNo',width:100,align:'center',halign:'center',title:'柜号',sortable: true},
        {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true},
        {field:'consNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true},
        {field:'appNo',width:100,align:'center',halign:'center',title:'业务申请编号',sortable: true},
        {field:'busiClass',align:'center',halign:'center',title:'业务类',hidden:true},
        {field:'busiClassShowLabel',width:100,align:'left',halign:'center',title:'业务类',sortable: true},
        {field:'busiType',align:'center',halign:'center',title:'业务项编码',hidden:true},
        {field:'busiTypeShowLabel',width:100,align:'left',halign:'center',title:'业务项编码',sortable: true},
        {field:'busiItem',align:'center',halign:'center',title:'业务环节编号',hidden:true},
        {field:'busiItemShowLabel',width:100,align:'left',halign:'center',title:'业务环节编号',sortable: true},
        {field:'idType',align:'center',halign:'center',title:'证件类型',hidden:true},
        {field:'idTypeShowLabel',width:100,align:'left',halign:'center',title:'证件类型',sortable: true},
        {field:'secrecyLevel',align:'center',halign:'center',title:'密级',hidden:true},
        {field:'secrecyLevelShowLabel',width:100,align:'left',halign:'center',title:'密级',sortable: true},
        {field:'retention',align:'center',halign:'center',title:'保管期限',hidden:true},
        {field:'retentionShowLabel',width:100,align:'left',halign:'center',title:'保管期限',sortable: true},
        {field:'arcTime',width:100,align:'center',halign:'center',title:'归档时间',sortable: true},
        {field:'arcPer',width:100,align:'center',halign:'center',title:'归档用户'},
        {field:'isArc',align:'center',halign:'center',title:'是否归档',hidden:true},
        {field:'isArcShowLabel',width:100,align:'left',halign:'center',title:'是否归档',sortable: true},
        {field:'hasFile',align:'center',halign:'center',title:'电子文件',hidden:true},
        {field:'hasFileShowLabel',width:100,align:'left',halign:'center',title:'电子文件',sortable: true}
    ]],
    queryParams:function(grid){
        var gridName = grid.selector;
        var formName = gridName.substring(0,gridName.indexOf("Grid")+4)+"SearchForm"
        return {
            'noBusiClass' : $.totemUtils.getQueryValue($(formName+ " [name='noBusiClass']")),
            'noBusiType' : $.totemUtils.getQueryValue($(formName+ " [name='noBusiType']")),
            'busiItem' : $.totemUtils.getQueryValue($(formName+ " [name='busiItem']")),
            'noBusiItem' : $.totemUtils.getQueryValue($(formName+ " [name='noBusiItem']")),
            'idType' : $.totemUtils.getQueryValue($(formName+ " [name='idType']")),
            'noIdType' : $.totemUtils.getQueryValue($(formName+ " [name='noIdType']")),
            'secrecyLevel' : $.totemUtils.getQueryValue($(formName+ " [name='secrecyLevel']")),
            'noSecrecyLevel' : $.totemUtils.getQueryValue($(formName+ " [name='noSecrecyLevel']")),
            'retention' : $.totemUtils.getQueryValue($(formName+ " [name='retention']")),
            'noRetention' : $.totemUtils.getQueryValue($(formName+ " [name='noRetention']")),
            'noHasFile' : $.totemUtils.getQueryValue($(formName+ " [name='noHasFile']")),
            'isArc' : $.totemUtils.getQueryValue($(formName+ " [name='isArc']")),
            'noIsArc' : $.totemUtils.getQueryValue($(formName+ " [name='noIsArc']")),
            'storagePlace' : $.totemUtils.getQueryValue($(formName+ " [name='storagePlace']")),
            'noStoragePlace' : $.totemUtils.getQueryValue($(formName+ " [name='noStoragePlace']")),

            'orgNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_OrgNo']")),
            'arcNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_ArcNo']")),
            'consNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_ConsNo']")),
            'appNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_AppNo']")),
            'busiClass' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_BusiClass']")),
            'busiType' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_BusiType']")),
            'idNo' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_IdNo']")),
            'hasFile' : $.totemUtils.getQueryValue($(formName+ " [name='amsFileMana_HasFile']"))
        }
    }
}
