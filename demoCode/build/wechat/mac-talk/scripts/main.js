define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define('text!root-tpl/main.tpl',[],function () { return '<header class="head-img" onclick="window.location=\'{{=it.topic.first_link}}\'">\r\n\t<h1>{{=it.topic.first_title}}</h1>\r\n\t<img class="main-img" src="{{=it.topic.first_imgUrl}}" >\r\n\t<p>{{=it.topic.first_main}}</p>\r\n\t<img class="pointer" src="./images/pointer.png">\r\n</header>\r\n<article class="new-list">\r\n\t{{~it.list :val:key}}\r\n\t<section onclick="window.location=\'{{=val.list_link}}\'">\r\n\t\t<img class="list-left" src="{{=val.list_imgUrl}}">\r\n\t\t<div class="list-right">\r\n\t\t\t<h2>{{=val.list_title}}</h2>\r\n\t\t\t<p>{{=val.list_main}}</p>\r\n\t\t</div>\r\n\t</section>\r\n\t{{~}}\r\n</article>\r\n\t';});

/**
 * 获取数据
 * 提供json数据
 */

define('root-base/model/mainModel',[],function() {

    var K = Backbone.Model.extend({
        initialize: function(){
            this.url = 'scripts/model/main.json';
        }
    });

    K.list = Backbone.Collection.extend({
        model: K
    });

    return K;

});
/**
 * 首页
 */

define('index/main',[
	'text!root-tpl/main.tpl',
    'root-base/model/mainModel'
], function(
	tpl,
    mainModel
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._mainModel = new mainModel;//实例化模型对象
            me.render();
        },
        events: {
            'tap .audio-item': 'listen'
        },
        init: function(){
            var me = this;
            //me.render();
        },
        render: function() {
            var me = this;
            me._mainModel.fetch({
                success:function(model, data){
                    $('#Take-index').html(me._tpl({
                        topic:data.first_team,
                        list:data.list_team
                    }))
                }
            })
        }
    });

    return K;

});

/**
 * 通用模块放在common/scripts/module/mobile下
 */

require([
        'index/main'
    ], function(
        IndexMain
    ) {
        
	//根据分辨率重置body字体大小,iphone5为标准，宽320，字体大小10px
    function resetFontSize(){
        var winWidth = $(window).width();
        //如果一开始为横屏，需要处理 todo
        if(winWidth > 700){
            //pad
            var fontSize = 2 * 12;
        }else{
            //手机，包括大屏手机600px
            var fontSize = winWidth * 12/320;
        }
        
        $('html').css('font-size', fontSize + 'px');

        
    }

    resetFontSize();

    $(window).resize(resetFontSize);

    new IndexMain({
        el: '#Take-index'
    });

});

define("main", function(){});

