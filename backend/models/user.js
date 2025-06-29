import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const USERS_FILE = '../backend/data/users.json';

export class User {
  // constructor({ id = uuidv4(), email, password, name }) {
  //   this.id = id;
  //   this.email = email;
  //   this.password = password;
  //   this.name = name;
  // }

  static getAll() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  }

  static saveAll(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }

 static findByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return this.getAll().find(u => u.email.toLowerCase() === normalizedEmail);
}

 static create({ name, email, password }) {
    const users = this.getAll();
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password, // already hashed before calling this
    };
    users.push(newUser);
    this.saveAll(users);
    return newUser;
  }

}

export default User;
