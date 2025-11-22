'use client';

import { useState, useEffect } from 'react';
import { ChefHat, RefreshCw, Users } from 'lucide-react';

export default function AdminPage() {
  const [dados, setDados] = useState({ sim: 0, nao: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const resposta = await fetch('/api/presenca');
      const json = await resposta.json();
      setDados(json);
    } catch (e) {
      console.error("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="flex justify-between items-center mb-10 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Painel da Cantina</h1>
            <p className="text-slate-400 text-xs">CETI Mário Raulino</p>
          </div>
        </div>
        <button 
          onClick={buscarDados}
          className="bg-slate-800 p-3 rounded-full hover:bg-slate-700 transition active:scale-95"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Total</span>
          </div>
          <p className="text-4xl font-bold text-white">{dados.total}</p>
        </div>

        <div className="bg-green-900/50 p-6 rounded-2xl border border-green-500/30 relative overflow-hidden">
          <p className="text-green-400 text-xs font-bold uppercase mb-2">Confirmados</p>
          <p className="text-5xl font-bold text-green-400">{dados.sim}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 opacity-70">
          <p className="text-orange-400 text-xs font-bold uppercase mb-2">Não vão</p>
          <p className="text-4xl font-bold text-slate-300">{dados.nao}</p>
        </div>
      </main>
    </div>
  );
}