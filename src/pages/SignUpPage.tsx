import React, { useState} from "react"
import {  useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { createUser , uploadUserIcon, getUserInfo} from "../api/auth"
import { type ApiErrorResponse } from "../types/user"
import { useForm } from "react-hook-form"
import { type CreateUserPayload } from "../api/auth"
import Compressor from "compressorjs"
import { useDispatch } from "react-redux" 
import { setAuth } from "../features/auth"  
import { setProfile } from "../features/profile"
import { useSelector } from "react-redux"
import { type RootState } from "../app/store"



const SignUpPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const token = useSelector((state : RootState) => state.auth.token);

    const [errorMessage, setErrorMessage] = useState("")

    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [avatarFile, setAvatarFile] = useState<File | Blob | null>(null)


    const { register, handleSubmit, formState: { errors } 
    } = useForm<CreateUserPayload>({ mode: "onChange" })

    const onSubmit = async (data: CreateUserPayload) => {
        console.log(data)

        try {
           
                // ※createUserの実装に合わせて引数を調整してください
                const registerResponse = await createUser({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })

                const userInfoResponse = await getUserInfo(registerResponse.token);
                
                // サインアップ成功時の挙動（トークンがあればログイン、なければログイン画面へなど）
                if (registerResponse.token) {
                    dispatch(setAuth({
                        token: registerResponse.token
                    }))

                    dispatch(setProfile({
                        iconurl : userInfoResponse.iconUrl,
                        name : data.name
                    }))
                    
                    
                    // アイコンのアップロード処理
                    if (avatarFile) {
                        try {
                            await uploadUserIcon(avatarFile, token);
                        } catch (iconError) {
                            console.error("アイコンのアップロードに失敗しました", iconError);
                            alert("ユーザー登録は完了しましたが、画像のアップロードに失敗しました。");
                        }
                    }
                    navigate("/home")
                } else {
                    alert("登録しました。ログインしてください。")
                    navigate("/login")
                }

                if (avatarFile) {
                try {
                    await uploadUserIcon(avatarFile, token);
                } catch (iconError) {
                    // ユーザー登録自体は成功しているので、ここはログ出力程度にして
                    // ユーザーには警告を出すか、そのまま進めるか判断が必要です。
                    // 今回はコンソールに出してそのままホームへ進めます。
                    console.error("アイコンのアップロードに失敗しました", iconError);
                    alert("ユーザー登録は完了しましたが、画像のアップロードに失敗しました。");
                }
            }

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
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        new Compressor(file, {
            quality: 0.6,    // 画質調整
            maxWidth: 400,   // アイコンなのでリサイズ
            maxHeight: 400,
            mimeType: 'image/jpeg', // jpgに変換
            success(result) {
                if (result.size > 1024 * 1024) {
                    setErrorMessage("画像サイズが大きすぎます。別の画像を選択してください。");
                    return;
                }
                setErrorMessage(""); // エラーをクリア
                setAvatarFile(result);
                setPreviewImage(URL.createObjectURL(result));
            },
            error(err) {
                console.error(err.message);
                setErrorMessage("画像の圧縮に失敗しました。");
            },
        })
    }



    

    
    

   

    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form aria-label="auth-form" onSubmit={handleSubmit(onSubmit)} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">Sign Up</h1>
                    {/* アイコン選択エリア */}
                    <div className="mt-6 flex justify-center">
                        <label className="cursor-pointer group relative">
                            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                                {previewImage ? (
                                    <img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                )}
                            </div>
                            {/* バリデーションエラー時は入力を無効化しないように注意 */}
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg" 
                                className="hidden" 
                                onChange={handleImageSelect} 
                            />
                            <span className="text-xs text-indigo-500 mt-2 block">アイコンを選択</span>
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                    
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                            {/* required は外しています */}
                            <input {...register("name", { required: "名前は必須です" })} type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" />
                    </div>
                    {errors.name && (
                        <div className="mt-2 text-red-500 text-xs text-left ml-4">
                            {errors.name?.message as React.ReactNode}
                        </div>
                    )}
                    

                    <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input {...register("email", { required: "メールアドレスは必須です" })} type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0"  />
                    </div>
                    {errors.email && (
                    <div className="mt-2 text-red-500 text-xs text-left ml-4">
                        {errors.email?.message as React.ReactNode}
                    </div>
                    )}
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input {...register("password", { required: "パスワードは必須です" })} type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" />
                    </div>
                    {errors.password && (
                    <div className="mt-2 text-red-500 text-xs text-left ml-4">
                        {errors.password?.message as React.ReactNode}
                    </div>
                        )}
                        {errorMessage && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded mb-4">
                                {errorMessage}
                            </div>
                        )}
                    <div className="mt-4 text-left text-indigo-500">
                        <button className="text-sm" type="reset">Forget password?</button>
                    </div>
                    <button aria-label="submit button" type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        Sign Up
                    </button>
                    <p onClick={() => {
    
                        navigate("/login")
                    }} className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">"Already have an account?"<a className="text-indigo-500 hover:underline">click here</a></p>
                </form>
            </div>
    )
}


export default SignUpPage