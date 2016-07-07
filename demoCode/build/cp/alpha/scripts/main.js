define('router',[],function() {

    var E_GOTO_SIGN = 'gotoSign';
    var E_GOTO_PHONE = 'gotoPhone';
    var E_GOTO_PRODUCT = 'gotoProduct';
    var E_GOTO_READING = 'gotoReading';
    var E_GOTO_BOOKLIST = 'gotoBookList';
    var E_GOTO_READOVER = 'gotoReadOver';
    var E_GOTO_INFORMATION = 'gotoInformation';
    var E_GOTO_PASSWORD = 'gotoPassword';
    var E_GOTO_FINDPW = 'gotoFindpw';
    var E_GOTO_PRIVACY = 'gotoPrivacy';
    var E_GOTO_TERM = 'gotoTerm';
    var E_GOTO_SIGNUP = 'gotoSignUp';
    var E_GOTO_PHONEFIND = 'gotoPhoneFind';
    var E_GOTO_BOOKNAV = 'gotoBookNav';
    var E_GOTO_TESTRESULT = 'gotoTestResult';
    var E_GOTO_EXERCISE = 'gotoExercise';
    var E_GOTO_GRADE = 'gotoGrade';

    var K = Backbone.Router.extend({
        routes: {
            '': 'gotoSign',
            'phone': 'gotoPhone',
            'product': 'gotoProduct',
            'reading/:id': 'gotoReading',
            'booklist': 'gotoBookList',
            'readover/:id': 'gotoReadOver',
    	    'information': 'gotoInformation',
    	    'findpw': 'gotoFindpw',
            'privacy': 'gotoPrivacy',
            'term': 'gotoTerm',
            'signup': 'gotoSignUp',
            'phonefind':'gotoPhoneFind',
            'bookNav/:id':'gotoBookNav',
            'testResult/:id/:id':'gotoTestResult',
	     // 'exercise/:id':'gotoExercise',
            'exercise/:id/:id':'gotoExercise',
            'grade':'gotoGrade'
        },
        initialize: function(){},
        /**
         * [登陆]
         */
        gotoSign: function(){
            this.trigger(E_GOTO_SIGN);
        },
        /**
         * [手机验证]
         */
        gotoPhone: function(){
            this.trigger(E_GOTO_PHONE);
        },
        /**
         * [产品选择页]
         */
        gotoProduct: function(){
            this.trigger(E_GOTO_PRODUCT);
        },
        /**
         * [阅读详情]
         */
        gotoReading: function(id){
            this.trigger(E_GOTO_READING, id);
        },
        /**
         * [读物列表]
         */
        gotoBookList: function(){
            this.trigger(E_GOTO_BOOKLIST);
        },
        /**
         * [阅读完毕]
         */
        gotoReadOver: function(id){
            this.trigger(E_GOTO_READOVER, id);
        },
        /**
         * [修改资料]
         */
        gotoInformation: function(){
            this.trigger(E_GOTO_INFORMATION);
        },
	   /**
         * [找回密码]
         */
        gotoFindpw: function(){
            this.trigger(E_GOTO_FINDPW);
        },
        /**
         * [隐私政策]
         */
        gotoPrivacy: function(){
            this.trigger(E_GOTO_PRIVACY);
        },
        /**
         * [用户协议]
         */
        gotoTerm: function(){
            this.trigger(E_GOTO_TERM);
        },
        /**
         * [注册]
         */
        gotoSignUp: function(){
            this.trigger(E_GOTO_SIGNUP);
        },
        /**
         * [找回密码]
         */
        gotoPhoneFind:function(){
            this.trigger(E_GOTO_PHONEFIND)
        },
        /**
         * [阅读导航]
         */
        gotoBookNav:function(id){
            this.trigger(E_GOTO_BOOKNAV,id)
        },
        /**
         * [测试结果]
         */
        gotoTestResult:function(bookid, index){
            this.trigger(E_GOTO_TESTRESULT,bookid, index)
        },
        /**
         * [答题页]
         */
        gotoExercise:function(bookid, index){
            this.trigger(E_GOTO_EXERCISE, bookid, index);
        },
        /**
         * [年级选择页]
         */
        gotoGrade:function(){
            this.trigger(E_GOTO_GRADE);
        },
    });

    return K;

});
/**
 * 动态模块管理
 */

define('module-manager',[],function() {

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

define('text!root-tpl/main.tpl',[],function () { return '<div class="ui-signin default-skin">\n\t<div class="ui-image">\n\t\t<div class="ui-bg"></div>\n\t\t<ul class="fix change">\n\t\t\t<li class="img-btn img-choice"></li>\n\t\t\t<li class="img-btn"></li>\n\t\t</ul>\n\t\t<form class="form signin-forms" action="">\n\t\t\t<div class="form-control fix">\n\t\t        <div class="clearfix bshadow0 pbs">\n\t\t\t\t\t<span class="icon-user icon-solid icon">\n\t                \t&#xe90d;\n\t                </span>\n\t            </div>\n\t\t        <input type="text" class="form-input" name="loginName" placeholder="请输入账号" />\n\t\t        <!-- <div class="form-error"></div> -->\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t        <div class="clearfix bshadow0 pbs">\n\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t            \t\t&#xe90b;\n\t                </span>\n\t            </div>\n\t\t        <input type="password" class="form-input input-pw" name="pw" placeholder="请输入密码" />\n\t\t        <!-- <div class="form-error"></div> -->\n\t\t    </div>\n\t\t    <div class="form-control fix"> \n\t\t       \t<a href="#findpw">忘记密码?</a>\n\t\t    </div>\n\t\t    <div class="form-control fix"> \n\t\t       <input class="btn btn-confirm" type="submit" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" />\n\t\t    </div>\n\t\t    <div class="form-control term fix"> \n\t\t       点击“登录”，即表示您同意并愿意遵守朗鹰 <a href="#term" target="_blank">用户协议</a> 和 <a href="#privacy" target="_blank">隐私政策</a>。\n\t\t    </div>\n\t\t    <div class="form-control gosign">\n\t\t    \t<a href="#signup">立即注册</a>\n\t\t    </div>\n\t\t</form>\n\t</div>\n</div>';});


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

define('model',[
    'root-common/util',
    'root-common/module/cookie'
], function(
    util,
    cookie
) {
    var E_GET_USERINFO = 'getUserInfo';
    var E_GET_TOPICINFOLIST = 'getTopicInfoList';
    var E_GET_BOOKINFOLIST = 'getBookInfoList';
    var E_GET_MYBOOK = 'getMyBook';
    var E_GET_ARTICLEINFO = 'getArticleInfo';
    var E_GO_WRITING = 'goWriting';
    var E_FINISH_READING = 'finishReading';
    var E_GET_COMMENTLIST = 'getCommentList';
    var E_COMMIT_COMMENT = 'commitComment';
    var E_START_READING = 'startReading';
    var E_FINISH_READING = 'finishReading';
    var E_CHANGE_PW_BY_KEY = 'changePwByKey';
    var E_PURCHASE = 'purchase';
    var E_MODIFYUSERINFO = 'modifyUserInfo';
    var E_CHANGEPSWBYOLDPSW = 'changePswByOldPsw';
    var E_REGISTER = 'register';
    var E_EXERCISESSTATUS = 'exercisesStatus';
    var E_GET_EXERCISES = 'getExercises';
    var E_SAVE_EXERCISE = 'saveExercise';
    // var E_GET_BOOKEXERCISES = 'getBookExercises';
    var E_GIT_FINISHEXERCISES = 'getFinishExercises';
    var E_REDOBOOKEXERCISES = 'redoBookExercises';
    var E_TRADE_GOLD = 'tradeGold';
    var E_TRADE_RECHARGE = 'tradeRecharge';
    var E_UPDATE_BOOKSTATUS = 'updateBookStatus';
    var E_QUERYALLGRADE = 'queryAllGrade';
    var E_SETGRADE = 'setGrade';
    
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
                token: cookie('hzw_reading_token')
            },
            data: options.data,
            dataType: 'json',
            // cache: false,
            success: function(res){
                if(res.status == 401){
                    util.tip(res.resDesc,3000);
                    goIndex();
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
        $.ajax(params);
    }

    function goIndex(res){
        cookie('hzw_reading_token', '', {expires: -1});
        window.location.href = '#';
        
    }

    var K = Backbone.Model.extend({
        initialize: function(){
            
        },
        /**
         * [登录]
         * @param  {[Object]} options [请求参数]
         */
        getUserInfo: function(options, otherParams){
            var me = this;
            var authorization;
            var headers = {};
            if(options.token){
                headers.token = options.token;
            }else{
                authorization = 'Basic '+(new util.Base64).encode(otherParams.username+':'+otherParams.pw);
                headers.authorization = authorization;
            }
            options.url = window.serviceBase + '/user/userInfo';
            options.headers = headers;
            options.data = {};

            request.call(this, options, otherParams, E_GET_USERINFO, function(res){
                K.data.userInfo = res.data;
            })
           
        },
        /**
         * [查询全部文章主题]
         * @param  {[Object]} options [请求参数]
         */
        getTopicInfoList: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/resource/getTopicInfoList';
            request.call(this, options, otherParams, E_GET_TOPICINFOLIST)
        },
        /**
         * [查询图书列表带分页]
         * @param  {[Object]} options [请求参数]
         */
        getBookInfoList: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/resource/getBookInfoListByParams';
            request.call(this, options, otherParams, E_GET_BOOKINFOLIST)
        },
        /**
         * [查询我的图书列表带分页]
         * @param  {[Object]} options [请求参数]
         */
        getMyBook: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/resource/getMyBookInfoListByParams';
            request.call(this, options, otherParams, E_GET_MYBOOK)
        },
        /**
         * [查询我的图书列表带分页]
         * @param  {[Object]} options [请求参数]
         */
        getArticleInfo: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/readingContent/getArticleInfo';
            request.call(this, options, otherParams, E_GET_ARTICLEINFO)
        },
        /**
         * [开始阅读]
         * @param  {[Object]} options [请求参数]
         */
        startReading: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/readingContent/startReading';
            request.call(this, options, otherParams, E_START_READING);
        },
        /**
         * [完成阅读]
         * @param  {[Object]} options [请求参数]
         */
        finishReading: function(options, otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/finishReading/finishReading';
            request.call(this, options, otherParams, E_FINISH_READING);
        },
	
       /**
         * [完成阅读的书籍信息]
         * @param  {[Object]} options [请求参数]
         */
        finishReading : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/finishReading/finishReading';
            options.type = 'post';
            request.call(this, options, otherParams, E_FINISH_READING)
        },
       /**
         * [获取评论列表]
         * @param  {[Object]} options [请求参数]
         */
        getCommentList : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/finishReading/getCommentList';
            request.call(this, options, otherParams, E_GET_COMMENTLIST)
        },
       /**
         * [提交评论]
         * @param  {[Object]} options [请求参数]
         */
        commitComment : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/finishReading/commitComment';
            options.type = 'post';
            request.call(this, options, otherParams, E_COMMIT_COMMENT)
        },
       /**
         * [修改用户密码]
         * @param  {[Object]} options [请求参数]
         */
        changePswByKey : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/user/changePswByKey';
            options.type = 'post';
            request.call(this, options, otherParams, E_CHANGE_PW_BY_KEY);
        },
       /**
         * [购买书本]
         * @param  {[Object]} options [请求参数]
         */
        purchase : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/pay/purchase';
            options.type = 'post';
            request.call(this, options, otherParams, E_PURCHASE);
        },
       /**
         * [报错用户信息]
         * @param  {[Object]} options [请求参数]
         */
        modifyUserInfo : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/user/modifyUserInfo';
            options.type = 'post';
            request.call(this, options, otherParams, E_MODIFYUSERINFO);
        },
       /**
         * [修改密码]
         * @param  {[Object]} options [请求参数]
         */
        changePswByOldPsw : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/user/changePswByOldPsw';
            options.type = 'post';
            request.call(this, options, otherParams, E_CHANGEPSWBYOLDPSW);
        },
        /**
         * [注册]
         * @param  {[Object]} options [请求参数]
         */
        register : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/user/register';
            options.type = 'post';
            request.call(this, options, otherParams, E_REGISTER);
        },
        /*阅读导航*/
        exercisesStatus: function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/doExercises/exercisesStatus';
            request.call(this, options, otherParams, E_EXERCISESSTATUS);
        },
        /**
         * [进入某本书籍习题入口]
         * @param  {[Object]} options [请求参数]
         */
        getExercises: function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/doExercises/enterBookExercises';
            request.call(this, options, otherParams, E_GET_EXERCISES);
        },
       
        /**
         * [保存单选题的做题答案]
         * @param  {[Object]} options [请求参数]
         */
        saveExercise: function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/doExercises/saveExercisesAnswer';
            request.call(this, options, otherParams, E_SAVE_EXERCISE);
        },
        /**
         * [通过用户做题id查询用户已完成的某问题题干及选]
         * @param  {[Object]} options [请求参数]
         */
        getFinishExercises: function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/doExercises/getFinishExercisesById';
            request.call(this, options, otherParams, E_GIT_FINISHEXERCISES);
        },
        /**
         * [重做书籍的习题]
         * @param  {[Object]} options [请求参数]
         */
        redoBookExercises: function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/doExercises/redoBookExercises';
            request.call(this, options, otherParams, E_REDOBOOKEXERCISES);
        },
	/**
         * [金币使用记录]
         * @param  {[Object]} options [请求参数]
         */
        tradeGold : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/trade/gold';
            request.call(this, options, otherParams, E_TRADE_GOLD);
        },
        /**
         * [充值记录]
         * @param  {[Object]} options [请求参数]
         */
        tradeRecharge : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/trade/recharge';
            request.call(this, options, otherParams, E_TRADE_RECHARGE);
        },
        /**
         * [完成练习更改状态]
         * @param  {[Object]} options [请求参数]
         */
        updateUserBookStatus : function(options,otherParams){
            var me = this;
            options = options || {};
            options.type = 'post';
            options.url = window.serviceBase + '/doExercises/updateUserBookStatus';
            request.call(this, options, otherParams, E_UPDATE_BOOKSTATUS);
        },
        /**
         * [查询所有年级]
         * @param  {[Object]} options [请求参数]
         */
        queryAllGrade : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/resource/queryAllGrade';
            request.call(this, options, otherParams, E_QUERYALLGRADE);
        },
        /**
         * [设置年级]
         * @param  {[Object]} options [请求参数]
         */
        setGrade : function(options,otherParams){
            var me = this;
            options = options || {};
            options.url = window.serviceBase + '/user/registerUserSaveGrade';
            request.call(this, options, otherParams, E_SETGRADE);
        }
    });

    K.data = {
        userInfo: {} //用户信息
    };

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
/**
 * 公用区域
 */

define('sign',[
	'text!root-tpl/main.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    'root-common/module/scrollbar'
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me.times = null;
            me.inits = 0;
            me.colors = '0f3f66';
            me._tpl = doT.template(tpl);
            me._model = new Model;
            me._model.bind({
                'getUserInfo': $.proxy(me.getUserInfo, me)
            });
        },
        events: {
           'click .btn-confirm': 'btnConfirm',
           'click .img-btn':'btnChange',
           'mouseover .img-btn':'overChange',
           'mouseout .img-btn':'outChange'
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render(); 
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               
            }));  

            this.changeTime()

            $('.ui-signin', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
            // var height = $(window).height();
            // var $form = $('.signin-form', me.$el);
            // $form.css({
            //     'margin-top': height/2 - $form.outerHeight()/2
            // });
        },
        btnConfirm: function(e){
            var me = this;
            e.preventDefault();
            window.audioPlay.click();
            me._model.getUserInfo({}, {
                username: $('input[name="loginName"]', me.$el).val(),
                pw: $('input[name="pw"]', me.$el).val()
            });
            return false;
        },
        overChange:function(){
            var me = this;
            clearTimeout(me.times);
            me.colors = me.inits == 0 ? '0f3f66' : '473c4d';
        },
        outChange:function(){
            this.changeTime();
        },
        /**
         * [切换背景图]
         */
        btnChange: function(e){
            var me = this;
            var _index = $(e.target).index();
            me.colors = _index == 0 ? '0f3f66' : '473c4d';
            me.inits = _index;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            me.go(_index);
        },
        /**
         * [定时切换]
         */
        changeTime: function(e){
            var me = this;
            me.times = setInterval(function(){
                me.go(me.inits);
                me.inits = me.inits == 0 ? 1 : 0;
                me.colors = me.colors == '0f3f66'? '473c4d' : '0f3f66';
            },5000)
        },
        go:function(_index){
            var me = this;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            $('.change .img-btn').removeClass('img-choice');
            $('.change .img-btn').eq(_index).addClass('img-choice');
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
                    cookie('hzw_reading_token', res.token);
                    // cookie('hzw_reading_username', res.userBasic.loginName);
                    util.tip('登录成功', true);
                    if(res.userPhone){
                        window.location.href = '#product';
                    }else{
                        window.location.href = '#phone';
                    }
                    
                }
            }, data, xhr);
        }

    });

    return K;

});


define('text!root-tpl/signup.tpl',[],function () { return '<div class="ui-signin default-skin">\n\t<div class="ui-image">\n\t\t<div class="ui-bg"></div>\n\t\t<ul class="fix change">\n\t\t\t<li class="img-btn img-choice"></li>\n\t\t\t<li class="img-btn"></li>\n\t\t</ul>\n\t\t<form class="form signin-forms" action="">\n\t\t\t<div class="form-control fix">\n\t\t\t\t<div class="inner">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-user icon-solid icon">\n\t\t                \t&#xe90d;\n\t\t                </span>\n\t\t            </div>\n\t\t            <input type="text" class="form-input" name="loginName" placeholder="请输入账号" />\n\t\t\t\t</div>\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="inner">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe90b;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="password" class="form-input input-pw" name="pw" placeholder="请输入密码" />\n\t\t\t\t</div>\n\t\t        \n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="inner">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe90b;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="password" class="form-input input-pw" name="cpw" placeholder="请再次输入密码" />\n\t\t\t\t</div>\n\t\t        \n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="inner">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe912;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="email" placeholder="请输入邮箱，用于找回密码" />\n\t\t\t\t</div>\n\t\t        \n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control "> \n\t\t       <input class="btn btn-confirm" type="submit" value="注&nbsp;&nbsp;&nbsp;&nbsp;册" />\n\t\t    </div>\n\t\t</form>\n\t</div>\n</div>';});

/**
 * 注册
 */

define('signup',[
	'text!root-tpl/signup.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    'root-common/module/scrollbar'
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me.times = null;
            me.inits = 0;
            me.colors = '0f3f66';
            me._tpl = doT.template(tpl);
            me._model = new Model;
            me._model.bind({
                'register': $.proxy(me.register, me)
            });
        },
        events: {
           'submit .signin-forms': '_validate',
           'click .img-btn':'btnChange',
           'mouseover .img-btn':'overChange',
           'mouseout .img-btn':'outChange'
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render(); 
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               
            }));  
            this.changeTime()
            $('.ui-signin', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
        },
        _validate: function(e){
            console.log(132)
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.register({
                    data: {
                        userName: $('input[name="loginName"]', me.$el).val(),
                        userEmail: $('input[name="email"]', me.$el).val(),
                        password: $('input[name="pw"]', me.$el).val()
                    }
                });
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.parent().parent().find('.form-error'));
                },
                rules:{
                    loginName:{
                        required: true,
                        isUsername: true,
                        remote:{
                            url: window.serviceBase+'/user/checkUniq',
                            data:{
                                loginName:function(){
                                    return $('[name="loginName"]').val();
                                }
                            },
                            dataType: 'json'
                        }
                    },
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    },
                    email:{
                        required: true,
                        isEmail: true,
                        remote:{
                            url: window.serviceBase+'/user/checkUniq',
                            data:{
                                userEmail:function(){
                                    return $('[name="email"]').val();
                                }
                            },
                            dataType: 'json'
                        }
                    }
                },
                messages:{
                    loginName:{
                        required: '账号不能为空',
                        isUsername: '包含字母或数字，最短 6位，最长 30位',
                        remote: '账号已经存在'
                    },
                    pw:{
                        required: '密码不能为空',
                        ispw: '至少包含字母或数字，最短 6位字符，最长 30位，区分大小写'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    },
                    email:{
                        required: '邮箱不能为空',
                        isEmail: '请输入正确的邮箱',
                        remote: '该邮箱已被使用'
                    }
                }
            });
        },
        overChange:function(){
            var me = this;
            clearTimeout(me.times);
            me.colors = me.inits == 0 ? '0f3f66' : '473c4d';
        },
        outChange:function(){
            this.changeTime();
        },
        /**
         * [切换背景图]
         */
        btnChange: function(e){
            var me = this;
            var _index = $(e.target).index();
            me.colors = _index == 0 ? '0f3f66' : '473c4d';
            me.inits = _index;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            me.go(_index);
        },
        /**
         * [定时切换]
         */
        changeTime: function(e){
            var me = this;
            me.times = setInterval(function(){
                me.go(me.inits);
                me.inits = me.inits == 0 ? 1 : 0;
                me.colors = me.colors == '0f3f66'? '473c4d' : '0f3f66';
            },5000)
        },
        go:function(_index){
            var me = this;
            $('.ui-image').css({
                background:'url(../alpha/images/sign_'+_index+'.jpg) no-repeat #'+me.colors+' top center'
            })
            $('.change .img-btn').removeClass('img-choice');
            $('.change .img-btn').eq(_index).addClass('img-choice');
        },
        /**
         * [注册成功]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        register: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    util.tip('注册成功！', true);
                    window.location.href = '#';
                }
            }, data, xhr);
        }
    });

    return K;

});


define('text!root-tpl/find-pw/action.tpl',[],function () { return '<div class="form-control fix"> \n   <button class="btn btn-next">确定</button>\n   <a class="btn btn-backtosign" href="javascript:;">返回</a>\n</div>\n';});


define('text!root-tpl/find-pw/update-pw.tpl',[],function () { return '<div class="hd"></div>\n<div class="main">\n\t<form class="form form-updatepw fix" action="">\n\t\t<div class="form-control fix">\n\t\t\t<div class="input-group fix">\n\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t<span class="icon-solid icon">\n\t                \t&#xe910;\n\t                </span>\n\t            </div>\n\t\t        <input type="text" class="form-input" name="pw" placeholder="请输入密码" />\n\t\t\t</div>\n\t\t\t\n\t        <div class="form-error"></div>\n\t    </div>\n\t    <div class="form-control fix">\n\t    \t<div class="input-group fix">\n\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t<span class="icon-solid icon">\n\t            \t\t&#xe910;\n\t                </span>\n\t            </div>\n\t\t        <input type="text" class="form-input" name="cpw" placeholder="请确认密码" />\n\t\t\t</div>\n\t        <div class="form-error"></div>\n\t    </div>\n\t    <div class="form-control fix"> \n\t\t   <input class="btn btn-confirm" type="submit" value="确&nbsp;&nbsp;&nbsp;&nbsp;定" />\n\t\t   <a class="btn btn-logout" href="javascript:;">返回</a>\n\t\t   \n\t\t</div>\n\t</form>\n</div>';});


define('text!root-tpl/find-pw/choice.tpl',[],function () { return '<div class="bg2"></div>\n<!-- <div class="main">\n\t<div class="mask"></div>\n\t<div class="content">\n\t\t<div class="nav">\n\t\t\t\n\t\t</div>\n\t\t<div class="panel">\n\t\t\t\n\t\t</div>\n\t</div>\n\t\n</div> -->';});


define('text!root-common/module/pay/main.tpl',[],function () { return '<a href="javascript:;" class="btn-close"></a>\n{{ if(it.overage){ }}\n<div class="panel-pay panel-overage">\n\t<p>购买本书需要<i class="num">{{=it.coin}}</i>金币</p>\n\t<p>您是否确定要购买？</p>\n\t<a href="javascript:;" class="btn btn-purchase">\n\t\t购买\n\t</a>\n</div>\n{{ }else{ }}\n<p class="title">账户储币</p>\n<div class="panel-pay panel-recharge">\n\t<ul class="price-list">\n\t\t{{~it.list :v:i}}\t\t\n\t\t<li class="item-money fix">\n\t\t\t<div class="inner">\n\t\t\t\t<p class="gold">{{=v.goldAmount}}</p>\n\t\t\t\t<p><img src="images/money_{{=i}}.png" width="50" height="50"></p>\n\t\t\t\t<p class="as">~</p>\n\t\t\t\t<p class="money">{{=v.rmb}}元</p>\n\t\t\t</div>\n\t\t\t\n\t\t</li>\n\t\t{{~}}\t\t\n\t</ul>\n\t<div class="detail">\n\n\t</div>\n\t{{ if(it.itemType == \'book\'){ }}\n\t<p class="pay-str">购买本书需要<i class="num">{{=it.item.goldcoin}}</i>金币，账户余额<i class="num">{{=it.coin}}</i>金币</br>您的余额不足...</p>\n\t{{ } }}\n\t\n\t<div class="btn-pay">\n\t\t<a href="javascript:;" class="btn btn-wechat" data-name="wechat" >\n\t\t\t<i class="icon-solid">&#xe907;</i>微信支付\n\t\t</a>\n\t\t<a href="javascript:;" class="btn btn-alipay" data-name="alipay" >\n\t\t\t<i class="icon-solid">&#xe908;</i>支付宝支付\n\t\t</a>\n\t</div>\n</div>\n{{ } }}\n';});


define('text!root-common/module/pay/alipay.tpl',[],function () { return '<a href="javascript:;" class="btn-close"></a>\n<p class="title">订单提示</p>\n<div class="panel-pay panel-recharge">\n\t<p class="str">请在打开的支付宝页面上完成支付......</p>\n\t<div class="btn-pay">\n\t\t<a href="javascript:;" class="btn btn-problems" data-name="problems" >已完成支付</a>\n\t</div>\n</div>\n\n\n\t\n';});


define('text!root-common/module/pay/thirdpart.tpl',[],function () { return '<div class="panel-wechat">\n\t<a href="javascript:;" class="btn-close"></a>\n\t<p>应付总额：￥ <i class="total">{{=it.money}}</i></p>\n\t<p>\n\t\t<img src="{{=it.url}}" />\n\t</p>\n\t<p class="desc">使用微信扫描此二维码进行支付</p>\n\t<p>微信支付</p>\n</div>';});


define('text!root-common/module/pay/error.tpl',[],function () { return '<a href="javascript:;" class="btn-close"></a>\n<div class="panel-result panel-error form">\n\t<h4>储币失败...</h4>\n\t<p>本次储币失败，</p>\n\t<p>请点击按钮重新充值</p>\n\t<a href="javascript:;" class="btn btn-recharge">储 币</a>\n</div>';});


define('text!root-common/module/pay/success.tpl',[],function () { return '<a href="javascript:;" class="btn-close"></a>\n<div class="panel-result panel-success form">\n\t<h4>储币成功！</h4>\n\t<p>您本次成功充值<i>{{=it.gold}}</i>金币</p>\n\t<p>账户余额<i>{{=it.overage}}</i>金币</p>\n\t<a href="javascript:;" class="btn btn-close">确定</a>\n</div>';});

/**
 * 数据模型
 */

define('root-common/module/pay/model',[
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
/**
 * @overview 进入支付
 * @author Chunjie
 */

define('root-common/module/pay/thirdpart',[
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
/**
 * @overview 支付
 * @author Chunjie
 */

define('root-common/module/pay/main',[
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

define('text!root-common/module/phone-check/main.tpl',[],function () { return '<div class="ui-phone">\n\t<div class="hd"></div>\n\t<div class="main">\n\t\t<form class="form form-validate-phone fix" action="">\n\t\t\t<div class="form-control fix">\n\t\t\t\t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-user icon-solid icon">\n\t\t                \t&#xe90c;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="phone" placeholder="请输入手机号码" />\n\t\t\t\t</div>\n\t\t\t\t\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe90a;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="code" placeholder="输入验证码" />\n\t\t\t\t</div>\n\t\t\t\t<span class="img-code"></span>\n\t\t\t\t<i class="icon-solid icon-loop">&#xe90f;</i>\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t    <div class="form-control fix">\n\t\t    \t<div class="input-group fix">\n\t\t\t\t\t<div class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<span class="icon-lock icon-solid icon">\n\t\t            \t\t&#xe911;\n\t\t                </span>\n\t\t            </div>\n\t\t\t        <input type="text" class="form-input" name="dynamicCode" placeholder="输入动态码" />\n\t\t\t\t</div>\n\t\t\t\t<a href="javascript:;" class="btn-sendcode">\n\t\t\t\t\t<i class="send">获取动态码</i>\n\t\t\t\t\t<i class="nosend">\n\t\t\t\t\t\t<i class="num"></i>秒后请重试\n\t\t\t\t\t</i>\n\t\t\t\t</a>\n\t\t        <div class="form-error"></div>\n\t\t    </div>\n\t\t  \t<div class="action"></div>\n\t\t</form>\n\t</div>\n</div>';});

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
 * 公用头部
 */

define('phonefind',[
	'text!root-tpl/find-pw/action.tpl',
    'text!root-tpl/find-pw/update-pw.tpl',
    'text!root-tpl/find-pw/choice.tpl',
    'root-common/module/cookie',
    './model',
    'root-common/util',
    'root-common/module/popup',
    'root-common/module/pay/main',
    'root-common/module/phone-check/main'
], function(
    actionTpl,
    updatepwTpl,
    choiceTpl,
    cookie,
    Model,
    util,
    popup,
    Pay,
    PhoneCheck
) {

    var E_GET_USERINFO = 'getUserInfo';

	var K = Backbone.View.extend({
        initialize: function(){
        	var me = this;
        	me._actionTpl = doT.template(actionTpl);
            me._updatepwTpl = doT.template(updatepwTpl);
            me._choiceTpl = doT.template(choiceTpl);

            me._model = new Model;
            me._model.bind({
                'changePwByKey': $.proxy(me.changePwByKey, me)
            });

            me._pop = null;
            me._key = null;
            me._phoneCheck = null; //手机验证流程
        },
        reset: function(){
            this.$el.html('');
            this._pop && this._pop.close();
            this._key = null;
            this.stopListening();
        },
        events: {
            'submit .form-updatepw': '_validate',
            'click .btn-logout': '_back',
            'click .btn-backtosign': '_backtosign'
        },
        _back: function(){
            var me = this;
            me.reset();
            me.init();
        },
        _backtosign: function(){
            var me = this;
            me.reset();
            window.location.href = '#';
        },
        render: function(res){
            var me = this;
            me.$el.html(me._choiceTpl({
                
            }));
            var pop = me._pop = popup.create({
                title: '提示',
                custom: '<div class="findpw-area"></div>',
                mask: true,
                hasHd: false
            });

            me.setElement(pop.$el);

            me._phoneCheck = new PhoneCheck({
                el: $('.findpw-area', me.$el),
                baseUrl: window.serviceBase,
                token: cookie('hzw_reading_token'),
                type: 3
            });

            me._phoneCheck.bind({
                'afterVer': $.proxy(me.afterVer, me)
            });

            $('.action', me.$el).html(me._actionTpl({
                
            }));

            pop.resize();
        },
        init: function(){
            var me = this;
            me.render();
        },
        /**
         * [验证过后]
         * @param {[Object]} [data] [数据]
         */
        afterVer: function(data){
            var me = this;
            me._key = data.uuid;
            $('.findpw-area', me.$el).html(me._updatepwTpl({
            
            }));

            me._pop.resize();
        },
        _validate: function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.changePswByKey({
                    type: 'post',
                    data: {
                        key: me._key,
                        password: $('input[name="pw"]', me.$el).val()
                    }
                });
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.closest('.form-control').find('.form-error'));
                },
                rules:{
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    }
                },
                messages:{
                    pw:{
                        required: '密码不能为空',
                        ispw: '6~20位小写英文、数字或"_"的组合'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    }
                }
            });
        },
        /**
         * [修改密码]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        changePwByKey: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    util.tip('修改成功', true);
                    cookie('hzw_reading_token', '', {expires: -1});
                    window.location.href = '#';
                }
            }, data, xhr);
        },
    });

    return K;

});


define('text!root-tpl/phone/main.tpl',[],function () { return '<div class="bg2"></div>\n';});


define('text!root-tpl/phone/action.tpl',[],function () { return '<div class="form-control fix"> \n   <input class="btn btn-confirm" type="submit" value="确&nbsp;&nbsp;&nbsp;&nbsp;定" />\n   {{ if(!it.isTeacher){ }}\n   <a href="#product" class="btn btn-skip">跳过验证</a>\n   {{ }else{ }}\n   <button class="btn btn-logout">返回</button>\n   {{ } }}\n   \n</div>\n{{ if(!it.isTeacher){ }}\n<div class="form-control fix">\n\t<span class="highlight">建议进行手机号码验证 ，否则无法使用找回密码功能哦 ^_^</span>\n</div>\n{{ } }}';});

/**
 * 手机验证
 */

define('phone',[
	'text!root-tpl/phone/main.tpl',
    'text!root-tpl/phone/action.tpl',
    'root-common/util',
    'root-common/module/popup',
    './model',
    'root-common/module/cookie',
    'root-common/module/phone-check/main'
], function(
	tpl,
    actionTpl,
    util,
    popup,
    Model,
    cookie,
    PhoneCheck
) {

	var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me._tpl = doT.template(tpl);
            me._actionTpl = doT.template(actionTpl);
            me._pop = null;
            me._page = $(config.el);
            me._el = config.el;
            me._phoneCheck = null; //手机验证流程
        },
        events: {
           'click .btn-logout': '_logout'
        },
        reset: function(){
            this._page.html('');
            this.setElement(this._el);
            this.$el.html('');
            this._pop && this._pop.close();
            this.stopListening();
            this._phoneCheck.reset();
        },
        init: function(){
            
        },
        render: function(user){
            var me = this;
            if(user.userPhone){
                window.location.href = '#product';
                return;
            }

            me.$el.html(me._tpl({
               
            })); 

            var pop = me._pop = popup.create({
                title: '提示',
                custom: '<div class="phone-area"></div>',
                mask: true,
                hasHd: false
            });
           
            me.setElement(pop.$el);
           
            me._phoneCheck = new PhoneCheck({
                el: $('.phone-area', me.$el),
                baseUrl: window.serviceBase,
                token: cookie('hzw_reading_token'),
                type: 1
            });

            me._phoneCheck.bind({
                'notoken': $.proxy(me._logout, me),
                'afterVer': function(){
                    window.location.href = '#product';
                }
            });

            $('.action', me.$el).html(me._actionTpl({
                isTeacher: user.roleId == '42' //42老师，38学生
            }));

            pop.resize();
            
        },
        getUserInfo: function(user){
            this.render(user); 
        },
        _logout: function(e){
            e && e.preventDefault();
            cookie('hzw_reading_token', '', {expires: -1});
            window.location.href = '#';
        }

    });

    return K;

});


define('text!root-tpl/product.tpl',[],function () { return '<div class="bg">\n\t<div class="p-container">\n\t\t<div class="newbtn fix">\n\t\t\t<p class="btn-manuals">写作手册</p> \n\t\t\t<p class="p-userNews btn-user">用户信息管理</p> \n\t\t</div>\n\t\t\n\t\t<div class="menu-box menu-writing into" rol-stat="1" data-stat="5">\n\t\t\t<div class="menu-box-icon" >\n\t\t\t\t<p class="clearfix bshadow0 pbs">\n\t\t\t\t\t<i class="icon-linear icon-writing">\n\t            \t\t&#xe905;\n\t                </i>\n\t            </p>\n\t\t\t\t<p>Writing</p>\n\t\t\t</div>\n\t\t\t<p class="menu-btn ">马上参与>></p>\n\t\t</div>\n\t\t<div class="menu-box menu-reading" rol-stat="1" data-stat="6">\n\t\t\t<div class="menu-box-icon" >\n\t\t\t\t<p class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<i class="icon-linear icon-reading">\n\t            \t\t&#xe906;\n\t                </i>\n\t            </p>\n\t\t\t\t<p>Reading</p>\n\t\t\t</div>\n\t\t\t<p class="menu-btn" >立即体验>></p>\n\t\t</div>\n\t\t<div class="menu-box menu-reading2" data-video="{{=it.video}}">\n\t\t\t<div class="menu-box-icon" >\n\t\t\t\t<i class="no-public"></i>\n\t\t\t\t<i class="icon-linear icon-play">&#xe907;</i>\n\t\t\t\t<p class="clearfix bshadow0 pbs">\n\t\t\t\t\t\t<i class="icon-linear icon-reading">\n\t            \t\t&#xe906;\n\t                </i>\n\t            </p>\n\t\t\t\t<p>Reading</p>\n\t\t\t\t<p class="desc">（学校版）</p>\n\t\t\t</div>\n\t\t\t<p class="menu-btn" >请联系学校</p>\n\t\t</div>\n\t</div>\n\t<div class="ui-video"></div>\n</div>';});

/**
 * 统计
 */


define('root-common/module/stat/main',[
   
], function(
   
) {

    var stat = _.extend({
        getRequest: function(url, token) {
            $.ajax({
                url: url,
                cache: false,
                headers: {
                    token: token
                }
            });
        },
        /**
         * [生成param字符串，value为空时跳过]
         */
        param: function(data) {
            var params = [];
            $.each(data, function(key, val) {
                if (val !== '') {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                }
            });
            return params.join('&');
        },
        /**
         * [发送统计]
         * @param  {[Object]} data [请求参数]
         * @param  {[String]} url  [请求地址]
         * @param {[String]}  token    [token]
         */
        send: function(data, url, token){
            var paramMap = {
                // url: location.href
            };
            data = data || {};
            paramMap = $.extend(true, {}, paramMap, data);
            
            // 发送 HTTP 请求
            this.getRequest(url + '?' + this.param(paramMap), token);
        }
    }, Backbone.Events);

    return stat;

});

/**
 * 统计
 */


define('stat',[
   'root-common/module/stat/main',
   'root-common/module/cookie'
], function(
   statMain,
   cookie
) {

    var stat = _.extend({
        /**
         * [发送统计]
         * @param  {[Object]} data [请求参数]
         */
        send: function(param){
            try{
                var token = cookie('hzw_reading_token');
                url = param.url;
                data = param.data;
                url = window.serviceBase + url;

                statMain.send(data, url, token);
            }catch(e){
                
            }
            
        }
    }, Backbone.Events);

    return stat;

});


define('text!root-tpl/video.tpl',[],function () { return '<div class="inner">\n\t<div class="mask"></div>\n\t<div class="video-main">\n\t\t<video id="{{=it.id}}" class="video-js vjs-default-skin" controls preload="none" width="780" height="430" poster="" data-setup="{}">\n\t\t\t<source src="/intro/{{=it.video}}" type="video/mp4" />\n\t\t\t<p class="vjs-no-js">请升级您的浏览器至IE9以上</p>\n\t\t</video>\n\t</div>\n\t<i class="icon-linear video-close">&#xe903;</i>\n</div>\n';});

	/**
	 * jQuery MD5 hash algorithm function
	 * 
	 * 	<code>
	 * 		Calculate the md5 hash of a String 
	 * 		String $.md5 ( String str )
	 * 	</code>
	 * 
	 * Calculates the MD5 hash of str using the 禄 RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
	 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
	 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
	 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
	 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
	 * 
	 * Example
	 * 	Code
	 * 		<code>
	 * 			$.md5("I'm Persian."); 
	 * 		</code>
	 * 	Result
	 * 		<code>
	 * 			"b8c901d0f02223f9761016cfff9d68df"
	 * 		</code>
	 * 
	 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
	 * @link http://www.semnanweb.com/jquery-plugin/md5.html
	 * @see http://www.webtoolkit.info/
	 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	 * @param {jQuery} {md5:function(string))
	 * @return string
	 */
define('root-common/md5',[],function(){
	(function($){
		var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
		var F = function(x, y, z) {
			return (x & y) | ((~ x) & z);
		}
		var G = function(x, y, z) {
			return (x & z) | (y & (~ z));
		}
		var H = function(x, y, z) {
			return (x ^ y ^ z);
		}
		var I = function(x, y, z) {
			return (y ^ (x | (~ z)));
		}
		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		var GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		var HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		var II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		var convertToWordArray = function(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWordsTempOne = lMessageLength + 8;
			var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
			var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};
		var wordToHex = function(lValue) {
			var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValueTemp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
			}
			return WordToHexValue;
		};
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};
		$.extend({
			md5: function(string) {
				var x = Array();
				var k, AA, BB, CC, DD, a, b, c, d;
				var S11=7, S12=12, S13=17, S14=22;
				var S21=5, S22=9 , S23=14, S24=20;
				var S31=4, S32=11, S33=16, S34=23;
				var S41=6, S42=10, S43=15, S44=21;
				string = uTF8Encode(string);
				x = convertToWordArray(string);
				a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
				for (k = 0; k < x.length; k += 16) {
					AA = a; BB = b; CC = c; DD = d;
					a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
					d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
					c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
					b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
					a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
					d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
					c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
					b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
					a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
					d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
					c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
					b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
					a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
					d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
					c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
					b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
					a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
					d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
					c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
					b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
					a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
					d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
					c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
					b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
					a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
					d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
					c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
					b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
					a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
					d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
					c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
					b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
					a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
					d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
					c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
					b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
					a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
					d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
					c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
					b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
					a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
					d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
					c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
					b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
					a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
					d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
					c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
					b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
					a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
					d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
					c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
					b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
					a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
					d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
					c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
					b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
					a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
					d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
					c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
					b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
					a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
					d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
					c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
					b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
					a = addUnsigned(a, AA);
					b = addUnsigned(b, BB);
					c = addUnsigned(c, CC);
					d = addUnsigned(d, DD);
				}
				var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
				return tempValue.toLowerCase();
			}
		});
	})(jQuery);
});
	
/**
 * 角色
 */

define('product',[
    'text!root-tpl/product.tpl',
    // 'text!root-tpl/user/main.tpl',
    './model',
    'root-common/module/popup',
    'root-common/util',
    'root-common/module/cookie',
    './stat',
    'text!root-tpl/video.tpl',
    'root-common/md5'
], function(
    productTpl,
    // usermainTpl,
    Model,
    popup,
    util,
    cookie,
    stat,
    videoTpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(productTpl);
            me._videoTpl = doT.template(videoTpl);
            me._model = new Model;
            me._isStudent = false;
            me.status= 0;
            me._bookId = null;
            me._video = null;
            me._isFreeRegister = null;
            $(window).resize(function(){
                me._pop && me._pop.resize();
            });
            me._hasGrade = undefined;
        },
        reset: function(){
            this.$el.html('');
            this.stopListening();
            this._video = null;
            this._isStudent = false;
            this._hasGrade = undefined;
        },
        events: {
            'click [rol-stat]': '_statArrow',
            'click .btn-user':'showUser',
            'click .icon-play': '_playVideo',
            'click .video-close': '_closeVideo',
            'click .btn-manuals': '_manuals'
        },
        _manuals: function(e){
            e.preventDefault();
            var me = this;
            var url = '/intro/';
            url += me._isStudent ? 'manuals-student.pdf' : 'manuals-teacher.pdf'
            window.open(url, '_blank');
        },
        init: function(){
            var me = this;
            var token = cookie('hzw_reading_token');
            if(!token){
                window.location.href = '#';
            }
            
        },
        render: function(){
            var me = this;
            var token = cookie('hzw_reading_token');
            
            me.$el.html(me._tpl({
                
            }));
            
        },
        setVideo: function(user){
            var me = this;
            me._isFreeRegister = user.userRegisterType == '8';
            //42为教师
            if(user.roleId == '42'){
                me._video = 'reading-teacher.mp4';
            }else{
                me._isStudent = true;
                me._video = 'reading-student.mp4';
            }
            me._hasGrade = user.gradeId;
            me.render();
        },
        /**
         * [用户信息管理]
         */
        showUser:function(){
            var me = this;
            window.location.href = '#information' 
        },
        /**
         * [点击统计]
         */
        _statArrow: function(e){
            var me = this;
            var dstat = $(e.currentTarget).data('stat');
            stat.send({
                url: '/user/log',
                data: {
                    type: "product",
                    data: '{"product_id":"'+ dstat +'","info":""}'
                }
            });
            me.goJump(dstat);
        },
        /**
         * [跳转老版写作/进阅读]
         */
        goJump: function(dstat){
            var me = this;
            if(dstat == '6'){
                if(me._hasGrade){
                    window.location.href = '#booklist';
                }else{
                    window.location.href = '#grade';
                    
                }
                
            }else{
                if(me._isFreeRegister){
                    window.location.href = window.staticsBase + '/writing/student/index.html?token='+cookie('hzw_reading_token')+'&url='+encodeURIComponent(window.location.href);
                }else{
                    window.location.href = window.writeBase + '/service/LoginAction/login?un='+ Model.data.userInfo.userName +'&token='+ Model.data.userInfo.token +'&key=' + $.md5(Model.data.userInfo.userName+Model.data.userInfo.token) ;    
                }
            }
        },
        _playVideo: function(e){
            var me = this;
            if(me._video){
                var url = window.staticsBase + '/common/scripts/lib/video/video.min.js';
                require([url], function(videojs){
                    var id = 'video' + (+new Date);
                    $('.ui-video', me.$el).html(me._videoTpl({
                        video: me._video,
                        id: id
                    }));
                    me._isRenderVideo = true;
                    videojs(id).ready(function(){

                      this.play();
                     
                    });
                });
            }
        },
        _closeVideo: function(){
            $('.ui-video', this.$el).html('');
        }
    });

    return K;

});


define('text!root-tpl/header.tpl',[],function () { return '<div class="hd-mask"></div>\n<div class="hd-main">\n\t<a class="logo"></a>\n\t<div class="user-info">\n\t\t欢迎您 {{=it.userInfo.schoolName || \'\'}} {{=it.userInfo.gradeName || \'\'}} {{=it.userInfo.classesName || \'\'}} {{=it.userInfo.userRealName || \'\'}}!\n\t\t<span class="balance">\n\t\t\t<i></i>\n\t\t\t<span class="amount">{{=it.userInfo.amount}}</span>\n\t\t</span>\n\t\t<a class="btn-trade" href="javascript:;">\n\t\t\t交易记录\n\t\t</a>\n\t</div>\n\t<div class="user-control">\n\t\t<a href="javascript:;" class="ui-btn btn-home">\n\t\t\t<i class="icon-solid">&#xe601;</i>首页\n\t\t</a>\n\t\t<a href="javascript:;" class="ui-btn btn-logout">\n\t\t\t<i class="icon-solid">&#xe603;</i>退出\n\t\t</a>\n\t</div>\n</div>\n';});


define('text!root-tpl/trade/main.tpl',[],function () { return '<a href="javascript:;" class="btn-close"></a>\n<div class="inner">\n\t<div class="hd">交易记录</div>\n\t<div class="tab-nav">\n\t\t<ul>\n\t\t\t<li class="nav-item">消费记录</li>\n\t\t\t<li class="nav-item active">充值记录</li>\n\t\t</ul>\n\t</div>\n\t<div class="tab-panel">\n\t\t<ul>\n\t\t\t<li class="panel-item">\n\t\t\t\t\n\t\t\t</li>\t\n\t\t\t<li class="panel-item">\n\t\t\t\t\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t\n</div>\n';});


define('text!root-tpl/trade/consume-list.tpl',[],function () { return '{{ if(it.list.length){ }}\n\t{{~it.list :v:i}}\n\t<div class="trade-item">\n\t\t<span class="time">{{=it.release(v.buy_time)}}</span>\n\t\t<span class="info">{{=v.info}}</span>\n\t\t<span class="count">-{{=v.gold_num}}</span>\n\t</div>\n\t{{~}}\n\t<div class="pagi"></div>\n{{ }else{ }}\n\t<div class="noitem">暂无记录</div>\n{{ } }}\n';});


define('text!root-tpl/trade/recharge-list.tpl',[],function () { return '{{ if(it.list.length){ }}\n\t{{~it.list :v:i}}\n\t<div class="trade-item">\n\t\t<span class="time">{{=it.release(v.pay_time)}}</span>\n\t\t<span class="info">{{=v.order_type == 1 ? \'支付宝\' : \'微信\'}}</span>\n\t\t<span class="count">+{{=v.total_fee}}</span>\n\t</div>\n\t{{~}}\n\t<div class="pagi"></div>\n{{ }else{ }}\n\t<div class="noitem">暂无记录</div>\n{{ } }}\n';});

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
 * 公用头部
 */

define('trade',[
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

/**
 * 公用头部
 */

define('header',[
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


define('text!root-common/module/reading/main.tpl',[],function () { return '';});

/**
 * @overview 阅读详情
 * @author Chunjie
 */

define('root-common/module/reading/main',[
    'text!./main.tpl'
], function(
    tpl
) {

    var E_READOVER = 'readover';
    var E_CHANGE_PAGE = 'change.page';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            me._tpl = doT.template(tpl);
            me._data = config.data;
            me._height = 0; //分页高度
            me._width = 0; //书本宽度
            me._top = 30; //上部距离
            me._left = 0; //左部距离
            me._padding = 35; //内页边距
            me.$book = $('.content-main', me.$el);
            me._activeAudio = null; //当前正在播放的音频
            me._currentPage = 2; //当前页
            me.timer = null;
            me._recordPlayTimer = null;
            me._autoPlayAudio = null;
            me._historyPlay = [];
        },  
        reset: function(){
            var me = this;
            me.timer && clearTimeout(me.timer);
            me._recordPlayTimer && clearInterval(me._recordPlayTimer);
        },
        events: {
            'mouseenter .sentence': '_showAudio',
            'mouseleave .sentence': '_hideAudio',
            'mousedown .sentence': '_showAudio',
            'click .icon-audio': '_playAudio',
            'mouseup .btn-next': '_readover'
        },
        /**
         * [调整阅读区域大小]
         * @param  {[Int]} width [宽度]
         * @param  {[Int]} height [高度]
         */
        resize: function(width, height){
            var me = this;
            me._height = height;
            me._width = width - me._padding * 2;
            me.$book.html('');
            
            me.setPage();
            //清空空段落，有待改进
            $('.page p').each(function(){
                if($(this).html() == ''){
                    $(this).remove();
                }
            });

            me.$book.booklet({
                width: me._width - me._left*2,
                height: me._height - me._top*2,
                next : $('.btn-next', me.$el),
                prev : $('.btn-prev', me.$el),
                pagePadding: 0,
                hoverWidth : 0
                // pageNumbers : false,
            });

            var total = $('.page', me.$el).length;

            $('.b-counter', me.$el).each(function(i){
                if(i >= total){
                    $(this).hide();
                }
            });

            var $count = $('.b-counter', me.$el).append('/'+total);

            me.$book.bind("bookletchange", function(event, data) {
                me._recordPlayTimer && clearInterval(me._recordPlayTimer);
                $('.playing', me.$el).removeClass('playing');
                var page = data.index + 2;
                me._currentPage = page;
                me._autoPlayAudio = null;
                me._historyPlay = [];
                me.trigger(E_CHANGE_PAGE);
            });

            $('.b-wrap-left', me.$el).parent().addClass('b-page-left');
            $('.b-wrap-right', me.$el).parent().addClass('b-page-right');
        },
        renderText: function(params){
            var me = this;
            
            var pic = params.sentenceO.pic;
            
            // var $pPic = me._insertParagraph($page);
            if(params.sentenceO.content && !params.isOverflow){
                params.$s = $('<span class="sentence" />').appendTo(params.$p);
                
                params.$s.attr({
                    'data-recording': params.sentenceO.recordingpath || '',
                    'data-id': params.sentenceO.id
                });

                if(params.sentenceO.recordingpath){
                    params.$s.append('<i class="icon-solid icon-audio">&#xe602;</i>');
                }

                var sentence = params.sentenceO.content;
                var words = sentence.split(/\s+/);

                params.tmp[params.i][params.j].words = words.slice();
                $.each(words, function(k, word){
                    if(word){
                        
                        var $word = $('<i class="word">'+word+' </i>').appendTo(params.$s);
                        params.isOverflow = me._checkOverflow(params.$page);
                        //移除单词
                        if(params.isOverflow){ 
                            var sentenceHeight = params.$p.height();
                            params.tmp = me._getOverplus(params.tmp, params.i, params.j, k, pic, sentenceHeight);
                        
                          
                            me.setPage(params.tmp);
                          
                            //带图片的句子可能过长超过一页的时候需要多加一个判断
                            if(pic && sentenceHeight < me._height - me._top*2){
                                params.$s.remove();
                            }else{
                                $word.remove();
                                if(params.$s.find('.word').length == 0){
                                    params.$s.remove();
                                }
                            }

                            // $word.remove();
                            
                            return false; 
                        }
                    }
                });
            }

            return params.isOverflow;
            
        },
        renderPic: function(params){
            var me = this;
            
            var pic = params.sentenceO.pic;
            if(pic && !params.isOverflow){

                var $pPic = me._insertParagraph(params.$page);
                
                var $img = $('<img src="'+window.imgPath+pic+'" />').appendTo($pPic).attr({
                    'data-id': params.sentenceO.id
                });

                var defaultSize = params.sentenceO.picwidthandheight;
                $pPic.addClass('p-pic');

                //todo
                if(!defaultSize){
                    var maxWidth = $img.width();
                    defaultSize = maxWidth+'*'+maxWidth*9/16;
                }

                var picSize = me.getPicSize(defaultSize, $img.width());

                $img.css({
                    width: picSize.width,
                    height: picSize.height
                });
                params.isOverflow = me._checkOverflow(params.$page);

                //移除图片
                if(params.isOverflow){ 
                    
                    if(params.$s){
                        var sentenceHeight = params.$s.outerHeight()+$pPic.height()+20; //20为段落间距
                    }else{
                        var sentenceHeight = $pPic.height();
                    }
                    
                    params.tmp = me._getOverplus(params.tmp, params.i, params.j, undefined, pic, sentenceHeight);
                    
                    if(sentenceHeight < me._height - me._top*2 && params.$s){
                        params.$s.remove();
                    }
                    $pPic.remove();
                    
                    me.setPage(params.tmp);
                    return params.isOverflow;
                }else{
                    params.tmp[params.i][params.j].pic = '';
                    
                }
                params.$p = me._insertParagraph(params.$page);
                
            }

            return params.isOverflow;
        },
        /**
         * [提取分页]
         */
        setPage: function(list){
            var me = this;
            list = list || me._data;
            var tmp = $.extend(true, [], list);
            
            var $page = me._insertPage();
            var isOverflow = false;
            $.each(list, function(i, paragraph){
                if($.type(paragraph) == 'array' && paragraph.length > 0 && !isOverflow){
                    var $p = me._insertParagraph($page);
                    
                    $.each(paragraph, function(j, sentenceO){
                        
                        if($.type(sentenceO) == 'object' && !isOverflow){
                            var pic = sentenceO.pic;
                            var $s;
                            var params = {
                                tmp: tmp,
                                sentenceO: sentenceO,
                                isOverflow: isOverflow,
                                $page: $page,
                                $p: $p, 
                                $s: $s,
                                i:i,
                                j:j
                            };
                            //图片位置在上面，句子新开段落
                            if(sentenceO.picpostion == 1 && sentenceO.pic){
                                me.renderPic(params);
                                me.renderText(params);
                            }else{
                                me.renderText(params);
                                me.renderPic(params);
                            }
                            isOverflow = params.isOverflow;
                            sentenceO = params.sentenceO;
                            tmp = params.tmp;
                            $page = params.$page;
                            $p = params.$p;
                            $s = params.$s;

                           
                        }
                        
                    });

                }

            });

            
            
        },
        getPicSize: function(size, maxWidth){
            var me = this;
            size = size.split('*');
            var picWidth = size[0];
            var picHeight = size[1];
            var minProportion = 0.82; //图片最小宽高比例限制，图片超出高度时
            if(picWidth == 0){
                picWidth = maxWidth;
                picHeight = maxWidth*9/16;
            }
            // var width = Math.min(picWidth, maxWidth);
            var width = maxWidth;
            var height = width * picHeight / picWidth;
            var maxHeight = me._height - me._top*2;
            console.log(maxHeight, height)
            if(height >= maxHeight * 0.9){  //0.9为接近与最大高度的值

                height = minProportion * maxHeight;
                width = height * picWidth / picHeight;
            }
            
            return {
                width: width,
                height: height
            };
        },
        /**
         * [获取未渲染数据]
         * @param  {[Array]} list [原始数据]
         * @param  {[Int]} i [段落索引]
         * @param  {[Int]} j [句子索引]
         * @param  {[Int]} k [单词索引]
         * @param  {[Boolean]} hasPic [是否有图片]
         * @param  {[Int]} sentenceHeight [有图片的前提下句子高度超过画布，切割]
         */
        _getOverplus: function(list, pIndex, sIndex, wIndex, hasPic, sentenceHeight){
            var me = this;
            $.each(list, function(i, paragraph){
                if(i < pIndex){
                    list.splice(i, 1, []);
                }else if(i == pIndex){
                    if(sIndex !== undefined){
                        $.each(paragraph, function(j, sentence){
                            if(j < sIndex){
                                sentence.content = '';
                                delete sentence.words;
                            }
                            if(j == sIndex){
                                if(hasPic){
                                    //句子高度超过画布
                                    if(sentenceHeight >= me._height - me._top*2){
                                        sentence.content = '';
                                        delete sentence.words;
                                    }
                                }else{

                                    if(wIndex && sentence.words){
                                        sentence.words = sentence.words.slice(wIndex);
                                        sentence.content = sentence.words.join(' ');
                                    }
                                    //wIndex可能为0
                                    if(wIndex === undefined){
                                        sentence.content = '';
                                        delete sentence.words;
                                    }
                                }
                                
                            }
                            
                        });
                    }
                }
            });
            return list;
        },
        _insertPage: function(){
            var me = this;
            var $page = $('<div class="page" />').appendTo(me.$book);
            $('.page', me.$el).css({
                width: me._width/2 - me._left*2
            });
            return $page;
        },
        _insertParagraph: function($page){
            return $('<p />').appendTo($page);
        },
        _checkOverflow: function($page){
            var me = this;
            var max = Math.ceil(me._height - me._top*2);
            
            if($page.height() > max){
                return true;   
            }
            return false;
        },
        _getAudio: function(src){
            return $('<audio controls="controls" unselectable="on" preload="true"><source src="'+window.imgPath+src+'" type="audio/mpeg"></audio>');
        },
        _showAudio: function(e){
            var me = this;
            e.stopPropagation();
            var $target = $(e.currentTarget);
            var $sentence = $('.sentence', me.$el);
            var index = $sentence.index($target);
            me.showAudio($target);
            me.showAudio($sentence.eq(index+1));
            //防止事件捕获
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function(){
                $('.icon-audio', me.$el).hide();
                $('.icon-audio', $target).show();
            }, 100);
        },
        showAudio: function(sentenceNode){
            var me = this;
            var src = sentenceNode.data('recording');
            var hasRender = sentenceNode.data('hasrender');
            if(src && !hasRender){
                var $audio = me._getAudio(src);
                $audio.appendTo(sentenceNode);
                sentenceNode.data('hasrender', 1);
            }
        },
        _hideAudio: function(e){
            var me = this;
            var $target = $(e.currentTarget);
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function(){
                $('.icon-audio', me.$el).hide();
            }, 100);
            
        },
        _playAudio: function(e){
            var me = this;
            
            var $icon = $(e.currentTarget);
            var $sentence = $icon.parent();
            var $audio = $sentence.find('audio');
            
            
            me.playAudio($audio);
            
        },
        playAudio: function($audio, loopList, i, cb){
            var me = this;
            var audio = $audio[0];
            var $sentence = $audio.parent();
            var $icon = $sentence.find('.icon-audio');

            if(audio && audio.play){
                if(me._activeAudio){
                    me._activeAudio.pause();
                    me._activeAudio.currentTime = 0.0;
                }
                if(loopList && me._historyPlay.indexOf(audio.currentSrc) !== -1){
                    var nextIndex = i + 1;
                    if(nextIndex < loopList.length){
                        me.playAudio(loopList.eq(nextIndex), loopList, nextIndex, cb);
                    }else{
                        cb && cb();
                    }
                }else{
                    audio.play();
                    me._activeAudio = audio;
                    
                    $icon.hide();
                    $('.playing', me.$el).removeClass('playing');
                    $sentence.addClass('playing');
                    try{
                        var index = $('.sentence audio', me.$el).index($(audio));
                        var next = $('.sentence audio', me.$el).eq(index+1)[0];
                        var isRepeat = audio.currentSrc == next.currentSrc;
                        if(isRepeat){
                            $(next).closest('.sentence').addClass('playing');
                        }
                    }catch(e){

                    }
                    
                    if(loopList){
                        me._historyPlay.push(audio.currentSrc);
                    }
                    
                    me._recordPlayTimer && clearInterval(me._recordPlayTimer);
                    me._recordPlayTimer = setInterval(function(){
                        if(audio.ended){
                            $('.playing', me.$el).removeClass('playing');
                            var nextIndex = i + 1;
                            
                            clearInterval(me._recordPlayTimer);
                            if(loopList && nextIndex < loopList.length){
                                me.playAudio(loopList.eq(nextIndex), loopList, nextIndex, cb);
                            }else{
                                cb && cb();
                            }
                        }
                    }, 30);
                }
                
            }
        },
        _readover: function(){
            var me = this;
            if($('.page', me.$el).length <= me._currentPage){
                me.reset();
                me.trigger(E_READOVER);
            }
            
        },
        autoPlay: function(page, isLoop){
            var me = this;
            if(!page){
                var page = me._currentPage;
                page = page-2;
            }
            var currentAudio = me._autoPlayAudio;
            var start = 0;
            if(currentAudio && !isLoop){
                page = $('.b-page').index($(currentAudio).closest('.b-page'));
            }
            var $page = $('.b-page').eq(page);
            $page.find('.sentence').each(function(i){
                me.showAudio($(this));
            });
            $('.b-page').eq(page+1).find('.sentence').each(function(i){
                me.showAudio($(this));
            });
            var loopList = $page.find('audio');
            if(currentAudio && !isLoop){
                start = loopList.index($(currentAudio));
            }
            me.playAudio(loopList.eq(start), loopList, start, function(){
                var currentPage = page+1;
                if($('.page', me.$el).length == currentPage){
                    return;
                }
                if(currentPage%2 == 0){
                    $('.btn-next', me.$el).trigger('click');
                    setTimeout(function(){
                        me.autoPlay(page+1, true);
                    }, 2000);
                }else{
                    me.autoPlay(page+1, true);
                }
            });
        },
        pauseAudio: function(){
            var me = this;
            if(me._activeAudio){
                me._activeAudio.pause();
                me._activeAudio.currentTime = 0.0;
            }
            me._autoPlayAudio = me._activeAudio;
            $('.playing', me.$el).removeClass('playing');
            me._recordPlayTimer && clearInterval(me._recordPlayTimer);
        }
    });
   
    return K;  

});

define('text!root-tpl/reading.tpl',[],function () { return '<div class="bg"></div>\n<div class="main">\n\t<div class="inner-bg">\n\t\t<i class="book-top"></i>\n\t\t<i class="book-bottom"></i>\n\t\t<div class="content">\n\t\t\t<div class="content-main"></div>\n\t\t\t<a href="javascript:;" class="btn-arrow btn-prev" rol-stat="1" data-stat="1">\n\t\t\t\t<i class="icon-linear">&#xe607;</i>\n\t\t\t</a>\n\t\t\t<a href="javascript:;" class="btn-arrow btn-next" rol-stat="1" data-stat="2">\n\t\t\t\t<i class="icon-linear">&#xe609;</i>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t\n\t<div>\n\t\t<audio src="../alpha/audio/page.wav" controls="controls" class="page-audio"></audio>\n\t</div>\n\t<a class="btn-logout" rol-stat="1" data-stat="3">\n\t\t<i class="icon-linear">&#xe60d;</i>\n\t</a>\n\t<a class="btn-audio">\n\t\t<i class="icon-solid icon-pause">&#xe91a;</i>\n\t\t<i class="icon-solid icon-play">&#xe60d;</i>\n\t</a>\n</div>';});

/**
 * @overview 响应试布局
 */

define('root-common/module/responsive',[],function() {

	var _instance = null;
	var $win = $(window);
	var E_RESIZE = 'resize';

	var K = Backbone.View.extend({
		initialize: function(){
			var me = this;
			var timer;
			
			me.check();
			$win.resize(function(){
				timer && clearTimeout(timer);
				timer = setTimeout(function(){
					me.check();
				}, 100);
			});
		},
		check: function(){
			var me = this;
			var viewPort = me.viewPort();

			me.trigger(E_RESIZE, viewPort.width, viewPort.height);
		},
		//fix bug:the CSS is using the device width, but the JS is using the document width
		viewPort: function () {
		    var e = window, a = 'inner';
		    var padding = this.padding || 0; //扩展预留padding
		    if (!('innerWidth' in window )) {
		        a = 'client';
		        e = document.documentElement || document.body;
		    }
		    return { width : e[ a+'Width' ] - padding , height : e[ a+'Height' ] };
		}
	});

	K.getInstance = function(){
		if(_instance) return _instance;
		else return (_instance = new K);
	}
	return K.getInstance();
	
});


/**
 * 阅读详情
 */

define('reading',[
    'root-common/module/reading/main',
    'text!root-tpl/reading.tpl',
    'root-common/module/responsive',
    './model',
    'root-common/util',
    './stat'
], function(
	Reading,
    tpl,
    responsive,
    Model,
    util,
    stat
) {

    var E_RENDERED = 'rendered';

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._gap = 150; //空隙
            me._proportion = 8/5;
            me._tpl = doT.template(tpl);
            me._bookId = null;
            me._model = new Model;
            me._model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me)
            });
            me._maxHeight = 0; //分页最大高度
            me._reading = null; //读物对象
            me._currentPage = 1; //当前页面
        },
        reset: function(){
            try{
                this.$el.html('');
                this.stopListening();
            }catch(e){}
            
        },
        events: {
            'click [rol-stat]': '_statArrow',
            'click .btn-logout':'logout',
            'click .btn-arrow': '_addAudio',
            'click .btn-audio .icon-play': '_autoPlay',
            'click .btn-audio .icon-pause': '_pauseAudio'
        },
        init: function(id){
            var me = this;
            me._bookId = id;
            me._model.startReading({
                type: 'post',
                data: {
                    bookId: id
                }
            });
            me._model.getArticleInfo({
                data: {
                    bookId: id
                }
            });
           
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({

            }));
            var $main = $('.main', me.$el);
            
        },
        resize: function(w, h){
            var me = this;
            var width;
            var height;
            var gap = me._gap;
            var p = me._proportion;
            if((w-gap)/(h-gap/2) > p){
                height = (h-gap/2);
            }
            if((w-gap)/(h-gap/2) <= p){
                width = (w-gap);
                height = width/p;
            }
            height = Math.max(570, height);
            width = height*p;
            me._maxHeight = height;
            $('> .main', me.$el).css({
                width: width,
                height: height,
                'marginTop': (h-height)/2
            });
            me._reading.resize(width, height);
            me.animLeft();
            me.trigger(E_RENDERED);
            $('.icon-audio', me.$el).attr({
                'rol-stat': 1,
                'data-stat': 4
            });
        },
        _addAudio: function(){
            $('.page-audio',this.$el)[0].play && $('.page-audio',this.$el)[0].play();
        },
        logout:function(){
            var me = this;
            window.audioPlay.click();
            window.location.href = '#bookNav/'+ me._bookId; 
        },
        /**
         * [获取文章信息]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getArticleInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            // util.dealAjax(function(isError){
                var res = data.data;
                // if(!isError){
                    me.render();
                    me._reading = new Reading({
                        el: $('.content', me.$el),
                        data: res.content
                    });
                    me.listenTo(me._reading, 'readover', $.proxy(me._readover, me));
                    me.listenTo(responsive, 'resize', $.proxy(me.resize, me));
                    me.listenTo(me._reading, 'change.page', $.proxy(me.resetAudio, me));
                    responsive.check();
                    
                // }
            // }, data, xhr);
        },
        /**
         * [点击统计]
         */
        _statArrow: function(e){
            var me = this;
            var dstat = $(e.currentTarget).data('stat');
            
            stat.send({
                url: '/readingContent/saveUserReadingLog',
                data: {
                    bookId: this._bookId,
                    operate: dstat
                }
            });
        },
        _readover: function(){
            var me = this;
            me._model.finishReading({
                type: 'post',
                data: {
                    bookId: me._bookId
                }
            });
            window.audioPlay.completeReading();
            window.location.href = '#readover/'+me._bookId;
        },
        _autoPlay: function(e){
            var me = this;
            $('.icon-pause', me.$el).css('display', 'block');
            $('.icon-play', me.$el).hide();
            me._reading.autoPlay();
        },
        _pauseAudio: function(){
            var me = this;
            me.resetAudio();
            me._reading.pauseAudio();
        },
        resetAudio: function(){
            var me = this;
            $('.icon-pause', me.$el).hide();
            $('.icon-play', me.$el).css('display', 'block');
        },
        animLeft: function(){
            var me = this;
            var left = $(window).width()/2 - me.$el.width()/2;
            me.$el.stop().animate({
                left: left
            }, 'slow', function(){
               
            });
        }
    });

    return K;

});


define('text!root-tpl/booklist/main.tpl',[],function () { return '<div class="bg"></div>\n<div class="main">\n\t<div class="book-nav">\n\t\t<li class="nav-item btn-booklist">\n\t\t\t<a href="javascript:;">\n\t\t\t\t<i class="icon-solid">&#xe909;</i>\n\t\t\t\t<span>读物陈列</span>\n\t\t\t</a>\n\t\t</li>\n\t\t<span class="seperator">|</span>\n\t\t<li class="nav-item btn-mylist">\n\t\t\t<a href="javascript:;">\n\t\t\t\t<i class="icon-solid">&#xe919;</i>\n\t\t\t\t<span>我的读物</span>\n\t\t\t</a>\n\t\t</li>\n\t</div>\n\t<div class="book-panel">\n\t\t<div class="panel-item panel-booklist">\n\t\t\t<div class="grade">\n\t\t\t\t<span class="current-grade">\n\t\t\t\t\t年级选择\n\t\t\t\t</span>\n\t\t\t\t<span class="icon-toggle">\n\t\t\t\t\t<i class="icon-solid icon-expand">&#xe918;</i>\n\t\t\t\t\t<i class="icon-solid icon-shrink">&#xe917;</i>\n\t\t\t\t</span>\n\t\t\t\t<ul>\n\t\t\t\t\t\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class="content">\n\t\t\t\t<div class="mask"></div>\n\t\t\t\t<div class="nav">\n\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="panel">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="panel-item panel-mylist">\n\t\t\t<div class="content">\n\t\t\t\t<div class="mask"></div>\n\t\t\t\t<div class="panel">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n{{ if(it.status == 1){ }}\n<div class="pop-bg"></div>\n{{ } }}';});


define('text!root-tpl/booklist/nav.tpl',[],function () { return '<div class="nav-mask"></div>\n<h2 class="title">主 题</h2>\n<div class="nav-list default-skin">\n\t<ul>\n\t\t<li class="nav-item active" title="全部">全部</li>\n\t\t{{~it.list :v:i}}\n\t\t<li class="nav-item" title="{{!v.name}}">{{!v.name}}</li>\n\t\t{{~}}\n\t</ul>\n</div>';});


define('text!root-tpl/booklist/panel.tpl',[],function () { return '{{ if(it.isMyList){ }}\n<h3 class="title">我的读物 \n\t<span>共<i>{{=it.list.length}}</i>本</span>\n\t\n</h3>\n{{ }else{ }}\n<h2 class="title"> \n\t{{ if(it.chooceTitle != \'\'){ }}\n\t\t{{=it.chooceTitle}}\n\t{{ }else{ }}\n\t\t全部\n\t{{ } }}\n</h2>\n{{ } }}\n<div class="panel-list default-skin">\n\t{{ if(it.list.length > 0){ }}\n\t<ul class="fix">\n\t\t{{~it.list :v:i}}\n\t\t<li class="panel-item ">\n\t\t\t<h4>{{=v.booktitle}}</h4>\n\t\t\t<div class="img">\n\t\t\t\t<img src="{{=window.staticsBase}}/common/images/loading/ajax-loader.gif" title="{{=v.tip}}" data-url="{{=window.imgPath}}/{{=v.imgurl}}" class="loading" />\n\t\t\t</div>\n\t\t\t\n\t\t\t<p>难度：{{=v.showlevel}}</p>\n\t\t\t<i class="progress \n\t\t\t{{ if(v.readStatus === \'0\' || v.readStatus === \'1\'){ }}\n\t\t\tprogress-ing\n\t\t\t{{ } }}\n\t\t\t{{ if(v.readStatus === \'3\'){ }}\n\t\t\tprogress-complete\n\t\t\t{{ } }}\n\t\t\t"></i>\n\t\t</li>\n\t\t{{~}}\n\t</ul>\n\t{{ }else{ }}\n\t<div class="nobook">暂无读物</div>\n\t{{ } }}\n\t\n</div>';});


define('text!root-tpl/booklist/grade-list.tpl',[],function () { return '<li data-id="" title="All">\n\t<a href="javascript:;">All</a>\n</li>\n{{~it.list :v:i}}\n<li data-id="{{=v.grade_id}}" title="{{=v.grade_name}}" \n{{ if(v.grade_id == it.gradeId){ }}\n class="active animate"\n{{ } }}\n>\n\t<a href="javascript:;">{{=window.gradeMap[v.grade_id]}}</a>\n</li>\n\n{{~}}';});

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
 * 阅读详情
 */

define('booklist',[
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


define('text!root-tpl/readover/main.tpl',[],function () { return '<div class="bg"></div>\n<div class="main">\n\t<div class="">\n\t\t<div class="book">\n\t\t\t<!-- 图书封面 -->\n\t\t\t<img width="119" height="152" src="{{=window.imgPath}}/{{=it.book.imgurl}}" title="{{=it.book.booktitle}}">\n\t\t</div>\n\t\t<p class="title1">Perfect! 快来给个评价吧！</p>\n\t\t<!-- <p class="title2">有没有感觉语感又更好了一点呢&ensp;!</p> -->\n\t</div>\n\t<div class="talk">\n\t\t<!-- <p class="title2">给点评价啵&ensp;~&ensp;~</p> -->\n\t\t<div class="btn-group">\n\t\t\t<!-- 点评按钮 -->\n\t\t\t{{~it.list :v:i}}\n\t\t\t\t<span class="title4 btn-talk" spanid="{{=v.id}}">{{=v.labelContent}}</span>\n\t\t\t{{~}}\n\t\t</div>\n\t</div>\n\t\n\t<div class="titles">\n\t\t{{ if(it.data.readingComprehension != 0){ }}\n\t\t<p>还有习题等你来挑战！</p>\n\t\t{{ } }}\n\t</div>\n\t\n\t\n\t<div class="">\n\t\t<button class="btn-result again">\n            <span class="icon-solid icon-loop">\n            &#xe90f;\n            </span>\n            <span class="title3">再读一遍</span>\t\n\t\t</button>\n\t\t{{ if(it.data){ }}\n\t\t\t{{ if(it.data.readingComprehension == 0){ }}\n\t\t\t<button class="btn-result more read-more">\n\t            <span class="icon-solid icon-more">\n\t            &#xe90e;\n\t            </span>\n\t            <span class="title3 ">阅读更多</span>\t\n\t\t\t</button>\n\t\t\t{{ }else{ }}\n\t\t\t<button class="btn-result more next">\n\t            <span class="icon-solid icon-more">\n\t            &#xe90e;\n\t            </span>\n\t            <span class="title3 ">进入习题</span>\t\n\t\t\t</button>\n\t\t\t{{ } }}\n\t\t{{ } }}\n \t</div>\n</div>';});

/**
 * 阅读详情
 */
define('readover',[
    'text!root-tpl/readover/main.tpl',
    './model',
    'root-common/util',
    'root-common/module/cookie',
    'root-common/module/tip'
], function(
    tpl,
    Model,
    util,
    cookie
) {

    var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._model = new Model;
            me._model.bind({
                'finishReading':$.proxy(me.finishReading,me),
                'getCommentList':$.proxy(me.getCommentList,me),
                'commitComment':$.proxy(me.commitComment,me),
                'exercisesStatus':$.proxy(me.exercisesStatus, me),
                'getExercises':$.proxy(me.getExercises, me)
            })
            me._tpl = doT.template(tpl);
            me.type = 2;
            me.bookId = '';//书籍id
            me.chooceTalk = [];//选中的评价
            me.listArray = [];//选中的评价
            me.btnIndex = -1;//选中的按钮索引
        },
        reset: function(){
            var me = this;
            this.$el.html('');
            me.chooceTalk = [];//选中的评价
        },
        events: {
           "click .btn-talk":"evaluate",
           "click .again":"readAgain",
           "click .read-more":"readMore",
           'click .next':"next"
        },
        init: function(id){
            var me = this;
            me.bookId = id;
            me.render();
        },
        render: function(){
            var me = this;
            me._model.exercisesStatus({
                data: {
                    bookId:me.bookId
                }    
            });
            
        },
        next: function(){
            var me = this;
            window.audioPlay.click();
            me._model.getExercises({
                data: {
                    questionStyleId: me.type,
                    bookId: me.bookId
                }
            });
        },
        finishReading:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.$el.html(me._tpl({
                        data:me.typeList ,
                        book:res,
                        list:me.listArray
                    })); 
                }
            }, data, xhr);
        },
        getCommentList:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.listArray = res.list;
                    me._model.finishReading({
                        data: {
                            bookId: me.bookId
                        }
                    });
                }
            }, data, xhr);
        },
        commitComment:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    var index = me.btnIndex;
                    var $btn = $('.btn-talk').eq(index)
                    var status = $btn.hasClass('choce');
                    $btn.hasClass('choce') ? $btn.removeClass('choce') : $btn.addClass('choce')
                }
            }, data, xhr);
        },
        /*
         *再度一遍
         */
        readAgain:function(){
            var me = this;
            me.offpage();
            window.audioPlay.click();
            window.location.href = '#reading/'+ me.bookId;
            window.resetPage();
	    //me.reset();
        },
        /*
         *阅读更多
         */
        readMore:function(){
            var me = this;
            me.offpage();
            window.audioPlay.click();
            window.location.href = '#booklist' ;
        },
        /*
         *给书籍评价
         */
        evaluate:function(e){
            var me = this;
            e.preventDefault();
            var index = $('.btn-talk', me.$el).index($(e.currentTarget));
            me.btnIndex = index;
            var item = me.listArray[index];
            var id = item.id;
            var chooceIndex;
            for(var i=0;i<me.chooceTalk.length;i++){
                if(me.chooceTalk[i] == id){
                    chooceIndex = i;
                }
            }
            if($.inArray(id,me.chooceTalk) == -1){
                me.chooceTalk.push(id);
            }else{
                me.chooceTalk.splice(chooceIndex,1);
            }
            var indexs = me.btnIndex;
            var $btn = $('.btn-talk').eq(indexs)
            var status = $btn.hasClass('choce');
            $btn.hasClass('choce') ? $btn.removeClass('choce') : $btn.addClass('choce')
        },
        offpage:function(){
            var me = this;
            var arrayString = me.chooceTalk.toString()
            me._model.commitComment({
                data:{
                    bookId:me.bookId,
                    evaluateId:arrayString
                }
            });
        },
        exercisesStatus: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.typeList = res;
                if(!isError){
                    me._model.getCommentList({});

                    // me._model.finishReading({
                    //     data: {
                    //         bookId: me.bookId
                    //     }
                    // });
                    
                }
            }, data, xhr);
        },
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    if(res.doExercisesStatus == '2'){
		    	
                        window.location.href = '#testResult/'+me.bookId +'/' + me.type; 
                    }else{
		    	me.offpage();
                        window.location.href = '#exercise/'+me.bookId +'/0'; 
                    }
                }
            }, data, xhr);
        }
    });

    return K;

});


define('text!root-tpl/user/bg.tpl',[],function () { return '<div class="bg2"></div>';});


define('text!root-tpl/user/main.tpl',[],function () { return '<div class="user-new">\n\t<ul>\n\t\t<li class="user-menu information chooceLi">修改资料</li>\n\t\t<li class="user-menu password">修改密码</li>\n\t</ul>\n\t<div class="box">\n\n\t</div>\n</div>\n';});


define('text!root-tpl/user/student.tpl',[],function () { return '<form class="news-form">\n\t<div class="list">\n\t\t<p class="details left"><span>*</span>姓&emsp;名</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" class="user-name" value="{{=it.userInfo.userRealName || \'\'}}" name="userRealName" >\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">姓&emsp;别</p>\n\t\t<p class="details right">\n\t\t\t<label>\n\t\t\t\t<input type="radio" name="userGender" value="1" \n\t\t\t\t{{ if(it.userInfo.userGender ==1){ }}\n\t\t        checked\n\t\t        {{ } }}\n\t\t\t\t>&ensp;男\n\t\t\t</label>&emsp;&emsp;\n\t\t\t<label>\n\t\t\t\t<input type="radio" name="userGender" value="0" \n\t\t\t\t{{ if(it.userInfo.userGender ==0){ }}\n\t\t        checked\n\t\t        {{ } }}\n\t\t\t\t>&ensp;女\n\t\t\t</label>\n\t\t</p>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">邮&emsp;箱</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" value="\n\t\t\t{{ if(it.userInfo.userEmail != null){ }}\n\t\t\t{{=it.userInfo.userEmail}}\n\t\t\t{{ } }}\n\t\t\t" name="userEmail" class="user-email">\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t{{ if(it.userInfo.userGender == 7){ }}\n\t<div class="list">\n\t\t<p class="details left">家长名</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" value="\n\t\t\t{{ if(it.userInfo.userParentName != null){ }}\n\t\t\t{{=it.userInfo.userParentName}}\n\t\t\t{{ } }}\n\t\t\t" name="userParentName" class="user-parent">\n\t\t</p>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">家长手机</p>\n\t\t<p class="details right ">\n\t\t\t<input type="text" value="\n\t\t\t{{ if(it.userInfo.userParentPhone != null){ }}\n\t\t\t{{=it.userInfo.userParentPhone}}\n\t\t\t{{ } }}\n\t\t\t" name="userParentPhone" class="user-phone">\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t{{ } }}\n\t<div class="list btn-submit">\n\t\t<input type="submit" value="保存" class="save-user" >\n\t\t<input type="button" value="取消" class="return-back" >\n\t</div>\n</form>';});


define('text!root-tpl/user/teacher.tpl',[],function () { return '<form class="news-form">\n\t<div class="list">\n\t\t<p class="details left"><span>*</span>姓&emsp;名</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" class="user-name" value="{{=it.userInfo.userRealName}}" name="userRealName" >\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">姓&emsp;别</p>\n\t\t<p class="details right">\n\t\t\t<label>\n\t\t\t\t<input type="radio" name="userGender" value="1" \n\t\t\t\t{{ if(it.userInfo.userGender ==1){ }}\n\t\t        checked\n\t\t        {{ } }}\n\t\t\t\t>&ensp;男\n\t\t\t</label>&emsp;&emsp;\n\t\t\t<label>\n\t\t\t\t<input type="radio" name="userGender" value="0" \n\t\t\t\t{{ if(it.userInfo.userGender ==0){ }}\n\t\t        checked\n\t\t        {{ } }}\n\t\t\t\t>&ensp;女\n\t\t\t</label>\n\t\t</p>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">邮&emsp;箱</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" value="\n\t\t\t{{ if(it.userInfo.userEmail != null){ }}\n\t\t\t{{=it.userInfo.userEmail}}\n\t\t\t{{ } }}\n\t\t\t" name="userEmail" class="user-email">\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list btn-submit">\n\t\t<input type="submit" value="保存" class="save-user" >\n\t\t<input type="button" value="取消" class="return-back" >\n\t</div>\n</form>';});


define('text!root-tpl/user/password.tpl',[],function () { return '<form class="pw-form">\n\t<div class="list">\n\t\t<p class="details left">原密码</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" name="opw" >\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">新密码</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" name="pw" >\n\t\t</p>\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list">\n\t\t<p class="details left">确认新密码</p>\n\t\t<p class="details right">\n\t\t\t<input type="text" name="cpw" >\n\t\t</p>\t\n\t\t<div class="form-error"></div>\n\t</div>\n\t<div class="list btn-submit">\n\t\t<input type="submit" value="保存" class="save-password" >\n\t\t<input type="button" value="取消" class="return-back" >\n\t</div>\n</form>';});

/**
 * 公用用户信息
 */

define('userNew',[
    'text!root-tpl/user/bg.tpl',
    'text!root-tpl/user/main.tpl',
    'text!root-tpl/user/student.tpl',
    'text!root-tpl/user/teacher.tpl',
    'text!root-tpl/user/password.tpl',
    'root-common/module/cookie',
    './model',
    'root-common/util',
    'root-common/module/popup'
], function(
    bgTpl,
    usermainTpl,
    studentTpl,
    teacherTpl,
    passwordTpl,
    cookie,
    Model,
    util,
    popup
) {

	var K = Backbone.View.extend({
        initialize: function(){
        	var me = this;
            me._bgTpl = doT.template(bgTpl);
            me._usermainTpl = doT.template(usermainTpl);
            me._studentTpl = doT.template(studentTpl);
            me._teacherTpl = doT.template(teacherTpl);
            me._passwordTpl = doT.template(passwordTpl);
            me._pop = null;
            me._model = new Model;
            me._model.bind({
                'getUserInfo': $.proxy(me.getUserInfo, me),
                'modifyUserInfo':$.proxy(me.modifyUserInfo, me),
                'changePswByOldPsw':$.proxy(me.changePswByOldPsw, me)
            });
            $(window).resize(function(){
                me._pop && me._pop.resize();
            });

            me.user = null;
        },
        reset: function(){
            var me = this;
            me._pop.close();
            me._pop = null;
            me.stopListening();
            this.$el.html('');
        },
        events: {
            'click .information':'information',
            'click .password':'password',
            'click .return-back':'returnBack',
            'submit .news-form':'saveUser',
            'submit .pw-form':'savePassword'
        },
        init: function(type){
            var me = this;
            var token = cookie('hzw_reading_token');
            if(token){
                me._model.getUserInfo({
                    token: token
                });
            }else{
                window.location.href = '#';
            }
            me.render();
        },
        render: function(res){
            var me = this;
            me.$el.html(me._bgTpl({}))
            var pop = me._pop =  popup.create({
                custom: me._usermainTpl({}),
                isMove: false,
                className: 'pop-youyang',
                hasHd:false
            });
            me.setElement(pop.$el);
            me.updateInformation();
            me.getUserInfo();
            me.listenTo(me._pop, 'close', $.proxy(me.closePop, me));
        },
        /**
         * [学生信息/教师信息]
         */
        updateInformation: function(){
            var me = this;
            if(Model.data.userInfo.roleId == '42'){

                $('.box').html(me._teacherTpl({
                    userInfo:me.user
                }));
            }else{
                $('.box').html(me._studentTpl({
                    userInfo:me.user
                }));
            }
        },
        getUserInfo:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.user = res;
                if(!isError){
                    console.log()
                   if(res.roleId == '42'){
                        $('.box').html(me._teacherTpl({
                            userInfo:res
                        }));
                    }else{
                        $('.box').html(me._studentTpl({
                            userInfo:res   
                        }));
                    } 
                }
            }, data, xhr);
        },
        /**
         * [修改密码]
         */
        updatePassword: function(){
            var me = this;
            $('.box').html(me._passwordTpl({
                       
            }));
        },
        /**
         * [关闭用户信息弹出层]
         */
        closePop: function(){
            window.location.href='#product'
        },
        /**
         * [点击修改资料]
         */
        information: function(e){
            var me = this;
            $('.user-menu').removeClass('chooceLi')
            $(e.target).addClass('chooceLi')
            // me.getUserInfo()
            me.updateInformation();


        },
        /**
         * [点击修改密码]
         */
        password: function(e){
            var me = this;
            me.updatePassword();
            $('.user-menu').removeClass('chooceLi')
            $(e.target).addClass('chooceLi')
        },
        /**
         * [保存修改资料]
         */
        saveUser:function(e){
            var me = this;
            var emailReg = /^([\w-]+)@([\w-]+).([\w-]+)$/; 
            var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; 
            var v = emailReg.test($(".user-email[name = 'userEmail']").val());
            var phoneVal = $(".user-phone[name = 'userParentPhone']").val() ;
            var nameVal = $("input[name = 'userRealName']").val();
            var p = phoneReg.test(phoneVal);
            $('.error').remove();

            if(nameVal == ''){
                $(e.currentTarget).parent().parent().find('.form-error').eq(0).append('<span class="error">姓名不得为空</span>')
            }
            if(!v){
                $(e.currentTarget).parent().parent().find('.form-error').eq(1).append('<span class="error">邮箱格式错误</span>')
            }
            if(!p){
                $(e.currentTarget).parent().parent().find('.form-error').eq(2).append('<span class="error">手机格式错误</span>')
            }
            

            e.preventDefault();
            //教师
            if(phoneVal == null && v && nameVal != ''){
                me._model.modifyUserInfo({
                    data: {
                        userRealName : $(".user-name[name = 'userRealName']").val(),
                        userGender  : $("input[name = 'userGender']:checked").val(),
                        userEmail : $(".user-email[name = 'userEmail']").val()
                    }
                });
            }
            //学生
            if(v && p && nameVal != ''){  
                
                me._model.modifyUserInfo({
                    data: {
                        userRealName : $(".user-name[name = 'userRealName']").val(),
                        userGender  : $("input[name = 'userGender']:checked").val(),
                        userEmail : $(".user-email[name = 'userEmail']").val(),
                        userParentName : $(".user-parent[name = 'userParentName']").val(),
                        userParentPhone  : $(".user-phone[name = 'userParentPhone']").val()
                    }
                });
            }
            // return false;
            // $('.news-form', me.$el).submit(v).submit();
        },
        /**
         * [保存修改资料]
         */
        modifyUserInfo:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    
                    var token = cookie('hzw_reading_token');
                    if(token){
                        me._model.getUserInfo({
                            token: token
                        });
                    } 
                    me.getUserInfo()
                    alert('信息修改成功')
                }
            }, data, xhr);
        },
        /**
         * [保存修改密码]
         */
        savePassword:function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me._model.changePswByOldPsw({
                    data: {
                        oldPassword : $("input[name = 'opw']").val(),
                        newPassword  : $("input[name = 'pw']").val(),
                    }
                });
            }
            return false;
        },
        changePswByOldPsw:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                if(!isError){
                    alert('密码修改成功')
                }
            }, data, xhr);
        },
        validate: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.parent().parent().find('.form-error'));
                },
                rules:{
                    opw:{
                        required: true
                    },
                    pw:{
                        required: true,
                        ispw: true
                    },
                    cpw:{
                        required: true,
                        isCpw: true
                    },
                },
                messages:{
                    opw:{
                        required: '密码不能为空'
                    },
                    pw:{
                        required: '密码不能为空',
                        ispw: '6~20位小写英文、数字或"_"的组合'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    }
                }
            });
        },

        /**
         * [取消用户信息操作]
         */
        returnBack:function(){
            var me = this;
            me.closePop();
            me.setElement($('#UserPage'));
            this.$el.html('');
        }
    });

    return K;

});


define('text!root-tpl/book-nav/main.tpl',[],function () { return '<div class="selection">\n\t<div class="bg"></div>\n\t<ul>\n\t\t<li class="list fix">\n\t\t\t<div class="box listone">\n\t\t\t\t<p class="title">\n\t\t\t\t\t<span class="icon-Preparation iconfont icon-linear">\n\t\t                &#xe90c;\n\t\t            </span>\n\t\t\t\t</p>\n\t\t\t\t<p class="str1"></p>\n\t\t\t</div>\n\t\t\t<div class="box arrow">\n\t\t\t\t<span class="icon-arrow-duble-right iconfont icon-linear ">\n\t                &#xe90e;\n\t            </span>\n\t\t\t</div>\n\t\t\t<div class="box right btn">\n\t\t\t\t{{ if(it.data.readingGuide  == 0){ }}\n\t\t\t\t<p class="noopen"></p>\n\t\t\t\t{{ } }}\n\t\t\t\t{{ if(it.data.readingGuide  == 1){ }}\n\t\t\t\t<div class="noread">\n\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t                &#xe914;\n\t\t            </span>\n\t\t\t\t</div>\n\t\t\t\t{{ } }}\n\t\t\t\t<div class="content ">\n\t\t\t\t\t<div class="pic \n\t\t\t\t\t{{ if(it.data.readingGuide    == 0){ }}\n\t\t\t\t\tdefault\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t">\n\t\t\t\t\t\t<p class="img1"></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class="cn">阅读引导</p>\n\t\t\t\t\t<p class="en">Guide</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t\t<li class="list fix">\n\t\t\t<div class="box listone">\n\t\t\t\t<p class="title">\n\t\t\t\t\t<span class="icon-Preparation iconfont icon-linear">\n\t\t                &#xe90d;\n\t\t            </span>\n\t\t\t\t</p>\n\t\t\t\t<p class="str2"></p>\n\t\t\t</div>\n\t\t\t<div class="box arrow">\n\t\t\t\t<span class="icon-arrow-duble-right iconfont icon-linear ">\n\t                &#xe90e;\n\t            </span>\n\t\t\t</div>\n\t\t\t<div class="box right btn">\n\t\t\t\t{{ if(it.data.textReading    == 0){ }}\n\t\t\t\t<p class="noopen"></p>\n\t\t\t\t{{ } }}\n\t\t\t\t{{ if(it.data.textReading    == 1){ }}\n\t\t\t\t<div class="noread">\n\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t                &#xe914;\n\t\t            </span>\n\t\t\t\t</div>\n\t\t\t\t{{ } }}\n\t\t\t\t<div class="content ">\n\t\t\t\t\t<div class="pic original\n\t\t\t\t\t{{ if(it.data.textReading    == 0){ }}\n\t\t\t\t\tdefault\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t">\n\t\t\t\t\t\t<p class="img2"></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class="cn">原文阅读</p>\n\t\t\t\t\t<p class="en">Passage</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t\t<li class="list fix">\n\t\t\t<div class="box listone">\n\t\t\t\t<p class="title">\n\t\t\t\t\t<span class="icon-Preparation iconfont icon-linear">\n\t\t                &#xe90b;\n\t\t            </span>\n\t\t\t\t</p>\n\t\t\t\t<p class="str3"></p>\n\t\t\t</div>\n\t\t\t<div class="box arrow">\n\t\t\t\t<span class="icon-arrow-duble-right iconfont icon-linear ">\n\t                &#xe90e;\n\t            </span>\n\t\t\t</div>\n\t\t\t<div class="box right fix">\n\t\t\t\t<div class="brs btn">\n\t\t\t\t\t{{ if(it.data.readingComprehension == 0){ }}\n\t\t\t\t\t<p class="noopen"></p>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(it.data.readingComprehensionScore < 0 && it.data.readingComprehension > 1){ }}\n\t\t\t\t\t<p class="nocomplete"></p>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(it.data.readingComprehensionScore >= 0 && it.data.readingComprehension > 1){ }}\n\t\t\t\t\t<p class="complete">{{=parseInt(it.data.readingComprehensionScore)}}分</p>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(it.data.readingComprehension == 1){ }}\n\t\t\t\t\t<div class="noread">\n\t\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t\t                &#xe914;\n\t\t\t            </span>\n\t\t\t\t\t</div>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t<div class="content ">\n\t\t\t\t\t\t<div class="understand pic \n\t\t\t\t\t\t{{ if(it.data.readingComprehension == 0){ }}\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t\t">\n\t\t\t\t\t\t\t<p class="img3-1"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class="cn">阅读理解</p>\n\t\t\t\t\t\t<p class="en">Comperhension</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="brs btn">\n\t\t\t\t\t{{ if(it.data.lexicalGrammar  == 0){ }}\n\t\t\t\t\t<p class="noopen"></p>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(it.data.lexicalGrammar  == 1){ }}\n\t\t\t\t\t<div class="noread">\n\t\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t\t                &#xe914;\n\t\t\t            </span>\n\t\t\t\t\t</div>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t<div class="content ">\n\t\t\t\t\t\t<div class="pic \n\t\t\t\t\t\t{{ if(it.data.lexicalGrammar  == 0){ }}\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t\t">\n\t\t\t\t\t\t\t<p class="img3-2"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class="cn">词汇语法</p>\n\t\t\t\t\t\t<p class="en">Voc & Gra</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="brs btn">\n\t\t\t\t\t{{ if(it.data.listeningTraining  == 0){ }}\n\t\t\t\t\t<p class="noopen"></p>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(it.data.listeningTraining  == 1){ }}\n\t\t\t\t\t<div class="noread">\n\t\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t\t                &#xe914;\n\t\t\t            </span>\n\t\t\t\t\t</div>\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t<div class="content ">\n\t\t\t\t\t\t<div class="pic \n\t\t\t\t\t\t{{ if(it.data.listeningTraining  == 0){ }}\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t\t">\n\t\t\t\t\t\t\t<p class="img3-3"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class="cn">听力训练</p>\n\t\t\t\t\t\t<p class="en">Listening</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t\t<li class="list fix">\n\t\t\t\t<div class="box listone">\n\t\t\t\t<p class="title">\n\t\t\t\t\t<span class="icon-Preparation iconfont icon-linear">\n\t\t                &#xe90a;\n\t\t            </span>\n\t\t\t\t</p>\n\t\t\t\t<p class="str4"></p>\n\t\t\t</div>\n\t\t\t<div class="box arrow">\n\t\t\t\t<span class="icon-arrow-duble-right iconfont icon-linear ">\n\t                &#xe90e;\n\t            </span>\n\t\t\t</div>\n\t\t\t<div class="box right btn">\n\t\t\t\t{{ if(it.data.cloze == 0){ }}\n\t\t\t\t<p class="noopen"></p>\n\t\t\t\t{{ } }}\n\t\t\t\t{{ if(it.data.cloze == 1){ }}\n\t\t\t\t<div class="noread">\n\t\t\t\t\t<div class="bg"></div>\n\t\t\t\t\t<span class="icon-block icon-solid icon">\n\t\t                &#xe914;\n\t\t            </span>\n\t\t\t\t</div>\n\t\t\t\t{{ } }}\n\t\t\t\t<div class="content ">\n\t\t\t\t\t<div class="pic \n\t\t\t\t\t{{ if(it.data.cloze == 0){ }}\n\t\t\t\t\tdefault\n\t\t\t\t\t{{ } }}\n\t\t\t\t\t">\n\t\t\t\t\t\t<p class="img4"></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class="cn">完形填空</p>\n\t\t\t\t\t<p class="en">Cloze</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t</ul>\n\t<div class="opacity"></div>\n</div>';});

/**
 * 书籍导航
 */

define('bookNav',[
	'text!root-tpl/book-nav/main.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me.bookid = null;//书籍id
            me.typeList = null;//导航阅读状态
            me.question = 0;//题目未作的序号
            me.type = 2;
            me._model = new Model;
            me._model.bind({
                'exercisesStatus':$.proxy(me.exercisesStatus, me),
                'getExercises':$.proxy(me.getExercises, me)
            })
        },
        events: {
           'click .original':'original',
           'click .understand':'understand',
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(id){
            var me = this;
            me.bookid = id;
            me.render();
        },
        render: function(){
            var me = this;
            me._model.exercisesStatus({
                data: {
                    bookId:me.bookid
                }    
            });
            
        },
       
        original:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.typeList.textReading == 2){
                window.location.href = '#reading/'+me.bookid;    
            }
        },
        understand:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.typeList.readingComprehension  == 2){
                me._model.getExercises({
                    data: {
                        questionStyleId: me.type,
                        bookId: me.bookid
                    }
                });
            }
            
        },
        exercisesStatus: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.typeList = res;
                if(!isError){
                    me.$el.html(me._tpl({
                        data:res
                    })); 
                }
            }, data, xhr);
        },
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    if(res.doExercisesStatus == '2'){
                        window.location.href = '#testResult/'+me.bookid +'/' + me.type; 
                    }else{
                        window.location.href = '#exercise/'+me.bookid +'/' + me.question; 
                    }
                }
            }, data, xhr);
        },
        animLeft: function(){
            var me = this;
            $('.selection', me.$el).stop().animate({
                left: '-100%'
            }, 'slow', function(){
                me.reset();
            });
        }
    });

    return K;

});


define('text!root-tpl/book-nav/result.tpl',[],function () { return '{{\n\tvar right = null;\n\tvar index = null;\n}}\n\n<div class="bg"></div>\n<div class="p-question">\n\t<div class="ui-exercise">\n\t\t<div class="mask"></div>\n\t\t<div class="main p-result">\n\t\t\t<div class="mask"></div>\n\t\t\t<div class="content ">\n\t\t\t\t<p class="icon">\n\t\t\t\t\t<span class="icon-single-arrow-right icon-solid icon">\n\t\t                &#xe60d;\n\t\t            </span>\n\t\t            <span class="icon-single-arrow-right icon-solid icon right">\n\t\t                &#xe60d;\n\t\t            </span>\n\t\t            <span>阅读理解<br/>&emsp;&ensp;&ensp;Comprehension</span>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div class="border chart fix">\n\t\t\t\t<div class="box left">\n\t\t\t\t\t<div id="placeholder" class="demo-placeholder"></div>\n\t\t\t\t\t<div class="composition-total-score ">\n\t\t\t\t\t\t<div class="total-score-center">\n\t\t\t\t\t\t\t<div class="center">\n\t\t\t\t\t\t\t\t<p class="center-score-total"><span class="num">{{=Math.floor(it.data.rightPercent*100)}}</span>%</p>\n\t\t\t\t\t\t\t\t<p class="center-score-title">正确率</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="box right">\n\t\t\t\t\t<p>总题数：{{=it.data.total}}题</p>\n\t\t\t\t\t<p>总用时：{{=it.data.usedTime}}</p>\n\t\t\t\t\t<p>单题平均用时：{{=it.data.avgTime}}</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="test-btn border">\n\t\t\t\t<ul class="fix">\n\t\t\t\t\t{{~it.data.exercisesInfoL :v:i}}\n\t\t\t\t\t<li class="testbtn \n\t\t\t\t\t\t{{ if(v.userIsRight  == \'0\'){ }}\n\t\t\t\t\t\twrong\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t">{{!v.sort}}</li>\n\t\t\t\t\t{{~}}\n\t\t\t\t</ul>\n\t\t\t\t<p class="title">Choose the best answer to the questions below.</p>\n\t\t\t</div>\n\t\t\t<div class="question-area border" data-id="{{=it.exercise.questionId}}" data-userdoid="{{=it.exercise.userDoquestionId}}">\n\t\t\t\t<div class="row-title">Question:</div>\n\t\t\t\t<div class="question">{{=it.title}}</div>\n\t\t\t\t<div class="row-title">Option:</div>\n\t\t\t\t<ul class="option-list">\n\t\t\t\t\t{{~it.list :v:i}}\n\t\t\t\t\t<li class="option-item \n\t\t\t\t\t{{ if(it.select == v.questionOptionId ){ }}\n\t\t\t\t\toption-select \n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(i == it.list.length - 1){ }}\n\t\t\t\t\toption-item-last \n\t\t\t\t\t{{ } }}\n\t\t\t\t\t{{ if(v.isRight == 1){ }}\n\t\t\t\t\toption-right \n\t\t\t\t\t{{ }else{ }}\n\t\t\t\t\toption-error \n\t\t\t\t\t{{ } }}\n\t\t\t\t\t"  data-id="{{=v.questionOptionId}}">\n\t\t\t\t\t\t{{=it.options[i]}}. {{=v.questionOption}}\n\t\t\t\t\t\t{{ if( it.select == v.questionOptionId && v.isRight  != \'1\' ){ }}\n\t\t\t\t\t\t<i class="icon-solid icon-results icon-error">&#xe915;</i>\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t\t{{ if(v.isRight  == \'1\' ){ }}\n\t\t\t\t\t\t<i class="icon-solid icon-results icon-right">&#xe916;</i>\n\t\t\t\t\t\t{{ } }}\n\t\t\t\t\t</li>\n\n\t\t\t\t\t{{ \n\t\t\t\t\t\tif(v.isRight){\n\t\t\t\t\t\t\tright = v;\n\t\t\t\t\t\t\tindex = i;\n\t\t\t\t\t\t}\n\t\t\t\t\t}}\n\n\t\t\t\t\t{{~}}\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class="answer-area">\n\t\t\t\t<div class="row-title">The Answer:</div>\n\t\t\t\t<div class="answer">\n\t\t\t\t\t<p>{{=it.options[index]}}. {{=right.questionOption}}</p>\n\t\t\t\t</div>\n\t\t\t\t<a class="btn btn-reset" href="javascript:;">重&nbsp;&nbsp;做</a>\n\t\t\t</div>\n\t</div>\n\t<audio src="../alpha/audio/complete.mp3" controls="controls" class="page-audio"></audio>\n</div>';});

/**
 * 测试结果
 */

define('testResult',[
	'text!root-tpl/book-nav/result.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me.result = null ;
            me.bookid = null;
            me.choice = 0;//默认选择题目
            me.questionStyleId = '2';
            me.rightPercent = null;
            me._model = new Model;
            me._model.bind({
                'getExercises':$.proxy(me.getExercises, me),
                'getFinishExercises':$.proxy(me.getFinishExercises, me),
                'redoBookExercises':$.proxy(me.redoBookExercises, me)
            })
        },
        events: {
           'click .testbtn':'getfinish',
           'click .btn-reset':'getreset',
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(id, index){
            var me = this;
            me.bookid = id;
            me.render();
            me._model.updateUserBookStatus({
                data: {
                    bookId: id
                }
            });
        },
        render: function(){
            var me = this;
            me._model.getExercises({
                data: {
                    bookId:me.bookid,
                    questionStyleId:me.questionStyleId
                }    
            });
            
        },
        getreset:function(e){
            var me = this;
            e.preventDefault();
            window.audioPlay.click();
            me._model.redoBookExercises({
                data: {
                    bookId:me.bookid,
                    questionStyleId:me.questionStyleId
                }    
            });
        },
        getfinish:function(e){
            var me = this;
            e = e || null;
            var index = e ? $(e.target).index() : 0;
            me.choice = index;
            var choices = me.result.exercisesInfoL[index].userDoquestionId;
            
            me._model.getFinishExercises({
                data: {
                    userDoquestionId:choices
                }    
            });
        },
        redoBookExercises:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    window.location.href = '#exercise/'+me.bookid +'/0';   
                }
            }, data, xhr);
        },
        getFinishExercises:function(data, xhr, options, otherOptions){
            var me = this;

            util.dealAjax(function(isError){
                var res = data.data;
                var exercise = res.exercisesInfo;
                var list = exercise.exercisesOptionInfoL;
                var title = exercise.question;
                var select = exercise.userSelectedOptionId;
                var option = 'ABCDEFGH'.split('');
                if(!isError){
                    me.$el.html(me._tpl({
                        data:me.result,
                        title: title,
                        list: list || [],
                        exercise: exercise,
                        select: select,
                        options: option
                    })); 
                    me.initPie(me.rightPercent*100,100);
                    $('.testbtn').eq(me.choice).addClass('choice');
                }
            }, data, xhr);
        },
        getExercises:function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                var res = data.data;
                me.result = res;
                if(!isError){
                    me.result.usedTime = util.formatTimeE(res.usedTime * 1000);
                    me.result.avgTime = util.formatTimeE(res.avgTime * 1000);
                    me.getfinish();
                    me.rightPercent=res.rightPercent;
                }
            }, data, xhr);
        },
        getTime:function(time){
            return parseInt(time/60)
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
                            color: "#252b17"
                        }
                    }
                },
                colors: ["#252b17", "#fff905"]
            });
        },
       
    });

    return K;

});


define('text!root-tpl/find-pw/main.tpl',[],function () { return '<div class="bg3"></div>\n<div class="back">\n\t<span class="icon-back icon-solid">\n    \t&#xe913;\n    </span>\n    <span class="btn-str">返回</span>\n</div>\n<div class="main findPw-choice fix">\n\t<div class="article">\n\t\t<div class="mode">\n\t\t\t<span class="iconfont icon-phone icon-linear">\n            \t&#xe908;\n            </span>\n\t\t\t<a href="#phonefind">手机取回</a>\n\t\t</div>\n\t\t<p class="content">\n\t\t\t如果您的账号已绑定手机，强烈建议您选用手机找回，方便快捷\n\t\t</p>\n\t</div>\n\t<div  class="article right">\n\t\t<div class="mode">\n\t\t\t<span class="iconfont icon-email icon-linear">\n            \t&#xe909;\n            </span>\n\t\t\t<a href="{{=it.url}}">邮箱取回</a>\n\t\t</div>\n\t\t<p class="content">\n\t\t\t如果您的账号未绑定手机或者已更换手机，那么可以选用邮箱找回，同样方便\n\t\t</p>\n\t</div>\n\t<!-- <div class="mask"></div>\n\t<div class="content">\n\t\t<div class="nav">\n\t\t\t\n\t\t</div>\n\t\t<div class="panel">\n\t\t\t\n\t\t</div>\n\t</div> -->\n\t\n</div>';});

/**
 * 手机验证
 */

define('find-pw',[
	'text!root-tpl/find-pw/main.tpl',
    'root-common/util',
    './model',
    'root-common/module/cookie',
    
], function(
	tpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
        },
        events: {
            'click .btn-str': '_backtosign'
        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(user){
            var me = this;
            var path;
            var hostname = location.hostname;
            if(hostname === 'www.lyced.com'){
                path  = 'http://www.lyced.com/LoginAction.action?method=findPwd'
            }
            if(hostname === 'www.17english.com'){
                path = 'http://www.17english.com/LoginAction.action?method=findPwd'
            }
            if(hostname === '192.168.12.240'){
                path = 'http://192.168.12.240/LoginAction.action?method=findPwd'
            }
            
            me.$el.html(me._tpl({
               url : path
            })); 
        },
        _backtosign: function(){
            var me = this;
            me.reset();
            window.audioPlay.click();
            window.location.href = '#';
        }
    });

    return K;

});


define('text!root-tpl/privacy.tpl',[],function () { return '<div class="inner"><p>\n\t<h2 style="text-align:center;">\n\t\t<b>Privacy Notice</b>\n\t</h2>\n\t<p class="MsoNormal" align="center" style="text-align:center;">\n\t\t<b></b>\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>&nbsp;</b>\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>WHAT PERSONALLY IDENTIFIABLE INFORMATION ("PII") DOES LANGYING COLLECT ABOUT YOU?</b><b></b>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;Contact information that you provide to us, such as your name, title and organization, address, telephone number, fax number, or e-mail address.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;Contact information obtained via other companies’ marketing lists.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;Credit card or other payment information, if there is any, for your transactions may be collected.\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>WHY DOES LANGYINGCOLLECT PII?</b><b></b>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;To process your transactions, maintain your account, and respond to your inquiries.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;To provide you with information about services and products that we believe may be of interest to you offered by LANGYING.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;To provide you with access to website&nbsp;and services, as described in our&nbsp;<a href="http://www.mheducation.com/terms-use"><u>Terms of Use</u></a>\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>HOW DOES LANGYINGSHARE YOUR PII?</b><b></b>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;With our vendors to perform services on our behalf.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;With our business partners, which may include authors, who may jointly develop and offer products with LANGYING.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;Potentially in conjunction with a sale or similar transfer of a business.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;If you use our online products or services, we may share your PII, and other information collected in the course of providing you with our online products and services, with instructors and administrators of your educational institution.\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;When legally compelled or for other legal purposes.\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>SECURITY AND ACCURACY</b><b></b>\n\t</p>\n\t<p class="MsoNormal">\n\t\tWe have established safeguards and use reasonable security measures to protect your PII from unauthorized access and use. Your PII is stored in a secure location in the People’s Republic of China&nbsp;and access is limited to authorized persons.\n\t</p>\n\t<p class="MsoNormal">\n\t\tTo review and confirm the accuracy of your PII, or to contact us with concerns or questions, please write to:&nbsp;<a href="mailto:.privacy@lyced.com"><u>.privacy@lyced.com</u></a>&nbsp;or Privacy Official, LANGYING, 19A No. 121&nbsp;Yanping Road, Jing’an District, Shanghai, China.\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>COOKIE USAGE</b><b></b>\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>Please note that by using this website (the "Site"), you consent to the use of the cookies described below.</b>\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>LANGYING </b>or our third-party service providers may use cookies (or other tracking technologies that identify your computer or device (like its IP address) and track your use of the Site) when you visit our Site. We do not collect personally identifying information in this way, but if you\'ve provided us with personally identifying information we may associate that information with the information that is collected automatically.\n\t</p>\n\t<p class="MsoNormal">\n\t\tA "cookie" is a small text file placed on your computer or device, which helps our Site function better. We may use the following types of cookies on this Site:\n\t</p>\n\t<p class="MsoNormal">\n\t\t"Strictly necessary" cookies, which have to be set to allow us to deliver the Site to you and to provide specific services that you request from us. The services offered by this Site that require cookies to function include:\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;account log-in\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;shopping basket/online store\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;billing\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;comments/forum features\n\t</p>\n\t<p class="MsoNormal">\n\t\t"Performance" or "Analytics" cookies, which help us to collect information about how visitors use our Site, and helps us with site analysis and improvements. Performance or analytics cookies will remain on your computer after you close your browser, but cannot be used to identify you personally.\n\t</p>\n\t<p class="MsoNormal">\n\t\t"Functionality" cookies, which allow our site to remember your choices or preferences, such as information on online forms or previous orders. These cookies allow us to offer you a personalized experience while using the Site. They are not used to track your browsing activity on other websites.\n\t</p>\n\t<p class="MsoNormal">\n\t\tYou can change your web browser\'s Internet preferences to disable or delete cookies, although that may affect certain functions on this site. To learn how to manage your cookies, please follow the instructions from your specific browser, or follow the links below:\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;<a href="http://support.microsoft.com/kb/196955">Internet Explorer</a>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;<a href="http://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences?redirectlocale=en-US&amp;redirectslug=Enabling+and+disabling+cookies">Firefox</a>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;<a href="http://support.google.com/chrome/bin/answer.py?hl=en&amp;answer=95647">Chrome</a>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;<a href="http://support.apple.com/kb/PH5042">Safari</a>\n\t</p>\n\t<p class="MsoNormal" style="margin-left:22.5000pt;text-indent:-18.0000pt;">\n\t\t·&nbsp;<a href="http://www.opera.com/browser/tutorials/security/privacy/">Opera</a>\n\t</p>\n\t<p class="MsoNormal">\n\t\tIf you are visiting this Site using a mobile device such as a smartphone or tablet, please refer to the manufacturer\'s instructions on how to manage cookies.\n\t</p>\n\t<p class="MsoNormal">\n\t\t<b>IF YOU WANT TO LIMIT USE OR SHARING OF YOUR PII FOR MARKETING PURPOSES:</b><b></b>\n\t</p>\n\t<p class="MsoNormal">\n\t\tWrite to us at:&nbsp;<a href="mailto:privacy@lyced.com"><u>privacy@lyced.com</u></a>&nbsp;or Privacy Official, LANGYING, 19A No. 121&nbsp;Yanping Road, Jing’an District, Shanghai, China. and let us know if you no longer wish to be contacted for marketing purposes by e-mail, mail, telephone or fax - or by any method.\n\t</p>\n\t<p class="MsoNormal">\n\t\t&nbsp;\n\t</p>\n</p>\n<p>\n\t<br />\n</p>\n</div>';});

/**
 * 隐私政策
 */

define('privacy',[
	'text!root-tpl/privacy.tpl'
], function(
	tpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
           
        },
        events: {

        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(user){
            var me = this;
            
            me.$el.html(me._tpl({
               
            })); 
           
        }

    });

    return K;

});


define('text!root-tpl/term.tpl',[],function () { return '<div class="inner"><h2 style="text-align:center;">\n\t<b>17English</b><b>.com Terms of Use</b> \n</h2>\n<p class="MsoNormal" align="center" style="text-align:center;">\n\t<b></b> \n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\tThis web site (the "Site"), is owned and operated by Shanghai LangYing Education &amp;&nbsp;Technology Co, Ltd. (“LangYing" or "us" or "we"). By accessing or using this Site, you agree to be bound by the following terms and conditions (the "Terms of Use") and the terms and conditions of our Privacy Notice, which is hereby incorporated by reference (collectively, this “Agreement”). We reserve the right, at our discretion, to change any of these terms in the future. If you do not agree to these Terms of Use, you may not access or otherwise use the Site or the Services.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t1. &nbsp;PROPRIETARY SERVICES FOR REGISERED USERS. &nbsp;LangYing&nbsp;operates an electronic platform/system that enables students, instructors, and administrators of educational institutions to access and use certain online products and services offered by LangYing&nbsp;(the “Services”) through the Site. The material on this Site includes general non-proprietary information available to all users of the Site, but in order to access and use the Services you will be required to log in with you assigned user name and password&nbsp;on the Site or register through your educational institution. You&nbsp;shall be solely responsible for keeping an accurate record of the user name and password&nbsp;assigned to you. If you register to use the Services on behalf of your educational institution, you will be required to agree to additional terms and conditions in connection with the registration process (the " Services Agreement").\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t2. RESTRICTIONS. &nbsp;As a service provider to Subscriber, LangYing&nbsp;will establish and maintain reasonable procedures in accordance with its policies and practices and applicable law to protect the confidentiality, security, and integrity of Personal Information and user information received by LangYing&nbsp;in connection with provision of the Services. You&nbsp;acknowledges and agrees that LangYing&nbsp;has the right to use the Personal Information and userinformation collected in connection with provision of the Service&nbsp;for (a) purposes of performing its obligations under this Agreement, and (b) for research purposes in connection with quality control and the development of revised or new products or services (“Research Purposes”), provided that such Personal Information and userinformation will be used by LangYing&nbsp;for Research Purposes only in the aggregate and so that the privacy of the individual\'s Personal Information will be maintained,consistent with our Privacy Notice. &nbsp;\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t3. INTELLECTUAL PROPERTY. &nbsp;LangYing&nbsp;is the owner and/or authorized user of all trademarks, logos, service marks and trade names (collectively the "Trademarks") on the Site, and is the owner or licensee of the content and/or information on the Site. Except as otherwise expressly provided herein, or pursuant to the Terms and Conditions, your use of the Site does not grant to you a license to any content or materials you may access on the Site. Nothing contained on the Site should be construed as granting any license or right to use any Trademark displayed on the Site without our written permission or that of the third party rights holder.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t4. COMMUNICATIONS TO LANGYING AND USER GENERATED CONTENT. &nbsp;Although we encourage you to e-mail us, you should not e-mail us anything that contains confidential information. Please refer to our Privacy Notice with regard to how we handle your personal information. With respect to all e-mails you send to us, including but not limited to feedback, questions, comments, suggestions, and the like, we shall be free to use any ideas, concepts, know-how, or techniques contained in your communications for any purpose whatsoever, including but not limited to, the development, production and marketing of products and services that incorporate such information.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\tLangYing&nbsp;does not and cannot review all communications and materials posted to or created by users accessing the Services (hereinafter, "User Generated Content"), and is not in any manner responsible for the content of the User Generated Content. LangYing&nbsp;reserves the right to block or remove communications or materials that it determines to be in violation of our guidelines or is offensive or otherwise unacceptable to LangYing&nbsp;in its sole discretion.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\tYou own the rights to anything you post to the Services, including text and photographs, PPT slides and audio or video. You do, however, grant us an irrevocable, non-exclusive, worldwide, perpetual, royalty-free license to use, modify, copy, distribute, publish, perform, sublicense, and create derivative works from all submissions you provide to us, in any media now known or hereafter devised.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t5. USER CONDUCT. &nbsp;While using the Site and the Services, you agree not to:\n</p>\n<p class="MsoNormal">\n\t•&nbsp;use the Site or the Services in violation of any applicable law;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;use the Site or the Services or features in violation of LangYing\'s or any third party\'s intellectual property or other proprietary, personal or legal rights;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;obtain or attempt to obtain unauthorized access to computer systems, materials, information or any Services made available on or through the Site through any means;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;attempt to gain unauthorized access to other computer systems through the Site;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;impersonate any person or entity or misrepresent your affiliation with any other person or entity;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;attempt (or encourage or support anyone else\'s attempt) to circumvent, reverse engineer, decrypt, or otherwise alter or interfere with the Site or the Services, or any content thereof, or make unauthorized use thereof;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;use the Site in any manner that could damage, disable, overburden, or impair the Site or interfere with any other party\'s use and enjoyment of the Site;\n</p>\n<p class="MsoNormal">\n\t•&nbsp;obtain or attempt to obtain any materials or information through any means not intentionally made publicly available or provided for through the Site.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t6. &nbsp;NO WARRANTIES. &nbsp;WE AND OUR SERVICE PROVIDERS MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE CONTENTS OF THE SITE OR THE SERVICE. WE SHALL NOT BE SUBJECT TO LIABILITY FOR ANY DELAYS OR INTERRUPTIONS OF THE SITE OR THE SERVICE FROM WHATEVER CAUSE. YOU AGREE THAT YOU USE THE WEBSITE, THE SITE’S CONTENT, AND THE SERVICE AT YOUR OWN RISK. THE SITE AND THE SERVICE MAY CONTAIN TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS OR OMISSIONS. LANGYING IS NOT RESPONSIBLE FOR ANY SUCH TYPOGRAPHICAL OR TECHNICAL ERRORS. LANGYING RESERVES THE RIGHT TO MAKE CHANGES, CORRECTIONS, AND/OR IMPROVEMENTS TO THE SITE AND THE SERVICE AT ANY TIME WITHOUT NOTICE.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\tIN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY (OR TO ANY OTHER PERSON CLAIMING RIGHTS DERIVED FROM SUCH PARTY’S RIGHTS) FOR CONSEQUENTIAL, INCIDENTAL, INDIRECT, PUNITIVE OR EXEMPLARY DAMAGES OF ANY KIND (INCLUDING WITHOUT LIMITATION LOST REVENUES OR PROFITS, LOSS OF USE, LOSS OF COST OR OTHER SAVINGS, LOSS OF GOODWILL OR REPUTATION) OR LOSS OF DATA WITH RESPECT TO ANY CLAIMS BASED ON CONTRACT, TORT OR OTHERWISE (INCLUDING NEGLIGENCE AND STRICT LIABILITY) ARISING FROM OR RELATING TO THE SERVICESAND/ORTHE SITE, THE MATERIALS OR OTHERWISE ARISING FROM OR RELATING TO THESE TERMS OF USE, REGARDLESS OF WHETHER SUCH PROTECTED ENTITY WAS ADVISED, HAD OTHER REASON TO KNOW, OR IN FACT KNEW OF THE POSSIBILITY THEREOF. LANGYING’S MAXIMUM LIABILITY ARISING FROM OR RELATING TO THE theSERVICESAND/ORTHE SITE, THE MATERIALS OR OTHERWISE ARISING FROM OR RELATING TO THIS AGREEMENT, REGARDLESS OF THE CAUSE OF ACTION (WHETHER IN CONTRACT, TORT, BREACH OF WARRANTY OR OTHERWISE), WILL NOT EXCEED THE AMOUNTS PAID BY YOU TO LANGYING HEREUNDER.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t7. EXTERNAL WEBSITES. &nbsp;The Site may contain links to third-party websites (“External Websites”). These links are provided solely as a convenience to you and not as an endorsement by us of the content on such External Websites. We are not responsible for the content of any linked External Websites and do not make any representations regarding the content or accuracy of materials on such External Websites.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t8. INDEMNIFICATION. &nbsp;You agree to defend, indemnify, and hold us and our officers, directors, employees, successors, licensees, service providers, and assignees harmless from and against any claims, actions, or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from your breach of this Agreement or your access to, use, or misuse of the LangYing’scontent, the Site, or the Service. We shall provide notice to you of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit, or proceeding. We reserve the right to assume the exclusive defense and control of any matter that is subject to indemnification under this section. In such case, you agree to cooperate with any reasonable requests assisting our defense of such matter.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t9. INFRINGEMENT NOTIFICATION. We respect the intellectual property rights of others, and require that the people who use the Site do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, please send notifications of the claimed infringement to: Legal Department, LangYing, 19A, No.121, Yanping Road, Jing’an District, Shanghai, China. Notices of the claimed infringement should include the following information: (a) your address, telephone number, and email address; (b) a description of the copyrighted work that you claim has been infringed; (c) a description of where the alleged infringing material is located, with a link if possible; (d) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; (e) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; (f) a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner\'s behalf.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t10. COMPLIANCE WITH APPLICABLE LAWS. &nbsp;We control and operate the Site from our offices in the Peoples Republic of China. We do not represent that materials on the Site are appropriate or available for use in other locations. Persons who choose to access the Site from other locations do so on their own initiative, and are responsible for compliance with local laws, if and to the extent local laws are applicable. All parties to these terms and conditions waive their respective rights to a trial by jury. &nbsp;\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t11. TERMINATION OF THE AGREEMENT. &nbsp;Subject to the terms of the Services Agreement, if applicable, we reserve the right, in our sole discretion, to restrict, suspend, or terminate this Agreement and your access to the Services and/or all or any part of the Site, at any time and for any reason without prior notice or liability.Your access to the Services and/or all or any part of the Siteshall end immediately upon any termination or expiration of this Agreement, and you&nbsp;shall immediately cease any use of the Servicesand/orthe Site upon such termination.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\t12. MISCELLANEOUS. &nbsp;If any provision of this Agreement is found to be invalid by any court having competent jurisdiction or terminated in accordance with the Termination provision above, the invalidity or termination of such provision shall not affect the validity of the following provisions of this Agreement, which shall remain in full force and effect: “Intellectual Property,” “Communications to LangYing” “No Warranties,” “Indemnification,” “Termination of the Agreement,” and “Miscellaneous.” Our failure to act on or enforce any provision of the Agreement shall not be construed as a waiver of that provision or any other provision in this Agreement. No waiver shall be effective against us unless made in writing, and no such waiver shall be construed as a waiver in any other or subsequent instance. Except as expressly agreed by us and you in writing, this Agreement constitutes the entire Agreement between you and us with respect to the subject matter, and supersedes all previous or contemporaneous agreements, whether written or oral, between the parties with respect to the subject matter. The section headings are provided merely for convenience and shall not be given any legal import. This Agreement will inure to the benefit of our successors, assigns, licensees, and sublicensees.\n</p>\n<p class="MsoNormal">\n\t&nbsp;\n</p>\n<p class="MsoNormal">\n\tCopyright 2016 LangYing Education And Technology. All rights reserved.\n</p>\n</div>';});

/**
 * 用户协议
 */

define('term',[
	'text!root-tpl/term.tpl'
], function(
	tpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
           
        },
        events: {

        },
        reset: function(){
            this.$el.html('');
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(user){
            var me = this;
            
            me.$el.html(me._tpl({
               
            })); 
           
        }

    });

    return K;

});


define('text!root-tpl/exercise/main.tpl',[],function () { return '<div class="bg"></div>\n<div class="ui-exercise">\n\t<div class="mask"></div>\n\t<div class="main">\n\t\t<a href="javascript:;" class="btn-toggle-article">\n\t\t\t<i class="icon-linear">&#xe90f;</i>\n\t\t\t查看文章\n\t\t</a>\n\t\t<div class="article-area" style="display:none;">\n\t\t\t<p class="close-articl">\n\t\t\t\t<span class="icon-arrow-duble-right iconfont icon-linear ">\n\t\t\t\t    &#xe90e;\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<div class="main default-skin">\n\t\t\t\t<div class="inner">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="ui-process fix">\n\t\t\t\n\t\t</div>\n\t\t<div class="exercise-area">\n\t\t\t\n\t\t</div>\n\t\t\n\t</div>\n</div>';});


define('text!root-tpl/exercise/reading.tpl',[],function () { return '\n{{~it.list :v:i}}\n<p>\n\t{{~v :val:key}}\n\t<span>{{=val.content}}</span>\n\t{{~}}\n</p>\n{{~}}';});


define('text!root-tpl/exercise/process.tpl',[],function () { return '<div class="txt-area">\n\t<i class="current">{{=it.index}}</i>\n\t/\n\t<i class="total">{{=it.total}}</i>\n</div>\n<div class="process-area">\n\t<div class="bar">\n\t\t<div class="done" style="width:{{=it.index*100/it.total}}%">\n\t\t\t<i class="icon-done"></i>\n\t\t</div>\n\t</div>\n\n</div>';});

/**
 * 题型基类
 */

define('exercise/base',[
	'text!root-tpl/exercise/main.tpl',
    'text!root-tpl/exercise/reading.tpl',
    'text!root-tpl/exercise/process.tpl',
    '../model',
    'root-common/util',
    'root-common/module/scrollbar'
], function(
	mainTpl,
    readingTpl,
    processTpl,
    Model,
    util
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            
            me.mainTpl = doT.template(mainTpl);
            me.readingTpl = doT.template(readingTpl);
            me.processTpl = doT.template(processTpl);
            me.bookId = config.bookId;
            me.book = null;
            me.index = config.index;
            me.total = 0;
            me.type = 2;
            me.data = null; //习题列表
            me.model = new Model;
            me.model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me),
                'getExercises': $.proxy(me.getExercises, me),
                'saveExercise': $.proxy(me.saveExercise, me)
            });
            me.model.getArticleInfo({
                data: {
                    bookId: me.bookId
                }
            });
        },
        events: {
            'click .btn-toggle-article': 'toggleArticle',
            'click .icon-arrow-duble-right': 'closeArticle',
            'click .btn-next': 'next'
        },
        renderMain: function(){
        	var me = this;
        	me.$el.html(me.mainTpl({

        	}));
        },
        renderProcess: function(res){
            var me = this;
            
            $('.ui-process', me.$el).html(me.processTpl({
                index: me.index+1,
                total: me.total
            }));
        },
        reset: function(){
            this.$el.html('');
            this.undelegateEvents();
        },
        toggleArticle: function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            $('.article-area', me.$el).toggle();
            $('.article-area .main', me.$el).customScrollbar({
                updateOnWindowResize: true
            });
        },
        closeArticle: function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            $('.article-area', me.$el).hide();
            $('.article-area .main', me.$el).customScrollbar({
                updateOnWindowResize: false
            });
        },
        /**
         * [获取文章信息]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getArticleInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.book = res;
                    me.model.getExercises({
                        data: {
                            questionStyleId: me.type,
                            bookId: me.bookId
                        }
                    });
                    
                }
            }, data, xhr);
        },
        /**
         * [获取习题列表]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getExercises: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.total = res.exercisesCount;
                    
                    me.data = res;
                    if(res.exercisesList[me.index].doStatus == 1){
                        var needGo = me.goNext();

                        if(needGo){
                            return;
                        }
                    }
                    me.renderMain();
                    me.renderReading(me.book);
                    me.renderProcess(res);
                    me.render();
                    
                }
            }, data, xhr);
        },
        /**
         * [保存习题答案]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        saveExercise: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                me.data.exercisesList[me.index].doStatus = 1;
                // me.goNext();
            }, data, xhr);
        },
        renderReading: function(res){
            var me = this;
            $('.article-area .inner', me.$el).html(me.readingTpl({
                list: res.content || []
            }));
            
        },
        /**
         * [进入下一题]
         * @param  {[Int]}  index  [题目索引]
         * @param  {Boolean} isAuto [是否自动检查下一题是否做完]
         */
        goNext: function(index, isAuto){

            var me = this;
            var result = false;
            window.audioPlay.click();
            index = index ? index : me.index;
            var item = me.data.exercisesList[index];
            if(index >= me.total - 1 && item.doStatus == 1){
                window.location.href = '#testResult/'+me.bookId+'/'+me.type;
            }else{
                if(item.doStatus == 1){
                    me.goNext(index+1, true);
                }else{
                    result = true;
                    index = isAuto ? index : ++index;
                    window.location.href = '#exercise/'+me.bookId+'/'+index;
                }
                
            }
            return result;
        }
    });

    return K;

});

define('text!root-tpl/exercise/choice.tpl',[],function () { return '{{\n\tvar right = null;\n\tvar index = null;\n}}\n\n<div class="ui-choice">\n\t<div class="title">\n\t\tChoose the best answer to the questions below.\n\t</div>\n\n\t<div class="question-area" data-id="{{=it.exercise.questionId}}" data-userdoid="{{=it.exercise.userDoquestionId}}">\n\t\t<div class="line"></div>\n\t\t<div class="content">\n\t\t\t<div class="row-title">Question:</div>\n\t\t\t<div class="question">{{=it.title}}</div>\n\t\t\t<div class="row-title">Option:</div>\n\t\t\t<ul class="option-list">\n\t\t\t\t{{~it.list :v:i}}\n\t\t\t\t{{ if($.trim(v.questionOption)){ }}\n\t\t\t\t<li class="option-item \n\t\t\t\t{{ if(i == it.list.length - 1){ }}\n\t\t\t\toption-item-last \n\t\t\t\t{{ } }}\n\t\t\t\t{{ if(v.isRight){ }}\n\t\t\t\toption-right \n\t\t\t\t{{ }else{ }}\n\t\t\t\toption-error \n\t\t\t\t{{ } }}\n\t\t\t\t"  data-id="{{=v.questionOptionId}}">\n\t\t\t\t\t{{=it.options[i]}}. {{=v.questionOption}}\n\t\t\t\t\t<i class="icon-solid icon-result icon-error">&#xe915;</i>\n\t\t\t\t\t<i class="icon-solid icon-result icon-right">&#xe916;</i>\n\t\t\t\t</li>\n\n\t\t\t\t{{ \n\t\t\t\t\tif(v.isRight){\n\t\t\t\t\t\tright = v;\n\t\t\t\t\t\tindex = i;\n\t\t\t\t\t}\n\t\t\t\t}}\n\t\t\t\t{{ } }}\n\t\t\t\t{{~}}\n\t\t\t</ul>\n\t\t</div>\n\t\t<a class="btn btn-check btn-disable" href="javascript:;">检&nbsp;&nbsp;查</a>\n\t</div>\n\n\t<div class="answer-area" style="display:none;">\n\t\t<div class="line"></div>\n\t\t<div class="row-title">The Answer:</div>\n\t\t<div class="answer">\n\t\t\t<p>{{=it.options[index]}}. {{=right.questionOption}}</p>\n\t\t</div>\n\t\t<a class="btn btn-next" href="javascript:;">继&nbsp;&nbsp;续</a>\n\t</div>\n</div>';});

/**
 * 单选题
 */

define('exercise/choice',[
	'./base',
	'text!root-tpl/exercise/choice.tpl',
    'root-common/util'
], function(
	Base,
	tpl,
    util
) {

    var options = 'ABCDEFGH'.split('');

    var K = Base.extend({
        initialize: function (config) {
        	var me = this;

        	Base.prototype.initialize.apply(this, arguments);
            me.events = $.extend(true, {}, Base.prototype.events, me.events);
            me.delegateEvents();
        	me._tpl = doT.template(tpl);
        	me.type = 2; //选择题类型2
            me.hasChecked = false; //是否已经检查
        },
        events: {
            'click .option-item': '_select',
            'click .btn-check': '_checkAnswer'
        },
        render: function(){
            var me = this;
            try{
                var exercise = me.data.exercisesList[me.index];
                var list = exercise.exercisesOptionInfoL;
                var title = exercise.question;
                for(var i = 0;i < list.length; i++){
                    if(!$.trim(list[i].questionOption)){
                        list.splice(i, 1);
                        i--;
                    }
                }
                $('.exercise-area', me.$el).html(me._tpl({
                    title: title,
                    list: list || [],
                    exercise: exercise,
                    options: options
                }));
            }catch(e){
                util.errorTip('第'+(me.index+1)+'道题目不存在', true);
            }
        },
        _select: function(e){
            e.preventDefault();
            var me = this;
            if(!me.hasChecked){
                $('.item-selected', me.$el).removeClass('item-selected');
                $(e.currentTarget).addClass('item-selected');
                $('.btn-check', me.$el).removeClass('btn-disable');
            }
            
        },
        _checkAnswer: function(e){
            e.preventDefault();
            var me = this;
            if($(e.currentTarget).hasClass('btn-disable')){
                return;
            }
            me.hasChecked = true;
            $('.question-area', me.$el).addClass('question-done');
            $('.answer-area', me.$el).show();
            var $target = $('.item-selected', me.$el);
            var questionId = $('.question-area', me.$el).data('userdoid');
            var optionId = $target.data('id');
            if($target.hasClass('option-right')){
                window.audioPlay.right();
            }else{
                window.audioPlay.error();
            }
            if(me.index <= me.total - 1){
                me.model.saveExercise({
                    data: {
                        userDoquestionId: questionId,
                        userOptionId: optionId
                    }
                });
            }
        },
        next: function (e) {
            this.goNext();
        }
    });

    return K;

});
define('exercise/factory',[
	'./choice'
], function(
    Choice
) {

    return {
        list: [],
        init: function(options){
            if(!options || !options.type){
                return null;
            }
            var type = options.type;
            var exercise = null;
            switch(type){
                case 'choice':
                    exercise = new Choice(options);
                    break;
            };
            if(exercise){
                this.list.push(exercise);
            }
            
            return exercise;
        },
        reset: function(){
            $.each(this.list, function(i, v){
                v.reset();
            });
            this.list = [];
        }
    }

});
/**
 * 初始化习题
 */

define('exercise/main',[
	'./factory'
], function(
	factory
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            
        },
        /**
         * [初始化]
         * @param  {[String]} id    [书本id]
         * @param  {[Int]} index [题目索引]
         */
        init: function(id, index){
            var me = this;
            index = parseInt(index);
            factory.init({
                el: me.el,
                type: 'choice',
                bookId: id,
                index: index
            });
        },
        reset: function(){
            factory.reset();
        }
    });

    return K;

});

define('text!root-tpl/exercise/header.tpl',[],function () { return '<div class="inner">\n\t<div class="mask"></div>\n\t<div class="main">\n\t\t<a class="btn-back" href="javascript:;">\n\t\t\t<i class="icon-solid">&#xe913;</i>返回\n\t\t</a>\n\t\t<div class="book-area">\n\t\t\t<div class="img">\n\t\t\t\t<img src="{{=window.imgPath}}/{{=it.book.imgurl}}" />\n\t\t\t</div>\n\t\t\t<div class="txt">\n\t\t\t\t{{=it.book.booktitle}}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';});

/**
 * 习题头部
 */

define('exercise/header',[
	'text!root-tpl/exercise/header.tpl',
    '../model',
    'root-common/util'
], function(
	tpl,
    Model,
    util
) {

    var K = Backbone.View.extend({
        initialize: function (config) {
            var me = this;
            me.tpl = doT.template(tpl);
            me._model = new Model;
            me._model.bind({
                'getArticleInfo': $.proxy(me.getArticleInfo, me)
            });
            me.returnBack = null;
            me.booId = null;
        },
        init: function(id,_index){
            var me = this;
            me.booId = id;
            this._model.getArticleInfo({
                data: {
                    bookId: id
                }
            });
            me.returnBack = _index;
        },
        reset: function(){
            this.$el.html('');
        },
        events:{
            'click .btn-back':'btnBck'
        },
        /*返回*/
        btnBck:function(e){
            e.preventDefault();
            var me = this;
            window.audioPlay.click();
            if(me.returnBack == 1){
                window.location.href = '#bookNav/' + me.booId;    
            }else{
                window.location.href = '#booklist';    
            }
            
        },
        /**
         * [获取文章信息]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        getArticleInfo: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    me.$el.html(me.tpl({
                        book: res
                    }));
                }
            }, data, xhr);
        },
        animLeft: function(){
            var me = this;
            $('.inner', me.$el).stop().animate({
                left: '-100%'
            }, 'slow', function(){
                me.reset();
            });
        }
    });

    return K;

});

define('text!root-tpl/recommend/main.tpl',[],function () { return '<div class="bg"></div>\n<div class="main">\n\n\t<div class="mask"></div>\n\t<div class="content">\n\t\t<img src="./images/recommend-grade.gif" class="introduction">\n\t\t<div class="selection-area">\n\t\t\t<div class="header">\n\t\t\t\t<img src="./images/bride.png" height="65" width="73">\n\t\t\t\t<span>你好，同学！在阅读以前，请选择所在的年级哦~！我们会给你推荐合适的读物的！</span>\n\t\t\t</div>\n\t\t\t<div class="grade-list">\n\t\t\t\t<div class="grade-slider">\n\t\t\t\t\t<input type="text" class="input-grade" value="" name="range" />\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<ul class="fix">\n\t\t\t\t\t<li class="on active" data-id="G1"><p class="sanjiao"></p>一年级 <i>G1</i></li>\n\t\t\t\t\t<li data-id="G2"><p class="sanjiao"></p>二年级 <i>G2</i></li>\n\t\t\t\t\t<li data-id="G3"><p class="sanjiao"></p>三年级 <i>G3</i></li>\n\t\t\t\t\t<li data-id="G4"><p class="sanjiao"></p>四年级 <i>G4</i></li>\n\t\t\t\t\t<li data-id="G5"><p class="sanjiao"></p>五年级 <i>G5</i></li>\n\t\t\t\t\t<li data-id="G6" class="wide">\n\t\t\t\t\t\t<p class="sanjiao"></p>\n\t\t\t\t\t\t<div class="row">六年级 <i>G6</i></div>\n\t\t\t\t\t\t<div class="row"><em class="top">（</em>预初<em class="bottom">）</em></div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li data-id="G7" class="chuyi"><p class="sanjiao"></p>初<br><br>一 <i>G7</i></li>\n\t\t\t\t\t<li data-id="G8"><p class="sanjiao"></p>初<br><br>二 <i>G8</i></li>\n\t\t\t\t\t<li data-id="G9"><p class="sanjiao"></p>初<br><br>三 <i>G9</i></li>\n\t\t\t\t\t<li data-id="G10"><p class="sanjiao"></p>高<br><br>一 <i>G10</i></li>\n\t\t\t\t\t<li data-id="G11"><p class="sanjiao"></p>高<br><br>二 <i>G11</i></li>\n\t\t\t\t\t<li data-id="G12"><p class="sanjiao"></p>高<br><br>三 <i>G12</i></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<a class="btn btn-confirm" href="javascript:;">确&nbsp;&nbsp;定</a>\n\t\t</div>\n\t</div>\n</div>';});


define('text!root-tpl/recommend/grade-list.tpl',[],function () { return '{{~it.list :v:i}}\n{{\n\tvar name = v.grade_name;\n\tvar splitIndex = name.indexOf(\'（\');\n}}\n{{ if(splitIndex !== -1){ }}\n<li data-id="{{=v.grade_id}}" class="wide">\n\t{{\n\t\tvar desc = name.slice(splitIndex+1, name.length-1);\n\t\tname = name.slice(0, splitIndex);\n\t}}\n\t<p class="sanjiao"></p>\n\t<div class="row">{{=name}} <i>{{=window.gradeMap[v.grade_id]}}</i></div>\n\t<div class="row"><em class="top">（</em>{{=desc}}<em class="bottom">）</em></div></li>\n{{ }else{ }}\n<li data-id="{{=v.grade_id}}" class="grade-{{=v.grade_id}}"><p class="sanjiao"></p><span>{{=name}}</span> <i>{{=window.gradeMap[v.grade_id]}}</i></li>\n{{ } }}\n\n{{~}}';});

// Ion.RangeSlider
// version 2.1.4 Build: 355
// © Denis Ineshin, 2016
// https://github.com/IonDen
//
// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
// GitHub page:     https://github.com/IonDen/ion.rangeSlider
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================

define('root-common/module/dragval',[],function(){
    
    "use strict";

    // =================================================================================================================
    // Service

    var plugin_count = 0;

    // IE8 fix
    var is_old_ie = (function () {
        var n = navigator.userAgent,
            r = /msie\s\d+/i,
            v;
        if (n.search(r) > 0) {
            v = r.exec(n).toString();
            v = v.split(" ")[1];
            if (v < 9) {
                $("html").addClass("lt-ie9");
                return true;
            }
        }
        return false;
    } ());
    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {

            var target = this;
            var slice = [].slice;

            if (typeof target != "function") {
                throw new TypeError();
            }

            var args = slice.call(arguments, 1),
                bound = function () {

                    if (this instanceof bound) {

                        var F = function(){};
                        F.prototype = target.prototype;
                        var self = new F();

                        var result = target.apply(
                            self,
                            args.concat(slice.call(arguments))
                        );
                        if (Object(result) === result) {
                            return result;
                        }
                        return self;

                    } else {

                        return target.apply(
                            that,
                            args.concat(slice.call(arguments))
                        );

                    }

                };

            return bound;
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }



    // =================================================================================================================
    // Template

    var base_html =
        '<span class="irs">' +
        '<span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span>' +
        '<span class="irs-min">0</span><span class="irs-max">1</span>' +
        '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
        '</span>' +
        '<span class="irs-grid"></span>' +
        '<span class="irs-bar"></span>';

    var single_html =
        '<span class="irs-bar-edge"></span>' +
        '<span class="irs-shadow shadow-single"></span>' +
        '<span class="irs-slider single"></span>';

    var double_html =
        '<span class="irs-shadow shadow-from"></span>' +
        '<span class="irs-shadow shadow-to"></span>' +
        '<span class="irs-slider from"></span>' +
        '<span class="irs-slider to"></span>';

    var disable_html =
        '<span class="irs-disable-mask"></span>';



    // =================================================================================================================
    // Core

    /**
     * Main plugin constructor
     *
     * @param input {Object} link to base input element
     * @param options {Object} slider config
     * @param plugin_count {Number}
     * @constructor
     */
    var IonRangeSlider = function (input, options, plugin_count) {
        this.VERSION = "2.1.4";
        this.input = input;
        this.plugin_count = plugin_count;
        this.current_plugin = 0;
        this.calc_count = 0;
        this.update_tm = 0;
        this.old_from = 0;
        this.old_to = 0;
        this.old_min_interval = null;
        this.raf_id = null;
        this.dragging = false;
        this.force_redraw = false;
        this.no_diapason = false;
        this.is_key = false;
        this.is_update = false;
        this.is_start = true;
        this.is_finish = false;
        this.is_active = false;
        this.is_resize = false;
        this.is_click = false;

        // cache for links to all DOM elements
        this.$cache = {
            win: $(window),
            body: $(document.body),
            input: $(input),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        };

        // storage for measure variables
        this.coords = {
            // left
            x_gap: 0,
            x_pointer: 0,

            // width
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,

            // percents
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,

            // grid
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };

        // storage for labels measure variables
        this.labels = {
            // width
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,

            // percents
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };



        /**
         * get and validate config
         */
        var $inp = this.$cache.input,
            val = $inp.prop("value"),
            config, config_from_data, prop;

        // default config
        config = {
            type: "single",

            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,

            min_interval: 0,
            max_interval: 0,
            drag_interval: false,

            values: [],
            p_values: [],

            from_fixed: false,
            from_min: null,
            from_max: null,
            from_shadow: false,

            to_fixed: false,
            to_min: null,
            to_max: null,
            to_shadow: false,

            prettify_enabled: true,
            prettify_separator: " ",
            prettify: null,

            force_edges: false,

            keyboard: false,
            keyboard_step: 5,

            grid: false,
            grid_margin: true,
            grid_num: 4,
            grid_snap: false,

            hide_min_max: false,
            hide_from_to: false,

            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: true,
            values_separator: " — ",

            input_values_separator: ";",

            disable: false,

            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        };



        // config from data-attributes extends js config
        config_from_data = {
            type: $inp.data("type"),

            min: $inp.data("min"),
            max: $inp.data("max"),
            from: $inp.data("from"),
            to: $inp.data("to"),
            step: $inp.data("step"),

            min_interval: $inp.data("minInterval"),
            max_interval: $inp.data("maxInterval"),
            drag_interval: $inp.data("dragInterval"),

            values: $inp.data("values"),

            from_fixed: $inp.data("fromFixed"),
            from_min: $inp.data("fromMin"),
            from_max: $inp.data("fromMax"),
            from_shadow: $inp.data("fromShadow"),

            to_fixed: $inp.data("toFixed"),
            to_min: $inp.data("toMin"),
            to_max: $inp.data("toMax"),
            to_shadow: $inp.data("toShadow"),

            prettify_enabled: $inp.data("prettifyEnabled"),
            prettify_separator: $inp.data("prettifySeparator"),

            force_edges: $inp.data("forceEdges"),

            keyboard: $inp.data("keyboard"),
            keyboard_step: $inp.data("keyboardStep"),

            grid: $inp.data("grid"),
            grid_margin: $inp.data("gridMargin"),
            grid_num: $inp.data("gridNum"),
            grid_snap: $inp.data("gridSnap"),

            hide_min_max: $inp.data("hideMinMax"),
            hide_from_to: $inp.data("hideFromTo"),

            prefix: $inp.data("prefix"),
            postfix: $inp.data("postfix"),
            max_postfix: $inp.data("maxPostfix"),
            decorate_both: $inp.data("decorateBoth"),
            values_separator: $inp.data("valuesSeparator"),

            input_values_separator: $inp.data("inputValuesSeparator"),

            disable: $inp.data("disable")
        };
        config_from_data.values = config_from_data.values && config_from_data.values.split(",");

        for (prop in config_from_data) {
            if (config_from_data.hasOwnProperty(prop)) {
                if (!config_from_data[prop] && config_from_data[prop] !== 0) {
                    delete config_from_data[prop];
                }
            }
        }



        // input value extends default config
        if (val) {
            val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

            if (val[0] && val[0] == +val[0]) {
                val[0] = +val[0];
            }
            if (val[1] && val[1] == +val[1]) {
                val[1] = +val[1];
            }

            if (options && options.values && options.values.length) {
                config.from = val[0] && options.values.indexOf(val[0]);
                config.to = val[1] && options.values.indexOf(val[1]);
            } else {
                config.from = val[0] && +val[0];
                config.to = val[1] && +val[1];
            }
        }



        // js config extends default config
        $.extend(config, options);


        // data config extends config
        $.extend(config, config_from_data);
        this.options = config;



        // validate config, to be sure that all data types are correct
        this.validate();



        // default result object, returned to callbacks
        this.result = {
            input: this.$cache.input,
            slider: null,

            min: this.options.min,
            max: this.options.max,

            from: this.options.from,
            from_percent: 0,
            from_value: null,

            to: this.options.to,
            to_percent: 0,
            to_value: null
        };



        this.init();
    };

    IonRangeSlider.prototype = {

        /**
         * Starts or updates the plugin instance
         *
         * @param is_update {boolean}
         */
        init: function (is_update) {
            this.no_diapason = false;
            this.coords.p_step = this.convertToPercent(this.options.step, true);

            this.target = "base";

            this.toggleInput();
            this.append();
            this.setMinMax();

            if (is_update) {
                this.force_redraw = true;
                this.calc(true);

                // callbacks called
                this.callOnUpdate();
            } else {
                this.force_redraw = true;
                this.calc(true);

                // callbacks called
                this.callOnStart();
            }

            this.updateScene();
        },

        /**
         * Appends slider template to a DOM
         */
        append: function () {
            var container_html = '<span class="irs js-irs-' + this.plugin_count + '"></span>';
            this.$cache.input.before(container_html);
            this.$cache.input.prop("readonly", true);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;

            this.$cache.cont.html(base_html);
            this.$cache.rs = this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");

            if (this.options.type === "single") {
                this.$cache.cont.append(single_html);
                this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
                this.$cache.s_single = this.$cache.cont.find(".single");
                this.$cache.from[0].style.visibility = "hidden";
                this.$cache.to[0].style.visibility = "hidden";
                this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
            } else {
                this.$cache.cont.append(double_html);
                this.$cache.s_from = this.$cache.cont.find(".from");
                this.$cache.s_to = this.$cache.cont.find(".to");
                this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
                this.$cache.shad_to = this.$cache.cont.find(".shadow-to");

                this.setTopHandler();
            }

            if (this.options.hide_from_to) {
                this.$cache.from[0].style.display = "none";
                this.$cache.to[0].style.display = "none";
                this.$cache.single[0].style.display = "none";
            }

            this.appendGrid();

            if (this.options.disable) {
                this.appendDisableMask();
                this.$cache.input[0].disabled = true;
            } else {
                this.$cache.cont.removeClass("irs-disabled");
                this.$cache.input[0].disabled = false;
                this.bindEvents();
            }

            if (this.options.drag_interval) {
                this.$cache.bar[0].style.cursor = "ew-resize";
            }
        },

        /**
         * Determine which handler has a priority
         * works only for double slider type
         */
        setTopHandler: function () {
            var min = this.options.min,
                max = this.options.max,
                from = this.options.from,
                to = this.options.to;

            if (from > min && to === max) {
                this.$cache.s_from.addClass("type_last");
            } else if (to < max) {
                this.$cache.s_to.addClass("type_last");
            }
        },

        /**
         * Determine which handles was clicked last
         * and which handler should have hover effect
         *
         * @param target {String}
         */
        changeLevel: function (target) {
            switch (target) {
                case "single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    break;
                case "from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.$cache.s_from.addClass("state_hover");
                    this.$cache.s_from.addClass("type_last");
                    this.$cache.s_to.removeClass("type_last");
                    break;
                case "to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                    this.$cache.s_to.addClass("state_hover");
                    this.$cache.s_to.addClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
                case "both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
                    this.$cache.s_to.removeClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
            }
        },

        /**
         * Then slider is disabled
         * appends extra layer with opacity
         */
        appendDisableMask: function () {
            this.$cache.cont.append(disable_html);
            this.$cache.cont.addClass("irs-disabled");
        },

        /**
         * Remove slider instance
         * and ubind all events
         */
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;

            this.$cache.line.off("keydown.irs_" + this.plugin_count);

            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);

            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);

            if (is_old_ie) {
                this.$cache.body.off("mouseup.irs_" + this.plugin_count);
                this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
            }

            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];

            cancelAnimationFrame(this.raf_id);
        },

        /**
         * bind all slider events
         */
        bindEvents: function () {
            if (this.no_diapason) {
                return;
            }

            this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
            this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));

            this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
            this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));

            this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

            if (this.options.drag_interval && this.options.type === "double") {
                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
            } else {
                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            }

            if (this.options.type === "single") {
                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            } else {
                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));

                this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
            }

            if (this.options.keyboard) {
                this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
            }

            if (is_old_ie) {
                this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
            }
        },

        /**
         * Mousemove or touchmove
         * only for handlers
         *
         * @param e {Object} event object
         */
        pointerMove: function (e) {
            if (!this.dragging) {
                return;
            }

            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            this.coords.x_pointer = x - this.coords.x_gap;

            this.calc();
        },

        /**
         * Mouseup or touchend
         * only for handlers
         *
         * @param e {Object} event object
         */
        pointerUp: function (e) {
            if (this.current_plugin !== this.plugin_count) {
                return;
            }

            if (this.is_active) {
                this.is_active = false;
            } else {
                return;
            }

            this.$cache.cont.find(".state_hover").removeClass("state_hover");

            this.force_redraw = true;

            if (is_old_ie) {
                $("*").prop("unselectable", false);
            }

            this.updateScene();
            this.restoreOriginalMinInterval();

            // callbacks call
            if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
                this.is_finish = true;
                this.callOnFinish();
            }
            
            this.dragging = false;
        },

        /**
         * Mousedown or touchstart
         * only for handlers
         *
         * @param target {String|null}
         * @param e {Object} event object
         */
        pointerDown: function (target, e) {
            e.preventDefault();
            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            if (e.button === 2) {
                return;
            }

            if (target === "both") {
                this.setTempMinInterval();
            }

            if (!target) {
                target = this.target;
            }

            this.current_plugin = this.plugin_count;
            this.target = target;

            this.is_active = true;
            this.dragging = true;

            this.coords.x_gap = this.$cache.rs.offset().left;
            this.coords.x_pointer = x - this.coords.x_gap;

            this.calcPointerPercent();
            this.changeLevel(target);

            if (is_old_ie) {
                $("*").prop("unselectable", true);
            }

            this.$cache.line.trigger("focus");

            this.updateScene();
        },

        /**
         * Mousedown or touchstart
         * for other slider elements, like diapason line
         *
         * @param target {String}
         * @param e {Object} event object
         */
        pointerClick: function (target, e) {
            e.preventDefault();
            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            if (e.button === 2) {
                return;
            }

            this.current_plugin = this.plugin_count;
            this.target = target;

            this.is_click = true;
            this.coords.x_gap = this.$cache.rs.offset().left;
            this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();

            this.force_redraw = true;
            this.calc();

            this.$cache.line.trigger("focus");
        },

        /**
         * Keyborard controls for focused slider
         *
         * @param target {String}
         * @param e {Object} event object
         * @returns {boolean|undefined}
         */
        key: function (target, e) {
            if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                return;
            }

            switch (e.which) {
                case 83: // W
                case 65: // A
                case 40: // DOWN
                case 37: // LEFT
                    e.preventDefault();
                    this.moveByKey(false);
                    break;

                case 87: // S
                case 68: // D
                case 38: // UP
                case 39: // RIGHT
                    e.preventDefault();
                    this.moveByKey(true);
                    break;
            }

            return true;
        },

        /**
         * Move by key. Beta
         * @todo refactor than have plenty of time
         *
         * @param right {boolean} direction to move
         */
        moveByKey: function (right) {
            var p = this.coords.p_pointer;

            if (right) {
                p += this.options.keyboard_step;
            } else {
                p -= this.options.keyboard_step;
            }

            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
            this.is_key = true;
            this.calc();
        },

        /**
         * Set visibility and content
         * of Min and Max labels
         */
        setMinMax: function () {
            if (!this.options) {
                return;
            }

            if (this.options.hide_min_max) {
                this.$cache.min[0].style.display = "none";
                this.$cache.max[0].style.display = "none";
                return;
            }

            if (this.options.values.length) {
                this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
                this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
            } else {
                this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min));
                this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max));
            }

            this.labels.w_min = this.$cache.min.outerWidth(false);
            this.labels.w_max = this.$cache.max.outerWidth(false);
        },

        /**
         * Then dragging interval, prevent interval collapsing
         * using min_interval option
         */
        setTempMinInterval: function () {
            var interval = this.result.to - this.result.from;

            if (this.old_min_interval === null) {
                this.old_min_interval = this.options.min_interval;
            }

            this.options.min_interval = interval;
        },

        /**
         * Restore min_interval option to original
         */
        restoreOriginalMinInterval: function () {
            if (this.old_min_interval !== null) {
                this.options.min_interval = this.old_min_interval;
                this.old_min_interval = null;
            }
        },



        // =============================================================================================================
        // Calculations

        /**
         * All calculations and measures start here
         *
         * @param update {boolean=}
         */
        calc: function (update) {
            if (!this.options) {
                return;
            }

            this.calc_count++;

            if (this.calc_count === 10 || update) {
                this.calc_count = 0;
                this.coords.w_rs = this.$cache.rs.outerWidth(false);

                this.calcHandlePercent();
            }

            if (!this.coords.w_rs) {
                return;
            }

            this.calcPointerPercent();
            var handle_x = this.getHandleX();

            if (this.target === "click") {
                this.coords.p_gap = this.coords.p_handle / 2;
                handle_x = this.getHandleX();

                if (this.options.drag_interval) {
                    this.target = "both_one";
                } else {
                    this.target = this.chooseHandle(handle_x);
                }
            }

            switch (this.target) {
                case "base":
                    var w = (this.options.max - this.options.min) / 100,
                        f = (this.result.from - this.options.min) / w,
                        t = (this.result.to - this.options.min) / w;

                    this.coords.p_single_real = this.toFixed(f);
                    this.coords.p_from_real = this.toFixed(f);
                    this.coords.p_to_real = this.toFixed(t);

                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);

                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    this.target = null;

                    break;

                case "single":
                    if (this.options.from_fixed) {
                        break;
                    }

                    this.coords.p_single_real = this.convertToRealPercent(handle_x);
                    this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);

                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);

                    break;

                case "from":
                    if (this.options.from_fixed) {
                        break;
                    }

                    this.coords.p_from_real = this.convertToRealPercent(handle_x);
                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                    if (this.coords.p_from_real > this.coords.p_to_real) {
                        this.coords.p_from_real = this.coords.p_to_real;
                    }
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                    this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");

                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    break;

                case "to":
                    if (this.options.to_fixed) {
                        break;
                    }

                    this.coords.p_to_real = this.convertToRealPercent(handle_x);
                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                    if (this.coords.p_to_real < this.coords.p_from_real) {
                        this.coords.p_to_real = this.coords.p_from_real;
                    }
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                    this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");

                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;

                case "both":
                    if (this.options.from_fixed || this.options.to_fixed) {
                        break;
                    }

                    handle_x = this.toFixed(handle_x + (this.coords.p_handle * 0.1));

                    this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;

                case "both_one":
                    if (this.options.from_fixed || this.options.to_fixed) {
                        break;
                    }

                    var real_x = this.convertToRealPercent(handle_x),
                        from = this.result.from_percent,
                        to = this.result.to_percent,
                        full = to - from,
                        half = full / 2,
                        new_from = real_x - half,
                        new_to = real_x + half;

                    if (new_from < 0) {
                        new_from = 0;
                        new_to = new_from + full;
                    }

                    if (new_to > 100) {
                        new_to = 100;
                        new_from = new_to - full;
                    }

                    this.coords.p_from_real = this.calcWithStep(new_from);
                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                    this.coords.p_to_real = this.calcWithStep(new_to);
                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                    break;
            }

            if (this.options.type === "single") {
                this.coords.p_bar_x = (this.coords.p_handle / 2);
                this.coords.p_bar_w = this.coords.p_single_fake;

                this.result.from_percent = this.coords.p_single_real;
                this.result.from = this.convertToValue(this.coords.p_single_real);

                if (this.options.values.length) {
                    this.result.from_value = this.options.values[this.result.from];
                }
            } else {
                this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + (this.coords.p_handle / 2));
                this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);

                this.result.from_percent = this.coords.p_from_real;
                this.result.from = this.convertToValue(this.coords.p_from_real);
                this.result.to_percent = this.coords.p_to_real;
                this.result.to = this.convertToValue(this.coords.p_to_real);

                if (this.options.values.length) {
                    this.result.from_value = this.options.values[this.result.from];
                    this.result.to_value = this.options.values[this.result.to];
                }
            }

            this.calcMinMax();
            this.calcLabels();
        },


        /**
         * calculates pointer X in percent
         */
        calcPointerPercent: function () {
            if (!this.coords.w_rs) {
                this.coords.p_pointer = 0;
                return;
            }

            if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)  ) {
                this.coords.x_pointer = 0;
            } else if (this.coords.x_pointer > this.coords.w_rs) {
                this.coords.x_pointer = this.coords.w_rs;
            }

            this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
        },

        convertToRealPercent: function (fake) {
            var full = 100 - this.coords.p_handle;
            return fake / full * 100;
        },

        convertToFakePercent: function (real) {
            var full = 100 - this.coords.p_handle;
            return real / 100 * full;
        },

        getHandleX: function () {
            var max = 100 - this.coords.p_handle,
                x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

            if (x < 0) {
                x = 0;
            } else if (x > max) {
                x = max;
            }

            return x;
        },

        calcHandlePercent: function () {
            if (this.options.type === "single") {
                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
            } else {
                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
            }

            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
        },

        /**
         * Find closest handle to pointer click
         *
         * @param real_x {Number}
         * @returns {String}
         */
        chooseHandle: function (real_x) {
            if (this.options.type === "single") {
                return "single";
            } else {
                var m_point = this.coords.p_from_real + ((this.coords.p_to_real - this.coords.p_from_real) / 2);
                if (real_x >= m_point) {
                    return this.options.to_fixed ? "from" : "to";
                } else {
                    return this.options.from_fixed ? "to" : "from";
                }
            }
        },

        /**
         * Measure Min and Max labels width in percent
         */
        calcMinMax: function () {
            if (!this.coords.w_rs) {
                return;
            }

            this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
            this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
        },

        /**
         * Measure labels width and X in percent
         */
        calcLabels: function () {
            if (!this.coords.w_rs || this.options.hide_from_to) {
                return;
            }

            if (this.options.type === "single") {

                this.labels.w_single = this.$cache.single.outerWidth(false);
                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                this.labels.p_single_left = this.coords.p_single_fake + (this.coords.p_handle / 2) - (this.labels.p_single_fake / 2);
                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

            } else {

                this.labels.w_from = this.$cache.from.outerWidth(false);
                this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
                this.labels.p_from_left = this.coords.p_from_fake + (this.coords.p_handle / 2) - (this.labels.p_from_fake / 2);
                this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
                this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);

                this.labels.w_to = this.$cache.to.outerWidth(false);
                this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
                this.labels.p_to_left = this.coords.p_to_fake + (this.coords.p_handle / 2) - (this.labels.p_to_fake / 2);
                this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
                this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);

                this.labels.w_single = this.$cache.single.outerWidth(false);
                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                this.labels.p_single_left = ((this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2) - (this.labels.p_single_fake / 2);
                this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

            }
        },



        // =============================================================================================================
        // Drawings

        /**
         * Main function called in request animation frame
         * to update everything
         */
        updateScene: function () {
            if (this.raf_id) {
                cancelAnimationFrame(this.raf_id);
                this.raf_id = null;
            }

            clearTimeout(this.update_tm);
            this.update_tm = null;

            if (!this.options) {
                return;
            }

            this.drawHandles();

            if (this.is_active) {
                this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
            } else {
                this.update_tm = setTimeout(this.updateScene.bind(this), 300);
            }
        },

        /**
         * Draw handles
         */
        drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(false);

            if (!this.coords.w_rs) {
                return;
            }

            if (this.coords.w_rs !== this.coords.w_rs_old) {
                this.target = "base";
                this.is_resize = true;
            }

            if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
                this.setMinMax();
                this.calc(true);
                this.drawLabels();
                if (this.options.grid) {
                    this.calcGridMargin();
                    this.calcGridLabels();
                }
                this.force_redraw = true;
                this.coords.w_rs_old = this.coords.w_rs;
                this.drawShadow();
            }

            if (!this.coords.w_rs) {
                return;
            }

            if (!this.dragging && !this.force_redraw && !this.is_key) {
                return;
            }

            if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {

                this.drawLabels();

                this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

                if (this.options.type === "single") {
                    this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";

                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";

                    if (this.options.values.length) {
                        this.$cache.input.prop("value", this.result.from_value);
                    } else {
                        this.$cache.input.prop("value", this.result.from);
                    }
                    this.$cache.input.data("from", this.result.from);
                } else {
                    this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                    this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

                    if (this.old_from !== this.result.from || this.force_redraw) {
                        this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                    }
                    if (this.old_to !== this.result.to || this.force_redraw) {
                        this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                    }

                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";

                    if (this.options.values.length) {
                        this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
                    } else {
                        this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
                    }
                    this.$cache.input.data("from", this.result.from);
                    this.$cache.input.data("to", this.result.to);
                }

                if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
                    this.$cache.input.trigger("change");
                }

                this.old_from = this.result.from;
                this.old_to = this.result.to;

                // callbacks call
                if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
                    this.callOnChange();
                }
                if (this.is_key || this.is_click) {
                    this.is_key = false;
                    this.is_click = false;
                    this.callOnFinish();
                }

                this.is_update = false;
                this.is_resize = false;
                this.is_finish = false;
            }

            this.is_start = false;
            this.is_key = false;
            this.is_click = false;
            this.force_redraw = false;
        },

        /**
         * Draw labels
         * measure labels collisions
         * collapse close labels
         */
        drawLabels: function () {
            if (!this.options) {
                return;
            }

            var values_num = this.options.values.length,
                p_values = this.options.p_values,
                text_single,
                text_from,
                text_to;

            if (this.options.hide_from_to) {
                return;
            }

            if (this.options.type === "single") {

                if (values_num) {
                    text_single = this.decorate(p_values[this.result.from]);
                    this.$cache.single.html(text_single);
                } else {
                    text_single = this.decorate(this._prettify(this.result.from), this.result.from);
                    this.$cache.single.html(text_single);
                }

                this.calcLabels();

                if (this.labels.p_single_left < this.labels.p_min + 1) {
                    this.$cache.min[0].style.visibility = "hidden";
                } else {
                    this.$cache.min[0].style.visibility = "visible";
                }

                if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
                    this.$cache.max[0].style.visibility = "hidden";
                } else {
                    this.$cache.max[0].style.visibility = "visible";
                }

            } else {

                if (values_num) {

                    if (this.options.decorate_both) {
                        text_single = this.decorate(p_values[this.result.from]);
                        text_single += this.options.values_separator;
                        text_single += this.decorate(p_values[this.result.to]);
                    } else {
                        text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
                    }
                    text_from = this.decorate(p_values[this.result.from]);
                    text_to = this.decorate(p_values[this.result.to]);

                    this.$cache.single.html(text_single);
                    this.$cache.from.html(text_from);
                    this.$cache.to.html(text_to);

                } else {

                    if (this.options.decorate_both) {
                        text_single = this.decorate(this._prettify(this.result.from), this.result.from);
                        text_single += this.options.values_separator;
                        text_single += this.decorate(this._prettify(this.result.to), this.result.to);
                    } else {
                        text_single = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to);
                    }
                    text_from = this.decorate(this._prettify(this.result.from), this.result.from);
                    text_to = this.decorate(this._prettify(this.result.to), this.result.to);

                    this.$cache.single.html(text_single);
                    this.$cache.from.html(text_from);
                    this.$cache.to.html(text_to);

                }

                this.calcLabels();

                var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                    single_left = this.labels.p_single_left + this.labels.p_single_fake,
                    to_left = this.labels.p_to_left + this.labels.p_to_fake,
                    max = Math.max(single_left, to_left);

                if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
                    this.$cache.from[0].style.visibility = "hidden";
                    this.$cache.to[0].style.visibility = "hidden";
                    this.$cache.single[0].style.visibility = "visible";

                    if (this.result.from === this.result.to) {
                        if (this.target === "from") {
                            this.$cache.from[0].style.visibility = "visible";
                        } else if (this.target === "to") {
                            this.$cache.to[0].style.visibility = "visible";
                        } else if (!this.target) {
                            this.$cache.from[0].style.visibility = "visible";
                        }
                        this.$cache.single[0].style.visibility = "hidden";
                        max = to_left;
                    } else {
                        this.$cache.from[0].style.visibility = "hidden";
                        this.$cache.to[0].style.visibility = "hidden";
                        this.$cache.single[0].style.visibility = "visible";
                        max = Math.max(single_left, to_left);
                    }
                } else {
                    this.$cache.from[0].style.visibility = "visible";
                    this.$cache.to[0].style.visibility = "visible";
                    this.$cache.single[0].style.visibility = "hidden";
                }

                if (min < this.labels.p_min + 1) {
                    this.$cache.min[0].style.visibility = "hidden";
                } else {
                    this.$cache.min[0].style.visibility = "visible";
                }

                if (max > 100 - this.labels.p_max - 1) {
                    this.$cache.max[0].style.visibility = "hidden";
                } else {
                    this.$cache.max[0].style.visibility = "visible";
                }

            }
        },

        /**
         * Draw shadow intervals
         */
        drawShadow: function () {
            var o = this.options,
                c = this.$cache,

                is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
                is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
                is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
                is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),

                from_min,
                from_max,
                to_min,
                to_max;

            if (o.type === "single") {
                if (o.from_shadow && (is_from_min || is_from_max)) {
                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                    from_min = from_min + (this.coords.p_handle / 2);

                    c.shad_single[0].style.display = "block";
                    c.shad_single[0].style.left = from_min + "%";
                    c.shad_single[0].style.width = from_max + "%";
                } else {
                    c.shad_single[0].style.display = "none";
                }
            } else {
                if (o.from_shadow && (is_from_min || is_from_max)) {
                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                    from_min = from_min + (this.coords.p_handle / 2);

                    c.shad_from[0].style.display = "block";
                    c.shad_from[0].style.left = from_min + "%";
                    c.shad_from[0].style.width = from_max + "%";
                } else {
                    c.shad_from[0].style.display = "none";
                }

                if (o.to_shadow && (is_to_min || is_to_max)) {
                    to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
                    to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
                    to_min = this.toFixed(to_min - (this.coords.p_handle / 100 * to_min));
                    to_max = this.toFixed(to_max - (this.coords.p_handle / 100 * to_max));
                    to_min = to_min + (this.coords.p_handle / 2);

                    c.shad_to[0].style.display = "block";
                    c.shad_to[0].style.left = to_min + "%";
                    c.shad_to[0].style.width = to_max + "%";
                } else {
                    c.shad_to[0].style.display = "none";
                }
            }
        },



        // =============================================================================================================
        // Callbacks

        callOnStart: function () {
            if (this.options.onStart && typeof this.options.onStart === "function") {
                this.options.onStart(this.result);
            }
        },
        callOnChange: function () {
            if (this.options.onChange && typeof this.options.onChange === "function") {
                this.options.onChange(this.result);
            }
        },
        callOnFinish: function () {
            if (this.options.onFinish && typeof this.options.onFinish === "function") {
                this.options.onFinish(this.result);
            }
        },
        callOnUpdate: function () {
            if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
                this.options.onUpdate(this.result);
            }
        },



        // =============================================================================================================
        // Service methods

        toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input");
        },

        /**
         * Convert real value to percent
         *
         * @param value {Number} X in real
         * @param no_min {boolean=} don't use min value
         * @returns {Number} X in percent
         */
        convertToPercent: function (value, no_min) {
            var diapason = this.options.max - this.options.min,
                one_percent = diapason / 100,
                val, percent;

            if (!diapason) {
                this.no_diapason = true;
                return 0;
            }

            if (no_min) {
                val = value;
            } else {
                val = value - this.options.min;
            }

            percent = val / one_percent;

            return this.toFixed(percent);
        },

        /**
         * Convert percent to real values
         *
         * @param percent {Number} X in percent
         * @returns {Number} X in real
         */
        convertToValue: function (percent) {
            var min = this.options.min,
                max = this.options.max,
                min_decimals = min.toString().split(".")[1],
                max_decimals = max.toString().split(".")[1],
                min_length, max_length,
                avg_decimals = 0,
                abs = 0;

            if (percent === 0) {
                return this.options.min;
            }
            if (percent === 100) {
                return this.options.max;
            }


            if (min_decimals) {
                min_length = min_decimals.length;
                avg_decimals = min_length;
            }
            if (max_decimals) {
                max_length = max_decimals.length;
                avg_decimals = max_length;
            }
            if (min_length && max_length) {
                avg_decimals = (min_length >= max_length) ? min_length : max_length;
            }

            if (min < 0) {
                abs = Math.abs(min);
                min = +(min + abs).toFixed(avg_decimals);
                max = +(max + abs).toFixed(avg_decimals);
            }

            var number = ((max - min) / 100 * percent) + min,
                string = this.options.step.toString().split(".")[1],
                result;

            if (string) {
                number = +number.toFixed(string.length);
            } else {
                number = number / this.options.step;
                number = number * this.options.step;

                number = +number.toFixed(0);
            }

            if (abs) {
                number -= abs;
            }

            if (string) {
                result = +number.toFixed(string.length);
            } else {
                result = this.toFixed(number);
            }

            if (result < this.options.min) {
                result = this.options.min;
            } else if (result > this.options.max) {
                result = this.options.max;
            }

            return result;
        },

        /**
         * Round percent value with step
         *
         * @param percent {Number}
         * @returns percent {Number} rounded
         */
        calcWithStep: function (percent) {
            var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

            if (rounded > 100) {
                rounded = 100;
            }
            if (percent === 100) {
                rounded = 100;
            }

            return this.toFixed(rounded);
        },

        checkMinInterval: function (p_current, p_next, type) {
            var o = this.options,
                current,
                next;

            if (!o.min_interval) {
                return p_current;
            }

            current = this.convertToValue(p_current);
            next = this.convertToValue(p_next);

            if (type === "from") {

                if (next - current < o.min_interval) {
                    current = next - o.min_interval;
                }

            } else {

                if (current - next < o.min_interval) {
                    current = next + o.min_interval;
                }

            }

            return this.convertToPercent(current);
        },

        checkMaxInterval: function (p_current, p_next, type) {
            var o = this.options,
                current,
                next;

            if (!o.max_interval) {
                return p_current;
            }

            current = this.convertToValue(p_current);
            next = this.convertToValue(p_next);

            if (type === "from") {

                if (next - current > o.max_interval) {
                    current = next - o.max_interval;
                }

            } else {

                if (current - next > o.max_interval) {
                    current = next + o.max_interval;
                }

            }

            return this.convertToPercent(current);
        },

        checkDiapason: function (p_num, min, max) {
            var num = this.convertToValue(p_num),
                o = this.options;

            if (typeof min !== "number") {
                min = o.min;
            }

            if (typeof max !== "number") {
                max = o.max;
            }

            if (num < min) {
                num = min;
            }

            if (num > max) {
                num = max;
            }

            return this.convertToPercent(num);
        },

        toFixed: function (num) {
            num = num.toFixed(9);
            return +num;
        },

        _prettify: function (num) {
            if (!this.options.prettify_enabled) {
                return num;
            }

            if (this.options.prettify && typeof this.options.prettify === "function") {
                return this.options.prettify(num);
            } else {
                return this.prettify(num);
            }
        },

        prettify: function (num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
        },

        checkEdges: function (left, width) {
            if (!this.options.force_edges) {
                return this.toFixed(left);
            }

            if (left < 0) {
                left = 0;
            } else if (left > 100 - width) {
                left = 100 - width;
            }

            return this.toFixed(left);
        },

        validate: function () {
            var o = this.options,
                r = this.result,
                v = o.values,
                vl = v.length,
                value,
                i;

            if (typeof o.min === "string") o.min = +o.min;
            if (typeof o.max === "string") o.max = +o.max;
            if (typeof o.from === "string") o.from = +o.from;
            if (typeof o.to === "string") o.to = +o.to;
            if (typeof o.step === "string") o.step = +o.step;

            if (typeof o.from_min === "string") o.from_min = +o.from_min;
            if (typeof o.from_max === "string") o.from_max = +o.from_max;
            if (typeof o.to_min === "string") o.to_min = +o.to_min;
            if (typeof o.to_max === "string") o.to_max = +o.to_max;

            if (typeof o.keyboard_step === "string") o.keyboard_step = +o.keyboard_step;
            if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

            if (o.max < o.min) {
                o.max = o.min;
            }

            if (vl) {
                o.p_values = [];
                o.min = 0;
                o.max = vl - 1;
                o.step = 1;
                o.grid_num = o.max;
                o.grid_snap = true;


                for (i = 0; i < vl; i++) {
                    value = +v[i];

                    if (!isNaN(value)) {
                        v[i] = value;
                        value = this._prettify(value);
                    } else {
                        value = v[i];
                    }

                    o.p_values.push(value);
                }
            }

            if (typeof o.from !== "number" || isNaN(o.from)) {
                o.from = o.min;
            }

            if (typeof o.to !== "number" || isNaN(o.from)) {
                o.to = o.max;
            }

            if (o.type === "single") {

                if (o.from < o.min) {
                    o.from = o.min;
                }

                if (o.from > o.max) {
                    o.from = o.max;
                }

            } else {

                if (o.from < o.min || o.from > o.max) {
                    o.from = o.min;
                }
                if (o.to > o.max || o.to < o.min) {
                    o.to = o.max;
                }
                if (o.from > o.to) {
                    o.from = o.to;
                }

            }

            if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
                o.step = 1;
            }

            if (typeof o.keyboard_step !== "number" || isNaN(o.keyboard_step) || !o.keyboard_step || o.keyboard_step < 0) {
                o.keyboard_step = 5;
            }

            if (typeof o.from_min === "number" && o.from < o.from_min) {
                o.from = o.from_min;
            }

            if (typeof o.from_max === "number" && o.from > o.from_max) {
                o.from = o.from_max;
            }

            if (typeof o.to_min === "number" && o.to < o.to_min) {
                o.to = o.to_min;
            }

            if (typeof o.to_max === "number" && o.from > o.to_max) {
                o.to = o.to_max;
            }

            if (r) {
                if (r.min !== o.min) {
                    r.min = o.min;
                }

                if (r.max !== o.max) {
                    r.max = o.max;
                }

                if (r.from < r.min || r.from > r.max) {
                    r.from = o.from;
                }

                if (r.to < r.min || r.to > r.max) {
                    r.to = o.to;
                }
            }

            if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
                o.min_interval = 0;
            }

            if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
                o.max_interval = 0;
            }

            if (o.min_interval && o.min_interval > o.max - o.min) {
                o.min_interval = o.max - o.min;
            }

            if (o.max_interval && o.max_interval > o.max - o.min) {
                o.max_interval = o.max - o.min;
            }
        },

        decorate: function (num, original) {
            var decorated = "",
                o = this.options;

            if (o.prefix) {
                decorated += o.prefix;
            }

            decorated += num;

            if (o.max_postfix) {
                if (o.values.length && num === o.p_values[o.max]) {
                    decorated += o.max_postfix;
                    if (o.postfix) {
                        decorated += " ";
                    }
                } else if (original === o.max) {
                    decorated += o.max_postfix;
                    if (o.postfix) {
                        decorated += " ";
                    }
                }
            }

            if (o.postfix) {
                decorated += o.postfix;
            }

            return decorated;
        },

        updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            if (this.options.values) {
                this.result.from_value = this.options.values[this.result.from];
            }
        },

        updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            if (this.options.values) {
                this.result.to_value = this.options.values[this.result.to];
            }
        },

        updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo();
        },


        // =============================================================================================================
        // Grid

        appendGrid: function () {
            if (!this.options.grid) {
                return;
            }

            var o = this.options,
                i, z,

                total = o.max - o.min,
                big_num = o.grid_num,
                big_p = 0,
                big_w = 0,

                small_max = 4,
                local_small_max,
                small_p,
                small_w = 0,

                result,
                html = '';



            this.calcGridMargin();

            if (o.grid_snap) {
                big_num = total / o.step;
                big_p = this.toFixed(o.step / (total / 100));
            } else {
                big_p = this.toFixed(100 / big_num);
            }

            if (big_num > 4) {
                small_max = 3;
            }
            if (big_num > 7) {
                small_max = 2;
            }
            if (big_num > 14) {
                small_max = 1;
            }
            if (big_num > 28) {
                small_max = 0;
            }

            for (i = 0; i < big_num + 1; i++) {
                local_small_max = small_max;

                big_w = this.toFixed(big_p * i);

                if (big_w > 100) {
                    big_w = 100;

                    local_small_max -= 2;
                    if (local_small_max < 0) {
                        local_small_max = 0;
                    }
                }
                this.coords.big[i] = big_w;

                small_p = (big_w - (big_p * (i - 1))) / (local_small_max + 1);

                for (z = 1; z <= local_small_max; z++) {
                    if (big_w === 0) {
                        break;
                    }

                    small_w = this.toFixed(big_w - (small_p * z));

                    html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
                }

                html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';

                result = this.convertToValue(big_w);
                if (o.values.length) {
                    result = o.p_values[result];
                } else {
                    result = this._prettify(result);
                }

                html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
            }
            this.coords.big_num = Math.ceil(big_num + 1);



            this.$cache.cont.addClass("irs-with-grid");
            this.$cache.grid.html(html);
            this.cacheGridLabels();
        },

        cacheGridLabels: function () {
            var $label, i,
                num = this.coords.big_num;

            for (i = 0; i < num; i++) {
                $label = this.$cache.grid.find(".js-grid-text-" + i);
                this.$cache.grid_labels.push($label);
            }

            this.calcGridLabels();
        },

        calcGridLabels: function () {
            var i, label, start = [], finish = [],
                num = this.coords.big_num;

            for (i = 0; i < num; i++) {
                this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
                this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
                this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);

                start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
                finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
            }

            if (this.options.force_edges) {
                if (start[0] < -this.coords.grid_gap) {
                    start[0] = -this.coords.grid_gap;
                    finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);

                    this.coords.big_x[0] = this.coords.grid_gap;
                }

                if (finish[num - 1] > 100 + this.coords.grid_gap) {
                    finish[num - 1] = 100 + this.coords.grid_gap;
                    start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);

                    this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
                }
            }

            this.calcGridCollision(2, start, finish);
            this.calcGridCollision(4, start, finish);

            for (i = 0; i < num; i++) {
                label = this.$cache.grid_labels[i][0];
                label.style.marginLeft = -this.coords.big_x[i] + "%";
            }
        },

        // Collisions Calc Beta
        // TODO: Refactor then have plenty of time
        calcGridCollision: function (step, start, finish) {
            var i, next_i, label,
                num = this.coords.big_num;

            for (i = 0; i < num; i += step) {
                next_i = i + (step / 2);
                if (next_i >= num) {
                    break;
                }

                label = this.$cache.grid_labels[next_i][0];

                if (finish[i] <= start[next_i]) {
                    label.style.visibility = "visible";
                } else {
                    label.style.visibility = "hidden";
                }
            }
        },

        calcGridMargin: function () {
            if (!this.options.grid_margin) {
                return;
            }

            this.coords.w_rs = this.$cache.rs.outerWidth(false);
            if (!this.coords.w_rs) {
                return;
            }

            if (this.options.type === "single") {
                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
            } else {
                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
            }
            this.coords.p_handle = this.toFixed(this.coords.w_handle  / this.coords.w_rs * 100);
            this.coords.grid_gap = this.toFixed((this.coords.p_handle / 2) - 0.1);

            this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
            this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
        },



        // =============================================================================================================
        // Public methods

        update: function (options) {
            if (!this.input) {
                return;
            }

            this.is_update = true;

            this.options.from = this.result.from;
            this.options.to = this.result.to;

            this.options = $.extend(this.options, options);
            this.validate();
            this.updateResult(options);

            this.toggleInput();
            this.remove();
            this.init(true);
        },

        reset: function () {
            if (!this.input) {
                return;
            }

            this.updateResult();
            this.update();
        },

        destroy: function () {
            if (!this.input) {
                return;
            }

            this.toggleInput();
            this.$cache.input.prop("readonly", false);
            $.data(this.input, "ionRangeSlider", null);

            this.remove();
            this.input = null;
            this.options = null;
        }
    };

    $.fn.ionRangeSlider = function (options) {
        return this.each(function() {
            if (!$.data(this, "ionRangeSlider")) {
                $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
            }
        });
    };



    // =================================================================================================================
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

});

/**
 * 
 */

define('recommend/grade',[
	'text!root-tpl/recommend/main.tpl',
    'text!root-tpl/recommend/grade-list.tpl',
    'root-common/util',
    '../model',
    'root-common/module/cookie',
    'root-common/module/dragval'
], function(
	tpl,
    gradeListTpl,
    util,
    Model,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._gradeListTpl = doT.template(gradeListTpl);
            me._model = new Model;
            me._model.bind({
                'setGrade': $.proxy(me.setGrade, me),
                'queryAllGrade': $.proxy(me.queryAllGrade, me)
            });
            me._gradeId = null;
        },
        events: {
           'click .btn-confirm': 'submitGrade'
        },
        reset: function(){
            this.$el.html('');
            this._gradeId = null;
        },
        init: function(id){
            var me = this;
            me.render();
        },
        render: function(){
            var me = this;
            me.$el.html(me._tpl({}));
            me._model.queryAllGrade();
            
        },
        submitGrade: function(){
            var me = this;
            var gradeId = me._gradeId;
            if(gradeId){
                me._model.setGrade({
                    data: {
                        grade_id: gradeId
                    }
                });
            }
        },
        /**
         * [设置年级]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        setGrade: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    cookie('grade_choice', '1');
                    window.location.href = '#booklist';
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
                    me._gradeId = res[0].grade_id;
                    $('.grade-list ul', me.$el).html(me._gradeListTpl({
                        list: res || []
                    }));
                    $('.grade-list li', me.$el).eq(0).addClass('active');
                    $('.input-grade', me.$el).ionRangeSlider({
                        hide_min_max: true,
                        keyboard: true,
                        min: 0,
                        max: 11,
                        type: 'single',
                        step: 1,
                        onChange: function(o){
                            var current = o.from;

                            $('.grade-list li.active', me.$el).removeClass('active');
                            var $current = $('.grade-list li', me.$el).eq(current).addClass('active');
                            me._gradeId = $current.data('id');
                        }
                    });
                    setTimeout(function(){
                        $('.mask, .selection-area', me.$el).show();
                        $('.introduction', me.$el).hide();
                    }, 2500);
                }
            }, data, xhr);
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
	// var testIp = 'www.lyced.com';
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
			window.serviceBase = preUrl + hostname + '/haozuowenapi';
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
	'./module-manager',
	'./sign',
    './signup',
    './phonefind',
    './phone',
    './product',
    './header',
    './reading',
    './booklist',
    './readover',
    './userNew',
    './bookNav',
    './testResult',
    './find-pw',
    './privacy',
    './term',
    './exercise/main',
    './exercise/header',
    './recommend/grade',
    './auto-domain'

], function(
	Router,
	moduleMgr,
	Sign,
    SignUp,
    PhoneFind,
    Phone,
	Product,
    Header,
    Reading,
    BookList,
    ReadOver,
    UserNew,
    BookNav,
    TestResult,
    Findpw,
    Privacy,
    Term,
    ExerciseMain,
    ExerciseHeader,
    Grade
) {

    $.extend($.ajaxSettings, {
        timeout: 30000
    });

    //IE通过域访问数据源
    $.support.cors = true;

    window.audioPlay = {
        click: function(){
            $('.audio-click')[0].play && $('.audio-click')[0].play();
        },
        error: function(){
            $('.audio-error')[0].play && $('.audio-error')[0].play();
        },
        right: function(){
            $('.audio-right')[0].play && $('.audio-right')[0].play();
        },
        completeReading: function(){
            $('.audio-complete-reading')[0].play && $('.audio-complete-reading')[0].play();
        }
    };

    window.resetPage = resetPage;

    window.gradeMap = {
        P1: 'G1',
        P2: 'G2',
        P3: 'G3',
        P4: 'G4',
        P5: 'G5',
        P6: 'G6',
        PS: 'G6',
        M1: 'G7',
        M2: 'G8',
        M3: 'G9',
        H1: 'G10',
        H2: 'G11',
        H3: 'G12'
    };

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

    $.validator.addMethod("isCpw", function (value, element, param) {
        var $form = $(element).closest('form');
        var cpw = $(element).val();
        var pw = $('input[name="pw"]', $form).val();

        return cpw === pw;
    });

    $.validator.addMethod("ispw", function (value, element, param) {
        var reg = /^[a-z0-9_]{6,30}$/g;

        return reg.test($(element).val());
    });
    $.validator.addMethod("isEmail", function (value, element, param) {
        var emailReg = /^([\w-]+)@([\w-]+)\.([\w-]+)$/; 
        var email = $(element).val();
        return emailReg.test(email);
    });

    //路由
	var router = new Router;

    var header = moduleMgr.add(new Header({
        el: '#Header'
    }));

	var sign = moduleMgr.add(new Sign({
    	el: '#SignPage'
    }));

    var signUp = moduleMgr.add(new SignUp({
        el: '#SignUpPage'
    }));

    var PhoneFind = moduleMgr.add(new PhoneFind({
        el: '#PhoneFindPage'
    }));

    var phone = moduleMgr.add(new Phone({
        el: '#PhonePage'
    }));

    var product = moduleMgr.add(new Product({
    	el: '#ProductPage'
    }));

    var reading = moduleMgr.add(new Reading({
        el: '#ReadingPage'
    }));

    var bookList = moduleMgr.add(new BookList({
        el: '#BookListPage'
    }));

    var readOver = moduleMgr.add(new ReadOver({
        el: '#ReadOverPage'
    }));

    var findpw = moduleMgr.add(new Findpw({
        el: '#FindpwPage'
    }));

    var privacy = moduleMgr.add(new Privacy({
        el: '#PrivacyPage'
    }));

    var term = moduleMgr.add(new Term({
        el: '#TermPage'
    }));

    var UserNew = moduleMgr.add(new UserNew({
        el: '#UserPage'
    }));

    var bookNav = moduleMgr.add(new BookNav({
        el: '#BookNavPage'
    }));

    var TestResult = moduleMgr.add(new TestResult({
        el: '#TestResultPage'
    }));
    

    var exerciseMain = moduleMgr.add(new ExerciseMain({
        el: '#ExercisePage'
    }));

    var exerciseHeader = moduleMgr.add(new ExerciseHeader({
        el: '#ExerciseHeader'
    }));

    var grade = moduleMgr.add(new Grade({
        el: '#GradePage'
    }));

	//事件绑定
	router.bind({
		'gotoSign': function(){
			resetPage();
   	     	sign.init();
		},
        'gotoPhone': function(){
            resetPage();
            header.init();
            phone.listenTo(header, 'getUserInfo', $.proxy(phone.getUserInfo, phone));
        },
		'gotoProduct': function(){
			resetPage();
   	     	product.init();
            header.init();
            product.listenTo(header, 'getUserInfo', $.proxy(product.setVideo, product));
		},
        'gotoReading': function(id){
            // resetPage();
            reading.init(id);
            exerciseHeader.stopListening();
            bookNav.stopListening();
            exerciseHeader.listenTo(reading, 'rendered', $.proxy(exerciseHeader.animLeft, exerciseHeader));
            bookNav.listenTo(reading, 'rendered', $.proxy(bookNav.animLeft, bookNav));
        },
        'gotoBookList': function(){
            resetPage();
            bookList.init();
            header.init();
            bookList.listenTo(header, 'getUserInfo', $.proxy(bookList.setUser, bookList));
        },
        'gotoReadOver': function(id){
            resetPage();
            readOver.init(id);
        },

        'gotoInformation': function(){
            resetPage();
            product.init();
            header.init();
            UserNew.init();
        },
        'gotoFindpw': function(){
            resetPage();
            findpw.init();
        },
        'gotoPrivacy': function(){
            resetPage();
            privacy.init();
        },
        'gotoTerm': function(){
            resetPage();
            term.init();
        },
        'gotoSignUp': function(){
            resetPage();
            signUp.init();
        },
        'gotoPhoneFind':function(){
            resetPage();
            PhoneFind.init();
        },
        'gotoExercise':function(id, index){
            resetPage();
            exerciseMain.init(id, index);
            exerciseHeader.init(id,1);
        },
        'gotoBookNav':function(id){
            resetPage();
            bookNav.init(id);
            exerciseHeader.init(id);
        },
        'gotoTestResult':function(id, index){
            resetPage();
            TestResult.init(id, index);
            exerciseHeader.init(id);
        },
        'gotoGrade':function(){
            resetPage();
            header.init();
            grade.init();
        },
        
	});

	/**
     * [还原页面]
     */
    function resetPage(){
        moduleMgr.clear();
    }

    $('body').on({
        'mousedown': function(){
            $('.icon-audio').hide();
        }
    });

    //开启路由
	Backbone.history.start();

});

define("main", function(){});

