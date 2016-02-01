var app = angular.module('twitterClone', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
  
  $stateProvider  
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
  var o = {
    posts: []
    };
    return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.posts = posts.posts;
   
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      }
      );
      $scope.title = '';
      $scope.link = '';
     };

    
     $scope.incrementUpvotes = function(post) {
      post.upvotes++;
     };

     $scope.decrementUpvotes = function(post) {
      post.upvotes--;
     };
     
}]);


app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];

    

}]);
