$(function(){
    if ($("#fileContentTable").length>0) {
        //查看用户是否有在线浏览的权限
        var businessNo=$("#businessNo").val();
        $.post(_appsite + "/cfg/checkFileContent", {businessNo: businessNo}, function (result) {
            if (result.result) {
                var data = result.data;
                if (data.borrowType.indexOf("zx")!=-1) {//含有电子借阅
                    var endTime = data.viewEndtime;
                    if (endTime) {
                        var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                        if (moment(endTime) < currentTime) {
                            $("#searchBusiness").hide();
                        }
                    }else {
                        $("#searchBusiness").hide();
                    }
                } else {
                    $("#searchBusiness").hide();
                }
            }else{
                $("#searchBusiness").hide();
            }
        }, "json");
        //档案原文列表
        $("#fileContentTable").datagrid({
            url: _appsite + '/cfg/amsfilecontent/query',
            remoteSort: true,
            multiSort: true,
            onBeforeLoad: function (param) {
                param.businessNo = $("#businessNo").val();
            },
            onSelect: function (index, row) {
                if (row.textPlace != "") {
                    $("#searchBusiness").click(function () {
                        var path = row.textPlace;
                        debugger
                        window.open(_appsite + "cfg/index?filename=" + path);
                    });
                }
            },
            onLoadSuccess: function (data) {
                $("#fileContentTable").datagrid('hideColumn', 'textPlace');//隐藏路径列
            },
            columns: $.AmsFileContentGrid.column
        });
    }
});