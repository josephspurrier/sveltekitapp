import type { RequestHandler, Response } from '@sveltejs/kit';
import type { UserLogin, UserLoginResponse } from '~/type/user';
import type { Headers } from '@sveltejs/kit/types/helper';
import { serializeServerCookie } from '~/store/session';
import { v4 as uuid } from '@lukeed/uuid';
import { passwordMatch } from '~/route/api/v1/auth/_user';

export const post: RequestHandler<unknown, UserLogin> = async (request) => {
	return await new Promise<Response>((resolve) => {
		// Determine if the user exists.
		if (passwordMatch(request.body.email, request.body.password)) {
			resolve({
				status: 200,
				body: {
					status: true, // Let the client know the request was successful.
				} as UserLoginResponse,
				headers: {
					// Set the HTTP only (server side only) cookie.
					'Set-Cookie': serializeServerCookie({
						accessToken: uuid(),
						email: request.body.email,
					}),
				} as Headers,
			});
			return;
		}

		resolve({
			status: 401, // Unauthorized
			body: {
				status: false,
			} as UserLoginResponse,
			headers: {} as Headers,
		});
	});
};
