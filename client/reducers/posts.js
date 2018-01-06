import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	return action.posts ? state.merge( action.posts ) : state ;
};
