{{
	var right = null;
	var index = null;
}}

<div class="bg"></div>
<div class="p-question">
	<div class="ui-exercise">
		<div class="mask"></div>
		<div class="main p-result">
			<div class="mask"></div>
			<div class="content ">
				<p class="icon">
					<span class="icon-single-arrow-right icon-solid icon">
		                &#xe60d;
		            </span>
		            <span class="icon-single-arrow-right icon-solid icon right">
		                &#xe60d;
		            </span>
		            <span>阅读理解<br/>&emsp;&ensp;&ensp;Comprehension</span>
				</p>
			</div>
			<div class="border chart fix">
				<div class="box left">
					<div id="placeholder" class="demo-placeholder"></div>
					<div class="composition-total-score ">
						<div class="total-score-center">
							<div class="center">
								<p class="center-score-total"><span class="num">{{=Math.floor(it.data.rightPercent*100)}}</span>%</p>
								<p class="center-score-title">正确率</p>
							</div>
						</div>
					</div>
				</div>
				<div class="box right">
					<p>总题数：{{=it.data.total}}题</p>
					<p>总用时：{{=it.data.usedTime}}</p>
					<p>单题平均用时：{{=it.data.avgTime}}</p>
				</div>
			</div>
			<div class="test-btn border">
				<ul class="fix">
					{{~it.data.exercisesInfoL :v:i}}
					<li class="testbtn 
						{{ if(v.userIsRight  == '0'){ }}
						wrong
						{{ } }}
					">{{!v.sort}}</li>
					{{~}}
				</ul>
				<p class="title">Choose the best answer to the questions below.</p>
			</div>
			<div class="question-area border" data-id="{{=it.exercise.questionId}}" data-userdoid="{{=it.exercise.userDoquestionId}}">
				<div class="row-title">Question:</div>
				<div class="question">{{=it.title}}</div>
				<div class="row-title">Option:</div>
				<ul class="option-list">
					{{~it.list :v:i}}
					<li class="option-item 
					{{ if(it.select == v.questionOptionId ){ }}
					option-select 
					{{ } }}
					{{ if(i == it.list.length - 1){ }}
					option-item-last 
					{{ } }}
					{{ if(v.isRight == 1){ }}
					option-right 
					{{ }else{ }}
					option-error 
					{{ } }}
					"  data-id="{{=v.questionOptionId}}">
						{{=it.options[i]}}. {{=v.questionOption}}
						{{ if( it.select == v.questionOptionId && v.isRight  != '1' ){ }}
						<i class="icon-solid icon-results icon-error">&#xe915;</i>
						{{ } }}
						{{ if(v.isRight  == '1' ){ }}
						<i class="icon-solid icon-results icon-right">&#xe916;</i>
						{{ } }}
					</li>

					{{ 
						if(v.isRight){
							right = v;
							index = i;
						}
					}}

					{{~}}
				</ul>
			</div>
			<div class="answer-area">
				<div class="row-title">The Answer:</div>
				<div class="answer">
					<p>{{=it.options[index]}}. {{=right.questionOption}}</p>
				</div>
				<a class="btn btn-reset" href="javascript:;">重&nbsp;&nbsp;做</a>
			</div>
	</div>
	<audio src="../alpha/audio/complete.mp3" controls="controls" class="page-audio"></audio>
</div>