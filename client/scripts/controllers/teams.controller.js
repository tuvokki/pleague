angular
  .module('PLeague')
  .controller('TeamsCtrl', TeamsCtrl);
 
function TeamsCtrl ($scope, $reactive, NewTeam) {
  $reactive(this).attach($scope);
  console.log('in teams controller');
  
  this.showNewTeamModal = showNewTeamModal;

  function showNewTeamModal() {
    NewTeam.showModal();
  }

  this.helpers({
    data() {
      return Teams.find();
    }
  });

}