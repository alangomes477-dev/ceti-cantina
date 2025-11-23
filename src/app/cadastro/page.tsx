'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { UserPlus, ArrowLeft, School, CheckCircle2, Lock } from 'lucide-react'; // Importei o Lock

export default function CadastroPage() {
  const router = useRouter();
  
  // Agora temos o campo 'senha' no estado
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    turma: '',
    senha: '' 
  });
  
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const matriculaLimpa = formData.matricula.trim();
      
      // Validação simples: senha precisa ter pelo menos 4 dígitos
      if (formData.senha.length < 4) {
        alert('A senha precisa ter pelo menos 4 caracteres.');
        setLoading(false);
        return;
      }

      const alunoRef = ref(db, `alunos/${matriculaLimpa}`);

      const snapshot = await get(alunoRef);
      if (snapshot.exists()) {
        alert('Erro: Já existe um aluno com esta matrícula!');
        setLoading(false);
        return;
      }

      // Salvando os dados COM A SENHA
      await set(alunoRef, {
        nome: formData.nome,
        turma: formData.turma,
        senha: formData.senha, // <--- Aqui está a novidade
        dataCadastro: new Date().toISOString()
      });

      alert('Aluno cadastrado com sucesso! ✅');
      router.push('/login');

    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
        
        <div className="bg-green-600 p-8 text-center relative">
          <Link href="/login" className="absolute left-6 top-6 text-green-100 hover:text-white transition">
            <ArrowLeft />
          </Link>
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">Novo Aluno</h1>
          <p className="text-green-100 text-sm">Crie sua conta segura</p>
        </div>

        <form onSubmit={handleCadastro} className="p-8 space-y-4">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nome Completo</label>
            <input 
              type="text" required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Ex: Ana Souza"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Matrícula</label>
              <input 
                type="text" required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="Ex: 202401"
                value={formData.matricula}
                onChange={(e) => setFormData({...formData, matricula: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Turma</label>
              <input 
                type="text" required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="Ex: 9º B"
                value={formData.turma}
                onChange={(e) => setFormData({...formData, turma: e.target.value})}
              />
            </div>
          </div>

          {/* Campo de Senha NOVO */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-gray-400"/> Crie uma Senha
            </label>
            <input 
              type="password" required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="Mínimo 4 dígitos"
              value={formData.senha}
              onChange={(e) => setFormData({...formData, senha: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Salvando...' : 'Confirmar Cadastro'}
            {!loading && <CheckCircle2 className="w-5 h-5" />}
          </button>

        </form>
      </div>
    </div>
  );
}