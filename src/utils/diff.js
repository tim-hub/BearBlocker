const R = require('ramda');
const {logger} = require('./logger');
const startSymbol = '####----$$$$----Managed By Hosts Manager';
const endSymbol = '####----!!!!----End Managed By Hosts Manager';

const getIndexes = (localHosts) => {
  let startIndex = -1;
  let endIndex = -1;
  // mergeLocalAndRemote these 2 files
  localHosts.map(
      (l, i) => {
        if (l === startSymbol) {
          startIndex = i;
        } else if (l === endSymbol) {
          endIndex = i;
        }
      },
  );
  return {startIndex, endIndex};
};

// eslint-disable-next-line valid-jsdoc
/**
 * to mergeLocalAndRemote local and remote hosts
 * @return {Buffer | any[] | string}
 */
const mergeLocalAndRemote = (localHosts, remoteHosts) => {
  const {startIndex, endIndex} = getIndexes(localHosts);
  if (startIndex === -1 || endIndex === -1) {
    return localHosts.concat([startSymbol], remoteHosts, [endSymbol]);
  } else {
    let beginning;
    let ending;
    try {
      beginning = localHosts.slice(0, startIndex + 1);
      ending = localHosts.slice(endIndex, localHosts.length);
    } catch (e) {
      logger.error(e);
    }
    return beginning.concat(remoteHosts, ending);
  }
};

const getDiff = (localList, remoteList) => {
  return R.without(localList, remoteList);
};

module.exports = {
  mergeLocalAndRemote: mergeLocalAndRemote,
  getDiff,
  startSymbol,
  endSymbol,
  getIndexes,
};
