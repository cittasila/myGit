{{~it.list :v:i}}
{{
	var name = v.grade_name;
	var splitIndex = name.indexOf('（');
}}
{{ if(splitIndex !== -1){ }}
<li data-id="{{=v.grade_id}}" class="wide">
	{{
		var desc = name.slice(splitIndex+1, name.length-1);
		name = name.slice(0, splitIndex);
	}}
	<p class="sanjiao"></p>
	<div class="row">{{=name}} <i>{{=window.gradeMap[v.grade_id]}}</i></div>
	<div class="row"><em class="top">（</em>{{=desc}}<em class="bottom">）</em></div></li>
{{ }else{ }}
<li data-id="{{=v.grade_id}}" class="grade-{{=v.grade_id}}"><p class="sanjiao"></p><span>{{=name}}</span> <i>{{=window.gradeMap[v.grade_id]}}</i></li>
{{ } }}

{{~}}