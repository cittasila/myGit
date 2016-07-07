define('router',[],function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_LISTENING = 'gotoListening';
    var E_GOTO_SUBJECT = 'gotoSubject';
    var E_GOTO_SUBJECTHOME = 'gotoSubjectHome';
    var E_GOTO_RESULT = 'gotoResult';

    var K = Backbone.Router.extend({
        routes: {
            "": "gotoHome",
            "listening/:id": "gotoListening",
            "subject/:id": "gotoSubjectHome",
            "subject/:id/:id": "gotoSubject",
            "result": "gotoResult"
        },
        initialize: function(){},
        /**
         * [进入首页]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [进入聆听页面]
         */
        gotoListening: function(id){
            this.trigger(E_GOTO_LISTENING, id);
        },
        /**
         * [进入答题首页]
         */
        gotoSubjectHome: function(listeningId){
            this.trigger(E_GOTO_SUBJECTHOME, listeningId);
        },
        /**
         * [进入答题页面]
         */
        gotoSubject: function(listeningId, subjectId){
            this.trigger(E_GOTO_SUBJECT, listeningId, subjectId);
        },
        /**
         * [进入结果页]
         */
        gotoResult: function(){
            this.trigger(E_GOTO_RESULT);
        }
    });

    return K;

});
/**
 * 动态模块管理
 */

define('moduleManager',[],function() {

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
define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define('text!root-tpl/index/main.tpl',[],function () { return '<h1>LISTENING COMPREHENTION</h1>\r\n<div class="audio-list">\r\n\t<h4>\r\n\t\t<i class="current">{{=it.current}}</i>/<i class="total">{{=it.list.length}}</i>\r\n\t</h4>\r\n\t<div class="audio-wrap">\r\n\t\t<ul rol="list">\r\n\t\t\t{{~it.list :val:key}}\r\n\t\t\t<li class="audio-item" rol="item" data-id="{{=val.id}}">\r\n\t\t\t\t<div class="inner" rol="item-content">\r\n\t\t\t\t\t<div class="mask"></div>\r\n\t\t\t\t\t<img src="{{=val.resFaceName}}" width="100%" />\r\n\t\t\t\t\t<a class="icon-listening" href="javascript:;">\r\n\t\t\t\t\t\t<i class="icon-solid">&#xe900;</i>\r\n\t\t\t\t\t\t<i class="icon-solid icon-focus">&#xe904;<i></i></i>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<h5>{{=val.resAuthor}}</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</li>\r\n\t\t\t{{~}}\r\n\t\t\t\r\n\t\t</ul>\r\n\t</div>\r\n</div>';});

/**
 * @overview 左右滑动插件
 * @author Chunjie
 * @version 2015-11-11
 */

define('root-common/module/mobile/scroll',[
    
], function() {

    var E_GO = 'go';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            var hammer = new Hammer(me.$el[0]);
            me.timer = null;
            me.index = config.index || 0;
            me.$items = $('[rol="item"]', me.$el);
            me.total = me.$items.size();
            me.$firstItem = me.$items.eq(0);
            me._itemWidth = me.$firstItem.width();
            me.$list = $('[rol="list"]', me.$el);
            me._offset = 0;
            me._x = 0; //移动的距离
            me._defaultLeft = me._getLeft();
            me._setPosition();
            hammer.on('panleft', me._move.bind(me));
            hammer.on('panright', me._move.bind(me));
            hammer.on('panend', me._panend.bind(me));
            me.go(me.index);
        },  
        events: {},
        _setPosition: function() {
            var me = this;
            var width = me._itemWidth;
            me.$items.each(function(i) {
                $(this).css({
                    left: width * i
                });
            });
        },
        _getLeft: function() {
            var me = this;
            var winWidth = $(window).width();
            var contentWidth = $('[rol="item-content"]', me.$firstItem).width();
            var defaultLeft = (winWidth - contentWidth)/2;
            return defaultLeft;
        },
        _getOffset: function(offset, index) {
            var me = this;
            var total = me.total - 1;
            var min = Math.min(0, total);
            var max = Math.max(0, total);
            var width = me._itemWidth;
            var totalWidth = (me.total - 1) * width;
            if(offset > 0){
                return {index: min, left: me._defaultLeft};
            }else if(offset < -totalWidth){
                return {index: max, left: me._defaultLeft - totalWidth};
            }else{
                return {index: index, left: offset};
            }
        },
        go: function(index) {
            var me = this;
            var left = me.$list.offset().left;
            var width = me.$firstItem.width();
            
            var left = me._defaultLeft - index * width;
            var offset = me._getOffset(left, index);

            index = offset.index;

            me.index = index;
            left = me._offset = offset.left;

            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function() {
                me.trigger(E_GO, index);
                me.$list.css({
                    '-webkit-transform' : 'translate3d('+left+'px, 0, 0)'
                });
                $('.active[rol="item"]', me.$el).removeClass('active');
                $('[rol="item"]', me.$el).eq(index).addClass('active');

            }, 0);
            
        },
        _panend: function(panObject) {
            var me = this;
            var x = panObject.deltaX;
            var width = me._itemWidth;
            var index = Math.round((me._offset + x)/width);
            var absindex = Math.abs(index);

            if(Math.abs(x) < width){
                if(x > 0){
                    absindex--;
                }else{
                    absindex++;
                }
            }
            if(absindex > me.total - 1){
                absindex = me.total -1;
            }
            if(index > 0){
                absindex = 0;
            }
            me.go(absindex);
        },
        _move: function(panObject) {
            var me = this;
            var x = panObject.deltaX;
            me._x = x;
            this.move(x);
        },
        move: function(x) {
            var me = this;
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function() {
                var offset = me._offset + x;
                me.$list.css({
                    '-webkit-transform' : 'translate3d('+offset+'px, 0, 0)'
                });
            }, 0);
            
        }
    });
    
    return K;
        

});

define('text!root-common/module/popup.tpl',[],function () { return '<div class="ui-pop\r\n{{ if(it.className){ }} {{=it.className}}{{ } }}\r\n{{ if(it.tip){ }} ui-pop-tip{{ } }}\r\n" id="ui-pop-{{=it.id}}" name="{{=it.name}}" style="z-index:{{=it.zIndex}}">\r\n    <div class="ui-popbox">\r\n        <div class="ui-popwrap">\r\n            {{ if(it.tip){ }}\r\n            <a class="ui-popclose ui-popaction" href="javascript:;"></a>\r\n            {{ }else{ }}\r\n                {{ if(it.hasHd){ }}\r\n                <div class="ui-pophd\r\n                {{ if(!it.isMove){ }}\r\n                nomove\r\n                {{ } }}\r\n                ">\r\n                    <span class="ui-poptitle"></span>\r\n                    <a class="ui-popclose ui-popaction" href="javascript:;"></a>\r\n                    {{ if(it.isMax){ }}\r\n                    <a class="ui-popmax ui-popaction" href="javascript:;"></a>\r\n                    <a class="ui-popdefault ui-popaction" href="javascript:;"></a>\r\n                    {{ } }}\r\n                </div>\r\n                {{ } }}\r\n            {{ } }}\r\n            \r\n            <div class="ui-popmain"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';});

/**
 * @overview 弹层配置、数据、UI管理/弹层类
 * @author Chunjie
 * @version 2015-07-28
 */

define('root-common/module/popup',[
    'text!./popup.tpl'
], function(tpl, require, exports) {
    var E_CLOSE = 'close';
    var isIe6 = /msie 6/i.test(window.navigator.userAgent);

    //弹层配置、数据、UI管理
    var pops = {
        data: [],//弹层实例集合
        zIndex: 100,//第一个弹层的层叠值
        number: 0,//弹层数量
        //弹层配置
        config: {
            title: '',//弹层标题
            custom: null,//自定义弹层内容
            fade: false,//弹层是否自动消失
            delay: 3000,//自动消失延迟时间
            ajax: false,//异步
            url: '',//请求地址异步请求
            iframe: null,//内嵌iframe
            name: '',//弹出层名称
            isMax: false, //是否显示最大化
            mask: false, //是否显示遮罩
            tip: false, //是否为tip
            className: '', //弹层的自定义className
            isMove: true, //是否能拖拽
            hasHd: true, //是否有头部
            containerBoderWidth: 1
        },
        /*
        * 关闭弹层实例
        * @param {Int} 弹层id
        */
        close: function (id)
        {
            var index;
            if (this.data.length > 0)
            {
                $.each(this.data, function (key, value)
                {
                    if (value.id === id)
                    {
                        index = key;
                    }
                });
                var o = this.data[index];
                o.container.remove();
                if(o.opts.mask){
                    o.mask.remove();
                }
                this.data.splice(index, 1);
                
            }
            return id;
        }
    };

    var Pop = Backbone.View.extend({
        initialize: function(opts, num){
            var self = this;
            self._tpl = doT.template(tpl);
            self.build(opts, num);
        },  
        events: {
            'click .ui-popclose': 'close',
            'click .ui-popmax': 'maximize',
            'click .ui-popdefault': 'defaultsize',
            'mousedown .ui-pophd': 'move'
        },
        build: function (opts, num)
        {
            var self = this;
            this.opts = $.extend({}, pops.config, opts); //弹层配置
            this.id = num; //弹层id
            this.name = this.opts.name; //弹层名称
            //弹层容器
            this.container = $(this._tpl({
                id: this.id,
                zIndex: ++pops.zIndex,
                name: this.name,
                isMax: this.opts.isMax,
                tip: this.opts.tip,
                className: this.opts.className,
                isMove: this.opts.isMove,
                hasHd: this.opts.hasHd
            })).appendTo('body');
            if(this.opts.mask){
                this.mask = $('<div class="ui-mask" id="ui-mask-'+this.id+'"></div>').appendTo('body').css({
                    height: $(document).height()
                });
            }
            this.setElement(this.container);
            this.iframe = null; //内嵌iframe
            this.wrap = $('.ui-popmain', this.container);//弹层主体区
            this.closeBtn = $('.ui-popclose', this.container);//弹层关闭按钮
            this.maxBtn = $('.ui-popmax', this.container);//最大化按钮
            this.defaultBtn = $('.ui-popdefault', this.container);//还原按钮
            //loading图片
            // this.loadImg = $('<div class="ui-loading"><div class="inner"><img src="image/loading.gif" /></div></div>');
            this.iframeMask = $('<div class="ui-iframe-mask" />');//iframe 遮罩,防止拖拽时产生bug
            this.wrapMargin = 0;
            this.containerBoderWidth = this.opts.containerBoderWidth;
            if(this.opts.hasHd){
                this.titleHeight = $('.ui-pophd', self.$el).outerHeight();
            }else{
                this.titleHeight = 0;
            }
            
            this.show();
        },
        /*
        * 显示弹层
        */
        show: function ()
        {
            var self = this;
            if (isIe6) this.container.css({ position: 'absolute' }); //IE6 hack
            this.container.find('.ui-poptitle').html(this.opts.title);
            this._show();
        },
        _show: function ()
        {
            if (this.opts.fade) setTimeout($.proxy(this, 'close'), this.opts.delay);
            if (this.opts.custom) this.getCustom();
            if (this.opts.ajax) this.ajax();
            if (this.opts.iframe) this.getIframe();
            this.setDefaultSize();
            this.reposition();
            this.container.bind('mousedown', $.proxy(this, 'addZIndex'));
        },
        /*
        * 异步
        */
        ajax: function ()
        {
            var self = this;
            // this.wrap.append(this.loadImg);
            $.ajax({
                url: this.opts.url,
                cache: false //清除浏览器缓存
            }).done(function (data)
            {
                self.wrap.html(data);
                self.setDefaultSize();
                self.reposition();
            }).error(function ()
            {
                alert('error')
            });
        },
        /*
        * 设置弹层默认尺寸
        */
        setDefaultSize: function ()
        {
            this.defaultWidth = this.wrap.outerWidth() + this.wrapMargin * 2;
            this.defaultHeight = this.wrap.outerHeight() + this.wrapMargin * 2;
            
        },
        resize: function(){
            this.wrap.css({
                width: this.wrap.find('>*').outerWidth()
            });
            this.setDefaultSize();
            this.reposition();
        },
        /*
        * 显示iframe
        */
        getIframe: function ()
        {
            var self = this;
            // this.wrap.append(this.loadImg);
            $('.iframe').clone().appendTo(this.wrap);
            this.iframe = this.wrap.find('iframe');
            this.iframe
                .show()
                .removeClass('iframe')
                .attr('src', this.opts.iframe.url);

            this.iframe.load($.proxy(this, 'iframeOnload'));
        },
        /*
        * 显示自定义内容
        */
        getCustom: function ()
        {
            this.wrap.html(this.opts.custom);
        },
        /*
        * 关闭弹层
        */
        close: function (e)
        {
            e && e.preventDefault();
            pops.close(this.id);
            this.trigger(E_CLOSE);
        },
        /*
        * 重置弹层显示位置
        */
        reposition: function ()
        {
            var height = this.defaultHeight + this.containerBoderWidth * 2;
            if(!this.opts.tip){
                height += this.titleHeight;
            }
            this.container.css({
                width: this.defaultWidth + this.containerBoderWidth * 2,
                height: height,
                top: Math.max(($(window).height() - this.defaultHeight - this.titleHeight - this.containerBoderWidth * 2) / 2, 0),
                left: ($(window).width() - this.defaultWidth - this.containerBoderWidth * 2) / 2
            });
            
        },
        /*
        * 最大化
        */
        maximize: function ()
        {
            this.container.css({
                top: 0,
                left: 0,
                width: $(window).width(),
                height: $(window).height()
            });
            this.wrap.css({
                width: $(window).width() - this.containerBoderWidth * 2 - this.wrapMargin * 2,
                height: $(window).height() - this.titleHeight - this.containerBoderWidth * 2 - this.wrapMargin * 2
            });
            if (!this.opts.iframe)
            {
                this.wrap.find('>*').css({
                    width: $(window).width() - this.containerBoderWidth * 2 - this.wrapMargin * 2,
                    height: $(window).height() - this.titleHeight - this.containerBoderWidth * 2 - this.wrapMargin * 2
                });
            }
            this.maxBtn.addClass('ui-popmax-hide');
            this.defaultBtn.show();
        },
        /*
        * 还原
        */
        defaultsize: function ()
        {
            this.container.css({
                width: this.defaultWidth + this.containerBoderWidth * 2,
                height: this.defaultHeight + this.titleHeight + this.containerBoderWidth * 2
            });
            this.wrap.css({
                width: this.defaultWidth - this.wrapMargin * 2,
                height: this.defaultHeight - this.wrapMargin * 2
            })
            if (!this.opts.iframe)
            {
                this.wrap.find('>*').css({
                    width: this.defaultWidth - this.wrapMargin * 2,
                    height: this.defaultHeight - this.wrapMargin * 2
                });
            }
            this.reposition();
            this.maxBtn.removeClass('ui-popmax-hide');
            this.defaultBtn.hide();
        },
        /*
        * 置顶
        * @param {Event} event
        */
        addZIndex: function (e)
        {
            $(this.container).css('z-index', ++pops.zIndex);
        },
         /*
        * 移动弹层
        * @param {Event} event
        */
        move: function (e)
        {
            if(!this.opts.isMove){
                return;
            }
            var self = this,
                eHeight = e.clientY - this.container.position().top,
                eWidth = e.clientX - this.container.position().left,
                maxLeft = $(window).width() - this.container.outerWidth(),
                maxTop = $(window).height() - this.container.outerHeight(),
                top,
                left;
            $(document).bind('mousemove', function (e)
            {
                top = e.clientY - eHeight;
                left = e.clientX - eWidth;
                self.container.css({
                    'left': Math.min(maxLeft, Math.max(0, left)),
                    'top': Math.min(maxTop, Math.max(0, top))
                });
                self._showIframeMask();
            }).bind('mouseup', function ()
            {
                self._hideIframeMask();
                $(this).unbind('mousemove');
            });
        },
         /*
        * 加载完iframe里的内容后执行的操作
        */
        iframeOnload: function ()
        {
            this.wrap.css({
                width: this.opts.iframe.width,
                height: this.opts.iframe.height
            });
            this.iframe.show();
            // this.loadImg.remove();
            this.iframeMask.appendTo(this.wrap);
            this.setDefaultSize();
            this.reposition();

            this.iframeMask.bind('mousedown', $.proxy(this, '_hideIframeMask'));
        },
        _hideIframeMask: function (e)
        {
            this.iframeMask.hide();
        },
        _showIframeMask: function (e)
        {
            this.iframeMask.show();
        }
    });
    
    /*
    * 创建弹层
    * @param {Object} 弹层实例配置
    */
    return {
        create: function (opts){
            var pop = new Pop(opts, ++pops.number);

            pops.data.push(pop);

            return pop;
        }
    }
        

});

define('root-common/util',[
    './module/popup',
    'require',
    'exports'
], function(popup, require, exports) {

	/**
     * 打开窗口
     * @param {String} 链接
     * @param {String} 打开方式
     */
	function openURL(url, target){
		if(!$.browser.msie){
			if(target){
				window.open(url, target)
			}else{
				location.href = url;
			}
		}else{
			var a = $('<a href="' + url + '" target="'+ (target || '_self') +'"> </a>')[0];
			document.body.appendChild(a);
			a.click();
		}
	}

    /**
     * @public 格式化日期
     * @param {pattern} 格式化正则
     * @param {date} 需格式化的日期对象
     */
    function formatDate(pattern, date) {
        if (date === undefined) {
            date = new Date();
        }
        else if ($.isNumeric(date)) {
            date = new Date(parseInt(date, 10));
        }
        return pattern.replace(/([YMDhsm])\1*/g, function (format) {
            switch (format.charAt()) {
                case 'Y':
                    return formatNumber(date.getFullYear(), format);
                case 'M':
                    return formatNumber(date.getMonth() + 1, format);
                case 'D':
                    return formatNumber(date.getDate(), format);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return formatNumber(date.getHours(), format);
                case 'm':
                    return formatNumber(date.getMinutes(), format);
                case 's':
                    return formatNumber(date.getSeconds(), format);
            }
        });
    }

	/**
     * @public 格式化时间长度
     * @param {pattern} 格式化正则
     * @param {date} 需格式化的日期对象
     */
    function formatTime(pattern, time, noPrefix) {
        if ($.type(time) == 'date')
            time = time.getTime();
        else
            time = parseInt(time);
        var date = new Date(time),
            h = date.getHours();
        if (date > 43200000)
            h += Math.floor(date / 43200000);
        if (noPrefix) {
            pattern = pattern.replace(/(\w)\1+/g, '$1');
        }
        return pattern.replace(/([hms])\1*/g, function (format) {
            switch (format.charAt()) {
                case 'h':
                    return formatNumber(h - 8, format);
                case 'm':
					var m = (/h+/.test(pattern) ? 0 : h -8) * 60 + date.getMinutes();
                    return formatNumber(m, format);
                case 's':
                    return formatNumber(date.getSeconds(), format);
            }
        });
    }

    /**
     * @public 格式化日期
     * @param {int/Date} 开始时间
     * @param {end/Date} 结束时间
     * @param {format/String} 大于30天后显示的样式
     */
    var oneDaySer = 24*60*60; // 一天的秒数
    function release(start, end, format) {
        if ($.isNumeric(start)) {
            start = new Date(parseInt(start, 10));
        }
        if ($.isNumeric(end)) {
            end = new Date(parseInt(end, 10));
        }
        if (start === undefined)
            start = new Date;
        if (end === undefined)
            end = new Date;
        if(!format){
            format = 'YYYY年MM月DD日';
        }
        var endZero = new Date(end.toDateString()); // 凌晨时间
        var diff = (+end - +start) / 1000;
        var diffZero = (+end - +endZero) / 1000;
        if(diff <= 60)
            return '刚刚';
        else if (diff <= 60*60)
            return Math.floor(diff / 60) + '分钟前';
        else if (diff <= diffZero)
            return Math.floor(diff / 3600) + '小时前';
        else if (diff <= diffZero + oneDaySer)
            return '昨天';
        else if (diff <= diffZero + oneDaySer*2)
            return '前天';
        else if (diff <= diffZero + oneDaySer*25)
            return Math.floor(diff / oneDaySer) + '天前';
        else
            return formatDate(format, start);
    }

    function formatTimeE(time, noPrefix) {
        if (time < 3600000) {
            return formatTime('mm分ss秒', time, noPrefix);
        }
        else {
            return formatTime('hh小时mm分ss秒', time, noPrefix);
        }
    }

    /**
     * [format(2, '00000') -> '00002']
     * @param  {[Number]} data   [初始值]
     * @param  {[String]} format [转换规则]
     * @return {[String]}        [结果值]
     */
    function formatNumber(data, format) {
        format = format.length;
        data = data || 0;
        return format == 1 ? data : (data = String(Math.pow(10, format) + data)).substr(data.length - format);
    }

    /**
     * [获取querystring]
     * @param {[String]} [param] [querystring参数]
     * @return {[Array]} [匹配到的querystring]
     */
    function queryString(param){
        var reg = /[\?\&]([^&]+=[^&#]+)/g;
        var regResult;
        var result = [];
        var val = '';
        var url = window.location.href;
        while(regResult = reg.exec(url)){
            result.push(regResult[1]);
        }
        if(param){
            $.each(result, function(i, v){
                if(v.indexOf(param) !== -1){
                    var index = v.indexOf('=');
                    val = v.slice(index + 1);
                    return false;
                }
            });
            return val;
        }else{
            return result;    
        }
    }

    /**
     * [全局错误提示]
     */
    function errorTip(tip, isFade){
        return popup.create({
            title: '提示',
            custom: '<i class="icon icon-error"></i>'+tip,
            tip: true,
            fade: isFade
        });
    }

    /**
     * [全局成功提示]
     */
    function successTip(tip){
        return popup.create({
            title: '提示',
            custom: '<i class="icon icon-success"></i>'+tip,
            tip: true,
            fade: true
        });
    }

    /**
     * [全局提示]
     */
    function tip(tip, isFade){
        var params = {
            title: '提示',
            custom: tip,
            tip: true,
            fade: isFade
        };
        return popup.create(params);
    }

    /**
     * [处理异步请求]
     * @param  {Function} cb   [回调,参数为是否返回错误信息]
     * @param  {[Object]}   data [返回的数据]
     * @param  {[Object]}   xhr  [xhr]
     */
    function dealAjax(cb, data, xhr){
        var data = data || {};
        try{
            if($.isEmptyObject(data)){
                
                if(xhr){
                    var responseText = xhr.responseText;
                    var msg = '状态：' + xhr.status + '， 异常信息：' + xhr.statusText;
                    if(responseText){
                        try{
                            responseText = $.parseJSON(responseText);
                            msg = '请求地址：'+responseText.path + '， ' + msg;
                        }catch(e){}
                    }
                    errorTip(msg);
                }
                
            }else{
                if(data.resCode == '0000'){
                   cb && cb();
                }else{
                    cb && cb(true);
                    if(data && $.type(data) == 'object' && data[1] == 'timeout'){
                        //data为arguments类型
                        errorTip('网络请求慢，连接超时，请重试', true);
                    }else{
                        errorTip(data.resMsg, true);
                    }
                    
                }
            }
        }catch(e){
            throw('ajax data error:' + e);
        }
        
    }

    /**
     * [移动端处理异步请求]
     * @param  {Function} cb   [回调,参数为是否返回错误信息]
     * @param  {[Object]}   data [返回的数据]
     * @param  {[Object]}   xhr  [xhr]
     */
    function mDealAjax(cb, data, xhr){
        var data = data || {};
        try{
            if(data.resCode == '0000'){
               cb && cb();
            }else{
                cb && cb(true);
            }
        }catch(e){
            throw('ajax data error:' + e);
        }
        
    }

    /**
     * [数组去重]
     * @param  {[Array]} arr  [数组]
     * @param  {[String]} prop [属性]
     * @return {[type]}      [数组]
     */
    function unique(arr, prop){
        var res = [];
        var o = {};
        $.each(arr, function(i, v){
            var p = prop ? v[prop] : v;
            if(!o[p]){
                res.push(v);
                o[p] = 1;
            }
        });
        return res;
    }

    /**
     * [指定位置插入字符串]
     * @param  {String} str   [字符串]
     * @param  {[String]}   flg [插入的值]
     * @param  {[Int]}   sn  [索引]
     */
    function insertStr(str, flg, sn){
        return str.slice(0, sn) + flg + str.slice(sn);
    }


    /**
     * [异步请求]
     * @param  {[Object]} options     [请求参数]
     * @param  {[String]} eventName   [事件名]
     * @param  {[Obejct]} otherParams [其它参数]
     */
    function request(options, eventName, otherParams){
        var me = this;
        var params = $.extend({
            dataType: 'json',
            success: function(res){
                //事件名、数据、xhr、参数
                me.trigger(eventName, res, null, options.data, otherParams);
            },
            error: function(jqXHR, textStatus, errorThrown){
                me.trigger(eventName, null, jqXHR);
            }
        }, options);
        $.ajax(params);
    }

    function Base64() {  
   
        // private property  
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
    
        // public method for encoding  
        this.encode = function (input) {  
            var output = "";  
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
            var i = 0;  
            input = _utf8_encode(input);  
            while (i < input.length) {  
                chr1 = input.charCodeAt(i++);  
                chr2 = input.charCodeAt(i++);  
                chr3 = input.charCodeAt(i++);  
                enc1 = chr1 >> 2;  
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
                enc4 = chr3 & 63;  
                if (isNaN(chr2)) {  
                    enc3 = enc4 = 64;  
                } else if (isNaN(chr3)) {  
                    enc4 = 64;  
                }  
                output = output +  
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
            }  
            return output;  
        }  
       
        // public method for decoding  
        this.decode = function (input) {  
            var output = "";  
            var chr1, chr2, chr3;  
            var enc1, enc2, enc3, enc4;  
            var i = 0;  
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
            while (i < input.length) {  
                enc1 = _keyStr.indexOf(input.charAt(i++));  
                enc2 = _keyStr.indexOf(input.charAt(i++));  
                enc3 = _keyStr.indexOf(input.charAt(i++));  
                enc4 = _keyStr.indexOf(input.charAt(i++));  
                chr1 = (enc1 << 2) | (enc2 >> 4);  
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
                chr3 = ((enc3 & 3) << 6) | enc4;  
                output = output + String.fromCharCode(chr1);  
                if (enc3 != 64) {  
                    output = output + String.fromCharCode(chr2);  
                }  
                if (enc4 != 64) {  
                    output = output + String.fromCharCode(chr3);  
                }  
            }  
            output = _utf8_decode(output);  
            return output;  
        }  
       
        // private method for UTF-8 encoding  
        _utf8_encode = function (string) {  
            string = string.replace(/\r\n/g,"\n");  
            var utftext = "";  
            for (var n = 0; n < string.length; n++) {  
                var c = string.charCodeAt(n);  
                if (c < 128) {  
                    utftext += String.fromCharCode(c);  
                } else if((c > 127) && (c < 2048)) {  
                    utftext += String.fromCharCode((c >> 6) | 192);  
                    utftext += String.fromCharCode((c & 63) | 128);  
                } else {  
                    utftext += String.fromCharCode((c >> 12) | 224);  
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                    utftext += String.fromCharCode((c & 63) | 128);  
                }  
       
            }  
            return utftext;  
        }  
       
        // private method for UTF-8 decoding  
        _utf8_decode = function (utftext) {  
            var string = "";  
            var i = 0;  
            var c = c1 = c2 = 0;  
            while ( i < utftext.length ) {  
                c = utftext.charCodeAt(i);  
                if (c < 128) {  
                    string += String.fromCharCode(c);  
                    i++;  
                } else if((c > 191) && (c < 224)) {  
                    c2 = utftext.charCodeAt(i+1);  
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                    i += 2;  
                } else {  
                    c2 = utftext.charCodeAt(i+1);  
                    c3 = utftext.charCodeAt(i+2);  
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                    i += 3;  
                }  
            }  
            return string;  
        }  
    }  

	exports.openURL = openURL;
	exports.formatDate = formatDate;
    exports.formatTime = formatTime;
	exports.formatNumber = formatNumber;
	exports.formatTime = formatTime;
	exports.formatTimeE = formatTimeE;
    exports.release = release;
    exports.queryString = queryString;
    exports.errorTip = errorTip;
    exports.successTip = successTip;
    exports.tip = tip;
    exports.dealAjax = dealAjax;
    exports.insertStr = insertStr;
    exports.unique = unique;
    exports.request = request;
    exports.mDealAjax = mDealAjax;
    exports.Base64 = Base64;
});

/**
 * 推荐的命题
 */

define('model',[
    'root-common/util'
], function(util) {

	var E_FINDALL = 'findAll';
    var E_FINDSUBJECT = 'findSubject';

    var K = Backbone.Model.extend({
        initialize: function(){},
        /**
         * [查询所有资源]
         * @param  {[Object]} options [请求参数]
         */
        findAll: function(options){
            options = $.extend({
                type: 'post',
                url: window.serviceBase + '/weixin/weixinInterface/getTestResourse'
            }, options);
            util.request.call(this, options, E_FINDALL);
        },
        /**
         * [查询题目]
         * @param  {[Object]} options [请求参数]
         */
        findSubject: function(options){
            options = $.extend({
                type: 'post',
                url: window.serviceBase + '/weixin/weixinInterface/getTopic'
            }, options);
            util.request.call(this, options, E_FINDSUBJECT);
        },
        /**
         * [统计答题]
         * @param  {[Object]} options [请求参数]
         */
        sendAnswer: function(options){
            options = $.extend({
                type: 'post',
                url: window.serviceBase + '/weixin/weixinInterface/sendAnswer'
            }, options);
            util.request.call(this, options);
        }
    });

    return K;

});
/**
 * 开发、测试、生产环境自适应静态文件域
 */

define('auto-domain',[
	
], function() {

	var env = 'online';
	var hostname = location.hostname;
	var testIp = '192.168.12.250';
	var testServicePort = '8080';
	var preUrl = 'http://';
	var debugReg = /192.168|localhost|debug./;
	
	//测试环境
	if(debugReg.test(hostname)){
		env = 'test';
	}

	try {
		if(env == 'test'){
			//测试环境
		    window.serviceBase = preUrl + testIp + ':' + testServicePort;
		}else{
			//生产
			window.serviceBase = preUrl + hostname;
		}
		
	} catch (ex) {
		alert("自适应域名脚本执行错误!\n");
	}

});

/**
 * 首页
 */

define('index/main',[
	'text!root-tpl/index/main.tpl',
    'root-common/module/mobile/scroll',
    '../model',
    'root-common/util',
    '../auto-domain'
], function(
	tpl,
    Scroll,
    Model,
    util
) {
	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._timer = null;
            me._scroll = null;
            me._isRender = false;
            me._model = new Model;
            me._model.bind({
                'findAll': me._getList.bind(me)
            });
            me._data = null;
            $(window).resize(function() {
                if(me._isRender){
                    me.render();
                }
            });
        },
        events: {
            'click .audio-item .icon-listening': 'listen'
        },
        init: function(){
            var me = this;
            me._data = null;
            me._model.findAll({
                data: {
                    deviceId: window.deviceId,
                    userAgent: navigator.userAgent
                }
            });
            $('html').removeClass().addClass('bg-index');
        },
        render: function() {
            var me = this;
            var data = me._data;
            try{
                var current = Math.round(data.length/2);
                me.$el.html(me._tpl({
                    list: data,
                    current: current
                }));
                
                me._scroll = new Scroll({
                    el: $('.audio-wrap', me.$el),
                    index: current
                });
                me._scroll.bind('go', function(index) {
                    $('h4 .current', me.$el).text(index+1);
                });
                me._isRender = true;
            }catch(e){}
        },
        reset: function(){
            this.$el.html('');
            this._scroll = null;
            this._isRender = false;
        },
        listen: function(e) {
            var id = $(e.target).closest('.audio-item').data('id');
            setTimeout(function() {
                location.href = '#listening/' + id;
            }, 300);
        },
        /**
         * [获取列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _getList: function(data, xhr){
            var me = this;
            
            util.mDealAjax(function(isError){
                if(!isError){
                    me._data = data.testResourse;
                    me.render();
                }
                
            }, data, xhr);
        }

    });

    return K;

});


define('text!root-tpl/listening/main.tpl',[],function () { return '<div class="btn-back">\r\n\t<a class="icon-linear" href="#">&#xe900;</a>\r\n</div>\r\n<div class="listen-area">\r\n\t<h1>{{=it.resTitle}}</h1>\r\n\t<div class="btn-listen">\r\n\t\t<i class="icon-solid icon-start">&#xe905;</i>\r\n\t\t<i class="icon-solid icon-resume">&#xe906;</i>\r\n\t</div>\r\n\t<audio id="Audio" controls="controls" unselectable="on" preload="true"><source src="{{=it.resExistingName}}" type="audio/mpeg"></audio>\r\n\t<div class="wave">\r\n\t\t<img src="images/wave.gif" />\r\n\t\t<div class="line"></div>\r\n\t</div>\r\n\r\n</div>\r\n';});

/**
 * 首页
 */

define('listening/main',[
	'text!root-tpl/listening/main.tpl',
    '../model',
    'root-common/util'
], function(
	tpl,
    Model,
    util
) {
	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._audio = null;
            me._isPlaying = false;
            me._playTimer = null;
            me._timer = null;
            me._model = new Model;
            me._model.bind({
                'findAll': me._getList.bind(me)
            });
            me._data = null;
            me._id = null;
            me._hasLoaded = false; //是否加载完成音频
        },
        events: {
           'tap .listen-area': '_toggleListen'
        },
        init: function(id){
            var me = this;
            me._data = null;
            me._id = id;
            me._model.findAll({
                data: {
                    deviceId: window.deviceId,
                    userAgent: navigator.userAgent
                }
            });
            $('html').removeClass().addClass('bg-listening');
        },
        render: function() {
            var me = this;
            try{
                var data = me._data;
                me.$el.html(me._tpl(data));
                me._audio = $('#Audio')[0];
                //iphone6不支持canplay,canplaythrough
                me._audio.addEventListener('progress', function() {
                    setTimeout(function() {
                        me._hasLoaded = true;
                    }, 300);
                });
                me._audio.addEventListener('canplaythrough', function() {
                    me._hasLoaded = true;
                });
            }catch(e){
                
            }
            
            
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._hasLoaded = false;
            if(me._audio){
                me.pause();
            }
            
        },
        _toggleListen: function(e) {
            var me = this;
            var audio = me._audio;
            if(!me._hasLoaded){
                return;
            }
            $(e.currentTarget).toggleClass('listen-playing');
            if(me._isPlaying){
                me.pause();
            }else{
                me.resume();
            }
        },
        /**
         * [暂停播放标准语音]
         */
        pause: function(){
            var me = this;
            var audio = me._audio;
            try{
                me._timer && clearTimeout(me._timer);
                me._timer = setTimeout(function(){
                    me._isPlaying = false;
                    audio.pause();
                }, 30);
                
            }catch(e){

            }
            
        },
        /**
         * [播放音频]
         */
        resume: function() {
            var me = this;
            var audio = me._audio;
            try{
                me._timer && clearTimeout(me._timer);
                me._timer = setTimeout(function(){
                    me._isPlaying = true;
                    audio.play();
                }, 30);
                me._playTimer && clearInterval(me._playTimer);
                me._playTimer = setInterval(function(){
                    if(audio.ended){
                        location.href = '#subject/' + me._id;
                        clearInterval(me._playTimer);
                    }
                }, 30);
            }catch(e){

            }
        },
        /**
         * [获取列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _getList: function(data, xhr){
            var me = this;
            
            util.mDealAjax(function(isError){
                if(!isError){
                    var list = data.testResourse;
                    data = _.where(list, {id: me._id});
                    me._data = data[0];
                    me.render();
                }
                
            }, data, xhr);
        }

    });

    return K;

});


define('text!root-tpl/subject/main.tpl',[],function () { return '<div class="rate-group">\r\n\t{{~it.list :val:key}}\r\n\t{{\r\n\t\tvar hasAnswer = _.where(it.resultList, {topicId: val.id})[0];\r\n\r\n\t}}\r\n\t<span class="rate-item\r\n\t{{ if(hasAnswer && hasAnswer.answerIscorrect == 1){ }}\r\n\t rate-done\r\n\t{{ } }}\r\n\t{{ if(hasAnswer && hasAnswer.answerIscorrect == 0){ }}\r\n\t rate-error\r\n\t{{ } }}\r\n\t">\r\n\t\t<i class="icon-linear icon-default">&#xe901;</i>\r\n\t\t<i class="icon-solid icon-done">&#xe902;</i>\r\n\t\t<i class="icon-solid icon-error">&#xe901;</i>\r\n\t</span>\r\n\t{{~}}\r\n\t\r\n</div>\r\n<h1>{{=it.data.topicContent}}</h1>\r\n<div class="subject-list">\r\n\t{{~it.data.answerlist :val:key}}\r\n\t<div class="subject-item" data-answer="{{=val.answerIscorrect}}" data-id="{{=val.id}}">\r\n\t\t<span class="icon-group">\r\n\t\t\t<i class="icon-linear icon-ready">&#xe904;</i>\r\n\t\t\t<i class="icon-solid icon-done">&#xe903;</i>\r\n\t\t</span>\r\n\t\t\r\n\t\t{{=val.answerContent}}\r\n\t\t<div class="result">\r\n\t\t\t<i class="icon-linear icon-write">&#xe902;</i>\r\n\t\t\t<i class="icon-linear icon-wrong">&#xe903;</i>\r\n\t\t</div>\r\n\t</div>\r\n\t{{~}}\r\n\t\r\n</div>\r\n<div style="display:none;">\r\n\t<audio class="right-audio" controls="controls" unselectable="on" preload="true"><source src="images/right_tips.mp3" type="audio/mpeg"></audio>\r\n\t<audio class="error-audio" controls="controls" unselectable="on" preload="true"><source src="images/error.wav" type="audio/mpeg"></audio>\r\n</div>\r\n';});

/**
 * 首页
 */

define('subject/main',[
	'text!root-tpl/subject/main.tpl',
    '../model',
    'root-common/util'
], function(
	tpl,
    Model,
    util
) {
	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._answerList = []; //答题结果列表
            me._model = new Model;
            me._model.bind({
                'findSubject': me._getSubject.bind(me)
            });
            me.reset();
        },
        events: {
           'tap .subject-item': '_answer'
        },
        init: function(listeningId, subjectId){
            var me = this;
            me._id = listeningId;
            me._subjectId = subjectId;
            me._isHome = subjectId ? false : true;
            //进入首页清空答题列表
            if(!subjectId){
                me._answerList = [];
            }
            me._model.findSubject({
                data: {
                    deviceId: window.deviceId,
                    userAgent: navigator.userAgent,
                    resId: listeningId
                }
            });
            $('html').removeClass().addClass('bg-subject');
        },
        render: function() {
            var me = this;
            var list = me._data || [];
            try{
                var isHome = me._isHome;
                var index = isHome ? 0 : _.findLastIndex(list, {
                  id: me._subjectId
                });
                
                me._subjectId = list[index].id;
                me._index = index;
                var data = list[index];
                me.$el.html(me._tpl({
                    list: list,
                    isHome: isHome,
                    data: data,
                    resultList: me._answerList
                }));
                me._errorAudio = $('.error-audio', me.$el)[0];
                me._rightAudio = $('.right-audio', me.$el)[0];
            }catch(e){}
           
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._hasAnswer = false;
            me._data = null;
            me._isHome = true; //是否为答题首页
            me._id = null;
            me._subjectId = null;
            me._index = null;
            me._errorAudio = null;
            me._rightAudio = null;
        },
        _answer: function(e){
            var me = this;
            if(!me._hasAnswer){
                var $target = $(e.currentTarget);
                var answerId = $target.data('answer');
                var topicId = $target.data('id');
                var isWrite = answerId == 1;
                var index = me._index;
                $target.addClass(isWrite ? 'subject-item-write' : 'subject-item-wrong');
                me._hasAnswer = true;    
                me._answerList.push({
                    topicId: me._subjectId,
                    answerIds: topicId,
                    answerIscorrect: ~~isWrite
                });

                isWrite ? me._rightAudio.play() : me._errorAudio.play();

                setTimeout(function(){
                    if(index == me._data.length -1){
                        var result = JSON.stringify(me._answerList);
                        me._model.sendAnswer({
                            data: {
                                deviceId: window.deviceId,
                                userAgent: navigator.userAgent,
                                answerresult: result
                            }
                        });
                        location.href = '#result';
                    }else{
                        location.href = '#subject/' + me._id + '/' + me._data[index+1]['id'];
                    }
                }, 2000);
                
            }
        },
        /**
         * [获取列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _getSubject: function(data, xhr){
            var me = this;
            
            util.mDealAjax(function(isError){
                if(!isError){
                    me._data = data.topicBasic;
                    me.render();
                }
                
            }, data, xhr);
        }
    });

    return K;

});


define('text!root-tpl/result/main.tpl',[],function () { return '<h1>GOOD JOB  !</h1>\r\n<div class="more">\r\n\tWANT <i>MORE</i> EXERSISE? \r\n</div>\r\n<a class="gohome" href="#">\r\n\t<span>LET\'S<br />GO!</span>\r\n\t<i></i>\r\n</a>';});

/**
 * 首页
 */

define('result/main',[
	'text!root-tpl/result/main.tpl'
], function(
	tpl
) {
	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._data = null;
        },
        events: {
           
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function() {
            var me = this;
            me.$el.html(me._tpl({}));
            $('html').removeClass().addClass('bg-result');
        },
        reset: function(){
            this.$el.html('');
        }
    });

    return K;

});

/**
 * 通用模块放在common/scripts/module/mobile下
 */

require([
	'./router',
	'./moduleManager',
	'./index/main',
    './listening/main',
    './subject/main',
    './result/main'
], function(
	Router,
	moduleMgr,
	IndexMain,
    ListeningMain,
    SubjectMain,
    ResultMain
) {
	//根据分辨率重置body字体大小,iphone5为标准，宽320，字体大小10px
    function resetFontSize(){
        var winWidth = $(window).width();
        //如果一开始为横屏，需要处理 todo
        if(winWidth > 700){
            //pad
            var fontSize = 2 * 12;
        }else{
            //手机，包括大屏手机600px
            var fontSize = winWidth * 12/320;
        }
        
        $('html').css('font-size', fontSize + 'px');
    }

    //生成设备id
    function getDeviceId() {
        var deviceId = localStorage.getItem('ly_wechat_deviceid');
        if(!deviceId){
            deviceId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
        }
        localStorage.setItem('ly_wechat_deviceid', deviceId);
        return deviceId;
    }

    window.deviceId = getDeviceId();

    resetFontSize();
    $(window).resize(resetFontSize);

    //路由
	var router = new Router;

	var indexMain = moduleMgr.add(new IndexMain({
        el: '#IndexPage'
    }));

    var listeningMain = moduleMgr.add(new ListeningMain({
        el: '#ListeningPage'
    }));

    var subjectMain = moduleMgr.add(new SubjectMain({
        el: '#SubjectPage'
    }));

    var resultMain = moduleMgr.add(new ResultMain({
        el: '#ResultPage'
    }));


	//事件绑定
	router.bind({
		'gotoHome': function(){
            resetPage();
            indexMain.init();
		},
        'gotoListening': function(id){
            resetPage();
            listeningMain.init(id);
        },
        'gotoSubject': function(listeningId, subjectId){
            resetPage();
            subjectMain.init(listeningId, subjectId);
        },
        'gotoSubjectHome': function(listeningId){
            resetPage();
            subjectMain.init(listeningId);
        },
        'gotoResult': function(listeningId){
            resetPage();
            resultMain.init();
        }
	});

	/**
     * [还原页面]
     */
    function resetPage(){
        moduleMgr.clear();
    }

    //开启路由
	Backbone.history.start();

});

define("main", function(){});

