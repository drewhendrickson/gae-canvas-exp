/*global $, document, console */

// the number of responses so far in this block
var responseCount = 0;

// the total number of trials each subject should do
var totalTrials = 5;

// the majority color for each trial
// It will be set in the function startTrial
var majorityColor;

startTrial();

function startTrial () {
  /*
  * This function is called to build a new stimulus and
  * display the buttons to allow the subject to respond.
  */
  
  // draw a new stimulus
  majorityColor = drawRedBluePattern();
  
  // show the buttons
  $('#buttons').show();

}

function recordResponse(color) {
  /*
  * This function is called when the subject has selected a response
  * by pressing a button.
  *
  * color: The color the subject selected
  *
  * This function hides the buttons to prevent additional clicks and
  * builds an object containing all of the details
  * about the current trial then writes that object to the database.
  * Then it determines if another trial should be run.
  */
  
  // hide the buttons
  $('#buttons').hide();

  // increase the count of responses
  responseCount++;
  
  // build up a dictionary object containing
  // all of the details about the current trial
  var trialData = {
    currentTrial  : responseCount,
    response      : color,
    correctAnswer : majorityColor
  };
  
  // print the trial data to the console for debugging
  console.log(trialData);

  // write the trial data to the database
  saveData(trialData);
  
  // determine if another trial should be done
  if (responseCount < totalTrials)
    startTrial();
  else
    finishExperiment();
}


function drawRedBluePattern() {
  /*
  * This function draws a series of pixels onto the HTML canvas.
  * The color drawn in each pixel is randomly determined but 
  * for each trial there is a bias to either draw more red or blue pixels.
  * The majority color is randomly determined for each trial.
  */
  
  // the size of each block of color
  var pixelSize = 10;
  
  // indicates which color is in the majority
  var majority = "red";
  var cutoff = 0.53;

  // randomly decide which color is in the majority for this trial
  if (Math.random() < 0.5) {
    cutoff = 1 - cutoff;
    majority = "blue";
  }
  
  // get the canvas and context objects so we can draw on them
  var canvas = document.getElementById("stimulus");
  var context = canvas.getContext('2d');

  // for each 'pixel' in the canvas
  for (var i = 0; i < canvas.width; i+= pixelSize) {
    for (var j = 0; j < canvas.height; j+= pixelSize) {
      
      // determine what color to use in this pixel
      if (Math.random() < cutoff) {
        context.fillStyle = 'red';
      } else {
        context.fillStyle = 'blue';
      }
      
      // fill in the pixel with that color
      context.fillRect(i, j, pixelSize, pixelSize);
    }
  }
  
  // return which color is in the majority
  return(majority);
}

function finishExperiment() {
  /*
  * function called when the subject clicks Done
  *
  * This function reads the responses the subject gives
  * and passes those responses to the function saveData
  * 
  * This function then hides the experiment and displays a "Thank you" message
  */
  
  var responses = $('form').serializeArray();
  saveData(responses);
  
  $('#experiment').hide();
  $('#message').text("Thank you for completing the experiment!");
}

function saveData(data) {
  /*
  * write a new row to the database
  *
  * data: a dictionary composed of key, value pairs
  *       containing all the info to write to the database
  *
  * an anonymous function is used because it creates a
  * copy of all information in the data variable, 
  * thus if any other functions change the data object after this function executes
  * then the information written to the database does not change.
  */

  (function (d) {
    $.post('submit',  {"content": JSON.stringify(d)});
  })(data);
}

