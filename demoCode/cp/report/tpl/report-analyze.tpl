<table>
    <thead>
        <th>能力分项</th>
        <th>评分</th>
        <th>班级平均分</th>
        <th>年级平均分</th>
    </thead>
    <tbody>
        <tr>
            <td>篇章结构</td>
            <td>{{=Number(it.mine.org).toFixed(2)}}</td>
            <td>{{=Number(it.classo['class-org']).toFixed(2)}}</td>
            <td>{{=Number(it.grades['grade-org']).toFixed(2)}}</td>
            
        </tr>
        <tr>
            <td>思想内容</td>
            <td>{{=Number(it.mine.dev).toFixed(2)}}</td>
            <td>{{=Number(it.classo['class-dev']).toFixed(2)}}</td>
            <td>{{=Number(it.grades['grade-dev']).toFixed(2)}}</td>
            
        </tr>
        <tr>
            <td>句式运用</td>
            <td>{{=Number(it.mine.ss).toFixed(2)}}</td>
            <td>{{=Number(it.classo['class-ss']).toFixed(2)}}</td>
            <td>{{=Number(it.grades['grade-ss']).toFixed(2)}}</td>
        </tr>
        <tr>
            <td>词汇语法</td>
            <td>{{=Number(it.mine.wc).toFixed(2)}}</td>
            <td>{{=Number(it.classo['class-wc']).toFixed(2)}}</td>
            <td>{{=Number(it.grades['grade-wc']).toFixed(2)}}</td>
        </tr>
        <tr>
            <td>写作规范</td>
            <td>{{=Number(it.mine.mech).toFixed(2)}}</td>
            <td>{{=Number(it.classo['class-mech']).toFixed(2)}}</td>
            <td>{{=Number(it.grades['grade-mech']).toFixed(2)}}</td>
        </tr>
    </tbody>
</table>