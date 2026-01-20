import { apiClient } from "./axios";
import { type bookListResponse } from "../types/contents";


const LIMIT = 10;  // 1ページあたりの件数

export const fetchBooks = async (page: number, token : string) : Promise<bookListResponse[]> => {
    const offset = (page - 1) * LIMIT;

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

export const fetchPublicBooks = async (page: number) : Promise<bookListResponse[]> => {
    const offset = (page - 1) * LIMIT;
    
    const response = await apiClient.get<bookListResponse[]>("/public/books",{
        params : {
            offset: offset
        }
    });
    return response.data;
}