import Portal from './Portal';
import Session from './Session';
import Client from './Client';
import Assets from './Assets';

export default {
  portal: new Portal(),
  session: new Session(),
  client: new Client(),
  assets: new Assets(),
}
