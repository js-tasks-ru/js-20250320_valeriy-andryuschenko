/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {object} param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const stringElements = [...arr];
  stringElements.sort((a, b) => {
    if (a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}) === 1) {
      return 1;
    }

    if (a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}) === 0) {
      return 0;
    }

    if (a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}) === -1) {
      return -1;
    }
  });

  if (param === 'desc') {
    stringElements.reverse();
  }

  return stringElements;
}
