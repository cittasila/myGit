/**
 * 隐私政策
 */

define([
	'text!root-tpl/privacy.tpl'
], function(
	tpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
           
        },
        events: {

        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(user){
            var me = this;
            
            me.$el.html(me._tpl({
               
            })); 
           
        }

    });

    return K;

});
