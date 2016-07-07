$(function(){
	var myAudio = $("audio")[0];
	var $source = $("source")[0];
	var time ;

	$(".btn_play").click(function(){
		if (myAudio.paused) {
			myAudio.play();
			time = setInterval(GetBack, 500);
		} else {
			myAudio.pause();
			clearInterval(time)
		}
		$('.status')[myAudio.paused? 'removeClass' : 'addClass']('status-change');
	})

	$('.main-li p').bind('click',function(e){
		var $target = $(e.target).closest('li');
		$target.children('p').removeClass('choce')
		$(this).addClass('choce')
	});

	function GetBack(){
		var usertime = parseInt(myAudio.currentTime);
		var totaltime = parseInt(myAudio.duration);
		var bili = usertime/totaltime*390
		$('.bar').stop().animate({
			width:bili
		})
		if(usertime == totaltime){
			clearInterval(time);
			$('.status').removeClass('status-change');
		}
	}
})