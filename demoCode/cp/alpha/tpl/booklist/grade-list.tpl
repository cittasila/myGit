<li data-id="" title="All">
	<a href="javascript:;">All</a>
</li>
{{~it.list :v:i}}
<li data-id="{{=v.grade_id}}" title="{{=v.grade_name}}" 
{{ if(v.grade_id == it.gradeId){ }}
 class="active animate"
{{ } }}
>
	<a href="javascript:;">{{=window.gradeMap[v.grade_id]}}</a>
</li>

{{~}}