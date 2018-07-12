import db from './db';
import io from './io';
import express from './express';

let actions = {};
Object.keys( db ).forEach( funcName => actions[ funcName ] = db[ funcName ]);
Object.keys( io ).forEach( funcName => actions[ funcName ] = io[ funcName ]);
Object.keys( express ).forEach( funcName => actions[ funcName ] = express[ funcName ]);
export default actions;
