// document which stores the state of the current session
WorkstationSessions = new Mongo.Collection('workstationSessions');

// Holds the id of the mongo document which holds the state between server and client.
// Is a string once the server creates the document, but Templates will not react at
// all if it is '' or undefined
workstationSession = {};

// shared db of all data on plates on the visualization server
Experiments = new Mongo.Collection('experiments');

Visualizations = new Mongo.Collection('visualizations');

if (Meteor.isServer){
  Meteor.publish('workstationSessions', function () {
    return WorkstationSessions.find();
  });

  Meteor.publish('experiments', function () {
    return Experiments.find();
  });

  Meteor.publish('visualizations', function () {
    return Visualizations.find();
  });
}