import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { nextPage, prevPage, goToPage } from '../features/paging';

export const Pagination = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.paging.page);
    
    // 表示するページ番号の配列
    const startPage = Math.max(1, currentPage - 2);
    const pages = Array.from({ length: 5 }, (_, i) => startPage + i);

    const baseButtonClass = "flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square rounded-md transition-all";
    const activeClass = "bg-indigo-500 text-white";
    const inactiveClass = "bg-white border border-gray-200 hover:bg-gray-100/70 text-gray-500";

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                aria-label="Previous"
                className="mr-4 disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => dispatch(prevPage())}
                disabled={currentPage === 1}
            >
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            <div className="flex gap-2 text-sm md:text-base">
                {pages.map((pageNum) => (
                    <button
                        key={pageNum}
                        type="button"
                        onClick={() => dispatch(goToPage(pageNum))}
                        className={`${baseButtonClass} ${
                            currentPage === pageNum ? activeClass : inactiveClass
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>

            <button
                type="button"
                aria-label="Next"
                className="ml-4"
                onClick={() => dispatch(nextPage())}
            >
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    );
};