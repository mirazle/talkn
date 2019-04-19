import nodemailer from 'nodemailer';

export default class Mail {
  async send(req, res, next){
        //SMTPの設定
    const setting = {
      //SMTPサーバーを使う場合
      host: 'SMTPホスト',
      auth: {
          user: 'ユーザ名',
          pass: 'パスワード',
          port: 'SMTPポート番号'
      }
    };

    const smtp = nodemailer.createTransport('SMTP', setting);
  }
}
