/**
 * 习题头部
 */

define([
	'text!root-tpl/exercise/header.tpl',
    '../model',
    'root-common/util'
], function(
	tpl,
    Model,
    util
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me.tpl = doT.template(tpl);
            me._model = new Model;
            me._model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me)
            });
            me.returnBack = null;
            me.booId = null;
        },
        init: function(id,_index){
            var me = this;
            me.booId = id;
            this._model.getArticleInfo({
                data: {
                    bookId: id
                }
            });
            me.returnBack = _index;
        },
        reset: function(){
            this.$el.html('');
        },
        events:{
            'click .btn-back':'btnBck'
        },
        /*返回*/
        btnBck:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.returnBack == 1){
                window.location.href = '#bookNav/' + me.booId;    
            }else{
                window.location.href = '#booklist';    
            }
            
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
                    me.$el.html(me.tpl({
                        book: res
                    }));
                }
            }, data, xhr);
        },
        animLeft: function(){
            var me = this;
            $('.inner', me.$el).stop().animate({
                left: '-100%'
            }, 'slow', function(){
                me.reset();
            });
        }
    });

    return K;

});