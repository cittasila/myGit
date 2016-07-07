/**
 * @overview tab
 * @author Chunjie
 * @version 2015-07-29
 */

define(function(){
    var E_SWITCH = 'switch';
    var defaults = {
        btns: '', //tab导航
        panels: '', //tab面板
        type: 'click',
        index: 0 //默认显示第一项
    };
    var ACTIVE = 'active';
    var SELECT = 'select';
    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            var config = me.config = $.extend({}, defaults, config);
            me.index = me.config.index;
            me.$nav = $(config.btns).bind(config.type, $.proxy(me.change, me));
            me.$main = $(config.panels);
            me.init();
        },
        init: function(){
            var me = this;
            me.show(me.config.index);
        },
        _index: function(e){
            var me = this;
            var $target = $(e.target);
            var $el = $target.closest('li');
            var index = me.$nav.index($el);
            return index;
        },
        change: function(e){
            e.preventDefault();
            var me = this;
            var index = me._index(e);
            me.show(index);
            me.trigger(E_SWITCH, index);
        },
        show: function(index){
            var me = this;
            var $el = me.$nav.eq(index);
            me.index = index;
            //初始化时未捕捉到绑定行为，需要将事件抛出放到绑定之后
            setTimeout(function(){
                me.trigger(SELECT, index);
            }, 0);
            
            me.$nav.removeClass(ACTIVE);
            $el.addClass(ACTIVE);
            me.$main.hide().eq(index).show();
            
        },
        getIndex: function(){
            return this.index;
        }
    });

    return K;
});


