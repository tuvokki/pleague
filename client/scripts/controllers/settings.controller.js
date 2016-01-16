angular
  .module('PLeague')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in settings controller');
}