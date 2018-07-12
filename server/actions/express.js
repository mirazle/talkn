import conf from '~/conf';
import http from 'http';
import https from 'https';
import Express from '~/listens/express';

export default {
  setUpExpress: async () => {
    const express = new Express();
    express.createHttpServer();
    express.createHttpsServer();
  }
}
