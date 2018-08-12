export default {
  server: {
    findOneThreadActiveHour: { type: Number, deffault: 24 },
    findOnePostCnt: { type: Number, default: 20 },
    getThreadChildrenCnt: { type: Number, default: 20 }
  },
  client: {
    test: { type: Number, default: 1 }
  },
  common: {
    test: { type: Number, default: 1 }
  }
}
