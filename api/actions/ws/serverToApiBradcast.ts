import Sequence from "api/Sequence";

export default response => {
  const type = `${Sequence.SERVER_TO_API_BROADCAST}${response.type}`;
  return { ...response, type };
};
