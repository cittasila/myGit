/**
 * 公用区域
 */

define([
	'text!root-tpl/index.tpl',
    'text!root-tpl/validation.tpl',
    'text!root-tpl/result-list.tpl',
    'root-common/util',
    './model',
    'root-common/module/popup',
    'root-common/module/phone-check/main'
], function(
	tpl,
    validationTpl,
    resultListTpl,
    util,
    Model,
    popup,
    PhoneCheck
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._validationTpl = doT.template(validationTpl);
            me._resultListTpl = doT.template(resultListTpl);
            me._model = new Model;
            me._model.bind({
                
            });
            me._pop = null;
            me._phoneCheck = null;
        },
        events: {
           
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._pop && me._pop.close();
            me._phoneCheck.reset();
        },
        init: function(){
            var me = this;
            me.render(); 
            
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               
            }));  

            me._pop = popup.create({
                title: '成绩查询',
                custom: '<div class="phone-area"></div>',
                // isMove: false,
                className: 'pop-validation'
            });
            me._phoneCheck = new PhoneCheck({
                el: $('.phone-area', me._pop.$el),
                baseUrl: window.serviceBase,
                tpl: validationTpl,
                hasName: true,
                type: 2
            });

            if(window.hasVer){
                me.renderList();
            }else{
                me._phoneCheck.bind({
                    'afterVer': function(res){
                        window.hasVer = true;
                        window.articleList = res.list || [];
                        window.token = res.token;
                        me.renderList();
                        me._pop.resize();
                    },
                    'validate': function(){
                        me._pop.resize();
                    }
                });
            }

            me._pop.resize();
        },
        renderList: function(){
            var me = this;
            $('.phone-area', me._pop.$el).html(me._resultListTpl({
                list: window.articleList,
                token: window.token
            }));
        }
        
    });

    return K;

});
