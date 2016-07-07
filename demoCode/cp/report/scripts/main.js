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
