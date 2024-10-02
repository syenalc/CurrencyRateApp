export interface Login{
    email:string;
    password:string;
}

export interface LoginResponse {
    message: string;
    isLoggedIn: boolean;
    name: string; // ログイン成功時に返されるユーザー名
}