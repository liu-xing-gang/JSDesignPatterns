$.createUploader=function(opt){
        var $ = jQuery,
        state = 'pending',
        uploader,
        fileNum=0,
        percent=0,
        fileIndex=0,
      BASE_URL = _appsite;
        
     var opt=$.extend({  //设置默认参数
            resize: true,
            auto: true,
            swf: BASE_URL + '/assets/plugins/webuploader/Uploader.swf',
            contextPath:_appsite,
            uploaderPath:"uploader",
//            accepts: [{
//                title : 'Images',
//                extensions : 'gif,jpg,jpeg,bmp,png',
//                mimeTypes : 'image/*'
//            },{
//                title : 'zip',
//                extensions : 'zip',
//                mimeTypes : 'application/zip'
//            },{
//                title : 'word doc',
//                extensions : 'doc,docx',
//                mimeTypes : 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//            },{
//                title : 'powerpoint doc',
//                extensions : 'pptx,ppt',
//                mimeTypes : 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
//            },{
//                title : 'excel doc',
//                extensions : 'xlsx,xls',
//                mimeTypes : 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//            }],
            fileNumLimit: 8,
        fileSizeLimit: 16 * 1024 * 1024,    // 16 M
        fileSingleSizeLimit: 20 * 1024 * 1024,    // 2 M
        picker:'picker',
        uploaderProgressar:'uploader-progress-bar',
      chunked:false,
      chunkSize:5242880,
      threads:1,
      fileVal:'file',
      chunkRetry:3
       },opt||{});  

    if($("#"+opt.picker).length<=0) {//必须有上传按钮
            throw new Error("upload picker is not correct!");
        }

    uploader = WebUploader.create({ //创建uploader对象
        resize: opt.resize,
        chunked:opt.chunked,
        chunkSize:opt.chunSize,
        threads:opt.threads,
        fileVal:opt.fileVal,
        chunkRetry:opt.chunkRetry,
        auto: opt.auto,
        swf: _appsite + '/assets/plugins/webuploader/Uploader.swf',
        server: opt.contextPath+opt.uploaderPath,
        pick: {id:'#'+opt.picker,multiple :false},
        accept: opt.accepts,
        duplicate:true,
        compress:{compressSize:20971520},//20m
        fileNumLimit: opt.fileNumlimit,
        fileSizeLimit: opt.fileSizeLimit,    // 16 M
        fileSingleSizeLimit: opt.fileSingleSizeLimit    // 2 M
    });

    uploader.on('fileQueued', function(file) {
                fileNum++;
                fileIndex++;
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
//        fileIndex--;
        if($("#"+opt.uploaderProgressar).length>0){
            $percent = $("#"+opt.uploaderProgressar);
            percent=percentage * 100;
            $percent.css( 'width', percent + '%' );
            $percent.find('span').text(percent+ '%' +' 完成');
         }
//        if(fileIndex <= 0){
//            fileNum=0;
//            percent=0;
//        }
    });


    uploader.on( 'uploadSuccess', function( file,response ) { //上传成功
         if(opt.uploadSuccess){
             var isDelete = false;
             isDelete=opt.uploadSuccess(file,response);
                 if (isDelete) {
                         uploader.removeFile(file);
                 }
         }
         $percent = $("#"+opt.uploaderProgressar);
         if($percent.length>0){
        	 $percent.find('span').text("");
         }
    });

    uploader.on( 'uploadError', function( file ) { //上传错误
    if(opt.uploadError){
            opt.uploadError(file);
         }
    });



    uploader.on( 'uploadComplete', function(file) { //上传完成
        /*
        inited 初始状态
        queued 已经进入队列, 等待上传
        progress 上传中
        complete 上传完成。
        error 上传出错，可重试
        interrupt 上传中断，可续传。
        invalid 文件不合格，不能重试上传。会自动从队列中移除。
        cancelled 文件被移除。
        */
        if(opt.uploadComplete){
                opt.uploadComplete(file);
         }
    });

/*
当validate不通过时，会以派送错误事件的形式通知调用者。通过upload.on('error', handler)可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来。

Q_EXCEED_NUM_LIMIT 在设置了fileNumLimit且尝试给uploader添加的文件数量超出这个值时派送。
Q_EXCEED_SIZE_LIMIT 在设置了Q_EXCEED_SIZE_LIMIT且尝试给uploader添加的文件总大小超出这个值时派送。
Q_TYPE_DENIED 当文件类型不满足时触发。。

*/
 uploader.onError = function( code ) {
    //typeof(eval(funcName)) == "function"
        if(opt.validateError){
             opt.validateError(code);
        }
    };

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }
    });
            return uploader;
    };
