export default {
	Posts: {
		uid: { type: String, default: '' },
		connections: { type: [String], default: [] },
		connection: { type: String, default: '' },
		title: { type: String, default: '' },
		thum: { type: String, default: '' },
		talk: { type: String, default: '' },
		postTime: { type: Date, default: Date },
		data: { type: Object, default:{} },
		dispFlg:{ type: Boolean, default: true }
	},
	Threads: {
		connection: { type: String, default: "/"  },
		title: { type: String, default: "" },
		faviconName: { type: String, default: "//assets.talkn.io/icon/default.png" },
		metas:{ type: [], default: []},
		links:{ type: [], default: []},
		h1s:{ type: [], default: []},
		extentionType: { type: String, default: "html" },
		layer: { type: Number, default: 0 },
		postCnt: { type: Number, default: 0 },
		watchCnt:{ type: Number, default: 0, min: 0, index: true },
		updatedTime: { type: Date, default: Date },
	},
	Setting: {

	}
}
