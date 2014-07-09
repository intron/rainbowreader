var exec = Meteor.require('child_process').exec;

var backupFilePath = '/code/rainbowreader/public/small.jpg';

takePhoto = function(dishBarcode, callback) {
  
  if (typeof callback !== 'function') {
    throw 'takePhoto must be called with a function callback(filename).';
  }
  
  var photosPath = "./photos/";
  var filename = photosPath + Date.now().toString() + '_' + dishBarcode + '.jpg';
  var cmdline = "gphoto2 --capture-and-download --filename=" + filename;

  console.log('*click*');

  // run gphoto 
  var child = exec(cmdline, function (error, stdout, stderr) {
    if (error || stderr) {
      console.log("shit went down in the gphoto..." + stderr);

      // probably don't have the camera hooked up
      // give em the backup file!
      filename = backupFilePath;
    }
    callback(filename);
  });
}

