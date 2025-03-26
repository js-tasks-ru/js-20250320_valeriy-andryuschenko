/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {object} param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const stringElements = [...arr];
  stringElements.sort((a,b) => a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}));

  if (param === 'desc') {
    stringElements.reverse();
  }

  return stringElements;
}
