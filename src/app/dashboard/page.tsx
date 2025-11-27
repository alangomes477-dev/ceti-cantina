'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importei o router para expulsar quem não tem login
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { ref, runTransaction, get, child, set } from 'firebase/database'; // Importei get, child e set

import { 
  Bell, CalendarDays, Apple, UtensilsCrossed, 
  CheckCircle2, XCircle, LockKeyhole
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  
  const [presenca, setPresenca] = useState<'sim' | 'nao' | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [nomeAluno, setNomeAluno] = useState('Aluno');
  const [jaVotou, setJaVotou] = useState(false); // 👈 Novo estado para bloquear

  const dataIso = new Date().toISOString().split('T')[0]; 
  const dataLegivel = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });

  useEffect(() => {
    // 1. Recupera dados do Login
    const nomeSalvo = localStorage.getItem('nomeAluno');
    const matriculaSalva = localStorage.getItem('matriculaAluno');

    if (!matriculaSalva) {
      // Se não tem matrícula, volta pro login (Segurança)
      router.push('/login');
      return;
    }

    if (nomeSalvo) setNomeAluno(nomeSalvo);

    // 2. Verifica no BANCO DE DADOS se este aluno já votou hoje
    // Caminho: cantina/2025-11-25/registros/MATRICULA
    const verificarVoto = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `cantina/${dataIso}/registros/${matriculaSalva}`));

        if (snapshot.exists()) {
          setJaVotou(true); // Bloqueia a votação
          setPresenca(snapshot.val()); // Recupera o que ele votou (sim ou nao)
        }
      } catch (error) {
        console.error("Erro ao verificar voto", error);
      }
    };

    verificarVoto();
  }, [dataIso, router]);

  const enviarPresenca = async (voto: 'sim' | 'nao') => {
    const matriculaSalva = localStorage.getItem('matriculaAluno');
    if (!matriculaSalva) return;

    setEnviando(true);
    try {
      // 1. Atualiza os Contadores (Total Geral)
      const diaRef = ref(db, `cantina/${dataIso}`);
      await runTransaction(diaRef, (dadosAtuais) => {
        if (dadosAtuais === null) {
          return { sim: voto === 'sim' ? 1 : 0, nao: voto === 'nao' ? 1 : 0, total: 1 };
        }
        if (voto === 'sim') dadosAtuais.sim = (dadosAtuais.sim || 0) + 1;
        else dadosAtuais.nao = (dadosAtuais.nao || 0) + 1;
        
        dadosAtuais.total = (dadosAtuais.total || 0) + 1;
        return dadosAtuais;
      });

      // 2. Registra que ESTE ALUNO votou (Para bloquear depois)
      await set(ref(db, `cantina/${dataIso}/registros/${matriculaSalva}`), voto);
      
      setPresenca(voto);
      setJaVotou(true); // Bloqueia imediatamente

    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o banco de dados.');
    } finally {
      setEnviando(false);
    }
  };

  return (
     <div className="min-h-screen bg-gray-50 pb-24">
        <header className="bg-green-600 pb-10 pt-8 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Bem-vindo de volta,</p>
                  <h1 className="text-3xl font-bold text-white tracking-tight">{nomeAluno}</h1>
              </div>
              <button className="bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                  <Bell className="text-white w-6 h-6" />
              </button>
            </div>
            <div className="bg-white/10 py-2 px-4 rounded-lg backdrop-blur-md border border-white/20 inline-flex items-center gap-2">
                <CalendarDays className="text-green-100 w-4 h-4" />
                <p className="text-sm font-medium text-white capitalize">{dataLegivel}</p>
            </div>
        </header>

        <main className="px-6 -mt-8 relative z-20 space-y-6">
             <section className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-100 rounded-2xl"><UtensilsCrossed className="text-orange-600 w-6 h-6" /></div>
                    <div>
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">Almoço de Hoje</h2>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Refeição Principal</p>
                    </div>
                </div>
                
                <div className="mb-6 pl-2 border-l-4 border-green-500">
                    <p className="text-gray-600 font-medium">Frango Assado com Batatas Rústicas</p>
                </div>

                {/* --- ÁREA DE VOTAÇÃO INTELIGENTE --- */}
                
                {!jaVotou ? (
                  // SE AINDA NÃO VOTOU: MOSTRA BOTÕES
                  <>
                    <p className="text-center text-sm text-gray-500 mb-4 font-medium">Você vai almoçar na escola hoje?</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                        disabled={enviando}
                        onClick={() => enviarPresenca('sim')}
                        className="relative overflow-hidden group py-4 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-400">
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-sm">{enviando ? 'Enviando...' : 'Vou Almoçar'}</span>
                        </button>

                        <button 
                        disabled={enviando}
                        onClick={() => enviarPresenca('nao')}
                        className="relative overflow-hidden group py-4 rounded-2xl font-bold transition-all duration-300 border flex flex-col items-center gap-2 bg-white text-gray-600 border-gray-200 hover:bg-red-50 hover:border-red-400">
                            <XCircle className="w-6 h-6" />
                            <span className="text-sm">{enviando ? 'Enviando...' : 'Não Vou'}</span>
                        </button>
                    </div>
                  </>
                ) : (
                  // SE JÁ VOTOU: MOSTRA MENSAGEM DE BLOQUEIO
                  <div className={`p-6 rounded-2xl text-center border-2 ${presenca === 'sim' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-center mb-3">
                      {presenca === 'sim' 
                        ? <div className="bg-green-500 p-3 rounded-full text-white"><CheckCircle2 className="w-8 h-8"/></div>
                        : <div className="bg-gray-400 p-3 rounded-full text-white"><XCircle className="w-8 h-8"/></div>
                      }
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {presenca === 'sim' ? 'Almoço Confirmado! ✅' : 'Resposta Registada'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Você já respondeu por hoje.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400 bg-white/50 py-1 px-3 rounded-full mx-auto w-fit">
                      <LockKeyhole className="w-3 h-3" /> Voto computado
                    </div>
                  </div>
                )}
                
                {/* ---------------------------------- */}

             </section>
             
             <section>
                <h3 className="font-bold text-gray-800 text-lg mb-4">Explorar</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/cardapio"><div className="bg-blue-50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2 h-32 text-blue-800 font-bold border border-blue-100 cursor-pointer"><CalendarDays/> Cardápio</div></Link>
                    <Link href="/dicas"><div className="bg-purple-50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2 h-32 text-purple-800 font-bold border border-purple-100 cursor-pointer"><Apple/> Dicas</div></Link>
                </div>
             </section>
        </main>
     </div>
  );
}