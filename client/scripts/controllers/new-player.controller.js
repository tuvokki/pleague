import { Controller } from '../entities';
 
export default class NewPlayerCtrl extends Controller {
  constructor() {
    super(...arguments);

    console.log('in new-player controller');
    
    this.helpers({
        //   find all other users
        // users() {
        //   return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
        // }
    });
  }

  hideNewPlayerModal() {
    this.NewPlayer.hideModal();
  }
  
  newPlayer() {
    let that = this;
    try {
        Meteor.call('newPlayer', {name: this.name, claim: this.claim}, (error) => {
            if (error) {
                var alertPopup = that.$ionicPopup.alert({
                    title: 'Error adding player',
                    template: error.reason
                });

                alertPopup.then((res) => {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            } else {
                that.hideNewPlayerModal();
            }
        });
    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
}
 
NewPlayerCtrl.$inject = ['$scope', '$ionicPopup', 'NewPlayer'];
