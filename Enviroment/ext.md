#iframeで直接talkn.ioを読み込まない理由

<iframe src="talkn.io" />で読み込むとハッシュ値以下がサーバー側でrefererとして取得出来ないため正確なコネクションを生成出来ない。
そのため親Window側で<script src="ext.talkn.io" />を読み込み、親Window側のlocation.hrefでコネクションを確定する必要がある。
(子Windowから、親Windowからは双方のグローバル領域のデータにはアクセス出来ないため、必ず親Window側でコネクションを確定する必要があるのでscriptタグの埋め込みが必要。)

#ext.jsが二つある理由

本来はChrome拡張を起動した際にext.talkn.ioから親jsを取得したいが(extension/ext.js, extension/talkn.client.jsは本来は不要)、
TwitterなどのCSP(コンテンツセキュリティポリシー)が厳格なサイトだとXSSで外部ファイルを取得することが制限される。
そのためchrome.runtime.getURL()で取得出来るchrome拡張内の「ローカルファイル」で必要なファイルを全て扱う必要がある。
それがdeploy.shでextensionフォルダ内にコピーするようにしている理由。talkn.client.jsも同じ。

#Redux.Provider.Container(Posts)開閉の仕組み整理：
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