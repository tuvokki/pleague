angular
  .module('PLeague')
  .service('GameScore', GameScore);
 
function GameScore($rootScope, $ionicModal) {
  this.scored = scored;
  
  function scored(team, inprogress) {
    if (team === 'red') {
      Games.update(inprogress._id, {
        $set: { teamRedScore: inprogress.teamRedScore + 1 }
      });
      console.log('red scored!');
      if (inprogress.teamRedScore++ > 6) {
        Games.update(inprogress._id, {
          $set: { winner: inprogress.teamRed,
          endDate: Date.now() }
        });
        console.log('red won!');
      }
    } else {
      Games.update(inprogress._id, {
        $set: { teamBlueScore: inprogress.teamBlueScore + 1 }
      });
      console.log('blue scored!');
      if (inprogress.teamBlueScore++ > 6) {
        Games.update(inprogress._id, {
          $set: { winner: inprogress.teamBlue,
          endDate: Date.now() }
        });
        console.log('blue won!');
      }
    }
  }
  
}