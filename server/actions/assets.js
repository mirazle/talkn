import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import subdomain from 'express-subdomain';
import passport from 'passport';

const TALKN_ASSETS_LISTEN_APPS_PORT = 80;
const TALKN_ASSETS_KEY_PEM = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const TALKN_ASSETS_CERT_PEM = '/etc/letsencrypt/live/talkn.io/cert.pem';

export default {
  setUpAssets: async () => {

    return true;  
  },
}
