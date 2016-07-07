/**
 * 多选题
 */

define([
	'./base'
], function(
	Base
) {

    var K = Base.extend({
        initialize: function () {
        	Base.prototype.initialize.apply(this, arguments);
        }
    });

    return K;

});