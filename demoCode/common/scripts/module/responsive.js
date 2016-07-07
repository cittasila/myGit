/**
 * @overview 响应试布局
 */

define(function() {

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

