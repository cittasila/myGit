/**
 * @overview 分页
 * @author Chunjie
 * @version 2015-09-25
 */

define([
    'text!./pagination.tpl'
], function(tpl){
    
    var K = Backbone.View.extend({
        initialize: function(options) {
            options.total = options.total || 1;
            options.current = options.current || 1;
            this.options = options;
            this._tpl = doT.template(tpl);
            this.render();
        },
        events: {
            'click .page': '_go',
            'click .pagi-go': '_direct',
            'click .pagi-first': '_goFirst',
            'click .pagi-last': '_goLast'
        },
        _go: function(e){
            e.preventDefault();
            var me = this;
            var o = $(e.currentTarget);
            if (o.hasClass('pagi-prev')) 
                me.prev();
            else if (o.hasClass('pagi-next')) 
                me.next();
            else {
                var rel = parseInt($.trim(o.attr('rel')));
                if(/\d+/.test(rel)){
                    me.go(parseInt(rel));
                }
            }
        },
        _direct: function(e){
            e.preventDefault();
            var index = $('.pagi-which', this.$el).val();
            try{
                index = parseInt(index);
                if(index <= this.options.total){
                    this.go(index);
                }
            }catch(e){

            }
        },
        _goFirst: function(e){
            e.preventDefault();
            this.go(1);
        },
        _goLast: function(e){
            e.preventDefault();
            this.go(this.options.total);
        },
        render: function(){
            this.$el.html(this._tpl(this.options));
        },
        reset: function(options) {
            if(options) {
                $.extend(this.options, options);
            }
            this.render();
        },
        total: function(i) {
            if(i !== undefined) {
                this.options.total = i;
            }
            return this.options.total;
        },
        current: function(i) {
            if(i !== undefined) {
                this.options.current = i;
            }
            return this.options.current;
        },
        go: function(i, cb) {
            this.current(i);
            this.reset();
            if(cb) {
                cb(this.options.current);
            }
            this.trigger('toggle', i);
            return this;
        },
        prev: function(cb) {
            if(this.options.current > 1) {
                this.go(this.options.current - 1, cb);
            }
            return this;
        },
        next: function(cb) {
            if(this.options.current < this.options.total) {
                this.go(this.options.current + 1, cb);
            }
            return this;
        },
        first: function() {
            if(this.options.current > 1) {
                this.go(1);
            }
            return this;
        },
        last: function() {
            if (this.options.current < this.options.total) {
                this.go(this.options.total);
            }
            return this;
        }
    });

    return K;
});


