import { start, finish, text } from '$lib/submit';
import { MessageType } from '~/type/flash';
import { showFlash } from '~/store/flash';
import type { UserLogin, UserLoginResponse } from '~/type/user';
import type { AuthClientSession } from '~/type/authsession';
import { saveClientSession } from '~/store/session';
import type { ErrorResponse } from '~/type/error';

export const login = async (body: UserLogin): Promise<Response> => {
	return await fetch('/api/v1/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
};

export const submitText = (s: string): string => {
	return text(s);
};

export const submit = async (e: Event, u: UserLogin): Promise<void> => {
	start(e);

	try {
		const response = await login(u);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = (await response.json()) as UserLoginResponse;
		finish();

		if (data) {
			const auth: AuthClientSession = {
				loggedIn: true,
			};

			saveClientSession(auth);

			showFlash('Login successful.', MessageType.success);
		} else {
			showFlash('Data returned is not valid.', MessageType.failed);
		}
	} catch (err) {
		finish();

		if (err instanceof Error) {
			showFlash(err.message, MessageType.warning);
		} else if (err instanceof XMLHttpRequest) {
			showFlash((err.response as ErrorResponse).message, MessageType.warning);
		}

		throw err;
	}
};
