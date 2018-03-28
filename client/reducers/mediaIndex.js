import MediaIndex from 'common/schemas/state/MediaIndex';

export default ( state = new MediaIndex() , action ) => {
	return action.mediaIndex ? state.merge( action.mediaIndex ) : state ;
};
