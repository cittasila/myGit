{{
	var right = null;
	var index = null;
}}

<div class="ui-choice">
	<div class="title">
		Choose the best answer to the questions below.
	</div>

	<div class="question-area" data-id="{{=it.exercise.questionId}}" data-userdoid="{{=it.exercise.userDoquestionId}}">
		<div class="line"></div>
		<div class="content">
			<div class="row-title">Question:</div>
			<div class="question">{{=it.title}}</div>
			<div class="row-title">Option:</div>
			<ul class="option-list">
				{{~it.list :v:i}}
				{{ if($.trim(v.questionOption)){ }}
				<li class="option-item 
				{{ if(i == it.list.length - 1){ }}
				option-item-last 
				{{ } }}
				{{ if(v.isRight){ }}
				option-right 
				{{ }else{ }}
				option-error 
				{{ } }}
				"  data-id="{{=v.questionOptionId}}">
					{{=it.options[i]}}. {{=v.questionOption}}
					<i class="icon-solid icon-result icon-error">&#xe915;</i>
					<i class="icon-solid icon-result icon-right">&#xe916;</i>
				</li>

				{{ 
					if(v.isRight){
						right = v;
						index = i;
					}
				}}
				{{ } }}
				{{~}}
			</ul>
		</div>
		<a class="btn btn-check btn-disable" href="javascript:;">检&nbsp;&nbsp;查</a>
	</div>

	<div class="answer-area" style="display:none;">
		<div class="line"></div>
		<div class="row-title">The Answer:</div>
		<div class="answer">
			<p>{{=it.options[index]}}. {{=right.questionOption}}</p>
		</div>
		<a class="btn btn-next" href="javascript:;">继&nbsp;&nbsp;续</a>
	</div>
</div>