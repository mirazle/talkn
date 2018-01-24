export default class Control {
  getOffsetFindId( posts ){
    return posts[ 0 ] ? posts[ 0 ]._id : 'ffffffffffffffffffffffff';
  }
}
