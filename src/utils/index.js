export const sortByKey = (array, key, order) => {
  key = key.split(".");
  var len = key.length;
  if (order === "desc") {
    array.sort(function(a, b) {
      var i = 0;
      while (i < len) {
        a = a[key[i]];
        b = b[key[i]];
        i++;
      }
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  } else {
    array.sort(function(a, b) {
      var i = 0;
      while (i < len) {
        a = a[key[i]];
        b = b[key[i]];
        i++;
      }
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
};
