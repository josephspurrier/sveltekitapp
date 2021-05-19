import type { RequestHandler, Response } from '@sveltejs/kit';
import type { Headers } from '@sveltejs/kit/types/helper';
import type { Note, NoteCreateResponse, NoteGetResponse, NoteCreate } from '~/type/note';
import { createNote, loadNotes } from '~/route/api/v1/note/_notefs';
import { getServerSession } from '~/store/session';

// Create a note in storage.
export const post: RequestHandler<unknown, NoteCreate> = async (request) => {
	return await new Promise<Response>((resolve) => {
		// Message validation.
		if (request.body.message.length === 0) {
			resolve({
				status: 401,
				body: {
					message: 'invalid body',
				} as NoteCreateResponse,
				headers: {} as Headers,
			});
			return;
		}

		const auth = getServerSession(request.headers.cookie);
		createNote(auth.email, request.body.message);

		resolve({
			status: 201,
			body: {} as NoteCreateResponse,
			headers: {} as Headers,
		});
	});
};

// Get all notes from storage.
const handler: RequestHandler<unknown, Note> = async (request) => {
	return await new Promise<Response>((resolve) => {
		// Return 200 for HEAD.
		if (request.method === 'HEAD') {
			resolve({
				status: 200,
				body: {} as NoteGetResponse,
				headers: {} as Headers,
			});
			return;
		}

		const auth = getServerSession(request.headers.cookie);

		resolve({
			status: 200,
			body: {
				notes: loadNotes(auth.email),
			} as NoteGetResponse,
		});
	});
};

export const head = handler;
export const get = handler;
