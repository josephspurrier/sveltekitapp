export interface AuthClientSession {
	loggedIn: boolean;
}

export interface AuthServerSession {
	accessToken: string;
	email: string;
}
