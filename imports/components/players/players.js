import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';
import { Players } from '/imports/api/players.js';

import template from './players.html';
import templateForm from './player-name-form.html';

class PlayersCtrl {
  constructor($scope, $ionicModal, $ionicListDelegate, $ionicActionSheet, usersService) {
    $scope.viewModel(this);
    this.$ionicModal = $ionicModal;
    this.$ionicListDelegate = $ionicListDelegate;
    this.$ionicActionSheet = $ionicActionSheet;
    this.usersService = usersService;

    console.log('in players controller');

    this.showPlayerInfo = 0;

    this.isAdmin = function () {
      return usersService.isAdmin();
    }

    this.helpers({
      players() {
        return Players.find();
      }
    });

    let that = this;
    this.$ionicModal.fromTemplateUrl('imports/components/players/player-name-form.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      that.modal = modal;
    });

  }

  hasClaimed() {
    if (Meteor.userId()) {
      const claimedPlayers = Players.find({
        belongsTo: { $exists: true}
      }).fetch();

      return claimedPlayers.some(function(p){
        return p.belongsTo == Meteor.userId();
      });
    } else {
      return false;
    }
  }

  isClaimed(player) {
    const unclaimedPlayers = Players.find({
      belongsTo: { $exists: true}
    }).fetch();

    return unclaimedPlayers.some(function(p){
      return p._id == player._id;
    });
  }

  claimedBy(player) {
    return Meteor.users.findOne({ _id: player.belongsTo }).profile.firstname;
  }

  canClaim() {
    return Meteor.userId() != null;
  }

  claimPlayer(player) {
    Players.update( player._id, {
      $set: {
        belongsTo: Meteor.user()._id
      }
    });
    this.$ionicListDelegate.closeOptionButtons();
  }

  toggleInfo(player) {
    if (this.showPlayerInfo == player._id) {
      this.showPlayerInfo = 0;
    } else {
      this.showPlayerInfo = player._id;
    }
  }

  isMine(player) {
    if (Meteor.userId()) {
      return player.belongsTo == Meteor.userId();
    } else {
      return false;
    }
  }

  changeNameModal(player) {
    this.changePlayer = player;
    this.modal.show();
  }

  retireModal(player){
    let that = this;
    this.changePlayer = player;
    this.$ionicActionSheet.show({
       buttons: [
         { text: '<b>Retire player</b>' }
       ],
       titleText: 'Really take ' + player.name + ' out of competition?',
       cancelText: 'Cancel',
       cancel: function() {
         that.$ionicListDelegate.closeOptionButtons();
       },
       buttonClicked: function(index) {
         if(index == 0){
           that.retire(that.changePlayer);
           return true;
         }
         that.$ionicListDelegate.closeOptionButtons();
         return true;
       }
     });
  };

  submitName() {
    if (this.changePlayer.name.length > 26) {
      throw new Meteor.Error('player-name-too-long',
            'A player\'s name cannot be longer than 26 characters');
    }
    Players.update({ _id: this.changePlayer._id },
    {
      $set: { name: this.changePlayer.name }
    });

    this.modal.hide();
    this.$ionicListDelegate.closeOptionButtons();
  }

  retire() {
    Players.update({ _id: this.changePlayer._id },
    {
      $set: { retired: true, retireDate: new Date() }
    });

    this.$ionicListDelegate.closeOptionButtons();
  }

  activateModal(player) {
    let that = this;
    this.changePlayer = player;

    let now = moment(Date.now());
    let retireDate = moment(player.retireDate);
    let diffDays = now.diff(retireDate, 'days');
    console.log(diffDays);
    if ( diffDays < 7 ) {
      this.$ionicActionSheet.show({
        buttons: [
        ],
        titleText: 'Cannot activate ' + player.name + '. When a player is retired a mimimum of 7 days pause is required. ' + player.name + ' has only be suspended for ' + diffDays +' days.',
        cancelText: 'Bummer',
        cancel: function() {
          that.$ionicListDelegate.closeOptionButtons();
        },
        buttonClicked: function(index) {
          that.$ionicListDelegate.closeOptionButtons();
          return true;
        }
      });
    } else {
      this.$ionicActionSheet.show({
        buttons: [
          { text: '<b>Activate player</b>' }
        ],
        titleText: 'Really add ' + player.name + ' to the arena again?',
        cancelText: 'Cancel',
        cancel: function() {
          that.$ionicListDelegate.closeOptionButtons();
        },
        buttonClicked: function(index) {
          if(index == 0){
            that.activate(that.changePlayer);
            return true;
          }
          that.$ionicListDelegate.closeOptionButtons();
          return true;
        }
      });
    }
  }

  activate(player) {
    Players.update({ _id: player._id },
    {
      $unset: { retired: true, retireDate: new Date() }
    });

    this.$ionicListDelegate.closeOptionButtons();
  }

  closeModal() {
    this.modal.hide();
    this.$ionicListDelegate.closeOptionButtons();
  }

  eloPenalty(player) {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Punish ' + player.name,
      template: 'This will substract 100 ELO from the total of this player.<br><b>Do you want to punish '+player.name+'?</b>'
    });

    confirmPopup.then((res) => {
      if (res) {
        Players.update({ _id: player._id },
        {
          $inc: { elo: -100 } //decrese the elo by 100
        })
      } else {
        return;
      }
      this.$ionicListDelegate.closeOptionButtons();
    });
  }

}

export default angular.module('players', [
  angularMeteor
])
  .component('players', {
    templateUrl: 'imports/components/players/players.html',
    controller: ['$scope', '$ionicModal', '$ionicListDelegate', '$ionicActionSheet', 'usersService', PlayersCtrl]
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.players', {
      url: '/players',
      views: {
        'tab-players': {
          template: '<players></players>'
        }
      }
    })
  });
