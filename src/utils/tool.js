import _ from 'lodash'
export function findArrayWithPath(obj){
    let path = '';
    const result = _.find(obj, (value, key) => {
      if (_.isArray(value)) {
        path = key;
        return true;
      } else if (_.isObject(value)) {
        const found = findArrayWithPath(value);
        if (found) {
          path = key + '.' + found;
          return true;
        }
      }
      return false;
    });
    return result ? path : null;
};