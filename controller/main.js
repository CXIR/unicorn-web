/*



-------------------------------------
-------------------------------------
---                               ---
--- APPLICATION MAIN CONTROLLER   ---
--- NAME : shareApp               ---
---                               ---
--- 2017 - Version 1              ---
---                               ---
-------------------------------------
-------------------------------------



*/



'use strict';



/** DECLARATION */


var shareApp = angular.module('shareApp',[
    'ngRoute',
    'shareAppControllers',
    'ui.bootstrap'
]);


/** ROUTE */


shareApp.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider){
        $locationProvider.hashPrefix('');
        $routeProvider
        .when('/login',{
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .when('/users',{
            templateUrl: 'views/users.html',
            controller: 'usersCtrl'
        })
        .when('/report',{
            templateUrl: 'views/report.html',
            controller: 'reportCtrl'
        })
        .when('/rides',{
            templateUrl: 'views/rides.html',
            controller: 'ridesCtrl'
        })
        .when('/profil/:user',{
          templateUrl: 'views/profil.html',
          controller: 'profilCtrl'
        })
        .when('/messaging',{
            templateUrl: 'views/messaging.html',
            controller: 'messagingCtrl'
        })
        .when('/about',{
            templateUrl: 'views/about.html',
            controller: 'aboutCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        })
    }
]);



/** DIRECTIVES */



// Navigation Bar
shareApp.directive('myNav',['$location',function($location){
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    templateUrl: 'views/navbar.html',
  link: function (scope, element, attrs) {
        var current = $location.path().split(/\//g);
        if(current[1] == 'profil') angular.element(document.querySelector('#profil')).addClass('active');
        else if(current[1] == 'users') angular.element(document.querySelector('#users')).addClass('active');
        else if(current[1] == 'rides') angular.element(document.querySelector('#rides')).addClass('active');
        else if(current[1] == 'messaging') angular.element(document.querySelector('#messaging')).addClass('active');
    }
  };
}]);

// User Pop
shareApp.directive('userPop',['$location',function($location){
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    templateUrl: 'views/userpop.html',
  link: function (scope, element, attrs) {
        scope.close = function(){
            scope.show = false;
            scope.userpop = {};
        }
    }
  };
}]);

// Simple Notification
shareApp.directive('notif',[
  function(){
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'views/notification.html',
      link:function(scope, element, attrs){
        scope.closeNotif = function(){
          scope.notif =  {};
        }
      }
    };
  }
]);

// Dialog Box
shareApp.directive('dialog',[
  function(){
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'views/dialog.html',
      link:function(scope, element, attrs){
        scope.closeDialog = function(){
          scope.dialog =  {};
        }
      }
    };
  }
]);


// Date Picker
shareApp.directive('datepicker',[
  function(){
    return{
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'views/datepicker.html',
      link: function (scope, element, attrs) {
        scope.dt = null;

        scope.today = function() {
          scope.dt = new Date();
        };

        scope.clear = function() {
          scope.dt = null;
        };

        scope.inlineOptions = {
          customClass: getDayClass,
          minDate: new Date(),
          showWeeks: true
        };

        scope.dateOptions = {
          dateDisabled: disabled,
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
          var date = data.date,
            mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
          }

          scope.toggleMin = function() {
            scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
            scope.dateOptions.minDate = scope.inlineOptions.minDate;
          };

          scope.toggleMin();

          scope.open1 = function() {
            scope.popup1.opened = true;
          };

          scope.open2 = function() {
            scope.popup2.opened = true;
          };

          scope.setDate = function(year, month, day) {
            scope.dt = new Date(year, month, day);
          };

          scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          scope.format = scope.formats[0];
          scope.altInputFormats = ['M!/d!/yyyy'];

          scope.popup1 = {
            opened: false
          };

          scope.popup2 = {
            opened: false
          };

          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 1);
          scope.events = [
            {
              date: tomorrow,
              status: 'full'
            },
            {
              date: afterTomorrow,
              status: 'partially'
            }
          ];

          function getDayClass(data) {
            var date = data.date,
            mode = data.mode;
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i = 0; i < scope.events.length; i++) {
                var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return scope.events[i].status;
                }
              }
            }

            return '';
          }
      }
    };
  }
]);


/** CONTROLLERS */



var shareAppControllers = angular.module('shareAppControllers',[]);


//view : login
shareAppControllers.controller('loginCtrl',['$scope',
    function($scope){
        $scope.reset = function(){
            $scope.log = {};
            angular.element(document.querySelector('#id, #pw')).removeClass('has-error');
        }

        $scope.login = function(log){
            angular.element(document.querySelector('#id')).addClass('has-error');
        }
    }
]);

//view : my profile
shareAppControllers.controller('profilCtrl',['$scope','$location',
    function($scope,$location){
        var url = $location.path().split(/\//g);
        $scope.who = url[2];
        
    }
]);

//view : users
shareAppControllers.controller('usersCtrl',['$scope','$location',
    function($scope,$location){
        $scope.current = $location.path();
    }
]);

//view : report a user
shareAppControllers.controller('reportCtrl',['$scope','$location',
    function($scope,$location){
        $scope.current = $location.path();
    }
]);

//view : rides
shareAppControllers.controller('ridesCtrl',['$scope','$location',
    function($scope,$location){
        $scope.current = $location.path();
    }
]);


//view : messaging
shareAppControllers.controller('messagingCtrl',['$scope','$location',
    function($scope,$location){
        $scope.current = $location.path();
    }
]);

//view : about
shareAppControllers.controller('aboutCtrl',['$scope','$location',
    function($scope,$location){
        $scope.current = $location.path();
    }
]);
