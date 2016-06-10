//bootstrap code
let admin = Accounts.users.findOne({
  username: 'admin'
});

if (!admin) {
  console.log('Creating admin user from defaults.');
  try {
    Accounts.createUser({
      username: 'admin',
      email: 'admin@tuvok.nl',
      password: 'secret',
      profile: {
        //publicly visible fields like firstname goes here
        firstname: 'Lt. Commander',
        lastname: 'Tuvok',
        role: 'admin'
      }
    });

  } catch (e) {
    console.log('Hjalp!!');
    console.log(e);
  }
}
console.log("Environment: " + process.env.NODE_ENV);

import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

if (process.env.NODE_ENV === "development") {
  let players = ["Antoon","Ramoen","Bortin","Tom","Gasper","Susanne",
    "WAuter","Patterick","Maarthen","SvenA","Nicky",
    "Ulger","SvenB","Jerom","Chat","Meloossa","Annie",
    "Maartin","Robberd","Marc-c-c","Antonie","Barm","MarkyMark"
    ];
  if (Players.find().fetch().length > 0) {
  }
  // To start with a new database, start meteor like this
  // CLEAN_START=true meteor
  if (process.env.CLEAN_START) {
    // Empty all data
    Players.remove({});
    Teams.remove({});
    Games.remove({});

    // Create players
    players.forEach(function(player) {
      Meteor.call('newPlayer', { name: player }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }, this);
    
    // Create 10 random teams
    for (var i = 0; i < 10; i++) {
      teamplayers = shuffleArray(players);
      p0 = Players.findOne({ name: teamplayers[0] });
      p1 = Players.findOne({ name: teamplayers[1] });
      Meteor.call('newTeam', { players: [p0._id, p1._id]}, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
    
  }
}
