$(function(){
    //add module's function here!
    //给AmsFlowLinkGrid添加行号列，添加toolbar
        if ($('#AmsFlowLinkGrid').length>0) {
            $('#AmsFlowLinkGrid').datagrid({
                rownumbers:true,
                sortName:'linkNo',
                sortOrder:'asc',
                toolbar: [{
                    iconCls: 'icon-up',
                    text:'上移',
                    handler: function(){
                        var selectrow=$('#AmsFlowLinkGrid').datagrid('getSelected');
                        var rowIndex=$('#AmsFlowLinkGrid').datagrid('getRowIndex', selectrow);
                        if(rowIndex==0){
                            $.messager.show({title : '信息提示',msg : '第一行无法上移'});
                        }else{
                            changeRow(true);
                        }
                    }
                },'-',{
                    iconCls: 'icon-down',
                    text:'下移',
                    handler: function(){
                        var selectrow=$('#AmsFlowLinkGrid').datagrid('getSelected');
                        var rowIndex=$('#AmsFlowLinkGrid').datagrid('getRowIndex', selectrow);
                        var rows=$('#AmsFlowLinkGrid').datagrid('getRows');
                        var rowlength=rows.length;
                        if(rowIndex==rowlength-1){
                            $.messager.show({title : '信息提示',msg : '最后一行无法下移'});
                        }else{
                            changeRow(false);
                        }

                    }
                }]
            });
        }
});
function changeRow(isup){
    //所有行
    var rows=$('#AmsFlowLinkGrid').datagrid('getRows');
    //总行数
    var rowlength=rows.length;
    //当前行
    var selectrow=$('#AmsFlowLinkGrid').datagrid('getSelected');
    var rowIndex=$('#AmsFlowLinkGrid').datagrid('getRowIndex', selectrow);
    //下一行
    var nextIndex=rowIndex+1;
    var nexrow=rows[nextIndex];
    //上一行
    var prevIndex=rowIndex-1;
    var prevrow=rows[prevIndex];
    var linkNo="";
    if (isup){//上移动
        $('#AmsFlowLinkGrid').datagrid('deleteRow', rowIndex);//删除一行
        rowIndex=rowIndex-1;
        $('#AmsFlowLinkGrid').datagrid('insertRow', {
            index:rowIndex,
            row:selectrow
        });
        $("#AmsFlowLinkGrid").datagrid("updateRow", {
            index: prevIndex, //行索引
            row: {
                linkNo:prevIndex+1  //行中的某个字段
            }
        })
        $('#AmsFlowLinkGrid').datagrid('selectRow', rowIndex);
        $("#AmsFlowLinkGrid").datagrid("updateRow",{
            index:nextIndex-1,
            row:{
                linkNo:nextIndex
            }
        });
    }
    if(!isup){//下移
        $('#AmsFlowLinkGrid').datagrid('deleteRow', rowIndex);//删除一行
        rowIndex=rowIndex+1;
        $('#AmsFlowLinkGrid').datagrid('insertRow', {
            index:rowIndex,
            row:selectrow
        });
        $("#AmsFlowLinkGrid").datagrid("updateRow", {
            index: nextIndex, //行索引
            row: {
                linkNo:nextIndex+1  //行中的某个字段
            }
        })
        $('#AmsFlowLinkGrid').datagrid('selectRow', rowIndex);
        nextIndex=nextIndex-1;
        $("#AmsFlowLinkGrid").datagrid("updateRow",{
            index:nextIndex,
            row:{
                linkNo:nextIndex+1
            }
        });

    }
    //修改所选行
    var id=selectrow.amsFlowLinkId;
    var updateId="";
    var updateLink="";
    if (isup){
        linkNo=prevIndex+1;
        updateId=prevrow.amsFlowLinkId;
        updateLink=nextIndex;
    }
    if (!isup){
        linkNo=rowIndex+1;
        updateId=nexrow.amsFlowLinkId;
        updateLink=nextIndex+1;
    }
    $.post(_appsite+"/workflow/amsflowlink/update",{amsFlowLinkId:id,linkNo:linkNo},function (result) {
        if (result.result){
             $.post(_appsite+"/workflow/amsflowlink/update",{amsFlowLinkId:updateId,linkNo:updateLink},function (result) {},"json");
        }
    },"json");

}