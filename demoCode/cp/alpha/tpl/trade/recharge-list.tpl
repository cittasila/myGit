{{ if(it.list.length){ }}
	{{~it.list :v:i}}
	<div class="trade-item">
		<span class="time">{{=it.release(v.pay_time)}}</span>
		<span class="info">{{=v.order_type == 1 ? '支付宝' : '微信'}}</span>
		<span class="count">+{{=v.total_fee}}</span>
	</div>
	{{~}}
	<div class="pagi"></div>
{{ }else{ }}
	<div class="noitem">暂无记录</div>
{{ } }}
