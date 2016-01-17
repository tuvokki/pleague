/* global moment */
angular
  .module('PLeague')
  .filter('duration', duration);
 
function duration () {
  return function (from, to) {
    if (!from) return;
    if (!to) return;
 
    let x = moment(to).diff(from, 'milliseconds');
    let tempTime = moment.duration(x);
    return tempTime.minutes() + ":" + tempTime.seconds();

  };
}