/**
 * @overview 响应式
 * @author Chunjie
 */

define([
    
], function(
 
) {

    var K = Backbone.View.extend({
        initialize: function(){
            var me = this;
            me._tpl = doT.template(tpl);
            console.log(11)
        },  
        events: {
         
        }
    });
   
    return K;  

});