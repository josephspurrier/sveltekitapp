import type { Handle } from '@sveltejs/kit';
import {
	getClientSessionOnServer,
	getServerSession,
	serializeClientDeleteCookie,
	serializeServerDeleteCookie,
} from '~/store/session';
import type { Headers } from '@sveltejs/kit/types/helper';
import { isAllowedAnonymous, isDeniedAuthenticated } from '~/route/_acl';
import { isLoggedIn } from '~/store/session';

// handle is called on the server on every request.
export const handle: Handle = async ({ request, render }) => {
	// If the ?_method=get query string is passed in, change the request method.
	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		const m = request.query.get('_method');
		if (m) {
			request.method = m.toUpperCase();
		}
	}

	const serverAuth = getServerSession(request.headers.cookie);
	const clientAuth = getClientSessionOnServer(request.headers.cookie);

	// If not authenticated, then return 401 or a redirect.
	if (serverAuth.accessToken.length === 0 || !clientAuth.loggedIn) {
		// Set the server as not logged in.
		isLoggedIn.set(false);

		// Check for allowed routes.
		if (!isAllowedAnonymous(request.method, request.path)) {
			if (request.path.startsWith('/api/')) {
				// Send unauthorized for the API.
				return {
					status: 401,
					body: JSON.stringify({ message: 'unauthorized' }),
					headers: ({
						'Content-Type': 'application/json',
						'Set-Cookie': [serializeServerDeleteCookie(), serializeClientDeleteCookie()],
					} as unknown) as Headers, // FIXME: When Typescript 4.3 comes out, unknown can be removed.
				};
			} else {
				// Send redirect for the pages.
				return {
					status: 302,
					body: `<script>window.location.replace("/login");</script>`,
					headers: ({
						'Set-Cookie': [serializeServerDeleteCookie(), serializeClientDeleteCookie()],
					} as unknown) as Headers, // FIXME: When Typescript 4.3 comes out, unknown can be removed.
				};
			}
		}
	} else {
		// If not allowed to access a page while authenticated, then return 401
		// or rediret.
		if (isDeniedAuthenticated(request.method, request.path)) {
			if (request.path.startsWith('/api/')) {
				// Send unauthorized for the API.
				return {
					status: 401,
					body: JSON.stringify({ message: 'unauthorized' }),
					headers: {
						'Content-Type': 'application/json',
					} as Headers,
				};
			} else {
				// Send redirect for the rest of the page.
				return {
					status: 302,
					body: '<script>window.location.replace("/");</script>',
				};
			}
		}
	}

	// Render the request.
	const response = await render(request);

	// If the client side token does not exist, then delete the server side token.
	// This occurs when the client side token is deleted, and then a user tries
	// to access a page that doesn't require authentication since it's not
	// handled by the redirects above.
	if (!clientAuth.loggedIn && serverAuth.accessToken.length > 0) {
		if (response && response.headers) {
			response.headers['set-cookie'] = serializeServerDeleteCookie();
		}
	}

	return response;
};
