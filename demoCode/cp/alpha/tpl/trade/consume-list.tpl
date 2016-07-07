{{ if(it.list.length){ }}
	{{~it.list :v:i}}
	<div class="trade-item">
		<span class="time">{{=it.release(v.buy_time)}}</span>
		<span class="info">{{=v.info}}</span>
		<span class="count">-{{=v.gold_num}}</span>
	</div>
	{{~}}
	<div class="pagi"></div>
{{ }else{ }}
	<div class="noitem">暂无记录</div>
{{ } }}
