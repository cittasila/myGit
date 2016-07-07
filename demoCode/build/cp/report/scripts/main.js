define('router',[],function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_REPORT = 'gotoReport';

    var K = Backbone.Router.extend({
        routes: {
            "": "gotoHome",
            "report/:id/:id": "gotoReport",
            "writingDetail/:id/:id": "gotoWritingDetail",
            "compositionAbility/:id/:id": "gotoCompositionAbility",
            "skillAnalyze/:id/:id": "gotoSkillAnalyze",
            "writingLevel/:id/:id": "gotoWritingLevel",
            "errorSummary/:id/:id": "gotoErrorSummary",
            "systemComment/:id/:id": "gotoSystemComment"
        },
        initialize: function(){},
        /**
         * [进入首页]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [进入报告]
         */
        gotoReport: function(token, id, position){
            this.trigger(E_GOTO_REPORT, token, id, position);
        },
        gotoWritingDetail: function(token, id){
            this.gotoReport(token, id, 'writingDetail');
        },
        gotoCompositionAbility: function(token, id){
            this.gotoReport(token, id, 'compositionAbility');
        },
        gotoSkillAnalyze: function(token, id){
            this.gotoReport(token, id, 'skillAnalyze');
        },
        gotoWritingLevel: function(token, id){
            this.gotoReport(token, id, 'writingLevel');
        },
        gotoErrorSummary: function(token, id){
            this.gotoReport(token, id, 'errorSummary');
        },
        gotoSystemComment: function(token, id){
            this.gotoReport(token, id, 'systemComment');
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

define('text!root-tpl/index.tpl',[],function () { return '<div class="bg"></div>';});


define('text!root-tpl/validation.tpl',[],function () { return '<div class="ui-phone">\n    <div class="hd"></div>\n    <div class="main">\n        <form class="form form-validate-phone fix" action="">\n            <div class="form-control fix">\n                <div class="fix">\n                    <label class="label" for="phone">用户名</label>\n                    <input type="text" class="form-input" name="name" placeholder="请输入账号" />\n                </div>\n                \n                <div class="form-error"></div>\n            </div>\n            <div class="form-control fix">\n                <div class="fix">\n                    <label class="label" for="phone">手机号</label>\n                    <input type="text" class="form-input" name="phone" placeholder="请输入您的手机号" />\n                </div>\n                \n                <div class="form-error"></div>\n            </div>\n            <div class="form-control fix">\n                <div class="fix">\n                    <label class="label" for="code">验证码</label>\n                    <input type="text" class="form-input" name="code" placeholder="请输入验证码" />\n                    <span class="img-code"></span>\n                    <i class="icon-solid icon-loop">&#xe90f;</i>\n                </div>\n                \n                <div class="form-error"></div>\n            </div>\n            <div class="form-control fix">\n                <div class="fix">\n                    <label class="label" for="dynamicCode">动态码</label>\n                    <input type="text" class="form-input" name="dynamicCode" placeholder="输入动态码" />\n                    <a href="javascript:;" class="btn-sendcode">\n                        <i class="send">获取动态码</i>\n                        <i class="nosend">\n                            <i class="num"></i>秒后请重试\n                        </i>\n                    </a>\n                </div>\n                \n                <div class="form-error"></div>\n            </div>\n            <div class="form-control clearfix">\n               <button type="submit" class="btn btn-confirm">查&nbsp;&nbsp;&nbsp;&nbsp;询</button>\n            </div>\n        </form>\n    </div>\n</div>\n';});


define('text!root-tpl/result-list.tpl',[],function () { return '<div class="result-list">\n\t{{ if(it.list.length){ }}\n\t<h4>这位同学在本次好作文大赛中共写了 {{=it.list.length}} 篇作文，请点击查看</h4>\n\t<ul>\n\t\t{{~it.list :v:i}}\n\t\t<li>\n\t\t\t<a href="#report/{{=it.token}}/{{=v.assignmentId}}">\n\t\t\t\t<span class="txt">{{=i+1}}. {{=v.essaySetTitle}}</span>\n\t\t\t\t<span class="btn-view">查看报告</span>\n\t\t\t</a>\n\t\t</li>\n\t\t{{~}}\n\t</ul>\t\n\t{{ }else{ }}\n\t<h4>这位同学在本次好作文大赛中共写了 0 篇作文</h4>\n\t{{ } }}\n\t\n</div>';});


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


define('model',[
    'root-common/util'
], function(util) {

	var E_FIND_REPORT = 'find.report';

    var K = Backbone.Model.extend({
        initialize: function(){},
        /**
         * [报告]
         * @param  {[Object]} options [请求参数]
         */
        findReport: function(options){
            var params = {
                url: window.serviceBase + '/hzwReport/report',
                data: options.data,
                headers: {
                    token: options.token
                }
            };
            util.request.call(this, params, E_FIND_REPORT);
        }
    });

    return K;

});

define('text!root-common/module/phone-check/main.tpl',[],function () { return '<div class="ui-phone">\n\t<div class="hd"></div>\n\t<div class="main">\n\t\t<form class="form form-validate-phone fix" action="">\n\t\t\t<div class="form-control fix">\n\t\t\t\t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-user icon-solid icon">\n\t\t                \t&#xe90c;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="phone" placeholder="请输入手机号码" />\n\t\t\t\t</div>\n\t\t\t\t\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe90a;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="code" placeholder="输入验证码" />\n\t\t\t\t</div>\n\t\t\t\t<span class="img-code"></span>\n\t\t\t\t<i class="icon-solid icon-loop">&#xe90f;</i>\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe911;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="dynamicCode" placeholder="输入动态码" />\n\t\t\t\t</div>\n\t\t\t\t<a href="javascript:;" class="btn-sendcode">\n\t\t\t\t\t<i class="send">获取动态码</i>\n\t\t\t\t\t<i class="nosend">\n\t\t\t\t\t\t<i class="num"></i>秒后请重试\n\t\t\t\t\t</i>\n\t\t\t\t</a>\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t  \t<div class="action"></div>\n\t\t</form>\n\t</div>\n</div>';});


define('root-common/module/cookie',[], function() {

	return function(win, n, v, op) {
		if(typeof win == "string") {
			op = v;
			v = n;
			n = win;
			win = window;
		}
		if(v !== undefined) {
			op = op || {};
			var date, expires = "";
			if(op.expires) {
				if(op.expires.constructor == Date) {
					date = op.expires;
				} else {
					date = new Date();
					date.setTime(date.getTime() + (op.expires * 24 * 60 * 60 * 1000));
				}
				expires = '; expires=' + date.toGMTString();
			}
			var path = op.path ? '; path=' + op.path : '';
			var domain = op.domain ? '; domain=' + op.domain : '';
			var secure = op.secure ? '; secure' : '';
			win.document.cookie = [n, '=', encodeURIComponent(v), expires, path, domain, secure].join('');
		} else {
			v = win.document.cookie.match( new RegExp( "(?:\\s|^)" + n + "\\=([^;]*)") );
			return v ? decodeURIComponent(v[1]) : null;
		}
	};

});

/**
 * 数据模型
 */

define('root-common/module/phone-check/model',[
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
/**
 * 手机验证
 */

define('root-common/module/phone-check/main',[
    'text!./main.tpl',
    '../../util',
    '../../module/popup',
    './model',
    '../../module/cookie'
], function(
    tpl,
    util,
    popup,
    Model,
    cookie
) {

    var E_AFTER_VER = 'afterVer';
    var E_VALIDATE = 'validate';

    var K = Backbone.View.extend({
        /**
         * [initialize]
         * @param  {[Object]} config [baseUrl：service基础路径，token：用户令牌，type：动态码类型]
         */
        initialize: function (config) {
            var me = this;
            me._tpl = doT.template(config.tpl || tpl);
            me._model = new Model(config);
            me._type = config.type;
            me._isSending = false; //是否在发送手机号
            me._sendTimer = null;
            me._uuid = null;
            me._hasName = config.hasName;
            me._getUuid();
            me._model.bind({
                'verMsg': $.proxy(me.verMsg, me),
                'sendMsg': $.proxy(me.sendMsg, me),
                'getUuid': $.proxy(me.getUuid, me)
            });
            me.render();
        },
        events: {
           'submit .form-validate-phone': '_validate',
           'click .btn-sendcode': '_sendPhone',
           'click .icon-loop': '_getUuid'
        },
        render: function(user){
            var me = this;
            
            me.$el.html(me._tpl({
                
            }));
        },
        reset: function(){
            this._sendTimer && clearInterval(this._sendTimer);
            this._isSending = false;
            this._uuid = null;
        },
        _getUuid: function(){
            this._model.getUuid();
        },
        _validate: function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            me.trigger(E_VALIDATE);
            e.preventDefault();
            if(v){   
                var params = {
                    type: me._type,
                    mobile: $('input[name="phone"]', me.$el).val(),
                    code: $('input[name="dynamicCode"]', me.$el).val()
                };
                if(me._hasName){
                    params.name = $('input[name="name"]', me.$el).val();
                }
                me._model.verMsg({
                    type: 'post',
                    data: params
                });
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            var rules = {
                phone:{
                    required: true,
                    isTelephone: true
                },
                dynamicCode:{
                    required: true,
                    isCode: true
                }
            };
            
            var messages = {
                phone:{
                    required: '手机号不能为空',
                    isTelephone: '手机号格式不正确'
                },
                dynamicCode:{
                    required: '动态码不能为空',
                    isCode: '请输入6位数字动态码'
                }
            };
            if(me._hasName){
                rules.name = {
                    required: true
                };
                messages.name = {
                    required: '用户名不能为空'
                };
            }
            
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.closest('.form-control').find('.form-error'));
                },
                rules: rules,
                messages: messages
            });
        },
        _sendPhone: function(e){
            e.preventDefault();
            var me = this;
            var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            var $target = $(e.currentTarget);
            if(!me._isSending){
                var mobile = $('input[name="phone"]', me.$el).val();
                var code =  $('input[name="code"]', me.$el).val();
                if(reg.test(mobile)){
                    me._model.sendMsg({
                        type: 'post',
                        data: {
                            type: me._type,
                            mobile: mobile,
                            inputCode: code,
                            uuid: me._uuid
                        }
                    }, {
                        node: $target
                    });
                    
                    
                }else{
                    util.errorTip('手机号格式不正确', true);
                }
            }
        },
        /**
         * [验证]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        sendMsg: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    var node = otherOptions.node;
                    node.addClass('btn-disabled');
                    util.successTip(data.resMsg, true);
                    var current = 60;
                    var $num = $('.nosend .num', me.$el).text(current);
                    me._sendTimer && clearInterval(me._sendTimer);
                    me._sendTimer = setInterval(function(){
                        $num.text(--current);
                        if(!current){
                            clearInterval(me._sendTimer);
                            node.removeClass('btn-disabled');
                            me._isSending = false;
                        }
                    }, 1000);
                    me._isSending = true;
                }else{
                    $('input[name="code"]', me.$el).val('');
                    me._isSending = false;
                }
                me._getUuid();
                
            }, data, xhr);
        },
        /**
         * [验证]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        verMsg: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){

                var res = data.data;
                if(!isError){
                    me.trigger(E_AFTER_VER, res);
                }else{
                    util.errorTip(data.resMsg, true);
                }
            }, data, xhr);
        },
        /**
         * [获取uuid]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getUuid: function(data, xhr, options, otherOptions){
            var me = this;
            me._uuid = data;
            me._setCode(data);
            
        },
        _setCode: function(uuid){
            var me = this;
            var img = window.serviceBase + '/common/getSecurityCode?uuid='+uuid+'&t='+(+new Date);
            $('.img-code', me.$el).html('<img src="'+img+'" />');
        }

    });

    return K;

});

/**
 * 公用区域
 */

define('index',[
	'text!root-tpl/index.tpl',
    'text!root-tpl/validation.tpl',
    'text!root-tpl/result-list.tpl',
    'root-common/util',
    './model',
    'root-common/module/popup',
    'root-common/module/phone-check/main'
], function(
	tpl,
    validationTpl,
    resultListTpl,
    util,
    Model,
    popup,
    PhoneCheck
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._validationTpl = doT.template(validationTpl);
            me._resultListTpl = doT.template(resultListTpl);
            me._model = new Model;
            me._model.bind({
                
            });
            me._pop = null;
            me._phoneCheck = null;
        },
        events: {
           
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._pop && me._pop.close();
            me._phoneCheck.reset();
        },
        init: function(){
            var me = this;
            me.render(); 
            
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               
            }));  

            me._pop = popup.create({
                title: '成绩查询',
                custom: '<div class="phone-area"></div>',
                // isMove: false,
                className: 'pop-validation'
            });
            me._phoneCheck = new PhoneCheck({
                el: $('.phone-area', me._pop.$el),
                baseUrl: window.serviceBase,
                tpl: validationTpl,
                hasName: true,
                type: 2
            });

            if(window.hasVer){
                me.renderList();
            }else{
                me._phoneCheck.bind({
                    'afterVer': function(res){
                        window.hasVer = true;
                        window.articleList = res.list || [];
                        window.token = res.token;
                        me.renderList();
                        me._pop.resize();
                    },
                    'validate': function(){
                        me._pop.resize();
                    }
                });
            }

            me._pop.resize();
        },
        renderList: function(){
            var me = this;
            $('.phone-area', me._pop.$el).html(me._resultListTpl({
                list: window.articleList,
                token: window.token
            }));
        }
        
    });

    return K;

});


define('text!root-tpl/report.tpl',[],function () { return '<div class="header">\n\t<a href="#" class="logo">\n\t\t<i class="icon-linear btn-back">&#xe900;</i>\n\t\t<span class="img"></span>\n\t</a>\n\t<i class="icon-linear btn-top">&#xe910;</i>\n</div>\n<div class="nav-list">\n\t<a class="nav-item item-writingDetail" href="#writingDetail/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">写作详情</span>\n\t</a>\n\t<a class="nav-item item-compositionAbility" href="#compositionAbility/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">作文能力评估数据</span>\n\t</a>\n\t<a class="nav-item item-skillAnalyze" href="#skillAnalyze/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">写作微技能评估</span>\n\t</a>\n\t<a class="nav-item item-writingLevel" href="#writingLevel/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">写作水平</span>\n\t</a>\n\t<a class="nav-item item-errorSummary" href="#errorSummary/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">错误汇总</span>\n\t</a>\n\t<a class="nav-item item-systemComment" href="#systemComment/{{=window.token}}/{{=it.id}}">\n\t\t<span class="num"></span>\n\t\t<span class="txt">系统评语</span>\n\t</a>\n</div>\n<section class="panel-item panel-detail" id="writingDetail-{{=it.id}}">\n\t<h2>\n\t\t<span>写作详情</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner"></div>\n</section>\n<section class="panel-item panel-ability" id="compositionAbility-{{=it.id}}">\n\t<h2>\n\t\t<span>作文能力评估数据</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner">\n\t\t<div class="chart" id="compositionAbilityChart"></div>\n\t\t<div class="list"></div>\n\t</div>\n</section>\n<section class="panel-item panel-analyze" id="skillAnalyze-{{=it.id}}">\n\t<h2>\n\t\t<span>写作微技能评估</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner">\n\t\t<div class="chart" id="skillAnalyzeChart" style="margin-top:-100px;"></div>\n\t\t<div class="list"></div>\n\t</div>\n</section>\n<section class="panel-item panel-level" id="writingLevel-{{=it.id}}">\n\t<h2>\n\t\t<span>写作水平</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner"></div>\n</section>\n<section class="panel-item panel-summary" id="errorSummary-{{=it.id}}">\n\t<h2>\n\t\t<span>错误汇总</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner">\n\t\t<div class="chart" id="errorSummaryChart" style="padding:20px;"></div>\n\t\t<div class="list"></div>\n\t</div>\n</section>\n<section class="panel-item panel-comment" id="systemComment-{{=it.id}}">\n\t<h2>\n\t\t<span>系统评语</span>\n\t\t<i class="icon"></i>\n\t</h2>\n\t<div class="inner"></div>\n</section>';});


define('text!root-tpl/report-detail.tpl',[],function () { return '<p class="info">\n\t<span class="label">教师：</span>\n\t<span class="txt txt-short">{{=it.teacher}}</span>\n</p>\n<p class="info">\n\t<span class="label">学生：</span>\n\t<span class="txt txt-short">{{=it.studentName}}</span>\n</p>\n<p class="info">\n\t<span class="label">班级：</span>\n\t<span class="txt txt-long">{{=it.classes}}</span>\n</p>\n<p class="info">\n\t<span class="label">标题：</span>\n\t<span class="txt txt-long txt-title">{{=it.essay_set_title}}</span>\n</p>\n<p class="info">\n\t<span class="label">要求：</span>\n\t<span>{{=it.essay_set_requirement}}</span>\n</p>\n<div class="content">\n\t<div class="label">作文内容：</div>\n\t<div class="content-info">\n\t\t<span class="words">\n\t\t\t字数：<i>{{=it.wordCount}}</i>字\n\t\t</span>\n\t\t<span class="time">\n\t\t\t写作用时：<i>{{=it.formatTimeE(it.timeDiff * 1000)}}</i>\n\t\t</span>\n\t\t<!-- <span class="submit-times">\n\t\t\t提交稿次：<i>1</i>次\n\t\t</span> -->\n\t</div>\n\t<p class="title">{{=it.essay_set_title}}</p>\n\t<p>{{=it.assignmentContent}}</p>\n</div>';});


define('text!root-tpl/report-ability.tpl',[],function () { return '{{\n    var mine = it.data[0];\n    var classes = it.data[1];\n    var grades = it.data[2];\n}}\n\n<table>\n    <thead>\n        <th>评分项目</th>\n        <th>评分</th>\n        <th>班级平均分</th>\n        <th>年级平均分</th>\n    </thead>\n    <tbody>\n        <tr>\n            <td>内容</td>\n            <td>{{=it.parseNum(mine.content)}}</td>\n            <td>{{=it.parseNum(classes[\'class-content\'])}}</td>\n            <td>{{=it.parseNum(grades[\'grade-content\'])}}</td>\n        </tr>\n        <tr>\n            <td>语言</td>\n            <td>{{=it.parseNum(mine.language)}}</td>\n            <td>{{=it.parseNum(classes[\'class-language\'])}}</td>\n            <td>{{=it.parseNum(grades[\'grade-language\'])}}</td>\n        </tr>\n        <tr>\n            <td>结构</td>\n            <td>{{=it.parseNum(mine.constuction)}}</td>\n            <td>{{=it.parseNum(classes[\'class-constuction\'])}}</td>\n            <td>{{=it.parseNum(grades[\'grade-constuction\'])}}</td>\n        </tr>\n        <tr>\n            <td>总分</td>\n            <td>{{=Number(mine.total).toFixed(2)}}</td>\n            <td>{{=Number(classes[\'class-total\']).toFixed(2)}}</td>\n            <td>{{=Number(grades[\'grade-total\']).toFixed(2)}}</td>\n        </tr>\n    </tbody>\n</table>';});


define('text!root-tpl/report-analyze.tpl',[],function () { return '<table>\n    <thead>\n        <th>能力分项</th>\n        <th>评分</th>\n        <th>班级平均分</th>\n        <th>年级平均分</th>\n    </thead>\n    <tbody>\n        <tr>\n            <td>篇章结构</td>\n            <td>{{=Number(it.mine.org).toFixed(2)}}</td>\n            <td>{{=Number(it.classo[\'class-org\']).toFixed(2)}}</td>\n            <td>{{=Number(it.grades[\'grade-org\']).toFixed(2)}}</td>\n            \n        </tr>\n        <tr>\n            <td>思想内容</td>\n            <td>{{=Number(it.mine.dev).toFixed(2)}}</td>\n            <td>{{=Number(it.classo[\'class-dev\']).toFixed(2)}}</td>\n            <td>{{=Number(it.grades[\'grade-dev\']).toFixed(2)}}</td>\n            \n        </tr>\n        <tr>\n            <td>句式运用</td>\n            <td>{{=Number(it.mine.ss).toFixed(2)}}</td>\n            <td>{{=Number(it.classo[\'class-ss\']).toFixed(2)}}</td>\n            <td>{{=Number(it.grades[\'grade-ss\']).toFixed(2)}}</td>\n        </tr>\n        <tr>\n            <td>词汇语法</td>\n            <td>{{=Number(it.mine.wc).toFixed(2)}}</td>\n            <td>{{=Number(it.classo[\'class-wc\']).toFixed(2)}}</td>\n            <td>{{=Number(it.grades[\'grade-wc\']).toFixed(2)}}</td>\n        </tr>\n        <tr>\n            <td>写作规范</td>\n            <td>{{=Number(it.mine.mech).toFixed(2)}}</td>\n            <td>{{=Number(it.classo[\'class-mech\']).toFixed(2)}}</td>\n            <td>{{=Number(it.grades[\'grade-mech\']).toFixed(2)}}</td>\n        </tr>\n    </tbody>\n</table>';});


define('text!root-tpl/report-level.tpl',[],function () { return '<p>蓝色代表班级平均分，橙色代表我的写作分数。</p>\n<div class="level">\n    <span class="point class-point" style="left:{{=it.classpoint}}%">\n    \t<i class="caret"></i>\n    \t<i class="txt">{{=it.classpoint}}</i>\n    </span>\n    <span class="point my-point" style="left:{{=it.mypoint}}%">\n    \t<i class="caret"></i>\n    \t<i class="txt">{{=it.mypoint}}</i>\n    </span>\n    <div class="img"></div>\n</div>\n';});


define('text!root-tpl/report-errors.tpl',[],function () { return '<table>\n    <thead>\n        <th>错误类型</th>\n        <th>数量</th>\n    </thead>\n    <tbody>\n        {{~it.list :v:i}}\n        <tr>\n            <td>{{=v.label}}</td>\n            <td>{{=v.value}}</td>\n        </tr>\n        {{~}}\n    </tbody>\n</table>';});


define('text!root-tpl/report-comment.tpl',[],function () { return '<p>{{=it.comment_ch}}</p>\n<p>{{=it.comment_en}}</p>';});


define('text!root-tpl/report-ability-svg.tpl',[],function () { return '{{\n    var mine = it.data[0];\n    var classes = it.data[1];\n    var grades = it.data[2];\n}}\n\n<?xml version="1.0"?>\n<chart exportEnabled="1" exportAtClient="0" exportAction="save" caption="{{=it.title}}" paletteColors="46B29A,FFBA00,00AEFF,FF6F37,A698f0,4169E1,087eb6,BA55D3,D2691E,FF7F50" showValues="0" plotGradientColor="" showBorder="0" bgColor="ffffff" canvasBorderColor="C4C3C1" alternateHGridAlpha="0" canvasBorderThickness="1" showPlotBorder="0" borderColor="ffffff" baseFontSize="12" palette="1" showFCMenuItem="1" imageSave="1">\n    <categories>\n        <category label="内容" />\n        <category label="语言" />\n        <category label="结构" />\n    </categories>\n    <dataset seriesName="我的评分">\n        <set value="{{=mine.content}}" />\n        <set value="{{=mine.language}}" />\n        <set value="{{=mine.constuction}}" />\n        <set value="{{=mine.total}}" />\n    </dataset>\n    <dataset seriesName="班级平均分">\n        <set value="{{=classes[\'class-content\']}}" />\n        <set value="{{=classes[\'class-language\']}}" />\n        <set value="{{=classes[\'class-constuction\']}}" />\n        <set value="{{=classes[\'class-total\']}}" />\n    </dataset>\n    <dataset seriesName="年级平均分">\n        <set value="{{=grades[\'grade-content\']}}" />\n        <set value="{{=grades[\'grade-language\']}}" />\n        <set value="{{=grades[\'grade-constuction\']}}" />\n        <set value="{{=grades[\'grade-total\']}}" />\n    </dataset>\n</chart>';});

/**
 * 报告
 */

define('report',[
	'text!root-tpl/report.tpl',
    'text!root-tpl/report-detail.tpl',
    'text!root-tpl/report-ability.tpl',
    'text!root-tpl/report-analyze.tpl',
    'text!root-tpl/report-level.tpl',
    'text!root-tpl/report-errors.tpl',
    'text!root-tpl/report-comment.tpl',
    'text!root-tpl/report-ability-svg.tpl',
    'root-common/util',
    './model'
], function(
	tpl,
    detailTpl,
    reportAbilityTpl,
    reportAnalyzeTpl,
    reportLevelTpl,
    reportErrorsTpl,
    reportCommentTpl,
    reportAbilitySvgTpl,
    util,
    Model
) {

    var RULE_MAP = {
        'COMMA_PARENTHESIS_WHITESPACE': '句法-标点',
        'SENTENCE_WHITESPACE': '标点-句子间或句子内标点后没有空格',
        'ADMIT_ENJOY_VB': '动词-固定词组',
        'MORFOLOGIK_RULE_EN_GB': '词和词形-拼写'
    };

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._detailTpl = doT.template(detailTpl);
            me._reportAbilityTpl = doT.template(reportAbilityTpl);
            me._reportAnalyzeTpl = doT.template(reportAnalyzeTpl);
            me._reportLevelTpl = doT.template(reportLevelTpl);
            me._reportErrorsTpl = doT.template(reportErrorsTpl);
            me._reportCommentTpl = doT.template(reportCommentTpl);
            me._reportAbilitySvgTpl = doT.template(reportAbilitySvgTpl);
            me._model = new Model;
            me._model.bind({
                'find.report': $.proxy(me.findReport, me)
            });
            me.reset();
        },
        events: {
           'click .btn-top': '_top'
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._id = null;
            me._position = '';
        },
        init: function(token, id, position){
            var me = this;
            me._id = id;
            me._position = position;
            me._model.findReport({
                data: {
                    assignmentId: me._id
                },
                token: window.token
            });
            me.render(); 
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               id: me._id
            }));  
        },
        _top: function(position){
            position = position || 0;
            $('html, body').stop().animate({scrollTop: position}, 500);
        },
        /**
         * [报告]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findReport: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    console.log(res);
                    $('.panel-detail > .inner', me.$el).html(me._detailTpl($.extend(true, {
                        formatTimeE: util.formatTimeE
                    }, res.detail)));
                    var title = res.detail.essay_set_title;
                    //作文能力评估数据
                    $('.panel-ability .list', me.$el).html(me._reportAbilityTpl($.extend(true, {
                        data: res.competencyAssessment,
                        parseNum: me.parseNum
                    }, res.detail)));
                    var columnChart = new FusionCharts(window.staticsBase + '/common/scripts/lib/FusionCharts/Charts/MSColumn2D.swf', '', '100%', '260', '0', '1');
                    columnChart.setDataXML(me._reportAbilitySvgTpl({
                        title: title,
                        data: res.competencyAssessment
                    }));
                    columnChart.render("compositionAbilityChart");

                    me.renderMicro(res);

                    $('.panel-level > .inner', me.$el).html(me._reportLevelTpl(res.writingLevel));


                    me.renderErrors(res);

                    $('.panel-comment > .inner', me.$el).html(me._reportCommentTpl(res.reviews));

                    if(me._position){
                        me._top($('#'+me._position+'-'+me._id).offset().top);
                    }
                }
            }, data, xhr);
        },
        parseNum: function(str){
            var fraction = str.split('/');
            var num = fraction[0];
            var total = fraction[1];
            return Number(num).toFixed(2) + '/' + total;
        },
        renderMicro: function(res){
            var me = this;
            //微技能评估
            var microData = res.microSkillsAssessment;
            var mine = microData[0];
            var classo = microData[1];
            var grades = microData[2];
            var radarChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'skillAnalyzeChart',
                    inverted: false,
                    polar: true,
                    type: 'area'
                },
                colors: ['#18b1da', '#ffba00', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['篇章结构', '思想内容', '句式运用', '词汇语法', '写作规范'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    y: 100,
                    layout: 'horizontal'
                },
                plotOptions: {
                    area: {
                        fillOpacity: '0.45',
                        lineWidth: '1.0',
                        marker: {
                            enabled: true,
                            radius: '2'
                        },
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                },
                series: [{
                    name: '我的评分',
                    data: [mine.org, mine.dev, mine.ss, mine.wc, mine.mech],
                    pointPlacement: 'on'
                }, {
                    name: '班级平均分',
                    data: [classo['class-org'], classo['class-dev'], classo['class-ss'], classo['class-wc'], classo['class-mech']],
                    pointPlacement: 'on'
                }, {
                    name: '年级平均分',
                    data: [grades['grade-org'], grades['grade-dev'], grades['grade-ss'], grades['grade-wc'], grades['grade-mech']],
                    pointPlacement: 'on'
                }]
            });

            $('.panel-analyze .list', me.$el).html(me._reportAnalyzeTpl($.extend(true, {
                mine: mine,
                classo: classo,
                grades: grades
            }, res.detail)));
        },
        renderErrors: function(res){
            var me = this;
            var errorList = res.errorList;
            errorList = me.getRuleData(errorList);
            var chartList = [];
            $.each(errorList, function(i, v){
                var arr = v.label.split('-');
                chartList.push({
                    label: arr ? (arr[1].length > 3 ? arr[1].slice(0, 3)+'...' : arr[1]) : v.label,
                    value: v.value
                });
            })
            var revenueChart = new FusionCharts({
                type: 'bar2d',
                renderAt: 'errorSummaryChart',
                width: '100%',
                height: '350',
                dataFormat: 'json',
                dataSource: {
                    'chart': {
                        "paletteColors": "#4f81be",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "valueFontColor": "#ffffff",
                        "showAxisLines": "1",
                        "axisLineAlpha": "25",
                        "divLineAlpha": "10",
                        "alignCaptionWithCanvas": "0",
                        "showAlternateVGridColor": "0"
                    },

                    'data': chartList
                }
            });
            revenueChart.render();

            $('.panel-summary .list', me.$el).html(me._reportErrorsTpl({
                list: errorList || []
            }));
        },
        getRuleName: function(ruleId){
            return RULE_MAP[ruleId] || ruleId;
        },
        getRuleData: function(ruleList){
            var me = this;
            var tmp = [];
            $.each(ruleList, function(i, v){
                tmp.push({
                    label: me.getRuleName(v.rule_id),
                    value: v.count
                });
            });
            return tmp;
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
	var host = location.host;
	var testIp = '192.168.12.252';
	var writeIp = '192.168.12.240';
	var testServicePort = '9080';
	var preUrl = 'http://';
	var debugReg = /192.168|localhost|debug.|127.0/;

	
	//测试环境
	if(debugReg.test(hostname)){
		env = 'test';
	}

	try {
		if(env == 'test'){
			//测试环境
		    window.serviceBase = preUrl + testIp + ':' + testServicePort + '/haozuowenapi';
		    window.imgPath = preUrl + writeIp + ':9999'; //静态文件路径
		    window.writeBase = preUrl + writeIp + ':8081';//老版写作路径
		}else{
			//生产
			window.serviceBase = preUrl + hostname + ':8087/haozuowenapi';
			window.imgPath = preUrl + hostname + ':9999';
			window.writeBase = preUrl + hostname;
		}

		if(/localhost/.test(hostname)){
		    window.staticsBase = preUrl + host; //项目静态文件路径
		}else{
			//生产
			window.staticsBase = preUrl + host + '/ui';
		}
		
	} catch (ex) {
		alert("自适应域名脚本执行错误!\n");
	}

});

require([
	'./router',
	'./moduleManager',
	'./index',
    './report',
    './auto-domain'
], function(
	Router,
	moduleMgr,
	IndexMain,
    Report
) {

    $.validator.addMethod("isTelephone", function (value, element, param) {
        var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; 
        var phone = $(element).val();
        return phoneReg.test(phone);
    });

    $.validator.addMethod("isCode", function (value, element, param) {
        var reg = /^\d{6}$/; 
        return reg.test($(element).val());
    });

    $.validator.addMethod("isUsername", function (value, element, param) {
        var reg = /^[a-z0-9_]{6,30}$/g;

        return reg.test($(element).val());
    });
    
    window.hasVer = false;
    window.articleList = null;
    window.token = null;

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

    resetFontSize();
    $(window).resize(resetFontSize);

    //路由
	var router = new Router;

	var indexMain = moduleMgr.add(new IndexMain({
        el: '#IndexPage'
    }));

    var report = moduleMgr.add(new Report({
        el: '#ReportPage'
    }));

	//事件绑定
	router.bind({
		'gotoHome': function(){
            resetPage();
            indexMain.init();
		},
        'gotoReport': function(token, id, position){
            resetPage();
            window.token = token;
            report.init(token, id, position);
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

