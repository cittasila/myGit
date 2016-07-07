/**
 * 公用区域
 */

define([
	'text!root-tpl/main.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    'root-common/module/scrollbar'
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me.times = null;
            me.inits = 0;
            me.colors = '0f3f66';
            me._tpl = doT.template(tpl);
            me._model = new Model;
            me._model.bind({
                'getUserInfo': $.proxy(me.getUserInfo, me)
            });
        },
        events: {
           'click .btn-confirm': 'btnConfirm',
           'click .img-btn':'btnChange',
           'mouseover .img-btn':'overChange',
           'mouseout .img-btn':'outChange'
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render(); 
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               
            }));  

            this.changeTime()

            $('.ui-signin', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
            // var height = $(window).height();
            // var $form = $('.signin-form', me.$el);
            // $form.css({
            //     'margin-top': height/2 - $form.outerHeight()/2
            // });
        },
        btnConfirm: function(e){
            var me = this;
            e.preventDefault();
            window.audioPlay.click();
            me._model.getUserInfo({}, {
                username: $('input[name="loginName"]', me.$el).val(),
                pw: $('input[name="pw"]', me.$el).val()
            });
            return false;
        },
        overChange:function(){
            var me = this;
            clearTimeout(me.times);
            me.colors = me.inits == 0 ? '0f3f66' : '473c4d';
        },
        outChange:function(){
            this.changeTime();
        },
        /**
         * [切换背景图]
         */
        btnChange: function(e){
            var me = this;
            var _index = $(e.target).index();
            me.colors = _index == 0 ? '0f3f66' : '473c4d';
            me.inits = _index;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            me.go(_index);
        },
        /**
         * [定时切换]
         */
        changeTime: function(e){
            var me = this;
            me.times = setInterval(function(){
                me.go(me.inits);
                me.inits = me.inits == 0 ? 1 : 0;
                me.colors = me.colors == '0f3f66'? '473c4d' : '0f3f66';
            },5000)
        },
        go:function(_index){
            var me = this;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            $('.change .img-btn').removeClass('img-choice');
            $('.change .img-btn').eq(_index).addClass('img-choice');
        },
        /**
         * [登录成功]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getUserInfo: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    cookie('hzw_reading_token', res.token);
                    // cookie('hzw_reading_username', res.userBasic.loginName);
                    util.tip('登录成功', true);
                    if(res.userPhone){
                        window.location.href = '#product';
                    }else{
                        window.location.href = '#phone';
                    }
                    
                }
            }, data, xhr);
        }

    });

    return K;

});
