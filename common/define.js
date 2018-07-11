export default {
  PRODUCTION:'production',
  DEVELOPMENT: 'development',
  PRODUCTION_IP: 'ip-172-31-27-3',
  PRODUCTION_DOMAIN: 'talkn.io',
  DEVELOPMENT_DOMAIN: 'localhost',
  PORTS: {
    DEVELOPMENT: 8080,
    SOCKET_IO: {http: 10001, https: 10443},
    PROXY: 8000,
    PORTAL: 443,
    CLIENT: 8001,
    ASSETS: 8002,
    SESSION: 8003,
  },
  SUB_DOMAINS: {
    PORTAL: 'portal.',
    CLIENT: 'client.',
    ASSETS: 'assets.',
    SESSION: 'session.',
  },
}
