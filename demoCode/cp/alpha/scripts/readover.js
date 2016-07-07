/**
 * 阅读详情
 */
define([
    'text!root-tpl/readover/main.tpl',
    './model',
    'root-common/util',
    'root-common/module/cookie',
    'root-common/module/tip'
], function(
    tpl,
    Model,
    util,
    cookie
) {

    var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._model = new Model;
            me._model.bind({
                'finishReading':$.proxy(me.finishReading,me),
                'getCommentList':$.proxy(me.getCommentList,me),
                'commitComment':$.proxy(me.commitComment,me),
                'exercisesStatus':$.proxy(me.exercisesStatus, me),
                'getExercises':$.proxy(me.getExercises, me)
            })
            me._tpl = doT.template(tpl);
            me.type = 2;
            me.bookId = '';//书籍id
            me.chooceTalk = [];//选中的评价
            me.listArray = [];//选中的评价
            me.btnIndex = -1;//选中的按钮索引
        },
        reset: function(){
            var me = this;
            this.$el.html('');
            me.chooceTalk = [];//选中的评价
        },
        events: {
           "click .btn-talk":"evaluate",
           "click .again":"readAgain",
           "click .read-more":"readMore",
           'click .next':"next"
        },
        init: function(id){
            var me = this;
            me.bookId = id;
            me.render();
        },
        render: function(){
            var me = this;
            me._model.exercisesStatus({
                data: {
                    bookId:me.bookId
                }    
            });
            
        },
        next: function(){
            var me = this;
            window.audioPlay.click();
            me._model.getExercises({
                data: {
                    questionStyleId: me.type,
                    bookId: me.bookId
                }
            });
        },
        finishReading:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.$el.html(me._tpl({
                        data:me.typeList ,
                        book:res,
                        list:me.listArray
                    })); 
                }
            }, data, xhr);
        },
        getCommentList:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.listArray = res.list;
                    me._model.finishReading({
                        data: {
                            bookId: me.bookId
                        }
                    });
                }
            }, data, xhr);
        },
        commitComment:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    var index = me.btnIndex;
                    var $btn = $('.btn-talk').eq(index)
                    var status = $btn.hasClass('choce');
                    $btn.hasClass('choce') ? $btn.removeClass('choce') : $btn.addClass('choce')
                }
            }, data, xhr);
        },
        /*
         *再度一遍
         */
        readAgain:function(){
            var me = this;
            me.offpage();
            window.audioPlay.click();
            window.location.href = '#reading/'+ me.bookId;
            window.resetPage();
	    //me.reset();
        },
        /*
         *阅读更多
         */
        readMore:function(){
            var me = this;
            me.offpage();
            window.audioPlay.click();
            window.location.href = '#booklist' ;
        },
        /*
         *给书籍评价
         */
        evaluate:function(e){
            var me = this;
            e.preventDefault();
            var index = $('.btn-talk', me.$el).index($(e.currentTarget));
            me.btnIndex = index;
            var item = me.listArray[index];
            var id = item.id;
            var chooceIndex;
            for(var i=0;i<me.chooceTalk.length;i++){
                if(me.chooceTalk[i] == id){
                    chooceIndex = i;
                }
            }
            if($.inArray(id,me.chooceTalk) == -1){
                me.chooceTalk.push(id);
            }else{
                me.chooceTalk.splice(chooceIndex,1);
            }
            var indexs = me.btnIndex;
            var $btn = $('.btn-talk').eq(indexs)
            var status = $btn.hasClass('choce');
            $btn.hasClass('choce') ? $btn.removeClass('choce') : $btn.addClass('choce')
        },
        offpage:function(){
            var me = this;
            var arrayString = me.chooceTalk.toString()
            me._model.commitComment({
                data:{
                    bookId:me.bookId,
                    evaluateId:arrayString
                }
            });
        },
        exercisesStatus: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.typeList = res;
                if(!isError){
                    me._model.getCommentList({});

                    // me._model.finishReading({
                    //     data: {
                    //         bookId: me.bookId
                    //     }
                    // });
                    
                }
            }, data, xhr);
        },
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    if(res.doExercisesStatus == '2'){
		    	
                        window.location.href = '#testResult/'+me.bookId +'/' + me.type; 
                    }else{
		    	me.offpage();
                        window.location.href = '#exercise/'+me.bookId +'/0'; 
                    }
                }
            }, data, xhr);
        }
    });

    return K;

});
