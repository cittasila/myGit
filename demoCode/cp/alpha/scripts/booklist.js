/**
 * 阅读详情
 */

define([
    'text!root-tpl/booklist/main.tpl',
    'text!root-tpl/booklist/nav.tpl',
    'text!root-tpl/booklist/panel.tpl',
    'text!root-tpl/booklist/grade-list.tpl',
    './model',
    'root-common/util',
    'root-common/module/popup',
    'root-common/module/pay/main',
    'root-common/module/cookie',
    'root-common/module/tab',
    'root-common/module/tip',
    'root-common/module/scrollbar'
], function(
    tpl,
    navTpl,
    panelTpl,
    gradeListTpl,
    Model,
    util,
    popup,
    Pay,
    cookie,
    Tab
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._navTpl = doT.template(navTpl);
            me._panelTpl = doT.template(panelTpl);
            me._gradeListTpl = doT.template(gradeListTpl);
            me._model = new Model;
            me._user = null;
            me._model.bind({
                'getTopicInfoList': $.proxy(me.getTopicInfoList, me),
                'getBookInfoList': $.proxy(me.getBookInfoList, me),
                'getMyBook': $.proxy(me.getMyBook, me),
                'queryAllGrade': $.proxy(me.queryAllGrade, me),
                'purchase': $.proxy(me.purchase, me)
            });
            me.reset();
            me.gradeStatus = null;
        },
        reset: function(){
            var me = this;
            me._pop = null;
            me._tab = null;
            me._navList = []; //主题列表
            me._panelList = []; //书本列表
            me._mylist = []; //我的书本
            me._topicId = null; //分类id
            me._gradeId = null; //年级id
            me.chooceTitle = ''; //书本类名
            me._isMyList = false; //当前是否为我的书本列表
            me._isShrink = true;
            me.$el.html('');
        },
        events: {
            'click .btn-mybook': '_showMyBook',
            'click .panel-list li': '_readBook',
            'click .panel-booklist .nav-item': '_switchNav',
            'click .current-grade': '_toggleGrade',
            'click .grade li': '_filterGrade'
        },
        init: function(){
            var me = this;
            me.render();
        },
        _toggleGrade: function(e){
            var me = this;
            me._isShrink = !me._isShrink;
            $('.grade', me.$el).toggleClass('grade-shrink');
            me.setGrade();
        },
        setGrade: function(){
            var me = this;
            var text = '';
            if(me._isShrink){
                text = $('.grade li.active', me.$el).text();
            }else{
                text = '年级选择';
            }
            $('.current-grade', me.$el).text(text);
        },
        _filterGrade: function(e){
            var me = this;
            $('.grade li.active', me.$el).removeClass('active');
            var $target = $(e.currentTarget).addClass('active');
            me._gradeId = $target.data('id');
            me.loadList();
            try{
                localStorage.setItem('cp_grade', me._gradeId);
            }catch(e){

            }
        },
        render: function(){
            var me = this;
            me.gradeStatus = cookie('grade_choice') ;
            me.$el.html(me._tpl({
                status: me.gradeStatus
            }));
            me._tab = new Tab({
                btns: $('.book-nav .nav-item', me.$el),
                panels: $('.book-panel .panel-item', me.$el)
            });
            me._tab.bind('switch', function(index){
                me._isMyList = false;
                if(index == 1){
                    me._isMyList = true;
                    me._showMyBook();    
                    me.chooceTitle = '';
                }
            });

            me._toggleGrade();

            me._model.getTopicInfoList();
        },
        renderNav: function(){
            var me = this;
            $('.nav', me.$el).html(me._navTpl({
                list: me._navList
            }));
            $('.nav-list', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
        },
        renderPanel: function(node){
            var me = this;
            var list = me._isMyList ? me._mylist : me._panelList;
            $('.panel', node).html(me._panelTpl({
                list: list,
                chooceTitle : me.chooceTitle,
                isMyList: me._isMyList
            }));
            $('.panel-list li img', node).tipsy({
               
            });
            $('.panel-list', node).customScrollbar({
                updateOnWindowResize: true,
                onCustomScroll: function(e, data){
                    me.showBookImg(data.scrollPercent/100);
                }
            });

            //高亮显示书籍列表
            if(me.gradeStatus == '1' ){
                $('.panel-list li',me.$el).removeClass('light');
                var init = 0;
                var time = setInterval(function(){
                    if(init == list.length){
                        clearInterval(time);
                        cookie('grade_choice','')
                        $('.pop-bg', me.$el).remove();
                        $('.panel-list li',me.$el).removeClass('light');
                    }
                    $('.panel-list li',me.$el).eq(init).addClass('light');
                    init++;
                },500)
            }

            if(list.length > 0){
                me.showBookImg();
            }
        },
        _showMyBook: function(){
            var me = this;
            me._model.getMyBook({
                data: {
                    pageNum: 1,
                    pageSize: 10000
                }
            });
        },
        _readBook: function(e){
            e.preventDefault();
            var me = this;
            var $target = me._isMyList ? $('.panel-mylist') : $('.panel-booklist');
            var index = $('.panel-item', $target).index($(e.currentTarget));
          
            $('.tipsy').remove();
            var list = me._isMyList ? me._mylist : me._panelList;
            var item = list[index];
            var id = item.id;
            var coin = item.goldcoin;

            if(item.purchaseStatus){
                me.goReading(item.id);
            }else{
                var pay = new Pay({
                    coin: coin,
                    baseUrl: window.serviceBase,
                    token: cookie('hzw_reading_token'),
                    item: item,
                    type: 'book'
                });
                pay.init();
                pay.bind('success', function(amount){
                    $('.ui-header .amount').text(amount);
                });
                pay.bind('pay', function(){
                    me._model.purchase({
                        data: {
                            bookId: id
                        }
                    }, {
                        id: id
                    });
                });
            }
        },
        goReading: function(id){
            $('.tipsy').remove();
            window.location.href = '#bookNav/'+id;    
        },
        /**
         * [查询文章主题]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getTopicInfoList: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me._navList = res.topicInfoList;
                    me.renderNav();
                    
                }
            }, data, xhr);
        },
        /**
         * [获取所有年级]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        queryAllGrade: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me._gradeId = me._user.gradeId;
                    try{
                        me._gradeId = localStorage.getItem('cp_grade') || me._gradeId;
                    }catch(e){

                    }
                    $('.grade ul', me.$el).html(me._gradeListTpl({
                        list: res || [],
                        gradeId: me._gradeId
                    }));
                    $('.grade li', me.$el).tipsy({
               
                    });
                    me.setGrade();
                    me.loadList();
                    
                    if(me.gradeStatus == '1' ){
                        $('.grade .animate a', me.$el).animate({
                            width:'50px',
                            'line-height':'50px'
                        },2000,function(){
                            $('.grade .animate a', me.$el).animate({
                                width:'36px',
                                'line-height':'36px'
                            },2000,function(){
                                // $('.pop-bg', me.$el).remove();
                                $('.grade .animate', me.$el).removeClass('animate')
                            })
                        })
                    }
                    
                }
            }, data, xhr);
        },
        /**
         * [查询图书列表带分页]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getBookInfoList: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me._panelList = res.bookRollPage.resultList;
                    me.renderPanel($('.panel-booklist', me.$el));
                }
            }, data, xhr);
        },
        /**
         * [我的图书]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getMyBook: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me._mylist = res.bookRollPage && res.bookRollPage.resultList || [];
                    me.renderPanel($('.panel-mylist', me.$el));
                }
            }, data, xhr);
        },
        _switchNav: function(e){
            e.preventDefault();
            var me = this;
            $('.nav-list .active', me.$el).removeClass('active');
            var $target = $(e.currentTarget).addClass('active');
            var list = me._navList;
            me.chooceTitle = $(e.currentTarget).attr('title');
            var index = $('.nav-list .nav-item', me.$el).index($target);
            if(index > 0){
                var item = list[index-1];
                me._topicId = item.id;
                me.loadList();
            }else{
                me._topicId = null;
                me.loadList();
            }
            
        },
        loadList: function(){
            var me = this;
            var param = {
                pageNum: 1,
                pageSize: 10000
            };
            if(me._topicId){
                param.topicId = me._topicId;
            };
            if(me._gradeId){
                param.gradeId = me._gradeId;
            };
            me._model.getBookInfoList({
                data: param
            });
        },
        /**
         * [购买]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        purchase: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    var id = otherOptions.id;
                    util.successTip('购买成功');
                    me.goReading(id);
                }
            }, data, xhr);
        },
        showBookImg: function(percent){
            var me = this;
            percent = percent || 0;
            var $container = me._isMyList ? $('.panel-mylist', me.$el) : $('.panel-booklist', me.$el);
            var maxHeight = $('.panel-list', $container).height();
            var $list = $('.panel-list ul', $container);
            var $item = $('.panel-list .panel-item', $container);
            var $first = $item.eq(0);
            var totalHeight = $list.height();
            var singleHeight = $first.outerHeight();
            var totalWidth = $list.width();
            var singleWidth = $first.outerWidth();
            var start = Math.floor(totalHeight * percent / singleHeight);
            var row = Math.ceil(maxHeight/singleHeight);
            var num = Math.floor(totalWidth/singleWidth); //每行数量
            var end = (start + row) * num;
            start = start * num;
            
            for (var i = end - 1; i >= start; i--) {
                var $img = $item.eq(i).find('img');
                if($img.hasClass('loading')){
                    $img.attr('src', $img.data('url')).load(function(){
                        $(this).removeClass('loading');  

                    });
                }
                
            };
        },
        setUser: function(user){
            var me = this;
            me._user = user;
            me._model.queryAllGrade();
        }
    });

    return K;

});
