<div class="selection">
	<div class="bg"></div>
	<ul>
		<li class="list fix">
			<div class="box listone">
				<p class="title">
					<span class="icon-Preparation iconfont icon-linear">
		                &#xe90c;
		            </span>
				</p>
				<p class="str1"></p>
			</div>
			<div class="box arrow">
				<span class="icon-arrow-duble-right iconfont icon-linear ">
	                &#xe90e;
	            </span>
			</div>
			<div class="box right btn">
				{{ if(it.data.readingGuide  == 0){ }}
				<p class="noopen"></p>
				{{ } }}
				{{ if(it.data.readingGuide  == 1){ }}
				<div class="noread">
					<div class="bg"></div>
					<span class="icon-block icon-solid icon">
		                &#xe914;
		            </span>
				</div>
				{{ } }}
				<div class="content ">
					<div class="pic 
					{{ if(it.data.readingGuide    == 0){ }}
					default
					{{ } }}
					">
						<p class="img1"></p>
					</div>
					<p class="cn">阅读引导</p>
					<p class="en">Guide</p>
				</div>
			</div>
		</li>
		<li class="list fix">
			<div class="box listone">
				<p class="title">
					<span class="icon-Preparation iconfont icon-linear">
		                &#xe90d;
		            </span>
				</p>
				<p class="str2"></p>
			</div>
			<div class="box arrow">
				<span class="icon-arrow-duble-right iconfont icon-linear ">
	                &#xe90e;
	            </span>
			</div>
			<div class="box right btn">
				{{ if(it.data.textReading    == 0){ }}
				<p class="noopen"></p>
				{{ } }}
				{{ if(it.data.textReading    == 1){ }}
				<div class="noread">
					<div class="bg"></div>
					<span class="icon-block icon-solid icon">
		                &#xe914;
		            </span>
				</div>
				{{ } }}
				<div class="content ">
					<div class="pic original
					{{ if(it.data.textReading    == 0){ }}
					default
					{{ } }}
					">
						<p class="img2"></p>
					</div>
					<p class="cn">原文阅读</p>
					<p class="en">Passage</p>
				</div>
			</div>
		</li>
		<li class="list fix">
			<div class="box listone">
				<p class="title">
					<span class="icon-Preparation iconfont icon-linear">
		                &#xe90b;
		            </span>
				</p>
				<p class="str3"></p>
			</div>
			<div class="box arrow">
				<span class="icon-arrow-duble-right iconfont icon-linear ">
	                &#xe90e;
	            </span>
			</div>
			<div class="box right fix">
				<div class="brs btn">
					{{ if(it.data.readingComprehension == 0){ }}
					<p class="noopen"></p>
					{{ } }}
					{{ if(it.data.readingComprehensionScore < 0 && it.data.readingComprehension > 1){ }}
					<p class="nocomplete"></p>
					{{ } }}
					{{ if(it.data.readingComprehensionScore >= 0 && it.data.readingComprehension > 1){ }}
					<p class="complete">{{=parseInt(it.data.readingComprehensionScore)}}分</p>
					{{ } }}
					{{ if(it.data.readingComprehension == 1){ }}
					<div class="noread">
						<div class="bg"></div>
						<span class="icon-block icon-solid icon">
			                &#xe914;
			            </span>
					</div>
					{{ } }}
					<div class="content ">
						<div class="understand pic 
						{{ if(it.data.readingComprehension == 0){ }}
						default
						{{ } }}
						">
							<p class="img3-1"></p>
						</div>
						<p class="cn">阅读理解</p>
						<p class="en">Comperhension</p>
					</div>
				</div>
				<div class="brs btn">
					{{ if(it.data.lexicalGrammar  == 0){ }}
					<p class="noopen"></p>
					{{ } }}
					{{ if(it.data.lexicalGrammar  == 1){ }}
					<div class="noread">
						<div class="bg"></div>
						<span class="icon-block icon-solid icon">
			                &#xe914;
			            </span>
					</div>
					{{ } }}
					<div class="content ">
						<div class="pic 
						{{ if(it.data.lexicalGrammar  == 0){ }}
						default
						{{ } }}
						">
							<p class="img3-2"></p>
						</div>
						<p class="cn">词汇语法</p>
						<p class="en">Voc & Gra</p>
					</div>
				</div>
				<div class="brs btn">
					{{ if(it.data.listeningTraining  == 0){ }}
					<p class="noopen"></p>
					{{ } }}
					{{ if(it.data.listeningTraining  == 1){ }}
					<div class="noread">
						<div class="bg"></div>
						<span class="icon-block icon-solid icon">
			                &#xe914;
			            </span>
					</div>
					{{ } }}
					<div class="content ">
						<div class="pic 
						{{ if(it.data.listeningTraining  == 0){ }}
						default
						{{ } }}
						">
							<p class="img3-3"></p>
						</div>
						<p class="cn">听力训练</p>
						<p class="en">Listening</p>
					</div>
				</div>
			</div>
		</li>
		<li class="list fix">
				<div class="box listone">
				<p class="title">
					<span class="icon-Preparation iconfont icon-linear">
		                &#xe90a;
		            </span>
				</p>
				<p class="str4"></p>
			</div>
			<div class="box arrow">
				<span class="icon-arrow-duble-right iconfont icon-linear ">
	                &#xe90e;
	            </span>
			</div>
			<div class="box right btn">
				{{ if(it.data.cloze == 0){ }}
				<p class="noopen"></p>
				{{ } }}
				{{ if(it.data.cloze == 1){ }}
				<div class="noread">
					<div class="bg"></div>
					<span class="icon-block icon-solid icon">
		                &#xe914;
		            </span>
				</div>
				{{ } }}
				<div class="content ">
					<div class="pic 
					{{ if(it.data.cloze == 0){ }}
					default
					{{ } }}
					">
						<p class="img4"></p>
					</div>
					<p class="cn">完形填空</p>
					<p class="en">Cloze</p>
				</div>
			</div>
		</li>
	</ul>
	<div class="opacity"></div>
</div>