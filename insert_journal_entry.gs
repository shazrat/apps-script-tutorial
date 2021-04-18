function onOpen(e) {
  /*
  When the document is loaded, add a new topbar menu item called Shiraz.
  In the menu, add a button called 'Insert Journal Template' which calls
  the function insertJournalTemplate
  */
  
  DocumentApp.getUi().createMenu('Shiraz')
  .addItem('Insert Journal Template', 'insertJournalTemplate')
  .addToUi();
}

function insertJournalTemplate() {
  /* 
    1. Get the current position of the cursor by a roundabout way
    2. Get the current date and format it to 'Day Month/Date/Year'
    3. Insert the date and format it with Heading 2
    4. Insert text for listing tasks and format with Heading 3
    5. Insert a horizontal line
  */
  
  var body = DocumentApp.getActiveDocument().getBody();
  var cursor = DocumentApp.getActiveDocument().getCursor();
  if (cursor) {
    var element = cursor.getElement();
    while (element.getParent().getType() != DocumentApp.ElementType.BODY_SECTION) {
      element = element.getParent();
    }
    var index = body.getChildIndex(element);
  }
  else {
    DocumentApp.getUi().alert("Could not find current position");
    return;
  }
  
  var date = Utilities.formatDate(new Date(), "GMT-7", "EEEE MM/dd/yyyy h:mm a");
  body.insertParagraph(index, date).setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.insertParagraph(index + 1, 'Mood: ').setHeading(DocumentApp.ParagraphHeading.HEADING3);
  // var line = body.insertHorizontalRule(index + 5);    

  var affirmation = getAffirmation(body, index);

  body.insertParagraph(index + 2, affirmation).setHeading(DocumentApp.ParagraphHeading.HEADING4);

}

function getAffirmation() {
	const url = "https://www.affirmations.dev";
	const response = UrlFetchApp.fetch(url, {
		"method": "GET"
		// "headers": {
		// 	"Accept": "application/json"
		// }
	});

  Logger.log(response)
  Logger.log(JSON.parse(response).affirmation)
  return JSON.parse(response).affirmation;
	
}
