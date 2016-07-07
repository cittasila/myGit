<div class="form-control fix"> 
   <input class="btn btn-confirm" type="submit" value="确&nbsp;&nbsp;&nbsp;&nbsp;定" />
   {{ if(!it.isTeacher){ }}
   <a href="#product" class="btn btn-skip">跳过验证</a>
   {{ }else{ }}
   <button class="btn btn-logout">返回</button>
   {{ } }}
   
</div>
{{ if(!it.isTeacher){ }}
<div class="form-control fix">
	<span class="highlight">建议进行手机号码验证 ，否则无法使用找回密码功能哦 ^_^</span>
</div>
{{ } }}