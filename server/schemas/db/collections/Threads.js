import define from '~/common/define';
import conf from '~/common/conf';
import Posts from './Posts';
import Html from '~/server/schemas/logics/Html';
import Favicon from '~/server/logics/Favicon';
const html = new Html();

export default {
	connection: { type: String, default: "/"  },
	connections: { type: [String], default: ['/'] },
	hasSlash:  { type: String, default: false },
	host: { type: String, default: "" },
	layer: { type: Number, default: 0 },
	favicon: { type: String, default: Favicon.defaultFaviconPath},
	faviconType: { type: String, default: Favicon.defaultFaviconData.faviconType },

	// Analyze
	postCnt: { type: Number, default: 0 },
	multiPostCnt: { type: Number, default: 0 },
	watchCnt:{ type: Number, default: 1, min: 0},

	// html(serverMetas)
	...html,

	// Post
	lastPost: Posts,

	// Time
	createTime: { type: Date, default: Date },
	updateTime: { type: Date, default: Date }
}
