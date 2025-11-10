# 🧠 CONTROLS — Sistema de Análise de Maturidade CIS Control

Este projeto é uma aplicação **Next.js** desenvolvida para a **BlackBelt IT Solutions**, com foco na análise de maturidade dos **CIS Controls**.  
A aplicação possui tela de login com autenticação simulada em duas etapas (2FA), dashboard e relatórios.

---

## 🚀 Pré-requisitos

Antes de rodar o projeto, garanta que você tenha instalado na sua máquina:

- [Node.js](https://nodejs.org/) **versão 18 ou superior**
- [PNPM](https://pnpm.io/installation) **(gerenciador de pacotes recomendado)**

> 💡 Caso não tenha o PNPM instalado, execute:
> ```bash
> npm install -g pnpm
> ```

---

## 📦 Instalação

1. **Baixe o projeto** ou clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
Caso tenha recebido o arquivo .zip, extraia em uma pasta local:

bash
Copiar código
unzip CONTROLS.zip
cd CONTROLS
Instale as dependências:

bash
Copiar código
pnpm install
▶️ Executando o projeto
Após instalar as dependências, execute:

bash
Copiar código
pnpm dev
O servidor de desenvolvimento será iniciado e o projeto estará disponível em:

🔗 http://localhost:3000

🧩 Estrutura principal
ruby
Copiar código
CONTROLS/
├── app/
│   ├── login/
│   │   └── page.tsx       # Página de login
│   ├── dashboard/
│   │   └── page.tsx       # Página principal após login
│   ├── questionnaire/
│   │   └── page.tsx       # Questionário CIS
│   └── report/
│       └── page.tsx       # Relatório final
│
├── components/
│   ├── LoginPage.tsx      # Componente de login
│   ├── Dashboard.tsx      # Painel principal
│   ├── Questionnaire.tsx  # Questionário de maturidade
│   ├── ReportPage.tsx     # Tela de relatório
│   └── ui/                # Componentes visuais (botões, inputs, etc.)
│
├── public/
│   └── logo.png           # Logo da aplicação
│
├── package.json
├── next.config.mjs
└── README.md
⚙️ Erros comuns e soluções
❌ Erro: next: not found
Ocorre quando o Next.js ainda não foi instalado.

bash
Copiar código
pnpm install
❌ Erro: Module not found: Can't resolve '@radix-ui/...
Instale manualmente os pacotes do Radix UI:

bash
Copiar código
pnpm add @radix-ui/react-accordion @radix-ui/react-radio-group
❌ Erro: Processing image failed (Invalid PNG signature)
Substitua o arquivo public/logo.png por um PNG válido (salve novamente a logo no Photoshop/GIMP e coloque de volta).

❌ Erro: onLogin is not a function
Certifique-se de que o componente LoginPage está sendo usado da seguinte forma:

tsx
Copiar código
<LoginPage onLogin={() => router.push("/dashboard")} />
🧪 Scripts disponíveis
Comando	Descrição
pnpm dev	Executa o servidor de desenvolvimento
pnpm build	Gera o build de produção
pnpm start	Roda a versão de produção
pnpm lint	Verifica erros de lint

👨‍💻 Tecnologias utilizadas
Next.js 16 (App Router)

TypeScript

TailwindCSS

ShadCN/UI

Lucide Icons

Radix UI

