'use strict'

app.controller('MainCtrl', function($scope, $http, uiCalendarConfig, DateFactory){
        $http
            .get('/api/title')
            .then(({data: {title}}) => $scope.title = title)



      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };


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
    $scope.events = [];
    /* event source that contains custom events on the scope */
    $scope.eventSources = [$scope.events];


    DateFactory.GetDates()
    .then(function(datesObject){
      datesObject.forEach(event => $scope.events.push(event))
    })
    
});

