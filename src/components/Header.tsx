import { useDispatch } from "react-redux";
import { clearAuth } from "../features/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onHandle = () => {
        dispatch(clearAuth());
        navigate("/login"); 
        
    }
   
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <a href="/home" className="text-2xl font-bold text-indigo-500">
                BookReview
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <button onClick={onHandle} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Logout
                </button>
            </div>

            

        </nav>
    )
}

export default Header;