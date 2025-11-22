import { NextResponse } from 'next/server';

// Nosso "Banco de Dados" na memória RAM do servidor
// ATENÇÃO: Se reiniciar o servidor, isso zera!
let relatorioAlmoco = {
  sim: 0,
  nao: 0,
  total: 0
};

// Rota GET: A cozinheira consulta os números
export async function GET() {
  return NextResponse.json(relatorioAlmoco);
}

// Rota POST: O aluno envia a confirmação
export async function POST(request: Request) {
  const body = await request.json();
  const { voto } = body; // Recebe 'sim' ou 'nao'

  if (voto === 'sim') {
    relatorioAlmoco.sim += 1;
  } else if (voto === 'nao') {
    relatorioAlmoco.nao += 1;
  }
  
  relatorioAlmoco.total += 1;

  console.log(`📝 Novo voto registrado: ${voto.toUpperCase()}`);
  console.log(`📊 Placar atual: SIM (${relatorioAlmoco.sim}) vs NÃO (${relatorioAlmoco.nao})`);

  return NextResponse.json({ 
    message: 'Voto registrado com sucesso!',
    dadosAtualizados: relatorioAlmoco
  });
}