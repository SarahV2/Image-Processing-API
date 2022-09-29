import {
  checkForExistingImage,
  resizeImage,
  __basename,
} from '../imageProcessor';

describe('checkForExistingImage()', () => {
  it('should return True if an image with the provided filename exists', () => {
    const imageExists = checkForExistingImage('test_stars', 'input');
    expect(imageExists).toBeTrue();
  });
  it('should return False if an image with the provided filename does not exist', () => {
    const imageExists = checkForExistingImage('test_sea', 'input');
    expect(imageExists).toBeFalse();
  });
});

describe('processImage()', () => {
  it('should create and return the new processed thumbnail path if it does not exist', async () => {
    const path = await resizeImage('test_stars');
    const expectedPath = `${__basename}/src/assets/thumbnail/test_stars_thumbnail_200x200.jpg`;
    expect(path).toBe(expectedPath);
  });

  it('should throw an error if the source/original image does not exist', async () => {
    try {
      await resizeImage('test_sea');
    } catch (error: Error | unknown) {
      console.log(error);
      if (error instanceof Error) {
        expect(error.message).toBe(
          'An error occurred while processing the image'
        );
      }
    }
  });
});
