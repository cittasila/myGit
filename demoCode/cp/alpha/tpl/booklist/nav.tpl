<div class="nav-mask"></div>
<h2 class="title">主 题</h2>
<div class="nav-list default-skin">
	<ul>
		<li class="nav-item active" title="全部">全部</li>
		{{~it.list :v:i}}
		<li class="nav-item" title="{{!v.name}}">{{!v.name}}</li>
		{{~}}
	</ul>
</div>