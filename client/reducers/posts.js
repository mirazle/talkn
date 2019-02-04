import Posts from 'common/schemas/state/Posts';

// get moreしたら一番下までスクロールしてしまっている
// Multiなのに、Singleが表示されている。且つ、getMoreがループする(判定がおかしい)

export default ( state = new Posts() , action ) => {
	return state;
};
