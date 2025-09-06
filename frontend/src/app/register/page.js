"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // default role
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess("Registration successful! Redirecting to login...");
                setError("");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(data.message || "Registration failed");
                setSuccess("");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
            setSuccess("");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <form 
                onSubmit={handleRegister} 
                className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200"
            >
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Register</h2>

                {error && (
                    <p className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 text-sm text-center bg-green-100 p-2 rounded">{success}</p>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                        required
                    />

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

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </a>
                </p>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
