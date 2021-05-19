import cookie, { CookieSerializeOptions } from 'cookie';
import Cookie from 'js-cookie';
import { writable } from 'svelte/store';
import type { AuthClientSession, AuthServerSession } from '~/type/authsession';
import { decrypt, encrypt } from 'salteen';
import { browser } from '$app/env';

const clientCookieName = 'auth_client';
const serverCookieName = 'auth_server';

// Return encryption key otherwise return an empty string to disable encryption.
const secretKey = (): string => {
	// Environment variables for Vite: https://kit.svelte.dev/faq
	const secret = import.meta.env.VITE_SESSION_SECRET;
	if (typeof secret === 'string') {
		return secret.length >= 32 ? secret : '';
	}

	return '';
};

const encode = (data: string): string => {
	if (browser) {
		return data;
	}

	const secret = secretKey();
	if (secret) {
		const encoder = encrypt(secret);
		const enc = encoder(data);
		return !enc ? '{}' : enc;
	}

	return data;
};

const decode = (data: string): string => {
	if (browser) {
		return data;
	}

	const secret = secretKey();
	if (secret) {
		const decoder = decrypt(secret);
		const dec = decoder(data);
		return !dec ? '{}' : dec;
	}

	return data;
};

export const saveClientSession = (auth: AuthClientSession): void => {
	Cookie.set(clientCookieName, encode(JSON.stringify(auth)), {
		path: '/',
		//expires: 60 * 60 * 24 * 7 // 1 week,
	});
	isLoggedIn.set(true);
};

export const serializeServerCookie = (auth: AuthServerSession): string => {
	return cookie.serialize(serverCookieName, encode(JSON.stringify(auth)), {
		path: '/',
		httpOnly: true, // Only accessible via server side.
		//maxAge: 60 * 60 * 24 * 7 // 1 week,
	} as CookieSerializeOptions);
};

export const serializeServerDeleteCookie = (): string => {
	return cookie.serialize(serverCookieName, '', {
		path: '/',
		httpOnly: true, // Only accessible via server side.
		expires: new Date(0),
	} as CookieSerializeOptions);
};

export const serializeClientDeleteCookie = (): string => {
	return cookie.serialize(clientCookieName, '', {
		path: '/',
		expires: new Date(0),
	} as CookieSerializeOptions);
};

export const getClientSession = (setStore: boolean): AuthClientSession => {
	let userData = {} as AuthClientSession;

	try {
		const auth = Cookie.get(clientCookieName);
		if (!auth) {
			throw 'invalid cookie';
		}
		userData = JSON.parse(auth) as AuthClientSession;
	} catch {
		userData = {
			email: '',
			loggedIn: false,
		} as AuthClientSession;
		Cookie.remove(clientCookieName);
	}

	if (setStore) {
		isLoggedIn.set(userData.loggedIn);
	}

	return userData;
};

export const getServerSession = (cookieString: string): AuthServerSession => {
	const auth = cookie.parse(cookieString || '');
	return loadServerCookie(auth);
};

export const getClientSessionOnServer = (cookieString: string): AuthClientSession => {
	const auth = cookie.parse(cookieString || '');
	return loadClientCookie(auth);
};

const loadServerCookie = (cookies: { [key: string]: string }): AuthServerSession => {
	let userData = {} as AuthServerSession;
	if (cookies[serverCookieName]) {
		try {
			userData = JSON.parse(decode(cookies[serverCookieName])) as AuthServerSession;
		} catch {
			userData = { accessToken: '', email: '' } as AuthServerSession;
		}
	} else {
		userData = {
			accessToken: '',
			email: '',
		} as AuthServerSession;
	}
	return userData;
};

const loadClientCookie = (cookies: { [key: string]: string }): AuthClientSession => {
	let userData = {} as AuthClientSession;
	if (cookies[clientCookieName]) {
		try {
			userData = JSON.parse(cookies[clientCookieName]) as AuthClientSession;
		} catch {
			userData = { loggedIn: false };
		}
	} else {
		userData = {
			loggedIn: false,
		};
	}
	return userData;
};

export const clearClientSession = (): void => {
	Cookie.remove(clientCookieName);
	isLoggedIn.set(false);
};

export const clearServerSession = async (): Promise<Response> => {
	return await fetch('/api/v1/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
};

export const isLoggedIn = writable(getClientSession(false).loggedIn);
