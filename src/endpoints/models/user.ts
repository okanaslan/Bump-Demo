
export enum UserStatus {
    pending = "pending",
    success = "success",
    deleted = "deleted",
}

export interface User {
    status: UserStatus;
    email: string;
    password: string;
}
