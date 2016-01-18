/* global Meteor */
angular
  .module('PLeague')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl ($scope, $reactive, $state, NewUser) {
  $reactive(this).attach($scope);
  console.log('in settings controller');
  this.showNewUserModal = showNewUserModal;
  this.doLoginAction = doLoginAction;
  this.doLogoutAction = doLogoutAction;
  
  this.currentUser = function() {
    // return Meteor.user();
    if (Meteor.user() == null) {
      return true;
    }
    return false;
  }
  
  function doLoginAction() {
    Meteor.loginWithPassword(this.credentials.username, this.credentials.password, function (error) {
      if (error) {
        // :(
        console.log(error);
        return;
      }
      $state.go('tab.players');
    });
  }

  function doLogoutAction() {
    Meteor.logout(function() {
      // Redirect to login
        $state.go('tab.settings');
    });
  }
  
  this.helpers({
  });

  function showNewUserModal() {
    NewUser.showModal();
  }
}