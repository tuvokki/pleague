// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
 
// Modules
import Definer from '../definer';
import LeaderboardCtrl from '../controllers/leaderboard.controller';
import PlayersCtrl from '../controllers/players.controller';
import NewPlayer from '../services/new-player.service';
import NewPlayerCtrl from '../controllers/new-player.controller';
import GamesCtrl from '../controllers/games.controller';
import NewGameCtrl from '../controllers/new-game.controller';
import TeamsCtrl from '../controllers/teams.controller';
import NewTeamCtrl from '../controllers/new-team.controller';
import SettingsCtrl from '../controllers/settings.controller';
import NewUserCtrl from '../controllers/new-user.controller';
import RoutesConfig from '../routes';

// Filters
import CalendarFilter from '../filters/calendar.filter';
import DurationFilter from '../filters/duration.filter';

 
// App
const App = angular.module('PLeague', [
  'angular-meteor',
  'ionic'
]);

new Definer(App)
  .define(LeaderboardCtrl)
  .define(PlayersCtrl)
  .define(NewPlayer)
  .define(NewPlayerCtrl)
  .define(GamesCtrl)
  .define(NewGameCtrl)
  .define(TeamsCtrl)
  .define(NewTeamCtrl)
  .define(SettingsCtrl)
  .define(NewUserCtrl)
  .define(CalendarFilter)
  .define(DurationFilter)
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