'use client'; // 👈 Isso avisa ao Next.js que esta página tem interatividade!

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue sozinha
    setLoading(true);
    
    // Aqui fingimos uma verificação de senha de 1 segundo
    setTimeout(() => {
      router.push('/dashboard'); // 👈 Manda o usuário para o Dashboard
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Cantina CETI Mario Raulino
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
            <input 
              type="text" 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Digite sua matrícula"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="••••••"
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}