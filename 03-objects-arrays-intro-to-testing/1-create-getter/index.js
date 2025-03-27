/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const fields = path.split('.');

  return function getValueByProps(obj) {
    let result = {...obj};
    for (const field of fields) {
      if (result.hasOwnProperty(field)) {
        result = result[field];
      } else {
        return undefined
      }
    }

    return result;
  }
}


export function createGetterrecursive(path) {
  const fields = path.split('.');

  return function getValueByProps(obj) {
    const searchObject = {...obj}
    const key = fields.shift();
    if (!searchObject.hasOwnProperty(key)) {
      return undefined;
    }

    if (fields.length === 0) {
      return searchObject[key];
    }

    return getValueByProps(searchObject[key]);
  };
}

const obj = {
  category: {
    title: 'Goods',
    foo: undefined
  }
};

