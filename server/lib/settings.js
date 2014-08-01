// source https://gist.github.com/ritikm/6999942
// discussion https://groups.google.com/d/msg/meteor-talk/K79-i3LYL3g/yxd4_IZOErAJ
// be sure to set the METEOR_ENV environment variable i.e. in ~/.bash_profile:
// export METEOR_ENV='development_osx'

if (process.env.METEOR_ENV) {
  environment = process.env.METEOR_ENV;
  console.log("settings.js: detected $METEOR_ENV: " + environment);
} else {
  environment = "development";
  console.log("settings.js: can't find $METEOR_ENV, using default *development* environment");
}
 
var settings = {
  development: {
    public: {},
    private: {
      "gphoto2": true,
    	"opencfuPath": '/home/administrator/dev/opencfu/opencfu',
		  "scannerPath": '/dev/hidraw3',
      "platePhotosPath": "public/photos/",
		  "fakeColonyDataFile": '/code/rainbowreader/test/colonyData.json',
      "fakeColonyPhotoFile": 'public/photos/small.jpg'
    }
  },
  development_osx: {
    public: {},
    private: {
      "gphoto2":                false,
    	// "opencfuPath": '/Users/macowell/dev/museum/opencfu/opencfu',
      "opencfuPath":            false,
		  "scannerPath":            false,
      "platePhotosPath":        'public/photos/',
		  "fakeColonyDataFile":     'test/colonyData.json',
      "fakeColonyPhotoFile":    process.env.PWD + '/public/photos/small.jpg' // necessary cause opencfu gets confused
      
    }
  },
  production: {
    public: {},
    private: {}
  }
};
 
if (!process.env.METEOR_SETTINGS) {
  console.log("settings.js: No settings found in $METEOR_SETTINGS, using *" + environment + "* defined in server/lib/settings.js");
 
  if (environment === "production") {
    Meteor.settings = settings.production.private;
  } else if (environment === "development_osx") {
    Meteor.settings = settings.development_osx.private;
  } else {
    Meteor.settings = settings.development.private;
  }
 
  // Push a subset of settings to the client.
  if (Meteor.settings && Meteor.settings.public) {
    __meteor_runtime_config__.PUBLIC_SETTINGS = Meteor.settings.public;
  }
}