import Schema from '~/schemas/Schema';

export default class Analyze extends Schema{
  constructor(){
    super();

    const watchCnt = 0;

    // Initialize.
    return this.init({
      watchCnt
    });
  }
}
