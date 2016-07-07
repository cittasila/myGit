<p class="info">
	<span class="label">教师：</span>
	<span class="txt txt-short">{{=it.teacher}}</span>
</p>
<p class="info">
	<span class="label">学生：</span>
	<span class="txt txt-short">{{=it.studentName}}</span>
</p>
<p class="info">
	<span class="label">班级：</span>
	<span class="txt txt-long">{{=it.classes}}</span>
</p>
<p class="info">
	<span class="label">标题：</span>
	<span class="txt txt-long txt-title">{{=it.essay_set_title}}</span>
</p>
<p class="info">
	<span class="label">要求：</span>
	<span>{{=it.essay_set_requirement}}</span>
</p>
<div class="content">
	<div class="label">作文内容：</div>
	<div class="content-info">
		<span class="words">
			字数：<i>{{=it.wordCount}}</i>字
		</span>
		<span class="time">
			写作用时：<i>{{=it.formatTimeE(it.timeDiff * 1000)}}</i>
		</span>
		<!-- <span class="submit-times">
			提交稿次：<i>1</i>次
		</span> -->
	</div>
	<p class="title">{{=it.essay_set_title}}</p>
	<p>{{=it.assignmentContent}}</p>
</div>