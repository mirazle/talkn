import db from 'server/actions/db';
import express from 'server/actions/express';
import io from 'server/actions/io';

let actions = { db, io, express };
/*
let actions = { db: {}, io: {}, express: {} };
Object.keys( db ).forEach( funcName => actions.db[ funcName ] = db[ funcName ]);
Object.keys( io ).forEach( funcName => actions.io[ funcName ] = io[ funcName ]);
Object.keys( express ).forEach( funcName => actions.express[ funcName ] = express[ funcName ]);
*/
export default actions;
