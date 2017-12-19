export default {
	Post: {
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
	Index: {
		connection: { type: String, default: "/"  },
		type: { type: String, default: "userHand" },
		title: { type: String, default: "" },
		thum: { type: String, default: "//assets.talkn.io/icon/default.png" },
		layer: { type: Number, default: 0 },
		cnt: { type: Number, default: 0 },
		watchCnt:{ type: Number, default: 0, min: 0, index: true },
		updatedTime: { type: Date, default: Date },
		meta:{}
	},
	Setting: {
	}
}
