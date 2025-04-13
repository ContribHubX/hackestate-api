import { Service } from "typedi";
import { emailConfig } from "./env-config";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import { AppError } from "../app-error";

// const hbsConfig : hbs.NodemailerExpressHandlebarsOptions = {
//     viewEngine: {
//       extname: '.hbs',
//       partialsDir: path.join(__dirname, '../views/'),
//       layoutsDir: path.join(__dirname, '../views/'),
//       defaultLayout: ''
//     },
//     viewPath: path.join(__dirname, '../views/'),
//     extName: '.hbs'
// };

@Service()
export default class EmailService{
    private readonly transporter : nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>
    
    constructor() {    
        this.transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            auth: {
                user : emailConfig.username,
                pass: emailConfig.password
            },
            secure: emailConfig.secure,
            tls:{
                rejectUnauthorized: emailConfig.rejectUnauthorized
            }
        });
        
        
    }

    async SendPasswordResetEmail(email: string, resetToken: string) {
        const resetUrl = `https://localhost:5718/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: '"Support Team" <no-reply@c2nared.com>',
            to: email,
            subject: "Password Reset Request",
            text: resetUrl,
        };

        await this.SendEmail(mailOptions);
    }

    private async SendEmail(mailOptions: any){
        try{
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.messageId}`);
        } catch(error){
            throw AppError.internalServer(`Error sending email for ${mailOptions.to}`);
        }
    }
    
}

