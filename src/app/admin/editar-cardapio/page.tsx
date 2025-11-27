'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { ArrowLeft, Save, ChefHat, Calendar } from 'lucide-react';

const diasSemana = [
  { id: 'segunda', label: 'Segunda-feira' },
  { id: 'terca', label: 'Terça-feira' },
  { id: 'quarta', label: 'Quarta-feira' },
  { id: 'quinta', label: 'Quinta-feira' },
  { id: 'sexta', label: 'Sexta-feira' },
];

export default function EditarCardapio() {
  const [diaSelecionado, setDiaSelecionado] = useState('segunda');
  const [loading, setLoading] = useState(false);
  
  // Estado do formulário
  const [form, setForm] = useState({
    data: '', // Ex: 25 Nov
    prato: '',
    guarnicao: '',
    salada: '',
    sobremesa: '',
    restricoes: '' // Ex: Sem Glúten
  });

  // Carrega os dados quando troca o dia
  useEffect(() => {
    const carregarDados = async () => {
      const snapshot = await get(ref(db, `cardapio_semanal/${diaSelecionado}`));
      if (snapshot.exists()) {
        setForm(snapshot.val());
      } else {
        // Limpa se não tiver nada salvo
        setForm({ data: '', prato: '', guarnicao: '', salada: '', sobremesa: '', restricoes: '' });
      }
    };
    carregarDados();
  }, [diaSelecionado]);

  const salvarCardapio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await set(ref(db, `cardapio_semanal/${diaSelecionado}`), {
        ...form,
        dia: diasSemana.find(d => d.id === diaSelecionado)?.label // Salva o nome bonito "Segunda-feira"
      });
      alert('Cardápio salvo com sucesso! ✅');
    } catch (error) {
      alert('Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ChefHat className="text-green-500" /> Editor de Cardápio
        </h1>
      </header>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        
        {/* Seletor de Dia */}
        <div className="mb-6">
          <label className="block text-slate-400 text-sm mb-2">Selecione o Dia:</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {diasSemana.map((dia) => (
              <button
                key={dia.id}
                onClick={() => setDiaSelecionado(dia.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
                  diaSelecionado === dia.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {dia.label.split('-')[0]}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={salvarCardapio} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Data (Ex: 25 Nov)</label>
            <input 
              type="text" required
              value={form.data}
              onChange={e => setForm({...form, data: e.target.value})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Prato Principal</label>
            <input 
              type="text" required
              value={form.prato}
              onChange={e => setForm({...form, prato: e.target.value})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Guarnição</label>
              <input 
                type="text"
                value={form.guarnicao}
                onChange={e => setForm({...form, guarnicao: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Salada</label>
              <input 
                type="text"
                value={form.salada}
                onChange={e => setForm({...form, salada: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Sobremesa</label>
              <input 
                type="text"
                value={form.sobremesa}
                onChange={e => setForm({...form, sobremesa: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Restrições/Tags</label>
              <input 
                type="text" placeholder="Ex: Sem Glúten"
                value={form.restricoes}
                onChange={e => setForm({...form, restricoes: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-green-500 transition flex justify-center gap-2"
          >
            <Save /> {loading ? 'Salvando...' : 'Salvar Cardápio'}
          </button>
        </form>
      </div>
    </div>
  );
}