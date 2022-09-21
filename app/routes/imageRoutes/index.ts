import express,{ Request, Response } from "express";
import logger from "../../utils/logger";

const router = express.Router()

router.get('/', logger, (req:Request, res:Response) => {
    res.send('Hello API');
    // res.status(400).send('bad request');

  });

  router.get('/hello', logger, (req:Request, res:Response) => {
    const {title} = req.query
    // console.log(req.ip)
    
    res.send(`Information Received ${title}`);

  });

export default router