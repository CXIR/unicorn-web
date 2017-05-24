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



/**
*
* MAIN DECLARATION
*
*/


var shareApp = angular.module('shareApp',[
    'ngRoute',
    'shareAppControllers',
    'ui.bootstrap'
]);


/**
*
* APP ROUTE
*
*/


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
        .when('/message',{
          templateUrl: 'views/message.html',
          controller: 'messageCtrl'
        })
        .when('/new_message',{
          templateUrl: 'views/new_message.html',
          controller: 'newMessageCtrl'
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



/**
*
* DIRECTIVES
*
*/



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
        else if(current[1] == 'message') angular.element(document.querySelector('#message')).addClass('active');

        /*
        $http.get(node_url)
        .then(fucntion(res){
          scope.unread = res.data;
        },function(res){ console.log('FAIL : '+res.data); });
        */
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


/**
*
* CONTROLLERS
*
*/



var shareAppControllers = angular.module('shareAppControllers',[]);


/**
*View : login
*/
shareAppControllers.controller('loginCtrl',['$scope',
    function($scope){
        $scope.reset = function(){
            $scope.log = {};
            $scope.error = {};
            angular.element(document.querySelector('#pin')).removeClass('has-error');
            angular.element(document.querySelector('#pw')).removeClass('has-error');
        }

        $scope.login = function(log){
          angular.element(document.querySelector('#pin')).removeClass('has-error');
          angular.element(document.querySelector('#pw')).removeClass('has-error');

          if((log.pin == null && log.pw == null) || (log.pin == '' && log.pw == '')){
            angular.element(document.querySelector('#pin, #pw')).addClass('has-error');
            $scope.error = {uncorrect:true,message:'Remplissez les champs ci-dessous'};
          }
          else if(log.pin.match(/\s+/g) && log.pw.match(/\s+/g)){
            angular.element(document.querySelector('#pin, #pw')).addClass('has-error');
            $scope.error = {uncorrect:true,message:'Remplissez les champs ci-dessous'};
          }
          else if(log.pin.match(/\s+/g) || log.pin == null || log.pin == ''){
            angular.element(document.querySelector('#pin')).addClass('has-error');
            $scope.error = {uncorrect:true,message:'Votre identifiant est incorrect'};
          }
          else if(log.pw.match(/\s+/g) || log.pw == null || log.pw == ''){
            angular.element(document.querySelector('#pw')).addClass('has-error');
            $scope.error = {uncorrect:true,message:'Le Mot de Passe est obligatoire'};
          }
          else{
            $scope.loading = true;
            /*
            $http.post('',{'pin':log.pin,'pw':log.pw})
            .then(function(res){

            }, function(res) { console.log('FAIL : '+res.data); });
            */
          }
        }
    }
]);

/**
* View : my profile
*/
shareAppControllers.controller('profilCtrl',['$scope','$location','$route','$http',
    function($scope,$location,$route,$http){
        var url = $location.path().split(/\//g);

        /** Get user profile information */
        $http.get('/user/find/'+url[2])
        .then(function(res){
          if(res.data != 0){
            $scope.user = res.data;
          }
        },function(res){ console.log('FAIL : '+res.data); });

        /** Get user profile comming rides as Passenger */
        var getPassengerCommingRides = function(){
          $http.get(node_url)
          .then(function(res){
            if(res.data != 0){
              $scope.p_comming_rides = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getPassengerCommingRides();

        /** Get user profile comming rides as Driver */
        var getDriverCommingRides = function(){
          $http.get(node_url)
          .then(function(res){
            if(res.data != 0){
              $scope.d_comming_rides = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getDriverCommingRides();

        /** Get user profile over rides as Passenger */
        var getPassengerOverRides = function(){
          $http.get(node_url)
          .then(function(res){
            if(res.data != 0){
              $scope.p_over_rides = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getPassengerOverRides();

        /** Get user profile over rides as Driver */
        var getDriverOverRides = function(){
          $http.get(node_url)
          .then(function(res){
            if(res.data != 0){
              $scope.d_over_rides = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getDriverOverRides();

        /** Get user profile refused rides as Passenger only */
        var getPassengerRefusedRides = function(){
          $http.get(node_url)
          .then(function(res){
            if(res.data != 0){
              $scope.p_refused_rides = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getPassengerRefusedRides();

        /** Call to ride proposal box */
        $scope.rideProposal = function(user){

        }

        /** Accept passenger asking for a seat in a ride */
        $scope.acceptPassenger = function(ride,participant){

        }

        /** Refuse passenger asking for a seat in a ride */
        $scope.refusePessenger = function(ride,participant){

        }

        /** Mark up a Driver after a ride */
        $scope.markDriverUp = function(driver){

        }

        /** Mark down a driver after a ride */
        $scope.markDriverDown = function(driver){

        }

        /** Mark up a passenger after a ride */
        $scope.markPassengerUp = function(ride,user){

        }

        /** Mark down a passenger after a ride */
        $scope.markPassengerDown = function(ride,user){

        }


    }
]);

/**
* View : users
*/
shareAppControllers.controller('usersCtrl',['$scope','$location','$http',
    function($scope,$location,$http){
        $scope.current = $location.path();

        /** Get all users */
        var getUsers = function(){
          $http.get('/user/find/all')
          .then(function(res){
            if(res.data != 0){
              $scope.users = res.data;
            }
          },function(res){ console.log('FAIL : '+res.data); });
        }; getUsers();

        /** Display a user preview by popup when clicking on picture */
        $scope.userPreview = function(user){

        }
    }
]);

/**
* View : report a user
*/
shareAppControllers.controller('reportCtrl',['$scope','$location',
    function($scope,$location){


    }
]);

/**
* View : rides
*/
shareAppControllers.controller('ridesCtrl',['$scope','$location',
    function($scope,$location){

      /** Display a user preview by popup when clicking on picture */
      $scope.userPreview = function(user){

      }
    }
]);


/**
* View : message
*/
shareAppControllers.controller('messageCtrl',['$scope','$location','$http',
    function($scope,$location,$http){
      var node_url = '';

      /** Get all unread messages preview of the current user */
      var getUnreadMessages = function(){
        $http.get(node_url)
        .then(function(res){
          if(res.data != 0){
            $scope.unread_talks = res.data;
          }
        },function(res){ console.log('FAIL : '+res.data); });
      }; getUnreadMessages();

      /** Get all read messages preview of the current user */
      var getReadMessages = function(){
        $http.get(node_url)
        .then(function(res){
          if(res.data != 0){
            $scope.read_talks = res.data;
          }
        },function(res){ console.log('FAIL : '+res.data); });
      }; getReadMessages();

      /** Show full talk in parameter */
      $scope.showTalk = function(talk){

      }

      /** Reply in a talk */
      $scope.talkReply = function(reply){

      }

    }
]);

/*
* View : new message
*/
shareAppControllers.controller('newMessageCtrl',['$scope','$http',
  function($scope,$http){

  }
]);

/**
* View : about
*/
shareAppControllers.controller('aboutCtrl',['$scope','$location',
    function($scope,$location){

    }
]);
