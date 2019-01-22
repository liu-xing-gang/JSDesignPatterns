$(function(){
    $("#myneedcheck").datagrid({
        rownumbers:true,
        singleSelect:true,
        url:_appsite+'/personal/myneedcheck',
        method:'post',
        border:false,
        columns:[[
            {field:'amsNeekCheckId',checkbox:true,hidden:true},
            {field:'isCheck',width:100,align:'center',halign:'center',title:'是否审核',sortable: true,hidden:true},
            {field:'nopassReason',width:100,align:'center',halign:'center',title:'未通过原因',sortable: true,hidden:true},
            {field:'rackNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true,hidden:true},
            {field:'borrowType',align:'center',halign:'center',title:'借阅类型',hidden:true},

            {field:'returnTime',width:100,align:'center',halign:'center',title:'纸质归还时间 ',sortable: true,hidden:true},
            {field:'pockNo',width:100,align:'center',halign:'center',title:'袋号',sortable: true,hidden:true},
            {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true,hidden:true},
            {field:'linkNo',width:100,align:'center',halign:'center',title:'环节号',sortable: true,hidden:true},
            {field:'arcNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true,hidden:true},
            {field:'optionNo',width:100,align:'center',halign:'center',title:'处理人编号',sortable: true,hidden:true},
            {field:'optionName',width:100,align:'center',halign:'center',title:'操作人',sortable: true,hidden:true},
            {field:'checkResult',width:100,align:'center',halign:'center',title:'审批结果',sortable: true,hidden:true},

            {field:'amsOuter',width:95,align:'center',halign:'center',title:'借阅发起人',sortable: true},
            {field:'userType',width:95,align:'center',halign:'center',title:'档案类型',sortable: true},
            {field:'userName',width:95,align:'center',halign:'center',title:'档案用户',sortable: true},
            {field:'borrowTypeShowLabel',width:95,align:'center',halign:'center',title:'借阅类型',sortable: true},
            {field:'viewStarttime',width:150,align:'center',halign:'center',title:'在线浏览开始时间 ',sortable: true},
            {field:'viewEndtime',width:150,align:'center',halign:'center',title:'在线浏览结束时间 ',sortable: true},
            {field:'paperStarttime',width:150,align:'center',halign:'center',title:'纸质开始时间 ',sortable: true},
            {field:'paperEndtime',width:150,align:'center',halign:'center',title:'纸质结束时间 ',sortable: true},
            {field:'Action',width:100,align:'center',halign:'center',title:'操作',sortable: true,
                formatter: function (val,row,index) {
                    var index2=index;
                    return "<a href='####' onclick='openShenpiWindow()'>审批</a>";
                }
            }
        ]]

    });

    $("#myborrow").datagrid({
        rownumbers:true,
        singleSelect:true,
        url:_appsite+'/personal/myborrow',
        method:'post',
        border:false,
        columns:[[
            {field:'amsBorrowDetailId',checkbox:true,hidden:true},
            {field:'userName',width:95,align:'center',halign:'center',title:'用户名称',sortable: true},
            {field:'userType',width:95,align:'center',halign:'center',title:'用户类型',sortable: true},
            {field:'checkResult',width:95,align:'center',halign:'center',title:'审批结果',sortable: true,hidden:false},
            {field:'borrowState',width:95,align:'center',halign:'center',title:'清单状态',sortable: true,hidden:true},
            {field:'borrowType',align:'center',halign:'center',title:'借阅类型',hidden:true},
            {field:'borrowTypeShowLabel',width:95,align:'center',halign:'center',title:'借阅类型',sortable: true},
            {field:'optionName',width:95,align:'center',halign:'center',title:'处理人',sortable: true},
            {field:'viewStarttime',width:150,align:'center',halign:'center',title:'在线浏览开始时间 ',sortable: true},
            {field:'viewEndtime',width:150,align:'center',halign:'center',title:'在线浏览结束时间 ',sortable: true},
            {field:'paperStarttime',width:150,align:'center',halign:'center',title:'纸质开始时间 ',sortable: true},
            {field:'paperEndtime',width:150,align:'center',halign:'center',title:'纸质结束时间 ',sortable: true},

            {field:'nopassReason',width:100,align:'center',halign:'center',title:'未通过原因',sortable: true,hidden:true},
            {field:'rackNo',width:100,align:'center',halign:'center',title:'库位号',sortable: true,hidden:true},
            {field:'outer',width:100,align:'center',halign:'center',title:'借出人',sortable: true,hidden:true},
            {field:'returnTime',width:100,align:'center',halign:'center',title:'纸质归还时间 ',sortable: true,hidden:true},
            {field:'pockNo',align:'center',halign:'center',title:'袋号',hidden:true},
            {field:'pockNoShowLabel',width:100,align:'left',halign:'left',title:'袋号',sortable: true,hidden:true},
            {field:'boxNo',width:100,align:'center',halign:'center',title:'盒号',sortable: true,hidden:true},
            {field:'linkNo',width:100,align:'center',halign:'center',title:'环节号',sortable: true,hidden:true},
            {field:'arcNo',width:100,align:'center',halign:'center',title:'用户编号',sortable: true,hidden:true},
            {field:'optionNo',width:100,align:'center',halign:'center',title:'处理人编号',sortable: true,hidden:true}

        ]]
    });
});
function openShenpiWindow(){
    var row=$("#myneedcheck").datagrid('getSelected');
    var actionType="?actionType=audit&&func=AmsShenpi";
    var title="档案审批";
    var id=row.amsNeekCheckId;
    var win=$("#AmsMyBorrowWindow");
    var height = parent.document.body.clientHeight;
    win.window({
        modal: true,
        height:height * 0.75,
        content:'<iframe src="'+_appsite+'personal/amsneedcheck/edit/'+id+actionType+'" style="border: 0; width: 100%; height: 99%;" frameBorder="0">',
        title: title
    });

}

