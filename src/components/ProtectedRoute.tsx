import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { type RootState } from "../app/store";

interface Props {
    children : React.ReactNode;
}

export const ProtectedRoute = ({children } : Props) =>{
    const token = useSelector((state: RootState) => state.auth.token);

    if(!token){
        return <Navigate to="/" replace />;
    }

    return <>{children}</>
}

export const PublicRoute = ({children} : Props) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if(token){
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>
}