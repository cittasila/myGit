/**
 * 初始化习题
 */

define([
	'./factory'
], function(
	factory
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            
        },
        /**
         * [初始化]
         * @param  {[String]} id    [书本id]
         * @param  {[Int]} index [题目索引]
         */
        init: function(id, index){
            var me = this;
            index = parseInt(index);
            factory.init({
                el: me.el,
                type: 'choice',
                bookId: id,
                index: index
            });
        },
        reset: function(){
            factory.reset();
        }
    });

    return K;

});