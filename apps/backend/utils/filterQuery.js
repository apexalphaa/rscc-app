module.exports = (query = {}, excluded = []) => {
  const filters = { ...query };

  excluded.forEach((field) => delete filters[field]);

  return filters;
};
