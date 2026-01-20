import Compressor from "compressorjs";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { updateUserInfo, uploadUserIcon, getUserInfo } from "../api/auth";  // 関数名を変更
import { setAuth } from "../features/auth";  // Redux更新用
import { setProfile } from "../features/profile";

interface ProfileFormData {
    name: string;
}

export default function Profile() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [avatarFile, setAvatarFile] = useState<File | Blob | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.profile.name);
    
    const iconurl = useSelector((state: RootState) => state.profile.iconurl);

    // react-hook-form の設定
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>({
        mode: "onChange",
        defaultValues: {
            name: username || ""
        }
    });

    // 初期値をセット
    useEffect(() => {
        if (username) {
            setValue("name", username);
        }
    }, [username, setValue]);

    // この useEffect を追加するだけ
    useEffect(() => {
        if (iconurl) {
            setPreviewImage(iconurl);
        }
    }, [iconurl]);

    // 現在のユーザー情報を取得（アイコンなど）
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const userData = await getUserInfo(token);
                if (userData.iconUrl) {
                    if (!token || iconurl) return;
                    setPreviewImage(userData.iconUrl);
                }
            } catch (error) {
                console.error("ユーザー情報の取得に失敗", error);
            }
        };
        fetchUser();
    }, [token]);

    // 画像選択ハンドラ
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        new Compressor(file, {
            quality: 0.6,
            maxWidth: 400,
            maxHeight: 400,
            mimeType: 'image/jpeg',
            success(result) {
                if (result.size > 1024 * 1024) {
                    setErrorMessage("画像サイズが大きすぎます。別の画像を選択してください。");
                    return;
                }
                setErrorMessage("");
                setAvatarFile(result);
                setPreviewImage(URL.createObjectURL(result));
            },
            error(err) {
                console.error(err.message);
                setErrorMessage("画像の圧縮に失敗しました。");
            },
        });
    };

    // フォーム送信ハンドラ
    const onSubmit = async (data: ProfileFormData) => {
        if (!token) return;
        
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // ユーザー名の更新
            await updateUserInfo({ name: data.name, token });

            // アイコンのアップロード（選択されている場合のみ）
            if (avatarFile) {
                await uploadUserIcon(avatarFile, token);
            }

            // Redux の state も更新
            dispatch(setAuth({ token }));
            dispatch(setProfile({ name : data.name, iconurl : iconurl}))

            setSuccessMessage("プロフィールを更新しました！");
        } catch (error) {
            console.error(error);
            setErrorMessage("プロフィールの更新に失敗しました。");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col items-center text-sm text-slate-800 sm:w-[350px] w-full border border-gray-300/60 rounded-2xl px-8 py-10 bg-white"
            >
                <h1 className="text-3xl font-bold py-4 text-center">Profile</h1>

                {/* 成功メッセージ */}
                {successMessage && (
                    <div className="w-full mt-4 p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded">
                        {successMessage}
                    </div>
                )}

                {/* エラーメッセージ */}
                {errorMessage && (
                    <div className="w-full mt-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                        {errorMessage}
                    </div>
                )}

                {/* アイコン選択エリア */}
                <div className="mt-6 flex justify-center">
                    <label className="cursor-pointer group relative">
                        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                            {previewImage ? (
                                <img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleImageSelect}
                        />
                        <span className="text-xs text-indigo-500 mt-2 block">アイコンを変更</span>
                    </label>
                </div>

                {/* 名前入力 */}
                <div className="max-w-96 w-full px-4 mt-6">
                    <label htmlFor="name" className="font-medium">Name</label>
                    <div className="flex items-center mt-2 mb-1 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
                        </svg>
                        <input
                            {...register("name", { required: "名前は必須です" })}
                            type="text"
                            className="h-full px-2 w-full outline-none bg-transparent"
                            placeholder="Enter your name"
                        />
                    </div>
                    {errors.name && (
                        <div className="mt-1 text-red-500 text-xs text-left">
                            {errors.name.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white py-2.5 w-full rounded-full transition"
                    >
                        {isLoading ? "保存中..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}