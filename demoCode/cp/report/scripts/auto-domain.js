/**
 * 开发、测试、生产环境自适应静态文件域
 */

define([
	
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
