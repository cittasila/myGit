<table>
    <thead>
        <th>错误类型</th>
        <th>数量</th>
    </thead>
    <tbody>
        {{~it.list :v:i}}
        <tr>
            <td>{{=v.label}}</td>
            <td>{{=v.value}}</td>
        </tr>
        {{~}}
    </tbody>
</table>