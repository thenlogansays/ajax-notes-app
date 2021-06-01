const url = 'http://localhost:3000/notes'
const form = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')



//create event listener for a submit event that will render newly created note on the DOM
form.addEventListener('submit', function(event) {
    event.preventDefault()
    const noteText = document.getElementById('note-text').value
    createNote(noteText)
});


//removing a list item from the DOM
noteList.addEventListener('click', function(event) {
    if (event.target.contains('delete')) {
        deleteNote(event.target)
    }
});


//list notes -- GET
function listNotes() {
    fetch(url)
    .then(function (response) {
    response.json
})
    .then(function (data) {
    for (let note of data) {
        console.log(note)
        renderNoteItem(note)
    }
});


//create note --- POST
function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(data => renderNoteItem(data))
    
};


//delete note
function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" + '${noteId}', {
        method: 'DELETE'
    })
    .then( function () {
        element.parentElement.remove()
    })
};


function renderNoteItem(noteObj) {
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add(
    'lh-copy',
    'pv3',
    'ba',
    'bl-0',
    'bt-0',
    'br-0',
    'b--dotted',
    'b--black-3')
    
    renderNoteText(itemEl, noteObj)
    console.log(itemEl)
    noteList.appendChild(itemEl)
}


function renderNoteText(noteListItem, noteObj) {
    noteListItem.innerHTML = `<span class="dib w-60">${noteObj.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
};

listNotes();