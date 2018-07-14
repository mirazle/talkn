import http from 'http';
import https from 'https';
import conf from '~/server/conf';
import Express from '~/server/listens/express';

export default {
  setUpExpress: async () => {
    const express = new Express();
    express.createHttpServer();
    express.createHttpsServer();
  }
}
