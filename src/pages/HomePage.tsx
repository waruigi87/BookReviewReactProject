import { useEffect, useState } from "react"
import { fetchBooks } from "../api/book"
import { type bookListResponse } from "../types/contents"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const HomePage = () => {
  const [books, setBooks] = useState<bookListResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // 非同期関数を定義して実行
    const loadBooks = async () => {
      try {
        const data = await fetchBooks() // デフォルトで offset=0
        setBooks(data)
      } catch (err) {
        // エラーハンドリング
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            alert("ログイン有効期限が切れました。再ログインしてください。")
            navigate("/login")
        } else {
            setError("書籍データの取得に失敗しました。")
        }
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [navigate]) // 初回マウント時に実行

  if (loading) return <div className="text-center mt-20">Loading...</div>
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">書籍レビュー一覧</h1>
        
        {/* グリッドレイアウト: スマホで1列、タブレット以上で2列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            // 書籍カード
            <div key={book.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                レビュワー: {book.reviewer}
              </p>
              <div className="bg-gray-50 p-3 rounded mb-4 text-gray-700 text-sm h-24 overflow-hidden">
                {book.review}
              </div>
              <a 
                href={book.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-500 text-white text-sm px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                書籍リンク
              </a>
              {/* 自分の投稿なら編集ボタンなどを出す場所（今回は不要） */}
              {book.isMine && (
                  <span className="ml-2 text-xs text-green-600 border border-green-600 px-2 py-1 rounded">
                      My Review
                  </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage