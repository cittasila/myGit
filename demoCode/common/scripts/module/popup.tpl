<div class="ui-pop
{{ if(it.className){ }} {{=it.className}}{{ } }}
{{ if(it.tip){ }} ui-pop-tip{{ } }}
" id="ui-pop-{{=it.id}}" name="{{=it.name}}" style="z-index:{{=it.zIndex}}">
    <div class="ui-popbox">
        <div class="ui-popwrap">
            {{ if(it.tip){ }}
            <a class="ui-popclose ui-popaction" href="javascript:;"></a>
            {{ }else{ }}
                {{ if(it.hasHd){ }}
                <div class="ui-pophd
                {{ if(!it.isMove){ }}
                nomove
                {{ } }}
                ">
                    <span class="ui-poptitle"></span>
                    <a class="ui-popclose ui-popaction" href="javascript:;"></a>
                    {{ if(it.isMax){ }}
                    <a class="ui-popmax ui-popaction" href="javascript:;"></a>
                    <a class="ui-popdefault ui-popaction" href="javascript:;"></a>
                    {{ } }}
                </div>
                {{ } }}
            {{ } }}
            
            <div class="ui-popmain"></div>
        </div>
    </div>
</div>
