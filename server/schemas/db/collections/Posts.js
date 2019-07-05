import mongoose from 'mongoose';
import Favicon from '~/server/logics/Favicon';
const SchemaTypes = mongoose.Schema.Types;

export default {
	protocol: { type: String, default: "talkn:"  },
	connection: { type: String, default: '' },
	connections: { type: [String], default: [] },
	layer: { type: Number, default: 0 },
	uid: { type: String, default: '' },
	utype: { type: String, default: '' },
	favicon: { type: String, default: Favicon.defaultFaviconPath },
	post: { type: String, default: '' },
	data: { type: Object, default:{} },
	currentTime: { type: Number, default: 0.0 },
	// Time
	createTime: { type: Date, default: Date },
	updateTime: { type: Date, default: Date },
	dispFlg:{ type: Boolean, default: true }
}
