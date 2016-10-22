'use strict'

app.controller('MainCtrl', function($scope, $http, uiCalendarConfig){
        $http
            .get('/api/title')
            .then(({data: {title}}) => $scope.title = title)

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'Going Home',start: new Date(y, 9, 1),end: new Date(y, 10, 29),url: 'http://twitter.com/', allDay: true},
      {title: 'birthday was the worstdays',start: new Date(y, m, 4),end: new Date(y, m, 6),url: 'http://twitter.com/', allDay: true}  
    ];
   
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 100,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        
        eventRender: $scope.eventRender
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
});

