import { Filter } from '../entities';
import { Players } from '/imports/api/players.js';

export default class player_name extends Filter {
  filter(player_id) {
    if (!player_id) return;

    let player = Players.findOne({ _id: player_id });
    return player;
  }
}
