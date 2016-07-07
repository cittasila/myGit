/**
 * 手机验证
 */

define([
    'text!./main.tpl',
    '../../util',
    '../../module/popup',
    './model',
    '../../module/cookie'
], function(
    tpl,
    util,
    popup,
    Model,
    cookie
) {

    var E_AFTER_VER = 'afterVer';
    var E_VALIDATE = 'validate';

    var K = Backbone.View.extend({
        /**
         * [initialize]
         * @param  {[Object]} config [baseUrl：service基础路径，token：用户令牌，type：动态码类型]
         */
        initialize: function (config) {
            var me = this;
            me._tpl = doT.template(config.tpl || tpl);
            me._model = new Model(config);
            me._type = config.type;
            me._isSending = false; //是否在发送手机号
            me._sendTimer = null;
            me._uuid = null;
            me._hasName = config.hasName;
            me._getUuid();
            me._model.bind({
                'verMsg': $.proxy(me.verMsg, me),
                'sendMsg': $.proxy(me.sendMsg, me),
                'getUuid': $.proxy(me.getUuid, me)
            });
            me.render();
        },
        events: {
           'submit .form-validate-phone': '_validate',
           'click .btn-sendcode': '_sendPhone',
           'click .icon-loop': '_getUuid'
        },
        render: function(user){
            var me = this;
            
            me.$el.html(me._tpl({
                
            }));
        },
        reset: function(){
            this._sendTimer && clearInterval(this._sendTimer);
            this._isSending = false;
            this._uuid = null;
        },
        _getUuid: function(){
            this._model.getUuid();
        },
        _validate: function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            me.trigger(E_VALIDATE);
            e.preventDefault();
            if(v){   
                var params = {
                    type: me._type,
                    mobile: $('input[name="phone"]', me.$el).val(),
                    code: $('input[name="dynamicCode"]', me.$el).val()
                };
                if(me._hasName){
                    params.name = $('input[name="name"]', me.$el).val();
                }
                me._model.verMsg({
                    type: 'post',
                    data: params
                });
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            var rules = {
                phone:{
                    required: true,
                    isTelephone: true
                },
                dynamicCode:{
                    required: true,
                    isCode: true
                }
            };
            
            var messages = {
                phone:{
                    required: '手机号不能为空',
                    isTelephone: '手机号格式不正确'
                },
                dynamicCode:{
                    required: '动态码不能为空',
                    isCode: '请输入6位数字动态码'
                }
            };
            if(me._hasName){
                rules.name = {
                    required: true
                };
                messages.name = {
                    required: '用户名不能为空'
                };
            }
            
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.closest('.form-control').find('.form-error'));
                },
                rules: rules,
                messages: messages
            });
        },
        _sendPhone: function(e){
            e.preventDefault();
            var me = this;
            var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            var $target = $(e.currentTarget);
            if(!me._isSending){
                var mobile = $('input[name="phone"]', me.$el).val();
                var code =  $('input[name="code"]', me.$el).val();
                if(reg.test(mobile)){
                    me._model.sendMsg({
                        type: 'post',
                        data: {
                            type: me._type,
                            mobile: mobile,
                            inputCode: code,
                            uuid: me._uuid
                        }
                    }, {
                        node: $target
                    });
                    
                    
                }else{
                    util.errorTip('手机号格式不正确', true);
                }
            }
        },
        /**
         * [验证]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        sendMsg: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    var node = otherOptions.node;
                    node.addClass('btn-disabled');
                    util.successTip(data.resMsg, true);
                    var current = 60;
                    var $num = $('.nosend .num', me.$el).text(current);
                    me._sendTimer && clearInterval(me._sendTimer);
                    me._sendTimer = setInterval(function(){
                        $num.text(--current);
                        if(!current){
                            clearInterval(me._sendTimer);
                            node.removeClass('btn-disabled');
                            me._isSending = false;
                        }
                    }, 1000);
                    me._isSending = true;
                }else{
                    $('input[name="code"]', me.$el).val('');
                    me._isSending = false;
                }
                me._getUuid();
                
            }, data, xhr);
        },
        /**
         * [验证]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        verMsg: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    me.trigger(E_AFTER_VER, res);
                }else{
                    util.errorTip(data.resMsg, true);
                }
            }, data, xhr);
        },
        /**
         * [获取uuid]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getUuid: function(data, xhr, options, otherOptions){
            var me = this;
            me._uuid = data;
            me._setCode(data);
            
        },
        _setCode: function(uuid){
            var me = this;
            var img = window.serviceBase + '/common/getSecurityCode?uuid='+uuid+'&t='+(+new Date);
            $('.img-code', me.$el).html('<img src="'+img+'" />');
        }

    });

    return K;

});
