require([
    'jquery',
    'easyui',
    'easyui_lang_zh_CN',
], function ($) {
    require([
        'jquery_cookie',
        'moment',
        'utils',
        'webuploader',
        'uploadercommon',
        'jquery_poshytip',
        'syExtEasyUI',
        'syExtJquery',
        'form2json',
        'gallery_introtour_ui_jq',
        'common',
    ], function () {
        $.parser.parse()
        require([
            'cfg_header',
            'amsmovablerack_manage',
            'amsmovablerack_grid',
            'amsstorage_grid',
            'totemCabinet_cabinet',
            'cabinet_contr',
            'cfg'
        ])
    })
})







