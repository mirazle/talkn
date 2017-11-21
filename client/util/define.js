import func from './func'
import define from './define'

let protcol = func.getProtcol();
let u = document.evaluate("//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",document,null,2,null).stringValue;
let h = protcol + "//";
let l = location.host;
const favicon = func.getDefaultFavicon();
const env = ( location.href.indexOf("talkn.io") === -1 )? "dev" : "prod" ;
const host = env === "prod" ? "http://talkn.io/" : "localhost" ;
//const host = ( env === "prod" )? "http://react.talkn.io/" : "http://localhost:8080/" ;
const isTouch = ('ontouchstart' in window);


export default {
	env: env,
	host: host,
	isTouch: isTouch,
	mode: "screen1",
	modeModel: {
		"screen1": { "minWidth": 0, "maxWidth": 619 },
		"screen2": { "minWidth": 620, "maxWidth": 959 },
		"screen3": { "minWidth": 960, "maxWidth": 999999 }
	},
	server:{
		host,
		httpPort: 10001,
		httpsPort: 10443,
		path: "",
		connection: "",
		endPoint: '/socket.io/socket.io.js',
		defaultKey: 'me',
		defaultThum: "//assets.talkn.io/icon/default.png",
		option: {},
		postSchema:{
			path: "", talk: ""
		}
	},
	cacheKey:{
		index: "talknIndexList",
		setting: "talknSettingParams"
	},
	throwSetTalknIndex: [ "stickMoveTalkn", "stickResizeTalkn", "stickThreadMove", "stickSettingBar", "endThreadMove", "endTransitionDisplayArea", "endNotif" ],
	apiMenuViewCnt: 3,
	apiMenu:[ "meta", "social", "movie", "instagram", "wikipedia", "analyze" ],
	style:{
		settingBg: "url( " + h + "//assets.talkn.io/img/setting.png ) 50% 50% / 20px 20px no-repeat",
		btnTalknBg:"url( " + h + "assets.talkn.io/img/btnTalkn.png ) 50% 50% / 45px 45px no-repeat" ,
		nextBg: { background: "url( " + h + "assets.talkn.io/img/next.png ) 50% 50% / 16px 16px no-repeat" },
		backBg: { background: "url( " + h + "assets.talkn.io/img/back.png ) 50% 50% / 16px 16px no-repeat" },
		twBg: { background: "url( " + h + "assets.talkn.io/img/tw.png ) 50% 50% / 32px 32px no-repeat" },
		fbBg: { background: "url( " + h + "assets.talkn.io/img/fb.png ) 50% 50% / 32px 32px no-repeat" },
		appleBg: { background: "url( " + h + "assets.talkn.io/img/apple.png ) 50% 50% / 32px 32px no-repeat" },
		androidBg: { background: "url( " + h + "assets.talkn.io/img/android.png ) 50% 50% / 32px 32px no-repeat" },
		hpBg: { background: "url( " + h + "assets.talkn.io/img/hp.png ) 50% 50% / 32px 32px no-repeat" },
		shBg: { background: "url( " + h + "assets.talkn.io/img/sh.png ) 50% 50% / 32px 32px no-repeat" },
		multiStreamBg: { background: "url( " + h + "assets.talkn.io/img/multiStream.png ) 50% 50% / 24px 24px no-repeat" },
		saveIndexBg: { background: "url( " + h + "assets.talkn.io/img/saveIndex.png ) 50% 50% / 24px 24px no-repeat" },
		myThreadBg: { background: "url( " + h + "assets.talkn.io/img/myThread.png ) 50% 50% / 24px 24px no-repeat" },
		metaBg: { background: "url( " + h + "assets.talkn.io/img/meta.png ) 50% 50% / 24px 24px no-repeat" },
		socialBg: { background: "url( " + h + "assets.talkn.io/img/social.png ) 50% 50% / 24px 24px no-repeat" },
		movieBg: { background: "url( " + h + "assets.talkn.io/img/movie.png ) 50% 50% / 24px 24px no-repeat" },
		pictureBg: { background: "url( " + h + "assets.talkn.io/img/picture.png ) 50% 50% / 24px 24px no-repeat" },
		instagramBg: { background: "url( " + h + "assets.talkn.io/img/instagram.png ) 50% 50% / 24px 24px no-repeat" },
		wikipediaBg: { background: "url( " + h + "assets.talkn.io/img/wikipedia.png ) 50% 50% / 24px 24px no-repeat" },
		analyzeBg: { background: "url( " + h + "assets.talkn.io/img/analyze.png ) 50% 50% / 20px 20px no-repeat" },
		colorBg: { background: "url( " + h + "assets.talkn.io/img/color.png ) 50% 50% / 24px 24px no-repeat" },
		clearBg: { background: "url( " + h + "assets.talkn.io/img/clear.png ) 50% 50% / 24px 24px no-repeat" },
		writeBg: { background: "url( " + h + "assets.talkn.io/img/write.png ) 50% 50% / 18px 18px no-repeat" },
		lockBg: { background: "url( " + h + "assets.talkn.io/img/lock.png ) 50% 50% / 24px 24px no-repeat" },
		unlockBg: { background: "url( " + h + "assets.talkn.io/img/unlock.png ) 50% 50% / 24px 24px no-repeat" },
		updateBg: { background: "url( " + h + "assets.talkn.io/img/update.png ) 50% 50% / 24px 24px no-repeat" },
		wwwBg: { background: "url( " + h + "assets.talkn.io/img/www.png ) 50% 50% / 32px 32px no-repeat" },
		userHandBg: { background: "url( " + h + "assets.talkn.io/img/userHand.png ) 50% 50% / 32px 32px no-repeat" },
		microphoneBg: { background: "url( " + h + "assets.talkn.io/img/microphone.png ) 50% 50% / 32px 32px no-repeat" },
		fontFamily: '"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif',
		favicon: favicon,
		settingBarLimit: 115,
		settingBarMug: 2.22,
		userThumL: "url( " + favicon + " ) 50% 50% / 40px 40px no-repeat",
		userThumM: "url( " + host + "img/people.png) 50% 55% / 30px 30px no-repeat",
		userThumOpacity: "1",
		userThumOpacityL: "1",
		userThumOpacityM: "1",
		fontColor: "rgba( 120, 120, 120, 0.88 )",
		lineColor: "rgba( 220, 220, 220, 0.88 )",
		bgColor: "rgba( 255, 255, 255, 0.80 )",
		drawFontColor1a: 1,
		drawBgColor1a: 0.7,
		drawBgColor2: "rgba( 220, 220, 220, 0.80 )",
		drawBgColor1: "rgba( 0, 200, 150, 0.7 )",
//		drawBgColor1: "rgba( 0, 200, 0, 0.4 )",
		drawFontColor1: "rgba( 250, 250, 250, 1 )",
//		drawBgColor2: "rgba( 240, 240, 240, 0.88 )",
		highlightBgColor: "rgba( 160, 160, 160, 0.7 )",
		highlightFontColor: "rgba( 255, 255, 255, 0.7 )",
		transition: "500ms",
		fontSize: "12px",
		changePageMug: 2,
		isBottomConditionRange: 45,
		offNewPostAlertTop: 30,
		onNewPostAlertTop: -10,
		notifAnimationMs: 4000,
		notifAnimation: 'toastUp 4000ms ease',
		defaultTalknWidth: "320px",
		defaultTalknHeight: "440px",
		defaultTalknRender: "right",
		defaultTalknIsOpen: false,
		defaultTalknIsMove: true,
		defaultTalknConnection: "/",
		displayAreaHeight: "70px",
		hideFooterHeight: "80px",
		focusZIndex: "2147483647",
		unfocusZIndex: "2147483646"
	}
}
