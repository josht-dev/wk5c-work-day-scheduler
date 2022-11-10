// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Store the current hour
  let currentHour = dayjs().format('HH');

  // Add event listener to the save buttons after html load
  $(".saveBtn").on("click", function() {
    localStorage.setItem($(this).parent().attr("id"), $(this).prev().val());
  });

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

  // Retrieve any local user data and populate schedule
  for (let i = 0; i < localStorage.length; i++) {
    // Use localStorage key to place data in html div id's
    $("#" + localStorage.key(i)).children("textarea").val(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  // Add the current date/time to the HTML
  $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
});
