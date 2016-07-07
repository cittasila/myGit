/**
 * 动态模块管理
 */

define(function() {

    var object = {
        _modules: [],
        /**
         * [添加模块]
         * @param {[Object]} module [模块]
         */
        add: function(module){
            this._modules.push(module);
            return module;
        },
        /**
         * [所有模块还原到初始状态，即可加载]
         */
        clear: function(){
            $.each(this._modules, function(i, v){
                try{
                    v.reset();
                }catch(e){}
            });
        }
    };

    _.extend(object, Backbone.Events);

    return object;

});