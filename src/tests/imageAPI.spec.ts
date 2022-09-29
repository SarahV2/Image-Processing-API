import supertest from "supertest";
import { checkForExistingImage, resizeImage } from "../imageProcessor";
import app from "../server";

const request = supertest(app);

describe("GET /image endpoint", () => {
  it("returns a 400 response if no file name was provided", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ Error: "Image do not exist!" });
  });

  it("returns a 200 response if filename of an existing image is provided", async () => {
    const response = await request.get("/api/image?filename=nature");
    expect(response.status).toBe(200);
  });
});

describe("DELETE /image endpoint", () => {
  it("successfully deletes all created thumbnails", async () => {
    // process an image then check if it exists
    await resizeImage("nature", 200, 200);
    let check = checkForExistingImage("nature_thumbnail_200x200", "output");
    expect(check).toBeTruthy();

    // call DELETE endpoint to delete all thumbnails/processed images

    const response = await request.delete("/api/image");

    // check if the processed image is no longer available
    check = checkForExistingImage("nature_thumbnail_200x200", "output");
    expect(check).toBeFalsy();
    expect(response.status).toBe(200);
  });
});
