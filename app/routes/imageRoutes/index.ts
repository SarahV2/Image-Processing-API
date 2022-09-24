import express, { Request, Response } from "express";
import { processImage } from "../../imageProcessor";
import ApiAccessLogger from "../../utils/logging";
import { logger } from "../../utils/logging";
const router = express.Router();

router.get("/image", ApiAccessLogger, async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  let width = req.query.width as string;
  let height = req.query.height as string;

  if (!width) {
    width = "200";
  }
  if (!height) {
    height = "200";
  }
  try{
  const result = await processImage(
    filename,
    parseInt(width),
    parseInt(height)
  );
  res.sendFile(result);
  }
  catch(error:Error|unknown){
    if (error instanceof Error){
      logger.error(error.message)
      res.status(400).send({"Error":error.message})
    }
    else{
      res.send('An error occurred while attempting to process your request')
    }
  }
});

router.delete("/image", ApiAccessLogger, (req: Request, res: Response) => {
  res.send("Hello API");
  // res.status(400).send('bad request');
});

export default router;
