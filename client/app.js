// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';

// Components
import dashBoard from '/imports/components/dashBoard/dashBoard';
import leaderBoard from '/imports/components/leaderBoard/leaderBoard';
import players from '/imports/components/players/players';
import newplayer from '/imports/components/players/new-player';
import teams from '/imports/components/teams/teams';
import newteam from '/imports/components/teams/new-team';
import games from '/imports/components/games/games';
import newgame from '/imports/components/games/new-game';
import gameinprogress from '/imports/components/games/game-in-progress'
import settings from '/imports/components/settings/settings';
import newuser from '/imports/components/settings/new-user';
import todosList from '/imports/components/todosList/todosList';

// Services
import services from '/imports/services/game-score.service';

// Filters
import filters from '/imports/filters/filters';

// Directives
import directives from '/imports/directives/directives';

// App
const App = angular.module('PLeague', [
  'angular-meteor',
  'ionic',
  'dashBoard',
  'leaderBoard',
  'players',
  'newplayer',
  'teams',
  'newteam',
  'games',
  'newgame',
  'gameinprogress',
  'settings',
  'newuser',
  'services',
  'filters',
  'directives',
  'todosList'
]);

// Routes
App.config(
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/tabs.html'
      });

    $urlRouterProvider.otherwise('tab/dashboard');
  }
);

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
