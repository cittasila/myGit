/**
 * @overview 左右滑动插件
 * @author Chunjie
 * @version 2015-11-11
 */

define([
    
], function() {

    var E_GO = 'go';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            var hammer = new Hammer(me.$el[0]);
            me.timer = null;
            me.index = config.index || 0;
            me.$items = $('[rol="item"]', me.$el);
            me.total = me.$items.size();
            me.$firstItem = me.$items.eq(0);
            me._itemWidth = me.$firstItem.width();
            me.$list = $('[rol="list"]', me.$el);
            me._offset = 0;
            me._x = 0; //移动的距离
            me._defaultLeft = me._getLeft();
            me._setPosition();
            hammer.on('panleft', me._move.bind(me));
            hammer.on('panright', me._move.bind(me));
            hammer.on('panend', me._panend.bind(me));
            me.go(me.index);
        },  
        events: {},
        _setPosition: function() {
            var me = this;
            var width = me._itemWidth;
            me.$items.each(function(i) {
                $(this).css({
                    left: width * i
                });
            });
        },
        _getLeft: function() {
            var me = this;
            var winWidth = $(window).width();
            var contentWidth = $('[rol="item-content"]', me.$firstItem).width();
            var defaultLeft = (winWidth - contentWidth)/2;
            return defaultLeft;
        },
        _getOffset: function(offset, index) {
            var me = this;
            var total = me.total - 1;
            var min = Math.min(0, total);
            var max = Math.max(0, total);
            var width = me._itemWidth;
            var totalWidth = (me.total - 1) * width;
            if(offset > 0){
                return {index: min, left: me._defaultLeft};
            }else if(offset < -totalWidth){
                return {index: max, left: me._defaultLeft - totalWidth};
            }else{
                return {index: index, left: offset};
            }
        },
        go: function(index) {
            var me = this;
            var left = me.$list.offset().left;
            var width = me.$firstItem.width();
            
            var left = me._defaultLeft - index * width;
            var offset = me._getOffset(left, index);

            index = offset.index;

            me.index = index;
            left = me._offset = offset.left;

            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function() {
                me.trigger(E_GO, index);
                me.$list.css({
                    '-webkit-transform' : 'translate3d('+left+'px, 0, 0)'
                });
                $('.active[rol="item"]', me.$el).removeClass('active');
                $('[rol="item"]', me.$el).eq(index).addClass('active');

            }, 0);
            
        },
        _panend: function(panObject) {
            var me = this;
            var x = panObject.deltaX;
            var width = me._itemWidth;
            var index = Math.round((me._offset + x)/width);
            var absindex = Math.abs(index);

            if(Math.abs(x) < width){
                if(x > 0){
                    absindex--;
                }else{
                    absindex++;
                }
            }
            if(absindex > me.total - 1){
                absindex = me.total -1;
            }
            if(index > 0){
                absindex = 0;
            }
            me.go(absindex);
        },
        _move: function(panObject) {
            var me = this;
            var x = panObject.deltaX;
            me._x = x;
            this.move(x);
        },
        move: function(x) {
            var me = this;
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function() {
                var offset = me._offset + x;
                me.$list.css({
                    '-webkit-transform' : 'translate3d('+offset+'px, 0, 0)'
                });
            }, 0);
            
        }
    });
    
    return K;
        

});