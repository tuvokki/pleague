import { Config } from './entities';
 
export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html'
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
    });
     
    this.  $urlRouterProvider.otherwise('tab/leaderboard');

  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];