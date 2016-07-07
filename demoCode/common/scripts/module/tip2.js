/**
 * @overview tip提示层
 */

define([], function(){
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


