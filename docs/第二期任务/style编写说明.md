# css说明
**一律用less/sass + 即时编译**  
**style.less是全局css**  
**其他对应页面的css命名和页面名一样，引入也在对应页面开头引入**  
>关于less，我们主要使用的是它的嵌套语法，对于一个特定的元素，我们如果仅仅为它一个元素设计样式而不需要复用的话，
不需要新引入一个class，可以直接用父级的class然后用嵌套语法书写。

>关于sass，我们主要使用@if,@for,@while,@each,@function

因为less有的sass都有，所以可以只用sass，但是为了节约学习成本，就用less也行

# 样式书写要求
1. 每个页面最外层作用域隔离比如最外层的div加上fkq-home然后所有样式都写这个里面
1. 类名加上名字缩写作为前缀
1. less层次结构清晰
1. 类名有意义


## 常用的css选择器：
```
div,p                   选择所有 <div> 元素和所有 <p> 元素。
div p                   选择 <div> 元素内部的所有 <p> 元素。
div>p                   选择父元素为 <div> 元素的所有 <p> 元素。
div+p                   选择紧接在 <div> 元素之后的所有 <p> 元素。
[target]                选择带有 target 属性所有元素。
[target=_blank]         选择 target="_blank" 的所有元素。
a:link                  选择所有未被访问的链接。
a:visited               选择所有已被访问的链接。
a:active                选择活动链接。
a:hover                 选择鼠标指针位于其上的链接。
input:focus             选择获得焦点的 input 元素。
p:first-child           选择属于父元素的第一个子元素的每个 <p> 元素（即p元素是第一个子元素）。
p:last-child            选择属于其父元素最后一个子元素每个 <p> 元素。
p:nth-child(2)          选择属于其父元素的第二个子元素的每个 <p> 元素。
p:nth-last-child(2)     同上，从最后一个子元素开始计数。
p:first-of-type         选择属于其父元素的首个 <p> 元素的每个 <p> 元素。（父元素下的第一个p元素）
p:last-of-type          选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:nth-of-type(2)        选择属于其父元素第二个 <p> 元素的每个 <p> 元素。
p:nth-last-of-type(2)   同上，但是从最后一个子元素开始计数。
#news:target            选择当前活动的 #news 元素。
input:enabled           选择每个启用的 <input> 元素。
input:disabled          选择每个禁用的 <input> 元素。
input:checked           选择每个被选中的 <input> 元素。
:not(p)                 选择非 <p> 元素的每个元素。
```


## less相关语法：
### 变量
变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。
```
<!-- 编译前 -->
@color: #4D926F;
#header {
    color: @color;
}
h2 {
    color: @color;
}

<!-- 编译后 -->
#header {
    color: #4D926F;
}

h2 {
    color: #4D926F;
}
```

### 混合（Mixins）
混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。还可以带参数地调用，就像使用函数一样。
```
<!-- 编译前 -->
.rounded-corners (@radius: 5px) {
    border-radius: @radius;
}
#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}

<!-- 编译后 -->
#header {
    border-radius: 5px;
}

#footer {
    border-radius: 10px;
}
```
### 嵌套
可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。
```
<!-- 编译前 -->
#header {
    p {
        font-size: 12px;
        a {
            text-decoration: none;
            &:hover {
                border-width: 1px
            }
        }
    }
}

<!-- 编译后 -->
#header p {
    font-size: 12px;
}

#header p a {
    text-decoration: none;
}

#header p a:hover {
    border-width: 1px;
}
```
### 函数和运算
运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。
```
<!-- 编译前 -->
@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
    color: (@base-color * 3);
    border-left: @the-border;
}
#footer {
    color: (@base-color + #003300);
    border-color: desaturate(@red, 10%);
}

<!-- 编译后 -->
#header {
    color: #333;
    border-left: 1px;
}
#footer {
    color: #114411;
    border-color: #7d2717;
}
```
### 引用
可以通过 import 加载其他 less文件的内容
```
@import "library"; // library.less
@import "typo.css";
```


## sass相关语法
### 变量
SASS允许使用变量，所有变量以$开头。
```
$blue : #1875e7;
div {
    color : $blue;
}
```
如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
```
$side : left;
.rounded {
    border-#{$side}-radius: 5px;
}
```
### 计算功能
SASS允许在代码中使用算式：
```
body {
    margin: (14px/2);
    top: 50px + 100px;
    right: $var * 10%;
}
```
### 嵌套
SASS允许选择器嵌套。比如，下面的CSS代码：
```
div h1 {
    color : red;
}
```
可以写成：
```
div {
    h1 {
        color:red;
    }
}
```
属性也可以嵌套，比如border-color属性，可以写成：
```
p {
    border: {
        color: red;
    }
}
```
注意，border后面必须加上冒号。  
在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：
```
a {
    &:hover { color: #ffb3ff; }
}
```
### 注释
SASS共有两种注释风格。  
标准的CSS注释 /* comment */ ，会保留到编译后的文件。  
单行注释 // comment，只保留在SASS源文件中，编译后被省略。  
在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。  
```
/*!
重要注释！
*/
```
### 继承
SASS允许一个选择器，继承另一个选择器。比如，现有class1：
```
.class1 {
    border: 1px solid #ddd;
}
```
class2要继承class1，就要使用@extend命令：
```
.class2 {
    @extend .class1;
    font-size:120%;
}
```
### Mixin
Mixin有点像C语言的宏（macro），是可以重用的代码块。  
使用@mixin命令，定义一个代码块。  
```
@mixin left {
    float: left;
    margin-left: 10px;
}
```
使用@include命令，调用这个mixin。
```
div {
    @include left;
}
```
mixin的强大之处，在于可以指定参数和缺省值。
```
@mixin left($value: 10px) {
    float: left;
    margin-right: $value;
}
```
使用的时候，根据需要加入参数：
```
div {
    @include left(20px);
}
```
下面是一个mixin的实例，用来生成浏览器前缀。
```
@mixin rounded($vert, $horz, $radius: 10px) {
    border-#{$vert}-#{$horz}-radius: $radius;
    -moz-border-radius-#{$vert}#{$horz}: $radius;
    -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
```
使用的时候，可以像下面这样调用：
```
#navbar li { 
    @include rounded(top, left); 
}
#footer { 
    @include rounded(top, left, 5px); 
}
```
### 颜色函数
SASS提供了一些内置的颜色函数，以便生成系列颜色。
```
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```
### 插入文件
@import命令，用来插入外部文件。
```
@import "path/filename.scss";
```
如果插入的是.css文件，则等同于css的import命令。
```
@import "foo.css";
```
### 条件语句
@if可以用来判断：
```
p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @if 5 < 3 { border: 2px dotted; }
}
```
配套的还有@else命令：
```
@if lightness($color) > 30% {
    background-color: #000;
} @else {
    background-color: #fff;
}
```
### 循环语句
SASS支持for循环：
```
@for $i from 1 to 10 {
    .border-#{$i} {
        border: #{$i}px solid blue;
    }
}
```
也支持while循环：
```
$i: 6;
@while $i > 0 {
    .item-#{$i} { 
        width: 2em * $i; 
    }
    $i: $i - 2;
}
```
each命令，作用与for类似：
```
@each $member in a, b, c, d {
    .#{$member} {
        background-image: url("/image/#{$member}.jpg");
    }
}
```
### 自定义函数
SASS允许用户编写自己的函数。
```
@function double($n) {
    @return $n * 2;
}
#sidebar {
    width: double(5px);
}
```
