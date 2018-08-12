import Posts from '~/server/schemas/db/collections/Posts';
import Setting from '~/server/schemas/db/collections/Setting';
import Threads from '~/server/schemas/db/collections/Threads';
import Users from '~/server/schemas/db/collections/Users';
import html from '~/server/schemas/logics/html';

export default {
	db: {
		collections:{
			Posts,
			Setting,
			Threads,
			Users
		}
	},
	logics:{
		html
	}
}
