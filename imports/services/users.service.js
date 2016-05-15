import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';

class UsersService {
  constructor() {
  }

  currentUser() {
    if (Meteor.user() != null) {
      return true;
    }
    return false;
  }

  isAdmin() {
    console.log(Meteor.user());
    if (Meteor.user() != null && Meteor.user().profile.role == 'admin') {
      return true;
    }
    return false;
  }

  static factory(){
    return new UsersService();
  }
}

export default angular.module('userservice', [
  angularMeteor
])
  .factory('usersService', UsersService.factory);
