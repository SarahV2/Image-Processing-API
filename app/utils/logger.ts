import express, { Request, Response } from 'express'

const logger = (req: Request, res: Response,next: Function):void=>{
    let {url} = req
    console.log(`${url} was visited`)
    next()
}

export default logger