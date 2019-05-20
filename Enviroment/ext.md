
仮説：
Reactコンポーネントをreturn nullする表示制御の仕方をすると、
スマホブラウザで操作した際に他コンポーネントの画像がチラつくことがあるので、
CSSのdisplay: noneで制御に統一すべき。
(コンポーネントの中身が変わってもチラつかない)

仮説：
アニメーションの最中にDOMの構造に変化があると、
他コンポーネントの画像がちらつく

------------------------------
A app.isOpenPosts
B app.isDispPosts
------------------------------

●開くとき
A   B
0	0		フッターアイコンを押す。
0	0		talkn: extention(“toggleIframe”)が実行
0	0		parent: toggleIframeメソッドが実行される。heightを450pxにする(0ms)
0	0		parent: postMessage(“openPosts”)を実行(未実装)
0	1		talkn: openPostsを実行。translate3d(0px, 100%, 0px)にする(600ms)(未実装)
1	1		transitionEndで完了

●閉じるとき
A   B
1	1		フッターアイコンを押す。
1	1		talkn: extention(“toggleIframe”)が実行
1	1		parent: toggleIframeメソッドが実行される。
			setTimeoutで600ms経過後にheightを45pxになる(0ms)
1	1		parent: postMessage(“closePosts”)を実行(未実装)
1	0		talkn: openPostsを実行。translate3d(0px, 0%, 0px)にする(600ms)(未実装)
0	0		transitionEndで完了