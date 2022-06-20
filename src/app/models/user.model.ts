export class User {

  static fromFirestore(user: IUserFireStore) {
    return new User(user.uid, user.name, user.email);
  }

  constructor(
    public uid: string,
    public name: string,
    public email: string
  ) {}
}


export interface IUserFireStore {
  uid: string;
  email: string;
  name: string;
}