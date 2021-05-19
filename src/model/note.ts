import { MessageType } from '~/type/flash';
import { showFlash } from '~/store/flash';
import type {
	Note,
	NoteCreateResponse,
	NoteDeleteResponse,
	NoteGetResponse,
	NoteUpdate,
	NoteUpdateResponse,
} from '~/type/note';
import type { ErrorResponse } from '~/type/error';

export const loadNotes = async (): Promise<Note[]> => {
	let notes = [] as Note[];
	try {
		const response = await fetch('/api/v1/note', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const raw = (await response.json()) as NoteGetResponse;

		if (response.status === 200) {
			notes = raw.notes;
		} else {
			showFlash('Could not load notes.', MessageType.warning);
		}
	} catch (err) {
		if (err instanceof Error) {
			showFlash(err.message, MessageType.warning);
		} else if (err instanceof XMLHttpRequest) {
			showFlash((err.response as ErrorResponse).message, MessageType.warning);
		} else {
			showFlash(err, MessageType.warning);
		}

		throw err;
	}

	return notes;
};

export const postNote = async (n: Note): Promise<void> => {
	try {
		const response = await fetch('/api/v1/note', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(n),
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const raw = (await response.json()) as NoteCreateResponse;

		if (response.status === 201) {
			showFlash('Note created.', MessageType.success);
		} else {
			showFlash('Could not update note: ' + raw.message, MessageType.warning);
		}
	} catch (err) {
		if (err instanceof Error) {
			showFlash(err.message, MessageType.warning);
		} else if (err instanceof XMLHttpRequest) {
			showFlash((err.response as ErrorResponse).message, MessageType.warning);
		}

		throw err;
	}
};

export const updateNote = function (id: string, text: string): void {
	fetch('/api/v1/note/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ message: text } as NoteUpdate),
	})
		.then((response) => {
			if (response.status !== 200) {
				void response.json().then(function (data: NoteUpdateResponse) {
					showFlash(`Could not update note: ${data.message}`, MessageType.warning);
				});
			}
		})
		.catch((err) => {
			console.log('Error needs to be handled!', err);
		});
};

export const deleteNote = function (id: string, removeNote: (e: string) => void): void {
	fetch('/api/v1/note/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.status === 200) {
				void response.json().then(() => {
					showFlash('Note deleted.', MessageType.success);

					removeNote(id);
				});
			} else {
				void response.json().then((data: NoteDeleteResponse) => {
					showFlash(`Could not delete note: ${data.message}`, MessageType.warning);
				});
			}
		})
		.catch((err) => {
			console.log('Error needs to be handled!', err);
		});
};
