import type { RequestHandler, Response } from '@sveltejs/kit';
import type { Headers } from '@sveltejs/kit/types/helper';
import type { NoteUpdate } from '~/type/note';
import { deleteNote, updateNote } from '~/route/api/v1/note/_notefs';
import { getServerSession } from '~/store/session';

// Update a note in storage.
export const put: RequestHandler<unknown, NoteUpdate> = async (request) => {
	return await new Promise<Response>((resolve) => {
		const auth = getServerSession(request.headers.cookie);
		updateNote(auth.email, request.params.slug, request.body.message);

		resolve({
			status: 200,
			body: {},
			headers: {} as Headers,
		});
	});
};

// Delete a note from storage.
export const del: RequestHandler = async (request) => {
	return await new Promise<Response>((resolve) => {
		const auth = getServerSession(request.headers.cookie);
		deleteNote(auth.email, request.params.slug);

		resolve({
			status: 200,
			body: {},
			headers: {} as Headers,
		});
	});
};
