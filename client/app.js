// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';

// Components
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

// Routes
App.config(
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/tabs.html'
      })
    .state('tab.leaderboard', {
      url: '/leaderboard',
      views: {
        'tab-leaderboard': {
          template: '<leader-board></leader-board>'
        }
      }
    })
    .state('tab.players', {
      url: '/players',
      views: {
        'tab-players': {
          template: '<players></players>'
        }
      }
    })
    .state('tab.newplayer', {
      url: '/players/new',
      views: {
        'tab-players': {
          template: '<newplayer></newplayer>'
        }
      }
    })
    .state('tab.teams', {
      url: '/teams',
      views: {
        'tab-teams': {
          template: '<teams></teams>'
        }
      }
    })
    .state('tab.newteam', {
      url: '/teams/new',
      views: {
        'tab-teams': {
          template: '<newteam></newteam>'
        }
      }
    })
    .state('tab.games', {
      url: '/games',
      views: {
        'tab-games': {
          template: '<games></games>'
        }
      }
    })
    .state('tab.newgame', {
      url: '/games/new',
      views: {
        'tab-games': {
          template: '<newgame></newgame>'
        }
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          template: '<settings></settings>'
        }
      }
    })
    .state('tab.newuser', {
      url: '/user/new',
      views: {
        'tab-settings': {
          template: '<newuser></newuser>'
        }
      }
    });
    $urlRouterProvider.otherwise('tab/leaderboard');
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