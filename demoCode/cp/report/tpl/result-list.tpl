<div class="result-list">
	{{ if(it.list.length){ }}
	<h4>这位同学在本次好作文大赛中共写了 {{=it.list.length}} 篇作文，请点击查看</h4>
	<ul>
		{{~it.list :v:i}}
		<li>
			<a href="#report/{{=it.token}}/{{=v.assignmentId}}">
				<span class="txt">{{=i+1}}. {{=v.essaySetTitle}}</span>
				<span class="btn-view">查看报告</span>
			</a>
		</li>
		{{~}}
	</ul>	
	{{ }else{ }}
	<h4>这位同学在本次好作文大赛中共写了 0 篇作文</h4>
	{{ } }}
	
</div>