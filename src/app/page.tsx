import Link from 'next/link';
import { ChefHat, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
      
      {/* Círculos decorativos de fundo */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 opacity-20 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-md">
        
        {/* Logo Animado */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-green-900/20 animate-bounce">
          <ChefHat className="w-16 h-16 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Cantina CETI
          </h1>
          <p className="text-green-100 text-lg font-medium">
            Mário Raulino
          </p>
        </div>

        <p className="text-green-50/80 leading-relaxed">
          Organize sua alimentação, evite desperdícios e acompanhe o cardápio escolar na palma da mão.
        </p>

        <Link href="/login" className="w-full">
          <button className="w-full bg-white text-green-700 font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-green-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
            Começar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        <footer className="pt-8 text-xs text-green-200/60">
          Versão 1.0 • Feito com 💚 pelos alunos
        </footer>
      </div>
    </div>
  );
}