"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (token && userData) setUser(JSON.parse(userData));
      else setUser(null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* Navbar */}
        <header className="sticky top-0 z-50">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md">
            <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link
          href="/"
          className="font-extrabold text-2xl text-white relative 
                    hover:text-yellow-200 transition-colors 
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-[2px] after:bg-yellow-300 
                    after:transition-all after:duration-300 hover:after:w-full"
        >
          🏠 Mini Property
        </Link>

              <nav className="flex items-center space-x-4 text-sm font-medium">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">
                      Welcome, <span className="text-yellow-300">{user.name}</span> ({user.role})
                    </span>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="bg-yellow-300 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition"
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-2 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 hover:scale-105 transition transform duration-300 font-semibold cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Main content */}
          <main className="container mx-auto px-6 py-10">{children}</main>

        {/* Footer */}
        <footer className="mt-12 border-t bg-white shadow-inner">
          <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Mini Property App · Built by Developer
          </div>
        </footer>
      </body>
    </html>
  );
}
