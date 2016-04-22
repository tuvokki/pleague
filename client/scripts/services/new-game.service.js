import { Service } from '../entities';

export default class NewGame extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = 'client/templates/new-game.html';
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

NewGame.$inject = ['$rootScope', '$ionicModal'];