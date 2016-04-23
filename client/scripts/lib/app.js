// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import leaderBoard from '/imports/components/leaderBoard/leaderBoard';
import players from '/imports/components/players/players';
import teams from '/imports/components/teams/teams';
import newteam from '/imports/components/teams/new-team';
import games from '/imports/components/games/games';
import settings from '/imports/components/settings/settings';
import todosList from '/imports/components/todosList/todosList';

// Modules
import Definer from '../definer';
import NewPlayerCtrl from '../controllers/new-player.controller';
import NewGameCtrl from '../controllers/new-game.controller';
import NewUserCtrl from '../controllers/new-user.controller';
import RoutesConfig from '../routes';

// Services
import GameScore from '../services/game-score.service';
import NewPlayer from '../services/new-player.service';
import NewGame from '../services/new-game.service';
import NewUser from '../services/new-user.service';

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
  'teams',
  'newteam',
  'games',
  'settings',
  'todosList'
]);

new Definer(App)
  .define(NewPlayerCtrl)
  .define(NewGameCtrl)
  .define(NewUserCtrl)
  .define(GameScore)
  .define(NewUser)
  .define(NewGame)
  .define(NewPlayer)
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