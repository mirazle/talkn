import Posts from 'common/schemas/state/Posts';

// TODO 本番でGET MOREが正く動作していない
// get moreしたら一番下までスクロールしてしまっている

export default ( state = new Posts() , action ) => {
	return state;
};
