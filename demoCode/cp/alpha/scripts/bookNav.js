/**
 * 书籍导航
 */

define([
	'text!root-tpl/book-nav/main.tpl',
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
            me.bookid = null;//书籍id
            me.typeList = null;//导航阅读状态
            me.question = 0;//题目未作的序号
            me.type = 2;
            me._model = new Model;
            me._model.bind({
                'exercisesStatus':$.proxy(me.exercisesStatus, me),
                'getExercises':$.proxy(me.getExercises, me)
            })
        },
        events: {
           'click .original':'original',
           'click .understand':'understand',
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(id){
            var me = this;
            me.bookid = id;
            me.render();
        },
        render: function(){
            var me = this;
            me._model.exercisesStatus({
                data: {
                    bookId:me.bookid
                }    
            });
            
        },
       
        original:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.typeList.textReading == 2){
                window.location.href = '#reading/'+me.bookid;    
            }
        },
        understand:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.typeList.readingComprehension  == 2){
                me._model.getExercises({
                    data: {
                        questionStyleId: me.type,
                        bookId: me.bookid
                    }
                });
            }
            
        },
        exercisesStatus: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.typeList = res;
                if(!isError){
                    me.$el.html(me._tpl({
                        data:res
                    })); 
                }
            }, data, xhr);
        },
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    if(res.doExercisesStatus == '2'){
                        window.location.href = '#testResult/'+me.bookid +'/' + me.type; 
                    }else{
                        window.location.href = '#exercise/'+me.bookid +'/' + me.question; 
                    }
                }
            }, data, xhr);
        },
        animLeft: function(){
            var me = this;
            $('.selection', me.$el).stop().animate({
                left: '-100%'
            }, 'slow', function(){
                me.reset();
            });
        }
    });

    return K;

});
