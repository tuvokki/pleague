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
    if (Meteor.user() != null && Meteor.user().role == 'admin') {
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
