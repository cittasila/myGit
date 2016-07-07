/**
 * 单选题
 */

define([
	'./base',
	'text!root-tpl/exercise/choice.tpl',
    'root-common/util'
], function(
	Base,
	tpl,
    util
) {

    var options = 'ABCDEFGH'.split('');

    var K = Base.extend({
        initialize: function (config) {
        	var me = this;

        	Base.prototype.initialize.apply(this, arguments);
            me.events = $.extend(true, {}, Base.prototype.events, me.events);
            me.delegateEvents();
        	me._tpl = doT.template(tpl);
        	me.type = 2; //选择题类型2
            me.hasChecked = false; //是否已经检查
        },
        events: {
            'click .option-item': '_select',
            'click .btn-check': '_checkAnswer'
        },
        render: function(){
            var me = this;
            try{
                var exercise = me.data.exercisesList[me.index];
                var list = exercise.exercisesOptionInfoL;
                var title = exercise.question;
                for(var i = 0;i < list.length; i++){
                    if(!$.trim(list[i].questionOption)){
                        list.splice(i, 1);
                        i--;
                    }
                }
                $('.exercise-area', me.$el).html(me._tpl({
                    title: title,
                    list: list || [],
                    exercise: exercise,
                    options: options
                }));
            }catch(e){
                util.errorTip('第'+(me.index+1)+'道题目不存在', true);
            }
        },
        _select: function(e){
            e.preventDefault();
            var me = this;
            if(!me.hasChecked){
                $('.item-selected', me.$el).removeClass('item-selected');
                $(e.currentTarget).addClass('item-selected');
                $('.btn-check', me.$el).removeClass('btn-disable');
            }
            
        },
        _checkAnswer: function(e){
            e.preventDefault();
            var me = this;
            if($(e.currentTarget).hasClass('btn-disable')){
                return;
            }
            me.hasChecked = true;
            $('.question-area', me.$el).addClass('question-done');
            $('.answer-area', me.$el).show();
            var $target = $('.item-selected', me.$el);
            var questionId = $('.question-area', me.$el).data('userdoid');
            var optionId = $target.data('id');
            if($target.hasClass('option-right')){
                window.audioPlay.right();
            }else{
                window.audioPlay.error();
            }
            if(me.index <= me.total - 1){
                me.model.saveExercise({
                    data: {
                        userDoquestionId: questionId,
                        userOptionId: optionId
                    }
                });
            }
        },
        next: function (e) {
            this.goNext();
        }
    });

    return K;

});