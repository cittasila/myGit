/**
 * @overview 弹层配置、数据、UI管理/弹层类
 * @author Chunjie
 * @version 2015-07-28
 */

define([
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