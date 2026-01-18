import { apiClient } from "./axios";
import { type LoginResponse, type CreateUserResponse, type UserInfoResponse } from "../types/user";
export interface LoginPayload{
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) : Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/signin", data);
    return response.data;
}

export interface CreateUserPayload{
    name: string;
    email: string;
    password: string;
}

export const createUser = async (data: CreateUserPayload) : Promise<CreateUserResponse> => {
    // axiosはデフォルトで application/json で送るので、これでOKです！
    // 以前のCORSエラー(400 Bad Request)はこれで解消するはずです。
    const response = await apiClient.post<CreateUserResponse>("/users", data);
    return response.data;
}

export const getUserInfo = async (data: string) : Promise<UserInfoResponse> => {
    const token = data;
    const response = await apiClient.get<UserInfoResponse>("users",{
        headers :{
            "Authorization" : `Bearer ${token} `
        }
    });
    return response.data;
}

export const uploadUserIcon = async( iconFile : File | Blob) : Promise<UserInfoResponse> =>{
    const formData = new FormData();
    formData.append("icon", iconFile);
    const token = localStorage.getItem("token");

    const response = await apiClient.post<UserInfoResponse>("/uploads", formData,
        {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
    );
    return response.data;
}