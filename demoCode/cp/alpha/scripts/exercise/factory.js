define([
	'./choice'
], function(
    Choice
) {

    return {
        list: [],
        init: function(options){
            if(!options || !options.type){
                return null;
            }
            var type = options.type;
            var exercise = null;
            switch(type){
                case 'choice':
                    exercise = new Choice(options);
                    break;
            };
            if(exercise){
                this.list.push(exercise);
            }
            
            return exercise;
        },
        reset: function(){
            $.each(this.list, function(i, v){
                v.reset();
            });
            this.list = [];
        }
    }

});