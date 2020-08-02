"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mail {
    static send(inquiry) {
        var smtp = nodemailer_1.default.createTransport({
            host: "localhost",
            port: 25
        });
        var message = {
            from: "Inquiry@mail.talkn.io",
            to: "admin@mail.talkn.io",
            subject: inquiry.title,
            text: inquiry.content +
                " FRLANGUAGEOM " +
                inquiry.language +
                inquiry.mail +
                " FROM " +
                inquiry.mail
        };
        try {
            smtp.sendMail(message, function (error, info) {
                if (error) {
                    console.log("send failed");
                    console.log(error.message);
                    return;
                }
                console.log("send successful");
                console.log(info.messageId);
            });
        }
        catch (e) {
            console.log("Error", e);
        }
    }
}
exports.default = Mail;
//# sourceMappingURL=Mail.js.map