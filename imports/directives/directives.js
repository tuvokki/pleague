import angularMeteor from 'angular-meteor';

export default angular.module('directives', [
  angularMeteor
])
  .directive('focusMe', ($timeout) => {
    return {
      link: (scope, element, attrs) => {
        $timeout(() => {
          element[0].focus();
        }, 150);
      }
    };
  });