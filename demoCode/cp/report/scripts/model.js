
define([
    'root-common/util'
], function(util) {

	var E_FIND_REPORT = 'find.report';

    var K = Backbone.Model.extend({
        initialize: function(){},
        /**
         * [报告]
         * @param  {[Object]} options [请求参数]
         */
        findReport: function(options){
            var params = {
                url: window.serviceBase + '/hzwReport/report',
                data: options.data,
                headers: {
                    token: options.token
                }
            };
            util.request.call(this, params, E_FIND_REPORT);
        }
    });

    return K;

});