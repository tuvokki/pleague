import { Controller } from '../entities';

export default class GamesCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in games controller');

    this.helpers({
      isAdmin() {
        let user = Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { profile: 1 } });
        if (user) {
          this.role = user.profile.role;
          if (this.role === 'admin') {
            return true;
          }
        }
        return false;
      },
      data() {
        return Games.find(
          { endDate: { $exists: true } }
        );
      },
      inprogress() {
        return Games.findOne(
          { endDate: { $exists: false } }
        );
      }
    });

  }

  scored(team) {
    this.GameScore.scored(team, this.inprogress);
  }

  showNewGameModal() {
    if (this.inprogress) {
      let confirmPopup = this.$ionicPopup.confirm({
        title: 'Unable to create game',
        template: 'Cannot add game while a game is in progress.<br><b>Do you want to end this game?</b>'
      });

      confirmPopup.then((res) => {
        if (res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
          return;
        }
      });
    } else {
      this.NewGame.showModal();
    }
  }

  remove(game) {
    Games.remove(game._id);
  }

}

GamesCtrl.$inject = ['$scope', '$ionicPopup', 'NewGame', 'GameScore'];