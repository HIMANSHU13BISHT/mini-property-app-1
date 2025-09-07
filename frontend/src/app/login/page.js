"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                window.dispatchEvent(new Event("storage"));
                router.push("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <form 
                onSubmit={handleLogin} 
                className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200"
            >
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Login</h2>

                {error && (
                    <p className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">{error}</p>
                )}

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                        required
                    />
                </div>

                <p className="text-sm text-center text-gray-500">
                    Don&apos;t have an account?
                    <a href="/register" className="text-blue-600 font-medium hover:underline">
                        Register
                    </a>
                </p>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
