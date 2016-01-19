/* global Players, Teams */
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


        let red = Teams.findOne({ _id: inprogress.teamRed });
        let blue = Teams.findOne({ _id: inprogress.teamBlue });
        
          let redp1 = Players.findOne({ _id: red.players[0] });
          let redp2 = Players.findOne({ _id: red.players[1] });
          let bluep1 = Players.findOne({ _id: blue.players[0] });
          let bluep2 = Players.findOne({ _id: blue.players[1] });

          let redelo = (redp1.elo + redp2.elo)/2;
          let blueelo = (bluep1.elo + bluep2.elo)/2;

          var elochanged = calculateELORatingChange(redelo, blueelo, 150);
          console.log(elochanged);

            Players.update({_id: redp1._id},
              {
                $set: {elo: redp1.elo + elochanged.win}
              }
            )
            Players.update({_id: redp2._id},
              {
                $set: {elo: redp2.elo + elochanged.win}
              }
            )
            Players.update({_id: bluep1._id},
              {
                $set: {elo: bluep1.elo + elochanged.loss}
              }
            )
            Players.update({_id: bluep2._id},
              {
                $set: {elo: bluep2.elo + elochanged.loss}
              }
            )


        
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
        
        
        let red = Teams.findOne({ _id: inprogress.teamRed });
        let blue = Teams.findOne({ _id: inprogress.teamBlue });
        
          let redp1 = Players.findOne({ _id: red.players[0] });
          let redp2 = Players.findOne({ _id: red.players[1] });
          let bluep1 = Players.findOne({ _id: blue.players[0] });
          let bluep2 = Players.findOne({ _id: blue.players[1] });

          let redelo = (redp1.elo + redp2.elo)/2;
          let blueelo = (bluep1.elo + bluep2.elo)/2;

          let elochanged = calculateELORatingChange(redelo, blueelo, 150);
          console.log(elochanged);

            Players.update({_id: bluep1._id},
              {
                $set: {elo: bluep1.elo + elochanged.win}
              }
            )
            Players.update({_id: bluep2._id},
              {
                $set: {elo: bluep2.elo + elochanged.win}
              }
            )
            Players.update({_id: redp1._id},
              {
                $set: {elo: redp1.elo + elochanged.loss}
              }
            )
            Players.update({_id: redp2._id},
              {
                $set: {elo: redp2.elo + elochanged.loss}
              }
            )

        
        
        console.log('blue won!');
      }
    }
  }
  
  /**
   * This method will calculate the change in a player's
   * Elo rating after playing a single game against another player.
   * The value K is the maximum change in rating. 
   **/
  function calculateELORatingChange (elo1, elo2, k)
  {
    var percentage = 1 / ( 1 + Math.pow( 10, (elo2 - elo1) / 400 ) );

    return {
      win: Math.round( k * ( 1 - percentage ) ),
      draw: Math.round( k * ( .5 - percentage ) ),
      loss: Math.round( k * ( 0 - percentage ) ),
      percent:  Math.round( percentage * 100 )
    };
  }

}