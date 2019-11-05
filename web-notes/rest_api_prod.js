/*
 * Production implementation of functions to interface with the REST API.
 */

/*
 * Posts a note on the server and calls a callback when the operation is done.
 */
function restPostNote(title, text, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', "/note/" + title, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == HTTP_REQUEST_STATE_DONE
        && this.status == HTTP_STATUS_OK) {
      callback();
    }
  };
  xhttp.send(JSON.stringify({ text: text }));
}

/*
 * Retrieves a list of notes from the server and calls a callback when the
 * operation is done. This function passes the list of notes in the callback
 * invocation.
 */
function restGetNotes(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', "/notes", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == HTTP_REQUEST_STATE_DONE
        && this.status == HTTP_STATUS_OK) {
      callback(JSON.parse(this.responseText));
    }
  };
  xhttp.send();
}
