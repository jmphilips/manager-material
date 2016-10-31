'use strict'

app.controller('CalendarCtrl', function($scope, $http, uiCalendarConfig, DateFactory, $compile){
     
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

       /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };


    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };


    $scope.uiConfig = {
      calendar:{
        height: 600,
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

    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };


    /* event source that contains custom events on the scope */
    $scope.eventSources = [$scope.events, $scope.eventsF];
    $scope.eventSources2 = [$scope.eventsF, $scope.events];


    DateFactory.GetDates()
    .then(function(datesObject){
      datesObject.forEach(event => $scope.events.push(event))
    })

});

