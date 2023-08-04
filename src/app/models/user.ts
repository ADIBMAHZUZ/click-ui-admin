export enum UserType {
    ADMIN = 'admin',
    SUBSCRIBER = 'subscriber',
    TEACHER = 'teacher',
    PUBLISHER = 'publisher',
    LIBRARIAN = 'librarian'
}

export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    token?: string;
    user_type: UserType;

    isLogin() {

        

    }
}