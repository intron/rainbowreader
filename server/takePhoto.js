(function(){/*
Runs gphoto2 and asynchronously returns path to saved photo.

GLOBAL FUNCTIONS
++++++++++++++++
  takePhoto(plateBarcode, callback)
    run gphoto2 and save photo to disk
    create filename with timestamp and plateBarcode
    callback takes filename of saved photo
*/
var exec = Meteor.npmRequire('child_process').exec;

// in case exec fails, sample picture of petri dish
// not sure best convention for combining working directory of meteor
// and local paths specified in settings.js
var platePhotosPath = Meteor.settings.platePhotosPath;

// run gphoto2 and save photo to disk
// create filename with timestamp and plateBarcode
// callback takes filename of saved photo
takePhoto = function(plateBarcode, callback) {
  var filename = platePhotosPath + Date.now().toString() + '_' + plateBarcode + '.jpg';
  var cmdline = "gphoto2 --capture-image-and-download --filename=" + filename;

  // TODO wrap in debug
  if (Meteor.settings.gphoto2) {
    console.log("takePhoto.js: capturing photo with gphoto2 command\n\t" + cmdline);
    var child = exec(cmdline, Meteor.bindEnvironment( function (error, stdout, stderr) {
      if (error) {
        console.log("shit went down in the gphoto2...");
        if (error) console.log("error: " + error);
        if (stdout) console.log("stdout: " + stdout);
        if (stderr) console.log("stderr: " + stderr);
      }
      callback(filename);
    }));
  } else {
    console.log("server/takePhoto.js: settings.gphoto2 is "  + Meteor.settings.gphoto2
              + "\n\t using dummy photo located at " + Meteor.settings.fakeColonyPhotoFile);
    callback( Meteor.settings.fakeColonyPhotoFile );
  }
}


})();
