import { transports, format, createLogger, Logger } from 'winston';
import { levels, Actions } from './interfaces/logs.interface';



const transporter: { development: transports.ConsoleTransportInstance[]; production: transports.FileTransportInstance[] } = {
    development: [
        new transports.Console({
            format: format.combine(format.cli(), format.simple())
        })
    ],
    production: [new transports.File({ filename: 'combined.log' })]
}

const winstonLogger: Logger = createLogger({
    levels,
    format: format.combine(format.timestamp(), format.json(), format.align()),
    defaultMeta: { service: 'api' },
    transports: process.env.NODE_ENV === 'development' ? transporter['development'] : transporter['production'],
})

const logError = (action: Actions, description: string, error_msg: string, service: string) => {
    const message = `${action} - ${description} - ${service} - ${error_msg}`
    winstonLogger.log('error', message, { service, error_msg })
}

const logInfo = (action: Actions, description: string, info_msg: string, service: string) => {
    const message = `${action} - ${description} - ${service} - ${info_msg}`
    winstonLogger.log('info', message)
}

export { logError, logInfo }