define('router',[],function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_LOGIN = 'gotoLogin';
    var E_GOTO_ROLE = 'gotoRole';
    var E_GOTO_STUDENT = 'gotoStudent';
    var E_GOTO_TEACHER = 'gotoTeacher';
    var E_GOTO_SIGN = 'gotoSign';


    var K = Backbone.Router.extend({
        routes: {
            "": "gotoSign",
            "role": "gotoRole",
            "student": "gotoStudent",
            "teacher": "gotoTeacher"
        },
        initialize: function(){},
        /**
         * [登陆]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [登录注册]
         */
        gotoSign: function(){
            this.trigger(E_GOTO_SIGN);
        },
        /**
         * [用户绑定]
         */
        gotoRole: function(){
            this.trigger(E_GOTO_ROLE);
        },
        /**
         * [选中学生]
         */
        gotoStudent: function(){
            this.trigger(E_GOTO_STUDENT);
        },
        /**
         * [选中教师]
         */
        gotoTeacher: function(){
            this.trigger(E_GOTO_TEACHER);
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

define('text!root-tpl/main.tpl',[],function () { return '<div class="g-header">\r\n\t<div class="ui-content">\r\n\t\t<div class="">\r\n\t\t\t<div class="logo-youyang">\r\n\t\t\t\t<img src="images/logo-login.png" class="youyang-img" >\r\n\t\t\t</div>\r\n\t\t\t<div class="logo">\r\n\t\t\t\t<img src="images/english_log.png" class="logo-img" >\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="ui-banner">\r\n    <ul>\r\n    \t<li><div class="banner banner1"></div></li>\r\n    \t<li><div class="banner banner2"></div></li>\r\n    </ul>\r\n</div>\r\n\r\n<div class="p-index">\r\n\t<ul class="p-container">\r\n\t\t<li>\r\n\t\t\t<span class="num">1</span>\r\n\t\t\t<span class="empt">&emsp;</span>注册<span class="empt">&emsp;</span>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span class="empt">-&emsp;</span>\r\n\t\t\t<span class="num">2</span>\r\n\t\t\t<span class="empt">&emsp;</span>登录<span class="empt">&emsp;</span>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span class="empt">-&emsp;</span>\r\n\t\t\t<span class="num">3</span>\r\n\t\t\t<span class="empt">&emsp;</span>绑定身份<span class="empt">&emsp;</span>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span class="empt">-&emsp;</span>\r\n\t\t\t<span class="num">4</span>\r\n\t\t\t<span class="empt">&emsp;</span>进入有氧英语写作系统\r\n\t\t</li>\r\n\t</ul>\r\n</div>';});

/**
 *   Unslider
 *   version 2.0
 *   by @idiot and friends
 */
 
define('root-common/module/slider',[
	
], function(
	
) {

	$.Unslider = function(context, options) {
		var self = this;

		//  Create an Unslider reference we can use everywhere
		self._ = 'unslider';

		//  Store our default options in here
		//  Everything will be overwritten by the jQuery plugin though
		self.defaults = {
			//  Should the slider move on its own or only when
			//  you interact with the nav/arrows?
			//  Only accepts boolean true/false.
			autoplay: false,

			//  3 second delay between slides moving, pass
			//  as a number in milliseconds.
			delay: 3000,

			//  Animation speed in millseconds
			speed: 750,

			//  An easing string to use. If you're using Velocity, use a
			//  Velocity string otherwise you can use jQuery/jQ UI options.
			easing: 'swing', // [.42, 0, .58, 1],
			
			//  Does it support keyboard arrows?
			//  Can pass either true or false -
			//  or an object with the keycodes, like so:
			//  {
			//	 prev: 37,
			//	 next: 39
			// }
			//  You can call any internal method name
			//  before the keycode and it'll be called.
			keys: {
				prev: 37,
				next: 39
			},
			
			//  Do you want to generate clickable navigation
			//  to skip to each slide? Accepts boolean true/false or
			//  a callback function per item to generate.
			nav: true,

			//  Should there be left/right arrows to go back/forth?
			//   -> This isn't keyboard support.
			//  Either set true/false, or an object with the HTML
			//  elements for each arrow like below:
			arrows: {
				prev: '<a class="' + self._ + '-arrow prev">Prev</a>',
				next: '<a class="' + self._ + '-arrow next">Next</a>'
			},

			//  How should Unslider animate?
			//  It can do one of the following types:
			//  "fade": each slide fades in to each other
			//  "horizontal": each slide moves from left to right
			//  "vertical": each slide moves from top to bottom
			animation: 'horizontal',

			//  If you don't want to use a list to display your slides,
			//  you can change it here. Not recommended and you'll need
			//  to adjust the CSS accordingly.
			selectors: {
				container: 'ul:first',
				slides: 'li'
			},

			//  Do you want to animate the heights of each slide as
			//  it moves
			animateHeight: false,

			//  Active class for the nav
			activeClass: self._ + '-active',

			//  Have swipe support?
			//  You can set this here with a boolean and always use
			//  initSwipe/destroySwipe later on.
			swipe: true
		};

		//  Set defaults
		self.$context = context;
		self.options = {};

		//  Leave our elements blank for now
		//  Since they get changed by the options, we'll need to
		//  set them in the init method.
		self.$parent = null;
		self.$container = null;
		self.$slides = null;
		self.$nav = null;
		self.$arrows = [];
		
		//  Set our indexes and totals
		self.total = 0;
		self.current = 0;

		//  Generate a specific random ID so we don't dupe events
		self.prefix = self._ + '-';
		self.eventSuffix = '.' + self.prefix + ~~(Math.random() * 2e3);

		//  In case we're going to use the autoplay
		self.interval = null;

		//  Get everything set up innit
		self.init = function(options) {
			//  Set up our options inside here so we can re-init at
			//  any time
			self.options = $.extend({}, self.defaults, options);

			//  Our elements
			self.$container = self.$context.find(self.options.selectors.container).addClass(self.prefix + 'wrap');
			self.$slides = self.$container.children(self.options.selectors.slides);

			//  We'll manually init the container
			self.setup();

			//  We want to keep this script as small as possible
			//  so we'll optimise some checks
			$.each(['nav', 'arrows', 'keys', 'infinite'], function(index, module) {
				self.options[module] && self['init' + $._ucfirst(module)]();
			});

			//  Add swipe support
			if(jQuery.event.special.swipe && self.options.swipe) {
				self.initSwipe();
			}

			//  If autoplay is set to true, call self.start()
			//  to start calling our timeouts
			self.options.autoplay && self.start();

			//  We should be able to recalculate slides at will
			self.calculateSlides();

			//  Listen to a ready event
			self.$context.trigger(self._ + '.ready');

			//  Everyday I'm chainin'
			return self.animate(self.options.index || self.current, 'init');
		};

		self.setup = function() {
			//  Add a CSS hook to the main element
			self.$context.addClass(self.prefix + self.options.animation).wrap('<div class="' + self._ + '" />');
			self.$parent = self.$context.parent('.' + self._);

			//  We need to manually check if the container is absolutely
			//  or relatively positioned
			var position = self.$context.css('position');

			//  If we don't already have a position set, we'll
			//  automatically set it ourselves
			if(position === 'static') {
				self.$context.css('position', 'relative');
			}

			self.$context.css('overflow', 'hidden');
		};

		//  Set up the slide widths to animate with
		//  so the box doesn't float over
		self.calculateSlides = function() {
			self.total = self.$slides.length;

			//  Set the total width
			if(self.options.animation !== 'fade') {
				var prop = 'width';

				if(self.options.animation === 'vertical') {
					prop = 'height';
				}

				self.$container.css(prop, (self.total * 100) + '%').addClass(self.prefix + 'carousel');
				self.$slides.css(prop, (100 / self.total) + '%');
			}
		};


		//  Start our autoplay
		self.start = function() {
			self.interval = setTimeout(function() {
				//  Move on to the next slide
				self.next();

				//  If we've got autoplay set up
				//  we don't need to keep starting
				//  the slider from within our timeout
				//  as .animate() calls it for us
			}, self.options.delay);

			return self;
		};

		//  And pause our timeouts
		//  and force stop the slider if needed
		self.stop = function() {
			clearTimeout(self.interval);

			return self;
		};


		//  Set up our navigation
		self.initNav = function() {
			var $nav = $('<div class="' + self.prefix + 'nav"><ol /></div>');

			//  Build our click navigation item-by-item
			self.$slides.each(function(key) {
				//  If we've already set a label, let's use that
				//  instead of generating one
				var label = this.getAttribute('data-nav') || key + 1;

				//  Listen to any callback functions
				if($.isFunction(self.options.nav)) {
					label = self.options.nav.call(self.$slides.eq(key), key, label);
				}

				//  And add it to our navigation item
				$nav.children('ol').append('<li data-slide="' + key + '">' + label + '</li>');
			});
			
			//  Keep a copy of the nav everywhere so we can use it
			self.$nav = $nav.insertAfter(self.$context);

			//  Now our nav is built, let's add it to the slider and bind
			//  for any click events on the generated links
			self.$nav.find('li').on('click' + self.eventSuffix, function() {
				//  Cache our link and set it to be active
				var $me = $(this).addClass(self.options.activeClass);

				//  Set the right active class, remove any other ones
				$me.siblings().removeClass(self.options.activeClass);

				//  Move the slide
				self.animate($me.attr('data-slide'));
			});
		};


		//  Set up our left-right arrow navigation
		//  (Not keyboard arrows, prev/next buttons)
		self.initArrows = function() {
			if(self.options.arrows === true) {
				self.options.arrows = self.defaults.arrows;
			}

			//  Loop our options object and bind our events
			$.each(self.options.arrows, function(key, val) {
				//  Add our arrow HTML and bind it
				self.$arrows.push(
					$(val).insertAfter(self.$context).on('click' + self.eventSuffix, self[key])
				);
			});
		};


		//  Set up our keyboad navigation
		//  Allow binding to multiple keycodes
		self.initKeys = function() {
			if(self.options.keys === true) {
				self.options.keys = self.defaults.keys;
			}

			$(document).on('keyup' + self.eventSuffix, function(e) {
				$.each(self.options.keys, function(key, val) {
					if(e.which === val) {
						$.isFunction(self[key]) && self[key].call(self);
					}
				});
			});
		};

		//  Requires jQuery.event.swipe
		//  -> stephband.info/jquery.event.swipe
		self.initSwipe = function() {
			var width = self.$slides.width();

			//  We don't want to have a tactile swipe in the slider
			//  in the fade animation, as it can cause some problems
			//  with layout, so we'll just disable it.
			if(self.options.animation !== 'fade') {

				self.$container.on({

					movestart: function(e) {
						//  If the movestart heads off in a upwards or downwards
						//  direction, prevent it so that the browser scrolls normally.
						if((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
							return !!e.preventDefault();
						}

						self.$container.css('position', 'relative');
					},

					move: function(e) {
						self.$container.css('left', -(100 * self.current) + (100 * e.distX / width) + '%');
					},

					moveend: function(e) {
						
						if((Math.abs(e.distX) / width) < $.event.special.swipe.settings.threshold) {

							self[ e.distX < 0 ? 'next' : 'prev' ]();
						}
					}
				});
			}
		};

		//  Infinite scrolling is a massive pain in the arse
		//  so we need to create a whole bloody function to set
		//  it up. Argh.
		self.initInfinite = function() {
			var pos = ['first', 'last'];

			$.each(pos, function(index, item) {
				self.$slides.push.apply(
					self.$slides,
					
					//  Exclude all cloned slides and call .first() or .last()
					//  depending on what `item` is.
					self.$slides.filter(':not(".' + self._ + '-clone")')[item]()

					//  Make a copy of it and identify it as a clone
					.clone().addClass(self._ + '-clone')

					//  Either insert before or after depending on whether we're
					//  the first or last clone
					['insert' + (index === 0 ? 'After' : 'Before')](
						//  Return the other element in the position array
						//  if item = first, return "last"
						self.$slides[pos[~~!index]]()
					)
				);
			});
		};

		//  Remove any trace of arrows
		//  Loop our array of arrows and use jQuery to remove
		//  It'll unbind any event handlers for us
		self.destroyArrows = function() {
			$.each(self.$arrows, function(i, $arrow) {
				$arrow.remove();
			});
		};

		//  Remove any swipe events and reset the position
		self.destroySwipe = function() {
			//  We bind to 4 events, so we'll unbind those
			self.$container.off('movestart move moveend');
		};

		//  Unset the keyboard navigation
		//  Remove the handler 
		self.destroyKeys = function() {
			//  Remove the event handler
			$(document).off('keyup' + self.eventSuffix);
		};

		self.setIndex = function(to) {
			if(to < 0) {
				to = self.total - 1;
			}

			self.current = Math.min(Math.max(0, to), self.total - 1);

			if(self.options.nav) {
				self.$nav.find('[data-slide="' + self.current + '"]')._active(self.options.activeClass);
			}

			self.$slides.eq(self.current)._active(self.options.activeClass);

			return self;
		};
		
		//  Despite the name, this doesn't do any animation - since there's
		//  now three different types of animation, we let this method delegate
		//  to the right type, keeping the name for backwards compat.
		self.animate = function(to, dir) {
			//  Animation shortcuts
			//  Instead of passing a number index, we can now
			//  use .data('unslider').animate('last');
			//  or .unslider('animate:last')
			//  to go to the very last slide
			if(to === 'first') to = 0;
			if(to === 'last') to = self.total;

			//  Don't animate if it's not a valid index
			if(isNaN(to)) {
				return self;
			}

			if(self.options.autoplay) {
				self.stop().start();
			}

			self.setIndex(to);

			//  Add a callback method to do stuff with
			self.$context.trigger(self._ + '.change', [to, self.$slides.eq(to)]);

			//  Delegate the right method - everything's named consistently
			//  so we can assume it'll be called "animate" + 
			var fn = 'animate' + $._ucfirst(self.options.animation);

			//  Make sure it's a valid animation method, otherwise we'll get
			//  a load of bug reports that'll be really hard to report
			if($.isFunction(self[fn])) {
				self[fn](self.current, dir);
			}

			return self;
		};


		//  Shortcuts for animating if we don't know what the current
		//  index is (i.e back/forward)
		//  For moving forward we need to make sure we don't overshoot.
		self.next = function() {
			var target = self.current + 1;

			//  If we're at the end, we need to move back to the start
			if(target >= self.total) {
				target = 0;
			}

			return self.animate(target, 'next');
		};

		//  Previous is a bit simpler, we can just decrease the index
		//  by one and check if it's over 0.
		self.prev = function() {
			return self.animate(self.current - 1, 'prev');
		};
		

		//  Our default animation method, the old-school left-to-right
		//  horizontal animation
		self.animateHorizontal = function(to) {
			var prop = 'left';

			//  Add RTL support, slide the slider
			//  the other way if the site is right-to-left
			if(self.$context.attr('dir') === 'rtl') {
				prop = 'right';
			}

			if(self.options.infinite) {
				//  So then we need to hide the first slide
				self.$container.css('margin-' + prop, '-100%');
			}

			return self.slide(prop, to);
		};

		//  The same animation methods, but vertical support
		//  RTL doesn't affect the vertical direction so we
		//  can just call as is
		self.animateVertical = function(to) {
			self.options.animateHeight = true;

			//  Normal infinite CSS fix doesn't work for
			//  vertical animation so we need to manually set it
			//  with pixels. Ah well.
			if(self.options.infinite) {
				self.$container.css('margin-top', -self.$slides.outerHeight());
			}

			return self.slide('top', to);
		};

		//  Actually move the slide now
		//  We have to pass a property to animate as there's
		//  a few different directions it can now move, but it's
		//  otherwise unchanged from before.
		self.slide = function(prop, to) {
			//  If we want to change the height of the slider
			//  to match the current slide, you can set
			//  {animateHeight: true}
			if(self.options.animateHeight) {
				self._move(self.$context, {height: self.$slides.eq(to).outerHeight()}, false);
			}

			//  For infinite sliding we add a dummy slide at the end and start
			//  of each slider to give the appearance of being infinite
			if(self.options.infinite) {
				var dummy;

				//  Going backwards to last slide
				if(to === self.total - 1) {
					//  We're setting a dummy position and an actual one
					//  the dummy is what the index looks like
					//  (and what we'll silently update to afterwards),
					//  and the actual is what makes it not go backwards
					dummy = self.total - 3;
					to = -1;
				}

				//  Going forwards to first slide
				if(to === self.total - 2) {
					dummy = 0;
					to = self.total - 2;
				}

				//  If it's a number we can safely set it
				if(typeof dummy === 'number') {
					self.setIndex(dummy);

					//  Listen for when the slide's finished transitioning so
					//  we can silently move it into the right place and clear
					//  this whole mess up.
					self.$context.on(self._ + '.moved', function() {
						if(self.current === dummy) {
							self.$container.css(prop, -(100 * dummy) + '%').off(self._ + '.moved');
						}
					});
				}
			}

			//  We need to create an object to store our property in
			//  since we don't know what it'll be.
			var obj = {};

			//  Manually create it here
			obj[prop] = -(100 * to) + '%';

			//  And animate using our newly-created object
			return self._move(self.$container, obj);
		};


		//  Fade between slides rather than, uh, sliding it
		self.animateFade = function(to) {
			var $active = self.$slides.eq(to).addClass(self.options.activeClass);

			//  Toggle our classes
			self._move($active.siblings().removeClass(self.options.activeClass), {opacity: 0});
			self._move($active, {opacity: 1}, false);
		};

		self._move = function($el, obj, callback, speed) {
			if(callback !== false) {
				callback = function() {
					self.$context.trigger(self._ + '.moved');
				};
			}

			return $el._move(obj, speed || self.options.speed, self.options.easing, callback);
		};

		//  Allow daisy-chaining of methods
		return self.init(options);
	};

	//  Internal (but global) jQuery methods
	//  They're both just helpful types of shorthand for
	//  anything that might take too long to write out or
	//  something that might be used more than once.
	$.fn._active = function(className) {
		return this.addClass(className).siblings().removeClass(className);
	};

	//  The equivalent to PHP's ucfirst(). Take the first
	//  character of a string and make it uppercase.
	//  Simples.
	$._ucfirst = function(str) {
		//  Take our variable, run a regex on the first letter
		return (str + '').toLowerCase().replace(/^./, function(match) {
			//  And uppercase it. Simples.
			return match.toUpperCase();
		});
	};

	$.fn._move = function() {
		this.stop(true, true);
		return $.fn[$.fn.velocity ? 'velocity' : 'animate'].apply(this, arguments);
	};

	//  And set up our jQuery plugin
	$.fn.unslider = function(opts) {
		return this.each(function() {
			var $this = $(this);

			//  Allow usage of .unslider('function_name')
			//  as well as using .data('unslider') to access the
			//  main Unslider object
			if(typeof opts === 'string' && $this.data('unslider')) {
				opts = opts.split(':');

				var call = $this.data('unslider')[opts[0]];

				//  Do we have arguments to pass to the string-function?
				if($.isFunction(call)) {
					return call.apply($this, opts[1] ? opts[1].split(',') : null);
				}
			}

			return $this.data('unslider', new $.Unslider($this, opts));
		});
	};
	
});
/**
 * 公用区域
 */

define('index',[
	'text!root-tpl/main.tpl',
    'root-common/module/slider'
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
        init: function(){
            var me = this;
            me.render();
        },
        render: function(){
            var me = this;
            me.$el.html(me._tpl({
               
            }));
            me.go(1);
            $('.ui-banner').unslider({
                autoplay: true,
                delay: 5000
            });
        },
        go: function(index){
            $('.p-index .choce').removeClass('choce');
            $('.p-index li').eq(index).addClass('choce');
        }

    });

    return K;

});


define('text!root-tpl/sign.tpl',[],function () { return '<div class="pop-sign">\r\n\t<ul class="nav-sign">\r\n\t\t<li class="nav-item">账号登录</li>\r\n\t\t<li class="nav-item">账号注册</li>\r\n\t</ul>\r\n\t<div class="panel-sign">\r\n\t\t<div class="panel-item panel-signin"></div>\r\n\t\t<div class="panel-item panel-signup"></div>\r\n\t</div>\r\n</div>';});


define('text!root-tpl/signin.tpl',[],function () { return '<div class="ui-signin">\r\n\t<form class="form signin-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="loginName">用户账号</label>\r\n\t        <input type="text" class="form-input" name="loginName" id="loginName" placeholder="请输入账号" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="pw">登录密码</label>\r\n\t        <input type="password" class="form-input input-pw" name="pw" id="pw" placeholder="请输入密码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" />\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <a href="/LoginAction.action?method=findPwd" class="forget-pw">忘记密码？</a>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <a class="btn btn-default btn-go-signup" href="javascript:;">还没账号，马上注册</a>\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/signup.tpl',[],function () { return '<div class="ui-signup">\r\n\t<form class="form signup-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="loginName">创建用户</label>\r\n\t        <input type="text" class="form-input" name="loginName" id="loginName" placeholder="请输入账号" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="pw">输入密码</label>\r\n\t        <input type="password" class="form-input input-pw" name="pw" id="pw" placeholder="请输入密码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="cpw">确认密码</label>\r\n\t        <input type="password" class="form-input" name="cpw" id="cpw" placeholder="确认密码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="inputCode">验证码</label>\r\n\t        <input type="text" class="form-input form-input-code" name="inputCode" id="inputCode" />\r\n\t        <img src="" class="validate-code" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="确&nbsp;&nbsp;&nbsp;&nbsp;认" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


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
 * 数据模型
 */

define('model',[
    'root-common/util'
], function(util) {

    var E_FIND_PROVINCE = 'findProvince';
    var E_FIND_REGISTER = 'findRegister';
    var E_FIND_UUID = 'findUuid';
    var E_FIND_CITY = 'findCity';
    var E_FIND_AREA = 'findArea';
    var E_FIND_SCHOOL = 'findSchool';
    var E_FIND_GRADE = 'findGrade';
    var E_FIND_CLASS = 'findClass';
    var E_BIND_USER = 'bindUser';
    var E_GET_USERINFO = 'getUserInfo';
    var E_AUTO_LAYOUT = 'auto.layout';

    var K = Backbone.Model.extend({
        initialize: function(){},
        /**
         * [获取验证id]
         * @param  {[Object]} options [请求参数]
         */
        findUuid: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/uuid'
            }, options);
            util.request.call(this, options, E_FIND_UUID);
        },
        /**
         * [提交注册]
         * @param  {[Object]} options [请求参数]
         */
        findRegister: function(options){
            options = $.extend({
                type: 'post',
                url: window.serviceBase + '/register'
            }, options);
            util.request.call(this, options, E_FIND_REGISTER);
        },
        /**
         * [获取城市省份]
         * @param  {[Object]} options [请求参数]
         */
        findProvince: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/city'
            }, options);
            util.request.call(this, options, E_FIND_PROVINCE);
        },
        /**
         * [获取城市]
         * @param  {[Object]} options [请求参数]
         */
        findCity: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/city'
            }, options);
            util.request.call(this, options, E_FIND_CITY);
        },
        /**
         * [获取区]
         * @param  {[Object]} options [请求参数]
         */
        findArea: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/city'
            }, options);
            util.request.call(this, options, E_FIND_AREA);
        },
        /**
         * [获取学校]
         * @param  {[Object]} options [请求参数]
         */
        findSchool: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/school'
            }, options);
            util.request.call(this, options, E_FIND_SCHOOL);
        },
        /**
         * [获取年级]
         * @param  {[Object]} options [请求参数]
         */
        findGrade: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/grade'
            }, options);
            util.request.call(this, options, E_FIND_GRADE);
        },
        /**
         * [获取班级]
         * @param  {[Object]} options [请求参数]
         */
        findClass: function(options){
            options = $.extend({
                type: 'get',
                url: window.serviceBase + '/class'
            }, options);
            util.request.call(this, options, E_FIND_CLASS);
        },
        /**
         * [绑定用户]
         * @param  {[Object]} options [请求参数]
         */
        bindUser: function(options, otherParams){
            var me = this;
            $.ajax({
                type: 'post',
                url: window.serviceBase + '/bindUser',
                headers: { 
                    token: otherParams.token
                },
                data: options,
                dataType: 'json',
                success: function(res){
                    me.trigger(E_BIND_USER, res, null, options.data, otherParams);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    me.trigger(E_BIND_USER, null, jqXHR);
                }
            });
        },
        /**
         * [登录]
         * @param  {[Object]} options [请求参数]
         */
        getUserInfo: function(options, otherParams){
            var me = this;
            $.ajax({
                type: 'get',
                url: window.serviceBase + '/userInfo',
                headers: { 
                    authorization: 'Basic '+(new util.Base64).encode(options.username+':'+options.pw)
                },
                dataType: 'json',
                success: function(res){
                    //事件名、数据、xhr、参数
                    me.trigger(E_GET_USERINFO, res, null, options.data, otherParams);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    me.trigger(E_GET_USERINFO, null, jqXHR);
                }
            });
        },
        /**
         * [自动布置]
         * @param  {[Object]} options [请求参数]
         */
        autoLayout: function(options){
            options = $.extend({
                type: 'post',
                url: window.oldServiceBase + '/service/competition/auto/assign'
            }, options);
            util.request.call(this, options, E_AUTO_LAYOUT);
        }
    });

    return K;

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
 * 注册
 */

define('sign',[
    'text!root-tpl/sign.tpl',
    'text!root-tpl/signin.tpl',
    'text!root-tpl/signup.tpl',
    './model',
    'root-common/module/popup',
    'root-common/module/tab',
    'root-common/util',
    'root-common/module/cookie'
], function(
	tpl,
    signinTpl,
    signupTpl,
    Model,
    popup,
    Tab,
    util,
    cookie
) {

    var E_SIGNIN = 'signin';
    var E_SIGNUP = 'signup';
    var E_AFTER_SIGNIN = 'after.signin';
    var ERROR_ICON = '<i class="icon-solid">&#xe901;</i>';

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._signinTpl = doT.template(signinTpl);
            me._signupTpl = doT.template(signupTpl);
            me._model = new Model;
            me._tab = null;
            me._pop = null;
            me.uuid = '';
            me._username = ''; //用户名
            me._model.bind({
                'findRegister': $.proxy(me.findRegister, me),
                'findUuid':$.proxy(me.findUuid, me),
                'getUserInfo': $.proxy(me.getUserInfo, me)
            });

            $(window).resize(function(){
                me._pop && me._pop.resize();
            });
        },
        events:{
            'click .btn-go-signup': 'renderSignup'
        },
        render:function(){
            var me = this;
            var pop = me._pop = popup.create({
                title: '',
                custom: me._tpl({}),
                hasHd: false,
                isMove: false,
                containerBoderWidth: 0,
                className: 'pop-youyang'
            });

            me.setElement(pop.$el);
            me._tab = new Tab({
                btns: $('.nav-item', me.$el),
                panels: $('.panel-item', me.$el)
            });
            me._tab.bind({
                'switch': function(index){
                    if(index == 0){
                        me.renderSignin();
                    }
                    if(index == 1){
                        me.renderSignup();
                    }
                }
            });
            me.renderSignin();
        },
        renderSignin: function(){
            var me = this;
            me._tab.show(0);
            $('.panel-signin', me.$el).html(me._signinTpl({

            }));
            $('.panel-signup', me.$el).html('');
            me._pop.resize();
            $('.signin-form', me.$el).submit($.proxy(me._validateSignin, me));
            me.trigger(E_SIGNIN);
        },
        renderSignup: function(){
            var me = this;
            me._tab.show(1);
            $('.panel-signup', me.$el).html(me._signupTpl({

            }));
            $('.panel-signin', me.$el).html('');
            me._pop.resize();
            me._model.findUuid();
            $('.signup-form', me.$el).submit($.proxy(me._validate, me)).submit();
            $('.validate-code').click(function(){
                $('.validate-code').attr('src', window.serviceBase+'/getSecurityCode?uuid='+ me.uuid+ '&t='+(+new Date));
            });
            me.trigger(E_SIGNUP);
        },
        init: function(id){
            this.render();
        },
        reset: function(){
            var me = this;
            me._pop.close();
            me._pop = null;
            me.$el.html('');
        },
        _validate: function(e){
            var me = this;
            var v = this.validate($(e.currentTarget)).form();
            e.preventDefault();
            if(v){   
                me.findRegister();
             
            }
            return false;
        },
        validate: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.parent().find('.form-error'));
                },
                rules:{
                    loginName:{
                        required: true,
                        isUsername: true,
                        remote:{
                            url: window.serviceBase+'/checkLoginName',
                            data:{
                                loginName:function(){
                                    return  $("#loginName").val();
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
                    inputCode:{
                        required:true,
                        remote:{
                            url: window.serviceBase+'/checkSecurityCode' ,
                            data:{
                                uuid: function(){
                                    return me.uuid;
                                },
                                inputCode:function(){
                                    return $('#inputCode').val();
                                }
                            },
                            dataType: 'json'
                        }
                    }
                },
                messages:{
                    loginName:{
                        required: '用户名不能为空',
                        isUsername: '英文字母开头的2~20个小写英文、数字或"_"的组合',
                        remote: '用户已经存在'
                    },
                    pw:{
                        required: '密码不能为空',
                        ispw: '6~20位小写英文、数字或"_"的组合'
                    },
                    cpw:{
                        required: '确认密码不能为空',
                        isCpw: '两次输入不一致'
                    },
                    inputCode:{
                        required: '验证码不能为空',
                        remote:'验证码不正确'
                    }
                }
            });
        },
        _validateSignin: function(e){
            var me = this;
            // var v = this.validateSignin($(e.currentTarget)).form();
            e.preventDefault();
            // if(v){   
                me._model.getUserInfo({
                    username: $('input[name="loginName"]', me.$el).val(),
                    pw: $('input[name="pw"]', me.$el).val()
                });
             
            // }
            return false;
        },
        validateSignin: function($form){
            var me = this;
            return $form.validate({
                errorElement: 'span',
                errorPlacement:function(error, element){
                    error.prepend('');
                    error.appendTo(element.parent().find('.form-error'));
                },
                rules:{
                    loginName:{
                        required: true,
                        isUsername: true
                    },
                    pw:{
                        required: true,
                        ispw: true
                    }
                },
                messages:{
                    loginName:{
                        required: '用户名不能为空',
                        isUsername: '英文字母开头的2~20个小写英文、数字或"_"的组合'
                    },
                    pw:{
                        required: '密码不能为空',
                        ispw: '6~20位小写英文、数字或"_"的组合'
                    }
                }
            });
        },
        /**
         * [提交注册]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findRegister: function(data, xhr, options, otherOptions){
            var me = this;
            
            var data = {
                    loginName:$('#loginName').val(),
                    password:$('#pw').val(),
                    inputCode:$('#inputCode').val(),
                    uuid:me.uuid,
                    agentCode: 10002
                }
            $.ajax({
                url: window.serviceBase + '/register?uuid=' + me.uuid + '&t='+(+new Date),
                type: 'post',
                data:data,
                success:function(data){
                    util.tip('注册成功，即将为您跳转到登录页', true);
                    setTimeout(function(){
                        me.renderSignin();
                    }, 2000);
                }
            })
           
        },
        /**
         * [提交注册]
         * @param {[params]} [data] [发送的数据]
         */
        _findRegister:function(params){
            this._model.findRegister({
                data: params
            });
        },
        /**
         * [获取验证id]
         */
        findUuid:function(data, xhr, options, otherOptions){
            var me = this;
            $.ajax({
                url:window.serviceBase + '/uuid',
                type: 'get',
                success:function(data){
                    me.uuid = data;
                    $('.validate-code').attr('src', window.serviceBase+'/getSecurityCode?uuid='+ me.uuid + '&t='+(+new Date));
                }
            })
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

                    cookie('hzw_token', res.token);
                    cookie('hzw_userid', res.userBasic.id);
                    cookie('hzw_username', res.userBasic.loginName);
                 
                    me._username = res.userBasic.loginName;
                    
                    if(!res.bindStatus){
                        util.tip('登录成功，请绑定角色', true);
                        window.location.href = '#role';
                    }else{
                     
                        me.goProduct();

                    }
                    me.trigger(E_AFTER_SIGNIN, me._username);
                }
                
                
            }, data, xhr);
        },
        /**
         * [到产品页]
         * @param {[String]} [username] [用户名]
         */
        goProduct: function(username){
            var $form = $('<form method="post" action="'+window.oldServiceBase+'/LoginAction.action?method=loginFromLyMis"><input type="hidden" value="'+this._username+'" name="username"></form>').appendTo('body');
            $form.submit();
        }
    });

    return K;

});


define('text!root-tpl/role.tpl',[],function () { return '<div class="pop-role">\r\n\t<div class="role-list fix">\r\n\t\t<a class="role-item role-teacher" href="#teacher" >\r\n\t\t\t<button class="btn btn-role btn-role-teacher">我是老师</button>\r\n\t\t</a>\r\n\t\t<a class="role-item role-student" href="#student">\r\n\t\t\t<button class="btn btn-role btn-role-student">我是学生</button>\r\n\t\t</a>\r\n\t</div>\r\n</div>';});


define('text!root-tpl/student.tpl',[],function () { return '<div class="pop-student">\r\n\t<form class="form student-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="realname"><i>*</i>真实姓名</label>\r\n\t        <input type="text" class="form-input" name="realname" id="realname" placeholder="请填写真实姓名" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="region-area">\r\n\t    \t\r\n\t    </div>\r\n\t    \r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="teacher"><i>*</i>教师姓名</label>\r\n\t        <input type="text" class="form-input" name="teacher" id="teacher" placeholder="请填写教师姓名" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">请填入老师告诉你的名字</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="telephone"><i>*</i>手机号码</label>\r\n\t        <input type="text" class="form-input" name="telephone" id="telephone" placeholder="请填写手机号码" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">仅用于找回密码时使用</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="email">邮箱</label>\r\n\t        <input type="text" class="form-input" name="email" id="email" placeholder="请填写邮箱" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="保&nbsp;&nbsp;&nbsp;&nbsp;存" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/teacher.tpl',[],function () { return '<div class="pop-teacher">\r\n\t<form class="form teacher-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="realname"><i>*</i>真实姓名</label>\r\n\t        <input type="text" class="form-input" name="realname" id="realname" placeholder="请填写真实姓名" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">请将该姓名告知学生，便于学生找到您</div>\r\n\t    </div>\r\n\t    <div class="region-area">\r\n\t    \t\r\n\t    </div>\r\n\t    \r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="code"><i>*</i>学校码</label>\r\n\t        <input type="text" class="form-input" name="code" id="code" placeholder="请填写验证码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="telephone"><i>*</i>手机号码</label>\r\n\t        <input type="text" class="form-input" name="telephone" id="telephone" placeholder="请填写手机号码" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">仅用于找回密码时使用</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label">是否班主任？</label>\r\n\t        <label class="radio"><input type="radio" name="owner" value="0" />是</label>\r\n\t        <label class="radio"><input type="radio" name="owner" value="1" />否</label>\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="email">邮箱</label>\r\n\t        <input type="text" class="form-input" name="email" id="email" placeholder="请填写邮箱" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="保&nbsp;&nbsp;&nbsp;&nbsp;存" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/region.tpl',[],function () { return '<div class="form-control clearfix">\r\n    <label class="label" for="province"><i>*</i>省份</label>\r\n    <select class="form-select" name="province" id="province">\r\n    \t<option disabled selected>请选择省份</option>\r\n    \t{{~it.provinceList :v:i}}\r\n    \t<option value="{{=v.code}}" \r\n        {{ if(v.code == it.province){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n    \t{{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="city"><i>*</i>城市</label>\r\n    <select class="form-select" name="city" id="city">\r\n    \t<option disabled selected>请选择城市</option>\r\n        {{~it.cityList :v:i}}\r\n        <option value="{{=v.code}}" \r\n        {{ if(v.code == it.city){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="area"><i>*</i>区</label>\r\n    <select class="form-select" name="area" id="area">\r\n        <option disabled selected>请选择区</option>\r\n        {{~it.areaList :v:i}}\r\n        <option value="{{=v.code}}" \r\n        {{ if(v.code == it.area){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="school"><i>*</i>学校</label>\r\n    <select class="form-select" name="school" id="school">\r\n        <option disabled selected>请选择学校</option>\r\n        {{~it.schoolList :v:i}}\r\n        <option value="{{=v.id}}" \r\n        {{ if(v.id == it.school){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n    {{ if(!it.isStudent){ }}\r\n    <div class="tip-msg">\r\n        如果找不到学校，请<a href="javascript:;" class="show-school-tip">点击</a>\r\n        <div class="panel-school-tip">\r\n            <i class="icon-solid btn-close">&#xe901;</i>\r\n            各位老师，如果找不到您所在的学校。请\r\n            联系 <i class="highlight">13482268004</i> 穆老师，并将自己的\r\n            学校名称告知穆老师。穆老师会在一个工\r\n            作日内为您增加学校，并反馈到您。\r\n        </div>\r\n    </div>\r\n    {{ } }}\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="grade"><i>*</i>年级</label>\r\n    <select class="form-select" name="grade" id="grade">\r\n        <option disabled selected>请选择年级</option>\r\n        {{~it.gradeList :v:i}}\r\n        <option value="{{=v.code}}" \r\n        {{ if(v.code == it.grade){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="classroom"><i>*</i>班级</label>\r\n    {{ if(it.isStudent){ }}\r\n    <select class="form-select" name="classroom" id="classroom">\r\n        <option disabled selected>请选择班级</option>\r\n        {{~it.classList :v:i}}\r\n        <option value="{{=v.id}}">{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    {{ }else{ }}\r\n    <input type="text" name="classroom" value="{{=it.classId ? it.classId : \'\'}}" class="hidden-classroom" /> \r\n    <span class="choose-class">\r\n        {{=it.classroom ? it.classroom : \'请选择班级\'}}\r\n    </span>\r\n    {{ } }}\r\n    \r\n    <div class="form-error"></div>\r\n</div>\r\n';});


define('text!root-tpl/classroom.tpl',[],function () { return '<div class="pop-class">\r\n\t<div class="fix">\r\n\t\t{{~it.list :v:i}}\r\n\t\t<span class="item-class {{=it.setClassActive(v.id, it.chosen)}}" data-id="{{=v.id}}">{{=v.name}}</span>\r\n\t\t{{~}}\r\n\t</div>\r\n\t<div class="fix">\r\n\t\t<a class="btn btn-confirm" href="javascript:;">确认</a>\r\n\t</div>\r\n</div>';});

/**
 * 角色
 */

define('role',[
    'text!root-tpl/role.tpl',
    'text!root-tpl/student.tpl',
	'text!root-tpl/teacher.tpl',
    'text!root-tpl/region.tpl',
    'text!root-tpl/classroom.tpl',
    './model',
    'root-common/module/popup',
    'root-common/util',
    'root-common/module/cookie'
], function(
	roleTpl,
    studentTpl,
    teacherTpl,
    regionTpl,
    classroomTpl,
    Model,
    popup,
    util,
    cookie
) {

    var E_ROLE = 'role';
    // var E_SIGNUP = 'signup';
  

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(roleTpl);
            me._studentTpl = doT.template(studentTpl);
            me._teacherTpl = doT.template(teacherTpl);
            me._regionTpl = doT.template(regionTpl);
            me._classroomTpl = doT.template(classroomTpl);
            me._model = new Model;
            me._model.bind({
                'findProvince': $.proxy(me.findProvince, me),
                'findCity': $.proxy(me.findCity, me),
                'findArea': $.proxy(me.findArea, me),
                'findSchool': $.proxy(me.findSchool, me),
                'findGrade': $.proxy(me.findGrade, me),
                'findClass': $.proxy(me.findClass, me),
                'getUserInfo': $.proxy(me.getUserInfo, me),
                'bindUser': $.proxy(me.bindUser, me)
            });
            
            me._token = cookie('hzw_token') || null; //用户口令
            me._userid = null; //用户id
           
            me.username = '';

            me._chosenClass = []; //弹层中选中的班级
            me._classPop = null; //选班级弹层
            
            $(window).resize(function(){
                me._pop && me._pop.resize();
            });
        },
        events: {
            
        },
        init: function(){
            var me = this;
            me.render();
        },
        render: function(){
            var me = this;
            me.$el.html(me._tpl({
                
            }));
        },
        setName: function(name){
            this.username = name;
        },
        /**
         * [绑定角色]
         */
        bindRole: function(name){
            var me = this;
            me._pop = popup.create({
                title: '老师or学生?',
                custom: me._tpl({

                }),
                isMove: false,
                className: 'pop-youyang'
            });
            me.trigger(E_ROLE);
            me._pop && me._pop.resize();

        },
        /**
         * [学生信息]
         */
        updateStudent: function(){
            var me = this;
            me._pop = popup.create({
                title: '我是学生',
                custom: me._studentTpl({

                }),
                isMove: false,
                className: 'pop-youyang'
            });
            me._isStudent = true;
            me._model.findProvince();
            me.renderRegion();
            me.bindRegion();

            $('.form', me._pop.$el).submit($.proxy(me._validate, me));
            me.trigger(E_ROLE);

        },
        reset: function(){
            var me = this;
            me._pop.close();
            me._pop = null;
            me.$el.html('');
        },
        /**
         * [教师信息]
         */
        updateTeacher: function(){
            var me = this;
            var pop = me._pop = popup.create({
                title: '我是老师',
                custom: me._teacherTpl({
                    
                }),
                isMove: false,
                className: 'pop-youyang'
            });
            me._isStudent = false;
            me._model.findProvince();
            me.renderRegion();
            me.bindRegion();
            $('.form', me._pop.$el).submit($.proxy(me._validate, me));
            pop.$el.on('click', '.choose-class', $.proxy(me._showClass, me));
            pop.$el.on('click', '.show-school-tip', $.proxy(me._showSchoolTip, me));
            pop.$el.on('click', '.panel-school-tip .btn-close', $.proxy(me._hideSchoolTip, me));
            me.trigger(E_ROLE);
        },
        bindRegion: function(){
            var me = this;
            me._pop.$el.on('change', 'select[name="province"]', $.proxy(me._changeProvince, me));
            me._pop.$el.on('change', 'select[name="city"]', $.proxy(me._changeCity, me));
            me._pop.$el.on('change', 'select[name="area"]', $.proxy(me._changeArea, me));
            me._pop.$el.on('change', 'select[name="school"]', $.proxy(me._changeSchool, me));
            me._pop.$el.on('change', 'select[name="grade"]', $.proxy(me._changeGrade, me));
        },
        renderRegion: function(){
            var me = this;
            try{
                me._schoolList.sort(function(a, b){
                    return a.name.localeCompare(b.name);
                })
            }catch(e){}
            
            $('.region-area', me._pop.$el).html(me._regionTpl({
                provinceList: me._provinceList,
                province: me._province,
                cityList: me._cityList,
                city: me._city,
                areaList: me._areaList,
                area: me._area,
                schoolList: me._schoolList,
                school: me._school,
                gradeList: me._gradeList,
                grade: me._grade,
                classList: me._classList,
                classroom: me._class,
                classId: me._classId,
                isStudent: me._isStudent
            }));
            me._pop && me._pop.resize();
        },
        /**
         * [获取省份结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findProvince: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._provinceList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        /**
         * [获取城市结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findCity: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._cityList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        /**
         * [获取区结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findArea: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._areaList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        /**
         * [获取学校结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findSchool: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._schoolList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        /**
         * [获取年级结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findGrade: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._gradeList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        /**
         * [获取班级结果]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findClass: function(data, xhr, options, otherOptions){
            var me = this;
            util.dealAjax(function(isError){
                me._classList = data.data.list;
                me.renderRegion();
            }, data, xhr);
        },
        _resetClass: function(){
            this._class = ''; //class名称
            this._classId = ''; //class id
        },
        _changeProvince: function(e){
            e.preventDefault();
            var me = this;
            var val = $(e.currentTarget).val();
            me._province = val;
            me._cityList = [];
            me._city = '';
            me._schoolList = [];
            me._school = '';
            me._gradeList = [];
            me._grade = '';
            me._classList = [];
            me._resetClass();
            me._chosenClass = [];
            me._model.findCity({
                data: {
                    code: val
                }
            });
        },
        _changeCity: function(e){
            e.preventDefault();
            var me = this;
            var val = $(e.currentTarget).val();
            me._city = val;
            me._areaList = [];
            me._area = '';
            me._schoolList = [];
            me._school = '';
            me._gradeList = [];
            me._grade = '';
            me._classList = [];
            me._resetClass();
            me._chosenClass = [];
            me._model.findArea({
                data: {
                    code: val
                }
            });
        },
        _changeArea: function(e){
            e.preventDefault();
            var me = this;
            var val = $(e.currentTarget).val();
            me._area = val;
            me._schoolList = [];
            me._school = '';
            me._gradeList = [];
            me._grade = '';
            me._classList = [];
            me._resetClass();
            me._chosenClass = [];
            me._model.findSchool({
                data: {
                    cityCode: val
                }
            });
        },
        _changeSchool: function(e){
            e.preventDefault();
            var me = this;
            var val = $(e.currentTarget).val();
            me._school = val;
            me._gradeList = [];
            me._grade = '';
            me._classList = [];
            me._resetClass();
            me._chosenClass = [];
            me._model.findGrade({
                data: {
                    schoolId: val
                }
            });
        },
        _changeGrade: function(e){
            e.preventDefault();
            var me = this;
            var val = $(e.currentTarget).val();
            me._grade = val;
            me._classList = [];
            me._resetClass();
            me._chosenClass = [];
            me._model.findClass({
                data: {
                    schoolId: me._school,
                    grade: val
                }
            });
        },
        _validate: function(e){
            var me = this;
            var v = me.validate($(e.currentTarget)).form();
            me._token = cookie('hzw_token');
            me._userid = cookie('hzw_userid');
            me.setName(cookie('hzw_username'));
            if(v){
                var email = $('input[name="email"]', me._pop.$el).val();
                if(email && !/^([\w-]+)@([\w-]+).([\w-]+)$/.test(email)){
                    util.errorTip('邮箱格式不正确');
                    return false;
                }
                var params = {
                    schoolId: me._school,
                    classId: $('[name="classroom"]', me._pop.$el).val(),
                    realname: $('input[name="realname"]', me._pop.$el).val(),
                    studentOrTeacher: me._isStudent ? 'student' : 'teacher',
                    mobile: $('input[name="telephone"]', me._pop.$el).val(),
                    email: email
                };
                if(!me._isStudent){
                    params.isMaster = !!parseInt($('input[name="owner"]', me._pop.$el).val());
                    params.inputCheckClassCode = $('input[name="code"]', me._pop.$el).val();
                }else{
                    params.teacherName = $('input[name="teacher"]', me._pop.$el).val();
                }
                me._model.bindUser(params, {
                    token: me._token
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
                    error.appendTo(element.parent().find('.form-error'));
                },
                rules:{
                    province:{
                        required: true
                    },
                    city:{
                        required: true
                    },
                    area:{
                        required: true
                    },
                    school:{
                        required: true
                    },
                    grade:{
                        required:true
                    },
                    classroom:{
                        required:true
                    },
                    realname:{
                        required:true,
                        maxlength: 30
                    },
                    teacher:{
                        required:true
                    },
                    telephone:{
                        required:true,
                        isTelephone:true
                    }

                },
                messages:{
                    province:{
                        required: '请选择省份'
                    },
                    city:{
                        required: '请选择城市'
                    },
                    area:{
                        required: '请选择区'
                    },
                    school:{
                        required: '请选择学校'
                    },
                    grade:{
                        required: '请选择年级'
                    },
                    classroom:{
                        required: '请选择班级'
                    },
                    realname:{
                        required: '姓名不能为空',
                        maxlength: '最大不能超过30个字符'
                    },
                    teacher:{
                        required: '教师姓名不能为空'
                    },
                    telephone:{
                        required: '手机不能为空',
                        isTelephone:'手机格式不对'
                    }
                }
            });
        },
        
        /**
         * [绑定成功]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        bindUser: function(data, xhr, options, otherOptions){
            var me = this;
 
            util.dealAjax(function(isError){
                if(!isError){
                    var userid = me._userid;
                    me._model.autoLayout({
                        data: {
                            user_name: me.username
                        }
                    });
                    util.tip('正在为您跳转', true);
                    setTimeout(function(){
                        me.goProduct();
                    }, 2000);
                    
                }
            }, data, xhr);
        },
        /**
         * [到产品页]
         * @param {[String]} [username] [用户名]
         */
        goProduct: function(){
            
            var $form = $('<form method="post" action="'+window.oldServiceBase+'/LoginAction.action?method=loginFromLyMis"><input type="hidden" value="'+this.username+'" name="username"><input type="hidden" value="3" name="source"></form>').appendTo('body');
            $form.submit();
        },
        _showClass: function(){
            var me = this;
            if(me._classList && $.type(me._classList) && me._classList.length > 0){
                me._classPop = popup.create({
                    title: '选择班级',
                    custom: me._classroomTpl({
                        list: me._classList,
                        chosen: me._chosenClass || [],
                        setClassActive: me._setClassActive
                    }),
                    mask: true,
                    isMove: false
                });
                me._classPop.$el.on('click', '.item-class', $.proxy(me._selectClass, me));
                me._classPop.$el.on('click', '.btn-confirm', $.proxy(me._confirmSelect, me));
            }else{
                util.tip('班级为空', true);
            }
        },
        _selectClass: function(e){
            var me = this;
            e.preventDefault();
            var $target = $(e.currentTarget).toggleClass('active');
            var id = $target.data('id');
            var name = $target.text();
            var index;
            $.each(me._chosenClass, function(i, v){
                if(v.id == id){
                    index = i;
                    return false;
                }
            });
            if(index !== undefined){
                me._chosenClass.splice(index, 1);
            }else{
                me._chosenClass.push({
                    id: id,
                    name: name
                });
            }
        },
        _confirmSelect: function(e){
            var me = this;
            e.preventDefault();
            var classes = me._chosenClass;
            var names = '';
            var ids = [];
            $.each(classes, function(i, v){
                names += ' '+v.name;
                ids.push(v.id);
            });
            me._class = names;
            me._classId = ids.join(',');
            me._classPop.close();
            me.renderRegion();
        },
        _setClassActive: function(id, list){
            var result = '';
            $.each(list, function(i, v){
                if(v.id == id){
                    result = 'active';
                    return false;
                }
            });
            return result;
        },
        _showSchoolTip: function(e){
            e.preventDefault();
            var me = this;
            $('.panel-school-tip', me._pop.$el).show();
        },
        _hideSchoolTip: function(e){
            e.preventDefault();
            var me = this;
            $('.panel-school-tip', me._pop.$el).hide();
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
	var testServicePort = '8088';
	var preUrl = 'http://';
	var debugReg = /192.168|localhost|debug.|127.0/;
	
	//测试环境
	if(debugReg.test(hostname)){
		env = 'test';
	}

	try {
		if(env == 'test'){
			//测试环境
		    window.serviceBase = preUrl + testIp + ':' + testServicePort;
		    window.oldServiceBase = preUrl + testIp + ':8080';
		}else{
			//生产
			window.serviceBase = preUrl + hostname + '/taoshiwanApi/taoshiwan';
			window.oldServiceBase = preUrl + hostname;
		}
		
	} catch (ex) {
		alert("自适应域名脚本执行错误!\n");
	}

});

require([
	'./router',
	'./moduleManager',
	'./index',
    './sign',
    'role',
    './auto-domain'
], function(
	Router,
	moduleMgr,
	Index,
	Sign,
	Role
) {

	//根据分辨率重置body字体大小,iphone5为标准，宽320，字体大小10px
    function resetFontSize(){
        var winWidth = $(window).width();
        //如果一开始为横屏，需要处理 todo
        if(winWidth > 700){
            //pad
            var fontSize = 28.125;
        }else{
            //手机，包括大屏手机600px
            var fontSize = winWidth * 14/320;
        }
        
        $('html').css('font-size', fontSize + 'px');
    }

    resetFontSize();
    $(window).resize(resetFontSize);

	$.validator.addMethod("isCpw", function (value, element, param) {
		var $form = $(element).closest('form');
		var cpw = $(element).val();
		var pw = $('.input-pw', $form).val();

		return cpw === pw;
	});

	$.validator.addMethod("isUsername", function (value, element, param) {
		var reg = /^[a-z]{1}[a-z0-9_]{1,19}$/g;

		return reg.test($(element).val());
	});

	$.validator.addMethod("ispw", function (value, element, param) {
		var reg = /^[a-z0-9_]{6,20}$/g;

		return reg.test($(element).val());
	});

	$.validator.addMethod("isEmail", function (value, element, param) {
		var emailReg = /^([\w-]+)@([\w-]+).([\w-]+)$/; 
		var email = $(element).val();
		return emailReg.test(email);
	});

	$.validator.addMethod("isTelephone", function (value, element, param) {
		var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; 
		var phone = $(element).val();
		return phoneReg.test(phone);
	});

    //路由
	var router = new Router;

	var indexMain = new Index({
        el: '#IndexPage'
    });
    indexMain.init()

    var sign = moduleMgr.add(new Sign);
    var role = moduleMgr.add(new Role);

	//事件绑定
	router.bind({
		'gotoSign': function(){
			resetPage();
        	sign.init();
		},
		'gotoRole': function(name){
			resetPage();
        	role.bindRole(name);
		},
		'gotoStudent': function(){
			resetPage();
			role.updateStudent();
		},
		'gotoTeacher': function(){
			resetPage();
    		role.updateTeacher();
		}
	});

	sign.bind({
		'signin': function(){
			indexMain.go(1);
		},
		'signup': function(){
			indexMain.go(0);
		},
		'after.signin': function(name){
			// role.setName(name);
		}
	});

	role.bind({
		'role': function(){
			indexMain.go(2);
		}
	});

	/**
     * [还原页面]
     */
    function resetPage(){
        moduleMgr.clear();
    }

    $('body').click(function(){
    	$('.panel-tip').hide();
    });

    //开启路由
	Backbone.history.start();

});

define("main", function(){});

