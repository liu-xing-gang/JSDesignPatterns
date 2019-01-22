jQuery.t_cfg = {
    onChange : function(parent,data){
        if (parent == "AmsMovableRack_amsMovableRack_storageId") {
            if ($("#amsMovableRackCabinet").length > 0) {
                $("#amsRackNo_Storage").combobox({
                    data: $.totemUtils.getJson('cfg/amsmovablerack/queryby/storageId/is/' + data.storageId)
                });
            }
        }
        return true;
    },
    onFormLoad : function(parent,data){
        return true;
    },
    onClickRow:function(parent,row){
        return true;
    }
};