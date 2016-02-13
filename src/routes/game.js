var express = require('express');
var router = express.Router();
var sheet = require('./../smartsheet.json');
var client = require('smartsheet');
var smartsheet = client.createClient({accessToken: sheet.accessToken});

/* GET home page. */
router.get('/', function(req, res) {

  smartsheet.sheets.getSheet({id: sheet.sheetId}, function(error, data){
    if (error) {
      console.log(error);
    }

    var quiz_data = data;

    var gameBoard = {};

    //Empty arrays to place question objects into based on category before being processed into the final game board
    var basic100Questions = [];
    var basic200Questions = [];
    var basic300Questions = [];
    var basic400Questions = [];
    var basic500Questions = [];
    var collab100Questions = [];
    var collab200Questions = [];
    var collab300Questions = [];
    var collab400Questions = [];
    var collab500Questions = [];
    var projMan100Questions = [];
    var projMan200Questions = [];
    var projMan300Questions = [];
    var projMan400Questions = [];
    var projMan500Questions = [];
    var other100Questions = [];
    var other200Questions = [];
    var other300Questions = [];
    var other400Questions = [];
    var other500Questions = [];
    var bestPrac100Questions = [];
    var bestPrac200Questions = [];
    var bestPrac300Questions = [];
    var bestPrac400Questions = [];
    var bestPrac500Questions = [];

    //Constructor function to build each question object for the tiles of the game board
    function QuizTile(answer, question, pointValue, category) {
      this.answer = answer,
      this.question = question,
      this.pointValue = pointValue,
      this.category = category
    }


    //This loops through the data gotten from the API call for each row in the sheet
    for (var i = 0; i < quiz_data.rows.length; i++) {

      //Declare variables for each element of the quiz tile
      var answer = quiz_data.rows[i].cells[0].value;
      var question = quiz_data.rows[i].cells[1].value;
      var points = quiz_data.rows[i].cells[2].value;
      var category = quiz_data.rows[i].cells[3].value;

      //Pass each of those into the constructor function to create a question object
      var tile = new QuizTile(answer, question, points, category);

      //Question object is then added to an array based on its category and point value
      //future-fix: It feels like there should be a better way to process all of this
      //and store the objects before creating the final game board
      if (tile.category == "Smartsheet Basics" && tile.pointValue == 100) {
        basic100Questions.push(tile);
      } else if (tile.category == "Smartsheet Basics" && tile.pointValue == 200) {
        basic200Questions.push(tile);
      } else if (tile.category == "Smartsheet Basics" && tile.pointValue == 300) {
        basic300Questions.push(tile);
      } else if (tile.category == "Smartsheet Basics" && tile.pointValue == 400) {
        basic400Questions.push(tile);
      } else if (tile.category == "Smartsheet Basics" && tile.pointValue == 500){
        basic500Questions.push(tile)
      } else if (tile.category == "Collaboration" && tile.pointValue == 100) {
        collab100Questions.push(tile);
      } else if (tile.category == "Collaboration" && tile.pointValue == 200) {
        collab200Questions.push(tile);
      } else if (tile.category == "Collaboration" && tile.pointValue == 300) {
        collab300Questions.push(tile);
      } else if (tile.category == "Collaboration" && tile.pointValue == 400) {
        collab400Questions.push(tile);
      } else if (tile.category == "Collaboration" && tile.pointValue == 500){
        collab500Questions.push(tile)
      } else if (tile.category == "Project Management" && tile.pointValue == 100) {
        projMan100Questions.push(tile);
      } else if (tile.category == "Project Management" && tile.pointValue == 200) {
        projMan200Questions.push(tile);
      } else if (tile.category == "Project Management" && tile.pointValue == 300) {
        projMan300Questions.push(tile);
      } else if (tile.category == "Project Management" && tile.pointValue == 400) {
        projMan400Questions.push(tile);
      } else if (tile.category == "Project Management" && tile.pointValue == 500){
        projMan500Questions.push(tile)
      } else if (tile.category == "Other Features" && tile.pointValue == 100) {
        other100Questions.push(tile);
      } else if (tile.category == "Other Features" && tile.pointValue == 200) {
        other200Questions.push(tile);
      } else if (tile.category == "Other Features" && tile.pointValue == 300) {
        other300Questions.push(tile);
      } else if (tile.category == "Other Features" && tile.pointValue == 400) {
        other400Questions.push(tile);
      } else if (tile.category == "Other Features" && tile.pointValue == 500){
        other500Questions.push(tile)
      } else if (tile.category == "Best Practices" && tile.pointValue == 100) {
        bestPrac100Questions.push(tile);
      } else if (tile.category == "Best Practices" && tile.pointValue == 200) {
        bestPrac200Questions.push(tile);
      } else if (tile.category == "Best Practices" && tile.pointValue == 300) {
        bestPrac300Questions.push(tile);
      } else if (tile.category == "Best Practices" && tile.pointValue == 400) {
        bestPrac400Questions.push(tile);
      } else if (tile.category == "Best Practices" && tile.pointValue == 500){
        bestPrac500Questions.push(tile)
      }

    };

    //Function I got from MDN to generate a random number from 0 and exlcudes the max number
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // After question objects are added to the corresponding array a random one is chosen from each to to create the final
    // gameboard

    //future-fix: Feels like this is another place where the processing can be more automatic rather than repeating
    //this line for each of the question tiles

    gameBoard.basic100 = basic100Questions[getRandomInt(0, basic100Questions.length)];
    gameBoard.basic200 = basic200Questions[getRandomInt(0, basic200Questions.length)];
    gameBoard.basic300 = basic300Questions[getRandomInt(0, basic300Questions.length)];
    gameBoard.basic400 = basic400Questions[getRandomInt(0, basic400Questions.length)];
    gameBoard.basic500 = basic500Questions[getRandomInt(0, basic500Questions.length)];

    gameBoard.collab100 = collab100Questions[getRandomInt(0, collab100Questions.length)];
    gameBoard.collab200 = collab200Questions[getRandomInt(0, collab200Questions.length)];
    gameBoard.collab300 = collab300Questions[getRandomInt(0, collab300Questions.length)];
    gameBoard.collab400 = collab400Questions[getRandomInt(0, collab400Questions.length)];
    gameBoard.collab500 = collab500Questions[getRandomInt(0, collab500Questions.length)];

    gameBoard.projMan100 = projMan100Questions[getRandomInt(0, projMan100Questions.length)];
    gameBoard.projMan200 = projMan200Questions[getRandomInt(0, projMan200Questions.length)];
    gameBoard.projMan300 = projMan300Questions[getRandomInt(0, projMan300Questions.length)];
    gameBoard.projMan400 = projMan400Questions[getRandomInt(0, projMan400Questions.length)];
    gameBoard.projMan500 = projMan500Questions[getRandomInt(0, projMan500Questions.length)];

    gameBoard.other100 = other100Questions[getRandomInt(0, other100Questions.length)];
    gameBoard.other200 = other200Questions[getRandomInt(0, other200Questions.length)];
    gameBoard.other300 = other300Questions[getRandomInt(0, other300Questions.length)];
    gameBoard.other400 = other400Questions[getRandomInt(0, other400Questions.length)];
    gameBoard.other500 = other500Questions[getRandomInt(0, other500Questions.length)];

    gameBoard.bestPrac100 = bestPrac100Questions[getRandomInt(0, bestPrac100Questions.length)];
    gameBoard.bestPrac200 = bestPrac200Questions[getRandomInt(0, bestPrac200Questions.length)];
    gameBoard.bestPrac300 = bestPrac300Questions[getRandomInt(0, bestPrac300Questions.length)];
    gameBoard.bestPrac400 = bestPrac400Questions[getRandomInt(0, bestPrac400Questions.length)];
    gameBoard.bestPrac500 = bestPrac500Questions[getRandomInt(0, bestPrac500Questions.length)];

    //Send final results to the page
    res.send(gameBoard);
  });

});


module.exports = router;
