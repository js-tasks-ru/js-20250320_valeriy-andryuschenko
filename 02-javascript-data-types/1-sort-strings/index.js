/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {object} param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  arr.sort((a, b) => {
    if (a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }) === 1) {
      return 1;
    }

    if (a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }) === 0) {
      return 0;
    }

    if (a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }) === -1) {
      return -1;
    }
  });

  if (param === 'desc') {
    arr.reverse();
  }

  return arr;
}
/*

const fruits = ['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'];
const chars = ['b', 'a', 'c'];
console.log(fruits)
sortStrings(fruits, {sort: "asc", localeName: "ru", sensitivity: 'base'});
console.log(fruits)
console.log(chars);
sortStrings(chars, 'asc');
console.log(chars);

const fruits2 = ['абрикос', 'яблоко', 'ёжик'];
//['абрикос', 'ёжик', 'яблоко']
const f = sortStrings(['абрикос', 'яблоко', 'ёжик']);
console.log(f);


*/
