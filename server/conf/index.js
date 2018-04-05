import conf from '../../common/conf';
import fs from 'fs';


console.log( process.env );
conf.sllOptions.pems.key = fs.readFileSync( conf.sllOptions.pems.key );
conf.sllOptions.pems.cert = fs.readFileSync( conf.sllOptions.pems.cert );
conf.proxySllOptions.pems.key = fs.readFileSync( conf.proxySllOptions.pems.key );
conf.proxySllOptions.pems.cert = fs.readFileSync( conf.proxySllOptions.pems.cert );
conf.clientSllOptions.pems.key = fs.readFileSync( conf.clientSllOptions.pems.key );
conf.clientSllOptions.pems.cert = fs.readFileSync( conf.clientSllOptions.pems.cert );

export default conf;
