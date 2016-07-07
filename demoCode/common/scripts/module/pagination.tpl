<ul class="pagination">
{{ if(it.total > 1){ }}
    <li class="page pagi-first">
        <a href="#">首页</a>
    </li>
    {{ if(it.current > 1){ }}
    <li class="page pagi-prev">
        <a href="#">
            <span class="txt">上一页</span>
            <span class="icon-linear">&#xe607;</span>
        </a>
    </li>
    {{ } }}
    {{ for(var i = 0; i < it.total; i++){ }}
    <li class="page
    {{ if(i == it.current - 1){ }}active{{ } }}
    " rel="{{=i+1}}"><a href="#">{{=i+1}}</a></li>
    {{ } }}
    {{ if(it.current < it.total){ }}
    <li class="page pagi-next">
        <a href="#">
            <span class="txt">下一页</span>
            <span class="icon-linear">&#xe609;</span>
        </a>
    </li>
    {{ } }}
    <li class="page pagi-last">
        <a href="#">末页</a>
    </li>
    <input class="pagi-which" type="text" />
    <span class="pagi-go">跳转</span>
{{ } }}
</ul>