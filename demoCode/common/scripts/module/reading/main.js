/**
 * @overview 阅读详情
 * @author Chunjie
 */

define([
    'text!./main.tpl'
], function(
    tpl
) {

    var E_READOVER = 'readover';
    var E_CHANGE_PAGE = 'change.page';

    var K = Backbone.View.extend({
        initialize: function(config){
            var me = this;
            me._tpl = doT.template(tpl);
            me._data = config.data;
            me._height = 0; //分页高度
            me._width = 0; //书本宽度
            me._top = 30; //上部距离
            me._left = 0; //左部距离
            me._padding = 35; //内页边距
            me.$book = $('.content-main', me.$el);
            me._activeAudio = null; //当前正在播放的音频
            me._currentPage = 2; //当前页
            me.timer = null;
            me._recordPlayTimer = null;
            me._autoPlayAudio = null;
            me._historyPlay = [];
        },  
        reset: function(){
            var me = this;
            me.timer && clearTimeout(me.timer);
            me._recordPlayTimer && clearInterval(me._recordPlayTimer);
        },
        events: {
            'mouseenter .sentence': '_showAudio',
            'mouseleave .sentence': '_hideAudio',
            'mousedown .sentence': '_showAudio',
            'click .icon-audio': '_playAudio',
            'mouseup .btn-next': '_readover'
        },
        /**
         * [调整阅读区域大小]
         * @param  {[Int]} width [宽度]
         * @param  {[Int]} height [高度]
         */
        resize: function(width, height){
            var me = this;
            me._height = height;
            me._width = width - me._padding * 2;
            me.$book.html('');
            
            me.setPage();
            //清空空段落，有待改进
            $('.page p').each(function(){
                if($(this).html() == ''){
                    $(this).remove();
                }
            });

            me.$book.booklet({
                width: me._width - me._left*2,
                height: me._height - me._top*2,
                next : $('.btn-next', me.$el),
                prev : $('.btn-prev', me.$el),
                pagePadding: 0,
                hoverWidth : 0
                // pageNumbers : false,
            });

            var total = $('.page', me.$el).length;

            $('.b-counter', me.$el).each(function(i){
                if(i >= total){
                    $(this).hide();
                }
            });

            var $count = $('.b-counter', me.$el).append('/'+total);

            me.$book.bind("bookletchange", function(event, data) {
                me._recordPlayTimer && clearInterval(me._recordPlayTimer);
                $('.playing', me.$el).removeClass('playing');
                var page = data.index + 2;
                me._currentPage = page;
                me._autoPlayAudio = null;
                me._historyPlay = [];
                me.trigger(E_CHANGE_PAGE);
            });

            $('.b-wrap-left', me.$el).parent().addClass('b-page-left');
            $('.b-wrap-right', me.$el).parent().addClass('b-page-right');
        },
        renderText: function(params){
            var me = this;
            
            var pic = params.sentenceO.pic;
            
            // var $pPic = me._insertParagraph($page);
            if(params.sentenceO.content && !params.isOverflow){
                params.$s = $('<span class="sentence" />').appendTo(params.$p);
                
                params.$s.attr({
                    'data-recording': params.sentenceO.recordingpath || '',
                    'data-id': params.sentenceO.id
                });

                if(params.sentenceO.recordingpath){
                    params.$s.append('<i class="icon-solid icon-audio">&#xe602;</i>');
                }

                var sentence = params.sentenceO.content;
                var words = sentence.split(/\s+/);

                params.tmp[params.i][params.j].words = words.slice();
                $.each(words, function(k, word){
                    if(word){
                        
                        var $word = $('<i class="word">'+word+' </i>').appendTo(params.$s);
                        params.isOverflow = me._checkOverflow(params.$page);
                        //移除单词
                        if(params.isOverflow){ 
                            var sentenceHeight = params.$p.height();
                            params.tmp = me._getOverplus(params.tmp, params.i, params.j, k, pic, sentenceHeight);
                        
                          
                            me.setPage(params.tmp);
                          
                            //带图片的句子可能过长超过一页的时候需要多加一个判断
                            if(pic && sentenceHeight < me._height - me._top*2){
                                params.$s.remove();
                            }else{
                                $word.remove();
                                if(params.$s.find('.word').length == 0){
                                    params.$s.remove();
                                }
                            }

                            // $word.remove();
                            
                            return false; 
                        }
                    }
                });
            }

            return params.isOverflow;
            
        },
        renderPic: function(params){
            var me = this;
            
            var pic = params.sentenceO.pic;
            if(pic && !params.isOverflow){

                var $pPic = me._insertParagraph(params.$page);
                
                var $img = $('<img src="'+window.imgPath+pic+'" />').appendTo($pPic).attr({
                    'data-id': params.sentenceO.id
                });

                var defaultSize = params.sentenceO.picwidthandheight;
                $pPic.addClass('p-pic');

                //todo
                if(!defaultSize){
                    var maxWidth = $img.width();
                    defaultSize = maxWidth+'*'+maxWidth*9/16;
                }

                var picSize = me.getPicSize(defaultSize, $img.width());

                $img.css({
                    width: picSize.width,
                    height: picSize.height
                });
                params.isOverflow = me._checkOverflow(params.$page);

                //移除图片
                if(params.isOverflow){ 
                    
                    if(params.$s){
                        var sentenceHeight = params.$s.outerHeight()+$pPic.height()+20; //20为段落间距
                    }else{
                        var sentenceHeight = $pPic.height();
                    }
                    
                    params.tmp = me._getOverplus(params.tmp, params.i, params.j, undefined, pic, sentenceHeight);
                    
                    if(sentenceHeight < me._height - me._top*2 && params.$s){
                        params.$s.remove();
                    }
                    $pPic.remove();
                    
                    me.setPage(params.tmp);
                    return params.isOverflow;
                }else{
                    params.tmp[params.i][params.j].pic = '';
                    
                }
                params.$p = me._insertParagraph(params.$page);
                
            }

            return params.isOverflow;
        },
        /**
         * [提取分页]
         */
        setPage: function(list){
            var me = this;
            list = list || me._data;
            var tmp = $.extend(true, [], list);
            
            var $page = me._insertPage();
            var isOverflow = false;
            $.each(list, function(i, paragraph){
                if($.type(paragraph) == 'array' && paragraph.length > 0 && !isOverflow){
                    var $p = me._insertParagraph($page);
                    
                    $.each(paragraph, function(j, sentenceO){
                        
                        if($.type(sentenceO) == 'object' && !isOverflow){
                            var pic = sentenceO.pic;
                            var $s;
                            var params = {
                                tmp: tmp,
                                sentenceO: sentenceO,
                                isOverflow: isOverflow,
                                $page: $page,
                                $p: $p, 
                                $s: $s,
                                i:i,
                                j:j
                            };
                            //图片位置在上面，句子新开段落
                            if(sentenceO.picpostion == 1 && sentenceO.pic){
                                me.renderPic(params);
                                me.renderText(params);
                            }else{
                                me.renderText(params);
                                me.renderPic(params);
                            }
                            isOverflow = params.isOverflow;
                            sentenceO = params.sentenceO;
                            tmp = params.tmp;
                            $page = params.$page;
                            $p = params.$p;
                            $s = params.$s;

                           
                        }
                        
                    });

                }

            });

            
            
        },
        getPicSize: function(size, maxWidth){
            var me = this;
            size = size.split('*');
            var picWidth = size[0];
            var picHeight = size[1];
            var minProportion = 0.82; //图片最小宽高比例限制，图片超出高度时
            if(picWidth == 0){
                picWidth = maxWidth;
                picHeight = maxWidth*9/16;
            }
            // var width = Math.min(picWidth, maxWidth);
            var width = maxWidth;
            var height = width * picHeight / picWidth;
            var maxHeight = me._height - me._top*2;
            console.log(maxHeight, height)
            if(height >= maxHeight * 0.9){  //0.9为接近与最大高度的值

                height = minProportion * maxHeight;
                width = height * picWidth / picHeight;
            }
            
            return {
                width: width,
                height: height
            };
        },
        /**
         * [获取未渲染数据]
         * @param  {[Array]} list [原始数据]
         * @param  {[Int]} i [段落索引]
         * @param  {[Int]} j [句子索引]
         * @param  {[Int]} k [单词索引]
         * @param  {[Boolean]} hasPic [是否有图片]
         * @param  {[Int]} sentenceHeight [有图片的前提下句子高度超过画布，切割]
         */
        _getOverplus: function(list, pIndex, sIndex, wIndex, hasPic, sentenceHeight){
            var me = this;
            $.each(list, function(i, paragraph){
                if(i < pIndex){
                    list.splice(i, 1, []);
                }else if(i == pIndex){
                    if(sIndex !== undefined){
                        $.each(paragraph, function(j, sentence){
                            if(j < sIndex){
                                sentence.content = '';
                                delete sentence.words;
                            }
                            if(j == sIndex){
                                if(hasPic){
                                    //句子高度超过画布
                                    if(sentenceHeight >= me._height - me._top*2){
                                        sentence.content = '';
                                        delete sentence.words;
                                    }
                                }else{

                                    if(wIndex && sentence.words){
                                        sentence.words = sentence.words.slice(wIndex);
                                        sentence.content = sentence.words.join(' ');
                                    }
                                    //wIndex可能为0
                                    if(wIndex === undefined){
                                        sentence.content = '';
                                        delete sentence.words;
                                    }
                                }
                                
                            }
                            
                        });
                    }
                }
            });
            return list;
        },
        _insertPage: function(){
            var me = this;
            var $page = $('<div class="page" />').appendTo(me.$book);
            $('.page', me.$el).css({
                width: me._width/2 - me._left*2
            });
            return $page;
        },
        _insertParagraph: function($page){
            return $('<p />').appendTo($page);
        },
        _checkOverflow: function($page){
            var me = this;
            var max = Math.ceil(me._height - me._top*2);
            
            if($page.height() > max){
                return true;   
            }
            return false;
        },
        _getAudio: function(src){
            return $('<audio controls="controls" unselectable="on" preload="true"><source src="'+window.imgPath+src+'" type="audio/mpeg"></audio>');
        },
        _showAudio: function(e){
            var me = this;
            e.stopPropagation();
            var $target = $(e.currentTarget);
            var $sentence = $('.sentence', me.$el);
            var index = $sentence.index($target);
            me.showAudio($target);
            me.showAudio($sentence.eq(index+1));
            //防止事件捕获
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function(){
                $('.icon-audio', me.$el).hide();
                $('.icon-audio', $target).show();
            }, 100);
        },
        showAudio: function(sentenceNode){
            var me = this;
            var src = sentenceNode.data('recording');
            var hasRender = sentenceNode.data('hasrender');
            if(src && !hasRender){
                var $audio = me._getAudio(src);
                $audio.appendTo(sentenceNode);
                sentenceNode.data('hasrender', 1);
            }
        },
        _hideAudio: function(e){
            var me = this;
            var $target = $(e.currentTarget);
            me.timer && clearTimeout(me.timer);
            me.timer = setTimeout(function(){
                $('.icon-audio', me.$el).hide();
            }, 100);
            
        },
        _playAudio: function(e){
            var me = this;
            
            var $icon = $(e.currentTarget);
            var $sentence = $icon.parent();
            var $audio = $sentence.find('audio');
            
            
            me.playAudio($audio);
            
        },
        playAudio: function($audio, loopList, i, cb){
            var me = this;
            var audio = $audio[0];
            var $sentence = $audio.parent();
            var $icon = $sentence.find('.icon-audio');

            if(audio && audio.play){
                if(me._activeAudio){
                    me._activeAudio.pause();
                    me._activeAudio.currentTime = 0.0;
                }
                if(loopList && me._historyPlay.indexOf(audio.currentSrc) !== -1){
                    var nextIndex = i + 1;
                    if(nextIndex < loopList.length){
                        me.playAudio(loopList.eq(nextIndex), loopList, nextIndex, cb);
                    }else{
                        cb && cb();
                    }
                }else{
                    audio.play();
                    me._activeAudio = audio;
                    
                    $icon.hide();
                    $('.playing', me.$el).removeClass('playing');
                    $sentence.addClass('playing');
                    try{
                        var index = $('.sentence audio', me.$el).index($(audio));
                        var next = $('.sentence audio', me.$el).eq(index+1)[0];
                        var isRepeat = audio.currentSrc == next.currentSrc;
                        if(isRepeat){
                            $(next).closest('.sentence').addClass('playing');
                        }
                    }catch(e){

                    }
                    
                    if(loopList){
                        me._historyPlay.push(audio.currentSrc);
                    }
                    
                    me._recordPlayTimer && clearInterval(me._recordPlayTimer);
                    me._recordPlayTimer = setInterval(function(){
                        if(audio.ended){
                            $('.playing', me.$el).removeClass('playing');
                            var nextIndex = i + 1;
                            
                            clearInterval(me._recordPlayTimer);
                            if(loopList && nextIndex < loopList.length){
                                me.playAudio(loopList.eq(nextIndex), loopList, nextIndex, cb);
                            }else{
                                cb && cb();
                            }
                        }
                    }, 30);
                }
                
            }
        },
        _readover: function(){
            var me = this;
            if($('.page', me.$el).length <= me._currentPage){
                me.reset();
                me.trigger(E_READOVER);
            }
            
        },
        autoPlay: function(page, isLoop){
            var me = this;
            if(!page){
                var page = me._currentPage;
                page = page-2;
            }
            var currentAudio = me._autoPlayAudio;
            var start = 0;
            if(currentAudio && !isLoop){
                page = $('.b-page').index($(currentAudio).closest('.b-page'));
            }
            var $page = $('.b-page').eq(page);
            $page.find('.sentence').each(function(i){
                me.showAudio($(this));
            });
            $('.b-page').eq(page+1).find('.sentence').each(function(i){
                me.showAudio($(this));
            });
            var loopList = $page.find('audio');
            if(currentAudio && !isLoop){
                start = loopList.index($(currentAudio));
            }
            me.playAudio(loopList.eq(start), loopList, start, function(){
                var currentPage = page+1;
                if($('.page', me.$el).length == currentPage){
                    return;
                }
                if(currentPage%2 == 0){
                    $('.btn-next', me.$el).trigger('click');
                    setTimeout(function(){
                        me.autoPlay(page+1, true);
                    }, 2000);
                }else{
                    me.autoPlay(page+1, true);
                }
            });
        },
        pauseAudio: function(){
            var me = this;
            if(me._activeAudio){
                me._activeAudio.pause();
                me._activeAudio.currentTime = 0.0;
            }
            me._autoPlayAudio = me._activeAudio;
            $('.playing', me.$el).removeClass('playing');
            me._recordPlayTimer && clearInterval(me._recordPlayTimer);
        }
    });
   
    return K;  

});