import Sequence from 'common/Sequence';

export default response => {
	const type = `${Sequence.SERVER_TO_CLIENT_EMIT}${response.type}`;
	return {...response, type}
};
