function omit(object, keys = []) {
  const clone = { ...object };

  keys.forEach((key) => delete clone[key]);

  return clone;
}

module.exports = omit;
