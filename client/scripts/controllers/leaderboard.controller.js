angular
  .module('PLeague')
  .controller('LeaderboardCtrl', LeaderboardCtrl);
 
function LeaderboardCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in leaderboard controller');

  this.helpers({
    data() {
      return Players.find();
    }
  });

}