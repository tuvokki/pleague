import { Controller } from '../entities';
import { Players } from '/imports/api/players.js';

export default class NewTeamCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in new-team controller');

    this.helpers({
      players() {
        return Players.find({});
      }
    });
  }

  hideNewTeamModal() {
    this.NewTeam.hideModal();
  }

  showNewPlayerModal() {
    this.NewPlayer.showModal();
  }

  newTeam() {
    let that = this;
    try {
      Meteor.call('newTeam', { players: [this.playerOne._id, this.playerTwo._id] }, (error) => {
        if (error) {
          var alertPopup = that.$ionicPopup.alert({
            title: 'Error adding Team',
            template: error.reason
          });

          alertPopup.then((res) => {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        } else {
          that.hideNewTeamModal();
        }
      });
    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }

}

NewTeamCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'NewTeam', 'NewPlayer'];
