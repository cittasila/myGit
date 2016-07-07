/**
 * 公用头部
 */

define([
    './model',
    'text!root-tpl/trade/main.tpl',
    'text!root-tpl/trade/consume-list.tpl',
    'text!root-tpl/trade/recharge-list.tpl',
    'root-common/module/popup',
    'root-common/module/tab',
    'root-common/module/pagination',
    'root-common/util'
], function(
    Model,
    tpl,
    consumeTpl,
    rechargeTpl,
    popup,
    Tab,
    Pagi,
    util
) {

    var E_GET_USERINFO = 'getUserInfo';

    var K = Backbone.View.extend({
        initialize: function(){
            var me = this;
            me._tpl = doT.template(tpl);
            me._consumeTpl = doT.template(consumeTpl);
            me._rechargeTpl = doT.template(rechargeTpl);
            me._model = new Model;
            me._model.bind({
                'tradeGold': $.proxy(me.consume, me),
                'tradeRecharge': $.proxy(me.recharge, me)
            });
            me.pageSize = 10;
            me.pageNum = 1;
            me.total = 0;
            me.isConsume = true; //是否为消费记录
            me.data = null; //数据
            me.activeIndex = 0;
            me.currentPage = 1;
            me.render();
        },
        events: {
            'click .btn-close': 'close'
        },
        close: function(){
            this.pop.close();
        },
        /**
         * [展示]
         */
        render: function(){
            var me = this;
            var pop = me.pop = popup.create({
                custom: me._tpl({
                   
                }),
                hasHd: false,
                isMove: false,
                mask: true,
                className: 'ui-trade'
            });

            me.setElement(pop.$el);

            var tab = new Tab({
                btns: $('.nav-item', me.$el),
                panels: $('.panel-item', me.$el)
            });

            tab.bind({
                'select': function(index){
                    me.activeIndex = index;
                    me.isConsume = index == 0 ? true : false;
                    me.load();
                }
            });

        },
        load: function(index){
            var me = this;
            me.currentPage = index !== undefined ? index : me.pageNum;
            var method = me.isConsume ? 'tradeGold' : 'tradeRecharge';
            me._model[method]({
                data: {
                    pageSize: me.pageSize,
                    pageNum: me.currentPage
                }
            });
        },
        renderList: function(){
            var me = this;
            var tpl = me.isConsume ? me._consumeTpl : me._rechargeTpl;
            var $item = $('.panel-item', me.$el).eq(me.activeIndex).html(tpl({
                list: me.data || [],
                release: util.release
            }));

            var page = new Pagi({
                el: $('.pagi', $item),
                total: me.total,
                current: me.currentPage
            });
            page.bind('toggle', function(index){

                me.load(index);
            });
        },
        /**
         * [金币使用记录]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        consume: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data.goldDetailRollPage;
                if(!isError){
                    me.data = res.resultList;
                    me.total = Math.ceil(res.iTotalRecords / res.pageSize);
                    me.renderList();
                }
            }, data, xhr);
        },
        /**
         * [金币充值记录]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        recharge: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data.rechargeDetailRollPage;
                if(!isError){
                    me.data = res.resultList;
                    me.total = Math.ceil(res.iTotalRecords / res.pageSize);
                    me.renderList();
                }
            }, data, xhr);
        }
    });

    return K;

});
