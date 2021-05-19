import fs from 'fs';
import { v4 as uuid } from '@lukeed/uuid';
import type { Note } from '~/type/note';

export const loadNotes = (username: string): Note[] => {
	let notes = [] as Note[];
	try {
		// Load the notes from the local storage file.
		const data = fs.readFileSync(`storage/${username}.json`, 'utf8');
		notes = JSON.parse(data) as Note[];
	} catch (err) {
		console.log('error reading notes:', err);
		notes = [];
	}

	return notes;
};

export const saveNotes = (username: string, notes: Note[]): void => {
	try {
		fs.writeFileSync(`storage/${username}.json`, JSON.stringify(notes), 'utf8');
	} catch (err) {
		console.log('error saving notes:', err);
	}
};

export const createNote = (username: string, noteMessage: string): void => {
	const notes = loadNotes(username);

	// Add the new note to the array.
	notes.push({ id: uuid(), message: noteMessage });

	saveNotes(username, notes);
};

export const deleteNote = (username: string, noteID: string): void => {
	let notes = loadNotes(username);

	// Remove the matching note ID.
	notes = notes.filter((n) => n.id !== noteID);

	saveNotes(username, notes);
};

export const updateNote = (username: string, noteID: string, noteMessage: string): void => {
	const notes = loadNotes(username);

	// Update the message for the matching note by ID.
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].id === noteID) {
			notes[i].message = noteMessage;
			break;
		}
	}

	saveNotes(username, notes);
};
