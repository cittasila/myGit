define('root-base/router',[],function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_HISTORY = 'gotoHistory';
    var E_GOTO_TOPICHISTORY = 'gotoTopicHistory';
    var E_GOTO_ARTICLEDETAIL = 'gotoArticleDetail';

    var K = Backbone.Router.extend({
        routes: {
            "": "gotoHome",
            "history": "gotoHistory",
            "history/:id": "gotoTopicHistory",
            "history/:id/:id": "gotoArticleDetail"
        },
        initialize: function(){},
        /**
         * [进入写作首页]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [进入历史记录页面]
         */
        gotoHistory: function(){
            this.trigger(E_GOTO_HISTORY);
        },
        /**
         * [进入某个话题的历史记录]
         */
        gotoTopicHistory: function(id){
            this.trigger(E_GOTO_TOPICHISTORY, id);
        },
        /**
         * [进入某个具体的文章历史记录]
         */
        gotoArticleDetail: function(topicId, articleId){
            this.trigger(E_GOTO_ARTICLEDETAIL, topicId, articleId);
        }
    });

    return K;

});
define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

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
 * @overview tab
 * @author Chunjie
 * @version 2015-07-29
 */

define('root-common/module/tab',[],function(){
    var E_SWITCH = 'switch';
    var defaults = {
        btns: '', //tab导航
        panels: '', //tab面板
        type: 'click',
        index: 0 //默认显示第一项
    };
    var ACTIVE = 'active';
    var SELECT = 'select';
    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            var config = me.config = $.extend({}, defaults, config);
            me.index = me.config.index;
            me.$nav = $(config.btns).bind(config.type, $.proxy(me.change, me));
            me.$main = $(config.panels);
            me.init();
        },
        init: function(){
            var me = this;
            me.show(me.config.index);
        },
        _index: function(e){
            var me = this;
            var $target = $(e.target);
            var $el = $target.closest('li');
            var index = me.$nav.index($el);
            return index;
        },
        change: function(e){
            e.preventDefault();
            var me = this;
            var index = me._index(e);
            me.show(index);
            me.trigger(E_SWITCH, index);
        },
        show: function(index){
            var me = this;
            var $el = me.$nav.eq(index);
            me.index = index;
            //初始化时未捕捉到绑定行为，需要将事件抛出放到绑定之后
            setTimeout(function(){
                me.trigger(SELECT, index);
            }, 0);
            
            me.$nav.removeClass(ACTIVE);
            $el.addClass(ACTIVE);
            me.$main.hide().eq(index).show();
            
        },
        getIndex: function(){
            return this.index;
        }
    });

    return K;
});



// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

define('root-common/module/tip',[],function(){
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    
    function isElementInDOM(ele) {
      while (ele = ele.parentNode) {
        if (ele == document) return true;
      }
      return false;
    };
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(this.options.doc.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                this.$tip.data('tipsy-pointee', this.$element[0]);
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover',
        doc: document
    };
    
    $.fn.tipsy.revalidate = function() {
      $('.tipsy').each(function() {
        var pointee = $.data(this, 'tipsy-pointee');
        if (!pointee || !isElementInDOM(pointee)) {
          $(this).remove();
        }
      });
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable 
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
        return function() {
            var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
                boundTop = $(document).scrollTop() + margin,
                boundLeft = $(document).scrollLeft() + margin,
                $this = $(this);

            if ($this.offset().top < boundTop) dir.ns = 'n';
            if ($this.offset().left < boundLeft) dir.ew = 'w';
            if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
            if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

            return dir.ns + (dir.ew ? dir.ew : '');
        }
    };
});

/**
 * 外部容器，包括左侧tab、左下角按钮、主体左右面板收缩
 */

define('container',[
    'root-common/module/tab',
    'root-common/util',
	'root-common/module/tip'
], function(
    Tab,
    util
) {

    var E_SHOW = 'show';
    var E_HIDE = 'hide';
    var E_SELECT = 'select';

	var K = Backbone.View.extend({
        initialize: function () {
        	var me = this;
        	me._isShow = false; //默认不显示左侧面板
        	//添加tip提示
            $('.ui-navs .nav-item, .ui-actions .ui-btn').tipsy(); 
        },
        events: {
        	'click .panel-toggle': '_togglePanel',
            'click .btn-logout, .btn-products-center': '_backProduct'
        },
        _togglePanel: function(){
        	this.togglePanel();
        },
        /**
         * [展开/隐藏左侧面板]
         * @param  {[Boolean]} isShow [是否显示左侧]
         */
        togglePanel: function(isShow){
        	var me = this;
            if(isShow !== undefined){
                me._isShow = isShow;
            }else{
                me._isShow = !me._isShow;
            }
        	isShow = me._isShow;
        	$('.panel-toggle')[isShow? 'addClass' : 'removeClass']('panel-toggle-show');
        	$('div[rol="right-panel"]')[isShow? 'removeClass' : 'addClass']('right-panel-whole');
        	$('div[rol="left-panel"]')[isShow? 'removeClass' : 'addClass']('left-panel-hide');
            me.trigger(isShow ? E_SHOW : E_HIDE);
        },
        /**
         * [展开左侧面板]
         */
        showPanel: function(){
            var me = this;
        	$('.panel-toggle').show();
            me.trigger(E_SHOW);
        	me.togglePanel(true);
            
        },
        /**
         * [隐藏左侧面板]
         */
       	hidePanel: function(){
        	this.togglePanel(false);
        },
        /**
         * [隐藏左侧展开/收缩按钮]
         */
        hidePanelIcon: function(){
        	$('.panel-toggle').hide();
        },
        _backProduct: function(){
            var url = util.queryString('url');
            if(url){
                window.location.href = decodeURIComponent(url);
                return false;
            }
        }
    });

    return K;

});

/**
 * 数据存储
 */

define('p-data',[

], function(

) {

	return {
		//当前命题数据
        topicId: null 
    }

});


define('text!nav/../../tpl/score/left.tpl',[],function () { return '<div class="composition-left-box">\r\n\t<div id="placeholder" class="demo-placeholder"></div>\r\n\t<div class="composition-total-score">\r\n\t\t<div class="total-score-center">\r\n\t\t\t<div class="center">\r\n\t\t\t\t<p class="center-score-title">总&ensp;分</p>\r\n\t\t\t\t<p class="center-score-self">\r\n\t\t\t\t\t<span class="score_before"></span>\r\n\t\t\t\t\t.<i class="score_after"></i>\r\n\t\t\t\t</p>\r\n\t\t\t\t<p class="center-score-slash">/</p>\r\n\t\t\t\t<p class="center-score-total">{{!it.score}}</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<img class="total-score-center-title" src="../../writing/images/score-come-on.png" height="62" width="190" >\r\n\t</div>\r\n\t</div>\r\n\t<div class="composition-modul-box default-skin">\r\n\t<div class="composition-modul composition-my-comments">\r\n\t\t\r\n\t</div>\r\n\t<div class="composition-modul composition-edit-guide">\r\n\t\t\r\n\t</div>\r\n\t<div class="composition-box"></div>';});


define('text!nav/../../tpl/score/score.tpl',[],function () { return '<p class="composition-modul-title">\r\n\t我的评语\r\n</p>\r\n<!-- 三角符号 -->\r\n<div class="my-comments-triangle"></div>\r\n<!-- 评语内容 -->\r\n<div class="my-comments-content">\r\n\t{{ if(it.allComment){ }}\r\n\t<div class="content-total-score">\r\n\t\t<p class="total-score-title">总评:</p>\t\r\n\t\t<p class="total-score-content">{{!it.allComment}}</p>\t\r\n\t</div>\r\n\t{{ } }}\r\n\t<ul class="content-list">\r\n\t\t{{ if(it.Comment){ }}\r\n\t\t\t{{ if(it.Comment.languageCn){ }}\r\n\t\t\t<li>\r\n\t\t\t\t<div class="content-list-left">\r\n\t\t\t\t\t<p class="content-list-title">语言</p>\r\n\t\t\t\t\t<p class="content-list-score">{{=it.languageScore.toFixed(1)}}分</p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="content-list-right">\r\n\t\t\t\t\t<p>{{=it.Comment.languageCn}}</p>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t{{ } }}\r\n\t\t\t{{ if(it.Comment.contentCn){ }}\r\n\t\t\t<li>\r\n\t\t\t\t<div class="content-list-left">\r\n\t\t\t\t\t<p class="content-list-title">内容</p>\r\n\t\t\t\t\t<p class="content-list-score">{{=it.contentScore.toFixed(1)}}分</p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="content-list-right">\r\n\t\t\t\t\t<p>{{=it.Comment.contentCn}}</p>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t{{ } }}\r\n\t\t\t{{ if(it.Comment.structCn){ }}\r\n\t\t\t<li>\r\n\t\t\t\t<div class="content-list-left">\r\n\t\t\t\t\t<p class="content-list-title">结构</p>\r\n\t\t\t\t\t<p class="content-list-score">{{=it.styleScore.toFixed(1)}}分</p>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="content-list-right">\r\n\t\t\t\t\t<p>{{=it.Comment.structCn}}</p>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t{{ } }}\r\n\t\t{{ } }}\r\n\t\t\r\n\t</ul>\t\r\n</div>';});


define('text!nav/../../tpl/score/correction.tpl',[],function () { return '{{ if(it.list.length > 0){ }}\r\n<p class="composition-modul-title">\r\n\t<i class="icon-solid">&#xe60b;</i>\r\n\t语言指导\r\n</p>\r\n<ul>\r\n\t{{~it.list :v:i}}\r\n\t<li class="language-guide-list">\r\n\t\t<div class="language-guide-list-header">\r\n\t\t\t<p class="language-guide-list-title-num">第{{=i+1}}句</p>\r\n\t\t\t<p class="language-guide-list-title-content">\r\n\t\t\t\t{{!v.sentence}}\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t\t{{ if(v.errors && v.errors.length > 0){ }}\r\n\t\t<div class="language-guide-list-error">\r\n\t\t\t<p class="list-error-title">[错误]</p>\r\n\t\t\t<div class="list-error-content">\r\n\t\t\t\t{{~v.errors :val:key}}\r\n\t\t\t\t<p>\r\n\t\t\t\t\t<i>{{=key+1}}.</i>\r\n\t\t\t\t\t<span class="list-error-content-main">{{=val.errorContent}}</span>\r\n\t\t\t\t\t<span>{{=val.errorMsg}}</span>\r\n\t\t\t\t</p>\r\n\t\t\t\t{{~}}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t{{ } }}\r\n\t\t{{\r\n\t\t\tvar hasWordList = v.wordList && v.wordList.length > 0;\r\n\t\t\tvar idiomsList = v.idiomsList;\r\n\t\t\tvar groupList = [];\r\n\t\t\tvar sameMeanList = [];\r\n\t\t}}\r\n\t\t{{ if(hasWordList || idiomsList){ }}\r\n\t\t<div  class="language-guide-list-comment">\r\n\t\t\t<p class="list-comment-title">[点评]</p>\r\n\r\n\t\t\t{{ if(hasWordList){ }}\r\n\t\t\t{{~v.wordList :val:key}}\r\n\t\t\t\t{{ if(val.groupList){ }}\r\n\t\t\t\t{{ groupList.push(val); }}\r\n\t\t\t\t{{ } }}\r\n\t\t\t\t{{ if(val.sameMeanList){ }}\r\n\t\t\t\t{{ sameMeanList.push(val); }}\r\n\t\t\t\t{{ } }}\r\n\t\t\t{{~}}\r\n\t\t\t{{ } }}\r\n\r\n\t\t\t{{ if(groupList.length > 0){ }}\r\n\t\t\t<div class="words-area">\r\n\t\t\t\t<div class="subtitle">\r\n\t\t\t\t\t<i>[</i>&nbsp;词或词组&nbsp;<i>]</i>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="list-comment-content">\r\n\t\t\t\t\t{{~groupList :val:key}}\r\n\t\t\t\t\t<div class="list-comment-content-each">\r\n\t\t\t\t\t\t{{~val.groupList :value:j}}\r\n\t\t\t\t\t\t<p class="list-comment-content-each-header">\r\n\t\t\t\t\t\t\t<i class="icon icon-star"></i>\r\n\t\t\t\t\t\t\t<span>{{=value.wordGroup}}</span>\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t<div class="list-comment-content-each-main">\r\n\t\t\t\t\t\t\t{{ if(value.example1){ }}<p>{{=it.parse(value.example1)}}</p>{{ } }}\r\n\t\t\t\t\t\t\t{{ if(value.example2){ }}<p>{{=it.parse(value.example2)}}</p>{{ } }}\r\n\t\t\t\t\t\t\t{{ if(value.example3){ }}<p>{{=it.parse(value.example3)}}</p>{{ } }}\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t{{ if(value.wordUsage){ }}\r\n\t\t\t\t\t\t<div class="word-usage">\r\n\t\t\t\t\t\t\t<strong>用法：</strong>{{=value.wordUsage}}\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t{{ } }}\r\n\t\t\t\t\t\t{{~}}\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t{{~}}\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t{{ } }}\r\n\r\n\t\t\t{{ if(sameMeanList.length > 0){ }}\r\n\t\t\t<div class="synonyms-area">\r\n\t\t\t\t<div class="subtitle">\r\n\t\t\t\t\t<i>[</i>&nbsp;近义词&nbsp;<i>]</i>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="comment-list">\r\n\t\t\t\t\t{{~sameMeanList :val:key}}\r\n\t\t\t\t\t<div class="comment-item">\r\n\t\t\t\t\t\t<h4><i class="icon icon-synonyms"></i>{{=val.word}}</h4>\r\n\t\t\t\t\t\t<ul class="detail-list">\r\n\t\t\t\t\t\t\t{{~val.sameMeanList :sameMeanVal:sameMeanKey}}\r\n\t\t\t\t\t\t\t{{\r\n\t\t\t\t\t\t\t\tvar synonymsList = sameMeanVal.synonyms && sameMeanVal.synonyms.split(\',\');\r\n\t\t\t\t\t\t\t}}\r\n\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<span class="detail-title">释义：</span>{{=sameMeanVal.clearDefinition}}\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t{{ if(synonymsList.length > 0){ }}\r\n\t\t\t\t\t\t\t\t<div class="synonyms-words">\r\n\t\t\t\t\t\t\t\t\t<span class="detail-title">近义词：</span>\r\n\t\t\t\t\t\t\t\t\t<span class="words-list">\r\n\t\t\t\t\t\t\t\t\t\t{{~synonymsList :synoVal:synoKey}}\r\n\t\t\t\t\t\t\t\t\t\t<a class="words-item" href="javascript:;">\r\n\t\t\t\t\t\t\t\t\t\t\t{{=synoVal}}\r\n\t\t\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t\t\t{{ if(synoKey != synonymsList.length - 1){ }}\r\n\t\t\t\t\t\t\t\t\t\t，\r\n\t\t\t\t\t\t\t\t\t\t{{ } }}\r\n\t\t\t\t\t\t\t\t\t\t{{~}}\r\n\t\t\t\t\t\t\t\t\t\t<i class="more">more&gt;&gt;</i>\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t{{ } }}\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t{{~}}\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t{{~}}\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t{{ } }}\r\n\r\n\t\t\t{{ if(idiomsList && $.type(idiomsList) == \'array\' && idiomsList.length > 0){ }}\r\n\t\t\t<div class="vulgarism-area" style="display:none;">\r\n\t\t\t\t<div class="subtitle">\r\n\t\t\t\t\t<i>[</i>&nbsp;俗语&nbsp;<i>]</i>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="comment-list">\r\n\t\t\t\t\t<div class="comment-item">\r\n\t\t\t\t\t\t<ul class="detail-list">\r\n\t\t\t\t\t\t\t{{~idiomsList :val:key}}\r\n\t\t\t\t\t\t\t<li class="vulgarism-item">{{=val}}</li>\r\n\t\t\t\t\t\t\t{{~}}\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t{{ } }}\r\n\t\t</div>\r\n\t\t{{ } }}\r\n\t</li>\r\n\r\n\t{{~}}\r\n</ul>\r\n{{ } }}';});


define('text!nav/../../tpl/score/suggestion.tpl',[],function () { return '<div class="composition-modul composition-language">\r\n\t<div class="language-title">\r\n\t\t<p class="title">语言总汇</p>\r\n\t\t<p class="triangle"></p>\r\n\t\t<p class="hidden-word">隐藏单词详情</p>\r\n\t</div>\r\n\t<div class="language-content">\r\n\t\t{{~it.vocabulary.posList :v:i}}\r\n\t\t<div class="content-li">\r\n\t\t\t<div class="produce">\r\n\t\t\t\t<span class="name">{{=v.desc}}：</span>\r\n\t\t\t\t<span class="low">低级：</span><i>{{=v.low}}</i>\r\n\t\t\t\t<span class="base">基本：</span><i>{{=v.basic}}</i>\r\n\t\t\t\t<span class="super">超纲：</span><i>{{=v.beyond}}</i>\r\n\t\t\t</div>\r\n\t\t\t<p class="word">\r\n\t\t\t\t{{ if(v.words.low != \'\'){ }}\r\n\t\t\t\t<span class="low">{{=v.words.low.replace(/,/g, \', \')}}</span>,\r\n\t\t\t\t{{ } }}\r\n\t\t\t\t{{ if(v.words.basic != \'\'){ }}\r\n\t\t\t\t<span class="base">{{=v.words.basic.replace(/,/g, \', \')}}</span>,\r\n\t\t\t\t{{ } }}\r\n\t\t\t\t{{ if(v.words.beyond != \'\'){ }}\r\n\t\t\t\t<span class="super">{{=v.words.beyond.replace(/,/g, \', \')}}</span>\r\n\t\t\t\t{{ } }}\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t\t{{~}}\r\n\t\t<div class="sentence">\r\n\t\t\t<p>\r\n\t\t\t\t<span class="title">短 句：</span>\r\n\t\t\t\t<span class="low">{{=it.vocabulary.sentenceMap.short.count}}</span>，\r\n\t\t\t\t<span class="low">{{=it.vocabulary.sentenceMap.short.percent}}</span>\r\n\t\t\t</p>\r\n\t\t\t<p>\r\n\t\t\t\t<span class="title">中 句：</span>\r\n\t\t\t\t<span class="base">{{=it.vocabulary.sentenceMap.mid.count}}</span>，\r\n\t\t\t\t<span class="base">{{=it.vocabulary.sentenceMap.mid.percent}}</span>\r\n\t\t\t</p>\r\n\t\t\t<p>\r\n\t\t\t\t<span class="title">长 句：</span>\r\n\t\t\t\t<span class="super">{{=it.vocabulary.sentenceMap.long.count}}</span>，\r\n\t\t\t\t<span class="super">{{=it.vocabulary.sentenceMap.long.percent}}</span>\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t\t<div class="summary">\r\n\t\t\t字数：\r\n\t\t\t<span class="">{{=it.vocabulary.wordsCount}}</span>字，平均词长：\r\n\t\t\t<span class="">{{=it.vocabulary.avgLength}}</span>个字，段落数\r\n\t\t\t<span class="">{{=it.vocabulary.paragraph}}</span>段\r\n\t\t</div>\t\r\n\t</div>\r\n\t\t\t\r\n</div>\r\n<div class="composition-modul composition-theme">\r\n\t<div class="theme-title">\r\n\t\t<p class="title">主题解析</p>\r\n\t\t<p class="theme-triangle"></p>\r\n\t</div>\r\n\t<div class="theme-content">\r\n\t\t<p class="article">{{=it.centerSentence1}}</p>\r\n\t\t<p class="content">{{=it.centerSentenceTips}}</p>\r\n\t</div>\r\n</div>\r\n<div class="composition-modul composition-write-advice">\r\n\t<div class="composition-modul-title">\r\n\t\t<p class="title">写作建议</p>\r\n\t\t<p class="write-triangle"></p>\r\n\t</div>\r\n\t<div class="write-advice-title">{{=it.questionZh}}</div>\r\n\t<div class="write-advice-content">{{=it.contentZh}}</div>\t\r\n</div>\r\n';});


define('text!nav/../../tpl/score/tip-synonyms.tpl',[],function () { return '{{ if(it.word){ }}\r\n<h4>{{=it.word}}</h4>\r\n{{ } }}\r\n{{ if(it.phonetic_symbol_a){ }}\r\n<div class="pronunciation">\r\n\t{{=it.phonetic_symbol_a}}\r\n</div>\r\n{{ } }}\r\n{{ if(it.lexical_category){ }}\r\n<div class="speech">{{=it.lexical_category}}</div>\r\n{{ } }}\r\n{{ if(it.translation){ }}\r\n<div class="desc">{{=it.translation}}</div>\r\n{{ } }}\r\n{{ if(it.example_1){ }}\r\n<div class="examples">\r\n\t<h5>例如：</h5>\r\n\t<p>{{=it.parse(it.example_1)}}</p>\r\n\t<p>{{=it.parse(it.example_trans_1)}}</p>\r\n</div>\r\n{{ } }}\r\n';});

/**
 * 获取写作评分
 */

define('root-base/model/scoringModel',[],function() {

    var K = Backbone.Model.extend({
        initialize: function(){
        	this.url = window.serviceBase + '/scoring';
        }
    });

    K.list = Backbone.Collection.extend({
        model: K,
        initialize: function(){}
    });

    return K;

});
/**
 * 获取写作建议列表
 */

define('root-base/model/suggestModel',[],function() {

    var K = Backbone.Model.extend({
        initialize: function(){
        	this.url = window.serviceBase + '/suggest';
        }
    });

    K.list = Backbone.Collection.extend({
        model: K,
        initialize: function(){}
    });

    return K;

});
/**
 * 获取用户信息
 */

define('root-base/model/ajax',[],function() {

    return {
        /**
         * [异步请求]
         * @param  {[Object]} options     [请求参数]
         * @param  {[String]} eventName   [事件名]
         * @param  {[Obejct]} otherParams [其它参数]
         */
    	request: function(options, eventName, otherParams){
            var me = this;
            var params = $.extend(true, {
                headers: { token: window.token },
                dataType: 'json'
            }, options);
            $.ajax(params).done(function(res){
                //事件名、数据、xhr、参数
                me.trigger(eventName, res, null, options.data, otherParams);
            }).fail(function(jqXHR, textStatus, errorThrown){
                me.trigger(eventName, null, jqXHR);
            });
        }
    }

});
/**
 * 获取该写作记录编号的纠错信息
 */

define('root-base/model/correctionModel',[
	'./ajax'
], function(
	ajax
) {

	var E_GET_DICT = 'getDict';

    var K = Backbone.Model.extend({
        initialize: function(){
        	this.url = window.serviceBase + '/correction';
        },
        /**
         * [获取单词或词组详情]
         * @param  {[Object]} options [请求参数]
         */
        getDict: function(options, config){
            options = $.extend(true, {
                url: window.serviceBase + '/queryDict'
            }, options);
            ajax.request.call(this, options, E_GET_DICT, config);
        }
    });

    return K;

});
/**
 * @overview tip提示层
 */

define('root-common/module/tip2',[], function(){
	var $win = $(window);
	var defaults = {
		showDelay: 300,
		hideDelay: 300,
		gravity: 'n',
		auto: true,
		container: null,
		inTip: true, //是否可以移到提示层,
		className: '',
		afterTip: $.noop, //渲染后的回调
		shadowSize: 8  //投影宽度
	};
	var tpl = '<div class="ui-tip-wrap"><div class="ui-tip-mask"></div><div class="ui-tip-arrow"></div><div class="ui-tip-inner"></div></div>';
	var timer, isIn;
	var $body = $('body');
	
	var $tip = $tip ? $tip : $(tpl).appendTo($body);
	var $wrap = $('.ui-tip-inner', $tip);
	var $arrow = $('.ui-tip-arrow', $tip);
	var $mask = $('.ui-tip-mask', $tip);
	var arrowHeight = 5;
	var canShowTip = true;  //是否能显示tip
	var showTip = function(tip, node, html){
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			if(!canShowTip) return;
			if(html){
				$wrap.html(html);
			}

			$tip.show().attr('class', 'ui-tip-wrap '+tip.className);
			position = tip.getPosition();
			$tip.addClass('ui-tip-'+tip.gravity);
			if(node){
				$arrow.css({
					left: node.offset().left + node.outerWidth()/2 - position.left
				});
			}
			$arrow.attr('class', 'ui-tip-arrow ui-tip-arrow-'+tip.gravity);
			$tip.css(position);
			$mask.css({
				'height': $tip.outerHeight(),
				'width': $tip.outerWidth()
			});
		}, tip.showDelay);
	};
	var hideTip = function(tip){
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			if(isIn) return;
			$tip.hide().removeClass('ui-tip-'+tip.gravity+' '+tip.className);
			$arrow.removeClass('ui-tip-arrow-'+tip.gravity);
		}, tip.hideDelay);
	};
	var K = Backbone.View.extend({
		initialize: function(config){
			var me = this;
			$.extend(me, defaults, config);
		},
		show: function(e){
			var me = this;
		
			if(!me.renderHtml) return;
			var html = me.renderHtml.apply(me, arguments);
			me.update(html);
		},
		getPosition: function(){
			var left, top;
			var me = this;
			var $el = me.$el;
			var containerLeft = me.container ? me.container.offset().left : 0;
			var containerTop = me.container ? me.container.offset().top : 0;
			var container = me.container || $win;
			var outstripRight = $el.offset().left - containerLeft + $tip.outerWidth()/2 + $el.outerWidth()/2 - container.outerWidth() + me.shadowSize;
			var outstripLeft = $tip.outerWidth()/2  -$el.outerWidth()/2 - ($el.offset().left - containerLeft);
			var outstrip = outstripRight > 0 ? outstripRight : outstripLeft > 0 ? -outstripLeft : 0;
			me.gravity = me.auto ? me.autoGravity(container, containerLeft, containerTop) : me.gravity;
			switch(me.gravity){
				case 's':
					left = $el.offset().left - ($tip.outerWidth()/2 - $el.outerWidth()/2);
					top = $el.offset().top - $tip.outerHeight() - arrowHeight;
					break;
				case 'n':
					left = $el.offset().left - ($tip.outerWidth()/2 - $el.outerWidth()/2);
					top = $el.offset().top + $el.outerHeight() + arrowHeight;
					break;
			}
			left -= outstrip;

			return {
				left: left,
				top: top
			}
		},
		autoGravity: function(container, left, top){
			var me = this;
			return this.$el.offset().top - top > (container.scrollTop() + container.height() - $tip.outerHeight() - this.$el.outerHeight()) ? 's' : 'n';
		},
		hide: function(){
			hideTip(this);
		},
		update: function(html, cb){
			var me = this;
			var $el = me.$el;
			if(html){
				$tip.data('tip-target', $el[0])
						.data('tip', me);
				showTip(this, $el, html);
			}
			me.afterTip(html);
		}
	});

	$.fn.tip = function(config){
		var options = $.extend({}, defaults, config);
		var args = $.makeArray(arguments);
		var get = function(e){
			var $el = $(e.currentTarget);
			var tip = $el.data('tip');
			$.extend(options, {el: $el, wrap: $wrap});
	        if (!tip) {
	            tip = new K(options);
	            $el.data('tip', tip);
	        }
	        return tip;
		};
		
		return this.each(function(){
			var $el = $(this);
			if($.type(config) === 'string'){
				var tip = $el.data('tip');
				tip && tip[config].apply(tip, args.slice(1));
			}else{
				$el.hover(function(e){
					isIn = $tip.data('tip-target') == e.target;
					canShowTip = true;
					var tip = get(e);
					if(!isIn) $tip.hide();
					tip.show(e);
				}, function(e){
					var tip = get(e);
					isIn = false;
					canShowTip = false;
					tip.hide();
				}).click(function(e){
					var tip = get(e);
					tip.hide();
				});
			}
		});
	}

	$tip.hover(function(){
		var tip = $(this).data('tip');
		canShowTip = true;
		if(!tip.inTip) return;
		isIn = true;
		showTip(tip);
	}, function(){
		var tip = $(this).data('tip');
		canShowTip = false;
		if(!tip.inTip) return;
		isIn = false;
		hideTip(tip);
	});
	return K;
});




define('nav/score',[
    'root-common/util',
	'text!../../tpl/score/left.tpl',
    'text!../../tpl/score/score.tpl',
    'text!../../tpl/score/correction.tpl',
    'text!../../tpl/score/suggestion.tpl',
    'text!../../tpl/score/tip-synonyms.tpl',
    'root-base/model/scoringModel',
    'root-base/model/suggestModel',
    'root-base/model/correctionModel',
    'root-common/module/tip2'
], function(
    util,
	leftTpl,
    scoreTpl,
    correctionTpl,
    suggestionTpl,
    tipSynonymsTpl,
    ScoreModel,
    SuggestModel,
    CorrectionModel
) {
    
    var timer = null;

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me.isLoad = false; //模块是否已经加载，数据只有在提交评分和切换命题时会更新
            me.isInit = false; //对象是否被启用
            me._isShow = false; //默认显示左侧面板中的我的评语
            me._isWord = false; //默认显示单词详情
            me._isLanguage = false; //默认显示语言总汇
            me._isTheme = false; //默认显示主题解析
            me._isWrite = false; //默认显示写作建议
            me._leftTpl = doT.template(leftTpl);
            me._scoreTpl = doT.template(scoreTpl);
            me._correctionTpl = doT.template(correctionTpl);
            me._suggestionTpl = doT.template(suggestionTpl);
            me._tipSynonymsTpl = doT.template(tipSynonymsTpl);
            me._scoreModel = new ScoreModel; //总分数据对象
            me._correctionModel = new CorrectionModel; //错误列表数据对象
            me._suggestModel = new SuggestModel; //写作建议数据
            me._topicId = null;
            me._totalScore = 0; //总分
        },
        events: {
        	'click .my-comments-triangle': '_showThumb',
            'click .hidden-word': '_hiddenWord',
            'click .triangle': '_hiddenLanguage',
            'click .theme-triangle': '_hiddenTheme',
            'click .write-triangle': '_hiddenWrite',
            'click .synonyms-words .words-list .more': '_toggleSynonyms'
        },
        /**
         * [渲染左侧模块]
         */
        render: function(){
        	var me = this;
        	this.$el.html(me._leftTpl({}));

            //计算写作区域的高度
            $('.ui-article', me.$el).css({
                top: $('.icon-list', me.$el).outerHeight() + $('.ui-topic', me.$el).outerHeight() + 20
            });
            
        },
        init:function(){
            var me = this;
            me.isInit = true;
            me.render();
            
            me.clientHeight();

            me._scoreModel.bind({
                'change': $.proxy(me.renderScore, me)
            });
            me._suggestModel.bind({
                'change': $.proxy(me.renderSuggestion, me)
            });
            me._correctionModel.bind({
                'getDict': $.proxy(me._showTipContent, me)
            });
        },
        /**
         * [加载分数]
         */
        loadScore: function(topicId){
            var me = this;
            me._topicId = topicId ? topicId : me._topicId;
            me._scoreModel.fetch({
                url: me._scoreModel.url + '/' + me._topicId,
                cache: false,
                headers: { token: window.token }
            });
        },
        /**
         * [加载语言总汇,主题解析,写作建议数据]
         */
        loadSuggestion:function(topicId){
            var me = this;
            me._topicId = topicId ? topicId : me._topicId;
            me._suggestModel.fetch({
                url: me._suggestModel.url ,
                cache: false,
                headers: { token: window.token }
            });
        },
        reset: function(){
            this.isLoad = false;
        },
        /**
         * [渲染左侧分数]
         */
        renderScore: function(){
            var me = this;
            var data = me._scoreModel.toJSON() || {};
            me.isLoad = true;
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    var num = res.overall.toFixed(1);
                    $('.composition-my-comments', me.$el).html(me._scoreTpl(res));
                    $('.score_before', me.$el).text(num.split('.')[0]);
                    $('.score_after', me.$el).text(num.split('.')[1]);
                    $('.center-score-total', me.$el).text(me._totalScore);
                    me.initPie(num, me._totalScore);
                    me.updateScollbar();
                }
                
            }, data, arguments[1]);
        },
        /**
         * [渲染左侧语言总汇,主题解析,写作建议]
         */
        renderSuggestion: function(){
            var me = this;
            var data = me._suggestModel.toJSON() || {};
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    $('.composition-box', me.$el).show().html(me._suggestionTpl(res));
                    me.updateScollbar();
                }
            }, data, arguments[1]);
        },
        hideSuggestion: function(){
            $('.composition-box', this.$el).hide();
        },
        /**
         * [渲染左侧错误列表]
         */
        renderCorrection: function(res){
            var me = this;
            
            $('.composition-edit-guide', me.$el).html(me._correctionTpl({
                list: res || [],
                parse: me._parse
            }));
            me.updateScollbar();
            me._updateTips();
        },
        _showThumb:function(){
            this.showThumb();
        },
        /**
         * [显示隐藏我的评语]
         */
        showThumb:function(isShow){
            var me = this;
            me._isShow = isShow || !me._isShow;
            isShow = me._isShow;

            $('.my-comments-triangle')[isShow? 'addClass' : 'removeClass']('my-comments-triangle-show');
            $('.my-comments-content').fadeToggle();
        },
        _hiddenWord:function(){
            this.hiddenWord();
        },
        /**
         * [显示单词详情]
         */
        hiddenWord:function(isWord){
            var me = this;
            me._isWord = isWord || !me._isWord;
            isShow = me._isWord;
            var string = [isShow? '展开单词详情' : '隐藏单词详情'];
            $('.hidden-word').html(string);
            $('.word').fadeToggle();
        },
        _hiddenLanguage:function(){
            this.hiddenLanguage();
        },
        /**
         * [显示单词详情]
         */
        hiddenLanguage:function(isLanguage){
            var me = this;
            me._isLanguage = isLanguage || !me._isLanguage;
            isLanguage = me._isLanguage;
            $('.triangle')[isLanguage? 'addClass' : 'removeClass']('triangle-hover');
            $('.language-content,.hidden-word').fadeToggle();
        },
        _hiddenTheme:function(){
            this.hiddenTheme();
        },
        /**
         * [显示主题详情]
         */
        hiddenTheme:function(isTheme){
            var me = this;
            me._isTheme = isTheme || !me._isTheme;
            isTheme = me._isTheme;
            $('.theme-triangle')[isTheme? 'addClass' : 'removeClass']('theme-triangle-hover');
            $('.theme-content').fadeToggle();
        },
        _hiddenWrite:function(){
             this.hiddenWrite();
        },
         /**
         * [显示写作建议]
         */
        hiddenWrite:function(isWrite){
            var me = this;
            me._isWrite = isWrite || !me._isWrite;
            isWrite = me._isWrite;
            $('.write-triangle')[isWrite? 'addClass' : 'removeClass']('write-triangle-hover');
            $('.write-advice-title ,.write-advice-content').fadeToggle();
        },

        /**
         * [初始化饼图]
         */
        initPie: function(score, total){
            var data = [],
            score = 100*score/total;

            series = [100-score, score];

            for (var i = 0; i < series.length; i++) {
                data[i] = {
                    data: series[i]
                }
            }
            var placeholder = $("#placeholder");
            $("#placeholder").css({
                width:154,
                height:154
            })
            $.plot(placeholder, data, {
                series: {
                    pie: { 
                        show: true ,
                        stroke:{
                            color: "#d5e0e5"
                        }
                    }
                },
                colors: ["#d5e0e5", "#4ab9de"]
            });
        },
        /**
         * [计算左侧模块的高度]
         */
        clientHeight:function(){
            var cHeight = document.documentElement.clientHeight;
            $('.composition-modul-box').css({
                height: cHeight - 220
            });
            setTimeout(function(){
                $('.composition-modul-box').customScrollbar({
                    updateOnWindowResize: true
                }); 
            }, 300);
            
        },
        /**
         * [设置总分]
         * @param {[Int]} [score] [总分]
         */
        setTotalScore: function(score){
            this._totalScore = score;
        },
        /**
         * [更新滚动条]
         */
        updateScollbar: function(){
           $('.composition-modul-box').customScrollbar('resize');
        },
        /**
         * [设置topicId]
         */
        setTopicId: function(topicId){
            this._topicId = topicId;
        },
        /**
         * [显示、隐藏近义词]
         */
        _toggleSynonyms: function(e){
            e.preventDefault();
            var $list = $(e.target).closest('.words-list').toggleClass('words-list-show');
        },
        /**
         * [更新tip提示]
         */
        _updateTips: function(){
            var me = this;
            $('.synonyms-words .words-item', me.$el).tip({
                gravity: 's',
                auto: false,
                container: me.$el,
                className: 'tip-synonyms',
                renderHtml: function(e){
                    var _this = this;
                    timer && clearTimeout(timer);
                    timer = setTimeout(function(){
                        me._correctionModel.getDict({
                            data: {
                                word: $(e.currentTarget).text()
                            }
                        }, {
                            node: _this.el
                        });
                    }, 500);
                    return '<div class="loading"></div>';
                }
            });
        },
        /**
         * [显示近义词详情]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _showTipContent: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    var node = otherOptions && otherOptions.node;
                    var res = data.data;
                    res = $.extend(true, {
                        parse: me._parse
                    }, res);
                    if(node){
                        var html = me._tipSynonymsTpl(res);
                        node.tip('update', html);
                    }
                }
                
            }, data, xhr);
        },
        _parse: function(str){
            var reg = /#[^#]*?#/g;
            return str.replace(reg, function($1){
                $1 = $1.replace(/#/g, '');
                return '<i style="color:red;">'+$1+'</i>';
            });
        }
    });

    return K;

});


define('text!topic/../../tpl/topic/detail.tpl',[],function () { return '<div class="title">\r\n\t<span class="keyword">命题</span>\r\n\t<p>{{!it.topicName}}</p>\r\n</div>\r\n<div class="demand">\r\n\t<span class="keyword">命题要求</span>\r\n\t<div class="desc default-skin">{{!it.topicDesc}}</div>\r\n\t<p class="words">（{{=it.minWord}}—{{=it.maxWord}}字，满分：{{=it.score}}分）</p>\r\n</div>';});

/**
 * 写作命题
 */

define('root-base/model/topicModel',[],function() {

    var K = Backbone.Model.extend({
        initialize: function(){
        	this.url = window.serviceBase + '/topic';
        }
    });

    return K;

});
/**
 * 推荐的命题
 */

define('root-base/model/recTopicsModel',[
    './ajax'
], function(ajax) {

	var E_GET_TOPICTYPE = 'getTopicType';
    var E_GET_TOPICLIST = 'getTopicList';
    var E_GET_TOPICLIST_BYKEYWORD = 'getTopicListByKeyword';
    var E_GET_TOPICMANUAL = 'getTopicManual';

    var K = Backbone.Model.extend({
        initialize: function(){},
        /**
         * [获取命题类型列表]
         * @param  {[Object]} options [请求参数]
         */
        getTopicType: function(options){
            options = $.extend(true, {
                url: window.serviceBase + '/topicType'
            }, options);
            ajax.request.call(this, options, E_GET_TOPICTYPE);
        },
        /**
         * [通过命题类型获取命题列表]
         * @param  {[Object]} options [请求参数]
         */
        getTopicList: function(options){
            options = $.extend(true, {
                url: window.serviceBase + '/topicListByType'
            }, options);
            ajax.request.call(this, options, E_GET_TOPICLIST);
        },
        /**
         * [通过命题类型和关键字获取命题列表]
         * @param  {[Object]} options [请求参数]
         */
        getTopicListByKeyword: function(options){
            options = $.extend(true, {
                url: window.serviceBase + '/topicListByKeyword'
            }, options);
            ajax.request.call(this, options, E_GET_TOPICLIST_BYKEYWORD);
        },
        /**
         * [获取手动选择的命题]
         * @param  {[Object]} options [请求参数]
         */
        getTopicManual: function(options){
            options = $.extend(true, {
                url: window.serviceBase + '/topicManual'
            }, options);
            ajax.request.call(this, options, E_GET_TOPICMANUAL);
        }
    });

    return K;

});

define('text!topic/../../tpl/topic/topicRecNav.tpl',[],function () { return '{{~it.list :v:i}}\r\n\t<li class="nav-item\r\n\t{{ if(i == 0){ }} nav-item-on {{ } }}\r\n\t{{ if(i == it.list.length-1){ }} nav-item-last {{ } }}\r\n\t">\r\n\t\t<a href="javascript:;">{{=v.typeName}}</a>\r\n\t</li>\r\n{{~}}';});


define('text!topic/../../tpl/topic/topicRecPanel.tpl',[],function () { return '{{~it.list :v:i}}\r\n\t<li class="panel-item\r\n\t{{ if(i == 0){ }} panel-item-on {{ } }}\r\n\t{{ if(i == it.list.length-1){ }} panel-item-last {{ } }}\r\n\t">\r\n\t\t\r\n\t</li>\r\n{{~}}';});


define('text!topic/../../tpl/topic/topicRecList.tpl',[],function () { return '{{ if(it.list.length > 0){ }}\r\n{{~it.list :v:i}}\r\n\t<li class="topic-item\r\n\t{{ if(i == 0){ }} topic-item-active {{ } }}\r\n\t{{ if(i%2 == 0){ }} even {{ } }}\r\n\t" data-id="{{=v.id}}">\r\n\t\t<a href="javascript:;" class="title">{{=v.topicName}}</a>\r\n\t\t<div class="title">\r\n\t\t\t<span class="keyword">命题</span>\r\n\t\t\t<p>{{=v.topicName}}</p>\r\n\t\t</div>\r\n\t\t<div class="demand">\r\n\t\t\t<span class="keyword">命题要求</span>\r\n\t\t\t<div class="desc default-skin">{{=v.topicDesc}}</div>\r\n\t\t\t<p class="words">（{{=v.minWord}}—{{=v.maxWord}}字，满分：{{=v.score}}分）</p>\r\n\t\t</div>\r\n\t</li>\r\n{{~}}\r\n\r\n{{ }else{ }}\r\n\t<li class="noitem">\r\n\t\t没有相关记录\r\n\t</li>\r\n{{ } }}';});


define('text!topic/../../tpl/topic/topicRecMain.tpl',[],function () { return '<div class="topics-inner">\r\n\t<div class="topic-search">\r\n\t\t<input type="text" class="frm-txt" placeholder="请输入作业标题或关键字" />\r\n\t\t<a href="javascript:;" class="btn-search"><i class="icon-linear">&#xe605;</i></a>\r\n\t</div>\r\n\t<div class="topic-list default-skin">\r\n\t\t<ul class="list-nav fix"></ul>\r\n\t\t<ul class="list-panel"></ul>\r\n\t\t<div class="topic-pagi"></div>\r\n\t</div>\r\n</div>';});


define('text!root-common/module/pagination.tpl',[],function () { return '<ul class="pagination">\n{{ if(it.total > 1){ }}\n    <li class="page pagi-first">\n        <a href="#">首页</a>\n    </li>\n    {{ if(it.current > 1){ }}\n    <li class="page pagi-prev">\n        <a href="#">\n            <span class="txt">上一页</span>\n            <span class="icon-linear">&#xe607;</span>\n        </a>\n    </li>\n    {{ } }}\n    {{ for(var i = 0; i < it.total; i++){ }}\n    <li class="page\n    {{ if(i == it.current - 1){ }}active{{ } }}\n    " rel="{{=i+1}}"><a href="#">{{=i+1}}</a></li>\n    {{ } }}\n    {{ if(it.current < it.total){ }}\n    <li class="page pagi-next">\n        <a href="#">\n            <span class="txt">下一页</span>\n            <span class="icon-linear">&#xe609;</span>\n        </a>\n    </li>\n    {{ } }}\n    <li class="page pagi-last">\n        <a href="#">末页</a>\n    </li>\n    <input class="pagi-which" type="text" />\n    <span class="pagi-go">跳转</span>\n{{ } }}\n</ul>';});

/**
 * @overview 分页
 * @author Chunjie
 * @version 2015-09-25
 */

define('root-common/module/pagination',[
    'text!./pagination.tpl'
], function(tpl){
    
    var K = Backbone.View.extend({
        initialize: function(options) {
            options.total = options.total || 1;
            options.current = options.current || 1;
            this.options = options;
            this._tpl = doT.template(tpl);
            this.render();
        },
        events: {
            'click .page': '_go',
            'click .pagi-go': '_direct',
            'click .pagi-first': '_goFirst',
            'click .pagi-last': '_goLast'
        },
        _go: function(e){
            e.preventDefault();
            var me = this;
            var o = $(e.currentTarget);
            if (o.hasClass('pagi-prev')) 
                me.prev();
            else if (o.hasClass('pagi-next')) 
                me.next();
            else {
                var rel = parseInt($.trim(o.attr('rel')));
                if(/\d+/.test(rel)){
                    me.go(parseInt(rel));
                }
            }
        },
        _direct: function(e){
            e.preventDefault();
            var index = $('.pagi-which', this.$el).val();
            try{
                index = parseInt(index);
                if(index <= this.options.total){
                    this.go(index);
                }
            }catch(e){

            }
        },
        _goFirst: function(e){
            e.preventDefault();
            this.go(1);
        },
        _goLast: function(e){
            e.preventDefault();
            this.go(this.options.total);
        },
        render: function(){
            this.$el.html(this._tpl(this.options));
        },
        reset: function(options) {
            if(options) {
                $.extend(this.options, options);
            }
            this.render();
        },
        total: function(i) {
            if(i !== undefined) {
                this.options.total = i;
            }
            return this.options.total;
        },
        current: function(i) {
            if(i !== undefined) {
                this.options.current = i;
            }
            return this.options.current;
        },
        go: function(i, cb) {
            this.current(i);
            this.reset();
            if(cb) {
                cb(this.options.current);
            }
            this.trigger('toggle', i);
            return this;
        },
        prev: function(cb) {
            if(this.options.current > 1) {
                this.go(this.options.current - 1, cb);
            }
            return this;
        },
        next: function(cb) {
            if(this.options.current < this.options.total) {
                this.go(this.options.current + 1, cb);
            }
            return this;
        },
        first: function() {
            if(this.options.current > 1) {
                this.go(1);
            }
            return this;
        },
        last: function() {
            if (this.options.current < this.options.total) {
                this.go(this.options.total);
            }
            return this;
        }
    });

    return K;
});



/**
 * 命题推荐列表
 */

define('topic/topicRec',[
    'root-base/model/recTopicsModel',
    'text!../../tpl/topic/topicRecNav.tpl',
    'text!../../tpl/topic/topicRecPanel.tpl',
    'text!../../tpl/topic/topicRecList.tpl',
    'text!../../tpl/topic/topicRecMain.tpl',
    'root-common/util',
    'root-common/module/tab',
    'root-common/module/pagination'
], function(
    Model,
    navTpl,
    panelTpl,
    listTpl,
    mainTpl,
    util,
    Tab,
    Pagi
) {

    var E_INIT_TOPIC = 'init.topic';

	var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me.$btn = $(config.btn).unbind('click').click($.proxy(me.show, me));
            me._navTpl = doT.template(navTpl); //命题导航模板
            me._panelTpl = doT.template(panelTpl); //命题面板模板
            me._listTpl = doT.template(listTpl); //命题列表模板
            me._mainTpl = doT.template(mainTpl); //命题列表模板
            me.reset();
            me.render();
        },
        events: {
            'mouseenter .topic-item': '_showTopic',
            'click .topic-item': '_initTopic',
            'click .btn-search': '_search'
        },
        render: function(){
            this.$el.html(this._mainTpl({}));
        },
        reset: function(){
            var me = this;
            me._model = new Model;
            me._isShow = false; //当前是否显示面板
            me._isPanelOpened = false; //是否发开过面板并加载成功过
            me._tab = null; 
            me._page = null; //分页
            me._topicTypes = []; //命题导航
            me._currentTopicCode = null; //当前命题code
            me._model.bind({
                'getTopicType': $.proxy(me._getTopicType, me),
                'getTopicList': $.proxy(me._getTopicList, me),
                'getTopicManual': $.proxy(me._getTopicManual, me)
            });
        },
        /**
         * [显示面板]
         * @param {[Event]} [e] [事件]
         */
        show: function(e){
            e.preventDefault();
            var me = this;
            var isShow = me._isShow = !me._isShow;
            me.$el.toggle();
            if(isShow){
                me._model.getTopicType();
            }
        },
        hide: function(){
            this.$el.hide();
        },
        /**
         * [获取命题类型列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _getTopicType: function(data, xhr){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    var res = me._topicTypes = data.data;
                    $('.list-nav', me.$el).html(me._navTpl({
                        list: res
                    }));
                    $('.list-panel', me.$el).html(me._panelTpl({
                        list: res
                    }));
                    me._tab = new Tab({
                        btns: $('.list-nav .nav-item', me.$el),
                        panels: $('.list-panel .panel-item', me.$el)
                    });
                    me._tab.bind('select', $.proxy(me._switchTab, me, res));    
                }
                
            }, data, xhr);
        },
        _getTopicList: function(data, xhr, params){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    me._isPanelOpened = true;
                    var res = data.data;
                    var list = res.recordList || [];
                    try{
                        var keyword = params.keyword;
                        var code = params.typeCode;
                        var index = me._tab.getIndex();
                        var page = index + 1;
                        $('.panel-item', me.$el).eq(index).html(me._listTpl({
                            list: list
                        }));
                        //创建分页
                        if(!me._page){
                            me._page = new Pagi({
                                el: $('.topic-pagi', me.$el),
                                total: res.pageSum,
                                current: page
                            });
                            me._page.bind('toggle', function(index){
                                var options = {
                                    typeCode: me._currentTopicCode,
                                    pageNum: index,
                                    pageSize: 13
                                };
                                me._loadTopicList(options);
                            })
                        }
                        //切换tab，重置分页
                        if(code !== me._currentTopicCode || keyword !== undefined){
                            me._currentTopicCode = code;

                            me._page.current(1);
                            me._page.total(res.pageSum);
                            me._page.render();
                        }
                        
                    }catch(e){

                    }
                }
                
            }, data, xhr);
        },
        _showTopic: function(e){
            $('.topic-item-active', this.$el).removeClass('topic-item-active');
            $(e.currentTarget).addClass('topic-item-active');
        },
        /**
         * [获取命题类型列表]
         * @param {[Int]} [index] [tab索引]
         */
        _switchTab: function(res, index){
            var me = this;
            var data = res[index];
            if(data){
                me.search(data.typeCode);
            }
            
        },
        /**
         * [加载命题列表]
         * @param {[Object]} [params] [请求参数]
         */
        _loadTopicList: function(params){
            this._model.getTopicList({
                data: params
            });    
        },
       
        _search: function(e){
            e.preventDefault();
            this.search();
        },
         /**
         * [搜索]
         * @param {[Event]} [e] [事件]
         */
        search: function(typeCode){
            var me = this;
            var val = $('.topic-search .frm-txt', this.$el).val();
            val = me._getKeyword(val);
            typeCode = typeCode || me._currentTopicCode;
            var options = {
                typeCode: typeCode,
                keyword: val,
                pageNum: 1,
                pageSize: 13
            };
            if(!val){
                options.keyword = '';
            }
            me._loadTopicList(options);
        },
         /**
         * [获取关键词，fix ie下的字符串问题]
         * @param {[String]} [val] [关键词]
         */
        _getKeyword: function(val){
            val = $.trim(val);
            // val = encodeURIComponent(val);
            return val;
        },
        /**
         * [初始化命题，页面重新更新UI]
         * @param {[Event]} [e] [事件]
         */
        _initTopic: function(e){
            e.preventDefault();
            var id = $(e.currentTarget).data('id');
            if(id !== undefined){
                this._model.getTopicManual({
                    data: {
                        topicId: id
                    }
                });        
            }
        },
        /**
         * [获取手动选择的命题]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _getTopicManual: function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    //删掉当前view绑定的事件和事件代理
                    me.$el.hide();
                    me.trigger(E_INIT_TOPIC, data.data);
                    me.undelegateEvents();
                    me.off();
                }
                
            }, data, xhr);
        }
    });

    return K;

});

define('root-common/module/scrollbar',[], function() {

  (function ($) {

    $.fn.customScrollbar = function (options, args) {

      var defaultOptions = {
        skin: undefined,
        hScroll: true,
        vScroll: true,
        updateOnWindowResize: false,
        animationSpeed: 300,
        onCustomScroll: undefined,
        swipeSpeed: 1,
        wheelSpeed: 40,
        fixedThumbWidth: undefined,
        fixedThumbHeight: undefined,
        preventDefaultScroll: false
      }

      var Scrollable = function (element, options) {
        this.$element = $(element);
        this.options = options;
        this.addScrollableClass();
        this.addSkinClass();
        this.addScrollBarComponents();
        if (this.options.vScroll)
          this.vScrollbar = new Scrollbar(this, new VSizing());
        if (this.options.hScroll)
          this.hScrollbar = new Scrollbar(this, new HSizing());
        this.$element.data("scrollable", this);
        this.initKeyboardScrolling();
        this.bindEvents();
      }

      Scrollable.prototype = {

        addScrollableClass: function () {
          if (!this.$element.hasClass("scrollable")) {
            this.scrollableAdded = true;
            this.$element.addClass("scrollable");
          }
        },

        removeScrollableClass: function () {
          if (this.scrollableAdded)
            this.$element.removeClass("scrollable");
        },

        addSkinClass: function () {
          if (typeof(this.options.skin) == "string" && !this.$element.hasClass(this.options.skin)) {
            this.skinClassAdded = true;
            this.$element.addClass(this.options.skin);
          }
        },

        removeSkinClass: function () {
          if (this.skinClassAdded)
            this.$element.removeClass(this.options.skin);
        },

        addScrollBarComponents: function () {
          this.assignViewPort();
          if (this.$viewPort.length == 0) {
            this.$element.wrapInner("<div class=\"viewport\" />");
            this.assignViewPort();
            this.viewPortAdded = true;
          }
          this.assignOverview();
          if (this.$overview.length == 0) {
            this.$viewPort.wrapInner("<div class=\"overview\" />");
            this.assignOverview();
            this.overviewAdded = true;
          }
          this.addScrollBar("vertical", "prepend");
          this.addScrollBar("horizontal", "append");
        },

        removeScrollbarComponents: function () {
          this.removeScrollbar("vertical");
          this.removeScrollbar("horizontal");
          if (this.overviewAdded)
            this.$element.unwrap();
          if (this.viewPortAdded)
            this.$element.unwrap();
        },

        removeScrollbar: function (orientation) {
          if (this[orientation + "ScrollbarAdded"])
            this.$element.find(".scroll-bar." + orientation).remove();
        },

        assignViewPort: function () {
          this.$viewPort = this.$element.find(".viewport");
        },

        assignOverview: function () {
          this.$overview = this.$viewPort.find(".overview");
        },

        addScrollBar: function (orientation, fun) {
          if (this.$element.find(".scroll-bar." + orientation).length == 0) {
            this.$element[fun]("<div class='scroll-bar " + orientation + "'><div class='thumb'></div></div>")
            this[orientation + "ScrollbarAdded"] = true;
          }
        },

        resize: function (keepPosition) {
          if (this.vScrollbar)
            this.vScrollbar.resize(keepPosition);
          if (this.hScrollbar)
            this.hScrollbar.resize(keepPosition);
        },

        scrollTo: function (element) {
          if (this.vScrollbar)
            this.vScrollbar.scrollToElement(element);
          if (this.hScrollbar)
            this.hScrollbar.scrollToElement(element);
        },

        scrollToXY: function (x, y) {
          this.scrollToX(x);
          this.scrollToY(y);
        },

        scrollToX: function (x) {
          if (this.hScrollbar)
            this.hScrollbar.scrollOverviewTo(x, true);
        },

        scrollToY: function (y) {
          if (this.vScrollbar)
            this.vScrollbar.scrollOverviewTo(y, true);
        },

        scrollByX: function (x) {
          if (this.hScrollbar)
            this.scrollToX(this.hScrollbar.overviewPosition() + x);
        },

        scrollByY: function (y) {
          if (this.vScrollbar)
            this.scrollToY(this.vScrollbar.overviewPosition() + y);
        },

        remove: function () {
          this.removeScrollableClass();
          this.removeSkinClass();
          this.removeScrollbarComponents();
          this.$element.data("scrollable", null);
          this.removeKeyboardScrolling();
          if (this.vScrollbar)
            this.vScrollbar.remove();
          if (this.hScrollbar)
            this.hScrollbar.remove();
        },

        setAnimationSpeed: function (speed) {
          this.options.animationSpeed = speed;
        },

        isInside: function (element, wrappingElement) {
          var $element = $(element);
          var $wrappingElement = $(wrappingElement);
          var elementOffset = $element.offset();
          var wrappingElementOffset = $wrappingElement.offset();
          return (elementOffset.top >= wrappingElementOffset.top) && (elementOffset.left >= wrappingElementOffset.left) &&
            (elementOffset.top + $element.height() <= wrappingElementOffset.top + $wrappingElement.height()) &&
            (elementOffset.left + $element.width() <= wrappingElementOffset.left + $wrappingElement.width())
        },

        initKeyboardScrolling: function () {
          var _this = this;

          this.elementKeydown = function (event) {
            if (document.activeElement === _this.$element[0]) {
              if (_this.vScrollbar)
                _this.vScrollbar.keyScroll(event);
              if (_this.hScrollbar)
                _this.hScrollbar.keyScroll(event);
            }
          }

          this.$element
            .attr('tabindex', '-1')
            .keydown(this.elementKeydown);
        },

        removeKeyboardScrolling: function () {
          this.$element
            .removeAttr('tabindex')
            .unbind("keydown", this.elementKeydown);
        },

        bindEvents: function () {
          if (this.options.onCustomScroll)
            this.$element.on("customScroll", this.options.onCustomScroll);
        }

      }

      var Scrollbar = function (scrollable, sizing) {
        this.scrollable = scrollable;
        this.sizing = sizing
        this.$scrollBar = this.sizing.scrollBar(this.scrollable.$element);
        this.$thumb = this.$scrollBar.find(".thumb");
        this.setScrollPosition(0, 0);
        this.resize();
        this.initMouseMoveScrolling();
        this.initMouseWheelScrolling();
        this.initTouchScrolling();
        this.initMouseClickScrolling();
        this.initWindowResize();
      }

      Scrollbar.prototype = {

        resize: function (keepPosition) {
          this.overviewSize = this.sizing.size(this.scrollable.$overview);
          this.calculateViewPortSize();
          this.sizing.size(this.scrollable.$viewPort, this.viewPortSize);
          this.ratio = this.viewPortSize / this.overviewSize;
          this.sizing.size(this.$scrollBar, this.viewPortSize);
          this.thumbSize = this.calculateThumbSize();
          this.sizing.size(this.$thumb, this.thumbSize);
          this.maxThumbPosition = this.calculateMaxThumbPosition();
          this.maxOverviewPosition = this.calculateMaxOverviewPosition();
          this.enabled = (this.overviewSize > this.viewPortSize);
          if (this.scrollPercent === undefined)
            this.scrollPercent = 0.0;
          if (this.enabled)
            this.rescroll(keepPosition);
          else
            this.setScrollPosition(0, 0);
          this.$scrollBar.toggle(this.enabled);
        },

        calculateViewPortSize: function () {
          var elementSize = this.sizing.size(this.scrollable.$element);
          if (elementSize > 0 && !this.maxSizeUsed) {
            this.viewPortSize = elementSize;
            this.maxSizeUsed = false;
          }
          else {
            var maxSize = this.sizing.maxSize(this.scrollable.$element);
            this.viewPortSize = Math.min(maxSize, this.overviewSize);
            this.maxSizeUsed = true;
          }
        },

        calculateThumbSize: function () {
          var fixedSize = this.sizing.fixedThumbSize(this.scrollable.options)
          var size;
          if (fixedSize)
            size = fixedSize;
          else
            size = this.ratio * this.viewPortSize
          return Math.max(size, this.sizing.minSize(this.$thumb));
        },

        initMouseMoveScrolling: function () {
          var _this = this;
          this.$thumb.mousedown(function (event) {
            if (_this.enabled)
              _this.startMouseMoveScrolling(event);
          });
          this.documentMouseup = function (event) {
            _this.stopMouseMoveScrolling(event);
          };
          $(document).mouseup(this.documentMouseup);
          this.documentMousemove = function (event) {
            _this.mouseMoveScroll(event);
          };
          $(document).mousemove(this.documentMousemove);
          this.$thumb.click(function (event) {
            event.stopPropagation();
          });
        },

        removeMouseMoveScrolling: function () {
          this.$thumb.unbind();
          $(document).unbind("mouseup", this.documentMouseup);
          $(document).unbind("mousemove", this.documentMousemove);
        },

        initMouseWheelScrolling: function () {
          var _this = this;
          this.scrollable.$element.mousewheel(function (event, delta, deltaX, deltaY) {
            if (_this.enabled) {
              var scrolled = _this.mouseWheelScroll(deltaX, deltaY);
              _this.stopEventConditionally(event, scrolled);
            }
          });
        },

        removeMouseWheelScrolling: function () {
          this.scrollable.$element.unbind("mousewheel");
        },

        initTouchScrolling: function () {
          if (document.addEventListener) {
            var _this = this;
            this.elementTouchstart = function (event) {
              if (_this.enabled)
                _this.startTouchScrolling(event);
            }
            this.scrollable.$element[0].addEventListener("touchstart", this.elementTouchstart);
            this.documentTouchmove = function (event) {
              _this.touchScroll(event);
            }
            this.scrollable.$element[0].addEventListener("touchmove", this.documentTouchmove);
            this.elementTouchend = function (event) {
              _this.stopTouchScrolling(event);
            }
            this.scrollable.$element[0].addEventListener("touchend", this.elementTouchend);
          }
        },

        removeTouchScrolling: function () {
          if (document.addEventListener) {
            this.scrollable.$element[0].removeEventListener("touchstart", this.elementTouchstart);
            document.removeEventListener("touchmove", this.documentTouchmove);
            this.scrollable.$element[0].removeEventListener("touchend", this.elementTouchend);
          }
        },

        initMouseClickScrolling: function () {
          var _this = this;
          this.scrollBarClick = function (event) {
            _this.mouseClickScroll(event);
          };
          this.$scrollBar.click(this.scrollBarClick);
        },

        removeMouseClickScrolling: function () {
          this.$scrollBar.unbind("click", this.scrollBarClick);
        },

        initWindowResize: function () {
          if (this.scrollable.options.updateOnWindowResize) {
            var _this = this;
            this.windowResize = function () {
              _this.resize();
            };
            $(window).resize(this.windowResize);
          }
        },

        removeWindowResize: function () {
          $(window).unbind("resize", this.windowResize);
        },

        isKeyScrolling: function (key) {
          return this.keyScrollDelta(key) != null;
        },

        keyScrollDelta: function (key) {
          for (var scrollingKey in this.sizing.scrollingKeys)
            if (scrollingKey == key)
              return this.sizing.scrollingKeys[key](this.viewPortSize);
          return null;
        },

        startMouseMoveScrolling: function (event) {
          this.mouseMoveScrolling = true;
          $("body").addClass("not-selectable");
          this.setUnselectable($("body"), "on");
          this.setScrollEvent(event);
          event.preventDefault();
        },

        stopMouseMoveScrolling: function (event) {
          this.mouseMoveScrolling = false;
          $("body").removeClass("not-selectable");
          this.setUnselectable($("body"), null);
        },

        setUnselectable: function (element, value) {
          if (element.attr("unselectable") != value) {
            element.attr("unselectable", value);
            element.find(':not(input)').attr('unselectable', value);
          }
        },

        mouseMoveScroll: function (event) {
          if (this.mouseMoveScrolling) {
            var delta = this.sizing.mouseDelta(this.scrollEvent, event);
            this.scrollThumbBy(delta);
            this.setScrollEvent(event);
          }
        },

        startTouchScrolling: function (event) {
          if (event.touches && event.touches.length == 1) {
            this.setScrollEvent(event.touches[0]);
            this.touchScrolling = true;
            event.stopPropagation();
          }
        },

        touchScroll: function (event) {
          if (this.touchScrolling && event.touches && event.touches.length == 1) {
            var delta = -this.sizing.mouseDelta(this.scrollEvent, event.touches[0]) * this.scrollable.options.swipeSpeed;
            var scrolled = this.scrollOverviewBy(delta);
            if (scrolled)
              this.setScrollEvent(event.touches[0]);
            this.stopEventConditionally(event, scrolled);
          }
        },

        stopTouchScrolling: function (event) {
          this.touchScrolling = false;
          event.stopPropagation();
        },

        mouseWheelScroll: function (deltaX, deltaY) {
          var delta = -this.sizing.wheelDelta(deltaX, deltaY) * this.scrollable.options.wheelSpeed;
          if (delta != 0)
            return this.scrollOverviewBy(delta);
        },

        mouseClickScroll: function (event) {
          var delta = this.viewPortSize - 20;
          if (event["page" + this.sizing.scrollAxis()] < this.$thumb.offset()[this.sizing.offsetComponent()])
          // mouse click over thumb
            delta = -delta;
          this.scrollOverviewBy(delta);
        },

        keyScroll: function (event) {
          var keyDown = event.which;
          if (this.enabled && this.isKeyScrolling(keyDown)) {
            var scrolled = this.scrollOverviewBy(this.keyScrollDelta(keyDown));
            this.stopEventConditionally(event, scrolled);
          }
        },

        scrollThumbBy: function (delta) {
          var thumbPosition = this.thumbPosition();
          thumbPosition += delta;
          thumbPosition = this.positionOrMax(thumbPosition, this.maxThumbPosition);
          var oldScrollPercent = this.scrollPercent;
          this.scrollPercent = thumbPosition / this.maxThumbPosition;
          if (oldScrollPercent != this.scrollPercent) {
            var overviewPosition = (thumbPosition * this.maxOverviewPosition) / this.maxThumbPosition;
            this.setScrollPosition(overviewPosition, thumbPosition);
            this.triggerCustomScroll(oldScrollPercent);
            return true
          }
          else
            return false;
        },

        thumbPosition: function () {
          return this.$thumb.position()[this.sizing.offsetComponent()];
        },

        scrollOverviewBy: function (delta) {
          var overviewPosition = this.overviewPosition() + delta;
          return this.scrollOverviewTo(overviewPosition, false);
        },

        overviewPosition: function () {
          return -this.scrollable.$overview.position()[this.sizing.offsetComponent()];
        },

        scrollOverviewTo: function (overviewPosition, animate) {
          overviewPosition = this.positionOrMax(overviewPosition, this.maxOverviewPosition);
          var oldScrollPercent = this.scrollPercent;
          this.scrollPercent = overviewPosition / this.maxOverviewPosition;
          if (oldScrollPercent != this.scrollPercent) {
            var thumbPosition = this.scrollPercent * this.maxThumbPosition;
            if (animate)
              this.setScrollPositionWithAnimation(overviewPosition, thumbPosition);
            else
              this.setScrollPosition(overviewPosition, thumbPosition);
            this.triggerCustomScroll(oldScrollPercent);
            return true;
          }
          else
            return false;
        },

        positionOrMax: function (p, max) {
          if (p < 0)
            return 0;
          else if (p > max)
            return max;
          else
            return p;
        },

        triggerCustomScroll: function (oldScrollPercent) {
          this.scrollable.$element.trigger("customScroll", {
              scrollAxis: this.sizing.scrollAxis(),
              direction: this.sizing.scrollDirection(oldScrollPercent, this.scrollPercent),
              scrollPercent: this.scrollPercent * 100
            }
          );
        },

        rescroll: function (keepPosition) {
          if (keepPosition) {
            var overviewPosition = this.positionOrMax(this.overviewPosition(), this.maxOverviewPosition);
            this.scrollPercent = overviewPosition / this.maxOverviewPosition;
            var thumbPosition = this.scrollPercent * this.maxThumbPosition;
            this.setScrollPosition(overviewPosition, thumbPosition);
          }
          else {
            var thumbPosition = this.scrollPercent * this.maxThumbPosition;
            var overviewPosition = this.scrollPercent * this.maxOverviewPosition;
            this.setScrollPosition(overviewPosition, thumbPosition);
          }
        },

        setScrollPosition: function (overviewPosition, thumbPosition) {
          this.$thumb.css(this.sizing.offsetComponent(), thumbPosition + "px");
          this.scrollable.$overview.css(this.sizing.offsetComponent(), -overviewPosition + "px");
        },

        setScrollPositionWithAnimation: function (overviewPosition, thumbPosition) {
          var thumbAnimationOpts = {};
          var overviewAnimationOpts = {};
          thumbAnimationOpts[this.sizing.offsetComponent()] = thumbPosition + "px";
          this.$thumb.animate(thumbAnimationOpts, this.scrollable.options.animationSpeed);
          overviewAnimationOpts[this.sizing.offsetComponent()] = -overviewPosition + "px";
          this.scrollable.$overview.animate(overviewAnimationOpts, this.scrollable.options.animationSpeed);
        },

        calculateMaxThumbPosition: function () {
          return Math.max(0, this.sizing.size(this.$scrollBar) - this.thumbSize);
        },

        calculateMaxOverviewPosition: function () {
          return Math.max(0, this.sizing.size(this.scrollable.$overview) - this.sizing.size(this.scrollable.$viewPort));
        },

        setScrollEvent: function (event) {
          var attr = "page" + this.sizing.scrollAxis();
          if (!this.scrollEvent || this.scrollEvent[attr] != event[attr])
            this.scrollEvent = {pageX: event.pageX, pageY: event.pageY};
        },

        scrollToElement: function (element) {
          var $element = $(element);
          if (this.sizing.isInside($element, this.scrollable.$overview)) {
            var elementOffset = $element.offset();
            var overviewOffset = this.scrollable.$overview.offset();
            this.scrollOverviewTo(elementOffset[this.sizing.offsetComponent()] - overviewOffset[this.sizing.offsetComponent()], true);
          }
        },

        remove: function () {
          this.removeMouseMoveScrolling();
          this.removeMouseWheelScrolling();
          this.removeTouchScrolling();
          this.removeMouseClickScrolling();
          this.removeWindowResize();
        },

        stopEventConditionally: function (event, condition) {
          if (condition || this.scrollable.options.preventDefaultScroll) {
            event.preventDefault();
            event.stopPropagation();
          }
        }

      }

      var HSizing = function () {
      }

      HSizing.prototype = {
        size: function ($el, arg) {
          if (arg)
            return $el.width(arg);
          else
            return $el.width();
        },

        minSize: function ($el) {
          return parseInt($el.css("min-width")) || 0;
        },

        maxSize: function ($el) {
          return parseInt($el.css("max-width")) || 0;
        },

        fixedThumbSize: function (options) {
          return options.fixedThumbWidth;
        },

        scrollBar: function ($el) {
          return $el.find(".scroll-bar.horizontal");
        },

        mouseDelta: function (event1, event2) {
          return event2.pageX - event1.pageX;
        },

        offsetComponent: function () {
          return "left";
        },

        wheelDelta: function (deltaX, deltaY) {
          return deltaX;
        },

        scrollAxis: function () {
          return "X";
        },

        scrollDirection: function (oldPercent, newPercent) {
          return oldPercent < newPercent ? "right" : "left";
        },

        scrollingKeys: {
          37: function (viewPortSize) {
            return -10; //arrow left
          },
          39: function (viewPortSize) {
            return 10; //arrow right
          }
        },

        isInside: function (element, wrappingElement) {
          var $element = $(element);
          var $wrappingElement = $(wrappingElement);
          var elementOffset = $element.offset();
          var wrappingElementOffset = $wrappingElement.offset();
          return (elementOffset.left >= wrappingElementOffset.left) &&
            (elementOffset.left + $element.width() <= wrappingElementOffset.left + $wrappingElement.width());
        }

      }

      var VSizing = function () {
      }

      VSizing.prototype = {

        size: function ($el, arg) {
          if (arg)
            return $el.height(arg);
          else
            return $el.height();
        },

        minSize: function ($el) {
          return parseInt($el.css("min-height")) || 0;
        },

        maxSize: function ($el) {
          return parseInt($el.css("max-height")) || 0;
        },

        fixedThumbSize: function (options) {
          return options.fixedThumbHeight;
        },

        scrollBar: function ($el) {
          return $el.find(".scroll-bar.vertical");
        },

        mouseDelta: function (event1, event2) {
          return event2.pageY - event1.pageY;
        },

        offsetComponent: function () {
          return "top";
        },

        wheelDelta: function (deltaX, deltaY) {
          return deltaY;
        },

        scrollAxis: function () {
          return "Y";
        },

        scrollDirection: function (oldPercent, newPercent) {
          return oldPercent < newPercent ? "down" : "up";
        },

        scrollingKeys: {
          38: function (viewPortSize) {
            return -10; //arrow up
          },
          40: function (viewPortSize) {
            return 10; //arrow down
          },
          33: function (viewPortSize) {
            return -(viewPortSize - 20); //page up
          },
          34: function (viewPortSize) {
            return viewPortSize - 20; //page down
          }
        },

        isInside: function (element, wrappingElement) {
          var $element = $(element);
          var $wrappingElement = $(wrappingElement);
          var elementOffset = $element.offset();
          var wrappingElementOffset = $wrappingElement.offset();
          return (elementOffset.top >= wrappingElementOffset.top) &&
            (elementOffset.top + $element.height() <= wrappingElementOffset.top + $wrappingElement.height());
        }

      }

      return this.each(function () {
        if (options == undefined)
          options = defaultOptions;
        if (typeof(options) == "string") {
          var scrollable = $(this).data("scrollable");
          if (scrollable)
            scrollable[options](args);
        }
        else if (typeof(options) == "object") {
          options = $.extend(defaultOptions, options);
          new Scrollable($(this), options);
        }
        else
          throw "Invalid type of options";
      });

    }
    ;

  })
    (jQuery);

  (function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
      for (var i = types.length; i;) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
      }
    }

    $.event.special.mousewheel = {
      setup: function () {
        if (this.addEventListener) {
          for (var i = types.length; i;) {
            this.addEventListener(types[--i], handler, false);
          }
        } else {
          this.onmousewheel = handler;
        }
      },

      teardown: function () {
        if (this.removeEventListener) {
          for (var i = types.length; i;) {
            this.removeEventListener(types[--i], handler, false);
          }
        } else {
          this.onmousewheel = null;
        }
      }
    };

    $.fn.extend({
      mousewheel: function (fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
      },

      unmousewheel: function (fn) {
        return this.unbind("mousewheel", fn);
      }
    });


    function handler(event) {
      var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
      event = $.event.fix(orgEvent);
      event.type = "mousewheel";

      // Old school scrollwheel delta
      if (orgEvent.wheelDelta) {
        delta = orgEvent.wheelDelta / 120;
      }
      if (orgEvent.detail) {
        delta = -orgEvent.detail / 3;
      }

      // New school multidimensional scroll (touchpads) deltas
      deltaY = delta;

      // Gecko
      if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = delta;
      }

      // Webkit
      if (orgEvent.wheelDeltaY !== undefined) {
        deltaY = orgEvent.wheelDeltaY / 120;
      }
      if (orgEvent.wheelDeltaX !== undefined) {
        deltaX = orgEvent.wheelDeltaX / 120;
      }

      // Add event and delta to the front of the arguments
      args.unshift(event, delta, deltaX, deltaY);

      return ($.event.dispatch || $.event.handle).apply(this, args);
    }

  })(jQuery);

});
define('topic/detail',[
    '../p-data',
    'text!../../tpl/topic/detail.tpl',
    'root-common/util',
    'root-base/model/topicModel',
    './topicRec',
    'root-common/module/scrollbar'
], function(
    pData,
    topicTpl,
    util,
    TopicModel,
    TopicRec
) {

    var E_GET_TOPICID = 'get.topicId'; //获取topicId
    var E_GET_TOTALSCORE = 'get.totalScore'; //获取总分
    var E_INIT_TOPIC = 'init.topic'; //重新设置命题UI

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._topicTpl = doT.template(topicTpl);
            me._topicId = null; //命题id
            me._topicRec = null; //命题推荐列表
            me._topicModel = new TopicModel();
            me.isLoad = false; //是否加载了模块
            me._topicModel.bind({
                'change': $.proxy(me.renderTopic, me),
                'error': $.proxy(me.renderTopic, me)
            });
        },
        events: {
        },
        /**
         * [外部初始化方法]
         */
        init: function(){
            this.loadTopic();
        },
        /**
         * [加载命题数据]
         */
        loadTopic: function(){
            this._topicModel.fetch({
                type: 'get',
                cache: false,
                headers: { token: window.token }
            });
        },
        reset: function(){
            this.isLoad = false;
            this._topicRec && this._topicRec.hide();
        },
        /**
         * [渲染顶部命题]
         */
        renderTopic: function(){
            var me = this;
            var data = me._topicModel.toJSON() || {};
            me.isLoad = true;
            util.dealAjax(function(isError){
                if(!isError){
                    data = data.data;
                    me._renderTopic(data);
                }
            }, data, arguments[1]);

        },
        _renderTopic: function(data){
            var me = this;
            me._topicId = data.id;
            pData.topicId = data.id;
            me.trigger(E_GET_TOTALSCORE, data.score);
            me.trigger(E_GET_TOPICID, me._topicId);
            // me.loadAnswer();
            me.$el.html(me._topicTpl(data));
            me._topicRec = new TopicRec({
                el: $('.topics-area'),
                btn: $('.icon-list .icon-linear')
            });

            me._topicRec.bind({
                'init.topic': function(topic){
                    me._renderTopic(topic);
                    me.trigger(E_INIT_TOPIC, topic);
                }
            });
             //命题加滚动条
            setTimeout(function(){
                $('.demand .desc', me.$el).customScrollbar({
                    updateOnWindowResize: true,
                    hScroll: false
                }); 
            }, 300);
        },
        updateScollbar: function(){
            $('.demand .desc', this.$el).customScrollbar('resize');
        }

    });

    return K;

});


define('text!../tpl/article.tpl',[],function () { return '<a href="javascript:;" class="ui-btn icon-solid icon-clear">&#xe60c;</a>\r\n<div class="total-result">\r\n    <div class="time">\r\n        <p class="keyword">写作时间</p>\r\n        <p class="time-calculated">00分00秒</p>\r\n    </div>\r\n    <div class="words">\r\n        <p class="keyword">字数统计</p>\r\n        <p><span class="words-calculated">0</span> words</p>\r\n    </div>\r\n</div>\r\n<div class="btns-action">\r\n    <a href="javascript:;" class="ui-btn btn-draft">存为草稿<i class="icon-solid">&#xe60d;</i></a>\r\n    <a href="javascript:;" class="ui-btn btn-submit">提交评分<i class="icon-solid">&#xe60d;</i></a>\r\n</div>\r\n<div class="main-text">\r\n    <textarea id="Editor" class="main-editor" name="content"></textarea>\r\n</div>';});

/**
 * 获取用户写作内容/提交答题
 * 1000为网络请求或者后端处理出错
 */

define('root-base/model/answerModel',[],function() {

	var E_SCORE_STATUS = 'score.status';

    var K = Backbone.Model.extend({
        initialize: function(){
            this.url = window.serviceBase + '/answer';
        },
        /**
         * [评分]
         * @param  {[Object]} options      [请求参数]
         * @param  {[Object]} otherOptions [其它参数]
         */
        score: function(options, otherOptions){
        	var me = this;
        	var topicId = options.topicId;
        	$.ajax({
        		url: this.url+'/'+topicId,
        		type: 'post',
        		headers: { token: window.token },
        		data: options,
        		dataType: 'json'
        	}).done(function(res){
        		me.trigger(E_SCORE_STATUS, res, null, options, otherOptions);
        	}).fail(function(){
        		me.trigger(E_SCORE_STATUS, arguments);
        	});
        }
    });

    K.list = Backbone.Collection.extend({
        model: K
    });

    return K;

});
define('root-base/kindeditor',[
	
], function() {

KindEditor.basePath = '/common/images/kindeditor/';

KindEditor.lang({
	txtPaste : '格式化文本'
});

KindEditor.plugin('txtPaste', function(K) {
	var self = this;
	var name = 'txtPaste';
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = '<div style="padding:10px 20px;">' +
				'<textarea class="ke-textarea" style="width:408px;height:260px;"></textarea>' +
				'</div>',
			dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var html = textarea.val();
						html = KindEditor.escape(html);
						html = html
							.replace(/ {2}/g, ' &nbsp;')
							.replace(/([^\x00-\xff])/g, ''); //过滤非单字节的字符，例如汉字，汉字符号，单字节字符包括英文字母，数字，英文符号
						if (self.newlineTag == 'p') {
							html = html.replace(/^/, '<p>').replace(/$/, '</p>').replace(/\n/g, '</p><p>');
						} else {
							html = html.replace(/\n/g, '<br />$&');
						}

						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			textarea = KindEditor('textarea', dialog.div);
		textarea[0].focus();
	});
});

KindEditor.options.minWidth = 300;
KindEditor.options.filterMode = true;
KindEditor.options.loadStyleMode = false;
KindEditor.options.wellFormatMode = false;
KindEditor.options.resizeType = 0;
KindEditor.options.allowImageUpload = false;
KindEditor.options.fullscreenShortcut = false;
KindEditor.options.pasteType = 0;

KindEditor.options.items = [
	'txtPaste'
];

KindEditor.options.htmlTags = {
	font : ['id', 'class', 'color', 'size', 'face', 'style'],
	span : ['id', 'class', 'style'],
	div : ['id', 'class', 'align', 'style'],
	table: ['id', 'class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor', 'style'],
	'td,th': ['id', 'class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style'],
	a : ['id', 'class', 'href', 'target', 'name'],
	embed : ['id', 'class', 'src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', 'align', 'allowscriptaccess', 'style'],
	img : ['id', 'class', 'src', 'width', 'height', 'border', 'alt', 'title', 'align', '_tedio', 'style'],
	'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : ['id', 'class', 'align', 'style'],
	'pre,hr,br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : ['id', 'class', 'style'],
	tedio : ['title', 'cid']
};

});

/**
 * 文章详情
 */

define('article',[
    './p-data',
	'text!../tpl/article.tpl',
    'root-common/util',
    'root-base/model/topicModel',
    'root-base/model/answerModel',
    'root-common/module/tip',
    'root-base/kindeditor',
    'root-common/module/scrollbar'
], function(
    pData,
	tpl,
    util,
    TopicModel,
    AnswerModel
) {

    var E_ANSWER_STATUS = 'answer.status'; //写作状态
    var E_SCORE = 'score'; //评分
    var E_SCORE_EXCEPTION = 'score.exception'; //评分异常

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me.isLoad = false; //模块是否被加载
            me._tpl = doT.template(tpl);
            me._topicId = null; //命题id
            me.editor = null; //编辑器
            me.editorDoc = null; //编辑器document
            me.startTime = +new Date;
            me.corrections = []; //错误列表
            me._totalTime = null; //耗时
            me._totalWords = 0; //总字数
            me._timer = null; //写作的时间计时器
            me._checkErrorTimer = null; //检查错误的计时器
            me._answerModel = new AnswerModel; //作文数据对象
            me._loadingTip = null; //提交评分/草稿的tip loading
            me._autoSaveTimer = null; //自动保存定时
            me.render();
            me._answerModel.bind({
                'change': $.proxy(me.renderAnswer, me),
                'error': $.proxy(me.renderAnswer, me),
                'score.status': $.proxy(me._showResult, me)
            });
        },
        events: {
        	'click .btn-draft': '_draft',
            'click .btn-submit': '_save'
        },
        /**
         * [渲染写作主体]
         */
        renderAnswer: function(){
            var me = this;
            var data = me._answerModel.toJSON();
            me.isLoad = true;
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    me.trigger(E_ANSWER_STATUS, parseInt(res.answerStatus), me._topicId);

                    me.startTime = +new Date - (res.costTime || 0) * 1000;
                    if(res.answerStatus == 2){
                        me.startTime = +new Date;
                    }
                    me._calculateTime();

                    me.initEditor(); 

                }
                
            }, data, arguments[1]);
        },
        render: function(){
            this.$el.html(this._tpl({}));
        },
        reset: function(){
            this.isLoad = false;
        },
        /**
         * [加载写作内容]
         */
        loadAnswer: function(topicId){
            var me = this;
            me._topicId = topicId;
            me._answerModel.fetch({
                // url: me._answerModel.url + '/' + me._topicId,
                type: 'get',
                cache: false,
                headers: { token: window.token }
            });
        },
        /**
         * [初始化编辑器]
         * @param {[String]} [content] [初始化文本]
         * @param {[Boolean]} [isInjection] [是否对当前文本进行注入]
         * @param {[Boolean]} [isUpdateContent] [是否更新文本]
         */
        initEditor: function(content, isInjection, isUpdateContent){
            var me = this;
            me.setMainHeight();
            if(isInjection){
                //不需要再初始化编辑器
                if(me.editor){
                    me._hightLightErrors(30);
                }
            }else if(isUpdateContent){
                //提交或暂存更新文本
                if(content && me.editor){
                    content = content.replace(/\&nbsp;/g, ' ');
                    me.editor.html(content);
                    me._hightLightErrors(30);
                }
            }else{
                var data = me._answerModel.toJSON();
                if(!$.isEmptyObject(data)){
                    content = data.data && data.data.answerContent || '';
                }
                content = content && content.replace(/\&nbsp;/g, ' ');

                var height = $('.main-text').height();
                var $editor = $('.main-editor', me.$el).html(content);

                //无刷新替换命题需要重启编辑器
                KindEditor.remove($editor);
                me.editor = KindEditor.create($editor, {
                    width: '100%',
                    height: height,
                    afterChange: function(e){
                        me._calculateWords();
                        me.autoSave();
                    }
                });
                
                me.editorDoc = me.editor.cmd.doc;
                //无刷新替换命题需要重置内容
                me.editor.html(content);
                
                KindEditor.ctrl(me.editorDoc.body, 'V', function() {
                        util.tip('请通过右上角格式化文本按钮进行粘贴操作', true);
                });

                //初始化字数
                me._calculateWords();

                me._addCss(me.editorDoc, window.staticsRoot + '/writing/student/css/editor.css?t='+(+new Date));

                if(!content){
                    me.editor.focus();
                }
            }

        },
        setCorrection: function(corrections){
            this.corrections = corrections;
        },
        /**
         * [全局替换文本，规避特殊字符如()等]
         * @param  {[String]}   str  [原始字符]
         * @param  {[String]}   sptr [替换的字符]
         * @param  {Function} fn   [替换规则]
         * @return {[type]}        [目标字符]
         */
        _replaceAll: function(str, sptr, fn){
            var times = 0;
            while (str.indexOf(sptr) >= 0){
                //防止死循环，一句句子中匹配到100次的概率及其低
                if(times > 100){
                    break;
                }
               str = str.replace(sptr, function(){
                return fn(arguments);
               });
               times++;
            }
            return str;
        },
        /**
         * [高亮错误文字]
         */
        _hightLightErrors: function(interval){
            var me = this;
            interval = interval || 3000;
            if(!me.editor || !me.corrections){
                return;
            }
            me._checkErrorTimer && clearTimeout(me._checkErrorTimer);
            me._checkErrorTimer = setTimeout(function(){
                var $body = $(me.editorDoc.body);
                var html = $body.html();
                var errors = me.corrections || [];
                html = html.replace(/\<span\s*class="text-error"[^\>]*\>(.*?)\<\/span\>/g, '$1');

                $.each(errors, function(i, v){

                    if(v.errors && $.type(v.errors) == 'array' && v.errors.length > 0){
                        html = me._replaceAll(html, v.sentence, function(){
                            var result = v.sentence;
                            var addedLength = 0;
                            var previousLength = result.length;
                            v.errors.sort(function(a, b){return a.index - b.index;});
                            v.errors = util.unique(v.errors, 'index');
                            
                            $.each(v.errors, function(key, val){
                                var preTag = '<span class="text-error" title="'+val.errorMsg+'">';
                                var afterTag = '</span>';
                                
                                var preIndex = val.errorContentPre.length + addedLength;

                                var afterIndex = val.errorContentPre.length + val.errorContent.length + addedLength + preTag.length;

                                result = util.insertStr(result, preTag, preIndex);
                                result = util.insertStr(result, afterTag, afterIndex);

                                addedLength = result.length - previousLength;
                            });
                            
                            return result;
                        });
                    }
                    

                });

                $body.html(html);
                $('.text-error', $body).tipsy({
                    doc: me.editorDoc,
                    gravity: $.fn.tipsy.autoNS
                });
                
            }, interval);
            
        },
        /**
         * [动态添加css文件]
         * @param {[type]} doc [document]
         * @param {[type]} src [链接地址]
         */
        _addCss: function(doc, src){
            var link = doc.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = src;
            doc.getElementsByTagName("head")[0].appendChild(link);
        },
        /**
         * [开始计时]
         */
        _calculateTime: function(){
            var me = this;
            me._timer && clearInterval(me._timer);
            me._timer = setInterval(function(){
                var diff = +new Date - me.startTime;
                me._setTime(diff);
                me._totalTime = diff;
            }, 1000);
        },
        /**
         * [设置已用的写作时间]
         * @param {[Int]} diff [毫秒]
         */
        _setTime: function(diff){
            var me = this;
            var time = util.formatTimeE(diff);
            $('.time-calculated', me.$el).text(time);
        },
        /**
         * [统计字数]
         */
        _calculateWords: function(){
            var me = this;
            var reg = /\s+/g;
            var paragraphReg = /\<(p|br)\s*\/*\>/g;
            if(!me.editor){
                return;
            }
            var html = me.editor.html();
            
            var result;
            html = html.replace(paragraphReg, ' ');
            html = $('<div>'+html+'</div>').text();
            html = $.trim(html);
            if(html){
                var total = 1;
                while(result = reg.exec(html)){
                    total++;
                }    
            }else{
                total = 0;
            }
            $('.words-calculated', me.$el).text(total);
            me._totalWords = total;
        },
        /**
         * [存为草稿]
         */
        _draft: function(e){
            e.preventDefault();
            this.draft();
        },
        /**
         * [提交评分]
         */
        _save: function(e){
            e.preventDefault();
            var me = this;
            if(me.editor){
                var content = me.editor.html();
                var totalWords = me._totalWords;
                if(!content){
                    util.errorTip('文章内容不能为空', true);
                }else{
                    if(totalWords < 40){
                        util.errorTip('字数过少', true);
                    }else if(totalWords > 4000){
                        util.errorTip('字数过多', true);
                    }else{
                        me._loadingTip = util.tip('正在提交评分，请稍后<i class="ajax-loader"></i>');
                        me._score(1);
                    }
                }
                
            }
            
        },
        /**
         * [评分/草稿]
         * @param {[Int]} [submitStatus] [评分状态]
         * @param {[Boolean]} [isAuto] [是否自动保存]
         */
        _score: function(submitStatus, isAuto){
            var me = this;
            $('.tipsy', $(me.editorDoc.body)).remove();
            var answerContent = me.editor.html();
            answerContent = answerContent
                .replace(/\<span\s*class="text-error"[^\>]*\>(.*?)\<\/span\>/g, '$1')
                .replace(/\<span\s*style="white-space:normal;"[^\>]*\>(.*?)\<\/span\>/g, '$1');
            this._answerModel.score({
                topicId: me._topicId,
                answerContent: answerContent,
                costTime: Math.floor(me._totalTime / 1000),
                answerWords: me._totalWords,
                submitStatus: submitStatus
            }, {
                isAuto: isAuto
            });
        },
        /**
         * [提交评分或暂存结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        _showResult: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._loadingTip && me._loadingTip.close();
                if(!isError){
                    if(options){
                        if(options.submitStatus == 1){
                            //评分
                            util.successTip('提交成功');
                            me.startTime = +new Date;
                            me._calculateTime();
                            me.trigger(E_SCORE);
                        }else{
                            if(!(otherOptions && otherOptions.isAuto)){
                                //草稿
                                util.successTip('保存草稿成功');
                            }
                           
                        }
                        //重置编辑器
                        if(options.answerContent){
                            me.initEditor(options.answerContent, false, true)
                        }
                    }
                }else{
                    if(options.submitStatus == 1){
                        //评分结果异常
                        me.trigger(E_SCORE_EXCEPTION, data);
                    }
                }
                
            }, data, xhr);
        },
        /**
         * [设置写作区域高度]
         */
        setMainHeight: function(){
            var me = this;
            var height = $('.ui-topic').outerHeight() + $('.icon-list').outerHeight();
            me.$el.show().css({
                top: height
            });

            //浏览器更新尺寸时更新编辑器
            if(me.editor){
                me.editor.edit.setHeight($('.main-text').height());
            }
            
        },
        /**
         * [获取topicId]
         */
        getTopicId: function(){
            return this._topicId;
        },
        /**
         * [每一分钟自动保存一次]
         */
        autoSave: function(){
            var me = this;
            me._autoSaveTimer && clearInterval(me._autoSaveTimer);
            me._autoSaveTimer = setInterval(function(){
               me.draft(true);
            }, 1000 * 60);
        },
        /**
         * [保存]
         * @param {[Boolean]} [isAuto] [是否自动保存]
         */
        draft: function(isAuto){
            var me = this;
            if(me.editor){
                var content = me.editor.html();
                if(!content){
                    if(!isAuto){
                        util.errorTip('文章内容不能为空', true);    
                    }
                    return;
                }
                if(!isAuto){
                    me._loadingTip = util.tip('正在保存为草稿，请稍后<i class="ajax-loader"></i>');    
                }
                me._score(0, isAuto);
            }
            
        }

    });

    return K;

});


define('text!../tpl/exception.tpl',[],function () { return '<div class="inner">\r\n    <div class="hd"></div>\r\n    <div class="txt">\r\n        <div class="quote-start"></div>\r\n        <div>\r\n        \t{{~it.list :val:key}}\r\n        \t<p>\r\n        \t\t<span class="title"><i>文</i>本：</span>{{=val.content}}<br />\r\n        \t\t<span class="title">异常信息：</span>{{=val.message}}\r\n        \t</p>\r\n        \t{{~}}\r\n        </div>\r\n        <div class="quote-end"></div>\r\n    </div>\r\n    <a href="javascript:;" class="btn-back-writing">\r\n        <i></i>\r\n    </a>\r\n</div>';});

/**
 * 文章详情
 */

define('exception',[
	'text!../tpl/exception.tpl'
], function(
	tpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
        },
        events: {
        	'click .btn-back-writing': 'clear'
        },
        render: function(data){
            var me = this;
            try{
                var list = data.data;
                var msg = data.resMsg;
                me.$el.html(me._tpl({
                    msg: msg,
                    list: list || []
                }));
            }catch(e){}
            
        },
        clear: function(){
            this.$el.html('');
        }

    });

    return K;

});

/**
 * 获取写作建议列表
 */

define('root-base/model/historyModel',[
    './ajax'
], function(ajax) {

    var E_FIND_ARTICLELIST = 'find.articleList';
    var E_FIND_TOPIC = 'find.topic';
    var E_FIND_ARTICLE = 'find.article';
    var E_FIND_ARTICLE_TOEDIT = 'find.article.to.edit';
    var E_FIND_ERRORS = 'find.errors';

    var K = Backbone.Model.extend({
        initialize: function(){
        	this.url = window.serviceBase + '/history';
        },
        /**
         * [获取当前用户某命题下的历史命题列表]
         * @param  {[Obejct]} options [请求参数]
         */
        findAricleList: function(options){
            options = $.extend(true, {}, options);
            ajax.request.call(this, options, E_FIND_ARTICLELIST);
        },
        /**
         * [获取某个命题]
         * @param  {[Obejct]} options [请求参数]
         */
        findTopic: function(options){
            options = $.extend(true, {}, options);
            ajax.request.call(this, options, E_FIND_TOPIC);
        },
        /**
         * [获取某个文章]
         * @param  {[Obejct]} options [请求参数]
         */
        findArticle: function(options){
            options = $.extend(true, {}, options);
            ajax.request.call(this, options, E_FIND_ARTICLE);
        },
        /**
         * [获取某个文章，用于进入编辑]
         * @param  {[Obejct]} options [请求参数]
         */
        findArticleToEdit: function(options){
            options = $.extend(true, {}, options);
            ajax.request.call(this, options, E_FIND_ARTICLE_TOEDIT);
        },
        /**
         * [获取某个文章的错误信息]
         * @param  {[Obejct]} options [请求参数]
         */
        findErrors: function(options){
            options = $.extend(true, {}, options);
            ajax.request.call(this, options, E_FIND_ERRORS);
        }
    });

    K.list = Backbone.Collection.extend({
        model: K,
        initialize: function(){}
    });

    return K;

});

define('text!nav/../../tpl/history/main.tpl',[],function () { return '<div class="ui-history">\r\n\t<div class="search">\r\n\t\t<input class="search-text" type="text" placeholder="请输入你想查找的关键词">\r\n\t\t<img class="search-icon" src="../../writing/images/zoom.png" height="24" width="24" />\r\n\t</div>\r\n\t<div class="list default-skin">\r\n\t\t<ul class="list-box">\r\n\t\t\t\r\n\t\t</ul>\r\n\t\t<div class="topic-pagi"></div>\r\n\t</div>\r\n</div>\r\n<div class="history-article"></div>';});


define('text!nav/../../tpl/history/mainList.tpl',[],function () { return '{{~it.data.recordList :v:i}}\r\n<li class="list-li" data-id="{{=v.id}}">\r\n\t<a href="#history/{{=v.id}}">{{=(i+1+it.num*(it.data.pageNum-1))}}.{{=v.topicName}}</a>\r\n</li>\r\n{{~}}\r\n';});


define('text!nav/../../tpl/history/article.tpl',[],function () { return '<div class="content default-skin">\r\n\t<div class="back">\r\n\t\t<a href="#history">\r\n\t\t\t<i class="icon-linear">&#xe802;</i>\r\n\t\t\t<span>作文列表</span>\r\n\t\t</a>\r\n\t\t\r\n\t</div>\r\n\t<div class="topic-detail title">\r\n\t\t\r\n\t</div>\r\n\t<p class="sanjiao"></p>\r\n\t<div class="article-area" data-topicid="{{=it.id}}">\r\n\t\t\r\n\t</div>\r\n\r\n\t<div class="article-content">\r\n\r\n\t</div>\r\n\t\r\n</div>\t';});


define('text!nav/../../tpl/history/topicDetail.tpl',[],function () { return '<p>/ 命题 /</p>\r\n<p class="inproduce">{{=it.topicName}}</p>\r\n<p>/ 命题要求 /</p>\r\n<p class="inproduce-demand">{{=it.topicDesc}}</p>\r\n<p class="other">（{{=it.minWord}}—{{=it.maxWord}}字，满分：{{=it.score}}分）</p>';});


define('text!nav/../../tpl/history/articleList.tpl',[],function () { return '<ul class="article-list">\r\n\t{{~it.list :val:key}}\r\n\t<li data-id="{{=val.id}}">\r\n\t\t<p>\r\n\t\t\t<span>修改保存于 {{=it.format(\'YYYY-MM-DD hh:mm:ss\', val.upTime)}} </span>\r\n\t\t\t<span class="action-groups">\r\n\t\t\t\t<a href="#history/{{=it.topicId}}/{{=val.id}}" class="icon-linear btn-preview" title="预览">&#xe801;</a>\r\n\t\t\t\t<a href="javascript:;" class="icon-linear btn-edit" title="编辑">&#xe60c;</a>\r\n\t\t\t</span>\r\n\t\t</p>\r\n\t</li>\r\n\t{{~}}\r\n</ul>\t';});


define('text!nav/../../tpl/history/articleDetail.tpl',[],function () { return '<div class="detail-inner">\r\n\t\t<p class="time"> \r\n\t\t<span>修改保存于 {{=it.format(\'YYYY-MM-DD hh:mm:ss\', it.res.upTime)}}  <i class="score-area">得分：<i class="score-num"></i>分</i>  </span>\r\n\t\t<a class="go-topic" href="#history/{{=it.topicId}}">\r\n\t\t\t<i class="icon-linear">&#xe800;</i>\r\n\t\t</a>\r\n\t</p>\r\n\t<div class="article-main">\r\n\t\t<h2>{{=it.topic.topicName}}</h2>\r\n\t\t<div class="main">\r\n\t\t\t{{=it.res.answerContent}}\r\n\t\t</div>\r\n\t</div>\r\n</div>';});

/**
 * 展示文章错误信息
 */

define('errors',[
    'root-common/util',
    'root-common/module/tip'
], function(
    util
) {

	var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            
            try{
                var errors = config.res.sentenceList;
                var node = $('.main', me.$el);
                var html = node.html();
                html = html.replace(/\<span\s*class="text-error"[^\>]*\>(.*?)\<\/span\>/g, '$1');

                $.each(errors, function(i, v){

                    if(v.errors && $.type(v.errors) == 'array' && v.errors.length > 0){
                        html = me._replaceAll(html, v.sentence, function(){
                            var result = v.sentence;
                            var addedLength = 0;
                            var previousLength = result.length;
                            v.errors.sort(function(a, b){return a.index - b.index;});
                            v.errors = util.unique(v.errors, 'index');
                            
                            $.each(v.errors, function(key, val){
                                var preTag = '<span class="text-error" title="'+val.errorMsg+'">';
                                var afterTag = '</span>';
                                
                                var preIndex = val.errorContentPre.length + addedLength;

                                var afterIndex = val.errorContentPre.length + val.errorContent.length + addedLength + preTag.length;

                                result = util.insertStr(result, preTag, preIndex);
                                result = util.insertStr(result, afterTag, afterIndex);

                                addedLength = result.length - previousLength;
                            });
                            
                            return result;
                        });
                    }
                    

                });

                node.html(html);
                $('.text-error', node).tipsy({
                    gravity: $.fn.tipsy.autoNS
                });
            }catch(e){

            }
            
            
        },
        /**
         * [全局替换文本，规避特殊字符如()等]
         * @param  {[String]}   str  [原始字符]
         * @param  {[String]}   sptr [替换的字符]
         * @param  {Function} fn   [替换规则]
         * @return {[type]}        [目标字符]
         */
        _replaceAll: function(str, sptr, fn){
            var times = 0;
            while (str.indexOf(sptr) >= 0){
                //防止死循环，一句句子中匹配到100次的概率及其低
                if(times > 100){
                    break;
                }
               str = str.replace(sptr, function(){
                return fn(arguments);
               });
               times++;
            }
            return str;
        }
    });

    return K;

});


define('nav/history',[
    'root-base/model/historyModel',
    'root-common/util',
    'text!../../tpl/history/main.tpl',
    'text!../../tpl/history/mainList.tpl',
	'text!../../tpl/history/article.tpl',
    'text!../../tpl/history/topicDetail.tpl',
    'text!../../tpl/history/articleList.tpl',
    'text!../../tpl/history/articleDetail.tpl',
    'root-base/model/answerModel',
    'root-common/module/pagination',
    '../errors',
    'root-common/module/scrollbar'
], function(
    HistoryModel,
    util,
	mainTpl,
    mainListTpl,
    articleTpl,
    topicDetailTpl,
    articleListTpl,
    articleDetailTpl,
    AnswerModel,
    Pagi,
    ArticleErrors
) {
    
    var E_EDIT = 'edit';

	var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me._mainTpl = doT.template(mainTpl);
            me._mainListTpl= doT.template(mainListTpl);
            me._articleTpl = doT.template(articleTpl);
            me._topicDetailTpl = doT.template(topicDetailTpl);
            me._articleListTpl = doT.template(articleListTpl);
            me._articleDetailTpl = doT.template(articleDetailTpl);
            me.$btn = $(config.btn);
            me._HistoryModel = new HistoryModel; //文章历史数据对象
            me._pageNum = 20; //分页条数
            me._topic = null; //当前活跃topic对象
            me._answerModel = new AnswerModel; //作文数据对象
            me.reset();
            me._HistoryModel.bind({
                'sync': $.proxy(me.renderHistory, me),
                'find.articleList': $.proxy(me.renderArticleList, me),
                'find.topic': $.proxy(me.renderTopic, me),
                'find.article': $.proxy(me.renderArticle, me),
                'find.article.to.edit': $.proxy(me._draftToEdit, me),
                'find.errors': $.proxy(me._showErrors, me)
            });
            me._answerModel.bind({
                'score.status': $.proxy(me.edit, me)
            });
        },
        events: {
            'click .search-icon':'_search',
            'keydown .search-text':'_keySearch',
            'click .btn-edit': '_edit'
        },
       
        /**
         * [渲染左侧模块]
         */
        render: function(){
        	var me = this;
        	this.$el.html(me._mainTpl({})).show();
            
        },
        init:function(){
            var me = this;
            me.reset();
            me.render();
            me.resetUI();
            
            me.search();
        },
        reset: function(){
            var me = this;
            me._page = null; //分页
            me._isArticle = false; //当前是否为文章详情
        },
         /**
         * [请求历史数据并渲染]
         */
        renderHistory:function(data, xhr, params){
            var me = this;
            var data = me._HistoryModel.toJSON() || {};
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    var keyword = params && params.data && params.data.keyword;

                    $('.list-box', me.$el).html(me._mainListTpl({
                        data: res,
                        num: me._pageNum
                    }));
                    //创建分页
                    if(!me._page){
                        me._page = new Pagi({
                            el: $('.topic-pagi', me.$el),
                            total: res.pageSum
                        });
                        me._page.bind('toggle', function(index){
                            me.search({pageIndex: index});
                        });
                        
                    }
                    // 搜索后重置分页
                    if(keyword !== undefined){
                        me._page.current(1);
                        me._page.total(res.pageSum);
                        me._page.render();
                    }
                    me._initScrollbar();
                }
            }, data, arguments[1]);
        },
        /**
         * [请求历史详情数据并渲染]
         */
        renderArticleList:function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    $('.article-content', me.$el).html('');
                    $('.article-area', me.$el).html(me._articleListTpl({
                        list: res.recordList,
                        format: util.formatDate,
                        topicId: $('.article-area', me.$el).data('topicid')
                    }));
                    $('.history-article .content', me.$el).customScrollbar('resize');
                   
                }
            }, data, arguments[1]);
        },
        /**
         * [展示某篇历史文章]
         */
        renderArticle:function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    var topicId = $('.article-area', me.$el).data('topicid');
                    $('.article-area', me.$el).html('');
                    $('.article-content', me.$el).html(me._articleDetailTpl({
                        res: res,
                        format: util.formatDate,
                        topic: me._topic || {},
                        topicId: topicId
                    }));
                    $('.history-article .content', me.$el).customScrollbar('resize');
                    me._HistoryModel.findErrors({
                        url: window.serviceBase + '/history/correction/' + res.id
                    });
                }
            }, data, arguments[1]);
        },
        /**
         * [展现命题详情]
         */
        renderTopic:function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    me._topic = res;
                    $('.ui-history', me.$el).hide();
                    $('.history-article', me.$el).show();
                    $('.topic-detail', me.$el).html(me._topicDetailTpl(res));
                    $('.history-article .content', me.$el).customScrollbar('resize');

                    //文章详情页正文需要用到命题数据
                    if(me._isArticle){
                        $('.article-main h2', me.$el).html(res.topicName);
                    }
                }
            }, data, arguments[1]);
        },
        /**
         * [查询用户历史命题列表]
         * @param {[Int]} [pageIndex] [第几页]
         */
        _search:function(e){
            e.preventDefault();
            var keyword = $.trim($('.search-text', this.$el).val());
            this.search({keyword: keyword});
         },
         search: function(options){
            var me = this;
            options = options || {};
            var pageIndex = options.pageIndex || 0;
            var keyword = options.keyword;
            var params = {
                keyword: keyword,
                pageNum: pageIndex,
                pageSize: me._pageNum
            };
            if(keyword === undefined){
                delete params.keyword;
            }
            me._HistoryModel.fetch({
                data: params,
                cache: false,
                headers: { token: window.token },    
            });
         },

        /**
         * [按键确定，查询用户历史命题列表]
         */
        _keySearch:function(e){
            var me = this;
            var keynum;
            if(window.event) // IE
               {
                keynum = e.keyCode
               }
            else if(e.which) // Netscape/Firefox/Opera
               {
               keynum = e.which
               }
             
            if(keynum == 13|| e.keycode == 108){
                me._search();
            }
        },
        /**
         * [查询用户历史命题列表]
         * @param {[Int]} [id] [命题id]
         */
        initTopic:function(id){
            var me = this;
            $('.history-article', me.$el).html(me._articleTpl({
                id: id
            }));
            me._HistoryModel.findAricleList({
                url: window.serviceBase + '/history/'+id
            });
            me._HistoryModel.findTopic({
                url: window.serviceBase + '/topic/'+id
            });
            setTimeout(function(){
                $('.history-article .content', me.$el).customScrollbar({
                    updateOnWindowResize: true,
                    hScroll: false
                });
            }, 100);
            
        },
        /**
         * [具体历史文章]
         * @param {[Int]} [topicId] [命题id]
         * @param {[Int]} [articleId] [文章id]
         */
        initArticle:function(topicId, articleId){
            var me = this;
            me._isArticle = true;
            $('.history-article', me.$el).html(me._articleTpl({
                id: topicId
            }));
            me._HistoryModel.findTopic({
                url: window.serviceBase + '/topic/'+topicId
            });
            me._HistoryModel.findArticle({
                url: window.serviceBase + '/history/'+topicId+'/'+articleId
            });
            setTimeout(function(){
                $('.history-article .content', me.$el).customScrollbar({
                    updateOnWindowResize: true,
                    hScroll: false
                });
            }, 100);
        },
        /**
         * [初始化用户历史命题列表]
         */
        resetUI:function(){
            $('.ui-history', this.$el).show();
            $('.history-article', this.$el).hide(); 
        },
        /**
         * [更新列表滚动条]
         */
        _initScrollbar: function(){
            var me = this;
            $('.ui-history > .list', me.$el).customScrollbar({
                updateOnWindowResize: true,
                hScroll: false
            }); 
        },
        /**
         * [编辑文章]
         * @param  {[Event]} e [事件]
         */
        _edit: function(e){
            e.preventDefault();
            var me = this;
            var $target = $(e.target).closest('li');
            var $area = $('.article-area', me.$el);
            var topicId = $area.data('topicid');
            var articleId = $target.data('id');
            me._HistoryModel.findArticleToEdit({
                url: window.serviceBase + '/history/'+topicId+'/'+articleId
            });
        },
        /**
         * [展现命题详情]
         */
        _draftToEdit: function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    var topicId = $('.article-area', me.$el).data('topicid');
                    me._answerModel.score({
                        topicId: topicId,
                        answerContent: res.answerContent,
                        costTime: 0,
                        answerWords: res.answerWords,
                        submitStatus: 0
                    });
                }
            }, data, arguments[1]);
        },
        /**
         * [通知外部页面进入历史记录命题UI]
         */
        edit: function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var topicId = $('.article-area', me.$el).data('topicid');
                    var res = data.data;
                    me.trigger(E_EDIT, topicId);
                }
            }, data, arguments[1]);
        },
        /**
         * [显示文章的错误词汇]
         */
        _showErrors: function(data, xhr){
            var me = this;
            
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    var el = $('.article-main', me.$el);
                    if(!res.overall){
                        $('.score-area', me.$el).hide();
                    }
                    $('.article-content .score-num', me.$el).text(res.overall);
                    new ArticleErrors({
                        res: res,
                        el: el
                    })
                }
            }, data, arguments[1]);
        }
    });

    return K;

});

/**
 * 开发、测试、生产环境自适应静态文件域
 * @param {[String]} [env] [当前环境]
 * staticsRoot,serviceBase 不可被覆盖！！
 */

define('root-base/auto-domain',[
	
], function() {

	var env = 'online';
	var hostname = location.hostname;
	var host = location.host;
	var localIp = '127.0.0.1';
	var testIp = '192.168.12.240';
	var testServicePort = '8086';
	var preUrl = 'http://';
	var debugReg = /localhost|debug.|127.0/;
	
	//开发环境
	if(debugReg.test(hostname)){
		env = 'dev';
	}
	if(hostname === testIp){
		env = 'test';
	}
	
	if(hostname === 'www.lyced.com'){
		env = 'lyced';
	}

	if(hostname === '139.196.194.97'){
		evn = 'aliyun'; //todo 测试
	}

	try {
		if(env == 'dev'){
			// 开发环境
			//静态文件地址
			window.staticsRoot = preUrl + host + '/dist';
		    //服务端接口地址
		    window.serviceBase = preUrl + testIp + ':' + testServicePort + '/quickWriting';
		}else if(env == 'test'){
			//测试环境
			window.staticsRoot = preUrl + host + '/ui';
		    window.serviceBase = preUrl + hostname + ':' + testServicePort + '/quickWriting';
		}else if(env == 'lyced'){
			//lyced
			window.staticsRoot = preUrl + hostname + '/ui';
			window.serviceBase = preUrl + hostname + '/quickWriting';
		}else if(env == 'aliyun'){
			//aliyun
			window.staticsRoot = preUrl + 'www.lyced.com' + '/ui';
			window.serviceBase = preUrl + hostname + '/quickWriting';
		}else{
			//正式环境
			window.staticsRoot = preUrl + hostname + '/ui';
			window.serviceBase = preUrl + hostname + '/quickWriting';

		}
		
	} catch (ex) {
		alert("自适应域名脚本执行错误!\n");
	}

});

require.config(window.requireConfig);

require([
	'root-base/router',
	'root-common/util',
	'./container',
	'./p-data',
	'./nav/score',
    './topic/detail',
    './article',
    './exception',
    './nav/history',
    'root-base/model/correctionModel',
    'root-base/auto-domain'
], function(
	Router,
	util,
	Container,
	pData,
	Score,
    TopicDetail,
    Article,
    ExceptionUI,
    HistoryMain,
    CorrectionModel
) {

	//路由
	var router = new Router;

	//当前的文章状态
	var curAnswerStatus = 0;

    //当前页面id
    var curPageId = '';

	//外部容器	
    window.container = new Container({
        el: '.p-writing'
    });

	$.extend($.ajaxSettings, {
		timeout: 30000
	});

    //IE通过域访问数据源
    $.support.cors = true;

	//低版本浏览器提示升级
	if($.browser.msie && ($.browser.version == 6.0 || $.browser.version == 7.0)){
		alert('请升级您的浏览器，由于版本太低可能无法正常显示！');
	}

    //获取token
    window.token = util.queryString('token') || 111111;

    if(!token){
        util.errorTip('token未获取，页面数据显示异常!');
    }

	//事件绑定
	router.bind({
		'gotoHome': function(){
            gotoHome();
		},
		'gotoHistory': function(){
            curPageId = 'History';
            resetPage();
            initComposition();
			historyMain.init();
		},
        'gotoTopicHistory': function(id){
            curPageId = 'History';
            resetPage();
            initComposition();
            historyMain.init();
            //加载命题
            historyMain.initTopic(id);
        },
        'gotoArticleDetail': function(topicId, articleId){
            curPageId = 'History';
            resetPage();
            initComposition();
            historyMain.init();
            //加载文章
            historyMain.initArticle(topicId, articleId);
        }
	});

    function gotoHome(){
        window.location.href = '#';
        curPageId = 'Score';
        resetPage();
        initComposition();
    }

    /**
     * [router无刷新后初始化页面]
     */
    function resetPage(){
        showPanel(curPageId);
        try{
            exceptionUI.clear();
        }catch(e){}
    }

    /**
     * [隐藏面板，显示当前面板，当前为评分面板并且不为草稿]
     */
    function showPanel(id, isShow){
        if(id == 'Score' && !curAnswerStatus && !isShow){
            container.hidePanel();
            container.hidePanelIcon();
        }else{
            container.showPanel();
        }
        $('.left-panel .panel-item').hide();
        $('#'+id).show();
        $('.ui-navs .active').removeClass('active');
        $('#'+id+'Btn').parent().addClass('active');
    }

    var topicDetail = new TopicDetail({
        el: '#TopicDetail'
    });

    var article = new Article({
        el: '#Article'
    });

    var score = new Score({
        el: '#Score'
    });

    var historyMain = new HistoryMain({
        el: '#History',
        btn: '#HistoryBtn'
    });

    var exceptionUI = new ExceptionUI({
        el: '#Exception'
    });

    var correctionModel = new CorrectionModel;

    topicDetail.bind({
        'get.topicId': function(topicId){
            article.loadAnswer(topicId);
        },
        'get.totalScore': function(num){
            score.setTotalScore(num);
        },
        'init.topic': function(topic){
            try{
                score.setTopicId(topic.topicId);
                container.hidePanelIcon();
                container.hidePanel();
            }catch(e){}
          
        }
    });

    article.bind({
        'answer.status': function(status, topicId){
            switch(status){
                case 0: //初始化
                case 1: //草稿
                    score.setTopicId(topicId);
                    if(curPageId == 'Score'){
                        container.hidePanelIcon();    
                    }
                    
                    curAnswerStatus = 0;
                    break;
                case 2: //已评分
                case 3: //已评分草稿
                
                    container.showPanel();
                    curAnswerStatus = 1;
                    score.loadScore(topicId);
                    getCorrection(topicId);    
                    
                    break;
            }
            
        },
        'score': function(){
            var topicId = this.getTopicId();

            curAnswerStatus = 1;
            gotoHome();
            
            score.loadScore();
            getCorrection(topicId);

            exceptionUI.clear();
        },
        'score.exception': function(data){
            exceptionUI.render(data);
        }
    });

    historyMain.bind({
        'edit': function(topicId){
            topicDetail.reset();
            score.reset();
            gotoHome();
        }
    });

    correctionModel.bind({
        'change': function(){
            var me = this;
            var data = this.toJSON();
            util.dealAjax(function(isError){
                if(!isError){
                    var res = data.data;
                    article.setCorrection(res.sentenceList);
                    article.initEditor(null, true);   
                    score.renderCorrection(res.sentenceList);   
                    var hasError = false;
                    $.each(res.sentenceList || [], function(i, v){
                        if(v.errors && v.errors.length > 0){
                            hasError = true;
                            return false;
                        }
                    });
                    if(!hasError){
                        score.loadSuggestion();
                    }else{
                        score.hideSuggestion();
                    }
                    
                }
                
            }, data, arguments[1]);
        }
    });

    container.bind({
        'show': function(){
            topicDetail.updateScollbar();
            article.setMainHeight();
            score.clientHeight();
        },
        'hide': function(){
            topicDetail.updateScollbar();
            article.setMainHeight();
            score.clientHeight();
        }
    });
    
    /**
     * [初始化写作页面]
     */
    function initComposition(){
        //当前如果已经加载了topic，说明已经加载了文章，无刷新时则不需要再重新加载这些数据
        if(!topicDetail.isLoad){
            topicDetail.init();
        }
        //需一开始就加载评分
        if(!score.isLoad){
            score.init();      
        }
        
    }

    /**
     * [拿到topicId，获取文章错误列表]
     * @param  {[Int]} topicId [命题id]
     */
    function getCorrection(topicId){
        correctionModel.fetch({
            url: correctionModel.url + '/' + topicId,
            cache: false,
            headers: { token: window.token }
        });
    }

    $(window).resize(function(){
        //更新自定义滚动条
        $('.ui-topic .demand .desc, .main-text').customScrollbar('resize');

        //写作主体区域高度更新
        article.setMainHeight();
        //写作主体区域高度更新
        score.clientHeight();
    });

    $(window).bind('beforeunload',function(){
        return '当前处于写作状态';
    });

	//开启路由
	Backbone.history.start();
});

define("main", function(){});

