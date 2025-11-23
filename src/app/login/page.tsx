'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { ref, get, child } from 'firebase/database';
import { LogIn, Loader2, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState(''); // Estado para a senha digitada

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `alunos/${matricula.trim()}`));

      if (snapshot.exists()) {
        const dadosAluno = snapshot.val();
        
        // --- VERIFICAÇÃO DE SENHA ---
        // Se a senha do banco for igual à senha digitada
        if (dadosAluno.senha === senha) {
          
          // Login Sucesso!
          localStorage.setItem('nomeAluno', dadosAluno.nome);
          router.push('/dashboard');
          
        } else {
          // Senha Errada
          alert('❌ Senha incorreta! Tente novamente.');
        }

      } else {
        // Matrícula não existe
        alert('❌ Aluno não encontrado! Verifique a matrícula.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 animate-fade-in">
        
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <LogIn className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Bem-vindo(a)
        </h1>
        <p className="text-center text-gray-400 text-sm mb-8">
          Acesse a Cantina do CETI
        </p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Matrícula</label>
            <input 
              type="text" required
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Digite sua matrícula"
            />
          </div>
          
          {/* Campo de Senha Funcional */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 flex items-center gap-1">
              Senha <Lock className="w-3 h-3 text-gray-400"/>
            </label>
            <input 
              type="password" required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="••••••"
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Entrar na Cantina'}
          </button>

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Não tem cadastro?</p>
            <Link href="/cadastro" className="text-green-600 font-bold hover:underline inline-flex items-center gap-1">
              Criar conta de aluno
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}