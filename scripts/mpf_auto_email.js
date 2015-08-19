// Script to send automatic confirmation email for Music Preferences Form
// Instructions:
// 1. On Edit Form Page, go to Tools -> Script Editor
// 2. Copy and paste this file into Code.gs
// 3. Save Code.gs
// 4. Go to Resources -> Current Project's Triggers
// 5. Add a trigger and select "onFormSubmit", "From form", "On form submit"
// 6. Save trigger
// 7. Test out the form with your own email. Go to View -> Execution Transcript
//    to view any errors.
// Google Scripts API Reference: https://developers.google.com/apps-script/reference
function onFormSubmit(e) {
  var formResponse = e.response;

  // Link for users to edit responses
  var editUrl = formResponse.getEditResponseUrl();

  // Get all item responses in same order as the items in the form
  var itemResponses = formResponse.getItemResponses();

  // Get the response string
  var firstName = itemResponses[0].getResponse();
  var email = itemResponses[3].getResponse();

  Logger.log("Recipient: ", email);

  var senderName = "EChO Officer Team";

  var subject = "[EChO] Music Preferences Form Submission Confirmation";

  // HTML message body
  var message = "Dear " + firstName + ",<br><br>Welcome to EChO! Thank you for submitting your Membership Application for "
      + "Engineering Chamber Orchestra for Fall 2015. To be considered for full membership, "
      + "make sure you have paid your dues and auditioned (new members only, sign-up at http://bit.ly/1TTOmoM) by the Friday, September "
      + "4th, 5:00 PM deadline."
      + "<br><br>If you would like to "
      + "edit your response, please use the link <a href='" + editUrl + "'>here</a>. "
      + "Feel free to email echo.president@gmail.com if you have any questions!"
      + "<br><br>Thank you!<br><br>EChO Officer Team";

  // Text body
  var textbody = message.replace("<br>", "\n");

  Logger.log("Message:" + message);

  // sendEmail(recipient, subject, body, options)
  GmailApp.sendEmail(email, subject, textbody, {
      name: senderName,
      htmlBody: message
  });
}
