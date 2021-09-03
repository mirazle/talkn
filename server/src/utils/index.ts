export default {
  includeProcessKey: (key) => {
    return process.argv.includes(key);
  },
  getBool: (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  },
};
