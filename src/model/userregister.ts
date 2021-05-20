import { start, finish, text } from '~/lib/submit';
import { MessageType } from '~/type/flash';
import { showFlash } from '~/store/flash';
import type { UserRegister, UserRegisterResponse } from '~/type/user';
import type { ErrorResponse } from '~/type/error';

export const userRegister = async (body: UserRegister): Promise<Response> => {
	return await fetch('/api/v1/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
};

export const submitText = (s: string): string => {
	return text(s);
};

export const submit = async (e: Event, u: UserRegister): Promise<void> => {
	start(e);

	try {
		const response = await userRegister(u);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = (await response.json()) as UserRegisterResponse;
		finish();

		if (data) {
			showFlash('User registered.', MessageType.success);
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
