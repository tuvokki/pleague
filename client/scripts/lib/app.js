// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import leaderBoard from '/imports/components/leaderBoard/leaderBoard';
import players from '/imports/components/players/players';
import newplayer from '/imports/components/players/new-player';
import teams from '/imports/components/teams/teams';
import newteam from '/imports/components/teams/new-team';
import games from '/imports/components/games/games';
import newgame from '/imports/components/games/new-game';
import settings from '/imports/components/settings/settings';
import newuser from '/imports/components/settings/new-user';
import todosList from '/imports/components/todosList/todosList';

// Services
import services from '/imports/services/game-score.service';
// Filters
import filters from '/imports/filters/filters';

// Modules
import Definer from '../definer';
import RoutesConfig from '../routes';
 
// App
const App = angular.module('PLeague', [
  'angular-meteor',
  'ionic',
  'leaderBoard',
  'players',
  'newplayer',
  'teams',
  'newteam',
  'games',
  'newgame',
  'settings',
  'newuser',
  'services',
  'filters',
  'todosList'
]);

new Definer(App)
  .define(RoutesConfig);
 
// Startup
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['PLeague']);
}