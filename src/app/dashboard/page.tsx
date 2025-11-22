'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, CalendarDays, Apple, UtensilsCrossed, 
  ThumbsUp, ThumbsDown, CheckCircle2, XCircle 
} from 'lucide-react';

export default function Dashboard() {
  const [presenca, setPresenca] = useState<'sim' | 'nao' | null>(null);
  const [enviando, setEnviando] = useState(false);

  const dataHoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });

  const enviarPresenca = async (voto: 'sim' | 'nao') => {
    setEnviando(true);
    try {
      await fetch('/api/presenca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voto: voto }),
      });
      setPresenca(voto);
    } catch (error) {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Cabeçalho do Aluno */}
      <header className="bg-green-600 pb-10 pt-8 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <p className="text-green-100 text-sm font-medium mb-1">Bem-vindo de volta,</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">João Silva</h1>
          </div>
          <button className="bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
            <Bell className="text-white w-6 h-6" />
          </button>
        </div>
        <div className="bg-white/10 py-2 px-4 rounded-lg backdrop-blur-md border border-white/20 inline-flex items-center gap-2">
          <CalendarDays className="text-green-100 w-4 h-4" />
          <p className="text-sm font-medium text-white capitalize">{dataHoje}</p>
        </div>
      </header>

      <main className="px-6 -mt-8 relative z-20 space-y-6">
        <section className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <UtensilsCrossed className="text-orange-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">Almoço de Hoje</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Refeição Principal</p>
            </div>
          </div>

          <div className="mb-6 pl-2 border-l-4 border-green-500">
            <p className="text-gray-600 font-medium">Frango Assado com Batatas Rústicas e Arroz</p>
          </div>
          
          <p className="text-center text-sm text-gray-500 mb-4 font-medium">
            Você vai almoçar na escola hoje?
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              disabled={enviando}
              onClick={() => enviarPresenca('sim')}
              className={`relative overflow-hidden group py-4 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 ${
                presenca === 'sim' 
                  ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200 scale-[1.02]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              {presenca === 'sim' ? <CheckCircle2 className="w-6 h-6" /> : <ThumbsUp className="w-6 h-6" />}
              <span className="text-sm">{enviando && presenca !== 'sim' ? 'Enviando...' : 'Vou Almoçar'}</span>
            </button>

            <button 
              disabled={enviando}
              onClick={() => enviarPresenca('nao')}
              className={`relative overflow-hidden group py-4 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 ${
                presenca === 'nao' 
                  ? 'bg-gray-800 text-white border-gray-800 shadow-lg scale-[1.02]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:bg-red-50'
              }`}
            >
               {presenca === 'nao' ? <XCircle className="w-6 h-6" /> : <ThumbsDown className="w-6 h-6" />}
               <span className="text-sm">Não Vou</span>
            </button>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-gray-800 text-lg mb-4">Explorar</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/cardapio" className="group">
              <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 hover:bg-blue-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col justify-between min-h-[140px]">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-blue-900 text-base block">Cardápio</span>
                  <span className="text-blue-400 text-xs">Ver semana</span>
                </div>
              </div>
            </Link>

            <Link href="/dicas" className="group">
              <div className="bg-purple-50 p-5 rounded-3xl border border-purple-100 hover:bg-purple-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col justify-between min-h-[140px]">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-purple-900 text-base block">Nutrição</span>
                  <span className="text-purple-400 text-xs">Dicas saudáveis</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}