<div class="bg"></div>
<div class="main">
	<div class="">
		<div class="book">
			<!-- 图书封面 -->
			<img width="119" height="152" src="{{=window.imgPath}}/{{=it.book.imgurl}}" title="{{=it.book.booktitle}}">
		</div>
		<p class="title1">Perfect! 快来给个评价吧！</p>
		<!-- <p class="title2">有没有感觉语感又更好了一点呢&ensp;!</p> -->
	</div>
	<div class="talk">
		<!-- <p class="title2">给点评价啵&ensp;~&ensp;~</p> -->
		<div class="btn-group">
			<!-- 点评按钮 -->
			{{~it.list :v:i}}
				<span class="title4 btn-talk" spanid="{{=v.id}}">{{=v.labelContent}}</span>
			{{~}}
		</div>
	</div>
	
	<div class="titles">
		{{ if(it.data.readingComprehension != 0){ }}
		<p>还有习题等你来挑战！</p>
		{{ } }}
	</div>
	
	
	<div class="">
		<button class="btn-result again">
            <span class="icon-solid icon-loop">
            &#xe90f;
            </span>
            <span class="title3">再读一遍</span>	
		</button>
		{{ if(it.data){ }}
			{{ if(it.data.readingComprehension == 0){ }}
			<button class="btn-result more read-more">
	            <span class="icon-solid icon-more">
	            &#xe90e;
	            </span>
	            <span class="title3 ">阅读更多</span>	
			</button>
			{{ }else{ }}
			<button class="btn-result more next">
	            <span class="icon-solid icon-more">
	            &#xe90e;
	            </span>
	            <span class="title3 ">进入习题</span>	
			</button>
			{{ } }}
		{{ } }}
 	</div>
</div>