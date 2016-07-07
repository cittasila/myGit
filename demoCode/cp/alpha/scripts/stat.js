/**
 * 统计
 */


define([
   'root-common/module/stat/main',
   'root-common/module/cookie'
], function(
   statMain,
   cookie
) {

    var stat = _.extend({
        /**
         * [发送统计]
         * @param  {[Object]} data [请求参数]
         */
        send: function(param){
            try{
                var token = cookie('hzw_reading_token');
                url = param.url;
                data = param.data;
                url = window.serviceBase + url;

                statMain.send(data, url, token);
            }catch(e){
                
            }
            
        }
    }, Backbone.Events);

    return stat;

});
