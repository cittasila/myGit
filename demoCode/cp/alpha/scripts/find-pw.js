/**
 * 手机验证
 */

define([
	'text!root-tpl/find-pw/main.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
        },
        events: {
            'click .btn-str': '_backtosign'
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(user){
            var me = this;
            var path;
            var hostname = location.hostname;
            if(hostname === 'www.lyced.com'){
                path  = 'http://www.lyced.com/LoginAction.action?method=findPwd'
            }
            if(hostname === 'www.17english.com'){
                path = 'http://www.17english.com/LoginAction.action?method=findPwd'
            }
            if(hostname === '192.168.12.240'){
                path = 'http://192.168.12.240/LoginAction.action?method=findPwd'
            }
            
            me.$el.html(me._tpl({
               url : path
            })); 
        },
        _backtosign: function(){
            var me = this;
            me.reset();
            window.audioPlay.click();
            window.location.href = '#';
        }
    });

    return K;

});
