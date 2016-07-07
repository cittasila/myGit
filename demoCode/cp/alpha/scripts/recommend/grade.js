/**
 * 
 */

define([
	'text!root-tpl/recommend/main.tpl',
    'text!root-tpl/recommend/grade-list.tpl',
    'root-common/util',
    '../model',
    'root-common/module/cookie',
    'root-common/module/dragval'
], function(
	tpl,
    gradeListTpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._gradeListTpl = doT.template(gradeListTpl);
            me._model = new Model;
            me._model.bind({
                'setGrade': $.proxy(me.setGrade, me),
                'queryAllGrade': $.proxy(me.queryAllGrade, me)
            });
            me._gradeId = null;
        },
        events: {
           'click .btn-confirm': 'submitGrade'
        },
        reset: function(){
            this.$el.html('');
            this._gradeId = null;
        },
        init: function(id){
            var me = this;
            me.render();
        },
        render: function(){
            var me = this;
            me.$el.html(me._tpl({}));
            me._model.queryAllGrade();
            
        },
        submitGrade: function(){
            var me = this;
            var gradeId = me._gradeId;
            if(gradeId){
                me._model.setGrade({
                    data: {
                        grade_id: gradeId
                    }
                });
            }
        },
        /**
         * [设置年级]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        setGrade: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    cookie('grade_choice', '1');
                    window.location.href = '#booklist';
                }
            }, data, xhr);
        },
        /**
         * [获取所有年级]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        queryAllGrade: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me._gradeId = res[0].grade_id;
                    $('.grade-list ul', me.$el).html(me._gradeListTpl({
                        list: res || []
                    }));
                    $('.grade-list li', me.$el).eq(0).addClass('active');
                    $('.input-grade', me.$el).ionRangeSlider({
                        hide_min_max: true,
                        keyboard: true,
                        min: 0,
                        max: 11,
                        type: 'single',
                        step: 1,
                        onChange: function(o){
                            var current = o.from;

                            $('.grade-list li.active', me.$el).removeClass('active');
                            var $current = $('.grade-list li', me.$el).eq(current).addClass('active');
                            me._gradeId = $current.data('id');
                        }
                    });
                    setTimeout(function(){
                        $('.mask, .selection-area', me.$el).show();
                        $('.introduction', me.$el).hide();
                    }, 2500);
                }
            }, data, xhr);
        }
    });

    return K;

});
