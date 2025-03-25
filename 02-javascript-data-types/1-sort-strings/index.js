/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {object} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, params = {
  sort: "asc",
  localeName: "en",
  sensitivity: 'base',
}) {
  arr.sort((a, b) => {
    if (a.localeCompare(b, params.localeName, {sensitivity: params.sensitivity}) === 1) {
      return 1;
    }

    if (a.localeCompare(b, 'ru') === 0) {
      return 0;
    }

    if (a.localeCompare(b, 'ru') === -1) {
      return 1;
    }
  });

  if (param === 'desc') {
    arr.reverse();
  }

  return arr;
}

//descending
//ascending
// const fruits = ['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'];
// const chars = ['b', 'a', 'c'];
// console.log(fruits)
sortStrings(fruits, {sort: "desc", localeName: "ru", sensitivity: 'base'});
// console.log(fruits)
// console.log(chars);
// sortStrings(chars, 'desc');
// console.log(chars);

const fruits2 = ['абрикос', 'яблоко', 'ёжик'];
//['абрикос', 'ёжик', 'яблоко']
const f = sortStrings(['абрикос', 'яблоко', 'ёжик'], {});
console.log(f);


