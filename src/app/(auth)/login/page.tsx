'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="py-10 bg-[#FF6B00] text-white text-center shadow-lg">
        <h1 className="text-4xl font-black tracking-tight">ANAHUARKET</h1>
        <p className="mt-2 text-orange-100 font-medium">INICIAR SESIÓN</p>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 bg-gray-700">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">Bienvenid@</h2>
            <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Correo Institucional</label>
              <input
                type="email"
                placeholder="nombre.apellido@anahuac.mx"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-semibold border border-red-100">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              {}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF6B00] hover:bg-[#e66000] text-white font-black rounded-xl transition-all transform hover:scale-[1.02] shadow-xl text-center"
              >
                ENTRAR
              </button>
              
              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-bold">o</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Link 
                href="/registro" 
                className="w-full py-4 bg-white border-2 border-gray-200 hover:border-[#FF6B00] text-gray-700 font-bold rounded-xl text-center transition-all"
              >
                CREAR CUENTA
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-8 text-center bg-[#FF6B00] ">
        <p className="text-sm font-medium text-white">
          © 2026 Anahuarket - Universidad Anáhuac Cancún
        </p>
      </footer>
    </div>
  );
}