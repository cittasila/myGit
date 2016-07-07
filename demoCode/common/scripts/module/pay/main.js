/**
 * @overview 支付
 * @author Chunjie
 */

define([
    'text!./main.tpl',
    'text!./alipay.tpl',
    '../popup',
    './thirdpart',
    './model',
    '../../util'
], function(
    tpl,
    alipayTpl,
    popup,
    Thirdpart,
    Model,
    util
) {

    var E_PURCHASE = 'purchase';
    var E_PAY = 'pay';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            me._tpl = doT.template(tpl);
            me._alipayTpl = doT.template(alipayTpl);
            me._model = new Model(config);
            me._model.bind({
                'getAmountList': $.proxy(me.getAmountList, me),
                'userPatrimony': $.proxy(me.userPatrimony, me)
            });
            me.config = $.extend(true, {}, config);
            me.itemCoin = config.coin; //购买对象金额
            me.chooceMoney = null;
        },  
        events: {
          'click .btn-close': 'close',
          'click .btn-wechat': '_wechat',
          'click .btn-purchase': 'pay',
          'click .item-money':'_selectMoney',
          'click .btn-wechat': '_thirdpart',
          'click .btn-alipay': '_thirdpart'
        },
        init: function(isRecharge){
            var me = this;
            
            if(isRecharge){
                me.render();
                
            }else{
                me._model.userPatrimony();
            }
            
        },
        render: function(isOverage){
            var me = this;
            var pop = me._pop = popup.create({
                custom: me._tpl({
                    overage: isOverage,
                    coin: me.config.coin
                }),
                hasHd: false,
                isMove: false,
                mask: true,
                className: 'ui-pay'
            });
            me._moneyList = [];
            
            me.setElement(pop.$el);
            me.$thirdpart = $('.panel-thirdpart', me.$el);
            me.$wechat = $('.panel-wechat', me.$el);
            if(!isOverage){
                me.purchase();
            }
            
        },
        pay: function(e){
            e.preventDefault();
            this.close();
            this.trigger(E_PAY);
        },
        close: function(){
            this._pop.close();
        },
        _wechat: function(e){
            var me = this;
            e.preventDefault();
            me.$thirdpart.hide();
            me.$wechat.show();
        },
        purchase: function(){
            var me = this;
            me.trigger(E_PURCHASE);
            me.close();
            
            me._model.getAmountList();
        },
        _selectMoney:function(e){
            var me = this;
            $('.price-list .active', me.$el).removeClass('active');
            var $item = $(e.currentTarget).addClass('active');
            var index = $('.item-money', me.$el).index($item);
            var list = me._moneyList;
            var item = list[index];
            me.chooceMoney = item;
        },
        _thirdpart: function(e){
            e.preventDefault();
            var me = this;
            var $btn = $(e.currentTarget);
            var name = $btn.data('name');
            if(!me.chooceMoney){
                util.errorTip('请选择充值金额', true);
                return;
            }
            me.close();
            if(Model.isPaying){
                util.errorTip('您当前有尚未处理完的订单，请稍后再试', true);
            }else{
                var thirdpart = new Thirdpart($.extend(true, {
                    name: name,
                    moneyObj: me.chooceMoney
                }, me.config));

                if(name != 'alipay'){
                    thirdpart.bind('recharge', function(){
                        me.render();
                    });
                    thirdpart.bind('success', function(amount){
                        me.trigger('success', amount);
                    });
                }
                
            }
        },
        /**
         * [金币列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getAmountList: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                var cfg = me.config;
                if(!isError){
                    me._moneyList = res.list;
                    var pop = me._pop = popup.create({
                        custom: me._tpl({
                            overage: false,
                            showstr:true,
                            coin: cfg.coin,
                            type: cfg.type,
                            item: cfg.item,
                            list: res.list
                        }),
                        hasHd: false,
                        isMove: false,
                        mask: true,
                        className: 'ui-pay'
                    });
                    me.setElement(pop.$el);
                }
            }, data, xhr);
        },
        /**
         * [用户财产]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        userPatrimony: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    var amount = res.amount;
                    me.render(me.itemCoin <= amount ? 1 : 0);
                }
            }, data, xhr);
        }
    });
   
    return K;  

});