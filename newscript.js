//set global variables
const url = 'http://localhost:3000/notes/'
const form = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')

form.addEventListener('submit',  function (event) {
    event.preventDefault()
    const noteText = document.getElementById('note-text').nodeValue
    createNote(noteText)
});

noteList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
})




function listNotes() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for (let note of data) {
            console.log(note)
            renderNoteItem(note)
        }
    })
};

function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'applications/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => renderNoteItem(data))
};

function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" +`${noteId}`, {
        method: 'DELETE'})
    .then(() => element.parentElement.remove())
};

function EditNote(element) {
    const noteId = element.parentElement.noteId
    const updatedNoteText = document.querySelector()
    fetch(url + "/" + `${noteId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'applications/json'},
        body: JSON.stringify({
            title: updatedNoteText,
            body: updatedNoteText,
            create_at: moment().format()
        })
    })
    .then(response => response.JSON)
    .then((data) => console.log(data))
    location.reload()
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
};

function renderNoteText(noteListItem, noteObj) {
    noteListItem.innerHTML = `<span class="dib w-60">${noteObj.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
};

listNotes();

//