//console.log("Starting app...");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
var titleObj = {
    describe:"Title of a Note",
    demand: true,
    alias:'t'
};
var bodyObj = {
    describe:"Title of a Note",
    demand: true,
    alias:'t'
};

const argv = yargs
            .command('add', 'To Add a new Note',{
            title:titleObj,
            body:bodyObj
            })
            .command('list','List all Notes')
            .command('read', 'Read a particular Note',{
                title:titleObj
            })
            .command('remove', 'Remove a particular note',{
                title:titleObj
            })
            .help()
            .argv;

//console.log("argv", argv);

var command = argv._[0];
console.log("Command : " + command);

if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));

} else if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (_.isUndefined(note)) {
        console.log("Note With title ", argv.title, " already exist, Please Enter a note with another Title");
    }
    else {
        console.log("Note Added");
        notes.logNote(note);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note)
    {
        console.log("Note found");
        notes.logNote(note);
    }
    else{
        console.log("Note Doesnt Exist!!");
    }
} else {
    console.log("command not recognized");
}
