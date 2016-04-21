/* global Players */
angular
  .module('PLeague')
  .filter('player', player);
 
function player () {
  return function (player_id) {
    if (!player_id) return;
    let player = Players.findOne({ _id: player_id });
    return JSON.stringify(player.players);
  };
}

angular
  .module('PLeague')
  .filter('player_name', player_name);
 
function player_name () {
  return function (player_id) {
    if (!player_id) return;
    let player = Players.findOne({ _id: player_id });
    return player.name;
  };
}
