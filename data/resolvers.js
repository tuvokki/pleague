import { Player } from './connectors';
// import { GraphQLDateTime } from 'graphql-iso-date';

const resolvers = {
    // Date: GraphQLDateTime,
    Query: {
        players() {
            return Player.find().then();
        }
    },
    Player: {
        name(player) {
            return player.name;
        },
        elo(player) {
            return player.elo;
        },
        joinDate(player) {
            return player.joinDate;
        },
        retired(player) {
            return player.retired || false;
        },
        retireDate(player) {
            return player.retireDate;
        },
        belongsTo(player) {
            return player.belongsTo;
        },
        claim(player) {
            return player.claim || false;
        },
        lastPlayed(player) {
            return player.lastPlayed;
        }
    }
};

export default resolvers;
