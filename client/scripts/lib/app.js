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

// Modules
import Definer from '../definer';
import RoutesConfig from '../routes';

// Services
import GameScore from '../services/game-score.service';

// Filters
import CalendarFilter from '../filters/calendar.filter';
import DurationFilter from '../filters/duration.filter';
import ExcludeFromFilter from '../filters/exclude-from.filter.js';
import PlayerFilter from '../filters/player.filter.js';
import PlayerNameFilter from '../filters/player-name.filter.js';
 
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
  'todosList'
]);

new Definer(App)
  .define(GameScore)
  .define(CalendarFilter)
  .define(DurationFilter)
  .define(ExcludeFromFilter)
  .define(PlayerFilter)
  .define(PlayerNameFilter)
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