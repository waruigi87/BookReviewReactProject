import { apiClient } from "./axios";
import { type bookListResponse } from "../types/contents";


export const fetchBooks = async (offset: number) : Promise<bookListResponse[]> => {
    const token = localStorage.getItem("token");

    const response = await apiClient.get<bookListResponse[]>("/books",{
        params : {
            offset: offset
        },
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}