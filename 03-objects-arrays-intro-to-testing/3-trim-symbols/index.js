/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  let resultString = '';
  let currentSymbol = '';
  let resultCurrentSymbol = '';


  for (let i = 0; i < string.length; i++) {
    if (currentSymbol !== string[i]) {
      currentSymbol = string[i];
      resultString += resultCurrentSymbol;
      resultCurrentSymbol = '';
    }

    if (resultCurrentSymbol.length === size) {
      continue;
    } else {
      resultCurrentSymbol += currentSymbol;
    }
  }

  resultString += resultCurrentSymbol;
  return resultString;
}

