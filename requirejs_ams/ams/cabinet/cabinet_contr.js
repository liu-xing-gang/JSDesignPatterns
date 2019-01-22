
    /**
     * 接口命令发送
     * @param ctrlTable
     * @returns {*}
     */
    function commandSend(ctrlTable) {
        let data1;
        $.ajaxSettings.async = false;
        $.post(_appsite + "/cabinet/ctrltable/commandSend", ctrlTable, function (data) {
            if (!data.result) {
                $.messager.show({title: '信息提示', msg: data.mes});
                return;
            }else{
                $.messager.show({title: '信息提示', msg: "柜体已经打开"});
            }
            data1=data;
        }, "json");
        if (data1){
            $.ajaxSettings.async = true;
        }
        return data1;
    }

    /**
     * 接口命令取消
     * @param command_data
     */
    function commandCancel(command_data) {
        $.post(_appsite + "/cabinet/ctrltable/commandCancel", {id: command_data.id}, function (data) {
            if (!data.result) {
                $.messager.show({title: '信息提示', msg: data.mes});
            }
        }, "json");
    }

    /**
     * 命令的发送结果
     * @param command_data
     * @returns {*}
     */
    function commandResult(command_data) {
        let data1;
        $.ajaxSettings.async = false;
        $.post(_appsite + "/cabinet/ctrltable/commandResult", {id: command_data.id}, function (data) {
            if (!data.result) {
                commandCancel(command_data);
                $.messager.show({title: '信息提示', msg: data.mes});
                return;
            }
            data1 = data;
        }, "json");
        if (data1){
            $.ajaxSettings.async = true;
        }
        return data1;
    }
    /**
     *
     * @param data 数据
     * @param option 操作类型
     * @param objType 对象类型
     */
    function createObj(data,objType,option) {
        switch (objType) {
            case "ctrlTable":
                var ctrlTable = {};
                if (option=="sj") {
                    ctrlTable.kh =data.rackKh;
                    ctrlTable.zh =data.movableRack;
                    ctrlTable.lh =data.rackGroup;
                    ctrlTable.mh =data.rackMh;
                    ctrlTable.ctrl = "04";
                    ctrlTable.len = 4;
                    ctrlTable.rwFlag = "1";
                    ctrlTable.frame ="";
                    ctrlTable.types = "1";
                    ctrlTable.rfid = "1";
                    ctrlTable.rfiddata = data.rfid;
                    ctrlTable.data = data.select_address.amsRackno;
                }
                if (option=="xj"){
                    ctrlTable.kh =data.boxKh;
                    ctrlTable.zh =data.boxZh;
                    ctrlTable.lh =data.boxLh;
                    ctrlTable.mh =data.boxMh;
                    ctrlTable.ctrl = "04";
                    ctrlTable.len = 4;
                    ctrlTable.data = data.libNo;
                    ctrlTable.rwFlag = "1";
                    ctrlTable.frame ="";
                    ctrlTable.types = "2";
                    ctrlTable.rfid = "1";
                    ctrlTable.rfiddata = data.rfid;
                }
                if (option=="pd"){
                    ctrlTable.kh =data.kh;
                    ctrlTable.zh =data.zh;
                    ctrlTable.lh =data.lh;
                    ctrlTable.mh =data.mh;
                    ctrlTable.ctrl = "04";
                    ctrlTable.len = 4;
                    ctrlTable.data = data.data;
                    ctrlTable.rwFlag = "1";
                    ctrlTable.frame ="";
                    ctrlTable.types = "3";
                }
                if (option=="gh"){
                    ctrlTable.kh =data.kh;
                    ctrlTable.zh =data.zh;
                    ctrlTable.lh =data.lh;
                    ctrlTable.mh =data.mh;
                    ctrlTable.ctrl = "04";
                    ctrlTable.len = 4;
                    ctrlTable.rwFlag = "1";
                    ctrlTable.frame ="";
                    ctrlTable.types = "1";
                    ctrlTable.rfid = "1";
                    ctrlTable.rfiddata = data.rfid;
                    ctrlTable.data = data.select_address.amsRackno;
                }
                return ctrlTable;
            case "amsBox":
                var amsbox={};
                if (option=="sj") {
                    amsbox.allJianshu = data.allJianshu;
                    amsbox.allPage = data.allPage;
                    amsbox.amsHighrecordinId = data.amsHighrecordinId;
                    amsbox.boxBar = data.boxBar;
                    amsbox.boxFormat = data.boxFormat;
                    amsbox.boxNo = data.boxNo;
                    amsbox.boxRemark = data.boxRemark;
                    amsbox.boxState = "1";
                    amsbox.boxType = data.boxType;
                    amsbox.havePage = data.havePage;
                    amsbox.libNo = data.command_data.data;
                    amsbox.rfid = data.rfid;
                    amsbox.userNo = data.userNo;
                    amsbox.boxKh = data.command_data.kh;
                    amsbox.boxZh = data.command_data.zh;
                    amsbox.boxLh = data.command_data.lh;
                    amsbox.boxMh = data.command_data.mh;
                    amsbox.addressId=data.select_address.amsAddressId;
                }
                if (option=="xj"){
                    amsbox.allJianshu = data.allJianshu;
                    amsbox.allPage = data.allPage;
                    amsbox.amsHighrecordinId = data.amsHighrecordinId;
                    amsbox.boxBar = data.boxBar;
                    amsbox.boxFormat = data.boxFormat;
                    amsbox.boxNo = data.boxNo;
                    amsbox.boxRemark = data.boxRemark;
                    amsbox.boxState = "2";
                    amsbox.boxType = data.boxType;
                    amsbox.havePage = data.havePage;
                    amsbox.libNo = "";
                    amsbox.rfid = data.rfid;
                    amsbox.userNo = data.userNo;
                    amsbox.boxKh = data.boxKh;
                    amsbox.boxZh = data.boxZh;
                    amsbox.boxLh = data.boxLh;
                    amsbox.boxMh = data.boxMh;
                    amsbox.addressId=data.addressId;
                }
                return amsbox;
            default:
                return;
        }
    }
