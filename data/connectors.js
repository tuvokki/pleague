import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://pleague:W4nsmaak@ds011482.mlab.com:11482/heroku_fvrtt85g');
// Use native promises
mongo.Promise = global.Promise;

const db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const PlayerSchema = Mongoose.Schema({
    name: String,
    elo: Number,
    joinDate: Date,
    retired: Boolean,
    retireDate: Date,
    claim: Boolean,
    belongsTo: String,
    lastPlayed: []
});

const Player = mongo.model('Player', PlayerSchema);

export { Player };
