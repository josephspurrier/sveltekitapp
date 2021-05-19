import { writable } from 'svelte/store';
import type { MessageType, FlashMessage } from '~/type/flash';

export const flashMessages = writable<FlashMessage[]>([]);

export const showFlash = (message: string, style: MessageType): void => {
	addFlash(message, style);
};

export const setFlashTimeout = (t: number): void => {
	internalFlash.timeout = t;
};

export const clearFlash = (): void => {
	flashMessages.update(() => []);
};

export const setPrepend = (b: boolean): void => {
	internalFlash.prepend = b;
};

export const removeFlash = (i: FlashMessage): void => {
	flashMessages.update((n) => {
		n = n.filter((v) => {
			return v !== i;
		});
		return n;
	});
};

const internalFlash = {
	timeout: 4000, // milliseconds
	prepend: false,
};

const addFlash = (message: string, style: MessageType): void => {
	// Don't show a message if zero.
	if (internalFlash.timeout === 0) {
		return;
	}

	const msg: FlashMessage = {
		message: message,
		style: style,
	};

	//Check if the messages should stack in reverse order.
	if (internalFlash.prepend === true) {
		flashMessages.update((n) => {
			n.unshift(msg);
			return n;
		});
	} else {
		flashMessages.update((n) => {
			n.push(msg);
			return n;
		});
	}

	// Show forever if -1.
	if (internalFlash.timeout > 0) {
		setTimeout(() => {
			removeFlash(msg);
		}, internalFlash.timeout);
	}
};
