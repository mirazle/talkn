import Express from '~/server/listens/express';

export default {
  setUp: async () => {
    const express = new Express();
    express.createHttpServer();
    express.createHttpsServer();
  }
}
