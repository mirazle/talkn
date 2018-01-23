export default class Control {
  getOffsetPostCreateTime( posts ){
    return posts[ 0 ] ? posts[ 0 ].createTime : new Date().toString();
  }
}
