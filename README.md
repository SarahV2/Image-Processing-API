# Image Processing API

Is an API that can be used to process images and resize them with the desired dimentions


## Technologies Used
* TypeScript
* Express JS
* Node JS
* Sharp
* tsLog
* Jasmine
* Supertest
* esLint
* Prettier

## Getting Started

### Installation 
Install the dependencies by running the command ```npm install```

### Starting Up the server
To get the server up and running, run the following command ```npm run start```

## Images/ Files avaliable
The current implementation is lmited to include the following files (resources included)

<table>
<th>#</th>
<th>Filename</th>

<tr>
<td>1</td>
<td>snow</td>
</tr>

<tr>
<td>2</td>
<td>stars</td>
</tr>

<tr>
<td>3</td>
<td>clouds</td>
</tr>

<tr>
<td>4</td>
<td>test_clouds</td>
</tr>

<tr>
<td>5</td>
<td>test_stars</td>
</tr>


</table>

<small>Please note that filenames starting with ```test_``` are required for running the tests</small>

## API Endpoints

Base URL: http://localhost:8000/api

* #### GET ```/image```

  Example: ``` GET/ localhost:8000/api/image?filename=clouds```

  * Generates a resized image with the specified width & heigth
  * In case no dimentions were specified, the default width and height values are set to 200
  * An error is returned in case no image file exists with the provided name, or in case an error occured while processing the image

  * Query Parameters
    <table>
    <th>Parameter</th>
    <th>Required?</th>

    <tr>
    <td>filename</td>
    <td>True</td>
    </tr>

    <tr>
    <td>width</td>
    <td>False</td>
    </tr>

    <tr>
    <td>height</td>
    <td>False</td>
    </tr>
    </table>
    
* #### DELETE ```/image```
  Example: ``` DELETE/ localhost:8000/api/image```
  
  Deletes all generated images from the thumbnail directory
## Testing
Run the tests by ```npm run test```

## Resources
