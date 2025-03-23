/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  arr.sort((a, b) => {
    const equalString = a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()) === 0;
    const lengthWord = a.length === b.length;
    if (a.localeCompare(b, 'ru') === 1) {
      if (equalString) {
        return -1;
      }

      if (lengthWord) {
        return 1;
      }

      return 1;
    }
    if (a.localeCompare(b, 'ru') === 0) {
      return 0;
    }
    if (a.localeCompare(b, 'ru') === -1) {
      if (equalString) {
        return -1;
      }

      if (lengthWord) {
        return -1;
      }

      return 1;
    }
  });

  if (param === 'desc') {
    arr.reverse();
  }
  return arr
}

//descending
//ascending
// const fruits = ['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'];
// const chars = ['b', 'a', 'c'];
// console.log(fruits)
// sortStrings(fruits, 'desc')
// console.log(fruits)
// console.log(chars);
// sortStrings(chars, 'desc');
// console.log(chars);

const fruits2 = ['абрикос', 'яблоко', 'ёжик']
//['абрикос', 'ёжик', 'яблоко']
const f = sortStrings(['абрикос', 'яблоко', 'ёжик'])
console.log(f)


