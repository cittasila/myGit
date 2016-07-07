/**
 * 阅读详情
 */

define([
    'root-common/module/reading/main',
    'text!root-tpl/reading.tpl',
    'root-common/module/responsive',
    './model',
    'root-common/util',
    './stat'
], function(
	Reading,
    tpl,
    responsive,
    Model,
    util,
    stat
) {

    var E_RENDERED = 'rendered';

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._gap = 150; //空隙
            me._proportion = 8/5;
            me._tpl = doT.template(tpl);
            me._bookId = null;
            me._model = new Model;
            me._model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me)
            });
            me._maxHeight = 0; //分页最大高度
            me._reading = null; //读物对象
            me._currentPage = 1; //当前页面
        },
        reset: function(){
            try{
                this.$el.html('');
                this.stopListening();
            }catch(e){}
            
        },
        events: {
            'click [rol-stat]': '_statArrow',
            'click .btn-logout':'logout',
            'click .btn-arrow': '_addAudio',
            'click .btn-audio .icon-play': '_autoPlay',
            'click .btn-audio .icon-pause': '_pauseAudio'
        },
        init: function(id){
            var me = this;
            me._bookId = id;
            me._model.startReading({
                type: 'post',
                data: {
                    bookId: id
                }
            });
            me._model.getArticleInfo({
                data: {
                    bookId: id
                }
            });
           
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({

            }));
            var $main = $('.main', me.$el);
            
        },
        resize: function(w, h){
            var me = this;
            var width;
            var height;
            var gap = me._gap;
            var p = me._proportion;
            if((w-gap)/(h-gap/2) > p){
                height = (h-gap/2);
            }
            if((w-gap)/(h-gap/2) <= p){
                width = (w-gap);
                height = width/p;
            }
            height = Math.max(570, height);
            width = height*p;
            me._maxHeight = height;
            $('> .main', me.$el).css({
                width: width,
                height: height,
                'marginTop': (h-height)/2
            });
            me._reading.resize(width, height);
            me.animLeft();
            me.trigger(E_RENDERED);
            $('.icon-audio', me.$el).attr({
                'rol-stat': 1,
                'data-stat': 4
            });
        },
        _addAudio: function(){
            $('.page-audio',this.$el)[0].play && $('.page-audio',this.$el)[0].play();
        },
        logout:function(){
            var me = this;
            window.audioPlay.click();
            window.location.href = '#bookNav/'+ me._bookId; 
        },
        /**
         * [获取文章信息]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getArticleInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            // util.dealAjax(function(isError){
                var res = data.data;
                // if(!isError){
                    me.render();
                    me._reading = new Reading({
                        el: $('.content', me.$el),
                        data: res.content
                    });
                    me.listenTo(me._reading, 'readover', $.proxy(me._readover, me));
                    me.listenTo(responsive, 'resize', $.proxy(me.resize, me));
                    me.listenTo(me._reading, 'change.page', $.proxy(me.resetAudio, me));
                    responsive.check();
                    
                // }
            // }, data, xhr);
        },
        /**
         * [点击统计]
         */
        _statArrow: function(e){
            var me = this;
            var dstat = $(e.currentTarget).data('stat');
            
            stat.send({
                url: '/readingContent/saveUserReadingLog',
                data: {
                    bookId: this._bookId,
                    operate: dstat
                }
            });
        },
        _readover: function(){
            var me = this;
            me._model.finishReading({
                type: 'post',
                data: {
                    bookId: me._bookId
                }
            });
            window.audioPlay.completeReading();
            window.location.href = '#readover/'+me._bookId;
        },
        _autoPlay: function(e){
            var me = this;
            $('.icon-pause', me.$el).css('display', 'block');
            $('.icon-play', me.$el).hide();
            me._reading.autoPlay();
        },
        _pauseAudio: function(){
            var me = this;
            me.resetAudio();
            me._reading.pauseAudio();
        },
        resetAudio: function(){
            var me = this;
            $('.icon-pause', me.$el).hide();
            $('.icon-play', me.$el).css('display', 'block');
        },
        animLeft: function(){
            var me = this;
            var left = $(window).width()/2 - me.$el.width()/2;
            me.$el.stop().animate({
                left: left
            }, 'slow', function(){
               
            });
        }
    });

    return K;

});
