<form class="news-form">
	<div class="list">
		<p class="details left"><span>*</span>姓&emsp;名</p>
		<p class="details right">
			<input type="text" class="user-name" value="{{=it.userInfo.userRealName}}" name="userRealName" >
		</p>
		<div class="form-error"></div>
	</div>
	<div class="list">
		<p class="details left">姓&emsp;别</p>
		<p class="details right">
			<label>
				<input type="radio" name="userGender" value="1" 
				{{ if(it.userInfo.userGender ==1){ }}
		        checked
		        {{ } }}
				>&ensp;男
			</label>&emsp;&emsp;
			<label>
				<input type="radio" name="userGender" value="0" 
				{{ if(it.userInfo.userGender ==0){ }}
		        checked
		        {{ } }}
				>&ensp;女
			</label>
		</p>
	</div>
	<div class="list">
		<p class="details left">邮&emsp;箱</p>
		<p class="details right">
			<input type="text" value="
			{{ if(it.userInfo.userEmail != null){ }}
			{{=it.userInfo.userEmail}}
			{{ } }}
			" name="userEmail" class="user-email">
		</p>
		<div class="form-error"></div>
	</div>
	<div class="list btn-submit">
		<input type="submit" value="保存" class="save-user" >
		<input type="button" value="取消" class="return-back" >
	</div>
</form>