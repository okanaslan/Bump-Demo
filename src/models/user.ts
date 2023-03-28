export enum UserStatus {
    pending = "pending",
    success = "success",
}

export interface User {
    status: UserStatus;
    email: string;
    password: string;
}
