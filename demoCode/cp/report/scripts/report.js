/**
 * 报告
 */

define([
	'text!root-tpl/report.tpl',
    'text!root-tpl/report-detail.tpl',
    'text!root-tpl/report-ability.tpl',
    'text!root-tpl/report-analyze.tpl',
    'text!root-tpl/report-level.tpl',
    'text!root-tpl/report-errors.tpl',
    'text!root-tpl/report-comment.tpl',
    'text!root-tpl/report-ability-svg.tpl',
    'root-common/util',
    './model'
], function(
	tpl,
    detailTpl,
    reportAbilityTpl,
    reportAnalyzeTpl,
    reportLevelTpl,
    reportErrorsTpl,
    reportCommentTpl,
    reportAbilitySvgTpl,
    util,
    Model
) {

    var RULE_MAP = {
        'COMMA_PARENTHESIS_WHITESPACE': '句法-标点',
        'SENTENCE_WHITESPACE': '标点-句子间或句子内标点后没有空格',
        'ADMIT_ENJOY_VB': '动词-固定词组',
        'MORFOLOGIK_RULE_EN_GB': '词和词形-拼写'
    };

	var K = Backbone.View.extend({
        initialize: function () {
            var me = this;
            me._tpl = doT.template(tpl);
            me._detailTpl = doT.template(detailTpl);
            me._reportAbilityTpl = doT.template(reportAbilityTpl);
            me._reportAnalyzeTpl = doT.template(reportAnalyzeTpl);
            me._reportLevelTpl = doT.template(reportLevelTpl);
            me._reportErrorsTpl = doT.template(reportErrorsTpl);
            me._reportCommentTpl = doT.template(reportCommentTpl);
            me._reportAbilitySvgTpl = doT.template(reportAbilitySvgTpl);
            me._model = new Model;
            me._model.bind({
                'find.report': $.proxy(me.findReport, me)
            });
            me.reset();
        },
        events: {
           'click .btn-top': '_top'
        },
        reset: function(){
            var me = this;
            me.$el.html('');
            me._id = null;
            me._position = '';
        },
        init: function(token, id, position){
            var me = this;
            me._id = id;
            me._position = position;
            me._model.findReport({
                data: {
                    assignmentId: me._id
                },
                token: window.token
            });
            me.render(); 
        },
        render: function(){
            var me = this;
            
            me.$el.html(me._tpl({
               id: me._id
            }));  
        },
        _top: function(position){
            position = position || 0;
            $('html, body').stop().animate({scrollTop: position}, 500);
        },
        /**
         * [报告]
         * @param {[Object]} [data] [数据]
         * @param {[Object]} [xhr] [xhr]
         */
        findReport: function(data, xhr, options, otherOptions){
            var me = this;
            
            util.dealAjax(function(isError){
                var res = data.data;
                if(!isError){
                    console.log(res);
                    $('.panel-detail > .inner', me.$el).html(me._detailTpl($.extend(true, {
                        formatTimeE: util.formatTimeE
                    }, res.detail)));
                    var title = res.detail.essay_set_title;
                    //作文能力评估数据
                    $('.panel-ability .list', me.$el).html(me._reportAbilityTpl($.extend(true, {
                        data: res.competencyAssessment,
                        parseNum: me.parseNum
                    }, res.detail)));
                    var columnChart = new FusionCharts(window.staticsBase + '/common/scripts/lib/FusionCharts/Charts/MSColumn2D.swf', '', '100%', '260', '0', '1');
                    columnChart.setDataXML(me._reportAbilitySvgTpl({
                        title: title,
                        data: res.competencyAssessment
                    }));
                    columnChart.render("compositionAbilityChart");

                    me.renderMicro(res);

                    $('.panel-level > .inner', me.$el).html(me._reportLevelTpl(res.writingLevel));


                    me.renderErrors(res);

                    $('.panel-comment > .inner', me.$el).html(me._reportCommentTpl(res.reviews));

                    if(me._position){
                        me._top($('#'+me._position+'-'+me._id).offset().top);
                    }
                }
            }, data, xhr);
        },
        parseNum: function(str){
            var fraction = str.split('/');
            var num = fraction[0];
            var total = fraction[1];
            return Number(num).toFixed(2) + '/' + total;
        },
        renderMicro: function(res){
            var me = this;
            //微技能评估
            var microData = res.microSkillsAssessment;
            var mine = microData[0];
            var classo = microData[1];
            var grades = microData[2];
            var radarChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'skillAnalyzeChart',
                    inverted: false,
                    polar: true,
                    type: 'area'
                },
                colors: ['#18b1da', '#ffba00', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['篇章结构', '思想内容', '句式运用', '词汇语法', '写作规范'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    y: 100,
                    layout: 'horizontal'
                },
                plotOptions: {
                    area: {
                        fillOpacity: '0.45',
                        lineWidth: '1.0',
                        marker: {
                            enabled: true,
                            radius: '2'
                        },
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                },
                series: [{
                    name: '我的评分',
                    data: [mine.org, mine.dev, mine.ss, mine.wc, mine.mech],
                    pointPlacement: 'on'
                }, {
                    name: '班级平均分',
                    data: [classo['class-org'], classo['class-dev'], classo['class-ss'], classo['class-wc'], classo['class-mech']],
                    pointPlacement: 'on'
                }, {
                    name: '年级平均分',
                    data: [grades['grade-org'], grades['grade-dev'], grades['grade-ss'], grades['grade-wc'], grades['grade-mech']],
                    pointPlacement: 'on'
                }]
            });

            $('.panel-analyze .list', me.$el).html(me._reportAnalyzeTpl($.extend(true, {
                mine: mine,
                classo: classo,
                grades: grades
            }, res.detail)));
        },
        renderErrors: function(res){
            var me = this;
            var errorList = res.errorList;
            errorList = me.getRuleData(errorList);
            var chartList = [];
            $.each(errorList, function(i, v){
                var arr = v.label.split('-');
                chartList.push({
                    label: arr ? (arr[1].length > 3 ? arr[1].slice(0, 3)+'...' : arr[1]) : v.label,
                    value: v.value
                });
            })
            var revenueChart = new FusionCharts({
                type: 'bar2d',
                renderAt: 'errorSummaryChart',
                width: '100%',
                height: '350',
                dataFormat: 'json',
                dataSource: {
                    'chart': {
                        "paletteColors": "#4f81be",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "valueFontColor": "#ffffff",
                        "showAxisLines": "1",
                        "axisLineAlpha": "25",
                        "divLineAlpha": "10",
                        "alignCaptionWithCanvas": "0",
                        "showAlternateVGridColor": "0"
                    },

                    'data': chartList
                }
            });
            revenueChart.render();

            $('.panel-summary .list', me.$el).html(me._reportErrorsTpl({
                list: errorList || []
            }));
        },
        getRuleName: function(ruleId){
            return RULE_MAP[ruleId] || ruleId;
        },
        getRuleData: function(ruleList){
            var me = this;
            var tmp = [];
            $.each(ruleList, function(i, v){
                tmp.push({
                    label: me.getRuleName(v.rule_id),
                    value: v.count
                });
            });
            return tmp;
        }
    });

    return K;

});
