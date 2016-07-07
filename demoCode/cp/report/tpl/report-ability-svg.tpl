{{
    var mine = it.data[0];
    var classes = it.data[1];
    var grades = it.data[2];
}}

<?xml version="1.0"?>
<chart exportEnabled="1" exportAtClient="0" exportAction="save" caption="{{=it.title}}" paletteColors="46B29A,FFBA00,00AEFF,FF6F37,A698f0,4169E1,087eb6,BA55D3,D2691E,FF7F50" showValues="0" plotGradientColor="" showBorder="0" bgColor="ffffff" canvasBorderColor="C4C3C1" alternateHGridAlpha="0" canvasBorderThickness="1" showPlotBorder="0" borderColor="ffffff" baseFontSize="12" palette="1" showFCMenuItem="1" imageSave="1">
    <categories>
        <category label="内容" />
        <category label="语言" />
        <category label="结构" />
    </categories>
    <dataset seriesName="我的评分">
        <set value="{{=mine.content}}" />
        <set value="{{=mine.language}}" />
        <set value="{{=mine.constuction}}" />
        <set value="{{=mine.total}}" />
    </dataset>
    <dataset seriesName="班级平均分">
        <set value="{{=classes['class-content']}}" />
        <set value="{{=classes['class-language']}}" />
        <set value="{{=classes['class-constuction']}}" />
        <set value="{{=classes['class-total']}}" />
    </dataset>
    <dataset seriesName="年级平均分">
        <set value="{{=grades['grade-content']}}" />
        <set value="{{=grades['grade-language']}}" />
        <set value="{{=grades['grade-constuction']}}" />
        <set value="{{=grades['grade-total']}}" />
    </dataset>
</chart>