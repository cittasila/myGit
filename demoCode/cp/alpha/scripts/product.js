/**
 * 角色
 */

define([
    'text!root-tpl/product.tpl',
    // 'text!root-tpl/user/main.tpl',
    './model',
    'root-common/module/popup',
    'root-common/util',
    'root-common/module/cookie',
    './stat',
    'text!root-tpl/video.tpl',
    'root-common/md5'
], function(
    productTpl,
    // usermainTpl,
    Model,
    popup,
    util,
    cookie,
    stat,
    videoTpl
) {

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(productTpl);
            me._videoTpl = doT.template(videoTpl);
            me._model = new Model;
            me._isStudent = false;
            me.status= 0;
            me._bookId = null;
            me._video = null;
            me._isFreeRegister = null;
            $(window).resize(function(){
                me._pop && me._pop.resize();
            });
            me._hasGrade = undefined;
        },
        reset: function(){
            this.$el.html('');
            this.stopListening();
            this._video = null;
            this._isStudent = false;
            this._hasGrade = undefined;
        },
        events: {
            'click [rol-stat]': '_statArrow',
            'click .btn-user':'showUser',
            'click .icon-play': '_playVideo',
            'click .video-close': '_closeVideo',
            'click .btn-manuals': '_manuals'
        },
        _manuals: function(e){
            e.preventDefault();
            var me = this;
            var url = '/intro/';
            url += me._isStudent ? 'manuals-student.pdf' : 'manuals-teacher.pdf'
            window.open(url, '_blank');
        },
        init: function(){
            var me = this;
            var token = cookie('hzw_reading_token');
            if(!token){
                window.location.href = '#';
            }
            
        },
        render: function(){
            var me = this;
            var token = cookie('hzw_reading_token');
            
            me.$el.html(me._tpl({
                
            }));
            
        },
        setVideo: function(user){
            var me = this;
            me._isFreeRegister = user.userRegisterType == '8';
            //42为教师
            if(user.roleId == '42'){
                me._video = 'reading-teacher.mp4';
            }else{
                me._isStudent = true;
                me._video = 'reading-student.mp4';
            }
            me._hasGrade = user.gradeId;
            me.render();
        },
        /**
         * [用户信息管理]
         */
        showUser:function(){
            var me = this;
            window.location.href = '#information' 
        },
        /**
         * [点击统计]
         */
        _statArrow: function(e){
            var me = this;
            var dstat = $(e.currentTarget).data('stat');
            stat.send({
                url: '/user/log',
                data: {
                    type: "product",
                    data: '{"product_id":"'+ dstat +'","info":""}'
                }
            });
            me.goJump(dstat);
        },
        /**
         * [跳转老版写作/进阅读]
         */
        goJump: function(dstat){
            var me = this;
            if(dstat == '6'){
                if(me._hasGrade){
                    window.location.href = '#booklist';
                }else{
                    window.location.href = '#grade';
                    
                }
                
            }else{
                if(me._isFreeRegister){
                    window.location.href = window.staticsBase + '/writing/student/index.html?token='+cookie('hzw_reading_token')+'&url='+encodeURIComponent(window.location.href);
                }else{
                    window.location.href = window.writeBase + '/service/LoginAction/login?un='+ Model.data.userInfo.userName +'&token='+ Model.data.userInfo.token +'&key=' + $.md5(Model.data.userInfo.userName+Model.data.userInfo.token) ;    
                }
            }
        },
        _playVideo: function(e){
            var me = this;
            if(me._video){
                var url = window.staticsBase + '/common/scripts/lib/video/video.min.js';
                require([url], function(videojs){
                    var id = 'video' + (+new Date);
                    $('.ui-video', me.$el).html(me._videoTpl({
                        video: me._video,
                        id: id
                    }));
                    me._isRenderVideo = true;
                    videojs(id).ready(function(){

                      this.play();
                     
                    });
                });
            }
        },
        _closeVideo: function(){
            $('.ui-video', this.$el).html('');
        }
    });

    return K;

});
