function saveAmsFile() {
    $("#amsFileSave").hide();
    var grid = undefined;
    if (parent.$.AmsFile){
        grid = parent.$.AmsFile.currentGrid;
    }else if (parent.currentGrid){
        grid = parent.currentGrid;
    }
    if ($("#actionType").val()=="copy"){
        $("#amsFileId").val("");
    }

    if ($("#actionType").val()=="auth"){
        $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        var formData = $("#AmsFileForm").serialize();
        $.post(_appsite + "coll/amsfile/auth/update",formData,function(result){
            if (result.result) {
                $.get(_appsite+"common/authority/changed");
                parent.$.messager.show({title : '信息提示',msg : '成功'});
                if (grid.selector.indexOf("Tree")>0){
                    grid.treegrid("reload");
                }else{
                    grid.datagrid('reload');
                }
                parent.$('#AmsFileWindow').window('close');
            } else {
                $.messager.show({
                    title : 'Error',
                    msg : result.msg
                });
                $("#amsFileSave").show();
            }
            $.messager.progress("close");
        });
    }else{
        $("#AmsFileForm").form("submit", {
            url : _appsite + "coll/amsfile/update",
            success : function(result) {
                try{
                    var result = eval('(' + result + ')');
                    if (result.result) {
                        if (grid){
                            if (grid.selector.indexOf("Tree")>0){
                                grid.treegrid("reload");
                            }else{
                                grid.datagrid('reload');
                            }
                            parent.$('#AmsFileWindow').window('close');
                        }else{
                            $.messager.show({
                                title : '提示信息',
                                msg : "原文管理保存成功！"
                            });
                        }
                    } else {
                        $.messager.show({
                            title : 'Error',
                            msg : result.msg
                        });
                        $("#amsFileSave").show();
                    }
                }catch (e){
                    parent.$('#AmsFileWindow').window('close');
                }
                $.messager.progress("close");
            },
            onSubmit:function(){
                if (!$(this).form('validate')){
                    $.messager.progress("close");
                    $("#amsFileSave").show();
                    return false;
                }
            }
        });
    }
}

$.AmsFileUploader = {
    pics:[],
    opts:{
        picker : 'amsFile_picker',// 上传按钮
        uploaderProgressar : 'uploader-progress-bar',
        uploadSuccess : function(file, response) {
            var that = this;
            var isDelete = false;
            if (file.getStatus() == 'complete') {// 上传完成
            if (response.code == 200) {// 服务端返回成功
            var $picsDom = $("#amsFileImgs");
            var pic = {imgTid:file.id,"fileName":file.name,"fileUrl":response.fileName,"imgType":file.type,"imgSize":file.size,"resId":response.resId};
            $.AmsFileUploader.pics.push(pic);
            $picsDom.val(JSON.stringify($.AmsFileUploader.pics));
            $("#amsFile_filelist").append($.AmsFileUploader.showPic(pic.fileUrl,pic.fileName,pic.resId));
            }
            }
            return isDelete;
        },
        // 验证出错
        validateError : function(status) {
            console.log(status);
        },
        uploadComplete : function(status, file, response) {
            return false;
        }
    },
    showPic:function(url,name,id){
        return "<li id=\"\">"
        +"<p class=\"title\">"+name+"</p>"
        +"<p class=\"imgWrap\">"
        +"<img src=\""+_imagesite+url+"\"></p>"
        +"<p class=\"progress\"><span></span></p>"
        +"<div class=\"file-panel\">"
        +"<span class=\"cancel\" data-id=\""+id+"\">删除</span>"
        +"</div>"
        +"</li>";
    },
    bindEvent:function(){
        $(".filelist").on("click",".cancel",function(){
            var pics = $.AmsFileUploader.pics;
            for(var i = 0;i<pics.length;i++){
                if($(this).data("id") == pics[i].resId || $(this).data("id") == pics[i].resId){
                    pics.splice(i,1);
                    break;
                }
            }
            $("#amsFileImgs").val(JSON.stringify(pics));
            $(this).parents("li").remove()
        })

        $(".filelist").on("mouseenter","li",function(){
            $(this).find(".file-panel").animate({height: 30});

        }).on("mouseleave","li",function(){
            $(this).find(".file-panel").animate({height: 0});
        })
    }
}

var uploader = (function() {
    var upload;
    return function() {
        if (upload) {
            upload.destroy();
        }
        upload = $.createUploader($.AmsFileUploader.opts);
        $.AmsFileUploader.bindEvent();
        return upload;
    }
})();

$.AmsFileFileUploadUpload = {
    opts:{
        picker : 'fileUpload_Picker',// 上传按钮
        uploaderProgressar : 'uploader-progress-bar',
        uploadSuccess : function(file, response) {
            var that = this;
            var isDelete = false;
            // 上传完成
            if (file.getStatus() == 'complete') {
                // 服务端返回成功
                if (response.code == 200) {
                    var pic = {imgTid:response.resId,"imgName":file.name,"fileUrl":response.fileName,"imgType":file.type,"imgSize":file.size};
                    $("#fileUpload").val(pic.fileUrl);//设置隐藏域的值
                    if ($.totemUtils.getFileType(pic.imgName)=="img"){
                        var html = "<img style=\"height:100px\"  src=\""+_imagesite+pic.fileUrl+"\">" +
                        "<div class=\"singlefilepanel\"><span onclick=\"$.AmsFileFileUploadUpload.deleteImg()\" class=\"cancel\">删除</span></div>";
                        $("#fileUpload_Info").html(html);
                    }else{
                        $("#fileUpload_Info").html("<a href=\""+_imagesite+pic.imgName+"\">点击下载</a><a onclick=\"$.AmsFileFileUploadUpload.deleteImg()\" href=\"javascript:;\">删除</a>");
                    }
                }
            }
            return isDelete;
        },
        // 验证出错
        validateError : function(status) {
            console.log(status);
        },
        uploadComplete : function(status, file, response) {
            return false;
        }
    },deleteImg:function(){
        $("#fileUpload").val("");
        $("#fileUpload_Info").html("");
    }
}
var fileUploadUploader = (function() {
    var fileUploadUpload;
    return function() {
        if (fileUploadUpload) {
            fileUploadUpload.destroy();
        }
        fileUploadUpload = $.createUploader($.AmsFileFileUploadUpload.opts);
        return fileUploadUpload;
    }
})();

function changeAmsFileValue(parent,data){
    if ($.t_coll!=undefined&&$.t_coll.onChange!=undefined){
        if (!$.t_coll.onChange("AmsFile_"+parent,data)){
            return;
        }
    }
}
$(function() {
    $("#AmsFileForm").form({
        onSubmit : function() {
            if ($("#actionType").val()!="auth"){
                return $(this).form("validate");
            }
            if(uploader&& uploader.isInProgress()){
                $.messager.show({
                    title : 'Error',
                    msg : "文件正在上传中..."
                });
                return false;
            }
            $.messager.progress({ title:'请稍后',msg:'数据保存中...'});
        }
    });

    $("#AmsFileForm").form(
        {onLoadSuccess:function(data){
            if($("#fileUpload").val()){
                if ($.totemUtils.getFileType($("#fileUpload").val())=="img"){
                    var html = "<img style=\"height:100px\"  src=\""+_imagesite+$("#fileUpload").val()+"\">" +
                    "<div class=\"singlefilepanel\"><span onclick=\"$.AmsFileFileUploadUpload.deleteImg()\" class=\"cancel\">删除</span></div>";
                    $("#fileUpload_Info").html(html);
                }else{
                    $("#fileUpload_Info").html("<a href=\""+_imagesite+$('#fileUpload').val()+"\">点击下载</a><a onclick=\"$.AmsFileFileUploadUpload.deleteImg()\" href=\"javascript:;\">删除</a>");
                }
            }
            if ($("#actionType").val()=="create"){}
            if ($.t_coll!=undefined&&$.t_coll.onFormLoad!=undefined){
                $.t_coll.onFormLoad("AmsFileForm",data);
            }
            $.messager.progress("close");
        }});
        if ($("#AmsFileTabs").length>0){
            var height = this.body.parentNode.clientHeight - 32;
            if ($("#AmsFileTabs").tabs("tabs").length==1){
                $("#AmsFileTabs").tabs("hideHeader");
            }
            $("#AmsFileTabs").tabs("resize",{"height":height});
            $("#AmsFileTabs").tabs({
                onSelect : function(title, index) {
                    if (title == "图片库") {
                        var pics = $("#amsFileImgs").val();
                        if(pics){
                            $.AmsFileUploader.pics = JSON.parse(pics);
                            var html = "";
                            for(var i = 0;i<$.AmsFileUploader.pics.length;i++){
                                var pic = $.AmsFileUploader.pics[i];
                                html +=$.AmsFileUploader.showPic(pic.fileUrl,pic.fileName,pic.resId);
                            }
                        }
                        $("#amsFile_filelist").html(html);
                        uploader();
                    }
                }
            });
        }
        if ($("#fileUpload").length>0){
            if ($.AmsFile){
                $.AmsFile.fileUploadUploader = fileUploadUploader();
            }else{
                fileUploadUploader = fileUploadUploader();
            }
        }

        if ($("#actionType").val()=="auth"){
            if ($("#AmsFileTabs").length>0){
                var tabs = $('#AmsFileTabs').tabs("tabs");
                $.each(tabs,function(index,tab){
                    if ($('#AmsFileTabs').tabs("getTab",index).panel('options').title!="权限设置"){
                        $('#AmsFileTabs').tabs("getTab",index).panel('options').tab.hide();
                    }else{
                        $('#AmsFileTabs').tabs('select',index);
                        $('#AmsFileTabs').tabs("getTab",index).panel('options').tab.show();
                    }
                })
            }
            var ids = "ROOT";
            if ($("#amsFileId").length>0&&$("#amsFileId").val()!=""){
                ids = $("#amsFileId").val();
            }
            $("#AmsFileForm").form("load",_appsite + "coll/amsfile/auth/getAuthObj/"+ids);

        }else{
            if ($("#actionType").val()=="create"){
                if ($("#AmsFileTabs").length>0){
                    var tabs = $('#AmsFileTabs').tabs("tabs");
                    $.each(tabs,function(index,tab){
                        var title = $('#AmsFileTabs').tabs("getTab",index).panel('options').title;
                        if (title!="基础信息"&&title!="属性信息"){
                            $('#AmsFileTabs').tabs("getTab",index).panel('options').tab.hide();
                        }else{
                            if ($('#AmsFileTabs').tabs("getTab",index).panel('options').tab.is(":hidden")){
                                $('#AmsFileTabs').tabs("getTab",index).panel('options').tab.show();
                            }
                        }
                    });
                    $('#AmsFileTabs').tabs('select',0);
                }
                $("#amsFileId").val("");

                $("#AmsFileForm").form("load",  _appsite +"coll/amsfile/create");
            }else{
                $.messager.progress({ title:'请稍后',msg:'数据读取中...'});
                $("#AmsFileForm").form("load",  _appsite +"coll/amsfile/query/"+$("#amsFileId").val());
            }
        }
});