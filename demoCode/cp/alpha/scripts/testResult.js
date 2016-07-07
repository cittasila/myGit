/**
 * 测试结果
 */

define([
	'text!root-tpl/book-nav/result.tpl',
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
            me.result = null ;
            me.bookid = null;
            me.choice = 0;//默认选择题目
            me.questionStyleId = '2';
            me.rightPercent = null;
            me._model = new Model;
            me._model.bind({
                'getExercises':$.proxy(me.getExercises, me),
                'getFinishExercises':$.proxy(me.getFinishExercises, me),
                'redoBookExercises':$.proxy(me.redoBookExercises, me)
            })
        },
        events: {
           'click .testbtn':'getfinish',
           'click .btn-reset':'getreset',
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(id, index){
            var me = this;
            me.bookid = id;
            me.render();
            me._model.updateUserBookStatus({
                data: {
                    bookId: id
                }
            });
        },
        render: function(){
            var me = this;
            me._model.getExercises({
                data: {
                    bookId:me.bookid,
                    questionStyleId:me.questionStyleId
                }    
            });
            
        },
        getreset:function(e){
            var me = this;
            e.preventDefault();
            window.audioPlay.click();
            me._model.redoBookExercises({
                data: {
                    bookId:me.bookid,
                    questionStyleId:me.questionStyleId
                }    
            });
        },
        getfinish:function(e){
            var me = this;
            e = e || null;
            var index = e ? $(e.target).index() : 0;
            me.choice = index;
            var choices = me.result.exercisesInfoL[index].userDoquestionId;
            
            me._model.getFinishExercises({
                data: {
                    userDoquestionId:choices
                }    
            });
        },
        redoBookExercises:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    window.location.href = '#exercise/'+me.bookid +'/0';   
                }
            }, data, xhr);
        },
        getFinishExercises:function(data, xhr, options, otherOptions){
            var me = this;

            util.dealAjax(function(isError){
                var res = data.data;
                var exercise = res.exercisesInfo;
                var list = exercise.exercisesOptionInfoL;
                var title = exercise.question;
                var select = exercise.userSelectedOptionId;
                var option = 'ABCDEFGH'.split('');
                if(!isError){
                    me.$el.html(me._tpl({
                        data:me.result,
                        title: title,
                        list: list || [],
                        exercise: exercise,
                        select: select,
                        options: option
                    })); 
                    me.initPie(me.rightPercent*100,100);
                    $('.testbtn').eq(me.choice).addClass('choice');
                }
            }, data, xhr);
        },
        getExercises:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.result = res;
                if(!isError){
                    me.result.usedTime = util.formatTimeE(res.usedTime * 1000);
                    me.result.avgTime = util.formatTimeE(res.avgTime * 1000);
                    me.getfinish();
                    me.rightPercent=res.rightPercent;
                }
            }, data, xhr);
        },
        getTime:function(time){
            return parseInt(time/60)
        },
        /**
         * [初始化饼图]
         */
        initPie: function(score, total){
            var data = [],
            score = 100*score/total;

            series = [100-score, score];

            for (var i = 0; i < series.length; i++) {
                data[i] = {
                    data: series[i]
                }
            }
            var placeholder = $("#placeholder");
            $("#placeholder").css({
                width:154,
                height:154
            })
            $.plot(placeholder, data, {
                series: {
                    pie: { 
                        show: true ,
                        stroke:{
                            color: "#252b17"
                        }
                    }
                },
                colors: ["#252b17", "#fff905"]
            });
        },
       
    });

    return K;

});
