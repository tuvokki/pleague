/* global Meteor, angular */
angular
  .module('PLeague')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl ($scope, $reactive, $state, $ionicPopup, $log, NewUser) {
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
        return handleError(error);
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

  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again or create an account',
      okType: 'button-positive button-clear'
    });
  }
}