/**
 * 手机验证
 */

define([
	'text!root-tpl/phone/main.tpl',
    'text!root-tpl/phone/action.tpl',
    'root-common/util',
    'root-common/module/popup',
    './model',
    'root-common/module/cookie',
    'root-common/module/phone-check/main'
], function(
	tpl,
    actionTpl,
    util,
    popup,
    Model,
    cookie,
    PhoneCheck
) {

	var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me._tpl = doT.template(tpl);
            me._actionTpl = doT.template(actionTpl);
            me._pop = null;
            me._page = $(config.el);
            me._el = config.el;
            me._phoneCheck = null; //手机验证流程
        },
        events: {
           'click .btn-logout': '_logout'
        },
        reset: function(){
            this._page.html('');
            this.setElement(this._el);
            this.$el.html('');
            this._pop && this._pop.close();
            this.stopListening();
            this._phoneCheck.reset();
        },
        init: function(){
            
        },
        render: function(user){
            var me = this;
            if(user.userPhone){
                window.location.href = '#product';
                return;
            }

            me.$el.html(me._tpl({
               
            })); 

            var pop = me._pop = popup.create({
                title: '提示',
                custom: '<div class="phone-area"></div>',
                mask: true,
                hasHd: false
            });
           
            me.setElement(pop.$el);
           
            me._phoneCheck = new PhoneCheck({
                el: $('.phone-area', me.$el),
                baseUrl: window.serviceBase,
                token: cookie('hzw_reading_token'),
                type: 1
            });

            me._phoneCheck.bind({
                'notoken': $.proxy(me._logout, me),
                'afterVer': function(){
                    window.location.href = '#product';
                }
            });

            $('.action', me.$el).html(me._actionTpl({
                isTeacher: user.roleId == '42' //42老师，38学生
            }));

            pop.resize();
            
        },
        getUserInfo: function(user){
            this.render(user); 
        },
        _logout: function(e){
            e && e.preventDefault();
            cookie('hzw_reading_token', '', {expires: -1});
            window.location.href = '#';
        }

    });

    return K;

});
