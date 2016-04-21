import { Controller } from '../entities';

export default class NewGameCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.enabled = true;

    this.helpers({
      redteams: () => {
        return Teams.find({});
      },
      blueteams: () => {
        return Teams.find({});
      }
    });
  }

  showNewTeamModal() {
    this.NewTeam.showModal();
  }

  hideNewGameModal() {
    this.NewGame.hideModal();
  }

  selectTeam() {
    //TODO: team cannot have the same PLAYER as opposite team!
    console.log('team red: ' + this.teamRed);
    console.log('team blue: ' + this.teamBlue);
    if (this.teamRed && this.teamBlue && this.teamRed._id != this.teamBlue._id) {
      delete this.selectMessage;
      this.enabled = false;
    } else {
      if (this.teamRed && this.teamBlue) {
        this.selectMessage = 'You can\'t select the same team twice';
      }
      this.enabled = true;
    }
  }

  newGame() {
    let that = this;
    try {
      Meteor.call('newGame', { teamRed: this.teamRed, teamBlue: this.teamBlue }, (error) => {
        if (error) {
          var alertPopup = that.$ionicPopup.alert({
            title: 'Error adding Game',
            template: error.reason
          });

          alertPopup.then((res) => {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        } else {
          that.hideNewGameModal();
        }
      });
    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }
}

NewGameCtrl.$inject = ['$scope', '$ionicPopup', 'NewGame', 'NewTeam'];
