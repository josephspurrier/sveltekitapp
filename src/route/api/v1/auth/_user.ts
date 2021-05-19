import fs from 'fs';
import bcrypt from 'bcrypt';

interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

const saltRounds = 10;

export const loadUsers = (): User[] => {
	let users = [] as User[];
	try {
		// Load the users from the local storage file.
		const data = fs.readFileSync(`storage/users.json`, 'utf8');
		users = JSON.parse(data) as User[];
	} catch (err) {
		console.log('error reading users:', err);
		users = [];

		try {
			fs.writeFileSync(`storage/users.json`, JSON.stringify(users), 'utf8');
		} catch (err) {
			console.log('error creating users file:', err);
		}
	}

	return users;
};

export const saveUsers = (users: User[]): void => {
	try {
		fs.writeFileSync(`storage/users.json`, JSON.stringify(users), 'utf8');
	} catch (err) {
		console.log('error saving users:', err);
	}
};

export const createUser = (user: User): void => {
	const users = loadUsers();

	// Add user.
	users.push({
		...user,
		password: bcrypt.hashSync(user.password, saltRounds),
	});

	saveUsers(users);
};

export const deleteUser = (id: string): void => {
	let users = loadUsers();

	// Remove the matching ID.
	users = users.filter((u) => u.id !== id);

	saveUsers(users);
};

export const updateUser = (user: User): void => {
	const users = loadUsers();

	// Update the user for the matching ID.
	for (let i = 0; i < users.length; i++) {
		if (users[i].id === user.id) {
			users[i] = user;
			break;
		}
	}

	saveUsers(users);
};

export const getUser = (email: string): User | undefined => {
	const users = loadUsers();

	// Update the user for the matching email.
	for (let i = 0; i < users.length; i++) {
		if (users[i].email === email) {
			return users[i];
		}
	}

	return;
};

export const passwordMatch = (email: string, password: string): User | undefined => {
	const users = loadUsers();

	// Update the user for the matching email.
	for (let i = 0; i < users.length; i++) {
		if (users[i].email === email) {
			if (bcrypt.compareSync(password, users[i].password)) {
				return users[i];
			}

			return;
		}
	}

	return;
};
