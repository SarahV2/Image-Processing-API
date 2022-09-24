import fs from "fs";
import { logger } from "./utils/logging";

export const resizeImage = async (
  fileName: string,
  width: number = 200,
  height: number = 200
) => {
  const sharp = require("sharp");
  const newFilePath = `${__dirname}/assets/thumbnail/${fileName}_thumbnail_${width}x${height}.jpg`;

  try {
    await sharp(__dirname + `/assets/source/${fileName}.jpg`)
      .resize(width, height)
      .toFile(newFilePath);

    logger.debug("Processing Finished");
    return newFilePath;
  } catch (error) {
    throw Error("An error occurred while processing the image");
  }
};

const checkForExistingImage = (
  fileName: string,
  target: "input" | "output"
): boolean => {
  const directory = target === "input" ? "source" : "thumbnail";
  const path = `${__dirname}/assets/${directory}/${fileName}.jpg`;
  
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

export const processImage = async (
  fileName: string,
  width = 200,
  height = 200
): Promise<string> => {
  // check if the thumbnail already exists (has been processed before)

  const thumbnailFileName = `${fileName}_thumbnail_${width}x${height}`;

  const thumbnailExists = checkForExistingImage(thumbnailFileName, "output");

  if (thumbnailExists) {
    logger.debug("Processed image exists");
    return `${__dirname}/assets/thumbnail/${thumbnailFileName}.jpg`;
  } else {
    // check if the original image exists
    logger.debug("no previous thumbnail exists, creating a new image ...");
    const originalImageExists = checkForExistingImage(fileName, "input");

    if (originalImageExists) {
      // resize the image and return the processed image
      return await resizeImage(fileName, width, height);
    } else {
      throw new Error("Image do not exist!");
    }
  }
};
