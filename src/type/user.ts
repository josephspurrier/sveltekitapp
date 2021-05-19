export interface UserLogin {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	status: boolean;
}

export interface UserLogoutResponse {
	status: boolean;
}

export interface UserRegister {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface UserRegisterResponse {
	status: string;
}
