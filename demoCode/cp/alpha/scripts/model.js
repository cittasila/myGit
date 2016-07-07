/**
 * 数据模型
 */

define([
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