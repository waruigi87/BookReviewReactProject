import { apiClient } from "./axios";
import { type LoginResponse, type CreateUserResponse, type UserIconResponse } from "../types/user";

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

export const uploadUserIcon = async( iconFile : File | Blob) : Promise<UserIconResponse> =>{
    const formData = new FormData();
    formData.append("icon", iconFile);

    const token = localStorage.getItem("token");

    const response = await apiClient.post<UserIconResponse>("/uploads", formData,
        {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
    );
    return response.data;
}