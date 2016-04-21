import { Controller } from '../entities';
 
export default class LeaderboardCtrl extends Controller {
  constructor() {
    super(...arguments); // spread defers all arguments to super

    console.log('in leaderboard controller');

    this.helpers({
      data() {
        return Players.find();
      }
    });
  }
}
 
LeaderboardCtrl.$inject = ['$scope'];