/**
 * @overview 进入支付
 * @author Chunjie
 */

define([
    'text!./thirdpart.tpl',
    'text!./alipay.tpl',
    'text!./error.tpl',
    'text!./success.tpl',
    '../popup',
    './model',
    '../../util',
], function(
    tpl,
    alipay,
    errorTpl,
    successTpl,
    popup,
    Model,
    util
    ) {

    var E_RECHARGE = 'recharge';
    var E_SUCCESS = 'success';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            me._tpl = doT.template(tpl);
            me._alipayTpl = doT.template(alipay);
            me._errorTpl = doT.template(errorTpl);
            me._successTpl = doT.template(successTpl);
            me._model = new Model(config);
            me._model.bind({
                'order': $.proxy(me.order, me),
                'checkStatus': $.proxy(me.checkStatus, me),
                'userPatrimony': $.proxy(me.userPatrimony, me)
            });
            me.config = config;
            me.moneyObj = config.moneyObj; //充值金额
            me._type = config.name;
            me._orderNo = ''; //订单id
            me._timer = null; //轮询
            me._status = false; //支付状态
            var pop = me._pop = popup.create({
                custom: '<div class="panel-pay "><div class="loading"></div></div>',
                hasHd: false,
                isMove: false,
                mask: true,
                className: 'ui-pay'
            });
            me.setElement(pop.$el);
            me.loadOrder();
        },  
        events: {
            'click .btn-close': 'close',
            'click .btn-recharge': 'recharge',
            'click .btn-problems': 'problems',
        },
        close: function(){
            this._pop.close();
        },
        recharge: function(){
            this.close();
            this.trigger(E_RECHARGE);
        },
        problems:function(){
            var me = this;
            me.recharge();
        },
        loadOrder: function(){
            var me = this;
            me._model.order({
                data: {
                    amountId: me.moneyObj.id,
                    type: me._type == 'wechat' ? 2 : 1
                }
            });
        },
        /**
         * [下单]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        order: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    me._orderNo = res.orderNo;
                    if(me._type == 'wechat'){
                        $('.panel-pay').css({
                            width:230
                        })
                        $('.panel-pay', me.$el).html(me._tpl({
                            url: res.url,
                            money: me.moneyObj.rmb
                        }));
                        me._pop.resize();
                    }else{
                        $('.panel-pay', me.$el).html(me._alipayTpl({}));
                        me._pop.resize();
                        window.open(res.url,'_blank');
                    }
                    Model.isPaying = true;
                    var now = +new Date;
                    me._timer && clearInterval(me._timer);
                    me._timer = setInterval(function(){
                        var current = +new Date;
                        if(me._status){
                            me.showSuccess();
                            me._timer && clearInterval(me._timer);
                            Model.isPaying = false;
                        }
                        if((current - now)/1000 > 5 * 60){
                            me._timer && clearInterval(me._timer);
                            Model.isPaying = false;
                            if(!me._status){
                                me.showError();
                            }
                            return;
                        }
                        me._model.checkStatus({
                            data: {
                                orderNo: me._orderNo    
                            }
                        });
                        
                    }, 5000);
                }
            }, data, xhr);
        },
        /**
         * [用户余额]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        userPatrimony: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    me.close();
                    var pop = me._pop = popup.create({
                        custom: me._successTpl({
                            gold: me.moneyObj.goldAmount,
                            overage: res.amount
                        }),
                        hasHd: false,
                        isMove: false,
                        mask: true,
                        className: 'ui-pay'
                        
                    });
                    me.setElement(pop.$el);
                    me.trigger(E_SUCCESS, res.amount);
                }
            }, data, xhr);
        },
        /**
         * [检查交易状态]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        checkStatus: function(data, xhr, options, otherOptions){
            var me = this;
            try{
                var resCode = data.resCode;
                var res = data.data;
                if(resCode == '0000' && res.orderStatus == '4'){
                    me._status = true;
                }
            }catch(e){

            }
            
        },
        /**
         * [支付成功]
         */
        showSuccess: function(){
            var me = this;
            me._model.userPatrimony();
            var size = $('.amount').html();
            var newSize = size*1 + me.moneyObj.goldAmount;
            $('.amount').html(newSize);
        },
        /**
         * [支付失败]
         */
        showError: function(){
            var me = this;
            me.close();
            var pop = me._pop = popup.create({
                custom: me._errorTpl({
                    
                }),
                hasHd: false,
                isMove: false,
                mask: true,
                className: 'ui-pay'
                
            });
            me.setElement(pop.$el);
        }
    });
   
    return K;  

});