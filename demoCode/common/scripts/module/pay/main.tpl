<a href="javascript:;" class="btn-close"></a>
{{ if(it.overage){ }}
<div class="panel-pay panel-overage">
	<p>购买本书需要<i class="num">{{=it.coin}}</i>金币</p>
	<p>您是否确定要购买？</p>
	<a href="javascript:;" class="btn btn-purchase">
		购买
	</a>
</div>
{{ }else{ }}
<p class="title">账户储币</p>
<div class="panel-pay panel-recharge">
	<ul class="price-list">
		{{~it.list :v:i}}		
		<li class="item-money fix">
			<div class="inner">
				<p class="gold">{{=v.goldAmount}}</p>
				<p><img src="images/money_{{=i}}.png" width="50" height="50"></p>
				<p class="as">~</p>
				<p class="money">{{=v.rmb}}元</p>
			</div>
			
		</li>
		{{~}}		
	</ul>
	<div class="detail">

	</div>
	{{ if(it.itemType == 'book'){ }}
	<p class="pay-str">购买本书需要<i class="num">{{=it.item.goldcoin}}</i>金币，账户余额<i class="num">{{=it.coin}}</i>金币</br>您的余额不足...</p>
	{{ } }}
	
	<div class="btn-pay">
		<a href="javascript:;" class="btn btn-wechat" data-name="wechat" >
			<i class="icon-solid">&#xe907;</i>微信支付
		</a>
		<a href="javascript:;" class="btn btn-alipay" data-name="alipay" >
			<i class="icon-solid">&#xe908;</i>支付宝支付
		</a>
	</div>
</div>
{{ } }}
