## 如何实现在render完成之后，执行Js脚本
当我们使用Jquery结合AngulraJs使用的时候，希望在render完table后，执行一段js脚本。
在实际开发中，会经常碰到这样的需求，希望能够捕获到AngularJs渲染完成页面的事件。

要达到这个目的，我们需要为当前的app自定义directive:
```
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
```

然后，在我们需要监控的地方，加上该directive:
```
<tr ng-repeat="user in users" on-finish-render-filters>
      <td>{{user.Id}}</td>
      <td>{{user.Name}}</td>
      <td>{{user.Salary}}</td>
</tr>
```
最后，补充上我们需要render完成之后的Js脚本:
```
$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          //下面是在table render完成后执行的js
          var table = $("#leaderBoard").dataTable({
              bJQueryUI: true,
              "sScrollX": '100%',
          });
});
```