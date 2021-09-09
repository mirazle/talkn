import nodemailer from 'nodemailer';

export default class Mail {
  static send(inquiry) {
    //SMTPサーバの設定
    var smtp = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
    });

    //メール情報の作成
    var message = {
      from: inquiry.mail,
      to: 'hmiyazaki@mail.talkn.io',
      subject: inquiry.title,
      text: inquiry.content,
    };

    // メール送信
    try {
      smtp.sendMail(message, function (error, info) {
        // エラー発生時
        if (error) {
          console.log('send failed');
          console.log(error.message);
          return;
        }

        // 送信成功
        console.log('send successful');
        console.log(info);
      });
    } catch (e) {
      console.log('Error', e);
    }
  }
}
