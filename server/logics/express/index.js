import passport from 'passport';
import AuthTwitter from './AuthTwitter';

export default {
  authTwitter: new AuthTwitter( passport ),
}
