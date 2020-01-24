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
    const splited = d.split("T");
    const splitedYMD = splited[0].split("-");
    const Y = Number(splitedYMD[0]);
    const M = Number(splitedYMD[1]);
    const D = Number(splitedYMD[2]);
    const splitedOther = splited[1].split(".");
    const splitedHIS = splitedOther[0].split(":");
    const H = Number(splitedHIS[0]);
    const I = Number(splitedHIS[1]);
    const S = Number(splitedHIS[2]);
    const date = new Date(`${Y}-${M}-${D} ${H}:${I}`);
    console.log(`${Y}-${M}-${D} ${H}:${I}`);
    const Day = DateHelper.getYoubi(date.getDay());
    return { Y, M, D, H, I, S, Day };
  }

  static getYoubi(num) {
    if (num === 0) return "Sun";
    if (num === 1) return "Mon";
    if (num === 2) return "Tue";
    if (num === 3) return "Wed";
    if (num === 4) return "Thu";
    if (num === 5) return "Fri";
    if (num === 6) return "Sat";
  }

  static getDiffDay(start, end) {
    const date1 = new Date(`${start.Y}/${start.M}/${start.D}`);
    const date2 = new Date(`${end.Y}/${end.M}/${end.D}`);
    // @ts-ignore
    return (date1 - date2) / 86400000;
  }
};

export default DateHelper;
