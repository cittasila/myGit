
define([
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
