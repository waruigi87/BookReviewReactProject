import { apiClient } from "./axios";
import { type LoginResponse,type CreateUserResponse} from "../types/user";

interface LoginPayload{
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) : Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/login", data);
    return response.data;
}

interface CreateUserPayload{
    name: string;
    email: string;
    password: string;
}

export const createUser = async (data: CreateUserPayload) : Promise<CreateUserResponse> => {
    const response = await apiClient.post<CreateUserResponse>("/signup", data);
    return response.data;
}