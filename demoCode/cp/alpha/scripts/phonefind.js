/**
 * 公用头部
 */

define([
	'text!root-tpl/find-pw/action.tpl',
    'text!root-tpl/find-pw/update-pw.tpl',
    'text!root-tpl/find-pw/choice.tpl',
    'root-common/module/cookie',
    './model',
    'root-common/util',
    'root-common/module/popup',
    'root-common/module/pay/main',
    'root-common/module/phone-check/main'
], function(
    actionTpl,
    updatepwTpl,
    choiceTpl,
    cookie,
    Model,
    util,
    popup,
    Pay,
    PhoneCheck
) {

    var E_GET_USERINFO = 'getUserInfo';

	var K = Backbone.View.extend({
        initialize: function(){
        	var me = this;
        	me._actionTpl = doT.template(actionTpl);
            me._updatepwTpl = doT.template(updatepwTpl);
            me._choiceTpl = doT.template(choiceTpl);

            me._model = new Model;
            me._model.bind({
                'changePwByKey': $.proxy(me.changePwByKey, me)
            });

            me._pop = null;
            me._key = null;
            me._phoneCheck = null; //手机验证流程
        },
        reset: function(){
            this.$el.html('');
            this._pop && this._pop.close();
            this._key = null;
            this.stopListening();
        },
        events: {
            'submit .form-updatepw': '_validate',
            'click .btn-logout': '_back',
            'click .btn-backtosign': '_backtosign'
        },
        _back: function(){
            var me = this;
            me.reset();
            me.init();
        },
        _backtosign: function(){
            var me = this;
            me.reset();
            window.location.href = '#';
        },
        render: function(res){
            var me = this;
            me.$el.html(me._choiceTpl({
                
            }));
            var pop = me._pop = popup.create({
                title: '提示',
                custom: '<div class="findpw-area"></div>',
                mask: true,
                hasHd: false
            });

            me.setElement(pop.$el);

            me._phoneCheck = new PhoneCheck({
                el: $('.findpw-area', me.$el),
                baseUrl: window.serviceBase,
                token: cookie('hzw_reading_token'),
                type: 3
            });

            me._phoneCheck.bind({
                'afterVer': $.proxy(me.afterVer, me)
            });

            $('.action', me.$el).html(me._actionTpl({
                
            }));

            pop.resize();
        },
        init: function(){
            var me = this;
            me.render();
        },
        /**
         * [验证过后]
         * @param {[Object]} [data] [数据]
         */
        afterVer: function(data){
            var me = this;
            me._key = data.uuid;
            $('.findpw-area', me.$el).html(me._updatepwTpl({
            
            }));

            me._pop.resize();
        },
        _validate: function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.changePswByKey({
                    type: 'post',
                    data: {
                        key: me._key,
                        password: $('input[name="pw"]', me.$el).val()
                    }
                });
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.closest('.form-control').find('.form-error'));
                },
                rules:{
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    }
                },
                messages:{
                    pw:{
                        required: '密码不能为空',
                        ispw: '6~20位小写英文、数字或"_"的组合'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    }
                }
            });
        },
        /**
         * [修改密码]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        changePwByKey: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    util.tip('修改成功', true);
                    cookie('hzw_reading_token', '', {expires: -1});
                    window.location.href = '#';
                }
            }, data, xhr);
        },
    });

    return K;

});
