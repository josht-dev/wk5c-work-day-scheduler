$(function () {
  // Store the current hour
  let currentHour = dayjs().format('HH');
  // Set the business hours styles depending on the hour
  const htmlHourDivs = $(".time-block");

  // Add event listener to the save buttons after html load
  $(".saveBtn").on("click", function() {
    localStorage.setItem($(this).parent().attr("id"), $(this).prev().val());
  });

  // Add the past, present, and future classes to the html divs
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
    $("#" + localStorage.key(i)).children("textarea").val(localStorage.getItem(localStorage.key(i)));
  }

  // Add the current date/time to the HTML
  $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
});
