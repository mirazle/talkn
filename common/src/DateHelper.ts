const DateHelper = class DateHelper {
  static getNowYmdhis() {
    const nowDate = new Date();
    const nowY = nowDate.getFullYear();
    const nowM = nowDate.getMonth() + 1;
    const nowD = nowDate.getDate();
    const nowH = nowDate.getHours();
    const nowI = nowDate.getMinutes();
    const nowS = nowDate.getSeconds();
    const nowDay = nowDate.getDay();
    return { Y: nowY, M: nowM, D: nowD, H: nowH, I: nowI, S: nowS, Day: nowDay };
  }

  static getMongoYmdhis(d) {
    const splited = d.split('T');
    const splitedYMD = splited[0].split('-');
    const Y = splitedYMD[0];
    const M = splitedYMD[1].length === 1 ? '0' + splitedYMD[1] : splitedYMD[1];
    const D = splitedYMD[2].length === 1 ? '0' + splitedYMD[2] : splitedYMD[2];
    const splitedOther = splited[1].split('.');
    const splitedHIS = splitedOther[0].split(':');
    const H = splitedHIS[0].length === 1 ? '0' + splitedHIS[0] : splitedHIS[0];
    const I = splitedHIS[1].length === 1 ? '0' + splitedHIS[1] : splitedHIS[1];
    const S = splitedHIS[2].length === 1 ? '0' + splitedHIS[2] : splitedHIS[2];
    const date = new Date(`${Y}-${M}-${D}T${H}:${I}`);
    const Day = DateHelper.getYoubi(date.getDay());
    return { Y, M, D, H, I, S, Day };
  }

  static getYoubi(num) {
    if (num === 0) return 'Sun';
    if (num === 1) return 'Mon';
    if (num === 2) return 'Tue';
    if (num === 3) return 'Wed';
    if (num === 4) return 'Thu';
    if (num === 5) return 'Fri';
    if (num === 6) return 'Sat';
  }

  static getDiffDay(start, end) {
    const date1 = new Date(`${start.Y}/${start.M}/${start.D}`);
    const date2 = new Date(`${end.Y}/${end.M}/${end.D}`);
    // @ts-ignore
    return (date1 - date2) / 86400000;
  }
};

export default DateHelper;
