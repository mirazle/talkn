export default {
	Posts: {
		connection: { type: String, default: '/' },
		connections: { type: [String], default: ['/'] },
		uid: { type: String, default: '' },
		utype: { type: String, default: '' },
		thum: { type: String, default: '' },
		post: { type: String, default: '' },
		data: { type: Object, default:{} },
		// Time
		createTime: { type: Date, default: Date },
		updateTime: { type: Date, default: Date },
		dispFlg:{ type: Boolean, default: true }
	},
	Threads: {
		// Base
		connection: { type: String, default: "/"  },
		title: { type: String, default: "" },
		favicon: { type: String, default: "//assets.talkn.io/icon/default.png" },
		contentType: { type: String, default: "text/html" },
		layer: { type: Number, default: 0 },

		// Head
		metas:{ type: [], default: []},
		links:{ type: [], default: []},
		h1s:{ type: [], default: []},
		mediaIndex: { type: [], default: []},

		// Uri
		uri: {type: Object, default: {}},

		// Analyze
		postCnt: { type: Number, default: 0 },
		watchCnt:{ type: Number, default: 0, min: 0, index: true },

		// Time
		createTime: { type: Date, default: Date },
		updateTime: { type: Date, default: Date },
	},
	Setting: {
		server:{ type: Object, default: {} },
		common:{ type: Object, default: {} },
		client:{ type: Object, default: {} },
	}
}
