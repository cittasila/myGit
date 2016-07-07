/**
 * 题型基类
 */

define([
	'text!root-tpl/exercise/main.tpl',
    'text!root-tpl/exercise/reading.tpl',
    'text!root-tpl/exercise/process.tpl',
    '../model',
    'root-common/util',
    'root-common/module/scrollbar'
], function(
	mainTpl,
    readingTpl,
    processTpl,
    Model,
    util
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            
            me.mainTpl = doT.template(mainTpl);
            me.readingTpl = doT.template(readingTpl);
            me.processTpl = doT.template(processTpl);
            me.bookId = config.bookId;
            me.book = null;
            me.index = config.index;
            me.total = 0;
            me.type = 2;
            me.data = null; //习题列表
            me.model = new Model;
            me.model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me),
                'getExercises': $.proxy(me.getExercises, me),
                'saveExercise': $.proxy(me.saveExercise, me)
            });
            me.model.getArticleInfo({
                data: {
                    bookId: me.bookId
                }
            });
        },
        events: {
            'click .btn-toggle-article': 'toggleArticle',
            'click .icon-arrow-duble-right': 'closeArticle',
            'click .btn-next': 'next'
        },
        renderMain: function(){
        	var me = this;
        	me.$el.html(me.mainTpl({

        	}));
        },
        renderProcess: function(res){
            var me = this;
            
            $('.ui-process', me.$el).html(me.processTpl({
                index: me.index+1,
                total: me.total
            }));
        },
        reset: function(){
            this.$el.html('');
            this.undelegateEvents();
        },
        toggleArticle: function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            $('.article-area', me.$el).toggle();
            $('.article-area .main', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
        },
        closeArticle: function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            $('.article-area', me.$el).hide();
            $('.article-area .main', me.$el).customScrollbar({
                updateOnWindowResize: false
            });
        },
        /**
         * [获取文章信息]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getArticleInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.book = res;
                    me.model.getExercises({
                        data: {
                            questionStyleId: me.type,
                            bookId: me.bookId
                        }
                    });
                    
                }
            }, data, xhr);
        },
        /**
         * [获取习题列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.total = res.exercisesCount;
                    
                    me.data = res;
                    if(res.exercisesList[me.index].doStatus == 1){
                        var needGo = me.goNext();

                        if(needGo){
                            return;
                        }
                    }
                    me.renderMain();
                    me.renderReading(me.book);
                    me.renderProcess(res);
                    me.render();
                    
                }
            }, data, xhr);
        },
        /**
         * [保存习题答案]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        saveExercise: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                me.data.exercisesList[me.index].doStatus = 1;
                // me.goNext();
            }, data, xhr);
        },
        renderReading: function(res){
            var me = this;
            $('.article-area .inner', me.$el).html(me.readingTpl({
                list: res.content || []
            }));
            
        },
        /**
         * [进入下一题]
         * @param  {[Int]}  index  [题目索引]
         * @param  {Boolean} isAuto [是否自动检查下一题是否做完]
         */
        goNext: function(index, isAuto){

            var me = this;
            var result = false;
            window.audioPlay.click();
            index = index ? index : me.index;
            var item = me.data.exercisesList[index];
            if(index >= me.total - 1 && item.doStatus == 1){
                window.location.href = '#testResult/'+me.bookId+'/'+me.type;
            }else{
                if(item.doStatus == 1){
                    me.goNext(index+1, true);
                }else{
                    result = true;
                    index = isAuto ? index : ++index;
                    window.location.href = '#exercise/'+me.bookId+'/'+index;
                }
                
            }
            return result;
        }
    });

    return K;

});