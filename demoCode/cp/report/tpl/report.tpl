<div class="header">
	<a href="#" class="logo">
		<i class="icon-linear btn-back">&#xe900;</i>
		<span class="img"></span>
	</a>
	<i class="icon-linear btn-top">&#xe910;</i>
</div>
<div class="nav-list">
	<a class="nav-item item-writingDetail" href="#writingDetail/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">写作详情</span>
	</a>
	<a class="nav-item item-compositionAbility" href="#compositionAbility/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">作文能力评估数据</span>
	</a>
	<a class="nav-item item-skillAnalyze" href="#skillAnalyze/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">写作微技能评估</span>
	</a>
	<a class="nav-item item-writingLevel" href="#writingLevel/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">写作水平</span>
	</a>
	<a class="nav-item item-errorSummary" href="#errorSummary/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">错误汇总</span>
	</a>
	<a class="nav-item item-systemComment" href="#systemComment/{{=window.token}}/{{=it.id}}">
		<span class="num"></span>
		<span class="txt">系统评语</span>
	</a>
</div>
<section class="panel-item panel-detail" id="writingDetail-{{=it.id}}">
	<h2>
		<span>写作详情</span>
		<i class="icon"></i>
	</h2>
	<div class="inner"></div>
</section>
<section class="panel-item panel-ability" id="compositionAbility-{{=it.id}}">
	<h2>
		<span>作文能力评估数据</span>
		<i class="icon"></i>
	</h2>
	<div class="inner">
		<div class="chart" id="compositionAbilityChart"></div>
		<div class="list"></div>
	</div>
</section>
<section class="panel-item panel-analyze" id="skillAnalyze-{{=it.id}}">
	<h2>
		<span>写作微技能评估</span>
		<i class="icon"></i>
	</h2>
	<div class="inner">
		<div class="chart" id="skillAnalyzeChart" style="margin-top:-100px;"></div>
		<div class="list"></div>
	</div>
</section>
<section class="panel-item panel-level" id="writingLevel-{{=it.id}}">
	<h2>
		<span>写作水平</span>
		<i class="icon"></i>
	</h2>
	<div class="inner"></div>
</section>
<section class="panel-item panel-summary" id="errorSummary-{{=it.id}}">
	<h2>
		<span>错误汇总</span>
		<i class="icon"></i>
	</h2>
	<div class="inner">
		<div class="chart" id="errorSummaryChart" style="padding:20px;"></div>
		<div class="list"></div>
	</div>
</section>
<section class="panel-item panel-comment" id="systemComment-{{=it.id}}">
	<h2>
		<span>系统评语</span>
		<i class="icon"></i>
	</h2>
	<div class="inner"></div>
</section>