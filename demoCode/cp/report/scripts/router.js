define(function() {

    var E_GOTO_HOME = 'gotoHome';
    var E_GOTO_REPORT = 'gotoReport';

    var K = Backbone.Router.extend({
        routes: {
            "": "gotoHome",
            "report/:id/:id": "gotoReport",
            "writingDetail/:id/:id": "gotoWritingDetail",
            "compositionAbility/:id/:id": "gotoCompositionAbility",
            "skillAnalyze/:id/:id": "gotoSkillAnalyze",
            "writingLevel/:id/:id": "gotoWritingLevel",
            "errorSummary/:id/:id": "gotoErrorSummary",
            "systemComment/:id/:id": "gotoSystemComment"
        },
        initialize: function(){},
        /**
         * [进入首页]
         */
        gotoHome: function(){
            this.trigger(E_GOTO_HOME);
        },
        /**
         * [进入报告]
         */
        gotoReport: function(token, id, position){
            this.trigger(E_GOTO_REPORT, token, id, position);
        },
        gotoWritingDetail: function(token, id){
            this.gotoReport(token, id, 'writingDetail');
        },
        gotoCompositionAbility: function(token, id){
            this.gotoReport(token, id, 'compositionAbility');
        },
        gotoSkillAnalyze: function(token, id){
            this.gotoReport(token, id, 'skillAnalyze');
        },
        gotoWritingLevel: function(token, id){
            this.gotoReport(token, id, 'writingLevel');
        },
        gotoErrorSummary: function(token, id){
            this.gotoReport(token, id, 'errorSummary');
        },
        gotoSystemComment: function(token, id){
            this.gotoReport(token, id, 'systemComment');
        }
    });

    return K;

});