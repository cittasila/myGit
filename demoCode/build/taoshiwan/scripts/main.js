define('router',[],function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_LOGIN = 'gotoLogin';
    var E_GOTO_ROLE = 'gotoRole';
    var E_GOTO_STUDENT = 'gotoStudent';
    var E_GOTO_TEACHER = 'gotoTeacher';

    var K = Backbone.Router.extend({
        routes: {
            "": "gotoHome",
            "login": "gotoLogin",
            "role": "gotoRole",
            "student": "gotoStudent",
            "teacher": "gotoTeacher"
        },
        initialize: function(){},
        /**
         * [首页]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [登录注册]
         */
        gotoLogin: function(){
            this.trigger(E_GOTO_LOGIN);
        },
        /**
         * [用户绑定]
         */
        gotoRole: function(){
            this.trigger(E_GOTO_ROLE);
        },
        /**
         * [学生信息]
         */
        gotoStudent: function(){
            this.trigger(E_GOTO_STUDENT);
        },
        /**
         * [教师信息]
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

define('text!root-tpl/index/main.tpl',[],function () { return '<div class="g-header">\r\n\t<div class="ui-content">\r\n\t\t<div class="w920">\r\n\t\t\t<div class="logo-youyang">\r\n\t\t\t\t<a href="http://www.51taoshi.com/"></a>\r\n\t\t\t</div>\r\n\t\t\t<div class="logo">\r\n\t\t\t\t<a href="#"></a>\r\n\t\t\t\t<i class="caret"></i>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="p-container">\r\n\t<div class="ui-top w920">\r\n\t\t<div class="tip-area">\r\n\t\t\t<a href="javascript:;" class="btn-tip"></a>\r\n\t\t\t<div class="panel-tip">\r\n\t\t\t\t<div class="tip-mask"></div>\r\n\t\t\t\t<div class="txt">\r\n\t\t\t\t\t适用对象：小学、初中、高中生QQ客<br />\r\n\t\t\t\t\t服群：163010678<br />\r\n\t\t\t\t\t扫描方式：建议用QQ、支付宝“扫一<br />\r\n\t\t\t\t\t扫”或UC、搜狗、百度、360、小米、<br />\r\n\t\t\t\t\tQQ浏览器“扫一扫”下载安装（不支<br />\r\n\t\t\t\t\t持微信扫一扫）\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="ui-login">\r\n\t\t\t<div class="shengdan"></div>\r\n\t\t\t<div class="ui-mask"></div>\r\n\t\t\t<div class="qrcode-area">\r\n\t\t\t\t<div class="qrcode">\r\n\t\t\t\t\t<img src="images/jiaoshi.png" /><br />\r\n\t\t\t\t\t老师注册攻略\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="qrcode">\r\n\t\t\t\t\t<img src="images/xuesheng.png" /><br />\r\n\t\t\t\t\t学生注册攻略\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="ui-content">\r\n\t\t\t\t<form action="" id="">\r\n\t\t\t\t\t<div class="frm-column frm-column-field">\r\n\t\t\t\t\t\t<label class="frm-label">\r\n\t\t\t\t\t\t\t登录名：\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t<div class="frm-control">\r\n\t\t\t\t\t\t\t<input type="text" name="name" id="userNames" class="frm-txt" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="frm-column frm-column-field">\r\n\t\t\t\t\t\t<label class="frm-label">\r\n\t\t\t\t\t\t\t密&nbsp;&nbsp;&nbsp;码：\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t<div class="frm-control">\r\n\t\t\t\t\t\t\t<input type="password" name="password" id="passwds" class="frm-txt" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="frm-column">\r\n\t\t\t\t\t\t<a href="javascript:void(0);" class="ui-btn btn-login">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="frm-column fix">\r\n\t\t\t\t\t\t<a href="/LoginAction.action?method=findPwd" class="forget-pw">忘记密码？</a>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="frm-column">\r\n\t\t\t\t\t\t<div class="qq-login">\r\n\t\t\t\t\t\t\t<a href="javascript:void(0);" class="ui-btn btn-register">免费注册</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="ui-intro w920">\r\n\t\t<ul class="ui-nav fix">\r\n\t\t\t<li class="ui-nav-item ui-item-current">学  生</li>\r\n\t\t\t<li class="ui-nav-item ui-item-last">家  长</li>\r\n\t\t</ul>\r\n\t\t<div class="ui-panel">\r\n\t\t\t<div class="ui-panel-border"></div>\r\n\t\t\t<ul class="ui-panel-item fix">\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-1.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>“听说读写“不求人，你的贴身“大白”来也</h4>\r\n\t\t\t\t\t\t<p>即使老师和学霸不再身边，也不用担心英语“四大金刚“啦，24小时无限次在线系统评分、五维能力评价及历史记录对比，帮助学生不断总结经验，实现高分和突破，轻松实现个性化“教与学”的在线学习。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-2.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>享受“一对一”人机智能交互</h4>\r\n\t\t\t\t\t\t<p>每个学生都是独一无二的，个性化智能学习的时代已经到来，人类的学习再也不用看时间和空间的眼色，它改变了原有一成不变的学习内容和授课难度，鼓励学生不断优化修改，激发学生“听说读写”无限热情。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-4.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>适合你的才是最好的，最重要是你喜欢</h4>\r\n\t\t\t\t\t\t<p>专为国内K12学生精心挑选的国外优质原版读物、重要知识点视频和交互式习题，自适应阅读学习系统定期为每个学生挑选“限量定制版”读物，连国民老公王XX都未必看过哦。 </p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-3.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>私人定制“学习管家”，你值得拥有</h4>\r\n\t\t\t\t\t\t<p>不是每个学生都能遇见好老师，进入传说中的好学校，在这里，你可以通过自适应学习系统获取“公平优质”的教育资源，有大把大把的地球人在互动学习社区等你加入和分享呢。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-6.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>”美貌和智慧”并存的数据报告</h4>\r\n\t\t\t\t\t\t<p>提供个人成长足迹数据报告，结合科学算法评估个人“听说读写“能力和薄弱环节，及时了解自己的成绩变化，制定更具针对性的学习计划，经多年“实战”经验，学生对分数质疑也明显减少。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-stu-5.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>与国内教纲匹配的“17背单词大法”</h4>\r\n\t\t\t\t\t\t<p>随时随地在线口语练习和智能语音评分纠错，每天只需花20分钟即可从容实现“学与练”，不但可以PK掉学霸，还可以获得女神的垂慕，爸爸妈妈从此再也不用担心你的英语，岂不是一举三得！</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t\t<ul class="ui-panel-item fix" style="display:none;">\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-1.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>英语界也存在“速度与激情”</h4>\r\n\t\t\t\t\t\t<p>每学年可以节省约95小时的工作时间，享受“闪电侠”式的作业发布、极速评分、过程性评价体验，只要您会点鼠标，再繁琐的工作都能一键搞定，每天多睡几小时。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-2.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>从“压力山大”到“轻松自如”</h4>\r\n\t\t\t\t\t\t<p>这都21世纪了，还再沿用“解放前式的陪读”教育模式，这脸面丢到火星啦，现在就能通过“人工智能测评系统V2.0“针对学生的学习效果进行客观评估，在最短时间内了解每位学生的学习反馈和学习痕迹，为后期教学进行有力完善。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-3.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>互联网+教育又一伟大发明“自适应”</h4>\r\n\t\t\t\t\t\t<p>老师不布置作业，学生的英语成绩也能提高？答案是YES! \t系统自带阅读前测，帮助学生了解对应阅读水平，还能“智能定位”起始阅读等级，系统按照“自适应节奏”为学生制定阶段性阅读计划，不信快来试试！ </p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-4.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>360°智能报告，给您最关心的“数据”</h4>\r\n\t\t\t\t\t\t<p>N类报告一手掌握，老师通过报告全面了解班级、小组和学生个人的“听说读写”能力缺陷或进步度，结合数据报告、错误汇总、能力解析等细节报告一一掌握学生和班级学习状态，随时调整教学思路。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-5.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>17English产品好不好用，小明都说“好！”</h4>\r\n\t\t\t\t\t\t<p>不得不提上海地区的部分学校，老师们平均每周布置5.6篇作业，学生考试平均分提高了20.23%，约62.4%的学生觉得“学习英语更有信心了，从中获得更多乐趣“。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="even">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<img src="images/icon-desc-6.png" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="txt">\r\n\t\t\t\t\t\t<h4>不得不提的精英团队，牛X到爆表</h4>\r\n\t\t\t\t\t\t<p>专业的产品、专业的资源、专业的系统，还得要专业靠谱的团队才能实现，海龟+博士暂且不提，光是每天平均工作时间达到10.5个小时，处女、天秤和摩羯座稳居前三名的超级无敌组合+极致完美主义的办事风格，没有两把刷子的产品，我们都不好意思亮出来。</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="g-bottom">\r\n\t<p>版权所有：上海朗鹰教育科技有限公司 沪ICP备 11021655</p>\r\n\t<p>邮箱：customer.service@lyced.com</p>\r\n</div>';});


define('text!root-tpl/index/role.tpl',[],function () { return '<div class="pop-role">\r\n\t<div class="role-list fix">\r\n\t\t<a class="role-item" href="#teacher">\r\n\t\t\t<button class="btn btn-role btn-role-teacher">我是老师</button>\r\n\t\t</a>\r\n\t\t<a class="role-item role-student" href="#student">\r\n\t\t\t<button class="btn btn-role btn-role-student">我是学生</button>\r\n\t\t</a>\r\n\t</div>\r\n</div>';});


define('text!root-tpl/index/student.tpl',[],function () { return '<div class="pop-student">\r\n\t<form class="form student-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="realname"><i>*</i>真实姓名</label>\r\n\t        <input type="text" class="form-input" name="realname" id="realname" placeholder="请填写真实姓名" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="region-area">\r\n\t    \t\r\n\t    </div>\r\n\t    \r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="teacher"><i>*</i>教师姓名</label>\r\n\t        <input type="text" class="form-input" name="teacher" id="teacher" placeholder="请填写教师姓名" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">请填入老师告诉你的名字</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="telephone"><i>*</i>手机号码</label>\r\n\t        <input type="text" class="form-input" name="telephone" id="telephone" placeholder="请填写手机号码" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">仅用于找回密码时使用</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="email">邮箱</label>\r\n\t        <input type="text" class="form-input" name="email" id="email" placeholder="请填写邮箱" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="保&nbsp;&nbsp;&nbsp;&nbsp;存" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/index/teacher.tpl',[],function () { return '<div class="pop-teacher">\r\n\t<form class="form teacher-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="realname"><i>*</i>真实姓名</label>\r\n\t        <input type="text" class="form-input" name="realname" id="realname" placeholder="请填写真实姓名" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">请将该姓名告知学生，便于学生找到您</div>\r\n\t    </div>\r\n\t    <div class="region-area">\r\n\t    \t\r\n\t    </div>\r\n\t    \r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="code"><i>*</i>学校码</label>\r\n\t        <input type="text" class="form-input" name="code" id="code" placeholder="请填写验证码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="telephone"><i>*</i>手机号码</label>\r\n\t        <input type="text" class="form-input" name="telephone" id="telephone" placeholder="请填写手机号码" />\r\n\t        <div class="form-error"></div>\r\n\t        <div class="tip-msg">仅用于找回密码时使用</div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label">是否班主任？</label>\r\n\t        <label class="radio"><input type="radio" name="owner" value="0" />是</label>\r\n\t        <label class="radio"><input type="radio" name="owner" value="1" />否</label>\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="email">邮箱</label>\r\n\t        <input type="text" class="form-input" name="email" id="email" placeholder="请填写邮箱" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="保&nbsp;&nbsp;&nbsp;&nbsp;存" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/index/region.tpl',[],function () { return '<div class="form-control clearfix">\r\n    <label class="label" for="province"><i>*</i>省份</label>\r\n    <select class="form-select" name="province" id="province">\r\n    \t<option disabled selected>请选择省份</option>\r\n    \t{{~it.provinceList :v:i}}\r\n    \t<option value="{{=v.code}}" \r\n        {{ if(v.code == it.province){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n    \t{{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="city"><i>*</i>城市</label>\r\n    <select class="form-select" name="city" id="city">\r\n    \t<option disabled selected>请选择城市</option>\r\n        {{~it.cityList :v:i}}\r\n        <option value="{{=v.code}}" \r\n        {{ if(v.code == it.city){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="school"><i>*</i>学校</label>\r\n    <select class="form-select" name="school" id="school">\r\n        <option disabled selected>请选择学校</option>\r\n        {{~it.schoolList :v:i}}\r\n        <option value="{{=v.id}}" \r\n        {{ if(v.id == it.school){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="grade"><i>*</i>年级</label>\r\n    <select class="form-select" name="grade" id="grade">\r\n        <option disabled selected>请选择年级</option>\r\n        {{~it.gradeList :v:i}}\r\n        <option value="{{=v.code}}" \r\n        {{ if(v.code == it.grade){ }}\r\n        selected\r\n        {{ } }}\r\n        >{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n<div class="form-control clearfix">\r\n    <label class="label" for="classroom"><i>*</i>班级</label>\r\n    <select class="form-select" name="classroom" id="classroom">\r\n        <option disabled selected>请选择班级</option>\r\n        {{~it.classList :v:i}}\r\n        <option value="{{=v.id}}">{{=v.name}}</option>\r\n        {{~}}\r\n    </select>\r\n    <div class="form-error"></div>\r\n</div>\r\n';});


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
    var E_FIND_SCHOOL = 'findSchool';
    var E_FIND_GRADE = 'findGrade';
    var E_FIND_CLASS = 'findClass';
    var E_BIND_USER = 'bindUser';
    var E_GET_USERINFO = 'getUserInfo';

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
 * 首页
 */

define('index',[
	'text!root-tpl/index/main.tpl',
    'text!root-tpl/index/role.tpl',
    'text!root-tpl/index/student.tpl',
    'text!root-tpl/index/teacher.tpl',
    'text!root-tpl/index/region.tpl',
    'root-common/module/popup',
    './model',
    'root-common/util',
    'root-common/module/cookie'
], function(
	mainTpl,
    roleTpl,
    studentTpl,
    teacherTpl,
    regionTpl,
    popup,
    Model,
    util,
    cookie
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(mainTpl);
            me._roleTpl = doT.template(roleTpl);
            me._studentTpl = doT.template(studentTpl);
            me._teacherTpl = doT.template(teacherTpl);
            me._regionTpl = doT.template(regionTpl);
            me._pop = null;
            me._model = new Model;
            me._model.bind({
                'findProvince': $.proxy(me.findProvince, me),
                'findCity': $.proxy(me.findCity, me),
                'findSchool': $.proxy(me.findSchool, me),
                'findGrade': $.proxy(me.findGrade, me),
                'findClass': $.proxy(me.findClass, me),
                'getUserInfo': $.proxy(me.getUserInfo, me),
                'bindUser': $.proxy(me.bindUser, me)
            });
            me._token = cookie('tsw_token') || null; //用户口令
            me._username = ''; //用户名
            me.resetVars();
            
        },
        events: {
            'click .btn-register': '_register',
            'click .ui-nav-item': '_showrol',
            'click .btn-tip, .panel-tip': '_showTip',
            'click .btn-login': '_login'
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
        reset: function(){
            var me = this;
            me.$el.html('');
            me._pop.close();
            me._pop = null;
            me.resetVars();
        },
        resetVars: function(){
            var me = this;
            me._provinceList = []; //省份
            me._province = '';
            me._cityList = []; //城市
            me._city = '';
            me._schoolList = []; //学校列表
            me._school = '';
            me._gradeList = []; //年级列表
            me._grade = '';
            me._classList = []; //班级列表
            me._isStudent = false; //是否为学生绑定，true是false教师绑定
        },
        _register: function(e){
            e.preventDefault;
            this.register();
        },
        _showrol:function(e){
            var _index = $(e.target).index();
            $('.ui-nav-item').removeClass('ui-item-current').eq(_index).addClass('ui-item-current');
            $('.ui-panel-item').hide().eq(_index).show();
        },
        /**
         * [跳转到注册页面]
         */
        register: function(){
            window.location.href="#login";
        },
        /**
         * [绑定角色]
         */
        bindRole: function(){
            var me = this;
            me._pop = popup.create({
                title: '老师or学生?',
                custom: me._roleTpl({

                }),
                mask: true,
                isMove: false
            });
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
                mask: true,
                isMove: false
            });
            me._isStudent = true;
            me._model.findProvince();
            me.renderRegion();
            me.bindRegion();
            $('.form', me._pop.$el).submit($.proxy(me._validate, me));
        },
        /**
         * [教师信息]
         */
        updateTeacher: function(){
            var me = this;
            me._pop = popup.create({
                title: '我是老师',
                custom: me._teacherTpl({
                    
                }),
                mask: true,
                isMove: false
            });
            me._isStudent = false;
            me._model.findProvince();
            me.renderRegion();
            me.bindRegion();
            $('.form', me._pop.$el).submit($.proxy(me._validate, me));
        },
        bindRegion: function(){
            var me = this;
            me._pop.$el.on('change', 'select[name="province"]', $.proxy(me._changeProvince, me));
            me._pop.$el.on('change', 'select[name="city"]', $.proxy(me._changeCity, me));
            me._pop.$el.on('change', 'select[name="school"]', $.proxy(me._changeSchool, me));
            me._pop.$el.on('change', 'select[name="grade"]', $.proxy(me._changeGrade, me));
        },
        renderRegion: function(){
            var me = this;
            $('.region-area', me._pop.$el).html(me._regionTpl({
                provinceList: me._provinceList,
                province: me._province,
                cityList: me._cityList,
                city: me._city,
                schoolList: me._schoolList,
                school: me._school,
                gradeList: me._gradeList,
                grade: me._grade,
                classList: me._classList
            }));
        },
        _validate: function(e){
            var me = this;
            var v = me.validate($(e.currentTarget)).form();
            if(v){
                var email = $('input[name="email"]', me._pop.$el).val();
                if(email && !/^([\w-]+)@([\w-]+).([\w-]+)$/.test(email)){
                    util.errorTip('邮箱格式不正确');
                    return false;
                }
                
                var params = {
                    schoolId: me._school,
                    classId: $('select[name="classroom"]', me._pop.$el).val(),
                    realname: $('input[name="realname"]', me._pop.$el).val(),
                    studentOrTeacher: me._isStudent ? 'student' : 'teacher',
                    mobile: $('input[name="telephone"]', me._pop.$el).val(),
                    email: email,
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
        _showTip: function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.panel-tip', this.$el).show();
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
                    me._token = res.token;
                    cookie('tsw_token', me._token);
                    me._username = res.userBasic.loginName;
                    if(!res.bindStatus){
                        me.bindRole();
                    }else{
                        me.goProduct();
                    }
                }
                
                
            }, data, xhr);
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
                    me.goProduct();
                }
            }, data, xhr);
        },
        /**
         * [到产品页]
         * @param {[String]} [username] [用户名]
         */
        goProduct: function(username){
            var $form = $('<form method="post" action="'+window.oldServiceBase+'/LoginAction.action?method=loginFromLyMis"><input type="hidden" value="'+this._username+'" name="username"><input type="hidden" value="2" name="source"></form>')
            $form.submit();
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
            me._schoolList = [];
            me._school = '';
            me._gradeList = [];
            me._grade = '';
            me._classList = [];
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
            me._model.findClass({
                data: {
                    schoolId: me._school,
                    grade: val
                }
            });
        },
        _login: function(e){
            e.preventDefault();
            var me = this;
            me._model.getUserInfo({
                username: $('.ui-login input[name="name"]', me.$el).val(),
                pw: $('.ui-login input[name="password"]', me.$el).val()
            });
        }

    });

    return K;

});


define('text!root-tpl/login/main.tpl',[],function () { return '<div class="pop-login">\r\n\t<form class="form signup-form" action="">\r\n\t\t<div class="form-control clearfix">\r\n\t        <label class="label" for="loginName">创建用户</label>\r\n\t        <input type="text" class="form-input" name="loginName" id="loginName" placeholder="请输入账号" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="pw">输入密码</label>\r\n\t        <input type="password" class="form-input input-pw" name="pw" id="pw" placeholder="请输入密码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="cpw">确认密码</label>\r\n\t        <input type="password" class="form-input" name="cpw" id="cpw" placeholder="确认密码" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t        <label class="label" for="inputCode">验证码</label>\r\n\t        <input type="text" class="form-input form-input-code" name="inputCode" id="inputCode" />\r\n\t        <img src="" class="validate-code" />\r\n\t        <div class="form-error"></div>\r\n\t    </div>\r\n\t    <div class="form-control clearfix">\r\n\t       <input class="btn btn-confirm" type="submit" value="确&nbsp;&nbsp;&nbsp;&nbsp;认" />\r\n\t    </div>\r\n\t</form>\r\n</div>';});


define('text!root-tpl/login/main-bg.tpl',[],function () { return '<div class="log-header"></div>\r\n<div class="log-bottom"></div>';});

/**
 * 登录
 */

define('login',[
	'root-common/module/popup',
    'text!root-tpl/login/main.tpl',
    'text!root-tpl/login/main-bg.tpl',
    './model',
    'root-common/util'
], function(
	popup,
    mainTpl,
    mainBg,
    Model,
    util
) {
    // var E_GET_SECUITYCODE = 'login.securitycode';
    var E_AFTER_SIGNUP = 'after.signup';
    var ERROR_ICON = '<i class="icon-solid">&#xe901;</i>';

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(mainTpl);
            me._Btpl = doT.template(mainBg);
            me._pop = null;
            me._model = new Model;
            me.uuid = '';
            me._model.bind({
                'findRegister': $.proxy(me.findRegister, me),
                'findUuid':$.proxy(me.findUuid, me)
            });
        },
        events:{
            
        },
        render:function(){
            var me = this;
            me.$el.html(me._Btpl({
                
            }));
        },
        init: function(id){
            var me = this;
            me.render();
            me._pop = popup.create({
                title: '<i class="logo-login"></i><i class="seperator"></i>账号注册',
                custom: me._tpl({

                }),
                mask: true,
                isMove: false
            });
            me._model.findUuid();

            $('.signup-form', me._pop.$el).submit($.proxy(me._validate, me)).submit();

            $('.validate-code').click(function(){
                $('.validate-code').attr('src', window.serviceBase+'/getSecurityCode?uuid='+ me.uuid+ '&t='+(+new Date));
            })
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
            e.preventDefault()
            // 
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
                    agentCode: 10001
                }
            $.ajax({
                url: window.serviceBase + '/register?uuid=' + me.uuid + '&t='+(+new Date),
                type: 'post',
                data:data,
                success:function(data){
                    util.tip('注册成功，即将为您跳转到登录页', true);
                    setTimeout(function(){
                        window.location.href = '#';
                    }, 2000);
                    
                }
            })
            // util.dealAjax(function(isError){
            //     var data = {
            //         loginName:$('#loginName').val(),
            //         password:$('#pw').val(),
            //         inputCode:$('#inputCode').val(),
            //         uuid:me.uuid
            //     }
                
           
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

	//阿里云测试
	if(/139.196/g.test(hostname)){
		env = 'aliyun';
	}

	try {
		if(env == 'test'){
			//测试环境
		    window.serviceBase = preUrl + testIp + ':' + testServicePort;
		    window.oldServiceBase = preUrl + testIp + ':8080';
		}else if(env == 'aliyun'){
			//测试环境
		    window.serviceBase = 'http://www.17english.com/taoshiwanApi';
		    window.oldServiceBase = 'http://www.17english.com';
		}else{
			//生产
			window.serviceBase = preUrl + hostname + '/taoshiwanApi';
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
    './login',
    './auto-domain'
], function(
	Router,
	moduleMgr,
	Index,
	Login
) {


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

	var indexMain = moduleMgr.add(new Index({
        el: '#IndexPage'
    }));

    var loginMain = moduleMgr.add(new Login({
        el: '#LoginPage'
    }));

	//事件绑定
	router.bind({
		'gotoHome': function(){
			resetPage();
        	indexMain.init();
		},
		'gotoLogin': function(){
			resetPage();
        	loginMain.init();
		},
		'gotoRole': function(){
			resetPage();
        	indexMain.init();
        	indexMain.bindRole();
		},
		'gotoStudent': function(){
			resetPage();
        	indexMain.init();
        	indexMain.updateStudent();
		},
		'gotoTeacher': function(){
			resetPage();
        	indexMain.init();
        	indexMain.updateTeacher();
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

