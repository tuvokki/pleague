import { Filter } from '../entities';

export default class excludeFrom extends Filter {
  filter(inputArray, filterCriteria) {
    if (!inputArray) return;
    if (!filterCriteria) return;

    return inputArray.filter((item) => {
      // if the value of filterCriteria is "falsy", retain the inputArray as it is
      // then check if the currently checked item in the inputArray is different from the filterCriteria,
      // if so, keep it in the filtered results
      return !filterCriteria || !angular.equals(item, filterCriteria);
    });
  }
}
