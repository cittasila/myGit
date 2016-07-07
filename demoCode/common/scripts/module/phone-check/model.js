/**
 * 数据模型
 */

define([
    '../../util',
    '../../module/cookie'
], function(
    util,
    cookie
) {

    var E_SEND_MSG = 'sendMsg';
    var E_VER_MSG = 'verMsg';
    var E_GET_UUID = 'getUuid';
    var E_NO_TOKEN = 'notoken';
    var E_GET_CODE = 'getCode';
    
    /**
     * [异步请求]
     * @param  {[Object]} options     [请求参数]
     * @param  {[Obejct]} otherParams [其它参数]
     * @param  {[String]} eventName   [事件名]
     * @param  {[Function]} cb   [回调函数]
     */
    function request(options, otherParams, eventName, cb){
        var me = this;
        var params = $.extend({
            url: options.url,
            headers: {
                
            },
            data: options.data,
            dataType: 'json',
            success: function(res){
                if(res.status == 401){
                    util.tip(res.resDesc, 3000);
                    me.trigger(E_NO_TOKEN);
                }else{
                    //事件名、数据、xhr、参数
                    
                    me.trigger(eventName, res, null, options.data, otherParams);
                    cb && cb(res);
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                me.trigger(eventName, null, jqXHR);
            }
        }, options);
        if(this.token){
            params.headers.token = this.token
        }
        $.ajax(params);
    }

    var K = Backbone.Model.extend({
        initialize: function(config){
            this.baseUrl = config.baseUrl;
            this.token = config.token;
        },
        /**
         * [发送手机验证码]
         * @param  {[Object]} options [请求参数]
         */
        sendMsg: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/common/sendMsg';
            request.call(this, options, otherParams, E_SEND_MSG);
        },
        /**
         * [验证手机验证码]
         * @param  {[Object]} options [请求参数]
         */
        verMsg: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/common/verMsg';
            request.call(this, options, otherParams, E_VER_MSG);
        },
        /**
         * [获取uuid]
         * @param  {[Object]} options [请求参数]
         */
        getUuid: function(options, otherParams){
            var me = this;
            options = options || {};
            options.type = 'get';
            options.dataType = 'text';
            options.url = this.baseUrl + '/common/uuid';
            request.call(this, options, otherParams, E_GET_UUID);
        },
        /**
         * [获取验证码]
         * @param  {[Object]} options [请求参数]
         */
        getSecurityCode: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/common/getSecurityCode';
            request.call(this, options, otherParams, E_GET_CODE);
        }
    });

    return K;

});