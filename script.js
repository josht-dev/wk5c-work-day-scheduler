/*
***User Story***
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively

***Acceptance Criteria***
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
  DONE - THEN the current day is displayed at the top of the calendar
WHEN I scroll down
  DONE - THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
  DONE - THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
  DONE - THEN I can enter an event
WHEN I click the save button for that time block
  DONE - THEN the text for that event is saved in local storage
WHEN I refresh the page
  DONE - THEN the saved events persist
*/

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Object to store user data
  //const scheduleData = {};
  // Store the current hour
  let currentHour = dayjs().format('HH');

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Add event listener to the save buttons after html load
  $(".saveBtn").on("click", function() {
    //scheduleData[$(this).parent().attr("id")] = $(this).prev().val();
    localStorage.setItem($(this).parent().attr("id"), $(this).prev().val());
    //console.log(JSON.parse(localStorage.getItem($(this).parent().attr("id"))));
  });




  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Set the business hours styles depending on the hour
  const htmlHourDivs = $(".time-block");
  for (let i = 0; i < htmlHourDivs.length; i++) {
    // Get the current html hour div
    let divId = htmlHourDivs[i].id;
    // Pull the hour from the div id
    let divHour = divId[5] + divId[6];
    // Compare the div hour to the current hour and add appropriate class
    if (divHour < currentHour) {
      $("#" + divId).addClass("past");
    } else if (divHour == currentHour) {
      $("#" + divId).addClass("present");
    } else {
      $("#" + divId).addClass("future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Retrieve any local user data and populate schedule
  for (let i = 0; i < localStorage.length; i++) {
    // Use localStorage key to place data in html div id's
    $("#" + localStorage.key(i)).children("textarea").val(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  // Add the current date/time to the HTML
  $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
});
