import { Filter } from '../entities';

export default class player_name extends Filter {
  filter(player_id) {
    if (!player_id) return;

    let player = Players.findOne({ _id: player_id });
    return player.name;
  }
}
