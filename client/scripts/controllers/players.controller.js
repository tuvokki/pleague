import { Controller } from '../entities';

export default class PlayersCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in players controller');

    this.helpers({
      data() {
        return Players.find();
      }
    });

  }
  
  showNewPlayerModal() {
    this.NewPlayer.showModal();
  }
}

PlayersCtrl.$inject = ['$scope', 'NewPlayer'];