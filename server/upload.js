var request = Meteor.require('request');
var Stream = Meteor.require('stream');
var fs = Meteor.require('fs');

var serverAddress = 'http://localhost:3000';

postColonyData = function(dishBarcode, colonyData, imageFilename) {
  postDishJson(dishBarcode, colonyData);
  postDishImage(dishBarcode, imageFilename);
}
 
function postDishJson(dishBarcode, colonyData) {
  //wrap the colonyData string in a stream
  var colonyDataStream = new Stream();
  colonyDataStream.pipe = function(dest) {
    dest.write(colonyData);
  }

  var colonyOptions = {
    url: serverAddress + '/uploadColonyData',
    headers: { barcode: dishBarcode }
  };

  //create a post request, and if it fails, push a function onto a list to retry later
  var req = request.post(colonyOptions, function(error, resp, body) {
    if(error) {
      postsToRetry.push(function() {
        postDishJson(dishBarcode, colonyData);
      });
    }
  });
  
  //send the data through the request
  colonyDataStream.pipe(req);
  //fs.createReadStream(jsonFilename).pipe(req);
}

function filenameFromPath(path) {
  return path.substring(1+path.lastIndexOf('/'));
}

function postDishImage(dishBarcode, imageFilename) {
  var imageOptions = {
    url: serverAddress + '/uploadDishImage',
    headers: { barcode: dishBarcode, filename: filenameFromPath(imageFilename) }
  };

  //create a post request, and if it fails, push a function onto a list to retry later
  var req = request.post(imageOptions, function(error, resp, body) {
    if(error) {
      postsToRetry.push(function () {
        postDishImage(dishBarcode, imageFilename);
      });
    }
  });

  //send the file through the request
 fs.createReadStream(imageFilename).pipe(req);
}

var testUpload = function() {
  var imageFilename = '/home/administrator/dev/rainbow-reader/public/small.jpg';
  var jsonFilename =  '/home/administrator/dev/rainbow-reader/test/small.json';
  postColonyData('abcde', jsonFilename, imageFilename);
}

