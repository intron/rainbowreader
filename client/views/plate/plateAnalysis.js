
//counts the number of coloinies in colonyData
//this is just the length of the colonyData array
Template.plateAnalysis.colonyCount = function(){

    var currentDoc = getSessionDocument();
    return currentDoc.colonyData.length;
}



//counting # of unique xkcd color labels
Template.plateAnalysis.colorCount = function(){

    var currentDoc = getSessionDocument();

    //way to keep track of what hue values we've seen.
    var colorObject = {};

    currentDoc.colonyData.forEach(function(element){

	    var color = element.ColorName;

	    if (colorObject.hasOwnProperty[color])
	    {
		return;
	    }

	    colorObject[color] = 1;
	});
    

    
    //getting the number of elements in the object, which is the number of unique colors
    return Object.keys(colorObject).length;

}
   
Template.plateAnalysis.plateBarcode = function(){

    var currentDoc = getSessionDocument();
	
    return currentDoc.plateBarcode;}


Template.plateAnalysis.userBarcode = function(){

    var currentDoc = getSessionDocument();

    return currentDoc.userBarcode;
}

Template.plateAnalysis.displayTime = function(){
    
    var currentDoc = getSessionDocument();

    var unixTime = currentDoc.dateCreated;

    var date = new Date(unixTime);

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var year = date.getFullYear();
    var month = months[date.getMonth() - 1];
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    

    if (hour<10) hour +=0;
    if (min<10) min += 0;
    if (sec<10) sec += 0;

    var time = month + ' ' + day + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

    Template.plateAnalysis.totalColonies = function(){

	//var visualizationsArray = Visualizations.find().fetch();


	console.log("plateAnalysis.js: visualizations");
	// console.log(Visualizations);

	var statsObject = visualizationsArray[0];

	return statsObject.coloniesCount;

    }