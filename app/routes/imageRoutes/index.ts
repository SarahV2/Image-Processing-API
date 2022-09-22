import express, { Request, Response } from "express";
import { processImage } from "../../imageProcessor";
import logger from "../../utils/logger";

const router = express.Router();

router.get("/hello", logger, async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  let width = req.query.width as string;
  let height = req.query.height as string;

  if (!width) {
    width = "200";
  }
  if (!height) {
    height = "200";
  }
  const result = await processImage(
    filename,
    parseInt(width),
    parseInt(height)
  );
  res.sendFile(result);
});

router.delete("/image", logger, (req: Request, res: Response) => {
  res.send("Hello API");
  // res.status(400).send('bad request');
});

export default router;
