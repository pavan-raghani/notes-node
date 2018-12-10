console.log("Starting notes.js");
//console.log(module);
//console.log(process);

const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }
    catch (e) {
        return [];
    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {

    var notes = fetchNotes();
    var note = {
        title, body
    };
    var dupNotes = notes.filter(note => note.title === title);

    if(dupNotes.length === 0)
    { 
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    console.log("Getting all Notes");
}

var remove = (title) => {
    //Fetch Notes Array
    var notes = fetchNotes();
    //Filter notes array to remove the one having title supplied
    var filteredNotes = notes.filter(note => note.title !== title);
    //Save the notes array
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

var getNote = (title) => {

    //Fetch Notes Array
    var notes = fetchNotes();
    //Filter notes array to remove the one having title supplied
    var filteredNotes = notes.filter(note => note.title === title);
    //return the fetcehed note
    return filteredNotes[0];

}

var logNote = (note) => {
    debugger;
    console.log("--");
    console.log("Title : "+`${note.title}`);
    console.log("Body : "+`${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    remove,
    logNote
};