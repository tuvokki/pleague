import angularMeteor from 'angular-meteor';
import moment from 'moment';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

export default angular.module('filters', [
  angularMeteor
])
  .filter('duration', () => {
    return (from, to) => {
      if (!from) return;
      if (!to) return;

      let x = moment(to).diff(from, 'milliseconds');
      let tempTime = moment.duration(x);
      return tempTime.minutes() + ":" + tempTime.seconds();
    }
  })
  .filter('excludeFrom', () => {
    return (inputArray, filterCriteria) => {
      if (!inputArray) return;
      if (!filterCriteria) return;

      return inputArray.filter((item) => {
        // if the value of filterCriteria is "falsy", retain the inputArray as it is
        // then check if the currently checked item in the inputArray is different from the filterCriteria,
        // if so, keep it in the filtered results
        return !filterCriteria || !angular.equals(item, filterCriteria);
      });
    }
  })
  .filter('player_name', () => {
    return (player_id) => {
      if (!player_id) return;

      let player = Players.findOne({ _id: player_id });
      return player.name;
    }
  })
  .filter('player', () => {
    return (player_id) => {
      if (!player_id) return;

      let player = Players.findOne({ _id: player_id });
      return JSON.stringify(player.players);
    }
  })
  .filter('team', () => {
    return (team_id) => {
      if (!team_id) return;
      let ss = Teams.findOne({ _id: team_id });
      if (!ss) {
        ss = Teams.findOne({ _id: team_id._id });
      }
      if (ss) {
        if (ss.name) {
          return ss.name;
        } else {
          let p1 = Players.findOne({ _id: ss.players[0] });
          let p2 = Players.findOne({ _id: ss.players[1] });
          if (!p1) {
            p1 = { name: 'unknown' };
          }
          if (!p2) {
            p2 = { name: 'unknown' };
          }
          return p1.name + ' and ' + p2.name;
        }
      } else {
        return 'Team not found';
      }
    }
  })
  .filter('teamElo', () => {
    return (teams) => {
      if (!teams) return;
      for(var i=0; i<teams.length; i++) {
        let team = teams[i];
        let p0 = Players.findOne({ _id: team.players[0] });
        let p1 = Players.findOne({ _id: team.players[1] });
        team.teamElo = (p0.elo + p1.elo);
      }
      return teams;
    }
  })
  .filter('calendar', () => {
    return (time) => {
      if (!time) return;

      return moment(time).calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: 'LT',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YY'
      });
    }
  });
