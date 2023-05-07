import nodemailer, { TransportOptions } from 'nodemailer';
import { ResponseService } from '../responses/response.service';
import { EmailI } from './interfaces/email.interface';
import config from '../../configs/envs';
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import { ResponseServiceI } from '../responses/interface/response.interface';
import { logError } from '../logs/logger';
import { Actions } from '../logs/interfaces/logs.interface';


const emailService = async (payload: EmailI): Promise<ResponseServiceI> => {
    const transporter = nodemailer.createTransport({
        host: `${config.nodemailer.NODEMAILER_HOST}`,
        port: +`${config.nodemailer.NODEMAILER_PORT}`,
        secure: true, // true for 465, false for other ports
        auth: {
            user: `${config.nodemailer.NODEMAILER_EMAIL}`,
            pass: `${config.nodemailer.NODEMAILER_PASS}`,
        },
    });
    const options: NodemailerExpressHandlebarsOptions = {
        viewEngine: {
            extname: '.hbs',
            defaultLayout: __dirname + `/templates/${payload.template}.hbs`,
        },
        viewPath: __dirname + '/templates/',
        extName: '.hbs'
    }
    transporter.use('compile', hbs(options))
    const dataEmail: EmailI = {
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        template: payload.template,
        context: {
            ...payload.context,
        },
        attachments: payload.attachments
    }
    try {
        const data = await transporter.sendMail({ from: `${config.nodemailer.NODEMAILER_EMAIL}`, ...dataEmail })
        return ResponseService(true, "Email sent", data, 200);
    } catch (error: any) {
        logError(Actions.POST, 'Email not sent', error.message, 'Email')
        return ResponseService(false, "Email not sent", error, 500);
    }
}

export { emailService }