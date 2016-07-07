/**
 * 公用头部
 */

define([
	'text!root-tpl/header.tpl',
    'text!root-tpl/trade/main.tpl',
    'root-common/module/cookie',
    './model',
    'root-common/util',
    'root-common/module/pay/main',
    './trade'
], function(
	tpl,
    tradeTpl,
    cookie,
    Model,
    util,
    Pay,
    Trade
) {

    var E_GET_USERINFO = 'getUserInfo';

	var K = Backbone.View.extend({
        initialize: function(){
        	var me = this;
        	me._tpl = doT.template(tpl);
            me._tradeTpl = doT.template(tradeTpl);
        	me._model = new Model;
            me._model.bind({
                'getUserInfo': $.proxy(me.getUserInfo, me)
            });
        },
        events: {
            'click .btn-logout': '_logout',
            'click .btn-home': '_btnhome',
            'click .user-info .balance': 'recharge',
            'click .btn-trade': 'showTrade'
        },
        render: function(res){
            var me = this;
            me.$el.show();
        	me.$el.html(this._tpl({
                userInfo: res
        	}));
        },
        reset: function(){
            this.$el.hide();
        },
        init: function(){
            var me = this;
            var token = cookie('hzw_reading_token');
            if(token){
                me._model.getUserInfo({
                    token: token
                });
            }
            
        },
        _btnhome: function(e){
            e.preventDefault();
            window.audioPlay.click();
            window.location.href = '#product';
        },
        _logout: function(e){
            e.preventDefault();
            window.audioPlay.click();
            cookie('hzw_reading_token', '', {expires: -1});
            window.location.href = '#';
        },
        /**
         * [登录成功]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getUserInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.render(res);
                    me.trigger(E_GET_USERINFO, res);
                }
            }, data, xhr);
        },
        /**
         * [充值]
         */
        recharge: function(e){
            e.preventDefault();
            var me = this;
            var pay = new Pay({
                coin: 1,
                baseUrl: window.serviceBase,
                token: cookie('hzw_reading_token')
            });
            pay.init(1);
            pay.bind('success', function(amount){
                $('.amount', me.$el).text(amount);
            });
            window.audioPlay.click();
        },
        /**
         * [交易记录]
         */
        showTrade: function(e){
            e.preventDefault();
            var trade = new Trade;
        }
    });

    return K;

});
