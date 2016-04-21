angular.module('PLeague')
  .filter('excludeFrom',function(){
    return function(inputArray,filterCriteria){
      return inputArray.filter(function(item){
        // if the value of filterCriteria is "falsy", retain the inputArray as it is
        // then check if the currently checked item in the inputArray is different from the filterCriteria,
        // if so, keep it in the filtered results
        return !filterCriteria || !angular.equals(item,filterCriteria);
      });
    };
  })
