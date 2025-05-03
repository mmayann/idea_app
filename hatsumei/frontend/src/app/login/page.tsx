"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from '@/firebase';
import FooterPage from "../components/layouts/footer";
import { useRouter } from "next/navigation";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("ログイン済み:", user.email);
      } else {
        setUser(null);
        console.log("ログアウト状態");
      }
    });
    return () => unsubscribe();
  }, []);



const handleRegister = () => {
  router.push("/createAccountForm");
};

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログインに成功しました");
      router.push('/memberPages/${users.firebase_uid}');
    } catch (error) {
      alert(
        "ログインできません（" +
          (error instanceof Error ? error.message : "不明なエラー") +
          "）"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-2xl font-light text-center mb-4">Login</h1>

          <div className="max-w-screen-md bg-slate-100 shadow-md rounded-3xl p-6">
            <div className="flex flex-col items-center w-full">
              <input
                className="w-full py-2 mb-6 border-b border-gray-600 focus:outline-none focus:border-blue-500 bg-slate-100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                className="w-full py-2 mb-6 border-b border-gray-600 focus:outline-none focus:border-blue-500 bg-slate-100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between px-6 pb-4">
              <>
                <button
                  onClick={handleRegister}
                  className="ml-4 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "新規登録"}
                </button>
                <button
                  onClick={handleLogin}
                  className="mr-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Login..." : "Login"}
                </button>
              </>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FooterPage />
      </div>
    </section>
  );
};

export default Login;