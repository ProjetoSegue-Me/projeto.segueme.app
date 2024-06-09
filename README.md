# Segue-me


## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/)
- Você tem um ambiente de desenvolvimento configurado.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/segue-me.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd segue-me
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```


## Executando o Aplicativo

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```
2. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

- `npm run dev` : Inicia o servidor de desenvolvimento.
- `npm run build` : Compila o aplicativo para produção.
- `npm start`: Inicia o servidor da versão de produção.
- `npm run lint`: Executa o linter para verificar erros no código.

## Estrutura do Projeto

Uma visão geral da estrutura de pastas e arquivos do projeto:

```
.
├── components     # Componentes reutilizáveis da UI
├── pages          # Páginas do Next.js
│   ├── api        # Rotas da API
│   └── index.js   # Página principal
├── public         # Arquivos estáticos
├── styles         # Estilos globais e específicos
├── .eslintrc.js   # Configuração do ESLint
├── .gitignore     # Arquivos ignorados pelo Git
├── next.config.js # Configuração do Next.js
├── package.json   # Dependências e scripts do projeto
└── README.md      # Documentação do projeto
```
