export interface LoginResponse {
    token: string;
}

export interface ApiErrorResponse{
    ErrorCode: number;
    ErrorMessageJP: string;
    ErrorMessageEN: string;
}

export interface CreateUserResponse {
    token: string;
}

export interface UserInfoResponse{
    name : string
    iconUrl : string;
    token: string;
}
