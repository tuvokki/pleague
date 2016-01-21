/* global Teams, Players */
angular
  .module('PLeague')
  .filter('team', team);
 
function team () {
  return function (team_id) {
    if (!team_id) return;
    let ss = Teams.findOne({ _id: team_id });
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
  };
}