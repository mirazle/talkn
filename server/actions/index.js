import db from '~/server/actions/db';
import io from '~/server/actions/io';
import express from '~/server/actions/express';

let actions = { db: {}, io: {}, express: {} };
Object.keys( db ).forEach( funcName => actions.db[ funcName ] = db[ funcName ]);
Object.keys( io ).forEach( funcName => actions.io[ funcName ] = io[ funcName ]);
Object.keys( express ).forEach( funcName => actions.express[ funcName ] = express[ funcName ]);
export default actions;
