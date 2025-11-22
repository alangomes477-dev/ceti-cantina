# 🍎 Cantina CETI - App de Gestão Alimentar Escolar

> Um Progressive Web App (PWA) desenvolvido para modernizar a gestão da cantina do CETI Mário Raulino, focando na redução de desperdício de alimentos e educação nutricional.

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-green)
![Stack](https://img.shields.io/badge/Tech-Next.js_14-black)

## 🎯 O Problema e a Solução

As escolas enfrentam um desafio diário: cozinhar a quantidade exata de comida.
* **Se cozinham de menos:** Alunos ficam sem refeição.
* **Se cozinham de mais:** Ocorre desperdício de recursos públicos e alimentos.

O **Cantina CETI** resolve isso permitindo que os alunos confirmem antecipadamente se irão almoçar. A equipe da cozinha tem acesso a um painel em tempo real com o quantitativo exato de pratos a serem preparados.

## ✨ Funcionalidades Principais

### 📱 Para o Aluno (Mobile PWA)
* **Confirmação de Presença:** Sistema simples de "Vou" ou "Não vou" almoçar.
* **Cardápio Digital:** Visualização semanal das refeições com ícones de alergênicos (Glúten/Lactose).
* **Educação Nutricional:** Feed de dicas de saúde com design atrativo.
* **Instalável:** Funciona como aplicativo nativo no Android/iOS.

### 👩‍🍳 Para a Gestão (Painel Admin)
* **Monitoramento em Tempo Real:** Contagem automática de alunos confirmados.
* **Previsão de Demanda:** Ajuda a definir a quantidade de ingredientes do dia.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Backend (Simulado):** Next.js API Routes (In-memory storage)
* **Linguagem:** TypeScript

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado (Versão 18 ou superior)

### Passo a Passo

1.  **Clone o repositório (ou baixe a pasta):**
    ```bash
    git clone [https://seu-repositorio-aqui.git](https://seu-repositorio-aqui.git)
    cd ceti-cantina
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    * 📱 App do Aluno: `http://localhost:3000`
    * 📊 Painel da Cozinha: `http://localhost:3000/admin`

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── admin/       # Painel da Cozinheira (Relatórios)
│   ├── api/         # Backend e Lógica de Contagem
│   ├── cardapio/    # Tela de Cardápio Semanal
│   ├── dashboard/   # Tela Principal do Aluno
│   ├── dicas/       # Feed de Nutrição
│   └── login/       # Autenticação
├── components/      # Componentes Reutilizáveis
└── public/          # Ícones e Manifesto PWA