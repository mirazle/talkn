import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	return state;
};
