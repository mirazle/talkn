import { myUserKey, idSeparator } from './storage';

export const getSessionValues = () => {
  let sessionStr = null;
  let _userId = null;
  const talknCoverSessionValues = localStorage.getItem(myUserKey);
  if (talknCoverSessionValues) {
    [sessionStr, _userId] = talknCoverSessionValues.split(idSeparator);
  }
  return { sessionStr, _userId };
};
