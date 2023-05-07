import { ResponseServiceI } from "./interface/response.interface";

const ResponseService = (succes: boolean, message: string, data: any, statusCode: number): ResponseServiceI => {
    return {
        succes,
        message,
        data,
        statusCode
    }
}

export { ResponseService }