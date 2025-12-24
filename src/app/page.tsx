"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      // Simulate n8n webhook call
      setTimeout(() => {
        setIsUploading(false);
        setUploadMessage("¡Enviado a n8n con éxito! 🎁");
        setTimeout(() => setUploadMessage(""), 5000);
      }, 2000);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Fondo Navideño"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">

          {/* Header Title with Glass Effect */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-full shadow-[0_0_50px_rgba(255,215,0,0.2)]">
            <h1 className="font-vibes text-6xl md:text-8xl text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              Navidad 2025
            </h1>
            <p className="text-xl md:text-2xl text-christmas-gold mt-2 font-light tracking-widest uppercase shadow-black drop-shadow-md">
              Álbum Familiar
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105 duration-500">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-red-500/30 border-4 border-white/10">
                <span className="text-4xl filter drop-shadow">📷</span>
              </div>

              <h2 className="text-3xl font-bold text-white">Sube tu Recuerdo</h2>
              <p className="text-slate-300">
                Comparte tus fotos favoritas de estas fiestas directamente a nuestro álbum en la nube.
              </p>

              <label className="block relative group cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                  accept="image/*"
                />
                <div className={`peer transition-all duration-300 rounded-xl py-4 px-6 font-bold text-lg flex items-center justify-center gap-3 shadow-lg ${isUploading
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white shadow-red-900/50'
                  }`}>
                  {isUploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">✨</span>
                      <span>Subir Foto Ahora</span>
                    </>
                  )}
                </div>
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-red-500/40 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 -z-10"></div>
              </label>

              {uploadMessage && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 animate-bounce">
                  <p className="text-green-300 font-medium text-sm">
                    {uploadMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Elements for atmosphere */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse blur-[2px]"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-200 rounded-full animate-pulse blur-[1px] delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-red-400 rounded-full animate-pulse blur-[3px] delay-1000"></div>

      </div>
    </main>
  );
}
