/**
 * 注册
 */

define([
	'text!root-tpl/signup.tpl',
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
                'register': $.proxy(me.register, me)
            });
        },
        events: {
           'submit .signin-forms': '_validate',
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
        },
        _validate: function(e){
            console.log(132)
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.register({
                    data: {
                        userName: $('input[name="loginName"]', me.$el).val(),
                        userEmail: $('input[name="email"]', me.$el).val(),
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
                    error.appendTo(element.parent().parent().find('.form-error'));
                },
                rules:{
                    loginName:{
                        required: true,
                        isUsername: true,
                        remote:{
                            url: window.serviceBase+'/user/checkUniq',
                            data:{
                                loginName:function(){
                                    return $('[name="loginName"]').val();
                                }
                            },
                            dataType: 'json'
                        }
                    },
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    },
                    email:{
                        required: true,
                        isEmail: true,
                        remote:{
                            url: window.serviceBase+'/user/checkUniq',
                            data:{
                                userEmail:function(){
                                    return $('[name="email"]').val();
                                }
                            },
                            dataType: 'json'
                        }
                    }
                },
                messages:{
                    loginName:{
                        required: '账号不能为空',
                        isUsername: '包含字母或数字，最短 6位，最长 30位',
                        remote: '账号已经存在'
                    },
                    pw:{
                        required: '密码不能为空',
                        ispw: '至少包含字母或数字，最短 6位字符，最长 30位，区分大小写'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    },
                    email:{
                        required: '邮箱不能为空',
                        isEmail: '请输入正确的邮箱',
                        remote: '该邮箱已被使用'
                    }
                }
            });
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
         * [注册成功]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        register: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    util.tip('注册成功！', true);
                    window.location.href = '#';
                }
            }, data, xhr);
        }
    });

    return K;

});
