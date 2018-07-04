import portal from './portal';
import assets from './assets';
import client from './client';
import db from './db';
import api from './api';

let actions = {};
Object.keys( portal ).forEach( funcName => actions[ funcName ] = portal[ funcName ]);
Object.keys( assets ).forEach( funcName => actions[ funcName ] = assets[ funcName ]);
Object.keys( client ).forEach( funcName => actions[ funcName ] = client[ funcName ]);
Object.keys( db ).forEach( funcName => actions[ funcName ] = db[ funcName ]);
Object.keys( api ).forEach( funcName => actions[ funcName ] = api[ funcName ]);

export default actions;
