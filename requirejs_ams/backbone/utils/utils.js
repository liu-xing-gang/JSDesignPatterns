jQuery.common = {
    onChange : function(parent,data){
        return;
    }
}

jQuery.totemUtils = {
    sysCodes:{},
    cacheData:{},
    getPropValueByForm:function(form,prop){
        var datas = form.serializeArray();
        var value;
        $.each(datas,function (index,data) {
            if (data.name==prop){
                value = data.value;
                return;
            }
        })
        return value;
    },
    removeCacheData:function(name){
        var props = Object.getOwnPropertyNames($.totemUtils.cacheData);
        $.each(props,function(index,item){
            if (item.indexOf(name)>0){
                delete $.totemUtils.cacheData[item];
            }
        })
    },
    columnTip:function(value, row, index) {
        if (value!=undefined){
            if (value.length>=22){
                var abValue = value.substring(0,19)+"...";
                abValue = '<a href="javascript:;"  title="' + $.totemUtils.toHtml(value) + '" class="easyui-tooltip" style="text-decoration: none;">' + $.totemUtils.toHtml(abValue) + '</a>';
                return  abValue;
            }else{
                return value;
            }
        }
    },
    toHtml:function(str){
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    },
    /**
     * 设置周期选择
     * @param el
     * @param data
     */
    setTimeUnit:function (el,data) {
        var unit = "s";
        if (data%(60*60*24*7)==0){
            unit = "w";
            data = data/(60*60*24*7);
        }else if (data%(60*60*24)==0){
            unit = "d";
            data = data/(60*60*24);
        }else if (data%(60*60)==0){
            unit = "h";
            data = data/(60*60);
        }else if (data%(60)==0){
            unit = "mi";
            data = data/(60);
        }
        $("#"+el+"_time").numberspinner("setValue",data);
        $("#"+el+"_unit").combobox("setValue",unit);
    },
    initTimeUnit:function(el){
        var prop = $("input[name='"+el+"']");
          if ($("#"+el+"_time").length>0){
              $("#"+el+"_time").numberspinner({
                  onChange:function (newValue,oldValue) {
                      if (newValue!=""){
                          var unit = $("#"+el+"_unit").combobox("getValue");
                          if (unit=="h"){
                              prop.val(newValue*60*60);
                          }else if(unit=="mi"){
                              prop.val(newValue*60);
                          }else if(unit=="d"){
                              prop.val(newValue*60*60*24);
                          }else if(unit=="w"){
                              prop.val(newValue*60*60*24*7);
                          }
                      }
                 }
              })
          }
        if ($("#"+el+"_unit").length>0){
            $("#"+el+"_unit").combobox({
                onChange:function (unit,oldValue) {
                    var newValue = $("#"+el+"_time").val();
                    if (newValue==""){
                        return;
                    }
                    if (unit=="h"){
                        prop.val(newValue*60*60);
                    }else if(unit=="mi"){
                        prop.val(newValue*60);
                    }else if(unit=="d"){
                        prop.val(newValue*60*60*24);
                    }else if(unit=="w"){
                        prop.val(newValue*60*60*24*7);
                    }
                }
            })
        }
    },
    getMutliCheck:function(el,data,name,vf,lf,lv){
        var options = "";
        var readonly = "";
        if ($(el).attr("data-options")&&$(el).attr("data-options").indexOf("readonly:true")>-0){
            readonly=" onclick=\"return false;\" ";
        }
        if (lv){
            var lvs = lv.split(",")
            $.each(data,function(i,o){
                var check = "";
                if ($.inArray(o[vf],lvs)>-1){
                    check = "checked";
                }
                options = options +"<label><input name=\""+name+"s[]\" type=\"checkbox\""+ check +readonly +" value=\"" + this[vf] + "\"/>"+this[lf] +"</label>";
            })
        }else{
            $.each(data,function(i,o){
                options = options +"<label><input name=\""+name+"s[]\" type=\"checkbox\" checked value=\"" + this[vf] +readonly+ "\"/>"+this[lf] +"</label>";
            })
        }
        $(el).html(options);
    },
    getCheck:function(el,data,name,vf,lf){
        var readonly = "";
        if ($(el).attr("data-options")&&$(el).attr("data-options").indexOf("readonly:true")>-0){
            readonly=" onclick=\"return false;\" ";
        }
        var options = "";
        $.each(data,function(){
            options = options +"<label><input name=\""+name+"\" type=\"checkbox\" value=\"" + this[vf] +readonly+ "\"/>"+this[lf] +"</label>";
        })
        $(el).html(options);
    },
    setChecked:function(name,value){
        $("input[name='syncContent']").prop("checked",flag)
        var options = "";
        $.each($("input[name='"+name+"']"),function(){
            if (this.val()==value){
                this.prop("checked",true);
            } else{
                this.prop("checked",false);
            }
        })
        $(el).html(options);
    },getRadio:function(el,data,name,vf,lf,lv){//元素选择器，数据(数组对象)，value,label,default
        var readonly = "";
        if ($(el).attr("data-options")&&$(el).attr("data-options").indexOf("readonly:true")>-0){
            readonly=" onclick=\"return false;\" ";
        }
        var options = "";
        $.each(data,function(i,o){
            var check = "";
            if ((i==0&&lv=="")||(lv==o[vf])){
                check = "checked";
            }
            options = options +"<label><input name=\""+name+"\"  type=\"radio\" "+check+" value=\"" + o[vf] +readonly+ "\"/>"+o[lf] +"</label>";
        });
        $(el).html(options);
    },
    getFileSuffix : function(fileName){
        var dotPos = fileName.indexOf(".")+1;
        if (dotPos==-1){
            return "";
        }
        return fileName.substr(dotPos,fileName.length-dotPos);
    },
    getFileType : function(fileName){
        var suffix = $.totemUtils.getFileSuffix(fileName).toLowerCase();
        if (suffix=="png"||suffix=="jpg"||suffix=="ico"||suffix=="gif"){
            return "img";
        }else{
            return "href";
        }
    },
    changeVerifyCode : function (obj){

        var newCode = obj.attr("src");
        newCode += "?nocahe=" + new Date().getTime();
        obj.attr("src",newCode);

    },
    propertyColumns :[[
        {field: 'name', title: '名称',width:100,halign:'center'},
        {field: 'value', title: '参数',width:30,halign:'center', formatter:function(value, arr){
                var editor = '';
                if(typeof arr.editor == 'object'){
                    editor = arr.editor.type;
                }else{
                    editor = arr.editor;
                }
                switch(editor){
                    case 'combobox':
                        var json = arr.editor.options.data;
                        if (json==undefined){
                            return value;
                        }
                        for (var i = 0; i < json.length; i++) {
                            if (json[i].value == value) {
                                return json[i].text;
                            }
                        }
                        return value;

                    case 'checkbox':
                        if (value=="true"){
                            return "是";
                        }else{
                            value="false";
                            return "否";
                        }
                    default:
                        return value;
                }
            }}
    ]],
    setAuths : function (modelName,auths){
        if (auths!=undefined){
            for (var i in auths){
                if ($("#"+modelName+$.totemUtils.replaceFirstUpper(auths[i].operation)).length>0){
                    $("#"+modelName+$.totemUtils.replaceFirstUpper(auths[i].operation)).show();
                    if (auths[i].operation=="create"){
                        if (auths[i].modelName!="self"){
                            $("#"+modelName+"Copy").show();
                        }else{
//								$("#"+modelName+"Create").hide();
                        }
                    }
                }
            }

        }
    },
    setAuths : function (id,modelName,auths){
        if (auths!=undefined){
            for (var i in auths){
                if ($("#"+modelName+$.totemUtils.replaceFirstUpper(auths[i].operation)).length>0){
                    $("#"+modelName+$.totemUtils.replaceFirstUpper(auths[i].operation)).show();
                    if (auths[i].operation=="create"){
                        if (auths[i].modelName!="self"||id=="ROOT"){
                            $("#"+modelName+"Copy").show();
                        }else{
//								$("#"+modelName+"Create").hide();
                        }
                    }
                }
            }

        }
    },
    queryPic : function (showId,saveId){
        $(showId).empty();
        var productPic=$(saveId).val();
        var pic = productPic.split(',');
        for(var i in pic){
            var response={fileName:pic[i]};
            $.totemUtils.processShowPic(response,showId,saveId);
        }
        var showImg = showId + "img"
        $(showImg).click(function(){
            $(this).click(function(){
                var id = $(this).attr("id");
                $.messager.confirm('信息提示', '是否删除图片', function(r) {
                    if (r) {
                        pic.splice($.inArray(id,pic),1);
                        $(saveId).val("");
                        $(saveId).val(pic);
                        $.totemUtils.queryPic(showId,saveId);
                    }
                });
            });
        });
    },

    /**
     * 图片批量上传
     * @param p
     */
    processShowPic: function(response,showId,saveId){//图片预览
        if(showId==undefined ){showId="#showId";}
        if(saveId==undefined ){saveId="#saveId";}
        var p=response.fileName;
        if (!p ) return;
        var patn = /\.jpg$|\.jpeg$|\.png$|\.gif$/i;
        if (patn.test(p)) {
            var y = document.getElementById(p);
            if (y) {
                y.src = _imagesite + p;
            } else {
                var show=showId.substring(1,showId.length);
                var img = document.createElement("img"); img.setAttribute("src", _imagesite + p + "_200x200!.jpg");
                img.setAttribute("width", "200");
                img.setAttribute("height", "200");
                img.setAttribute("class", "img");
                img.setAttribute("id", p);

                document.getElementById(show).appendChild(img);
                var id=$(saveId).val().split(',');//判断如果P的值已经存在就不添加，如果不存在添加
                var a=0;
                for(var j in id){
                    if(id[j]==p){a=1;}
                }
                var b=id+","+p;
                if(a==0){
                    $(saveId).val(b);
                }else{
                    $(saveId).val(id);
                }
            }
        } else {
            alert("数据暂未存储无法预览");
        }
    },

    getTypeCode : function(type) {
        if (type==""){
            return null;
        }
        var typeValues = $.totemUtils.sysCodes[type];
        var typeId = type;
        if (null==typeValues){
            var typeAll = $.totemUtils.getJson(_appsite+"common/systype/queryAll");
            for (row in typeAll){
                if (typeAll[row].typeCode==type){
                    typeId = typeAll[row].typeId;
                    break;
                }
            }
            typeCodes = $.totemUtils.getJson(_appsite+"common/systypecode/queryby/typeId/is/" + typeId);
            if (typeCodes.rows == undefined){
                $.totemUtils.sysCodes[type] = typeCodes;
                return typeCodes;
            }else{
                $.totemUtils.sysCodes[type] = typeCodes.rows;
                return typeCodes.rows;
            }
        }else{
            return typeValues;
        }

    },
    getJson : function(url,method,queryData) {
        var result ;
        if (method==undefined){
            method="get";
        }
        if (url.indexOf(_appsite)!=0){
            url = _appsite+url;
        }
        var queryString="";
        if (!queryData){
            queryData = {};
        }else{
            queryString = JSON.stringify(queryData);
        }

        var jsonValues = $.totemUtils.cacheData[url+queryString];
        if (jsonValues){
            return jsonValues;
        }
        $.ajaxSettings.async = false;
        if (method&&method.toLowerCase()=="post"){
            $.post(url,queryData,function (data) {
                if (data.rows){
                    $.totemUtils.cacheData[url+queryString] = data.rows;
                    result =  data.rows;
                }else{
                    $.totemUtils.cacheData[url+queryString] = data;
                    result = data;
                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status=="404"){
                    url = this.url.replace(_appsite,"");
                    uri = window.location.pathname.replace(_appsite,"");
                    if (uri.startWith("demo")){
                        uri = uri.replace("demo/","");
                        if ((uri||"")!=""){
                            url = _appsite+"demo/"+uri.substring(0,uri.indexOf("/"))+"/"+url;
                            $.post(url,queryData,function (data) {
                                if (data.rows){
                                    $.totemUtils.cacheData[url+queryString] = data.rows;
                                    result =  data.rows;
                                }else{
                                    $.totemUtils.cacheData[url+queryString] = data;
                                    result = data;
                                }
                            })
                        }
                    }
                }
            })
        }else{
            $.get(url,function (data) {
                if (data.rows){
                    $.totemUtils.cacheData[url+queryString] = data.rows;
                    result =  data.rows;
                }else{
                    $.totemUtils.cacheData[url+queryString] = data;
                    result = data;
                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status=="404"){
                    url = this.url.replace(_appsite,"");
                    uri = window.location.pathname.replace(_appsite,"");
                    if (uri.startWith("demo")){
                        uri = uri.replace("demo/","");
                        if ((uri||"")!=""){
                            url = _appsite+"demo/"+uri.substring(0,uri.indexOf("/"))+"/"+url;
                            $.get(url,function (data) {
                                if (data.rows){
                                    $.totemUtils.cacheData[url+queryString] = data.rows;
                                    result =  data.rows;
                                }else{
                                    $.totemUtils.cacheData[url+queryString] = data;
                                    result = data;
                                }
                            })
                        }
                    }
                }
            })
        }

            $.ajaxSettings.async = true;
        // $.ajax(
        //     {   url: url,
        //         async: false,
        //         data : queryData ,
        //         type : method ,
        //         contentType : "application/json; charset=utf-8",
        //         success:function(data) {
        //             if (data.rows){
        //                 $.totemUtils.cacheData[url+queryString] = data.rows;
        //                 result =  data.rows;
        //             }else{
        //                 $.totemUtils.cacheData[url+queryString] = data;
        //                 result = data;
        //             }
        //         },
        //         error: function(XMLHttpRequest, textStatus, errorThrown) {
        //             if (XMLHttpRequest.status=="404"){
        //                 url = this.url.replace(_appsite,"");
        //                 uri = window.location.pathname.replace(_appsite,"");
        //                 if (uri.startWith("demo")){
        //                     uri = uri.replace("demo/","");
        //                     if ((uri||"")!=""){
        //                         url = _appsite+"demo/"+uri.substring(0,uri.indexOf("/"))+"/"+url;
        //                         $.ajax(
        //                             {
        //                                 url: url,
        //                                 async: false ,
        //                                 data : queryData ,
        //                                 type: method ,
        //                                 contentType: "application/json; charset=utf-8",
        //                                 success: function (data) {
        //                                     if (data.rows == undefined) {
        //                                         $.totemUtils.cacheData[url+queryString] = data;
        //                                         result = data;
        //                                     } else {
        //                                         $.totemUtils.cacheData[url+queryString] = data.rows;
        //                                         result = data.rows;
        //                                     }
        //                                 }
        //                             });
        //                     }
        //                 }
        //             }
        //         }
        //     });

        return result;

    },

    sortGrid:function(index, type, gridname) {
        if ("up" == type) {
            if (index != 0) {
                var toup = gridname.datagrid('getData').rows[index];
                var todown = gridname.datagrid('getData').rows[index - 1];
                gridname.datagrid('getData').rows[index] = todown;
                gridname.datagrid('getData').rows[index - 1] = toup;
                gridname.datagrid('refreshRow', index);
                gridname.datagrid('refreshRow', index - 1);
                gridname.datagrid('selectRow', index - 1);
            }
        } else if ("down" == type) {
            var rows = gridname.datagrid('getRows').length;
            if (index != rows - 1) {
                var todown = gridname.datagrid('getData').rows[index];
                var toup = gridname.datagrid('getData').rows[index + 1];
                gridname.datagrid('getData').rows[index + 1] = todown;
                gridname.datagrid('getData').rows[index] = toup;
                gridname.datagrid('refreshRow', index);
                gridname.datagrid('refreshRow', index + 1);
                gridname.datagrid('selectRow', index + 1);
            }
        }
    },
    replaceFirstUpper : function (str)
    {
        if ($.totemUtils.isUppercase(str)){
            str = str.toLowerCase();
        }
        return str.replace(/\b(\w)|\s(\w)/g, function(m){
            return m.toUpperCase();
        });
    },
    isUppercase : function(obj)
    {
        if (/^[A-Z]+$/.test(obj))
        {
            return true;
        }
        return false;
    },
    getPropertyName : function(str)
    {
        var strs = str.split("_");
        for (var i = 0;i < strs.length; i++)
        {
            strs[i] = $.totemUtils.replaceFirstUpper(strs[i]);
        }
        return strs.join("");
    },
    editorCheckItem : {
        type : 'checkbox',
        options : {
            on : 'true',
            off : 'false'
        }
    },
    eidtorAllSysType : {
        type : 'combobox',
        options : {
            valueField : 'typeCode',
            textField : 'typeName',
            method : 'get',
            url : _appsite + 'systype/all'
        }
    },
    formatCheckItem : function (value) {
        if (value == 'true'||value == 'PRI') {
            return '<input type="checkbox" checked value="' + value + '" />';
        } else {
            return '<input type="checkbox" value="' + value + '" />';
        }
    },
    moveUp : function (grid,column) {
        var row = grid.datagrid('getSelected');
        if (row) {
            var index = grid.datagrid('getRowIndex', row);
            if (index > 0) {
                var order = row[column];
                grid.datagrid('clearSelections');
                grid.datagrid('selectRow',index-1);
                var nRow = grid.datagrid('getSelected');
                row[column] = nRow[column];
                nRow[column]= order;
                grid.datagrid('clearSelections');
                grid.datagrid('selectRow',index);
                $.totemUtils.sortGrid(index, 'up', grid);
            }
        }
    },
    moveDown : function (grid,column){
        var row = grid.datagrid('getSelected');
        if (row) {
            var index = grid.datagrid('getRowIndex', row);
            var totalRowNum = grid.datagrid('getData').rows.length;
            if (index < totalRowNum-1) {
                var order = row[column];
                grid.datagrid('clearSelections');
                grid.datagrid('selectRow',index+1);
                var nRow = grid.datagrid('getSelected');
                row[column] = nRow[column];
                nRow[column]= order;
                grid.datagrid('clearSelections');
                grid.datagrid('selectRow',index);
                $.totemUtils.sortGrid(index, 'down', grid);
            }
        }
    },
    moveBottom : function (grid,column){
        var row = grid.datagrid('getSelected');
        if (row) {
            var index = grid.datagrid('getRowIndex', row);
            var totalRowNum = grid.datagrid('getData').rows.length;
            while (index < totalRowNum-1) {
                $.totemUtils.moveDown(grid,column);
                row = grid.datagrid('getSelected');
                index = grid.datagrid('getRowIndex', row);
            }
        }
    },
    moveTop : function (grid,column){
        var row = grid.datagrid('getSelected');
        if (row) {
            var index = grid.datagrid('getRowIndex', row);
            var totalRowNum = grid.datagrid('getData').rows.length;
            while (index >0) {
                $.totemUtils.moveUp(grid,column);
                row = grid.datagrid('getSelected');
                index = grid.datagrid('getRowIndex', row);
            }
        }
    },
    HTMLEncode : function (html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html)
            : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    HTMLDecode : function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    isArray : function (arg){
        return Object.prototype.toString.call(arg) === '[object Array]';
    },
    setHeight: function (layout){
        var north = layout.layout('panel','north');	// get the north panel
        if (north.length>0){
            var oldHeight = north.panel('panel').outerHeight();
            north.panel('resize', {height:'auto'});
            var newHeight = north.panel('panel').outerHeight();
            var center = layout.layout('panel','center');	// get the center panel
            if (layout.parent().parent().parent().attr("class")=="tabs-panels"){
                var tabs =layout.parent().parent().parent().parent();
                tabs.tabs("resize",{height:tabs.height()});
                center.panel('resize',{
                    height:(center.height()-newHeight+oldHeight),top:newHeight
                });
            }else{
                center.panel('resize',{
                    height:(layout.height()-newHeight),top:newHeight
                });

            }
        }
    },
    getPropertyValue: function (property){
        if (property.length>0){
            if (!property.attr("class")){
                return property.val();
            }
            if (property.attr("class").indexOf("easyui-combobox")!=-1){
                return property.combobox("getValue");
            }else if(property.attr("class").indexOf("easyui-combogrid")!=-1){
                return property.combogrid("getValue");
            }else if(property.attr("class").indexOf("easyui-combotree")!=-1){
                return property.combotree("getValue");
            }else if(property.attr("class").indexOf("easyui-textbox")!=-1){
                return property.textbox("getValue");
            }else if(property.attr("class").indexOf("easyui-datetimebox")!=-1){
                return property.datebox("getValue");
            }else{
                return property.val();
            }
        }
        return "";
    },
    getQueryValue: function (property){
        if (!property){
            return "";
        }
        var tagName = property.attr("type") ;
        if (property.length>1){
            var returnValue = [];
            for (var i=0;i<property.length;i++){
                if (property[i].value.length>0){
                    tagName = $(property[i]).attr("type") ;
                    if(tagName =='checkbox'|| tagName =='radio'){
                        var values = [];
                        $( "[name='" + $(property[i]).attr("name")+"']" + ":checked").each(function(i,o){
                            values.push(o.value)
                        })
                        returnValue = returnValue.concat( values);
                        break;
                    }else{
                        returnValue.push(property[i].value);
                    }
                }
            }
            return returnValue;
        }else{
            if(tagName =='checkbox' || tagName == "radio"){
                return $(property.selector + ":checked").val();
            }
            return property.val();
        }

    },
    setPropertyValue: function (property,value){
        if (property.length>0){
            if (!property.attr("class")){
                property.val(value);
                return;
            }
            if (property.attr("class").indexOf("easyui-combobox")!=-1){
                property.combobox("select",value);
            }else if(property.attr("class").indexOf("easyui-combogrid")!=-1){
                property.combogrid("setValue",value);
            }else if(property.attr("class").indexOf("easyui-combotree")!=-1){
                property.combotree("setValue",value);
            }else if(property.attr("class").indexOf("easyui-textbox")!=-1){
                property.textbox("setValue",value);
            }else if(property.attr("class").indexOf("easyui-datetimebox")!=-1){
                property.datebox("setValue",value);
            }else{
                property.val(value);
            }
        }
    },
    aCity:{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
    isCardID:function(sId){
        var iSum=0 ;
        var info="" ;
        if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
        sId=sId.replace(/x$/i,"a");
        if($.totemUtils.aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
        sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
        var d=new Date(sBirthday.replace(/-/g,"/")) ;
        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
        for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
        if(iSum%11!=1) return "你输入的身份证号非法";
        return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
    },
    createPropertyGrid : function (propertyGridId,url,type){
        $(propertyGridId).propertygrid({
            url:url,method:type,showGroup:true,disabled:true,
            scrollbarSize:0,
            columns:[[
                { field:'name',width:50,align:'center',halign:'center', title:'属性名称'},
                { field:'value',width:50,align:'center',halign:'center', title:'属性值'}
            ]]
        });
    },formatterYM:function (date) {
        return moment(date).format("YYYY-MM");
    },parserYm:function(s){

        return moment(s|| new Date()).toDate();
    },
    showTour : function (pageName){
        $.ajax(
            {url: _appsite+"tour/ifShowTour/"+pageName,
                async: false,
                type:"get",
                contentType : "application/json; charset=utf-8",
                success:function(data) {
                    if (data=="on"){
                        var tourCards = $.totemUtils.getJson("tour/getTourGuide/"+pageName,"get");
                        if (tourCards){
                            $.tourGuide.tourName = pageName;
                            var existsCards = new Array();
                            $.each(tourCards,function(index,card){
                                if ($("#"+card.target).length>0||card.target=="welcome"||card.target=="end"){
                                    existsCards.push(card);
                                }
                            })
                            $().introTour(existsCards);

                            document.addEventListener('introTourClosed', function(e){
                                $.each($("[name='close-nav']"),function () {
                                    if ($(this).is(":checked")){
                                        $.tourGuide.closeTour=true;
                                    }
                                })
                                if ($.tourGuide.closeTour){
                                    $.totemUtils.getJson("tour/closeTourGuide/"+pageName,"get");
                                }
                            });

                            document.addEventListener('introTourLastCard', function(e){
                                console.log('last card');
                            });
                        }
                    }
                }
            });
    },documentBody:function getDocumentBody() {
        return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement
            : document.body;
    },createMap:function(data) {
        var map = new BMap.Map(data.el || 'map');
        var type = "type";
        if (!data.longitude || !data.latitude) {
            data.longitude = "116.404";
            data.latitude = "39.915";

        }
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(new BMap.Point(data.longitude, data.latitude), 18);

        var point = new BMap.Point(data.longitude ,data.latitude);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);             // 灏嗘爣娉ㄦ坊鍔犲埌鍦板浘涓�
        marker.enableDragging();
        marker.addEventListener("dragend", function (po) {
            var plng = po.point.lng;
            var plat = po.point.lat;
            if($(data.lngId).length>0){
                $(data.lngId).val(plng);
            }
            if($(data.latId).length>0){
                $(data.latId).val(plat);
            }
        });

        //$.bwyUtils.showToilet(data.formEl,data.lngId, data.latId, data, map, type);
        map.enableScrollWheelZoom();
    },loadMapData:function(options){
        var opts={
            el:"map",
            datas:[],
            lngField:"lng",
            latField:"lat",
            level:"14",
            centerLng:"116.404",
            centerLat:"39.01",
            labelField:"title"

        }
        $.extend(opts,options);
        var map = new BMap.Map(opts.el);
        var points = [];
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(new BMap.Point(opts.centerLng, opts.centerLat), opts.level);
        $.each(opts.datas,function (i, o) {
            var lng = o[opts.lngField];
            var lat = o[opts.latField];
            var title = o[opts.labelField];
            if(!lng ||!lat){
                return true;
            }
            var point = new BMap.Point(lng ,lat);
            points.push(point);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);             // 将标注添加到地图中
            if(title){
                var offset = title.length*15/2-20;
                var label = new BMap.Label(title,{offset:new BMap.Size(-offset,-20)});
                marker.setLabel(label);
            }

        })
        if(opts.datas.length>0){
            map.setViewport(points);
        }


        map.enableScrollWheelZoom();
    },//可输入下拉框，将select下无option标签的进行转换，参数tableId为标签id,queryType为要请求的参数类型，value为默认值（编辑时使用）
    getOptions : function(queryType, tableId, value, idField, parentIdField, text){
        var items = queryType;
        if (!value) {
            value = '';
        }
        if(tableId){
            $(tableId).droptree({
                transition : "ztree",
                items : items,
                value : value,
                valLabel : idField,
                idLabel : idField,
                pidLabel : parentIdField,
                textLabel : text
            });
        }
        return items;
    }
};


var KEY = { SHIFT:16, CTRL:17, ALT:18, DOWN:40, RIGHT:39, UP:38, LEFT:37};
var selectIndexs = {firstSelectRowIndex:0, lastSelectRowIndex:0};
var inputFlags = {isShiftDown:false, isCtrlDown:false, isAltDown:false}

function keyPress(event){//响应键盘按下事件
    var e = event || window.event;
    var code = e.keyCode | e.which | e.charCode;
    switch(code) {
        case KEY.SHIFT:
            inputFlags.isShiftDown = true;
            break;
        case KEY.CTRL:
            inputFlags.isCtrlDown = true;
            break;
        /*
        case KEY.ALT:
          inputFlags.isAltDown = true;
          grid.datagrid('options').singleSelect = false;
          break;
        */
        default:
    }
}

function keyRelease(event) { //响应键盘按键放开的事件
    var e = event || window.event;
    var code = e.keyCode | e.which | e.charCode;
    switch(code) {
        case KEY.SHIFT:
            inputFlags.isShiftDown = false;
            selectIndexs.firstSelectRowIndex = 0;
            break;
        case KEY.CTRL:
            inputFlags.isCtrlDown = false;
            selectIndexs.firstSelectRowIndex = 0;
            break;
        /*
        case KEY.ALT:
          inputFlags.isAltDown = false;
          selectIndexs.firstSelectRowIndex = 0;
          grid.datagrid('options').singleSelect = true;
          break;
        */
        default:
    }
}

String.prototype.endWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substring(this.length-s.length)==s)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substr(0,s.length)==s)
        return true;
    else
        return false;
    return true;
}

//删除所有空格
String.prototype.trim = function() {
    var str = this,
        result="",
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0,len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            result+=str.charAt(i);
        }
    }
    return result;
}

/**
 * 扩展方法 使datagrid的列中能显示row中的对象里的属性
 * 无需调用自动执行 Field：Staff.JoinDate

 $.fn.datagrid.defaults.view = $.extend({}, $.fn.datagrid.defaults.view, {
    renderRow: function (target, fields, frozen, rowIndex, rowData) {
        var opts = $.data(target, 'datagrid').options;
        var cc = [];
        if (frozen && opts.rownumbers) {
            var rownumber = rowIndex + 1;
            if (opts.pagination) {
                rownumber += (opts.pageNumber - 1) * opts.pageSize;
            }
            cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + rownumber + '</div></td>');
        }
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var col = $(target).datagrid('getColumnOption', field);
            var fieldSp = field.split(".");
            var dta = rowData[fieldSp[0]];
            for (var j = 1; j < fieldSp.length; j++) {
                dta = dta[fieldSp[j]];
            }
            if (col) {
                // get the cell style attribute
                var styleValue = col.styler ? (col.styler(dta, rowData, rowIndex) || '') : '';
                var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');

                cc.push('<td field="' + field + '" ' + style + '>');

                var style = 'width:' + (col.boxWidth) + 'px;';
                style += 'text-align:' + (col.align || 'left') + ';';
                style += opts.nowrap == false ? 'white-space:normal;' : '';

                cc.push('<div style="' + style + '" ');
                if (col.checkbox) {
                    cc.push('class="datagrid-cell-check ');
                } else {
                    cc.push('class="datagrid-cell ');
                }
                cc.push('">');

                if (col.checkbox) {
                    cc.push("<input type=\"checkbox\" " + (rowData.checked ? "checked=\"checked\"" : ""));
                    cc.push(" name=\"" + field + "\" value=\"" + (dta != undefined ? dta : "") + "\">");
                } else if (col.formatter) {
                    cc.push(col.formatter(dta, rowData, rowIndex));
                } else {
                    cc.push(dta);
                }

                cc.push('</div>');
                cc.push('</td>');
            }
        }
        return cc.join('');
    }
});
 **/

