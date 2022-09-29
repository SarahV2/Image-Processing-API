import fs from "fs";
import * as fsExtra from "fs-extra";
import { logger } from "./utils/logging";

const __basename = require("path").resolve(__dirname, "..");

export const resizeImage = async (
  fileName: string,
  width: number = 200,
  height: number = 200
) => {
  const sharp = require("sharp");
  const newFilePath = `${__basename}/src/assets/thumbnail/${fileName}_thumbnail_${width}x${height}.jpg`;
  try {
    await sharp(__basename + `/src/assets/source/${fileName}.jpg`)
      .resize(width, height)
      .toFile(newFilePath);

    logger.debug("Processing Finished");
    return newFilePath;
  } catch (error) {
    throw Error("An error occurred while processing the image");
  }
};

export const checkForExistingImage = (
  fileName: string,
  target: "input" | "output"
): boolean => {
  const directory = target === "input" ? "source" : "thumbnail";
  const path = `${__basename}/src/assets/${directory}/${fileName}.jpg`;
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
    return `${__basename}/src/assets/thumbnail/${thumbnailFileName}.jpg`;
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

export const deleteThumbnails = () => {
  const fileDir = `${__basename}/src/assets/thumbnail`;
  fsExtra.emptyDirSync(fileDir);
};
