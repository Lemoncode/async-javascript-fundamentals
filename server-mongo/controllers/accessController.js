// https://javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/
const accessController = (resolveAccess, getNumber) => { 
  return {
    get: (req, res) => resolveAccess(getNumber)(res)
  };
};

module.exports = accessController;
