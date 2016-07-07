/**
 * 统计
 */


define([
   
], function(
   
) {

    var stat = _.extend({
        getRequest: function(url, token) {
            $.ajax({
                url: url,
                cache: false,
                headers: {
                    token: token
                }
            });
        },
        /**
         * [生成param字符串，value为空时跳过]
         */
        param: function(data) {
            var params = [];
            $.each(data, function(key, val) {
                if (val !== '') {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                }
            });
            return params.join('&');
        },
        /**
         * [发送统计]
         * @param  {[Object]} data [请求参数]
         * @param  {[String]} url  [请求地址]
         * @param {[String]}  token    [token]
         */
        send: function(data, url, token){
            var paramMap = {
                // url: location.href
            };
            data = data || {};
            paramMap = $.extend(true, {}, paramMap, data);
            
            // 发送 HTTP 请求
            this.getRequest(url + '?' + this.param(paramMap), token);
        }
    }, Backbone.Events);

    return stat;

});
