import type { RequestHandler, Response } from '@sveltejs/kit';
import type { UserLogoutResponse } from '~/type/user';
import type { Headers } from '@sveltejs/kit/types/helper';
import { serializeServerDeleteCookie } from '~/store/session';

const handler: RequestHandler<unknown, unknown> = async (request) => {
	return await new Promise<Response>((resolve) => {
		// Return 200 for HEAD.
		if (request.method === 'HEAD') {
			resolve({
				status: 200,
				body: {} as UserLogoutResponse,
				headers: {} as Headers,
			});
			return;
		}

		resolve({
			status: 200,
			body: {
				status: true, // Let the client know the request was successful.
			} as UserLogoutResponse,
			headers: {
				// Set the HTTP only (server side only) cookie.
				'Set-Cookie': serializeServerDeleteCookie(),
			} as Headers,
		});
	});
};

export const head = handler;
export const post = handler;
