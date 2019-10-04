export default {
  includeProcessKey: key => {
    return process.argv.includes(key);
  }
};
