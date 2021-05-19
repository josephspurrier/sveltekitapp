// Routes that are allowed without authentication.
const allowAnonAccess = [
	'GET /', // Access managed by the $layout.svelte and the index.svelte pages.
	'GET /logout',
	'POST /api/v1/auth/logout',
	'GET /login',
	'POST /api/v1/auth/login',
	'GET /register',
	'POST /api/v1/auth/register',
	'GET /about',
];

// Routes that are not allowed with authentication.
const disallowAuthAccess = ['GET /login', 'GET /register'];

// Determines if path is in the list.
const inList = (method: string, path: string, arr: string[]): boolean => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == '*' || arr[i] == `${method} ${path}`) {
			return true;
		}
	}

	return false;
};

// Returns true if the route is allowed as a non-logged in user.
export const isAllowedAnonymous = (method: string, path: string): boolean => {
	return inList(method, path, allowAnonAccess);
};

// Returns true if the route is note allowed as a logged in user.
export const isDeniedAuthenticated = (method: string, path: string): boolean => {
	return inList(method, path, disallowAuthAccess);
};
