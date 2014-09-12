///////////////////////////////////////////////////////////////////////////////
// STATE MACHINE / WORKFLOW template functions
// These are evaluated by the html to see what we should be showing when.
// Probably only one should evaluate to true at a time.

// starting state, so return true by default
Template.plate.showPlateHello = function () {
  var doc = getSessionDocument();
  if (!doc) return true;
  // return !doc.plateBarcode || !doc.userBarcode;
  return 1;
}

// once we have scanned both barcodes, show instructions for taking photograph
Template.plate.showPlateInstructions = function () {
  var doc = getSessionDocument();
  if (!doc) return false;
  else if (doc && doc.hasOwnProperty("userBarcode"))
  // return doc.userBarcode && doc.plateBarcode && !doc.photoURL;
    return 1;
  else return 0;
}

// show the image and colony animations
Template.plate.showPlatePhoto = function () {
  var doc = getSessionDocument();
  if (doc && doc.photoURL && Session.get("photoTimerDone"))
  {console.log("returning doc.photoURL:");
   console.log(doc.photoURL);
   return doc.photoURL;}
  return false;
};

// only show if openCFU is done
// controls transclusion of plateAnalysis in platePhoto
Template.plate.showPlateAnalysis = function () {
  var doc = getSessionDocument();
  if (!doc) return false;
  return !!doc.colonyData && Session.get("reticulesDone") // casts to bool
}

// only show if we have some rare colors.
// TODO only trigger after reticule animation is done
Template.plate.showPlateRareColors = function () {
  var doc = getSessionDocument();
  if (!doc) return false;
  if (!doc.hasOwnProperty('colonyData')) // not always present
    return false
  else
    return doc.colonyData[0].colorName;
}

Template.plate.showPlateWallUpdate = function () {
  //var timer = Date.now();
  var doc = getSessionDocument();
  if (!doc) return false;
  //return timer - doc.dateCreated > 1000; // check to see if colorname is set
  return (Session.get("rareColorsShown"));

}
