import mongoose from 'mongoose';

export default {
	Users: {
		uid: { type: String, default: '' },
		utype: { type: String, default: '' },
		connection: { type: String, default: '/' },
	},
	Posts: {
		protocol: { type: String, default: "talkn:"  },
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
		protocol: { type: String, default: "talkn:"  },
		connection: { type: String, default: "/"  },
		connections: { type: [String], default: ['/'] },
		title: { type: String, default: "" },
		favicon: { type: String, default: "//assets.talkn.io/icon/default.png" },
		contentType: { type: String, default: "text/html" },
		layer: { type: Number, default: 0 },

		// Head
		serverMetas:{ type: mongoose.Schema.Types.Mixed, default:{} },
		links:{ type: [], default: []},
		h1s:{ type: [], default: []},
		mediaIndex: { type: [], default: []},

		// Uri
		uri: {type: Object, default: {}},

		// Analyze
		postCnt: { type: Number, default: 0 },
		multiPostCnt: { type: Number, default: 0 },
		watchCnt:{ type: Number, default: 0, min: 0},
		// Time
		createTime: { type: Date, default: Date },
		updateTime: { type: Date, default: Date },
	},
	Setting: {
		server:{ type: mongoose.Schema.Types.Mixed, default: {} },
		common:{ type: mongoose.Schema.Types.Mixed, default: {} },
		client:{ type: mongoose.Schema.Types.Mixed, default: {} },
	}
}
