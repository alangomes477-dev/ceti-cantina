'use client';

import Link from 'next/link';
// Ícones profissionais para cada categoria
import { 
  ChevronLeft, 
  Droplets, 
  Zap, 
  Brain, 
  Heart, 
  Sparkles,
  Sun
} from 'lucide-react';

export default function DicasPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Cabeçalho Roxo (Identidade visual de "Conteúdo Educativo") */}
      <header className="bg-purple-600 pb-12 pt-8 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        
        {/* Decoração de fundo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 opacity-20 rounded-full -mr-10 -mb-10 blur-2xl"></div>

        <div className="flex items-center gap-4 text-white mb-2 relative z-10">
          <Link href="/dashboard" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold tracking-wide">Dicas de Nutrição</h1>
        </div>
        <p className="text-purple-100 text-sm ml-12 relative z-10">
          Pequenos hábitos, grandes resultados. 🚀
        </p>
      </header>

      <main className="px-6 -mt-8 relative z-10 space-y-5">
        
        {/* Dica Destaque (Estilo Hero) */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 animate-fade-in relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <Droplets className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">Hidratação</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">A Regra da Garrafinha</h2>
            <p className="text-blue-50 text-sm leading-relaxed mb-4">
              Seu cérebro é 75% água! Se você sente sede, já está desidratado. Mantenha uma garrafa na mesa para ter foco total na aula.
            </p>
          </div>
        </div>

        {/* Grid de Dicas Rápidas */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* Card Energia */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4 items-start">
            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Troca Inteligente</h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Biscoito recheado dá sono depois de 30min. Uma banana ou maçã te dá energia constante para a prova!
              </p>
            </div>
          </div>

          {/* Card Foco */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4 items-start">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600 shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Combustível Mental</h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Nunca venha em jejum. O café da manhã é a refeição que "liga" o seu cérebro para aprender matemática.
              </p>
            </div>
          </div>

           {/* Card Regional (Personalizado) */}
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4 items-start">
            <div className="bg-pink-100 p-3 rounded-xl text-pink-600 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">O Poder da Cor</h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Frutas como a <strong>Manga Rosa</strong> e Acerola são ricas em vitamina C. Ótimas para não gripar e perder aula!
              </p>
            </div>
          </div>

          {/* Card Saúde */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4 items-start">
            <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Verdes Fortes</h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Brócolis e espinafre parecem sem graça? Eles são os verdadeiros construtores de músculos e imunidade.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center pt-4 pb-6">
           <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
             <Sun className="w-3 h-3" />
             Cantina CETI Mário Raulino
           </p>
        </div>

      </main>
    </div>
  );
}