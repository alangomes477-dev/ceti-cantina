'use client';

import { useState, useEffect } from 'react';
import { ChefHat, RefreshCw, Users, Wifi, Edit } from 'lucide-react'; // Adicionei o ícone Edit
import Link from 'next/link'; // 👈 AQUI ESTÁ A IMPORTAÇÃO QUE FALTAVA
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function AdminPage() {
  const [dados, setDados] = useState({ sim: 0, nao: 0, total: 0 });
  
  const dataIso = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const diaRef = ref(db, `cantina/${dataIso}`);

    // Escuta mudanças em tempo real
    const unsubscribe = onValue(diaRef, (snapshot) => {
      const valor = snapshot.val();
      if (valor) {
        setDados(valor);
      } else {
        setDados({ sim: 0, nao: 0, total: 0 });
      }
    });

    return () => unsubscribe();
  }, [dataIso]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="flex justify-between items-center mb-6 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Painel da Cantina</h1>
            <p className="text-slate-400 text-xs">CETI Mário Raulino</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-400 text-xs bg-green-900/30 px-3 py-1 rounded-full border border-green-900">
          <Wifi className="w-3 h-3 animate-pulse" />
          Ao vivo
        </div>
      </header>

      {/* 👇 BOTÃO DE EDITAR CARDÁPIO 👇 */}
      <div className="mb-8 flex justify-end">
        <Link 
          href="/admin/editar-cardapio" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-900/20 transition active:scale-95"
        >
          <Edit className="w-4 h-4" /> Editar Cardápio Semanal
        </Link>
      </div>
      {/* 👆 ------------------------ 👆 */}

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Total de Votos</span>
          </div>
          <p className="text-4xl font-bold text-white">{dados.total}</p>
        </div>

        <div className="bg-green-900/50 p-6 rounded-2xl border border-green-500/30 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/20 blur-2xl rounded-full"></div>
          <p className="text-green-400 text-xs font-bold uppercase mb-2">Confirmados (Cozinhar)</p>
          <p className="text-5xl font-bold text-green-400">{dados.sim}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 opacity-70">
          <p className="text-orange-400 text-xs font-bold uppercase mb-2">Não Almoçam</p>
          <p className="text-4xl font-bold text-slate-300">{dados.nao}</p>
        </div>
      </main>
      
      <div className="mt-12 text-center text-slate-600 text-xs">
        Painel Administrativo v1.0 • Conectado ao Firebase
      </div>
    </div>
  );
}