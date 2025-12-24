"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [images, setImages] = useState<{ id: string; name: string; url: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ id: string; name: string; url: string } | null>(null);

  // Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Use the LIST specific URL (GET)
      const webhookListUrl = process.env.NEXT_PUBLIC_N8N_LIST_URL;
      if (!webhookListUrl) return;

      const res = await fetch(webhookListUrl);
      // We assume n8n GET webhook returns { images: [...] } or just an array
      if (res.ok) {
        const data = await res.json();
        const imageList = Array.isArray(data) ? data : data.images || [];
        setImages(imageList);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setUploadMessage("");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Use the UPLOAD specific URL (POST)
        const webhookUploadUrl = process.env.NEXT_PUBLIC_N8N_UPLOAD_URL;

        if (!webhookUploadUrl) {
          throw new Error("Upload Webhook URL not configured");
        }

        const response = await fetch(webhookUploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setUploadMessage("¡Enviado a n8n con éxito! 🎁");
          setTimeout(fetchImages, 2000);
        } else {
          setUploadMessage("Error al subir la imagen 😢");
        }
      } catch (error) {
        console.error(error);
        setUploadMessage("Error de conexión (Check Console) ⚠️");
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadMessage(""), 5000);
      }
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* FULL BACKGROUND IMAGE */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.png"
          alt="Fondo Navideño"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 py-8 flex flex-col items-center">

        {/* Header Title */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-full shadow-[0_0_50px_rgba(255,215,0,0.2)] mb-12 animate-fade-in-up md:mt-10">
          <h1 className="font-vibes text-6xl md:text-8xl text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-center">
            Navidad 2025
          </h1>
          <p className="text-xl md:text-2xl text-christmas-gold mt-2 font-light tracking-widest uppercase shadow-black drop-shadow-md text-center">
            Álbum Familiar
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105 duration-500 mb-20 animate-fade-in-up delay-100">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-white">Sube tu Recuerdo</h2>
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
            </label>
            {uploadMessage && <p className="text-green-300 animate-bounce">{uploadMessage}</p>}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full animate-fade-in-up delay-200">
          <h3 className="font-vibes text-5xl text-christmas-gold text-center mb-10 drop-shadow-md">
            Galería de Recuerdos
          </h3>

          {images.length === 0 ? (
            <div className="text-center text-slate-300 py-10 bg-black/20 rounded-xl backdrop-blur-sm">
              <p className="text-xl">Aún no hay fotos. ¡Sé el primero en subir una! 🎄</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img.id || Math.random()}
                  className="aspect-[4/5] relative group overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/20 cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img.url}
                    alt={img.name || "Foto navideña"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-light text-sm truncate w-full">{img.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>


      {/* Lightbox / Modal */}
      {
        selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-5xl transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <div
              className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-md overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name || "Foto completa"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              {selectedImage.name && (
                <p className="mt-4 text-white text-xl font-light tracking-wide text-center drop-shadow-lg">
                  {selectedImage.name}
                </p>
              )}
            </div>
          </div>
        )
      }
    </main >
  );
}
