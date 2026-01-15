import { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { login} from "../api/auth"
import { type ApiErrorResponse } from "../types/user"
import { type LoginPayload } from "../api/auth"
import { useForm } from "react-hook-form"

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } 
    = useForm<LoginPayload>({ mode: "onChange" })

    const onSubmit = async (data: LoginPayload) => {
        console.log(data)

        try {
            const loginResponse = await login({
                    email: data.email,
                    password: data.password
                })

                localStorage.setItem("token", loginResponse.token)
                navigate("/home")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ApiErrorResponse>
                if (axiosError.response && axiosError.response.data) {
                    setErrorMessage(axiosError.response.data.ErrorMessageJP)
                } else {
                    setErrorMessage("ネットワークエラーが発生しました。")
                }
            } else {
                setErrorMessage("予期せぬエラーが発生しました。")
            }
        }
    } // 👈 【修正1】ここで handleSubmit を閉じる！

    

    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form aria-label="auth-form" onSubmit={handleSubmit(onSubmit)} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
                    <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                    
                    
                    {/* エラーメッセージ表示エリア */}
                    {errorMessage && (
                        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input {...register("email", { required: "メールアドレスは必須です。" })} type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" />
                    </div>
                    {errors.email && (
                    <div className="mt-2 text-red-500 text-xs text-left ml-4">
                        {errors.email?.message as React.ReactNode}
                    </div>
                        )}
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input {...register("password", { required: "パスワードは必須です。"})} type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" />
                    </div>
                    {errors.password && (
                    <div className="mt-2 text-red-500 text-xs text-left ml-4">
                        {errors.password?.message as React.ReactNode}
                    </div>
                        )}  
                    <div className="mt-4 text-left text-indigo-500">
                        <button className="text-sm" type="reset">Forget password?</button>
                    </div>
                    <button aria-label="submit button" type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        ログイン
                    </button>
                    <p onClick={() => {
                        setErrorMessage("") // モード切替時にエラーを消す
                        navigate("/signup")
                    }} className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">"Don't have an account?" <a className="text-indigo-500 hover:underline">click here</a></p>
                </form>
            </div>
    )
}


export default LoginPage