// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import todosList from '/imports/components/todosList/todosList';

// Modules
import Definer from '../definer';
import LeaderboardCtrl from '../controllers/leaderboard.controller';
import PlayersCtrl from '../controllers/players.controller';
import NewPlayerCtrl from '../controllers/new-player.controller';
import GamesCtrl from '../controllers/games.controller';
import NewGameCtrl from '../controllers/new-game.controller';
import TeamsCtrl from '../controllers/teams.controller';
import NewTeamCtrl from '../controllers/new-team.controller';
import SettingsCtrl from '../controllers/settings.controller';
import NewUserCtrl from '../controllers/new-user.controller';
import RoutesConfig from '../routes';

// Services
import GameScore from '../services/game-score.service';
import NewPlayer from '../services/new-player.service';
import NewGame from '../services/new-game.service';
import NewTeam from '../services/new-team.service';
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
  'todosList'
]);

new Definer(App)
  .define(LeaderboardCtrl)
  .define(PlayersCtrl)
  .define(NewPlayerCtrl)
  .define(GamesCtrl)
  .define(NewGameCtrl)
  .define(TeamsCtrl)
  .define(NewTeamCtrl)
  .define(SettingsCtrl)
  .define(NewUserCtrl)
  .define(GameScore)
  .define(NewUser)
  .define(NewGame)
  .define(NewTeam)
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