import { Request, Response } from 'express'
import { Logger } from "tslog";

export const logger: Logger = new Logger({ name: "myLogger" });


const ApiAccessLogger = (req: Request, res: Response,next: Function):void=>{
    let {url} = req
    logger.info(`[API Access] ${url} was visited`)
    next()
}

export default ApiAccessLogger