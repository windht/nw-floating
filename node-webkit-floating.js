var app=angular.module('windht.node-webkit.float-window', [])

.run(function($rootScope,$floatWindow){
  window.gui = require('nw.gui');
  window.win = gui.Window.get();
  var tray = new gui.Tray({icon: 'img/tray.ico' });
  tray.on('click',function(event){   
    win.moveTo(event.x-($floatWindow.getWidth()/2-8),event.y+2)
    win.show();
    win.focus();
    $rootScope.$broadcast('focus');
  })
  win.showDevTools();
  win.on('blur',function(){
    // $rootScope.$broadcast('blur');
    // setTimeout(function() {win.hide()}, 200);  
  })
})

.factory('$floatWindow',function(){
  var height=300;
  var width=300;
  return {
    setHeight:function(num) {
      height=num;
      win.resizeTo(width,num);
    },
    setWidth:function(num) {
      width=num;
      win.resizeTo(num,height);
    },
    getHeight:function(){
      return height;
    },
    getWidth:function(){
      return width;
    }
  }
})

.directive('floatContainer', function ($rootScope, $timeout,$floatWindow) {
  return {
    restrict: 'E',
    template: '<div class="float-container" style="width:100%;position:absolute;top:0;left:0;" ng-transclude></div>',
    replace:true,
    transclude: true,
    link: function (scope, element, attrs) {
      element.css('width',($floatWindow.getWidth()-20)+'px');
      element.css('height',($floatWindow.getHeight()-20)+'px');
      element.css('margin','10px');
      element.css('background',attrs.background);
      element.css('borderRadius','10px')
      element.css('boxShadow','0px 0px 10px rgb(110,110,110)');
      element.css('transition','all 0.2s linear;');
      element.css('position','relative');
      element.css('opacity',0);

      // Hack for psedou classes from http://stackoverflow.com/questions/23293053/can-i-use-angularjs-directives-to-apply-a-style-to-a-pseudo-element
      var style = "<style>"+
      ".float-container:before{"+
      "content:'';width:0;height:0;border-left: 10px solid transparent;border-right: 10px solid transparent;"+
      "top: -10px;position: absolute;"+
      "left:"+(($floatWindow.getWidth()-20)/2-5)+"px;"+
      "}</style>"
      angular.element("head").append(style);

      element.css('borderBottom','1px solid rgb(142,142,142)');

      $rootScope.$on('focus',function(){
        element.css('opacity',1);
      })

      $rootScope.$on('blur',function(){
        element.css('opacity',0);
      })
    }
  }
})
.directive('floatHeader', function ($rootScope, $timeout) {
  return {
    restrict: 'E',
    template: '<div style="width:100%;position:absolute;top:0;left:0;text-align:center;" ng-transclude></div>',
    replace:true,
    transclude: true,
    link: function (scope, element, attrs) {
      element.css('borderTopLeftRadius','10px');
      element.css('borderTopRightRadius','10px');
      element.css('fontSize','20px');
      element.css('padding','5px')
      element.css('height',attrs.height);
      element.css('background',attrs.background);
      // Hack for psedou classes from http://stackoverflow.com/questions/23293053/can-i-use-angularjs-directives-to-apply-a-style-to-a-pseudo-element
      var style = "<style>.float-container:before{border-bottom: 10px solid "+ attrs.background +"}</style>"
      angular.element("head").append(style);

      element.css('borderBottom','1px solid rgb(142,142,142)');
    }
  }
})
.directive('floatContent', function ($rootScope, $timeout) {
  return {
    restrict: 'E',
    template: '<div style="width:100%;position:absolute;left:0;" ng-transclude></div>',
    replace:true,
    transclude: true,
    link: function (scope, element, attrs) {
      element.css('height',attrs.height);
      element.css('top','35px');
    }
  }
})
.directive('floatFooter', function ($rootScope, $timeout) {
  return {
    restrict: 'E',
    template: '<div style="width:100%;position:absolute;bottom:0;left:0;" ng-transclude></div>',
    replace: true,
    transclude: true,
    link: function (scope, element, attrs) {
      element.css('borderBottomLeftRadius','10px');
      element.css('borderBottomRightRadius','10px')
      element.css('height',attrs.height);
      element.css('background',attrs.background);    
      element.css('borderTop','1px solid rgb(142,142,142)');
    }
  }
});