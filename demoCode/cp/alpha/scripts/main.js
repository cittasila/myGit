require([
	'./router',
	'./module-manager',
	'./sign',
    './signup',
    './phonefind',
    './phone',
    './product',
    './header',
    './reading',
    './booklist',
    './readover',
    './userNew',
    './bookNav',
    './testResult',
    './find-pw',
    './privacy',
    './term',
    './exercise/main',
    './exercise/header',
    './recommend/grade',
    './auto-domain'

], function(
	Router,
	moduleMgr,
	Sign,
    SignUp,
    PhoneFind,
    Phone,
	Product,
    Header,
    Reading,
    BookList,
    ReadOver,
    UserNew,
    BookNav,
    TestResult,
    Findpw,
    Privacy,
    Term,
    ExerciseMain,
    ExerciseHeader,
    Grade
) {

    $.extend($.ajaxSettings, {
        timeout: 30000
    });

    //IE通过域访问数据源
    $.support.cors = true;

    window.audioPlay = {
        click: function(){
            $('.audio-click')[0].play && $('.audio-click')[0].play();
        },
        error: function(){
            $('.audio-error')[0].play && $('.audio-error')[0].play();
        },
        right: function(){
            $('.audio-right')[0].play && $('.audio-right')[0].play();
        },
        completeReading: function(){
            $('.audio-complete-reading')[0].play && $('.audio-complete-reading')[0].play();
        }
    };

    window.resetPage = resetPage;

    window.gradeMap = {
        P1: 'G1',
        P2: 'G2',
        P3: 'G3',
        P4: 'G4',
        P5: 'G5',
        P6: 'G6',
        PS: 'G6',
        M1: 'G7',
        M2: 'G8',
        M3: 'G9',
        H1: 'G10',
        H2: 'G11',
        H3: 'G12'
    };

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

    $.validator.addMethod("isCpw", function (value, element, param) {
        var $form = $(element).closest('form');
        var cpw = $(element).val();
        var pw = $('input[name="pw"]', $form).val();

        return cpw === pw;
    });

    $.validator.addMethod("ispw", function (value, element, param) {
        var reg = /^[a-z0-9_]{6,30}$/g;

        return reg.test($(element).val());
    });
    $.validator.addMethod("isEmail", function (value, element, param) {
        var emailReg = /^([\w-]+)@([\w-]+)\.([\w-]+)$/; 
        var email = $(element).val();
        return emailReg.test(email);
    });

    //路由
	var router = new Router;

    var header = moduleMgr.add(new Header({
        el: '#Header'
    }));

	var sign = moduleMgr.add(new Sign({
    	el: '#SignPage'
    }));

    var signUp = moduleMgr.add(new SignUp({
        el: '#SignUpPage'
    }));

    var PhoneFind = moduleMgr.add(new PhoneFind({
        el: '#PhoneFindPage'
    }));

    var phone = moduleMgr.add(new Phone({
        el: '#PhonePage'
    }));

    var product = moduleMgr.add(new Product({
    	el: '#ProductPage'
    }));

    var reading = moduleMgr.add(new Reading({
        el: '#ReadingPage'
    }));

    var bookList = moduleMgr.add(new BookList({
        el: '#BookListPage'
    }));

    var readOver = moduleMgr.add(new ReadOver({
        el: '#ReadOverPage'
    }));

    var findpw = moduleMgr.add(new Findpw({
        el: '#FindpwPage'
    }));

    var privacy = moduleMgr.add(new Privacy({
        el: '#PrivacyPage'
    }));

    var term = moduleMgr.add(new Term({
        el: '#TermPage'
    }));

    var UserNew = moduleMgr.add(new UserNew({
        el: '#UserPage'
    }));

    var bookNav = moduleMgr.add(new BookNav({
        el: '#BookNavPage'
    }));

    var TestResult = moduleMgr.add(new TestResult({
        el: '#TestResultPage'
    }));
    

    var exerciseMain = moduleMgr.add(new ExerciseMain({
        el: '#ExercisePage'
    }));

    var exerciseHeader = moduleMgr.add(new ExerciseHeader({
        el: '#ExerciseHeader'
    }));

    var grade = moduleMgr.add(new Grade({
        el: '#GradePage'
    }));

	//事件绑定
	router.bind({
		'gotoSign': function(){
			resetPage();
   	     	sign.init();
		},
        'gotoPhone': function(){
            resetPage();
            header.init();
            phone.listenTo(header, 'getUserInfo', $.proxy(phone.getUserInfo, phone));
        },
		'gotoProduct': function(){
			resetPage();
   	     	product.init();
            header.init();
            product.listenTo(header, 'getUserInfo', $.proxy(product.setVideo, product));
		},
        'gotoReading': function(id){
            // resetPage();
            reading.init(id);
            exerciseHeader.stopListening();
            bookNav.stopListening();
            exerciseHeader.listenTo(reading, 'rendered', $.proxy(exerciseHeader.animLeft, exerciseHeader));
            bookNav.listenTo(reading, 'rendered', $.proxy(bookNav.animLeft, bookNav));
        },
        'gotoBookList': function(){
            resetPage();
            bookList.init();
            header.init();
            bookList.listenTo(header, 'getUserInfo', $.proxy(bookList.setUser, bookList));
        },
        'gotoReadOver': function(id){
            resetPage();
            readOver.init(id);
        },

        'gotoInformation': function(){
            resetPage();
            product.init();
            header.init();
            UserNew.init();
        },
        'gotoFindpw': function(){
            resetPage();
            findpw.init();
        },
        'gotoPrivacy': function(){
            resetPage();
            privacy.init();
        },
        'gotoTerm': function(){
            resetPage();
            term.init();
        },
        'gotoSignUp': function(){
            resetPage();
            signUp.init();
        },
        'gotoPhoneFind':function(){
            resetPage();
            PhoneFind.init();
        },
        'gotoExercise':function(id, index){
            resetPage();
            exerciseMain.init(id, index);
            exerciseHeader.init(id,1);
        },
        'gotoBookNav':function(id){
            resetPage();
            bookNav.init(id);
            exerciseHeader.init(id);
        },
        'gotoTestResult':function(id, index){
            resetPage();
            TestResult.init(id, index);
            exerciseHeader.init(id);
        },
        'gotoGrade':function(){
            resetPage();
            header.init();
            grade.init();
        },
        
	});

	/**
     * [还原页面]
     */
    function resetPage(){
        moduleMgr.clear();
    }

    $('body').on({
        'mousedown': function(){
            $('.icon-audio').hide();
        }
    });

    //开启路由
	Backbone.history.start();

});
