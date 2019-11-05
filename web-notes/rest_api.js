/*
 * This is a MOCK IMPLEMENTATION of the REST API functions. We use this mock
 * only during development so we do not need to have the backend ready when
 * developing the front end.
 *
 * In production, we use the rest_api_prod.js script instead. The switch to the
 * production script is done during packaging, which is done by Docker.
 *
 * Tags: NOT_FOR_PRODUCTION
 */

/*
 * Adding fictitious data to help us work on the HTML and CSS style without
 * having to manually add data in order to see the layout.
 */
var in_memory_data = {
  "Simple note": "This is a simple and short note.",
  "Another note": "This is the text of the other note.",
  "Multi line note": `This is the text of the first line.
  This is another line.

  And this is a 4th note.`,
  "Long note": "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
               + "This is a very long note. This is a very long note. "
}

function restPostNote(title, text, callback) {
  in_memory_data[title] = text;
  callback();
}

function restGetNotes(callback) {
  callback(in_memory_data);
}
