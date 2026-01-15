export interface bookListResponse{
    id: string;
    title: string;
    url: string;
    detail: string;
    review: string;
    reviewer : string;
     isMine : boolean;
}

export interface bookListErrorResponse{
    ErrorCode: number;
    ErrorMessageJP: string;
    ErrorMessageEN: string;
}