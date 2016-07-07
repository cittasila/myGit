{{
    var mine = it.data[0];
    var classes = it.data[1];
    var grades = it.data[2];
}}

<table>
    <thead>
        <th>评分项目</th>
        <th>评分</th>
        <th>班级平均分</th>
        <th>年级平均分</th>
    </thead>
    <tbody>
        <tr>
            <td>内容</td>
            <td>{{=it.parseNum(mine.content)}}</td>
            <td>{{=it.parseNum(classes['class-content'])}}</td>
            <td>{{=it.parseNum(grades['grade-content'])}}</td>
        </tr>
        <tr>
            <td>语言</td>
            <td>{{=it.parseNum(mine.language)}}</td>
            <td>{{=it.parseNum(classes['class-language'])}}</td>
            <td>{{=it.parseNum(grades['grade-language'])}}</td>
        </tr>
        <tr>
            <td>结构</td>
            <td>{{=it.parseNum(mine.constuction)}}</td>
            <td>{{=it.parseNum(classes['class-constuction'])}}</td>
            <td>{{=it.parseNum(grades['grade-constuction'])}}</td>
        </tr>
        <tr>
            <td>总分</td>
            <td>{{=Number(mine.total).toFixed(2)}}</td>
            <td>{{=Number(classes['class-total']).toFixed(2)}}</td>
            <td>{{=Number(grades['grade-total']).toFixed(2)}}</td>
        </tr>
    </tbody>
</table>