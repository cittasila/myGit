<div class="hd-mask"></div>
<div class="hd-main">
	<a class="logo"></a>
	<div class="user-info">
		欢迎您 {{=it.userInfo.schoolName || ''}} {{=it.userInfo.gradeName || ''}} {{=it.userInfo.classesName || ''}} {{=it.userInfo.userRealName || ''}}!
		<span class="balance">
			<i></i>
			<span class="amount">{{=it.userInfo.amount}}</span>
		</span>
		<a class="btn-trade" href="javascript:;">
			交易记录
		</a>
	</div>
	<div class="user-control">
		<a href="javascript:;" class="ui-btn btn-home">
			<i class="icon-solid">&#xe601;</i>首页
		</a>
		<a href="javascript:;" class="ui-btn btn-logout">
			<i class="icon-solid">&#xe603;</i>退出
		</a>
	</div>
</div>
