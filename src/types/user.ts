export interface LoginResponse {
    token: string;
    username: string;
}

export interface ApiErrorResponse{
    ErrorCode: number;
    ErrorMessageJP: string;
    ErrorMessageEN: string;
}

export interface CreateUserResponse {
    token: string;
}

export interface UserIconResponse{
    iconUrl : string;
}
