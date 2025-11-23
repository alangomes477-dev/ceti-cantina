'use client';

import { useState, useEffect } from 'react';
import { ChefHat, RefreshCw, Users, Wifi } from 'lucide-react';
// Importações do Realtime Database
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function AdminPage() {
  const [dados, setDados] = useState({ sim: 0, nao: 0, total: 0 });
  const dataIso = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const diaRef = ref(db, `cantina/${dataIso}`);
    const unsubscribe = onValue(diaRef, (snapshot) => {
      const valor = snapshot.val();
      if (valor) setDados(valor);
      else setDados({ sim: 0, nao: 0, total: 0 });
    });
    return () => unsubscribe();
  }, [dataIso]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="flex justify-between items-center mb-10 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-lg"><ChefHat className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-xl font-bold">Painel da Cantina</h1></div>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <p className="text-xs font-bold uppercase text-slate-400">Total</p>
          <p className="text-4xl font-bold text-white">{dados.total}</p>
        </div>
        <div className="bg-green-900/50 p-6 rounded-2xl border border-green-500/30">
          <p className="text-green-400 text-xs font-bold uppercase">Confirmados</p>
          <p className="text-5xl font-bold text-green-400">{dados.sim}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 opacity-70">
          <p className="text-orange-400 text-xs font-bold uppercase">Não vão</p>
          <p className="text-4xl font-bold text-slate-300">{dados.nao}</p>
        </div>
      </main>
    </div>
  );
}