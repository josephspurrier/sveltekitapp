import type { RequestHandler, Response } from '@sveltejs/kit';
import type { UserLogoutResponse, UserRegister, UserRegisterResponse } from '~/type/user';
import type { Headers } from '@sveltejs/kit/types/helper';
import { createUser, getUser } from '~/route/api/v1/auth/_user';
import { v4 as uuid } from '@lukeed/uuid';

export const post: RequestHandler<unknown, UserRegister> = async (request) => {
	return await new Promise<Response>((resolve) => {
		// Determine if the user already exists.
		if (getUser(request.body.email)) {
			resolve({
				status: 401, // Unauthorized
				body: {
					status: false,
				} as UserLogoutResponse,
				headers: {} as Headers,
			});
			return;
		}

		// Register the user.
		createUser({
			id: uuid(),
			email: request.body.email,
			first_name: request.body.first_name,
			last_name: request.body.last_name,
			password: request.body.password,
		});

		resolve({
			status: 200,
			body: {} as UserRegisterResponse,
			headers: {} as Headers,
		});
	});
};
