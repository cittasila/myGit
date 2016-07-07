/**
 * 公用用户信息
 */

define([
    'text!root-tpl/user/bg.tpl',
    'text!root-tpl/user/main.tpl',
    'text!root-tpl/user/student.tpl',
    'text!root-tpl/user/teacher.tpl',
    'text!root-tpl/user/password.tpl',
    'root-common/module/cookie',
    './model',
    'root-common/util',
    'root-common/module/popup'
], function(
    bgTpl,
    usermainTpl,
    studentTpl,
    teacherTpl,
    passwordTpl,
    cookie,
    Model,
    util,
    popup
) {

	var K = Backbone.View.extend({
        initialize: function(){
        	var me = this;
            me._bgTpl = doT.template(bgTpl);
            me._usermainTpl = doT.template(usermainTpl);
            me._studentTpl = doT.template(studentTpl);
            me._teacherTpl = doT.template(teacherTpl);
            me._passwordTpl = doT.template(passwordTpl);
            me._pop = null;
            me._model = new Model;
            me._model.bind({
                'getUserInfo': $.proxy(me.getUserInfo, me),
                'modifyUserInfo':$.proxy(me.modifyUserInfo, me),
                'changePswByOldPsw':$.proxy(me.changePswByOldPsw, me)
            });
            $(window).resize(function(){
                me._pop && me._pop.resize();
            });

            me.user = null;
        },
        reset: function(){
            var me = this;
            me._pop.close();
            me._pop = null;
            me.stopListening();
            this.$el.html('');
        },
        events: {
            'click .information':'information',
            'click .password':'password',
            'click .return-back':'returnBack',
            'submit .news-form':'saveUser',
            'submit .pw-form':'savePassword'
        },
        init: function(type){
            var me = this;
            var token = cookie('hzw_reading_token');
            if(token){
                me._model.getUserInfo({
                    token: token
                });
            }else{
                window.location.href = '#';
            }
            me.render();
        },
        render: function(res){
            var me = this;
            me.$el.html(me._bgTpl({}))
            var pop = me._pop =  popup.create({
                custom: me._usermainTpl({}),
                isMove: false,
                className: 'pop-youyang',
                hasHd:false
            });
            me.setElement(pop.$el);
            me.updateInformation();
            me.getUserInfo();
            me.listenTo(me._pop, 'close', $.proxy(me.closePop, me));
        },
        /**
         * [学生信息/教师信息]
         */
        updateInformation: function(){
            var me = this;
            if(Model.data.userInfo.roleId == '42'){

                $('.box').html(me._teacherTpl({
                    userInfo:me.user
                }));
            }else{
                $('.box').html(me._studentTpl({
                    userInfo:me.user
                }));
            }
        },
        getUserInfo:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.user = res;
                if(!isError){
                    console.log()
                   if(res.roleId == '42'){
                        $('.box').html(me._teacherTpl({
                            userInfo:res
                        }));
                    }else{
                        $('.box').html(me._studentTpl({
                            userInfo:res   
                        }));
                    } 
                }
            }, data, xhr);
        },
        /**
         * [修改密码]
         */
        updatePassword: function(){
            var me = this;
            $('.box').html(me._passwordTpl({
                       
            }));
        },
        /**
         * [关闭用户信息弹出层]
         */
        closePop: function(){
            window.location.href='#product'
        },
        /**
         * [点击修改资料]
         */
        information: function(e){
            var me = this;
            $('.user-menu').removeClass('chooceLi')
            $(e.target).addClass('chooceLi')
            // me.getUserInfo()
            me.updateInformation();


        },
        /**
         * [点击修改密码]
         */
        password: function(e){
            var me = this;
            me.updatePassword();
            $('.user-menu').removeClass('chooceLi')
            $(e.target).addClass('chooceLi')
        },
        /**
         * [保存修改资料]
         */
        saveUser:function(e){
            var me = this;
            var emailReg = /^([\w-]+)@([\w-]+).([\w-]+)$/; 
            var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; 
            var v = emailReg.test($(".user-email[name = 'userEmail']").val());
            var phoneVal = $(".user-phone[name = 'userParentPhone']").val() ;
            var nameVal = $("input[name = 'userRealName']").val();
            var p = phoneReg.test(phoneVal);
            $('.error').remove();

            if(nameVal == ''){
                $(e.currentTarget).parent().parent().find('.form-error').eq(0).append('<span class="error">姓名不得为空</span>')
            }
            if(!v){
                $(e.currentTarget).parent().parent().find('.form-error').eq(1).append('<span class="error">邮箱格式错误</span>')
            }
            if(!p){
                $(e.currentTarget).parent().parent().find('.form-error').eq(2).append('<span class="error">手机格式错误</span>')
            }
            

            e.preventDefault();
            //教师
            if(phoneVal == null && v && nameVal != ''){
                me._model.modifyUserInfo({
                    data: {
                        userRealName : $(".user-name[name = 'userRealName']").val(),
                        userGender  : $("input[name = 'userGender']:checked").val(),
                        userEmail : $(".user-email[name = 'userEmail']").val()
                    }
                });
            }
            //学生
            if(v && p && nameVal != ''){  
                
                me._model.modifyUserInfo({
                    data: {
                        userRealName : $(".user-name[name = 'userRealName']").val(),
                        userGender  : $("input[name = 'userGender']:checked").val(),
                        userEmail : $(".user-email[name = 'userEmail']").val(),
                        userParentName : $(".user-parent[name = 'userParentName']").val(),
                        userParentPhone  : $(".user-phone[name = 'userParentPhone']").val()
                    }
                });
            }
            // return false;
            // $('.news-form', me.$el).submit(v).submit();
        },
        /**
         * [保存修改资料]
         */
        modifyUserInfo:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    
                    var token = cookie('hzw_reading_token');
                    if(token){
                        me._model.getUserInfo({
                            token: token
                        });
                    } 
                    me.getUserInfo()
                    alert('信息修改成功')
                }
            }, data, xhr);
        },
        /**
         * [保存修改密码]
         */
        savePassword:function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.changePswByOldPsw({
                    data: {
                        oldPassword : $("input[name = 'opw']").val(),
                        newPassword  : $("input[name = 'pw']").val(),
                    }
                });
            }
            return false;
        },
        changePswByOldPsw:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    alert('密码修改成功')
                }
            }, data, xhr);
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
                    opw:{
                        required: true
                    },
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    },
                },
                messages:{
                    opw:{
                        required: '密码不能为空'
                    },
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
         * [取消用户信息操作]
         */
        returnBack:function(){
            var me = this;
            me.closePop();
            me.setElement($('#UserPage'));
            this.$el.html('');
        }
    });

    return K;

});
