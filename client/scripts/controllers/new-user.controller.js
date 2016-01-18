/* global Meteor, angular, Accounts */
angular
  .module('PLeague')
  .controller('NewUserCtrl', NewUserCtrl);
 
function NewUserCtrl($scope, $reactive, $state, $ionicPopup, NewUser) {
  $reactive(this).attach($scope);
 
  this.hideNewUserModal = hideNewUserModal;
  this.newUser = newUser;
  this.allReady = allReady;  
  this.helpers({
  });
 
  function hideNewUserModal() {
    NewUser.hideModal();
  }
  
  function allReady() {
    if (this.credentials.username && this.credentials.email && this.credentials.password && this.profile.firstname && this.profile.lastname ) {
      return true;
    }
    return false;
  }
  
  function newUser() {
    try {
      Accounts.createUser({
        username: this.credentials.username,
        email : this.credentials.email,
        password : this.credentials.password,
        profile  : {
            //publicly visible fields like firstname goes here
            firstname: this.profile.firstname,
            lastname: this.profile.lastname
        }
      }, function (error) {
        if (error) {
          // :(
          console.log(error);
          return;
        }
        hideNewUserModal();
        $state.go('tab.players');
      });

    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}
