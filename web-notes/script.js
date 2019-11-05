'use strict';

const HTTP_REQUEST_STATE_DONE = 4;

const HTTP_STATUS_OK = 200;

var noteTitle = document.querySelector('#noteTitle');
var noteText = document.querySelector('#noteText');

function postNote() {
  if (noteTitle.value.length > 256) {
    window.alert("Title too long.");
    return;
  }
  if (noteTitle.value.length == 0) {
    window.alert("The title cannot empty.");
    return;
  }
  if (noteText.value.length > 1024) {
    window.alert("Text too long.");
    return;
  }
  restPostNote(noteTitle.value, noteText.value, function() {
    noteTitle.value = "";
    noteText.value = "";
    updateTitleHint();
    updateTextHint();
    getNotes();
  });
}

function getNotes() {
  restGetNotes(function(data) {
    var notesListHtml = "";
    for (var field in data) {
      notesListHtml +=
      `<div class="notesTableBorder">
  			<table id="notesTable" class="noteBox">
  				<thead class="noteBox">
  					<tr>
              <th>${field}</th>
  					<tr>
  				</thead>
  				<tbody><tr>
            <td><p class="noteText">${data[field]}</p></td>
          </tr></tbody>
  			</table>
			</div>`;
    }
    document.querySelector('#notesList').innerHTML = notesListHtml;
  });
}

function updateTitleHint() {
  var titleHint = document.querySelector('#titleHint');
  titleHint.innerHTML = noteTitle.value.length + "/256 characters" +
    (noteTitle.value.length > 256 ? " - Too long!" : "");
}

function updateTextHint() {
  var textHint = document.querySelector('#textHint');
  textHint.innerHTML = noteText.value.length + "/1024 characters" +
    (noteText.value.length > 1024 ? " - Too long!" : "");
}
