export interface Login {
    email: string;
    password: string;
}

export interface Register {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPassword {
    userId: string;
    password: string;
}