import db from '~/server/actions/db';
import io from '~/server/actions/io';
import express from '~/server/actions/express';

let actions = {};
Object.keys( db ).forEach( funcName => actions[ funcName ] = db[ funcName ]);
Object.keys( io ).forEach( funcName => actions[ funcName ] = io[ funcName ]);
Object.keys( express ).forEach( funcName => actions[ funcName ] = express[ funcName ]);
export default actions;
