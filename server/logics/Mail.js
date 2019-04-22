import nodemailer from 'nodemailer';

export default class Mail {
  static send(req, res, next){

    //SMTPサーバの設定
    var smtp = nodemailer.createTransport({
      host: 'localhost',
      port: 25
    });

    //メール情報の作成
    var message = {
      from: 'Inquiry@mail.talkn.io',
      to: 'admin@mail.talkn.io',
      subject: 'nodemailer test mail',
      text: 'テストメールです。'
    };

    // メール送信
    try{
      smtp.sendMail(message, function(error, info){
        // エラー発生時
        if(error){
            console.log("send failed");
            console.log(error.message);
            return;
        }
        
        // 送信成功
        console.log("send successful");
        console.log(info.messageId);
      });
    }catch(e) {
      console.log("Error",e);
    }
  }
}
