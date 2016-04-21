import { Controller } from '../entities';

export default class TeamsCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in teams controller');

    this.helpers({
      data() {
        return Teams.find();
      }
    });

  }

  showNewTeamModal() {
    this.NewTeam.showModal();
  }

}

TeamsCtrl.$inject = ['$scope', 'NewTeam'];