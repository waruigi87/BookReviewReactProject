interface PaginationProps {
  offset: number; // 現在のoffset値 (0, 10, 20...)
  limit?: number; // 1ページあたりの表示件数 (デフォルト10)
  onChange: (newOffset: number) => void; // ページ変更時のコールバック
}

export const Pagination = ({ offset, limit = 10, onChange }: PaginationProps) => {
  // 現在のページ番号を計算 (例: offset 0 -> 1ページ, offset 10 -> 2ページ)
  const currentPage = Math.floor(offset / limit) + 1;
  const startPage = Math.max(1, currentPage - 2);
  const pages = Array.from({ length: 5 }, (_, i) => {
    return startPage + i; 
  });
  
  // 前へボタンのハンドラ
  const handlePrev = () => {
    if (offset === 0) return;
    onChange(offset - limit);
  };

  // 次へボタンのハンドラ
  const handleNext = () => {
    onChange(offset + limit);
  };

  // 特定のページ番号をクリックした時のハンドラ
  const handlePageClick = (pageNumber: number) => {
    const newOffset = (pageNumber - 1) * limit;
    onChange(newOffset);
  };

  const baseButtonClass = "flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square rounded-md transition-all";
  const activeClass = "bg-indigo-500 text-white";
  const inactiveClass = "bg-white border border-gray-200 hover:bg-gray-100/70 text-gray-500";

  return (
    <div className="flex items-center gap-2">
      <button 
        type="button" 
        aria-label="Previous" 
        className="mr-4 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={handlePrev}
        disabled={offset === 0}
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
            onClick={() => handlePageClick(pageNum)}
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
        onClick={handleNext}
      >
        <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};