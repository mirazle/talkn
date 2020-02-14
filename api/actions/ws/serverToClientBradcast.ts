import Sequence from "api/Sequence";

export default response => {
  const type = `${Sequence.SERVER_TO_CLIENT_BROADCAST}${response.type}`;
  return { ...response, type };
};
