import { Player } from './connectors';

const resolvers = {
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
        }
    }
};

export default resolvers;
