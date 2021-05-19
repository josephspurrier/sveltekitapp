export interface Note {
	id: string;
	message: string;
}

export interface NoteCreate {
	message: string;
}

export interface NoteUpdate {
	message: string;
}

export interface NoteUpdateResponse {
	message: string;
}

export interface NoteDeleteResponse {
	message: string;
}

export interface NoteCreateResponse {
	message: string;
}

export interface NoteGetResponse {
	notes: Note[];
}
