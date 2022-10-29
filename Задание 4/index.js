const noteListDiv = document.querySelector('.note__list');
let noteID = 1;
function eventListener(){
    document.addEventListener('DOMContentLoaded', displayNotes);
    document.getElementById('note__add-btn').addEventListener("click", addNewNote);
    noteListDiv.addEventListener('click', deleteNote);
    document.getElementById('delete-all').addEventListener('click', deleteAllNotes);
}
eventListener();

function getDataFromStorage(){
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
}

function addNewNote(){
    const noteTitle = document.getElementById('note__title');
    const noteContent = document.getElementById('note__content');
    if(validateInput(noteTitle, noteContent)){
        let notes = getDataFromStorage();
        let noteItem = {
            noteID: noteID,
            title: noteTitle.value,
            content: noteContent.value
        };
        noteID++;
        notes.push(noteItem);
        createNote(noteItem);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteTitle.value = "";
        noteContent.value = "";
    }
}
function validateInput(title, content){
    if(title.value !== "" && content.value !==""){
        return true;
    } else {
        if(title.value === ""){
            title.classList.add('warning');
        }
        if(content.value === ""){
            content.classList.add('warning');
        }
    }
    setTimeout(() => {
        title.classList.remove('warning');
        content.classList.remove('warning');
    }, 1500);
}

function createNote(item){
    const div = document.createElement('div');
    div.classList.add('note__item');
    div.setAttribute('data-id', item.id);
    div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <button type = "button" class = "btn note__delete-btn">
        Удалить
        </button>
    `;
    noteListDiv.appendChild(div);
}

function displayNotes(){
    let notes = getDataFromStorage();
    if(notes.length >0){
        noteID = notes[notes.length - 1].id;
        noteID++;
    }else {
        noteID = 1;
    }
    notes.forEach(item => {
        createNote(item);
    })
}

function deleteNote(elem){
    if(elem.target.classList.contains('note__delete-btn')){
        elem.target.parentElement.remove();
        let divID = elem.target.parentElement.dataset.id;
        let notes = getDataFromStorage();
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        })
        localStorage.setItem('notes', JSON.stringify(newNotesList));
    }
}

function deleteAllNotes(){
    localStorage.removeItem('notes');
    let noteList = document.querySelectorAll('.note__item');
    if (noteList.length > 0){
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        })
    }
    noteID = 1;
}