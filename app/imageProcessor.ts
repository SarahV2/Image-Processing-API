import fs from "fs";

export const openImage = async (
  fileName: string,
  width: number = 200,
  height: number = 200
) => {
  console.log("width is", width);
  console.log("height is", height);
  //   try {
  const path = `${__dirname}/assets/${fileName}.jpg`;
  if (fs.existsSync(path)) {
    console.log("found");
    resizeImage(fileName, width, height);
  }
};

// ==========================================================================

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

    console.log("Processing Finished");
    return newFilePath;
  } catch (error) {
    throw Error("An error occured while processing the image");
  }
};

const checkForExistingImage = (
  fileName: string,
  target: "input" | "output"
): boolean => {
  const directory = target === "input" ? "source" : "thumbnail";
  const path = `${__dirname}/assets/${directory}/${fileName}.jpg`;
  console.log("PATH", path);
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

  console.log("width", width);
  const thumbnailFileName = `${fileName}_thumbnail_${width}x${height}`;

  const thumbnailExists = checkForExistingImage(thumbnailFileName, "output");

  if (thumbnailExists) {
    console.log("Processed image exists");
    return `${__dirname}/assets/thumbnail/${thumbnailFileName}.jpg`;
  } else {
    // check if the original image exists
    console.log("no previous thubmnail exists, creating a new image ...");
    const originalImageExists = checkForExistingImage(fileName, "input");

    if (originalImageExists) {
      // resize the image and return the processed image
      return await resizeImage(fileName, width, height);
    } else {
      throw Error("Image do not exist!");
    }
  }
};
