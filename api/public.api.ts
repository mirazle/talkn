export default class PublicApi {
  constructor(coreApi) {
    return {
      version: "1.0",
      find: (params = {}, callback = () => {}) => {
        coreApi.find(params, callback);
      },
      post: (params = {}, callback = () => {}) => {
        coreApi.post(params, callback);
      }
    };
  }
}
