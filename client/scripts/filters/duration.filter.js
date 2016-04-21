import moment from 'moment';

import { Filter } from '../entities';

export default class duration extends Filter {
  filter(from, to) {
    if (!from) return;
    if (!to) return;

    let x = moment(to).diff(from, 'milliseconds');
    let tempTime = moment.duration(x);
    return tempTime.minutes() + ":" + tempTime.seconds();
  }
}