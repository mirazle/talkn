<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
	<title>talkn</title>
	<script src="//redux.talkn.io/talkn.client.js" connection="<?php print $_SERVER['REQUEST_URI']?>" width="100%"></script>
<style>
	body{margin: 0px;}
	hr{margin: 50px 0px}
	h2{padding: 5px; background: rgb(60,60,60); color: white; text-indent: 20px;}
	code{background: rgb(60,60,60); color: white;}
</style>
</head>
<body>

<h2>1_接続コネクション</h2>
<ul>
	<li>
		<?php print $_SERVER['REQUEST_URI'] ;?>
	</li>
</ul>

<h2>2_導入</h2>
<ul>
	<li><a href="//react.talkn.io">react.talkn.io</a></li>
	<li><a href="//redux.talkn.io">redux.talkn.io</a></li>
	<li><a href="//chrome.google.com/webstore/detail/talknβ/mnjohomjimkpoenfioicmajdoboenjbk?hl=ja">Chrome拡張の限定公開</a></li>
	<li><?php print htmlspecialchars( "<script src='//client.talkn.io' connection='{$_SERVER['REQUEST_URI']}'></script>"); ?></li>
</ul>

<h2>3_ガイド</h2>
<ul>
	<li>
		<h3>基本操作編①　導入、投稿、基本操作など</h3><br>
		<video src="//mangekyo.sakura.ne.jp/demo1.mov" controls></video><br>
	</li>
	<li>
		<h3>基本操作編②　配色変更、移動、サイズ変更など</h3><br>
		<video src="//mangekyo.sakura.ne.jp/demo2.mov" controls>基本操作編②　配色変更、移動、サイズ変更など</video><br>
</ul>
<h2>4_宣伝</h2>
<ul>
	<li>
		<a href="//assets.talkn.io/ad.pdf">フライヤー</a>
	</li>
</ul>
<hr>

</body>
</html>
