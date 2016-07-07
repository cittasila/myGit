/**
 * 开发、测试、生产环境自适应静态文件域
 * @param {[String]} [env] [当前环境]
 * staticsRoot,serviceBase 不可被覆盖！！
 */

define([
	
], function() {

	var env = 'online';
	var hostname = location.hostname;
	var host = location.host;
	var localIp = '127.0.0.1';
	var testIp = '192.168.12.250';
	var testServicePort = '8081';
	var preUrl = 'http://';
	
	//开发环境
	if(hostname.indexOf('debug') === 0 || hostname === localIp){
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
		    window.serviceBase = preUrl + testIp + ':' + testServicePort;
		}else if(env == 'test'){
			//测试环境
			window.staticsRoot = preUrl + host + '/ui';
		    window.serviceBase = preUrl + hostname + ':' + testServicePort;
		}else if(env == 'lyced'){
			//lyced
			window.staticsRoot = preUrl + hostname + '/ui';
			window.serviceBase = preUrl + hostname + '/writingApi';
		}else if(env == 'aliyun'){
			//aliyun
			window.staticsRoot = preUrl + 'www.lyced.com' + '/ui';
			window.serviceBase = preUrl + hostname + '/writingApi';
		}else{
			//正式环境
			window.staticsRoot = preUrl + hostname + '/ui';
			window.serviceBase = preUrl + hostname + '/writingApi';

		}
		
	} catch (ex) {
		alert("自适应域名脚本执行错误!\n");
	}

});
