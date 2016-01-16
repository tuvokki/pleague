/* global angular */
angular
  .module('PLeague')
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html'
    })
    .state('tab.leaderboard', {
      url: '/leaderboard',
      views: {
        'tab-leaderboard': {
          templateUrl: 'client/templates/leaderboard.html',
          controller: 'LeaderboardCtrl as leaderboard'
        }
      }
    })
    .state('tab.players', {
      url: '/players',
      views: {
        'tab-players': {
          templateUrl: 'client/templates/players.html',
          controller: 'PlayersCtrl as players'
        }
      }
    })
    .state('tab.teams', {
      url: '/teams',
      views: {
        'tab-teams': {
          templateUrl: 'client/templates/teams.html',
          controller: 'TeamsCtrl as teams'
        }
      }
    })
    .state('tab.games', {
      url: '/games',
      views: {
        'tab-games': {
          templateUrl: 'client/templates/games.html',
          controller: 'GamesCtrl as games'
        }
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.html',
          controller: 'SettingsCtrl as settings'
        }
      }
    });
 
  $urlRouterProvider.otherwise('tab/leaderboard');
}