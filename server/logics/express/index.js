import Portal from '~/server/logics/express/Portal';
import Session from '~/server/logics/express/Session';
import Client from '~/server/logics/express/Client';
import Assets from '~/server/logics/express/Assets';

export default {
  portal: new Portal(),
  session: new Session(),
  client: new Client(),
  assets: new Assets(),
}
