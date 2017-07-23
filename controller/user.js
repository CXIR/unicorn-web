'use strict';

/**
* View : users
*/
shareAppControllers.controller('usersCtrl',['$scope','$location','$http',
    function($scope,$location,$http){
        $scope.loaded = false;

        /** Get all users */
          $http.get('/users/all')
          .then(function(res){
              console.log(res);
          },function(res){ console.log('FAIL : '+res.data); });

        /** Display a user preview by popup when clicking on picture */
        $scope.userPreview = function(user){

        }
    }
]);
