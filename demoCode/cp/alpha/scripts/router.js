define(function() {

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