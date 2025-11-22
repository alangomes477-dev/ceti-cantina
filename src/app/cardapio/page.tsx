'use client';

import { useState } from 'react';
import Link from 'next/link';
// Importando os ícones profissionais
import { 
  ChevronLeft, 
  Utensils, 
  Salad, 
  Cookie, 
  WheatOff, 
  MilkOff, 
  Fish,
  ChefHat
} from 'lucide-react';

// Dados simulados mantidos
const dadosCardapio = [
  {
    dia: 'Segunda',
    data: '24 Nov',
    prato: 'Iscas de Carne ao Molho',
    guarnicao: 'Arroz Branco e Feijão Carioca',
    salada: 'Alface, Tomate e Pepino',
    sobremesa: 'Laranja',
    tags: ['Sem Lactose']
  },
  {
    dia: 'Terça',
    data: '25 Nov',
    prato: 'Frango Assado Dourado',
    guarnicao: 'Purê de Batatas e Arroz',
    salada: 'Repolho Roxo com Cenoura',
    sobremesa: 'Gelatina de Morango',
    tags: ['Sem Glúten']
  },
  {
    dia: 'Quarta',
    data: '26 Nov',
    prato: 'Feijoada Light',
    guarnicao: 'Couve Refogada, Farofa e Laranja',
    salada: 'Vinagrete Especial',
    sobremesa: 'Abacaxi em Cubos',
    tags: []
  },
  {
    dia: 'Quinta',
    data: '27 Nov',
    prato: 'Macarrão à Bolonhesa',
    guarnicao: 'Não se aplica',
    salada: 'Mix de Folhas Verdes',
    sobremesa: 'Banana Prata',
    tags: ['Contém Glúten']
  },
  {
    dia: 'Sexta',
    data: '28 Nov',
    prato: 'Peixe ao Molho de Coco',
    guarnicao: 'Pirão e Arroz Branco',
    salada: 'Tomate em Rodelas com Orégano',
    sobremesa: 'Melancia',
    tags: ['Sem Lactose', 'Pescatariano']
  }
];

export default function CardapioPage() {
  const [diaSelecionado, setDiaSelecionado] = useState(0);
  const cardapioAtual = dadosCardapio[diaSelecionado];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Cabeçalho Moderno */}
      <header className="bg-green-600 pb-12 pt-8 px-6 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex items-center gap-4 text-white mb-4">
          <Link href="/dashboard" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold tracking-wide">Cardápio da Semana</h1>
        </div>
        
        {/* Decoração de fundo sutil */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
      </header>

      <main className="px-6 -mt-8 relative z-10">
        
        {/* Seletor de Dias (Scroll Horizontal) */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar snap-x">
          {dadosCardapio.map((item, index) => (
            <button
              key={index}
              onClick={() => setDiaSelecionado(index)}
              className={`flex-shrink-0 snap-center flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all duration-300 border-2 ${
                diaSelecionado === index
                  ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-200 scale-105'
                  : 'bg-white border-transparent text-gray-400 hover:bg-gray-100'
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider mb-1">
                {item.dia.substring(0, 3)}
              </span>
              <span className={`text-lg font-bold ${diaSelecionado === index ? 'text-white' : 'text-gray-800'}`}>
                {item.data.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Card do Prato (Design Elevado) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 overflow-hidden animate-fade-in border border-gray-100">
          
          {/* Faixa do Dia */}
          <div className="bg-green-50/50 p-6 border-b border-green-50 flex justify-between items-center">
             <div>
                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Refeição do dia</p>
                <h2 className="text-2xl font-bold text-gray-800">{cardapioAtual.dia}</h2>
             </div>
             <div className="bg-white p-3 rounded-full shadow-sm text-green-600">
                <ChefHat className="w-6 h-6" />
             </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Prato Principal */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Utensils className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Prato Principal</span>
              </div>
              <p className="text-xl font-bold text-gray-800 leading-snug">
                {cardapioAtual.prato}
              </p>
              <p className="text-sm text-gray-500 mt-1 pl-6 border-l-2 border-gray-200">
                Acompanha: {cardapioAtual.guarnicao}
              </p>
            </div>

            <div className="h-px bg-gray-100 w-full"></div>

            {/* Grid Salada e Sobremesa */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4">
                <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                  <Salad className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Salada</p>
                  <p className="text-sm font-semibold text-gray-700">{cardapioAtual.salada}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Sobremesa</p>
                  <p className="text-sm font-semibold text-gray-700">{cardapioAtual.sobremesa}</p>
                </div>
              </div>
            </div>

            {/* Tags de Restrição */}
            {cardapioAtual.tags.length > 0 && (
              <div className="pt-4 mt-2">
                <div className="flex flex-wrap gap-2">
                  {cardapioAtual.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg border border-gray-200">
                      {tag.includes('Glúten') && <WheatOff className="w-3 h-3" />}
                      {tag.includes('Lactose') && <MilkOff className="w-3 h-3" />}
                      {tag.includes('Pescatariano') && <Fish className="w-3 h-3" />}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8 mb-4">
          * O cardápio pode sofrer alterações sem aviso prévio.
        </p>

      </main>
    </div>
  );
}