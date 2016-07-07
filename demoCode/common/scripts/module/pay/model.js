/**
 * 数据模型
 */

define([
    '../../util'
], function(
    util
) {

    var E_GET_AMOUNTLIST = 'getAmountList';
    var E_ORDER = 'order';
    var E_CHECK_STATUS = 'checkStatus';
    var E_USER_PATRIMONY = 'userPatrimony';
    
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
         * [人民币与金币关系列表]
         * @param  {[Object]} options [请求参数]
         */
        getAmountList: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/pay/amountList';
            request.call(this, options, otherParams, E_GET_AMOUNTLIST);
        },
        /**
         * [支付宝/微信下单]
         * @param  {[Object]} options [请求参数]
         */
        order: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/pay/order';
            options.type = 'post';
            options.async = false;
            request.call(this, options, otherParams, E_ORDER);
        },
        /**
         * [根据订单号查询订单交易状态]
         * @param  {[Object]} options [请求参数]
         */
        checkStatus: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/pay/getOrderStatusByOrderId';
            request.call(this, options, otherParams, E_CHECK_STATUS);
        },
        /**
         * [用户财产]
         * @param  {[Object]} options [请求参数]
         */
        userPatrimony: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = this.baseUrl + '/pay/userPatrimony';
            request.call(this, options, otherParams, E_USER_PATRIMONY);
        }

    });

    //支付状态
    K.isPaying = false;

    return K;

});