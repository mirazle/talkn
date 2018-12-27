import Favicon from '~/server/logics/Favicon';

export default {
	protocol: { type: String, default: "talkn:"  },
	connection: { type: String, default: '' },
	connections: { type: [String], default: [] },
	layer: { type: Number, default: 0 },
	uid: { type: String, default: '' },
	utype: { type: String, default: '' },
	favicon: { type: String, default: Favicon.defaultFaviconPath },
	post: { type: String, default: ' ' },
	data: { type: Object, default:{} },
	// Time
	createTime: { type: Date, default: Date },
	updateTime: { type: Date, default: Date },
	dispFlg:{ type: Boolean, default: true }
}
