import React, { useState, useEffect } from 'react';

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Escuchar evento personalizado para abrir desde cualquier lugar
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-support-modal', handleOpenModal);

    // Abrir automáticamente tras 1 segundo SOLO si el usuario está en la página principal (/)
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    let timer: ReturnType<typeof setTimeout>;

    if (isHomePage) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-support-modal', handleOpenModal);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop con desenfoque suave */}
      <div 
        className="fixed inset-0 bg-[#1E1210]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel principal del Modal Neo-brutalista */}
      <div className="relative w-full max-w-lg bg-white border-4 border-[#1E1210] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#1E1210] z-10 font-nunito overflow-hidden">
        
        {/* Botón de Cierre */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-100 text-[#1E1210] border-2 border-[#1E1210] font-black text-sm transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Header con insignia */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl p-2 bg-[#FFF7ED] border-2 border-[#1E1210] rounded-2xl shadow-[2px_2px_0px_#1E1210]">☕</span>
          <div>
            <span className="text-[0.68rem] font-black uppercase tracking-widest text-[#7c2d12] block">Comunidad & Apoyo</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E1210] m-0 leading-tight">
              Aporta a Café y Código 💙
            </h2>
          </div>
        </div>

        {/* Descripción de impacto y beneficio del muro */}
        <p className="text-sm font-semibold text-slate-600 leading-relaxed mb-5">
          Este proyecto es <strong>100% independiente y gratuito</strong> para miles de estudiantes. Con tu aporte mantienes el hosting, los servidores y el desarrollo de nuevos cursos.
        </p>

        {/* Destacado: Muro de Colaboradores & Sponsors */}
        <div className="bg-[#ECFDF5] border-2 border-[#10B981] rounded-2xl p-3.5 mb-5 flex items-start gap-3 shadow-[2px_2px_0px_#10B981]">
          <span className="text-2xl shrink-0">🏅</span>
          <div className="text-xs text-emerald-950 font-bold">
            <strong className="block text-emerald-900 text-sm font-black mb-0.5">¡Aparece en el Muro de Colaboradores!</strong>
            Al realizar tu aporte, obtendrás la <span className="underline decoration-emerald-500 font-extrabold">Insignia de Sponsor</span> en tu perfil y un lugar de honor en nuestro <a href="/colaboradores/" className="text-emerald-700 underline font-black">Muro de Colaboradores y Sponsors</a>.
          </div>
        </div>

        {/* Opciones de Aporte */}
        <div className="space-y-3 mb-6">
          <a
            href="https://link.mercadopago.cl/cafeycodigo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl border-3 border-[#1E1210] bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] font-black no-underline shadow-[3px_3px_0px_#1E1210] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <div className="text-left">
                <span className="block text-sm leading-tight text-[#0369A1]">Mercado Pago 🇨🇱</span>
                <span className="text-[0.7rem] font-bold text-[#0284c7] block">Aporte en pesos chilenos (Tarjetas / Débito)</span>
              </div>
            </div>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="https://ko-fi.com/cafeycodigo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl border-3 border-[#1E1210] bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#BE123C] font-black no-underline shadow-[3px_3px_0px_#1E1210] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div className="text-left">
                <span className="block text-sm leading-tight text-[#BE123C]">Ko-fi (Internacional 🌎)</span>
                <span className="text-[0.7rem] font-bold text-[#e11d48] block">Invítanos un café desde cualquier país (PayPal / Card)</span>
              </div>
            </div>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Footer del Modal */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs font-bold text-slate-500">
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 underline cursor-pointer bg-transparent border-0 p-0 text-[0.72rem]"
          >
            Cerrar
          </button>
          <a
            href="/colaboradores/"
            className="text-[#0284c7] hover:underline font-black"
          >
            Ver Muro de Sponsors →
          </a>
        </div>

      </div>
    </div>
  );
}
