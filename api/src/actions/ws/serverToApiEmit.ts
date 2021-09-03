import Sequence from 'common/Sequence';

export default (response) => {
  const type = `${Sequence.SERVER_TO_API_EMIT}${response.type}`;
  return { ...response, type };
};
