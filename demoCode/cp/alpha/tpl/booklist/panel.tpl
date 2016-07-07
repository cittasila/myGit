{{ if(it.isMyList){ }}
<h3 class="title">我的读物 
	<span>共<i>{{=it.list.length}}</i>本</span>
	
</h3>
{{ }else{ }}
<h2 class="title"> 
	{{ if(it.chooceTitle != ''){ }}
		{{=it.chooceTitle}}
	{{ }else{ }}
		全部
	{{ } }}
</h2>
{{ } }}
<div class="panel-list default-skin">
	{{ if(it.list.length > 0){ }}
	<ul class="fix">
		{{~it.list :v:i}}
		<li class="panel-item ">
			<h4>{{=v.booktitle}}</h4>
			<div class="img">
				<img src="{{=window.staticsBase}}/common/images/loading/ajax-loader.gif" title="{{=v.tip}}" data-url="{{=window.imgPath}}/{{=v.imgurl}}" class="loading" />
			</div>
			
			<p>难度：{{=v.showlevel}}</p>
			<i class="progress 
			{{ if(v.readStatus === '0' || v.readStatus === '1'){ }}
			progress-ing
			{{ } }}
			{{ if(v.readStatus === '3'){ }}
			progress-complete
			{{ } }}
			"></i>
		</li>
		{{~}}
	</ul>
	{{ }else{ }}
	<div class="nobook">暂无读物</div>
	{{ } }}
	
</div>