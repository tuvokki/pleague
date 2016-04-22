import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';

class TodosListCtrl {
  constructor() {
    this.tasks = [{
      text: 'Finish rewrite based on <a href="http://www.angular-meteor.com/tutorials/whatsapp/">Angular-Meteor & ionic</a>'
    }, {
        text: 'Modularize more based on <a href="https://www.meteor.com/tutorials/angular/creating-an-app">the official tutorial</a>'
      }, {
        text: 'Do something about those <a href="https://github.com/tuvokki/pleague/issues">issues</a>'
      }];
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: TodosListCtrl
  });