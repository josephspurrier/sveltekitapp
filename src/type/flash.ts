// Structure of a flash message.
export interface FlashMessage {
	message: string;
	style: MessageType;
}

// Types of flash message.
export enum MessageType {
	success = 'is-success',
	failed = 'is-danger',
	warning = 'is-warning',
	primary = 'is-primary',
	link = 'is-link',
	info = 'is-info',
	dark = 'is-dark',
}
