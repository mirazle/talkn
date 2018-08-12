import define from '~/common/define'

export default {
	protocol: { type: String, default: "talkn:"  },
	connection: { type: String, default: '' },
	connections: { type: [String], default: [] },
	uid: { type: String, default: '' },
	utype: { type: String, default: '' },
	favicon: { type: String, default: define.FAVICON },
	post: { type: String, default: ' ' },
	data: { type: Object, default:{} },
	// Time
	createTime: { type: Date, default: Date },
	updateTime: { type: Date, default: Date },
	dispFlg:{ type: Boolean, default: true }
}
