import { Controller } from '../entities';

export default class NewUserCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in new-user controller');
    this.credentials = {};
    
    this.helpers({
      players() {
        return Players.find({});
      }
    });
  }
  
  hideNewUserModal() {
    this.NewUser.hideModal();
  }
  
  allReady() {
    if (this.credentials.username && this.credentials.email && this.credentials.password && this.profile.firstname && this.profile.lastname ) {
      return true;
    }
    return false;
  }
  
  newUser() {
    let that = this;
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
      }, (error) => {
        if (error) {
          // :(
          console.log(error);
          return;
        }
        that.hideNewUserModal();
        that.$state.go('tab.players');
      });

    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}

NewUserCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'NewUser'];
